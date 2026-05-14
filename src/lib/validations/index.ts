import { z } from "zod"

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
  image_url: z.string().url().nullable(),
})

export type User = z.infer<typeof UserSchema>

export const OptionSchema = z.object({
  id: z.string().uuid(),
  question_id: z.string().uuid(),
  option_text: z.string(),
  is_correct: z.boolean(),
})

export type Option = z.infer<typeof OptionSchema>

export const QuestionSchema = z.object({
  id: z.string().uuid(),
  quiz_id: z.string().uuid(),
  question_text: z.string(),
  points: z.number().int(),
  order_index: z.number().int(),
  type: z.enum(["single", "multiple"]).default("single"),
  options: z.array(OptionSchema),
})

export type Question = z.infer<typeof QuestionSchema>

export const QuizSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string().nullable(),
  questions: z.array(QuestionSchema),
})

export type Quiz = z.infer<typeof QuizSchema>

export const QuizAttemptSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  quiz_id: z.string().uuid(),
  total_score: z.number().int(),
  max_score: z.number().int(),
  category: z.enum(["Beginner", "Intermediate", "Advanced"]),
  created_at: z.string().datetime(),
})

export type QuizAttempt = z.infer<typeof QuizAttemptSchema>

export const SubmissionSchema = z.object({
  quiz_id: z.string().uuid(),
  answers: z.record(z.string().uuid(), z.union([z.string().uuid(), z.array(z.string().uuid())])), // question_id -> selected_option_id(s)
})

export type Submission = z.infer<typeof SubmissionSchema>
