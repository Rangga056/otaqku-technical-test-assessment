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
    <div className="max-w-3xl mx-auto bg-white p-10 rounded-[24px] border border-[#DADCE0] shadow-sm">
      <div className="mb-10 flex flex-col gap-4">
        <div className="flex justify-between items-center text-[#5F6368] text-sm font-medium">
          <span>Question {currentQuestionIndex + 1} of {quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / quiz.questions.length) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#4285F4] transition-all duration-500 ease-out" 
            style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h1 className="text-3xl font-medium mb-10 text-[#202124] leading-tight">
        {currentQuestion.question_text}
      </h1>

      <div className="space-y-4 mb-12">
        {currentQuestion.options.map((option) => (
          <button
            key={option.id}
            onClick={() => setAnswer(currentQuestion.id, option.id)}
            className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 ${
              answers[currentQuestion.id] === option.id
                ? "border-[#4285F4] bg-[#E8F0FE] text-[#1A73E8]"
                : "border-[#DADCE0] hover:border-[#4285F4] text-[#202124]"
            }`}
          >
            <span className="text-lg font-medium">{option.option_text}</span>
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-[#DADCE0]">
        <Button
          variant="ghost"
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className="text-[#5F6368]"
        >
          Previous
        </Button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id] || isSubmitting}
            className="bg-[#34A853] hover:bg-[#2D8E47] text-white px-8 h-12 text-base"
          >
            {isSubmitting ? "Submitting..." : "Complete Evaluation"}
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id] || isSubmitting}
            className="px-8 h-12 text-base"
          >
            Next Question
          </Button>
        )}
      </div>
    </div>
  )
}
