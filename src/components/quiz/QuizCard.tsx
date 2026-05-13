import Link from 'next/link'
import { Quiz } from '@/lib/validations'
import { Button } from '@/components/ui/button'

export function QuizCard({ quiz }: { quiz: Quiz }) {
  return (
    <div className="p-8 stitch-card flex flex-col h-full">
      <h3 className="text-2xl font-medium tracking-tight mb-3 text-[#202124] leading-tight">{quiz.title}</h3>
      <p className="text-[#5F6368] text-sm mb-8 line-clamp-3 leading-relaxed flex-1">{quiz.description}</p>
      
      <div className="flex items-center justify-between pt-6 border-t border-[#DADCE0]">
        <div className="flex flex-col">
          <span className="text-[10px] font-medium uppercase tracking-wider text-[#5F6368]">Total Items</span>
          <span className="text-sm font-medium text-[#202124]">{quiz.questions.length} Questions</span>
        </div>
        <Button asChild variant="tonal" className="text-sm px-6">
          <Link href={`/quiz/${quiz.id}`}>
            Start
          </Link>
        </Button>
      </div>
    </div>
  )
}
