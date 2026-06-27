"use client"

import {useState} from "react"
import {Search, MapPin} from "lucide-react"
import JobCard from "@/components/JobCard"
import Pagination from "@/components/Pagination"

let jobTypes = ["Full Time", "Part Time", "Remote", "Hybrid"]
let experienceLevels = ["Entry Level", "Mid Level", "Senior Level"]
let categories = [
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Healthcare",
  "Education",
  "Sales",
  "Engineering",
]
let sortOptions = ["Most Recent", "Most Relevant", "Highest Salary"]

export default function FindJobsPage() {
  let [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])
  let [selectedExp, setSelectedExp] = useState<string[]>([])
  let [selectedCats, setSelectedCats] = useState<string[]>([])
  let [sortBy, setSortBy] = useState("Most Recent")
  let [searchTitle, setSearchTitle] = useState("")
  let [searchLocation, setSearchLocation] = useState("")
  let [currentPage, setCurrentPage] = useState(1)
  let [jobs, setJobs] = useState<any[]>([])
  let [totalJobs, setTotalJobs] = useState(0)
  let totalPages = Math.ceil(totalJobs / 10)

  let toggle = (
    list: string[],
    setList: (v: string[]) => void,
    val: string,
  ) => {
    setList(list.includes(val) ? list.filter((i) => i !== val) : [...list, val])
  }

  let resetFilters = () => {
    setSelectedJobTypes([])
    setSelectedExp([])
    setSelectedCats([])
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
                <button
                  onClick={resetFilters}
                  className="text-xs text-[#2d4fd6] hover:underline cursor-pointer"
                >
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

          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {totalJobs.toLocaleString()} Jobs Found
                </h1>
                <p className="text-sm text-gray-500">
                  Matching your current search criteria
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-gray-500 whitespace-nowrap">
                  Sort by:
                </span>
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
              {jobs.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-400 text-sm">
                  No jobs found
                </div>
              ) : (
                jobs.map((job) => <JobCard key={job._id} job={job} />)
              )}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
