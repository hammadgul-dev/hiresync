"use client"

import {useState} from "react"
import {
  Building2,
  MapPin,
  Clock,
  Calendar,
  Briefcase,
  DollarSign,
  BarChart2,
  Tag,
  ExternalLink,
  Bookmark,
  Bell,
  X,
} from "lucide-react"

const job = {
  title: "Senior Software Engineer",
  company: "CloudScale Tech",
  companyDesc:
    "CloudScale is a leading provider of high-performance data infrastructure, helping enterprise companies scale their digital operations through intelligent cloud automation.",
  companyType: "SaaS & Data Analytics",
  location: "San Francisco, CA",
  posted: "2 days ago",
  tags: ["Full Time", "Remote", "Senior Level"],
  salary: "$140k - $180k",
  datePosted: "Nov 22, 2024",
  jobType: "Full Time",
  experience: "Senior (5+ Years)",
  category: "Software Engineering",
  logo: "CS",
}

const myApplications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Stripe",
    logo: "ST",
    date: "Nov 18, 2024",
    status: "Under Review",
  },
  {
    id: 2,
    title: "React Engineer",
    company: "Vercel",
    logo: "VC",
    date: "Nov 10, 2024",
    status: "Shortlisted",
  },
  {
    id: 3,
    title: "Full Stack Dev",
    company: "Linear",
    logo: "LN",
    date: "Oct 30, 2024",
    status: "Rejected",
  },
  {
    id: 4,
    title: "UI Engineer",
    company: "Figma",
    logo: "FG",
    date: "Oct 22, 2024",
    status: "Applied",
  },
]

const savedJobs = [
  {
    id: 1,
    title: "Product Designer",
    company: "Notion",
    logo: "NO",
    salary: "$110k - $150k",
  },
  {
    id: 2,
    title: "Data Analyst",
    company: "Airbnb",
    logo: "AB",
    salary: "$100k - $140k",
  },
  {
    id: 3,
    title: "DevOps Engineer",
    company: "GitHub",
    logo: "GH",
    salary: "$130k - $160k",
  },
  {
    id: 4,
    title: "ML Engineer",
    company: "OpenAI",
    logo: "OA",
    salary: "$160k - $200k",
  },
]

const statusColor: Record<string, string> = {
  "Under Review": "bg-yellow-100 text-yellow-700",
  Shortlisted: "bg-blue-100 text-[#2d4fd6]",
  Rejected: "bg-red-100 text-red-600",
  Applied: "bg-gray-100 text-gray-600",
}

const tabs = ["Overview", "Requirements", "Benefits"]

const overviewContent = (
  <div className="flex flex-col gap-4 text-sm text-gray-600 leading-relaxed">
    <div>
      <h3 className="font-semibold text-gray-800 text-base mb-2">
        About the Role
      </h3>
      <p className="text-justify">
        CloudScale Tech is looking for a Senior Software Engineer to join our
        core platform team. You will be responsible for designing and
        implementing scalable cloud-native services that power our global data
        analytics platform.
      </p>
    </div>
    <p className="text-justify">
      You will work closely with product managers, designers, and other
      engineers to deliver new features from conception to deployment. As a
      senior member of the team, you will also mentor junior engineers and
      contribute to architectural decisions.
    </p>
  </div>
)

const requirementsContent = (
  <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-2">
    <li>5+ years of experience in software engineering</li>
    <li>Strong proficiency in TypeScript, React, and Node.js</li>
    <li>Experience with cloud platforms (AWS, GCP, or Azure)</li>
    <li>Familiarity with distributed systems and microservices</li>
    <li>Excellent communication and collaboration skills</li>
  </ul>
)

const benefitsContent = (
  <ul className="list-disc list-inside text-sm text-gray-600 flex flex-col gap-2">
    <li>Competitive salary and equity package</li>
    <li>Remote-first work environment</li>
    <li>Health, dental, and vision insurance</li>
    <li>$2,000 annual learning & development budget</li>
    <li>Unlimited PTO policy</li>
  </ul>
)

const tabContent: Record<string, React.ReactNode> = {
  Overview: overviewContent,
  Requirements: requirementsContent,
  Benefits: benefitsContent,
}

export default function JobDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview")
  const [savedJob, setSavedJob] = useState(false)
  const [showNotifModal, setShowNotifModal] = useState(false)
  const [notifEmail, setNotifEmail] = useState("")

  return (
    <div
      className="min-h-screen bg-[#f0f4ff] flex flex-col"
      style={{fontFamily: "Poppins, sans-serif"}}
    >
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {/* Job Header */}
            <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="hidden sm:flex w-14 h-14 rounded-xl bg-[#eef1fb] items-center justify-center text-[#2d4fd6] font-bold text-lg shrink-0">
                  {job.logo}
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {job.title}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500 mt-1">
                    <span className="flex items-center gap-1">
                      <Building2 size={13} />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {job.posted}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5 pt-5 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Salary Range</p>
                  <p className="text-xl font-bold text-[#2d4fd6]">
                    {job.salary}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
                  <button className="bg-[#2d4fd6] hover:bg-[#2440b8] text-white px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition text-center">
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

            {/* Tabs */}
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

          {/* RIGHT */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-5">
            {/* Job Overview */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <h2 className="font-semibold text-gray-800 mb-4">Job Overview</h2>
              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: <Calendar size={15} />,
                    label: "DATE POSTED",
                    value: job.datePosted,
                  },
                  {
                    icon: <Briefcase size={15} />,
                    label: "JOB TYPE",
                    value: job.jobType,
                  },
                  {
                    icon: <DollarSign size={15} />,
                    label: "SALARY",
                    value: job.salary,
                  },
                  {
                    icon: <MapPin size={15} />,
                    label: "LOCATION",
                    value: job.location,
                  },
                  {
                    icon: <BarChart2 size={15} />,
                    label: "EXPERIENCE LEVEL",
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

            {/* Company */}
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#eef1fb] flex items-center justify-center text-[#2d4fd6] font-bold text-sm">
                  {job.logo}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {job.company}
                  </p>
                  <p className="text-xs text-gray-500">{job.companyType}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-4">
                {job.companyDesc}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
