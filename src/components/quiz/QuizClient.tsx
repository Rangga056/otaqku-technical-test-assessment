"use client"

import { useEffect, useState, useCallback } from "react"
import { Quiz } from "@/lib/validations"
import { useQuizStore } from "@/store/useQuizStore"
import { submitQuizAction } from "@/app/actions/quiz"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Timer, ArrowLeft, ArrowRight } from "lucide-react"

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
  const [timeLeft, setTimeLeft] = useState(180) // 3 minutes in seconds

  useEffect(() => {
    startQuiz()
  }, [startQuiz])

  // Simple timer implementation
  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1

  const handleSubmit = useCallback(async () => {
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
  }, [quiz.id, answers, finishQuiz, router])

  if (!currentQuestion) return null

  return (
    <div className="w-full h-full flex flex-col">
      {/* Top Progress Bar - Full Width */}
      <div className="w-full h-1.5 bg-[#F1F3F4] rounded-full overflow-hidden mb-12">
        <div 
          className="h-full bg-[#4285F4] transition-all duration-700 ease-in-out" 
          style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
        />
      </div>

      <div className="flex justify-between items-center mb-16">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-1">
            Question {currentQuestionIndex + 1} / {quiz.questions.length}
          </span>
        </div>
        
        <div className="flex items-center gap-2 bg-[#F8F9FA] px-4 py-2 rounded-full border border-[#DADCE0]">
          <Timer size={16} className="text-[#202124]" />
          <span className="text-sm font-bold text-[#202124] tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start max-w-3xl">
        <h1 className="text-5xl font-bold tracking-tight text-[#202124] leading-[1.1] mb-16">
          {currentQuestion.question_text}
        </h1>

        <div className="w-full space-y-4 mb-20">
          {currentQuestion.options.map((option) => {
            const isSelected = answers[currentQuestion.id] === option.id
            return (
              <button
                key={option.id}
                onClick={() => setAnswer(currentQuestion.id, option.id)}
                className={`w-full group flex items-start gap-6 p-8 rounded-2xl border-2 transition-all duration-300 text-left ${
                  isSelected
                    ? "border-[#4285F4] bg-[#F8F9FA]"
                    : "border-[#F1F3F4] hover:border-[#DADCE0] bg-white"
                }`}
              >
                <div className={`mt-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                  isSelected ? "border-[#4285F4] bg-[#4285F4]" : "border-[#DADCE0] group-hover:border-[#5F6368]"
                }`}>
                  {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="flex-1">
                  <p className={`text-xl font-medium leading-relaxed transition-colors ${
                    isSelected ? "text-[#202124]" : "text-[#5F6368]"
                  }`}>
                    {option.option_text}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between items-center py-10 border-t border-[#F1F3F4]">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className="flex items-center gap-2 text-sm font-medium text-[#5F6368] hover:text-[#202124] disabled:opacity-30 transition-colors"
        >
          <ArrowLeft size={16} />
          Previous
        </button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!answers[currentQuestion.id] || isSubmitting}
            className="bg-[#4285F4] hover:bg-[#1A73E8] text-white px-10 h-14 rounded-xl text-base font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
          >
            {isSubmitting ? "Submitting..." : "Complete Evaluation"}
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
            disabled={!answers[currentQuestion.id] || isSubmitting}
            className="bg-[#4285F4] hover:bg-[#1A73E8] text-white px-10 h-14 rounded-xl text-base font-bold flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            Next Question
            <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </div>
  )
}
