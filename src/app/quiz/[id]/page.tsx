import { getQuiz } from "@/app/actions/quiz"
import { QuizClient } from "@/components/quiz/QuizClient"

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quiz = await getQuiz(params.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <QuizClient quiz={quiz} />
    </main>
  )
}
