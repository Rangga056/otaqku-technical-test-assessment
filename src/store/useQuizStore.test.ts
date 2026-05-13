import { describe, it, expect, beforeEach } from 'vitest'
import { useQuizStore } from './useQuizStore'

describe('Quiz Store', () => {
  beforeEach(() => {
    useQuizStore.getState().resetQuiz()
  })

  it('should initialize with default values', () => {
    const state = useQuizStore.getState()
    expect(state.currentQuestionIndex).toBe(0)
    expect(state.answers).toEqual({})
    expect(state.isFinished).toBe(false)
  })

  it('should update answers', () => {
    useQuizStore.getState().setAnswer('q1', 'o1')
    expect(useQuizStore.getState().answers).toEqual({ q1: 'o1' })
    
    useQuizStore.getState().setAnswer('q2', 'o2')
    expect(useQuizStore.getState().answers).toEqual({ q1: 'o1', q2: 'o2' })
  })

  it('should navigate through questions', () => {
    useQuizStore.getState().nextQuestion()
    expect(useQuizStore.getState().currentQuestionIndex).toBe(1)
    
    useQuizStore.getState().prevQuestion()
    expect(useQuizStore.getState().currentQuestionIndex).toBe(0)
    
    // Should not go below 0
    useQuizStore.getState().prevQuestion()
    expect(useQuizStore.getState().currentQuestionIndex).toBe(0)
  })

  it('should start and finish quiz', () => {
    useQuizStore.getState().startQuiz()
    expect(useQuizStore.getState().startTime).not.toBeNull()
    
    useQuizStore.getState().finishQuiz()
    expect(useQuizStore.getState().isFinished).toBe(true)
  })
})
