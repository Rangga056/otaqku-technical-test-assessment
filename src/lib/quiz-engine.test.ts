import { describe, it, expect } from 'vitest'
import { calculateScore, getCategoryAndAchievement } from './quiz-engine'
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
    expect(result.achievement).toBeDefined()
  })

  it('should assign categories and achievements correctly', () => {
    expect(getCategoryAndAchievement(30).category).toBe('Beginner')
    expect(getCategoryAndAchievement(60).category).toBe('Intermediate')
    expect(getCategoryAndAchievement(95).category).toBe('Advanced')
    expect(getCategoryAndAchievement(95).achievement).toBe('Logical Savant')
  })
})
