"use client"

import { useEffect, useState } from "react"
import { Quiz } from "@/lib/validations"
import { useQuizStore } from "@/store/useQuizStore"
import { submitQuizAction } from "@/app/actions/quiz"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter()
  const { 
    currentQuestionIndex, 
    answers, 
    setAnswer, 
    nextQuestion, 
    prevQuestion, 
    startQuiz,
    isFinished,
    finishQuiz
  } = useQuizStore()
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    startQuiz()
  }, [startQuiz])

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const { attemptId } = await submitQuizAction({
        quiz_id: quiz.id,
        answers: answers
      })
      finishQuiz()
      router.push(`/quiz/result/${attemptId}`)
    } catch (error) {
      console.error(error)
      alert("Failed to submit quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!currentQuestion) return null

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
      <div className="mb-8 flex justify-between items-center">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </h2>
        <div className="h-2 w-32 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-8">{currentQuestion.question_text}</h1>

      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setAnswer(currentQuestion.id, option.id)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
              answers[currentQuestion.id] === option.id
                ? "border-blue-600 bg-blue-50 text-blue-700"
                : "border-gray-100 hover:border-gray-200"
            }`}
          >
            {option.option_text}
          </button>
        ))}
      </div>

      <div className="flex justify-between gap-4">
        <Button
          variant="outline"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id] || isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? "Submitting..." : "Finish Quiz"}
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id] || isSubmitting}
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  )
}
