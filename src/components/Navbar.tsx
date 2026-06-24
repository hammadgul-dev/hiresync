"use client"

import Link from "next/link"
import {Briefcase, Menu, X} from "lucide-react"
import {useState} from "react"
import {usePathname} from "next/navigation"
import {useSession, signOut} from "next-auth/react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const {data: session} = useSession()

  const links = [
    {href: "/find-jobs", label: "Find Jobs"},
    {href: "/companies", label: "Companies"},
    {href: "/salaries", label: "Salaries"},
    {href: "/resources", label: "Resources"},
  ]

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm px-4 md:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#2d4fd6] font-bold text-xl"
        >
          <Briefcase size={22} />
          <span>HireSync</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          {links.map(({href, label}) => (
            <Link
              key={href}
              href={href}
              className={`pb-1 transition-colors ${pathname === href ? "text-[#2d4fd6] border-b-2 border-[#2d4fd6]" : "hover:text-[#2d4fd6]"}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#eef1fb] border-2 border-[#2d4fd6] flex items-center justify-center">
                <span className="text-sm font-bold text-[#2d4fd6]">
                  {(session.user?.name || "U")[0].toUpperCase()}
                </span>
              </div>
              <button
                onClick={() => signOut({callbackUrl: "/"})}
                className="px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#2d4fd6] transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="px-6 py-2.5 text-sm font-medium bg-[#2d4fd6] text-white rounded-lg hover:bg-[#2440b8] transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-600 cursor-pointer"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 flex flex-col gap-4">
          {links.map(({href, label}) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors ${pathname === href ? "text-[#2d4fd6]" : "text-gray-600"}`}
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-gray-100">
            {session ? (
              <button
                onClick={() => signOut({callbackUrl: "/"})}
                className="w-full text-center px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-sm font-medium bg-[#2d4fd6] text-white rounded-lg hover:bg-[#2440b8] cursor-pointer"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
