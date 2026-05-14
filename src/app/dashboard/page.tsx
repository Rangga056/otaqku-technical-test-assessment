import { auth } from "@/auth"
import { getAuthenticatedSupabase, supabaseClient } from "@/lib/db"
import { redirect } from "next/navigation"
import { BarChart, Clock, Trophy, Target } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ActivityTable } from "@/components/dashboard/ActivityTable"

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect("/auth/signin")

  const authSupabase = await getAuthenticatedSupabase(session.user.id)

  // 1. Fetch Stats from View
  const { data: stats } = await authSupabase
    .from("user_quiz_stats")
    .select("*")
    .single()

  // 2. Fetch ALL Attempts for the Table
  const { data: attempts } = await authSupabase
    .from("quiz_attempts")
    .select(`
      *,
      quizzes(title)
    `)
    .order("created_at", { ascending: false })

  // 3. Fetch Available Quizzes
  const { data: quizzes } = await supabaseClient
    .from("quizzes")
    .select(`
      *,
      questions(id)
    `)
    .limit(3)

  return (
    <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12 max-w-7xl bg-[#F8F9FA] flex-1">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-6">
        <div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-3 md:mb-4 text-[#202124]">
            Intelligence Workspace
          </h1>
          <p className="text-[#5F6368] text-base md:text-lg">Welcome back, {session.user.name?.split(' ')[0]}. Track your cognitive growth here.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
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

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Recent Activity Table */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold text-[#202124] flex items-center gap-3">
            Evaluation History
            <span className="text-xs font-bold px-2 py-0.5 bg-[#F1F3F4] text-[#5F6368] rounded-md">
              {attempts?.length || 0}
            </span>
          </h2>
          <ActivityTable attempts={attempts || []} />
        </div>

        {/* Available Quizzes */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-[#202124]">Recommended</h2>
          <div className="space-y-6">
            {quizzes?.map((quiz) => (
              <div key={quiz.id} className="p-8 bg-white border border-[#F1F3F4] rounded-[32px] shadow-sm space-y-6 hover:border-[#4285F4] transition-all group">
                <div>
                  <h3 className="text-xl font-bold text-[#202124] group-hover:text-[#4285F4] transition-colors">{quiz.title}</h3>
                  <p className="text-sm text-[#5F6368] line-clamp-2 mt-2 leading-relaxed">{quiz.description}</p>
                </div>
                <div className="flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-widest text-[#DADCE0]">
                    {quiz.questions.length} Items
                  </span>
                  <Button asChild className="text-sm rounded-xl px-6" variant="tonal">
                    <Link href={`/quiz/${quiz.id}`}>Begin</Link>
                  </Button>
                </div>
              </div>
            ))}
            <Button asChild variant="ghost" className="w-full font-bold text-sm h-14 rounded-2xl border border-dashed border-[#DADCE0] hover:bg-[#F8F9FA]">
              <Link href="/quiz">Explore Library</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: string | number, color: string }) {
  return (
    <div className="bg-white border border-[#F1F3F4] p-8 rounded-[32px] shadow-sm flex flex-col justify-between h-40 hover:scale-[1.02] transition-all">
      <div className="flex justify-between items-start">
        <p className="text-[10px] font-bold text-[#5F6368] uppercase tracking-[0.2em]">{label}</p>
        <div className={`w-10 h-10 ${color} rounded-2xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-4xl font-black text-[#202124] tracking-tighter">{value}</p>
    </div>
  )
}
