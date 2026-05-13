import { supabaseClient } from "@/lib/db"
import { QuizCard } from "@/components/quiz/QuizCard"

export default async function BrowseQuizzesPage() {
  const { data: quizzes } = await supabaseClient
    .from("quizzes")
    .select(`
      *,
      questions(id)
    `)

  return (
    <main className="container mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight mb-2">Explore Quizzes</h1>
        <p className="text-gray-500 text-lg">Select a topic to test your knowledge and track your progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {quizzes?.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz as any} />
        ))}
        {(!quizzes || quizzes.length === 0) && (
          <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium text-lg">No quizzes found. Check back later!</p>
          </div>
        )}
      </div>
    </main>
  )
}
