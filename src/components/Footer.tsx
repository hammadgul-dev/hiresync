import Link from "next/link"
import {Briefcase, Share2, Globe, Mail} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#f0f4ff] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2 mb-3">
              <Briefcase className="w-5 h-5 text-[#2d4fd6]" />
              <span className="font-bold text-[#2d4fd6] text-lg">HireSync</span>
            </Link>
            <p className="text-sm text-center md:text-left text-gray-500 mb-4">
              Your journey to the perfect career starts here. Connecting talent
              with opportunity globally.
            </p>
            <div className="flex gap-3">
              <Share2 className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#2d4fd6] transition-colors" />
              <Globe className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#2d4fd6] transition-colors" />
              <Mail className="w-5 h-5 text-gray-400 cursor-pointer hover:text-[#2d4fd6] transition-colors" />
            </div>
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4 text-center">
              Product
            </h4>
            <ul className="flex flex-row justify-center gap-4 md:flex-col md:items-center md:gap-0 md:space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/find-jobs" className="hover:text-[#2d4fd6]">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/companies" className="hover:text-[#2d4fd6]">
                  Companies
                </Link>
              </li>
              <li>
                <Link href="/salaries" className="hover:text-[#2d4fd6]">
                  Salaries
                </Link>
              </li>
            </ul>
          </div>

          <div className="hidden md:block">
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-[#2d4fd6]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-400">
          © 2026 HireSync. Connecting talent with opportunity. All rights
          reserved.
        </div>
      </div>
    </footer>
  )
}
