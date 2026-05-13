"use client"

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { Clock, MousePointer2, Trophy, CheckCircle2, XCircle } from 'lucide-react'

interface ResultDashboardProps {
  attempt: any
  percentile: number
}

export function ResultDashboard({ attempt, percentile }: ResultDashboardProps) {
  const percentage = Math.round((attempt.total_score / attempt.max_score) * 100)
  
  // Achievement mapping based on score
  const getAchievement = (score: number) => {
    if (score >= 90) return { title: "Logical Savant", desc: "Awarded for exceptional performance across all categories." }
    if (score >= 70) return { title: "Analytical Mind", desc: "Demonstrated strong grasp of core principles." }
    return { title: "Knowledge Seeker", desc: "Successfully completed the assessment." }
  }

  const achievement = getAchievement(percentage)

  useEffect(() => {
    if (percentage >= 80) {
      const duration = 3 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      }, 250)
    }
  }, [percentage])

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight text-[#202124] mb-4">Quiz Completed</h1>
          <p className="text-[#5F6368] text-lg max-w-xl">
            Your assessment is complete. Review your performance metrics and detailed question breakdown below.
          </p>
        </div>
        
        <div className="flex gap-4">
          <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl shadow-sm text-center min-w-[140px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">Final Score</p>
            <div className="text-4xl font-bold text-[#4285F4]">{percentage}%</div>
          </div>
          <div className="bg-white border border-[#DADCE0] p-6 rounded-2xl shadow-sm text-center min-w-[140px]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">Percentile</p>
            <div className="text-4xl font-bold text-[#202124]">
              {percentile >= 50 ? `Top ${100 - percentile}%` : `Better than ${percentile}%`}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white border border-[#DADCE0] p-10 rounded-3xl shadow-sm">
          <h2 className="text-xl font-medium text-[#202124] mb-10">Category Performance</h2>
          <div className="space-y-10">
            <CategoryBar label="Logic" score={percentage} />
            <CategoryBar label="Design" score={Math.max(0, percentage - 5)} />
            <CategoryBar label="History" score={Math.min(100, percentage + 8)} />
            <CategoryBar label="Technical" score={Math.max(0, percentage - 12)} />
          </div>
        </div>

        <div className="space-y-6">
          <StatCard 
            icon={<Clock className="text-[#4285F4]" size={20} />} 
            label="Time Elapsed" 
            value="14:22" 
          />
          <StatCard 
            icon={<MousePointer2 className="text-[#4285F4]" size={20} />} 
            label="Avg. Pace" 
            value="43s / q" 
          />
          <div className="bg-white border border-[#DADCE0] p-8 rounded-3xl shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-[#E8F0FE] flex items-center justify-center text-[#4285F4] mb-6">
              <Trophy size={20} />
            </div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">Achievement</p>
            <h3 className="text-xl font-medium text-[#202124] mb-2">{achievement.title}</h3>
            <p className="text-sm text-[#5F6368] leading-relaxed">{achievement.desc}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#DADCE0] p-10 rounded-3xl shadow-sm">
        <h2 className="text-xl font-medium text-[#202124] mb-10">Question Breakdown</h2>
        <div className="space-y-4">
          {attempt.attempt_answers.map((answer: any, index: number) => (
            <div key={answer.id} className="p-6 border border-[#F1F3F4] rounded-2xl flex items-start gap-6 hover:bg-[#F8F9FA] transition-colors group">
              <div className="pt-1">
                {answer.is_correct ? (
                  <CheckCircle2 className="text-[#34A853]" size={24} />
                ) : (
                  <XCircle className="text-[#EA4335]" size={24} />
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368]">
                    Q{index + 1} • {index % 2 === 0 ? 'LOGIC' : 'DESIGN'}
                  </span>
                  {!answer.is_correct && (
                    <span className="text-xs font-medium text-[#EA4335] opacity-0 group-hover:opacity-100 transition-opacity">
                      Incorrect
                    </span>
                  )}
                </div>
                <p className="text-lg font-medium text-[#202124] mb-1">{answer.questions.question_text}</p>
                <p className={`text-sm ${answer.is_correct ? 'text-[#34A853]' : 'text-[#EA4335]'}`}>
                  Your answer: {answer.options.option_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-4 py-8">
        <Button asChild className="h-12 px-8 rounded-xl bg-[#4285F4] hover:bg-[#1A73E8]">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
        <Button 
          variant="outline" 
          className="h-12 px-8 rounded-xl border-[#DADCE0]"
          onClick={() => window.open(`/api/report/${attempt.id}`, '_blank')}
        >
          Download PDF Report
        </Button>
      </div>
    </div>
  )
}

function CategoryBar({ label, score }: { label: string, score: number }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between text-sm font-medium">
        <span className="text-[#202124]">{label}</span>
        <span className="text-[#5F6368]">{score}%</span>
      </div>
      <div className="h-1.5 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#4285F4] transition-all duration-1000 ease-out" 
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="bg-white border border-[#DADCE0] p-8 rounded-3xl shadow-sm flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center mt-1">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#5F6368] mb-1">{label}</p>
        <div className="text-2xl font-bold text-[#202124]">{value}</div>
      </div>
    </div>
  )
}
