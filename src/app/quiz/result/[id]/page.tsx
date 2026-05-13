import { auth } from "@/auth"
import { getAuthenticatedSupabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { ResultDashboard } from "@/components/quiz/ResultDashboard"

export default async function ResultPage({ params }: { params: { id: string } }) {
  const session = await auth()
  if (!session?.user?.id) return notFound()

  const supabase = await getAuthenticatedSupabase(session.user.id)
  
  const { data: attempt, error } = await supabase
    .from("quiz_attempts")
    .select(`
      *,
      quizzes(title),
      attempt_answers(
        *,
        questions(question_text),
        options(option_text)
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !attempt) return notFound()

  return (
    <main className="container mx-auto px-4 py-8">
      <ResultDashboard attempt={attempt} />
    </main>
  )
}
