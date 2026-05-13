import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, FileText, Zap, Sparkles, TrendingUp } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-left space-y-8 animate-in fade-in slide-in-from-left duration-1000">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-[#202124] leading-[0.95]">
                Precision in <br />
                Knowledge. <br />
                <span className="text-[#4285F4]">Minimalist by Design.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#5F6368] leading-relaxed max-w-xl">
                A rigorous platform for interactive assessments and analytics. 
                Engineered with Swiss principles to reduce cognitive load and prioritize absolute clarity.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Button asChild className="h-14 px-10 text-lg rounded-xl shadow-lg bg-[#4285F4] hover:bg-[#1A73E8] transition-all transform hover:scale-[1.02]">
                  <Link href="/auth/signup">
                    Start Assessment
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-14 px-10 text-lg rounded-xl bg-white/50 backdrop-blur border-[#DADCE0]">
                  <Link href="/quiz">View Documentation</Link>
                </Button>
              </div>
            </div>

            {/* Right Visual (Floating Card) */}
            <div className="relative hidden lg:block animate-in fade-in slide-in-from-right duration-1000 delay-200">
              <div className="relative z-10 stitch-card p-10 bg-white rotate-[-2deg] shadow-2xl scale-110 translate-x-12">
                <div className="flex justify-between items-start mb-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">Global Performance</p>
                    <h2 className="text-4xl font-medium text-[#202124]">94.2%</h2>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] flex items-center justify-center text-[#4285F4]">
                    <TrendingUp size={24} />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#5F6368]">Algorithm Efficiency</span>
                      <span className="text-[#202124]">23ms</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#4285F4] w-[85%]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="text-[#5F6368]">Cognitive Load Index</span>
                      <span className="text-[#202124]">Low</span>
                    </div>
                    <div className="h-1.5 w-full bg-[#F8F9FA] rounded-full overflow-hidden">
                      <div className="h-full bg-[#34A853] w-[15%]" />
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-10 border-t border-[#DADCE0]">
                  <div className="w-full h-32 bg-[#F8F9FA] rounded-xl flex items-center justify-center border border-dashed border-[#DADCE0]">
                    <BarChart3 className="text-[#DADCE0]" size={48} />
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-gradient-to-br from-[#4285F4]/10 to-transparent rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-medium tracking-tight text-[#202124] mb-6">Designed for intelligence.</h2>
            <p className="text-lg text-[#5F6368]">Everything you need to master your domain with structured feedback and analytics.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Zap className="text-[#4285F4]" size={28} />}
              title="Instant Feedback"
              description="Score calculations and performance categorizations occur in real-time as you complete assessments."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-[#34A853]" size={28} />}
              title="Deep Analytics"
              description="Visualize patterns in your performance through a clean, distraction-free analytical dashboard."
            />
            <FeatureCard 
              icon={<FileText className="text-[#FBBC05]" size={28} />}
              title="Structured Reports"
              description="Export your evaluation history as highly-refined PDF reports for professional documentation."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#DADCE0] bg-[#F8F9FA]">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-[#5F6368] text-sm">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="w-6 h-6 rounded bg-[#4285F4] flex items-center justify-center text-white font-bold text-xs">Q</div>
            <span className="font-medium">otaQku Intelligence</span>
          </div>
          <div className="flex gap-8">
            <button className="hover:text-[#202124] transition-colors">Privacy Policy</button>
            <button className="hover:text-[#202124] transition-colors">Terms of Service</button>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="stitch-card p-10 hover:border-[#4285F4] transition-all duration-300">
      <div className="w-14 h-14 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mb-8">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-4 text-[#202124]">{title}</h3>
      <p className="text-[#5F6368] leading-relaxed">{description}</p>
    </div>
  )
}
