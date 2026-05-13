import Link from 'next/link'
import { Quiz } from '@/lib/validations'
import { Button } from '@/components/ui/button'

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className="p-8 bg-white border border-gray-100 rounded-3xl elevation-1 hover:elevation-2 transition-all duration-300 flex flex-col h-full">
      <h3 className="text-2xl font-black tracking-tight mb-3 text-gray-900 leading-none">{quiz.title}</h3>
      <p className="text-gray-500 text-sm mb-8 line-clamp-2 leading-relaxed flex-1">{quiz.description}</p>
      
      <div className="flex items-center justify-between pt-6 border-t border-gray-50">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Items</span>
          <span className="text-sm font-black text-gray-900">{quiz.questions.length} Questions</span>
        </div>
        <Button asChild className="rounded-xl h-11 px-6 font-bold text-xs">
          <Link href={`/quiz/${quiz.id}`}>
            Start Quiz
          </Link>
        </Button>
      </div>
    </div>
  )
}
