import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, FileText, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
              Master your <span className="text-blue-600">knowledge</span> with precision.
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              The professional platform for interactive quizzes, instant performance analytics, and detailed report generation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild className="h-14 px-8 text-lg rounded-full">
                <Link href="/auth/signup">
                  Get Started for Free <ArrowRight className="ml-2" size={20} />
                </Link>
              </Button>
              <Button variant="outline" asChild className="h-14 px-8 text-lg rounded-full">
                <Link href="/quiz">Browse Quizzes</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-[120px] opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100 rounded-full blur-[120px] opacity-40" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Zap className="text-blue-600" size={32} />}
              title="Instant Feedback"
              description="Get immediate scores and category assignments based on your quiz performance."
            />
            <FeatureCard 
              icon={<BarChart3 className="text-blue-600" size={32} />}
              title="Deep Analytics"
              description="Visualize your progress with interactive charts and detailed breakdown of every answer."
            />
            <FeatureCard 
              icon={<FileText className="text-blue-600" size={32} />}
              title="Professional Reports"
              description="Export your performance as high-quality PDF reports for offline review or certification."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto py-12 border-t border-gray-100">
        <div className="container mx-auto px-6 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} otaQku. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 bg-white rounded-2xl border border-gray-100 elevation-1 hover:elevation-2 transition-all duration-300">
      <div className="mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-500 leading-relaxed">{description}</p>
    </div>
  )
}
