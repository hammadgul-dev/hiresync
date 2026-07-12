"use client"

import {useState, useEffect} from "react"
import {useParams} from "next/navigation"
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  BarChart2,
  Tag,
  Bookmark,
} from "lucide-react"

export default function JobDetailPage() {
  let {id} = useParams()
  let [job, setJob] = useState<any>(null)
  let [loading, setLoading] = useState(true)
  let [activeTab, setActiveTab] = useState("Overview")
  let [savedJob, setSavedJob] = useState(false)
  let [applyOpen, setApplyOpen] = useState(false)
  let [company, setCompany] = useState<any>(null)

  let tabs = ["Overview", "Requirements", "Benefits"]

  useEffect(() => {
    let fetchJob = async () => {
      try {
        let res = await fetch(`/api/jobs/${id}`)
        let data = await res.json()
        setJob(data.job)
        setCompany(data.company)
      } catch {
        setJob(null)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  if (loading)
    return (
      <div
        className="min-h-screen bg-[#f0f4ff] flex items-center justify-center text-gray-400 text-sm"
        style={{fontFamily: "Poppins, sans-serif"}}
      >
        Loading...
      </div>
    )
  if (!job)
    return (
      <div
        className="min-h-screen bg-[#f0f4ff] flex items-center justify-center text-gray-400 text-sm"
        style={{fontFamily: "Poppins, sans-serif"}}
      >
        Job not found
      </div>
    )

  let initials = job.companyName
    ?.split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  let posted = new Date(job.createdAt)
  let diff = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60))
  let postedLabel =
    diff < 24 ? `${diff} hours ago` : `${Math.floor(diff / 24)} days ago`

  let tabContent: Record<string, React.ReactNode> = {
    Overview: (
      <div
        className="text-sm text-gray-600 leading-relaxed"
        dangerouslySetInnerHTML={{__html: job.description}}
      />
    ),
    Requirements: (
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        {job.requirements}
      </p>
    ),
    Benefits: (
      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
        {job.benefits || "No benefits listed"}
      </p>
    ),
  }

  return (
    <div
      className="min-h-screen bg-[#f0f4ff] flex flex-col"
      style={{fontFamily: "Poppins, sans-serif"}}
    >
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-14 h-14 rounded-xl bg-[#eef1fb] items-center justify-center text-[#2d4fd6] font-bold text-lg shrink-0">
                  {initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Building2 size={13} />
                      {job.companyName}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {postedLabel}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-3 py-1 rounded-full">
                      {job.jobType}
                    </span>
                    <span className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-3 py-1 rounded-full">
                      {job.experience}
                    </span>
                    <span className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-3 py-1 rounded-full">
                      {job.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Salary Range</p>
                  <p className="text-xl font-bold text-[#2d4fd6]">
                    {job.currency} {job.salaryMin?.toLocaleString()} -{" "}
                    {job.salaryMax?.toLocaleString()}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setApplyOpen(true)}
                    className="bg-[#2d4fd6] hover:bg-[#2440b8] text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition text-center"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => setSavedJob(!savedJob)}
                    className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium border cursor-pointer transition ${savedJob ? "bg-[#eef1fb] text-[#2d4fd6] border-[#2d4fd6]" : "bg-white text-gray-600 border-gray-200 hover:border-[#2d4fd6]"}`}
                  >
                    <Bookmark size={15} fill={savedJob ? "#2d4fd6" : "none"} />
                    Save Job
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="flex border-b border-gray-100">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-sm font-medium cursor-pointer transition ${activeTab === tab ? "text-[#2d4fd6] border-b-2 border-[#2d4fd6]" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="p-5 sm:p-6">{tabContent[activeTab]}</div>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Job Overview</h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <Calendar size={15} />,
                    label: "DATE POSTED",
                    value: new Date(job.createdAt).toLocaleDateString(),
                  },
                  {
                    icon: <Briefcase size={15} />,
                    label: "JOB TYPE",
                    value: job.jobType,
                  },
                  {
                    icon: <DollarSign size={15} />,
                    label: "SALARY",
                    value: `${job.currency} ${job.salaryMin?.toLocaleString()} - ${job.salaryMax?.toLocaleString()}`,
                  },
                  {
                    icon: <MapPin size={15} />,
                    label: "LOCATION",
                    value: job.location,
                  },
                  {
                    icon: <BarChart2 size={15} />,
                    label: "EXPERIENCE",
                    value: job.experience,
                  },
                  {
                    icon: <Tag size={15} />,
                    label: "CATEGORY",
                    value: job.category,
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-lg bg-[#eef1fb] flex items-center justify-center text-[#2d4fd6] shrink-0">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wide">
                        {item.label}
                      </p>
                      <p className="text-sm font-medium text-gray-800">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef1fb] flex items-center justify-center text-[#2d4fd6] font-bold text-sm">
                  {initials}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {job.companyName}
                  </p>
                  <p
                    className="text-xs text-gray-500 max-h-24 overflow-y-auto mt-1 [&::-webkit-scrollbar]:hidden"
                    style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
                  >
                    {company?.companyDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
