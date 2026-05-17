"use server"

import { auth } from "@/auth"
import { getAuthenticatedSupabase, supabaseClient } from "@/lib/db"
import { calculateScore } from "@/lib/quiz-engine"
import { SubmissionSchema, QuizSchema } from "@/lib/validations"
import { revalidatePath } from "next/cache"

/**
 * Fetches a quiz with all questions and options in ONE query.
 * Prevents N+1 problem.
 */
export async function getQuiz(id: string) {
  const { data, error } = await supabaseClient
    .from("quizzes")
    .select(`
      *,
      questions:questions(
        *,
        options:options(*)
      )
    `)
    .eq("id", id)
    .order("order_index", { foreignTable: "questions", ascending: true })
    .single()

  if (error) throw new Error("Failed to fetch quiz")
  
  // Validate with Zod
  return QuizSchema.parse(data)
}

/**
 * Submits a quiz attempt using the RLS session bridge.
 * Uses bulk insert for answers to prevent N+1.
 */
export async function submitQuizAction(formData: unknown) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Unauthorized")

  const validated = SubmissionSchema.parse(formData)
  
  // 1. Fetch the quiz again to verify answers securely on server
  const quiz = await getQuiz(validated.quiz_id)
  
  // 2. Calculate score
  const result = calculateScore(validated.answers, quiz.questions)
  
  // 3. Insert attempt and answers using authenticated client
  const authSupabase = await getAuthenticatedSupabase(session.user.id)
  
  const { data: attempt, error: attemptError } = await authSupabase
    .from("quiz_attempts")
    .insert({
      user_id: session.user.id,
      quiz_id: validated.quiz_id,
      total_score: result.totalScore,
      max_score: result.maxScore,
      category: result.category,
    })
    .select("id")
    .single()

  if (attemptError) {
    console.error("Supabase Error (Attempt):", attemptError)
    throw new Error(`Failed to save attempt: ${attemptError.message}`)
  }

  // 4. Bulk insert answers (flatten multi-select into individual rows)
  const answersToInsert: any[] = []
  
  result.answerBreakdown.forEach((ans) => {
    const selectedIds = Array.isArray(ans.selectedOptionId) 
      ? ans.selectedOptionId 
      : [ans.selectedOptionId].filter(Boolean) as string[]

    selectedIds.forEach(optionId => {
      answersToInsert.push({
        attempt_id: attempt.id,
        question_id: ans.questionId,
        selected_option_id: optionId,
        is_correct: ans.isCorrect, // Note: This flag applies to the question result in this simplified schema
      })
    })
  })

  const { error: answersError } = await authSupabase
    .from("attempt_answers")
    .insert(answersToInsert)

  if (answersError) {
    console.error("Supabase Error (Answers):", answersError)
    throw new Error(`Failed to save answers: ${answersError.message}`)
  }

  revalidatePath("/dashboard")
  return { attemptId: attempt.id }
}
