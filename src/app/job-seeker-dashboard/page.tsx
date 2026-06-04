"use client"

import {useState} from "react"
import {Briefcase, Bookmark, Eye, Send, X} from "lucide-react"

const stats = [
  {icon: Send, label: "Jobs Applied", value: 24},
  {icon: Bookmark, label: "Saved Jobs", value: 18},
  {icon: Eye, label: "Profile Views", value: 142},
]

const applications = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechFlow",
    appliedDate: "Oct 24, 2024",
    status: "Reviewed",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "CreativeMind",
    appliedDate: "Oct 22, 2024",
    status: "Pending",
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Analytica AI",
    appliedDate: "Oct 20, 2024",
    status: "Accepted",
  },
  {
    id: 4,
    title: "Sales Executive",
    company: "RetailPro",
    appliedDate: "Oct 18, 2024",
    status: "Rejected",
  },
  {
    id: 5,
    title: "Backend Engineer",
    company: "CloudBase",
    appliedDate: "Oct 15, 2024",
    status: "Pending",
  },
  {
    id: 6,
    title: "UI/UX Designer",
    company: "PixelCraft",
    appliedDate: "Oct 12, 2024",
    status: "Reviewed",
  },
]

const savedJobs = [
  {
    id: 1,
    icon: "☁️",
    title: "Cloud Infrastructure Architect",
    company: "SkyNet Systems",
    location: "Austin, TX (Remote)",
    type: "Full-time",
    salary: "$140k - $180k",
  },
  {
    id: 2,
    icon: "🛡️",
    title: "Cybersecurity Analyst",
    company: "SafeGuard Ltd",
    location: "New York, NY",
    type: "Hybrid",
    salary: "$110k - $135k",
  },
  {
    id: 3,
    icon: "📢",
    title: "Digital Marketing Manager",
    company: "GrowthHub",
    location: "San Francisco, CA",
    type: "Contract",
    salary: "$90k - $115k",
  },
  {
    id: 4,
    icon: "🧠",
    title: "Machine Learning Engineer",
    company: "NeuralTech",
    location: "Remote",
    type: "Full-time",
    salary: "$130k - $160k",
  },
  {
    id: 5,
    icon: "📊",
    title: "Data Analyst",
    company: "InsightCo",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$80k - $100k",
  },
]

const statusStyles: Record<string, string> = {
  Reviewed: "bg-blue-100 text-blue-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
}

export default function JobSeekerDashboard() {
  const [removedSaved, setRemovedSaved] = useState<number[]>([])
  const visibleSaved = savedJobs.filter((j) => !removedSaved.includes(j.id))

  return (
    <div className="min-h-screen bg-[#f0f4ff] font-[Poppins]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Welcome back, John!
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Here&apos;s your job search summary
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {stats.map(({icon: Icon, label, value}) => (
            <div
              key={label}
              className="bg-white rounded-xl shadow-sm p-3 sm:p-5 flex flex-col items-start gap-1.5 sm:gap-3"
            >
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#eef1fb] flex items-center justify-center shrink-0">
                <Icon size={14} className="text-[#2d4fd6] sm:hidden" />
                <Icon size={16} className="text-[#2d4fd6] hidden sm:block" />
              </div>
              <p className="text-base sm:text-2xl font-bold text-gray-900 leading-tight">
                {value}
              </p>
              <p className="text-[10px] leading-tight sm:text-sm text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-[1.8]">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
              <h2 className="text-sm sm:text-base font-semibold text-gray-900 mb-4">
                My Applications
              </h2>
              <div className="overflow-y-auto max-h-[420px] flex flex-col gap-3 pr-0.5">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="border border-gray-100 rounded-xl p-3 sm:p-4"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                        <div className="hidden sm:flex w-9 h-9 rounded-lg bg-[#eef1fb] items-center justify-center shrink-0">
                          <Briefcase size={16} className="text-[#2d4fd6]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                            {app.title}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {app.company}
                          </p>
                          <p className="text-[11px] text-gray-400 mt-0.5">
                            Applied: {app.appliedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 shrink-0">
                        <span
                          className={`text-[10px] sm:text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusStyles[app.status]}`}
                        >
                          {app.status}
                        </span>
                        <button className="text-xs text-[#2d4fd6] font-medium hover:underline cursor-pointer whitespace-nowrap">
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm sm:text-base font-semibold text-gray-900">
                  Saved Jobs
                </h2>
                <button className="text-xs text-[#2d4fd6] font-medium hover:underline cursor-pointer">
                  Explore More
                </button>
              </div>
              <div className="overflow-y-auto max-h-[420px] flex flex-col gap-3 pr-0.5">
                {visibleSaved.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-6">
                    No saved jobs
                  </p>
                ) : (
                  visibleSaved.map((job) => (
                    <div
                      key={job.id}
                      className="border border-gray-100 rounded-xl p-3 sm:p-4"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#eef1fb] flex items-center justify-center text-sm shrink-0">
                            {job.icon}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-snug">
                              {job.title}
                            </p>
                            <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                              {job.company} • {job.location}
                            </p>
                            <div className="flex gap-1.5 mt-1.5 flex-wrap">
                              <span className="text-[10px] sm:text-xs bg-[#eef1fb] text-[#2d4fd6] px-2 py-0.5 rounded-full">
                                {job.type}
                              </span>
                              <span className="text-[10px] sm:text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {job.salary}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            setRemovedSaved((prev) => [...prev, job.id])
                          }
                          className="text-gray-300 hover:text-red-400 cursor-pointer transition-colors shrink-0 mt-0.5"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      <div className="hidden sm:block mt-3">
                        <button className="w-full bg-[#2d4fd6] hover:bg-[#2440b8] text-white text-xs font-medium py-2 rounded-lg cursor-pointer transition-colors">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
