"use client"

import Link from "next/link"
import {Briefcase, Menu, X} from "lucide-react"
import {useState} from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-blue-600 font-bold text-xl"
        >
          <Briefcase size={22} />
          <span>HireSync</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link
            href="/jobs"
            className="text-blue-600 border-b-2 border-blue-600 pb-1"
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="hover:text-blue-600 transition-colors"
          >
            Companies
          </Link>
          <Link
            href="/salaries"
            className="hover:text-blue-600 transition-colors"
          >
            Salaries
          </Link>
          <Link
            href="/resources"
            className="hover:text-blue-600 transition-colors"
          >
            Resources
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-2.5 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          <Link
            href="/jobs"
            className="text-sm font-medium text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Find Jobs
          </Link>
          <Link
            href="/companies"
            className="text-sm font-medium text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Companies
          </Link>
          <Link
            href="/salaries"
            className="text-sm font-medium text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Salaries
          </Link>
          <Link
            href="/resources"
            className="text-sm font-medium text-gray-600"
            onClick={() => setMenuOpen(false)}
          >
            Resources
          </Link>

          <div className="flex gap-3 pt-3 border-t border-gray-100">
            <Link
              href="/login"
              className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              href="/register"
              className="w-full text-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
