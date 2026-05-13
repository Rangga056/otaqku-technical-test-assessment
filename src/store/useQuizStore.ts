import { create } from 'zustand'

interface QuizState {
  currentQuestionIndex: number
  answers: Record<string, string> // questionId -> optionId
  startTime: number | null
  isFinished: boolean
  
  // Actions
  setAnswer: (questionId: string, optionId: string) => void
  nextQuestion: () => void
  prevQuestion: () => void
  startQuiz: () => void
  finishQuiz: () => void
  resetQuiz: () => void
}

export const useQuizStore = create<QuizState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},
  startTime: null,
  isFinished: false,

  setAnswer: (questionId, optionId) => 
    set((state) => ({
      answers: { ...state.answers, [questionId]: optionId }
    })),

  nextQuestion: () => 
    set((state) => ({ 
      currentQuestionIndex: state.currentQuestionIndex + 1 
    })),

  prevQuestion: () => 
    set((state) => ({ 
      currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1) 
    })),

  startQuiz: () => 
    set({ 
      startTime: Date.now(), 
      currentQuestionIndex: 0, 
      answers: {}, 
      isFinished: false 
    }),

  finishQuiz: () => set({ isFinished: true }),

  resetQuiz: () => 
    set({ 
      currentQuestionIndex: 0, 
      answers: {}, 
      startTime: null, 
      isFinished: false 
    }),
}))
