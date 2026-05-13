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

  if (attemptError) throw new Error("Failed to save attempt")

  // 4. Bulk insert answers
  const answersToInsert = result.answerBreakdown.map((ans) => ({
    attempt_id: attempt.id,
    question_id: ans.questionId,
    selected_option_id: ans.selectedOptionId,
    is_correct: ans.isCorrect,
  }))

  const { error: answersError } = await authSupabase
    .from("attempt_answers")
    .insert(answersToInsert)

  if (answersError) throw new Error("Failed to save answers")

  revalidatePath("/dashboard")
  return { attemptId: attempt.id }
}
