import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, FileText, Zap, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E8F0FE] text-[#1A73E8] text-sm font-medium mb-8">
              <Sparkles size={16} />
              <span>Intelligent Evaluation Workspace</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-[#202124] leading-[1.1]">
              Evaluate knowledge with <span className="text-[#4285F4]">precision.</span>
            </h1>
            <p className="text-xl text-[#5F6368] mb-10 leading-relaxed max-w-2xl mx-auto">
              A refined canvas for interactive quizzes, instant analytics, and professional report generation. Designed for clarity and speed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="h-12 px-8 text-base">
                <Link href="/auth/signup">
                  Get started <ArrowRight className="ml-2" size={18} />
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-12 px-8 text-base bg-white">
                <Link href="/quiz">Browse workspace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Preview / Features Section */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard 
              icon={<Zap className="text-[#4285F4]" size={28} />}
              title="Real-time Engine"
              description="Experience instantaneous feedback with our optimized evaluation engine, delivering scores and category metrics instantly."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-[#34A853]" size={28} />}
              title="Deep Analytics"
              description="Visualize performance patterns with interactive, clean-canvas charts. Understand strengths and areas for improvement."
            />
            <FeatureCard 
              icon={<FileText className="text-[#FBBC05]" size={28} />}
              title="Export & Report"
              description="Generate highly-structured, print-ready PDF reports of your performance directly from the dashboard."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-8 border-t border-[#DADCE0] bg-white">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-[#5F6368] text-sm">
          <div>
            &copy; {new Date().getFullYear()} otaQku.
          </div>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="hover:text-[#202124]">Privacy</Link>
            <Link href="#" className="hover:text-[#202124]">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="stitch-card p-8">
      <div className="w-12 h-12 rounded-full bg-[#F8F9FA] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-3 text-[#202124]">{title}</h3>
      <p className="text-[#5F6368] leading-relaxed text-sm">{description}</p>
    </div>
  )
}
