"use client";

import { useEffect, useState, useCallback } from "react";
import { Quiz } from "@/lib/validations";
import { useQuizStore } from "@/store/useQuizStore";
import { submitQuizAction } from "@/app/actions/quiz";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Timer, ArrowLeft, ArrowRight, Check } from "lucide-react";

export function QuizClient({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const {
    currentQuestionIndex,
    answers,
    isFinished,
    setAnswer,
    toggleAnswer,
    nextQuestion,
    prevQuestion,
    startQuiz,
    finishQuiz,
  } = useQuizStore();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes for 10 questions

  useEffect(() => {
    if (!isFinished) {
      startQuiz();
    }
  }, [startQuiz, isFinished]);

  // Simple timer implementation
  useEffect(() => {
    if (timeLeft <= 0 || isFinished) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleSubmit = useCallback(async () => {
    if (isSubmitting || isFinished) return;
    setIsSubmitting(true);
    try {
      const { attemptId } = await submitQuizAction({
        quiz_id: quiz.id,
        answers: answers,
      });
      finishQuiz();
      router.push(`/quiz/result/${attemptId}`);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      alert("Failed to submit quiz. Please try again.");
    }
  }, [quiz.id, answers, isFinished, isSubmitting, finishQuiz, router]);

  if (!currentQuestion) return null;

  const isSelected = (optionId: string) => {
    const currentAnswer = answers[currentQuestion.id];
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.includes(optionId);
    }
    return currentAnswer === optionId;
  };

  const handleOptionClick = (optionId: string) => {
    if (currentQuestion.type === "multiple") {
      toggleAnswer(currentQuestion.id, optionId);
    } else {
      setAnswer(currentQuestion.id, optionId);
    }
  };

  const hasAnswered = () => {
    const currentAnswer = answers[currentQuestion.id];
    if (Array.isArray(currentAnswer)) {
      return currentAnswer.length > 0;
    }
    return !!currentAnswer;
  };

  return (
    <div className="w-full h-full flex flex-col max-w-5xl mx-auto">
      {/* Top Progress Bar - Full Width */}
      <div className="w-full h-1 md:h-1.5 bg-[#F1F3F4] rounded-full overflow-hidden mb-8 md:mb-12">
        <div
          className="h-full bg-[#4285F4] transition-all duration-700 ease-in-out"
          style={{
            width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      <div className="flex justify-between items-center mb-10 md:mb-16">
        <div className="flex flex-col">
          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-1">
            Question {currentQuestionIndex + 1} / {quiz.questions.length}
          </span>
          <span className="text-[10px] font-medium text-[#4285F4] uppercase tracking-wider">
            {currentQuestion.type === "multiple"
              ? "Multiple Choice (Select many)"
              : "Single Choice"}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[#F8F9FA] px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-[#DADCE0]">
          <Timer size={14} className="text-[#202124] md:w-4 md:h-4" />
          <span className="text-xs md:text-sm font-bold text-[#202124] tabular-nums">
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-start w-full">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#202124] leading-[1.15] md:leading-[1.1] mb-8 md:mb-16">
          {currentQuestion.question_text}
        </h1>

        <div className="w-full space-y-3 md:space-y-4 mb-10 md:mb-20">
          {currentQuestion.options.map((option) => {
            const selected = isSelected(option.id);
            return (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className={`w-full group flex items-start gap-3 sm:gap-6 p-4 sm:p-8 rounded-xl md:rounded-2xl border-2 transition-all duration-300 text-left ${
                  selected
                    ? "border-[#4285F4] bg-[#F8F9FA]"
                    : "border-[#F1F3F4] hover:border-[#DADCE0] bg-white"
                }`}
              >
                <div
                  className={`mt-0.5 sm:mt-1 w-5 h-5 md:w-6 md:h-6 ${currentQuestion.type === "multiple" ? "rounded-md" : "rounded-full"} border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    selected
                      ? "border-[#4285F4] bg-[#4285F4]"
                      : "border-[#DADCE0] group-hover:border-[#5F6368]"
                  }`}
                >
                  {selected &&
                    (currentQuestion.type === "multiple" ? (
                      <Check size={14} className="text-white" />
                    ) : (
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white" />
                    ))}
                </div>
                <div className="flex-1">
                  <p
                    className={`text-sm sm:text-xl font-medium leading-relaxed transition-colors ${
                      selected ? "text-[#202124]" : "text-[#5F6368]"
                    }`}
                  >
                    {option.option_text}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center py-8 md:py-10 border-t border-[#F1F3F4] mt-auto">
        <button
          onClick={prevQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
          className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#5F6368] hover:text-[#202124] disabled:opacity-30 transition-colors uppercase tracking-widest"
        >
          <ArrowLeft size={14} className="md:w-4 md:h-4" />
          <span className="hidden sm:inline">Previous</span>
          <span className="sm:hidden">Prev</span>
        </button>

        {isLastQuestion ? (
          <Button
            onClick={handleSubmit}
            disabled={!hasAnswered() || isSubmitting || isFinished}
            className="bg-[#4285F4] hover:bg-[#1A73E8] text-white px-6 md:px-10 h-12 md:h-14 rounded-xl md:rounded-2xl text-sm md:text-base font-bold shadow-lg shadow-blue-200 transition-all hover:scale-[1.02]"
          >
            {isSubmitting ? "Submitting..." : "Complete Evaluation"}
          </Button>
        ) : (
          <Button
            onClick={nextQuestion}
            disabled={!hasAnswered() || isSubmitting}
            className="bg-[#4285F4] hover:bg-[#1A73E8] text-white px-6 md:px-10 h-12 md:h-14 rounded-xl md:rounded-2xl text-sm md:text-base font-bold flex items-center gap-2 transition-all hover:scale-[1.02]"
          >
            Next Question
            <ArrowRight size={16} className="md:w-5 md:h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
