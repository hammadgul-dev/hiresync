import {BookOpen, Video, FileText, Lightbulb, ArrowRight} from "lucide-react"

const resources = [
  {
    id: 1,
    category: "Career Tips",
    icon: Lightbulb,
    title: "How to Write a Winning Resume in 2024",
    description:
      "Learn the key elements that make your resume stand out to recruiters and ATS systems.",
    readTime: "5 min read",
    type: "Article",
  },
  {
    id: 2,
    category: "Interview Prep",
    icon: Video,
    title: "Top 10 Common Interview Questions & Answers",
    description:
      "Prepare for your next interview with the most frequently asked questions and expert answers.",
    readTime: "8 min read",
    type: "Guide",
  },
  {
    id: 3,
    category: "Career Tips",
    icon: FileText,
    title: "Cover Letter Templates That Get Responses",
    description:
      "Professionally crafted cover letter templates for different industries and experience levels.",
    readTime: "4 min read",
    type: "Template",
  },
  {
    id: 4,
    category: "Job Search",
    icon: BookOpen,
    title: "LinkedIn Profile Optimization Guide",
    description:
      "Step-by-step guide to optimizing your LinkedIn profile to attract recruiters organically.",
    readTime: "6 min read",
    type: "Guide",
  },
  {
    id: 5,
    category: "Interview Prep",
    icon: Video,
    title: "Mastering the Technical Interview",
    description:
      "Tips and strategies to ace coding interviews at top tech companies like FAANG.",
    readTime: "10 min read",
    type: "Article",
  },
  {
    id: 6,
    category: "Career Growth",
    icon: Lightbulb,
    title: "How to Negotiate Your Salary Confidently",
    description:
      "Proven negotiation tactics to help you get the compensation you deserve.",
    readTime: "5 min read",
    type: "Article",
  },
  {
    id: 7,
    category: "Job Search",
    icon: FileText,
    title: "Remote Job Hunting: Complete Guide",
    description:
      "Everything you need to know about finding and landing remote jobs in today's market.",
    readTime: "7 min read",
    type: "Guide",
  },
  {
    id: 8,
    category: "Career Growth",
    icon: BookOpen,
    title: "Building a Personal Brand as a Developer",
    description:
      "How to build your online presence and become a recognizable name in your industry.",
    readTime: "6 min read",
    type: "Article",
  },
  {
    id: 9,
    category: "Interview Prep",
    icon: Video,
    title: "Behavioral Interview Questions Decoded",
    description:
      "How to use the STAR method to answer behavioral questions with confidence.",
    readTime: "5 min read",
    type: "Guide",
  },
]

const categories = [
  "All",
  "Career Tips",
  "Interview Prep",
  "Job Search",
  "Career Growth",
]

const typeColors: Record<string, string> = {
  Article: "bg-blue-50 text-blue-600",
  Guide: "bg-green-50 text-green-600",
  Template: "bg-purple-50 text-purple-600",
}

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Career Resources</h1>
          <p className="text-gray-500 text-sm mt-1">
            Guides, tips and tools to help you land your dream job
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search resources..."
            className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
          />
          <select className="border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] cursor-pointer text-gray-600">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          {resources.length} resources found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((r) => {
            const Icon = r.icon
            return (
              <div
                key={r.id}
                className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="w-10 h-10 rounded-xl bg-[#eef1fb] flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-[#2d4fd6]" />
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeColors[r.type]}`}
                  >
                    {r.type}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-[#2d4fd6] font-medium mb-1">
                    {r.category}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 leading-snug">
                    {r.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                    {r.description}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-400">{r.readTime}</span>
                  <button className="flex items-center gap-1 text-xs text-[#2d4fd6] font-medium hover:underline cursor-pointer">
                    Read More <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
