"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface LegalModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
}

export function LegalModal({ isOpen, onClose, title, content }: LegalModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#202124]/40 backdrop-blur-sm" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-[#DADCE0]">
          <h2 className="text-xl font-medium text-[#202124]">{title}</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose} 
            className="rounded-full hover:bg-[#F8F9FA]"
          >
            <X size={20} />
          </Button>
        </div>
        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="prose prose-sm max-w-none text-[#5F6368] space-y-4">
            {content.split('\n').map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>
        </div>
        <div className="p-6 bg-[#F8F9FA] border-t border-[#DADCE0] flex justify-end">
          <Button onClick={onClose} className="rounded-xl px-8">
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}
