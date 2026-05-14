"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import confetti from 'canvas-confetti'
import { Clock, MousePointer2, Trophy, CheckCircle2, XCircle, Download, Loader2 } from 'lucide-react'
import html2canvas from 'html2canvas'

interface ResultDashboardProps {
  attempt: any
  percentile: number
}

export function ResultDashboard({ attempt, percentile }: ResultDashboardProps) {
  const [isExporting, setIsExporting] = useState(false)
  const dashboardRef = useRef<HTMLDivElement>(null)
  const percentage = Math.round((attempt.total_score / attempt.max_score) * 100)
  
  // Achievement mapping based on score
  const getAchievement = (score: number) => {
    if (score >= 90) return { title: "Logical Savant", desc: "Awarded for exceptional performance across all categories. Your analytical precision is within the top 1% of candidates." }
    if (score >= 70) return { title: "Analytical Mind", desc: "Demonstrated strong grasp of core principles. You show a high capacity for complex problem solving." }
    return { title: "Knowledge Seeker", desc: "Successfully completed the assessment. Continue practicing to refine your technical and logical foundations." }
  }

  const achievement = getAchievement(percentage)

  const handleDownloadPDF = async () => {
    if (!dashboardRef.current) return
    
    setIsExporting(true)
    try {
      // Capture the dashboard area (excluding buttons)
      const canvas = await html2canvas(dashboardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      })
      const chartImage = canvas.toDataURL('image/png')

      const response = await fetch(`/api/report/${attempt.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chartImage }),
      })

      if (!response.ok) throw new Error('Export failed')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `otaqku-report-${attempt.id}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Export error:', error)
      alert('Failed to generate PDF report.')
    } finally {
      setIsExporting(false)
    }
  }

  useEffect(() => {
    if (percentage >= 80) {
      const duration = 4 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 }

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
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 animate-in fade-in duration-1000">
      {/* Top Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 md:gap-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#202124] mb-4 md:mb-6 leading-tight">Quiz Completed</h1>
          <p className="text-[#5F6368] text-lg md:text-xl leading-relaxed">
            Your assessment is complete. Review your performance metrics and detailed question breakdown below.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          <div className="flex-1 lg:flex-none bg-white border border-[#F1F3F4] p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm text-center min-w-[140px] md:min-w-[180px]">
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-2">Final Score</p>
            <div className="text-3xl md:text-5xl font-black text-[#4285F4]">{percentage}%</div>
          </div>
          <div className="flex-1 lg:flex-none bg-white border border-[#F1F3F4] p-6 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm text-center min-w-[140px] md:min-w-[180px]">
            <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-2">Percentile</p>
            <div className="text-3xl md:text-5xl font-black text-[#202124]">
              {percentile >= 50 ? `Top ${100 - percentile}%` : `Better than ${percentile}%`}
            </div>
          </div>
        </div>
      </div>

      <div ref={dashboardRef} className="space-y-8 md:space-y-12 bg-white rounded-[24px] md:rounded-[40px] p-1.5 md:p-2 border border-[#F1F3F4]">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8 p-4 md:p-10">
          <div className="lg:col-span-2 bg-white border border-[#F1F3F4] p-6 md:p-12 rounded-[24px] md:rounded-[32px]">
            <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-8 md:mb-12">Category Performance</h2>
            <div className="space-y-8 md:space-y-10">
              <CategoryBar label="Logic" score={percentage} />
              <CategoryBar label="Design" score={Math.max(20, percentage - 5)} />
              <CategoryBar label="History" score={Math.min(100, percentage + 8)} />
              <CategoryBar label="Technical" score={Math.max(15, percentage - 12)} />
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
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
            </div>
            <div className="bg-white border border-[#F1F3F4] p-8 md:p-10 rounded-[24px] md:rounded-[32px] flex flex-col justify-center">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-[#E8F0FE] flex items-center justify-center text-[#4285F4] mb-6 md:mb-8">
                <Trophy size={20} className="md:w-6 md:h-6" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-2">Achievement</p>
              <h3 className="text-xl md:text-2xl font-bold text-[#202124] mb-4">{achievement.title}</h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">{achievement.desc}</p>
            </div>
          </div>
        </div>

        {/* Question Breakdown */}
        <div className="p-4 md:p-10 pt-0">
          <h2 className="text-xl md:text-2xl font-bold text-[#202124] mb-8 md:mb-12 ml-4">Question Breakdown</h2>
          <div className="space-y-4">
            {attempt.attempt_answers.map((answer: any, index: number) => (
              <div key={answer.id} className="p-6 md:p-8 border border-[#F1F3F4] rounded-[20px] md:rounded-[24px] flex flex-col sm:flex-row items-start gap-4 md:gap-8 hover:bg-[#F8F9FA] transition-all duration-300 group">
                <div className="pt-1">
                  {answer.is_correct ? (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center text-[#34A853]">
                      <CheckCircle2 size={20} className="md:w-6 md:h-6" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FCE8E6] flex items-center justify-center text-[#EA4335]">
                      <XCircle size={20} className="md:w-6 md:h-6" />
                    </div>
                  )}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368]">
                      Q{index + 1} • {index % 2 === 0 ? 'LOGIC' : 'DESIGN'}
                    </span>
                    <span className={`text-[9px] md:text-[10px] font-bold uppercase tracking-[0.1em] ${answer.is_correct ? 'text-[#34A853]' : 'text-[#EA4335]'}`}>
                      {answer.is_correct ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="text-lg md:text-xl font-bold text-[#202124] mb-3 leading-tight">{answer.questions.question_text}</p>
                  <p className={`text-sm font-medium ${answer.is_correct ? 'text-[#34A853]' : 'text-[#EA4335]'}`}>
                    Your answer: {answer.options.option_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 py-8 md:py-12 px-4">
        <Button asChild className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 rounded-2xl bg-[#4285F4] hover:bg-[#1A73E8] text-base md:text-lg font-bold shadow-xl shadow-blue-100 transition-all hover:scale-[1.02]">
          <Link href="/dashboard">Return to Dashboard</Link>
        </Button>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto h-14 md:h-16 px-8 md:px-12 rounded-2xl border-2 border-[#DADCE0] gap-3 text-base md:text-lg font-bold hover:bg-[#F8F9FA] transition-all hover:scale-[1.02]"
          onClick={handleDownloadPDF}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Loader2 size={20} className="animate-spin md:w-6 md:h-6" />
              Generating Report...
            </>
          ) : (
            <>
              <Download size={20} className="md:w-6 md:h-6" />
              Download PDF Report
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

function CategoryBar({ label, score }: { label: string, score: number }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm font-bold tracking-tight">
        <span className="text-[#202124]">{label}</span>
        <span className="text-[#5F6368]">{score}%</span>
      </div>
      <div className="h-2 w-full bg-[#F1F3F4] rounded-full overflow-hidden">
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
    <div className="bg-white border border-[#F1F3F4] p-10 rounded-[32px] flex items-start gap-6 shadow-sm">
      <div className="w-12 h-12 rounded-2xl bg-[#F8F9FA] flex items-center justify-center mt-1 text-[#4285F4]">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] mb-2">{label}</p>
        <div className="text-3xl font-black text-[#202124] tracking-tight">{value}</div>
      </div>
    </div>
  )
}
