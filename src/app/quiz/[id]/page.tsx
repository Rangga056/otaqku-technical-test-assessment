import { getQuiz } from "@/app/actions/quiz"
import { QuizClient } from "@/components/quiz/QuizClient"
import { notFound } from "next/navigation"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function QuizPage({ params }: PageProps) {
  const { id } = await params
  
  if (!id) return notFound()

  try {
    const quiz = await getQuiz(id)
    return (
      <main className="min-h-screen bg-[#121212] bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px] flex items-center justify-center p-6">
        <div className="w-full max-w-6xl bg-white rounded-[48px] shadow-2xl p-12 md:p-20 min-h-[85vh] flex flex-col">
          <QuizClient quiz={quiz} />
        </div>
      </main>
    )
  } catch (error) {
    console.error("Quiz fetch error:", error)
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Quiz not found</h1>
        <p className="text-gray-500 mb-6">The assessment you're looking for might have been moved or deleted.</p>
      </div>
    )
  }
}
