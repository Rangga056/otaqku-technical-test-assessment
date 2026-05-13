import { Question } from "./validations"

export interface ScoreResult {
  totalScore: number
  maxScore: number
  percentage: number
  category: "Beginner" | "Intermediate" | "Advanced"
  answerBreakdown: {
    questionId: string
    selectedOptionId: string
    isCorrect: boolean
  }[]
}

export function getCategory(percentage: number): "Beginner" | "Intermediate" | "Advanced" {
  if (percentage <= 40) return "Beginner"
  if (percentage <= 75) return "Intermediate"
  return "Advanced"
}

export function calculateScore(
  answers: Record<string, string>,
  questions: Question[]
): ScoreResult {
  let totalScore = 0
  let maxScore = 0
  const answerBreakdown: ScoreResult["answerBreakdown"] = []

  questions.forEach((question) => {
    const selectedOptionId = answers[question.id]
    const correctOption = question.options.find((o) => o.is_correct)
    const isCorrect = selectedOptionId === correctOption?.id
    
    if (isCorrect) {
      totalScore += question.points
    }
    
    maxScore += question.points
    
    answerBreakdown.push({
      questionId: question.id,
      selectedOptionId,
      isCorrect,
    })
  })

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0
  const category = getCategory(percentage)

  return {
    totalScore,
    maxScore,
    percentage,
    category,
    answerBreakdown,
  }
}
