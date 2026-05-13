"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type ModalType = "privacy" | "terms" | null

export function LegalModal() {
  const [type, setType] = useState<ModalType>(null)

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: "At otaQku, we prioritize your data security. We only collect essential information required for authentication (via NextAuth and Google) and performance tracking. Your quiz data is isolated using Row Level Security (RLS) and is never shared with third parties. We use industry-standard encryption for all data at rest and in transit."
    },
    terms: {
      title: "Terms of Service",
      body: "By using otaQku, you agree to use the platform for educational and evaluation purposes. You maintain ownership of your data, but grant us the right to process it to provide analytics and reports. We are not responsible for any inaccuracies in quiz content or performance metrics. Misuse of the platform may result in account suspension."
    }
  }

  if (!type) {
    return (
      <div className="flex gap-8">
        <button 
          onClick={() => setType("privacy")}
          className="hover:text-[#202124] transition-colors"
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => setType("terms")}
          className="hover:text-[#202124] transition-colors"
        >
          Terms of Service
        </button>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <div 
        className="absolute inset-0 bg-[#202124]/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={() => setType(null)}
      />
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-10 stitch-card shadow-2xl animate-in zoom-in-95 fade-in duration-300">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-medium text-[#202124]">{content[type].title}</h2>
          <Button variant="ghost" onClick={() => setType(null)} className="p-2 h-10 w-10 rounded-full">
            <X size={20} />
          </Button>
        </div>
        <p className="text-[#5F6368] leading-relaxed mb-8">
          {content[type].body}
        </p>
        <Button onClick={() => setType(null)} className="w-full rounded-xl">
          Accept & Close
        </Button>
      </div>
    </div>
  )
}
