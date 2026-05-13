"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ResultDashboard({ attempt }: { attempt: any }) {
  const percentage = Math.round((attempt.total_score / attempt.max_score) * 100)
  
  const pieData = [
    { name: 'Correct', value: attempt.total_score },
    { name: 'Incorrect', value: attempt.max_score - attempt.total_score },
  ]
  
  const COLORS = ['#10b981', '#ef4444']

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
        <p className="text-gray-500 mb-8">{attempt.quizzes.title}</p>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="text-left space-y-4">
            <div>
              <span className="text-5xl font-black text-blue-600">{percentage}%</span>
              <span className="text-gray-400 ml-2">Score</span>
            </div>
            <div>
              <span className="px-4 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">
                {attempt.category}
              </span>
            </div>
            <p className="text-gray-600">
              You got {attempt.total_score} out of {attempt.max_score} points correctly.
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button variant="outline" onClick={() => window.open(`/api/report/${attempt.id}`, '_blank')}>
            Download PDF Report
          </Button>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-xl font-bold mb-6">Answer Breakdown</h2>
        <div className="space-y-4">
          {attempt.attempt_answers.map((answer: any, index: number) => (
            <div key={answer.id} className="p-4 border rounded-xl flex items-start gap-4">
              <div className={`mt-1 h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                answer.is_correct ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{answer.questions.question_text}</p>
                <p className={`text-sm ${answer.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                  Your answer: {answer.options.option_text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Helper to allow Button to work with Link
function ButtonWithLink({ children, href, ...props }: any) {
  return (
    <Button {...props} asChild>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
