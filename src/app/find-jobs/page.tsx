"use client"

import {useState} from "react"
import {Search, MapPin, Bookmark, Building2} from "lucide-react"

const jobs = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "CloudScale Tech",
    location: "San Francisco, CA (Remote)",
    tags: ["Full Time", "Remote"],
    salary: "$140k - $180k",
    posted: "Posted 2 days ago",
    logo: "CS",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "Creative Pulse",
    location: "New York, NY",
    tags: ["Full Time"],
    salary: "$110k - $150k",
    posted: "Posted 5 hours ago",
    logo: "CP",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "GrowthLabs",
    location: "Austin, TX (Hybrid)",
    tags: ["Part Time"],
    salary: "$90k - $120k",
    posted: "Posted 1 day ago",
    logo: "GL",
  },
  {
    id: 4,
    title: "Data Analyst",
    company: "RetailGenius",
    location: "Chicago, IL",
    tags: ["Full Time"],
    salary: "$100k - $140k",
    posted: "Posted 3 days ago",
    logo: "RG",
  },
]

const jobTypes = ["Full Time", "Part Time", "Remote", "Hybrid"]
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"]
const categories = ["Technology", "Marketing", "Design"]
const sortOptions = ["Most Recent", "Most Relevant", "Highest Salary"]

export default function FindJobsPage() {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([
    "Full Time",
    "Remote",
  ])
  const [selectedExp, setSelectedExp] = useState<string[]>([])
  const [selectedCats, setSelectedCats] = useState<string[]>(["Technology"])
  const [sortBy, setSortBy] = useState("Most Recent")
  const [searchTitle, setSearchTitle] = useState("")
  const [searchLocation, setSearchLocation] = useState("")
  const [saved, setSaved] = useState<number[]>([])

  const toggle = (
    list: string[],
    setList: (v: string[]) => void,
    val: string,
  ) => {
    setList(list.includes(val) ? list.filter((i) => i !== val) : [...list, val])
  }

  const toggleSave = (id: number) => {
    setSaved((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  return (
    <div
      className="min-h-screen bg-[#f0f4ff] flex flex-col"
      style={{fontFamily: "Poppins, sans-serif"}}
    >
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Job title, keywords, or company"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#2d4fd6] transition"
            />
          </div>
          <div className="relative flex-1">
            <MapPin size={16} className="absolute left-3 top-3 text-gray-400" />
            <input
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="City, state, or remote"
              className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-[#2d4fd6] transition"
            />
          </div>
          <button className="bg-[#2d4fd6] hover:bg-[#2440b8] text-white px-6 py-2.5 rounded-lg text-sm font-medium cursor-pointer transition whitespace-nowrap">
            Search Jobs
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Filters</h2>
                <button className="text-xs text-[#2d4fd6] hover:underline cursor-pointer">
                  Reset
                </button>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Job Type
                </p>
                <div className="flex flex-col gap-2">
                  {jobTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedJobTypes.includes(type)}
                        onChange={() =>
                          toggle(selectedJobTypes, setSelectedJobTypes, type)
                        }
                        className="w-4 h-4 accent-[#2d4fd6] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Experience Level
                </p>
                <div className="flex flex-col gap-2">
                  {experienceLevels.map((level) => (
                    <label
                      key={level}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedExp.includes(level)}
                        onChange={() =>
                          toggle(selectedExp, setSelectedExp, level)
                        }
                        className="w-4 h-4 accent-[#2d4fd6] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  Category
                </p>
                <div className="flex flex-col gap-2">
                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(cat)}
                        onChange={() =>
                          toggle(selectedCats, setSelectedCats, cat)
                        }
                        className="w-4 h-4 accent-[#2d4fd6] cursor-pointer"
                      />
                      <span className="text-sm text-gray-700">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  1,240 Jobs Found
                </h1>
                <p className="text-sm text-gray-500">
                  Matching your current search criteria
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2d4fd6] bg-white cursor-pointer transition"
                >
                  {sortOptions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-2xl shadow-sm p-5 flex items-start gap-4 hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#eef1fb] flex items-center justify-center text-[#2d4fd6] font-bold text-sm shrink-0">
                    {job.logo}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {job.title}
                      </h3>
                      <button
                        onClick={() => toggleSave(job.id)}
                        className="cursor-pointer text-gray-400 hover:text-[#2d4fd6] transition shrink-0"
                      >
                        <Bookmark
                          size={18}
                          fill={saved.includes(job.id) ? "#2d4fd6" : "none"}
                          stroke={
                            saved.includes(job.id) ? "#2d4fd6" : "currentColor"
                          }
                        />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                      <Building2 size={13} />
                      <span>{job.company}</span>
                      <span className="mx-1">·</span>
                      <MapPin size={13} />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      {job.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-3 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                        {job.salary}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-400">
                        {job.posted}
                      </span>
                      <button className="bg-[#2d4fd6] hover:bg-[#2440b8] text-white text-xs px-4 py-1.5 rounded-lg cursor-pointer transition">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
