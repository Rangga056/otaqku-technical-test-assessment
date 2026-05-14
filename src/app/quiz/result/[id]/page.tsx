import { auth } from "@/auth"
import { getAuthenticatedSupabase } from "@/lib/db"
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

  const { calculatePercentile } = await import("@/lib/quiz-engine")
  const percentile = await calculatePercentile(attempt.quiz_id, attempt.total_score)

  return (
    <main className="min-h-screen bg-[#121212] bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:20px_20px] py-16 px-6">
      <div className="max-w-7xl mx-auto bg-white rounded-[56px] shadow-2xl p-12 md:p-20">
        <ResultDashboard attempt={attempt} percentile={percentile} />
      </div>
    </main>
  )
}
