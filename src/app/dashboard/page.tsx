import { auth } from "@/auth"
import { getAuthenticatedSupabase, supabase } from "@/lib/supabase"
import { redirect } from "next/navigation"
import { QuizCard } from "@/components/quiz/QuizCard"
import { BarChart, Clock, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/signin")

  const authSupabase = await getAuthenticatedSupabase(session.user.id)

  // 1. Fetch Stats from View
  const { data: stats } = await authSupabase
    .from("user_quiz_stats")
    .select("*")
    .single()

  // 2. Fetch Recent Attempts
  const { data: attempts } = await authSupabase
    .from("quiz_attempts")
    .select(`
      *,
      quizzes(title)
    `)
    .order("created_at", { ascending: false })
    .limit(5)

  // 3. Fetch Available Quizzes
  const { data: quizzes } = await supabase
    .from("quizzes")
    .select(`
      *,
      questions(id)
    `)
    .limit(3)

  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Welcome back, {session.user.name.split(' ')[0]}</h1>
          <p className="text-gray-500">Here's how your learning journey is progressing.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Target className="text-blue-600" size={20} />}
          label="Avg. Percentage"
          value={`${Math.round(stats?.avg_percentage || 0)}%`}
          color="bg-blue-50"
        />
        <StatCard 
          icon={<Clock className="text-purple-600" size={20} />}
          label="Quizzes Taken"
          value={stats?.total_attempts || 0}
          color="bg-purple-50"
        />
        <StatCard 
          icon={<Trophy className="text-amber-600" size={20} />}
          label="Highest Score"
          value={stats?.highest_score || 0}
          color="bg-amber-50"
        />
        <StatCard 
          icon={<BarChart className="text-emerald-600" size={20} />}
          label="Advanced Level"
          value={stats?.advanced_count || 0}
          color="bg-emerald-50"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {attempts?.length ? attempts.map((attempt) => (
              <Link 
                key={attempt.id} 
                href={`/quiz/result/${attempt.id}`}
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl elevation-1 hover:elevation-2 transition-all group"
              >
                <div>
                  <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {attempt.quizzes.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(attempt.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-lg text-gray-900">
                    {Math.round((attempt.total_score / attempt.max_score) * 100)}%
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-blue-500">
                    {attempt.category}
                  </p>
                </div>
              </Link>
            )) : (
              <div className="p-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400">No attempts yet. Start your first quiz!</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Quizzes */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Featured Quizzes</h2>
          <div className="space-y-4">
            {quizzes?.map((quiz) => (
              <div key={quiz.id} className="p-5 bg-white border border-gray-100 rounded-2xl elevation-1 space-y-4">
                <div>
                  <h3 className="font-bold text-gray-900">{quiz.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2">{quiz.description}</p>
                </div>
                <Button asChild className="w-full rounded-xl h-10 text-xs font-bold" variant="outline">
                  <Link href={`/quiz/${quiz.id}`}>Start Quiz</Link>
                </Button>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold text-sm">
              <Link href="/quiz">View All Quizzes</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 elevation-1">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
    </div>
  )
}
