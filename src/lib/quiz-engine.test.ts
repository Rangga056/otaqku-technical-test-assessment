import { describe, it, expect } from 'vitest'
import { calculateScore, getCategory } from './quiz-engine'
import { Question } from './validations'

describe('Quiz Engine', () => {
  const mockQuestions: Partial<Question>[] = [
    {
      id: 'q1',
      points: 10,
      options: [
        { id: 'o1', is_correct: true, option_text: 'Opt 1', question_id: 'q1' },
        { id: 'o2', is_correct: false, option_text: 'Opt 2', question_id: 'q1' },
      ]
    },
    {
      id: 'q2',
      points: 20,
      options: [
        { id: 'o3', is_correct: false, option_text: 'Opt 3', question_id: 'q2' },
        { id: 'o4', is_correct: true, option_text: 'Opt 4', question_id: 'q2' },
      ]
    }
  ]

  it('should calculate score correctly', () => {
    const answers = {
      'q1': 'o1', // Correct (10 pts)
      'q2': 'o3'  // Incorrect (0 pts)
    }
    
    const result = calculateScore(answers, mockQuestions as Question[])
    expect(result.totalScore).toBe(10)
    expect(result.maxScore).toBe(30)
    expect(result.percentage).toBe(Math.round((10 / 30) * 100))
  })

  it('should assign categories correctly', () => {
    expect(getCategory(30)).toBe('Beginner')     // 30%
    expect(getCategory(60)).toBe('Intermediate') // 60%
    expect(getCategory(90)).toBe('Advanced')     // 90%
  })
})
