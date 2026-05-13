import { auth } from "@/auth"
import { getAuthenticatedSupabase } from "@/lib/supabase"
import { notFound, redirect } from "next/navigation"
import { ResultDashboard } from "@/components/quiz/ResultDashboard"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ResultPage({ params }: PageProps) {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/signin")

  const { id } = await params
  if (!id) return notFound()

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
    .eq("id", id)
    .single()

  if (error || !attempt) return notFound()

  return (
    <main className="container mx-auto px-6 py-12 flex-1">
      <ResultDashboard attempt={attempt} />
    </main>
  )
}
