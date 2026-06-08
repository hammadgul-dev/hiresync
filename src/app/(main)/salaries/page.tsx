import {TrendingUp, Briefcase, MapPin} from "lucide-react"

const salaries = [
  {
    title: "Frontend Developer",
    category: "Engineering",
    avg: "$95,000",
    min: "$70,000",
    max: "$130,000",
    location: "United States",
  },
  {
    title: "Backend Developer",
    category: "Engineering",
    avg: "$105,000",
    min: "$80,000",
    max: "$145,000",
    location: "United States",
  },
  {
    title: "Full Stack Developer",
    category: "Engineering",
    avg: "$110,000",
    min: "$85,000",
    max: "$150,000",
    location: "United States",
  },
  {
    title: "DevOps Engineer",
    category: "Engineering",
    avg: "$120,000",
    min: "$90,000",
    max: "$160,000",
    location: "United States",
  },
  {
    title: "Data Scientist",
    category: "Data & AI",
    avg: "$125,000",
    min: "$95,000",
    max: "$165,000",
    location: "United States",
  },
  {
    title: "Machine Learning Engineer",
    category: "Data & AI",
    avg: "$135,000",
    min: "$100,000",
    max: "$180,000",
    location: "United States",
  },
  {
    title: "Data Analyst",
    category: "Data & AI",
    avg: "$80,000",
    min: "$60,000",
    max: "$110,000",
    location: "United States",
  },
  {
    title: "UI/UX Designer",
    category: "Design",
    avg: "$90,000",
    min: "$65,000",
    max: "$125,000",
    location: "United States",
  },
  {
    title: "Product Designer",
    category: "Design",
    avg: "$105,000",
    min: "$75,000",
    max: "$140,000",
    location: "United States",
  },
  {
    title: "Product Manager",
    category: "Product",
    avg: "$130,000",
    min: "$95,000",
    max: "$170,000",
    location: "United States",
  },
  {
    title: "Cybersecurity Analyst",
    category: "Security",
    avg: "$115,000",
    min: "$85,000",
    max: "$155,000",
    location: "United States",
  },
  {
    title: "Cloud Architect",
    category: "Engineering",
    avg: "$145,000",
    min: "$110,000",
    max: "$190,000",
    location: "United States",
  },
]

const categories = [
  "All",
  "Engineering",
  "Data & AI",
  "Design",
  "Product",
  "Security",
]

export default function SalariesPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Salary Explorer</h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse average salaries across top tech roles
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search job title..."
            className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
          />
          <select className="border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] cursor-pointer text-gray-600">
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          {salaries.length} roles found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {salaries.map((s) => (
            <div
              key={s.title}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef1fb] flex items-center justify-center shrink-0">
                    <TrendingUp size={16} className="text-[#2d4fd6]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {s.title}
                    </p>
                    <span className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-2 py-0.5 rounded-full">
                      {s.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#f0f4ff] rounded-lg p-3 text-center">
                <p className="text-xs text-gray-400 mb-0.5">Average Salary</p>
                <p className="text-xl font-bold text-[#2d4fd6]">{s.avg}</p>
                <p className="text-xs text-gray-400 mt-0.5">per year</p>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <div className="text-center">
                  <p className="text-gray-400">Min</p>
                  <p className="font-semibold text-gray-700">{s.min}</p>
                </div>
                <div className="w-px bg-gray-100" />
                <div className="text-center">
                  <p className="text-gray-400">Max</p>
                  <p className="font-semibold text-gray-700">{s.max}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-400 pt-1 border-t border-gray-100">
                <span className="flex items-center gap-1">
                  <MapPin size={11} />
                  {s.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={11} />
                  Full-time
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
