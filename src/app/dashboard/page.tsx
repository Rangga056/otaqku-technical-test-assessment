import { auth } from "@/auth"
import { getAuthenticatedSupabase, supabaseClient } from "@/lib/db"
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
  const { data: quizzes } = await supabaseClient
    .from("quizzes")
    .select(`
      *,
      questions(id)
    `)
    .limit(3)

  return (
    <main className="container mx-auto px-6 py-12 max-w-6xl bg-[#F8F9FA] flex-1">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-medium tracking-tight mb-2 text-[#202124]">Welcome back, {session.user.name?.split(' ')[0]}</h1>
          <p className="text-[#5F6368]">Here's an overview of your intelligence workspace.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard 
          icon={<Target className="text-[#4285F4]" size={20} />}
          label="Avg. Percentage"
          value={`${Math.round(stats?.avg_percentage || 0)}%`}
          color="bg-[#E8F0FE]"
        />
        <StatCard 
          icon={<Clock className="text-[#A142F4]" size={20} />}
          label="Evaluations"
          value={stats?.total_attempts || 0}
          color="bg-[#F3E8FD]"
        />
        <StatCard 
          icon={<Trophy className="text-[#FBBC05]" size={20} />}
          label="Highest Score"
          value={stats?.highest_score || 0}
          color="bg-[#FEF7E0]"
        />
        <StatCard 
          icon={<BarChart className="text-[#34A853]" size={20} />}
          label="Advanced Level"
          value={stats?.advanced_count || 0}
          color="bg-[#E6F4EA]"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-medium text-[#202124]">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {attempts?.length ? attempts.map((attempt) => (
              <Link 
                key={attempt.id} 
                href={`/quiz/result/${attempt.id}`}
                className="flex items-center justify-between p-5 stitch-card hover:bg-[#F8F9FA] transition-all group"
              >
                <div>
                  <p className="font-medium text-[#202124] group-hover:text-[#1A73E8] transition-colors mb-1">
                    {attempt.quizzes.title}
                  </p>
                  <p className="text-xs text-[#5F6368]">
                    {new Date(attempt.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg text-[#202124]">
                    {Math.round((attempt.total_score / attempt.max_score) * 100)}%
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#4285F4]">
                    {attempt.category}
                  </p>
                </div>
              </Link>
            )) : (
              <div className="p-8 text-center bg-white rounded-xl border border-dashed border-[#DADCE0]">
                <p className="text-[#5F6368]">No attempts yet. Start an evaluation.</p>
              </div>
            )}
          </div>
        </div>

        {/* Available Quizzes */}
        <div className="space-y-6">
          <h2 className="text-xl font-medium text-[#202124]">Featured Quizzes</h2>
          <div className="space-y-4">
            {quizzes?.map((quiz) => (
              <div key={quiz.id} className="p-6 stitch-card space-y-4">
                <div>
                  <h3 className="font-medium text-[#202124]">{quiz.title}</h3>
                  <p className="text-xs text-[#5F6368] line-clamp-2 mt-1">{quiz.description}</p>
                </div>
                <Button asChild className="w-full text-sm" variant="tonal">
                  <Link href={`/quiz/${quiz.id}`}>Begin Evaluation</Link>
                </Button>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full font-medium text-sm">
              <Link href="/quiz">View Library</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
  return (
    <div className="stitch-card p-6 flex flex-col justify-between h-32">
      <div className="flex justify-between items-start">
        <p className="text-xs font-medium text-[#5F6368] tracking-wide">{label}</p>
        <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-medium text-[#202124]">{value}</p>
    </div>
  )
}
