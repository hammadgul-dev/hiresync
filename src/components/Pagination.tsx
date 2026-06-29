"use client"

import {ChevronLeft, ChevronRight} from "lucide-react"

interface Props {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  let getPageNumbers = () => {
    let pages: number[] = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#2d4fd6] hover:text-[#2d4fd6] disabled:opacity-40 cursor-pointer transition"
      >
        <ChevronLeft size={15} />
      </button>
      {getPageNumbers().map((page, i) =>
        page === "..." ? (
          <span
            key={i}
            className="w-8 h-8 flex items-center justify-center text-sm text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={i}
            onClick={() => onPageChange(page as number)}
            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm cursor-pointer transition border ${currentPage === page ? "bg-[#2d4fd6] text-white border-[#2d4fd6]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2d4fd6] hover:text-[#2d4fd6]"}`}
          >
            {page}
          </button>
        ),
      )}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 hover:border-[#2d4fd6] hover:text-[#2d4fd6] disabled:opacity-40 cursor-pointer transition"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
