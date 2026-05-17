import { Question } from "./validations"
import { supabaseClient } from "@/lib/db"

export interface ScoreResult {
  totalScore: number
  maxScore: number
  percentage: number
  category: "Beginner" | "Intermediate" | "Advanced"
  achievement: string
  answerBreakdown: {
    questionId: string
    selectedOptionId: string | string[]
    isCorrect: boolean
  }[]
}

export function getCategoryAndAchievement(percentage: number) {
  if (percentage <= 40) return { category: "Beginner" as const, achievement: "Knowledge Seeker" }
  if (percentage <= 75) return { category: "Intermediate" as const, achievement: "Steady Progress" }
  if (percentage >= 90) return { category: "Advanced" as const, achievement: "Logical Savant" }
  return { category: "Advanced" as const, achievement: "Analytical Mind" }
}

export async function calculatePercentile(quizId: string, score: number) {
  // Use public client for comparison since this is non-sensitive aggregate data
  const { data: attempts, error } = await supabaseClient
    .from('quiz_attempts')
    .select('total_score')
    .eq('quiz_id', quizId)

  if (error || !attempts || attempts.length === 0) return 100

  const totalAttempts = attempts.length
  const lowerScores = attempts.filter(a => a.total_score < score).length
  
  // Percentile: (people scored lower / total people) * 100
  // e.g. if 90 out of 100 people scored lower, you are in the top 10%
  const percentile = (lowerScores / totalAttempts) * 100
  return Math.round(percentile)
}

export function calculateScore(
  answers: Record<string, string | string[]>,
  questions: Question[]
): ScoreResult {
  let totalScore = 0
  let maxScore = 0
  const answerBreakdown: ScoreResult["answerBreakdown"] = []

  questions.forEach((question) => {
    const selected = answers[question.id]
    const correctOptions = question.options.filter((o) => o.is_correct)
    const correctOptionIds = correctOptions.map(o => o.id)
    
    let isCorrect = false
    let questionScore = 0

    if (question.type === 'multiple') {
      const selectedIds = Array.isArray(selected) ? selected : [selected].filter(Boolean) as string[]
      
      if (selectedIds.length > 0) {
        const selectedCorrectCount = selectedIds.filter(id => correctOptionIds.includes(id)).length
        const selectedIncorrectCount = selectedIds.filter(id => !correctOptionIds.includes(id)).length
        
        // Logic: All selected must be correct, and we give points proportional to how many of the correct ones were found
        // But if they pick even ONE wrong answer, they get 0 for that question (standard rigorous quiz logic)
        if (selectedIncorrectCount === 0) {
          questionScore = (selectedCorrectCount / correctOptionIds.length) * question.points
          isCorrect = selectedCorrectCount === correctOptionIds.length
        }
      }
    } else {
      // Single choice logic
      const selectedId = Array.isArray(selected) ? selected[0] : selected
      isCorrect = correctOptionIds.includes(selectedId)
      if (isCorrect) {
        questionScore = question.points
      }
    }
    
    totalScore += questionScore
    maxScore += question.points
    
    answerBreakdown.push({
      questionId: question.id,
      selectedOptionId: selected,
      isCorrect,
    })
  })

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  const { category, achievement } = getCategoryAndAchievement(percentage)

  return {
    totalScore: Math.round(totalScore),
    maxScore: Math.round(maxScore),
    percentage,
    category,
    achievement,
    answerBreakdown,
  }
}
