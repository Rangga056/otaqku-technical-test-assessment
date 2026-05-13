import Link from 'next/link'
import { Quiz } from '@/lib/validations'

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
      <h3 className="text-xl font-bold mb-2">{quiz.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-2">{quiz.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">{quiz.questions.length} Questions</span>
        <Link 
          href={`/quiz/${quiz.id}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  )
}
