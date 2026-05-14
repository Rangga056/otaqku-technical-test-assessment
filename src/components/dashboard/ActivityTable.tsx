"use client"

import React, { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import { 
  ChevronDown, 
  ChevronUp, 
  Search, 
  ArrowRight,
  Filter,
  Calendar,
  Award,
  Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Attempt {
  id: string
  created_at: string
  total_score: number
  max_score: number
  category: string
  quizzes: {
    title: string
  }
}

export function ActivityTable({ attempts }: { attempts: Attempt[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const [sortConfig, setSortConfig] = useState<{ key: string, direction: 'asc' | 'desc' } | null>({
    key: 'created_at',
    direction: 'desc'
  })
  const [filterQuery, setFilterConfig] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('All')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const categories = ['All', 'Beginner', 'Intermediate', 'Advanced']

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const filteredAndSortedItems = useMemo(() => {
    let items = [...attempts]

    // Filtering
    if (filterQuery) {
      items = items.filter(item => 
        item.quizzes.title.toLowerCase().includes(filterQuery.toLowerCase())
      )
    }

    if (categoryFilter !== 'All') {
      items = items.filter(item => item.category === categoryFilter)
    }

    // Sorting
    if (sortConfig !== null) {
      items.sort((a, b) => {
        let aValue: any = a[sortConfig.key as keyof Attempt]
        let bValue: any = b[sortConfig.key as keyof Attempt]

        if (sortConfig.key === 'title') {
          aValue = a.quizzes.title
          bValue = b.quizzes.title
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
      })
    }
    return items
  }, [attempts, sortConfig, filterQuery, categoryFilter])

  // Pagination Logic
  const totalPages = Math.ceil(filteredAndSortedItems.length / itemsPerPage)
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    return filteredAndSortedItems.slice(startIndex, startIndex + itemsPerPage)
  }, [filteredAndSortedItems, currentPage])

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filterQuery, categoryFilter, sortConfig])

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) return <ChevronDown size={14} className="opacity-20" />
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />
  }

  return (
    <div className="space-y-6">
      {/* Table Controls */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#DADCE0]" size={18} />
          <input 
            type="text" 
            placeholder="Search assessments..."
            className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#F1F3F4] bg-white focus:outline-none focus:ring-4 focus:ring-[#4285F4]/5 focus:border-[#4285F4] transition-all text-sm font-medium shadow-sm"
            value={filterQuery}
            onChange={(e) => setFilterConfig(e.target.value)}
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-[#F1F3F4] hover:border-[#DADCE0] transition-all shadow-sm group min-w-[160px] justify-between"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-[#5F6368] group-hover:text-[#202124]">
              <Filter size={16} />
              <span>{categoryFilter}</span>
            </div>
            <ChevronDown size={16} className={`text-[#DADCE0] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-[#F1F3F4] shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="py-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategoryFilter(cat)
                      setIsDropdownOpen(false)
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                      categoryFilter === cat 
                      ? "bg-[#E8F0FE] text-[#1A73E8]" 
                      : "text-[#5F6368] hover:bg-[#F8F9FA] hover:text-[#202124]"
                    }`}
                  >
                    {cat}
                    {categoryFilter === cat && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Actual Table */}
      <div className="bg-white rounded-[32px] border border-[#F1F3F4] shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-[#F8F9FA] border-b border-[#F1F3F4]">
                <th 
                  className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] cursor-pointer hover:text-[#202124] transition-colors"
                  onClick={() => requestSort('title')}
                >
                  <div className="flex items-center gap-2">
                    Evaluation {getSortIcon('title')}
                  </div>
                </th>
                <th 
                  className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] cursor-pointer hover:text-[#202124] transition-colors"
                  onClick={() => requestSort('created_at')}
                >
                  <div className="flex items-center gap-2">
                    Completion Date {getSortIcon('created_at')}
                  </div>
                </th>
                <th 
                  className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368] cursor-pointer hover:text-[#202124] transition-colors text-right"
                  onClick={() => requestSort('total_score')}
                >
                  <div className="flex items-center justify-end gap-2">
                    Score {getSortIcon('total_score')}
                  </div>
                </th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#5F6368]">
                  Level
                </th>
                <th className="px-8 py-5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F3F4]">
              {paginatedItems.length > 0 ? paginatedItems.map((attempt) => (
                <tr key={attempt.id} className="hover:bg-[#F8F9FA] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-[#202124] text-base group-hover:text-[#4285F4] transition-colors">{attempt.quizzes.title}</p>
                  </td>
                  <td className="px-8 py-6 text-[#5F6368] text-sm font-medium whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="opacity-40" />
                      {new Date(attempt.created_at).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right whitespace-nowrap">
                    <div className="flex flex-col items-end">
                      <span className="font-black text-xl text-[#202124]">
                        {Math.round((attempt.total_score / attempt.max_score) * 100)}%
                      </span>
                      <span className="text-[10px] text-[#5F6368] font-bold uppercase tracking-wider">{attempt.total_score} / {attempt.max_score} pts</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      attempt.category === 'Advanced' ? 'bg-[#E6F4EA] text-[#34A853]' :
                      attempt.category === 'Intermediate' ? 'bg-[#FEF7E0] text-[#FBBC05]' :
                      'bg-[#FCE8E6] text-[#EA4335]'
                    }`}>
                      <Award size={10} />
                      {attempt.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <Link 
                      href={`/quiz/result/${attempt.id}`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F8F9FA] text-[#5F6368] hover:bg-[#4285F4] hover:text-white transition-all shadow-sm group/btn"
                    >
                      <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-[#5F6368]">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#F8F9FA] flex items-center justify-center text-[#DADCE0]">
                        <Search size={32} />
                      </div>
                      <p className="font-medium">No results found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="px-8 py-6 border-t border-[#F1F3F4] flex flex-col sm:flex-row items-center justify-between bg-[#F8F9FA]/50 gap-4">
            <p className="text-xs font-bold text-[#5F6368] uppercase tracking-widest">
              Page <span className="text-[#202124]">{currentPage}</span> of <span className="text-[#202124]">{totalPages}</span>
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-10 px-5 text-xs font-bold bg-white border-[#DADCE0] hover:bg-white hover:border-[#4285F4] transition-all"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${
                      currentPage === page 
                      ? "bg-[#4285F4] text-white shadow-lg shadow-blue-100" 
                      : "bg-white border border-[#DADCE0] text-[#5F6368] hover:border-[#4285F4]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl h-10 px-5 text-xs font-bold bg-white border-[#DADCE0] hover:bg-white hover:border-[#4285F4] transition-all"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
