"use client"
import {useState, useEffect} from "react"
import {Briefcase, CheckCircle, XCircle, Pencil, Trash2} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

let applicants = [
  {
    name: "Alex Rivero",
    role: "Product Designer",
    img: "https://i.pravatar.cc/40?img=1",
  },
  {
    name: "Sarah Johnson",
    role: "Frontend Engineer",
    img: "https://i.pravatar.cc/40?img=2",
  },
  {
    name: "Marcus Chen",
    role: "Backend Developer",
    img: "https://i.pravatar.cc/40?img=3",
  },
  {
    name: "Elena Rodriguez",
    role: "Marketing Lead",
    img: "https://i.pravatar.cc/40?img=4",
  },
  {
    name: "James Lee",
    role: "DevOps Engineer",
    img: "https://i.pravatar.cc/40?img=5",
  },
  {
    name: "Nina Patel",
    role: "UI/UX Designer",
    img: "https://i.pravatar.cc/40?img=6",
  },
]

export default function EmployerDashboard() {
  let [stats, setStats] = useState({total: 0, active: 0, closed: 0})
  let [jobs, setJobs] = useState<any[]>([])
  let [loading, setLoading] = useState(true)

  let fetchJobs = async () => {
    try {
      let res = await fetch("/api/employer")
      let data = await res.json()
      if (!res.ok) throw new Error(data.message)
      setStats(data.stats)
      setJobs(data.jobs)
    } catch (err: any) {
      toast.error(err.message || "Failed to load jobs")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  let handleDelete = async (id: string) => {
    try {
      let res = await fetch(`/api/employer/${id}`, {method: "DELETE"})
      let data = await res.json()
      if (!res.ok) throw new Error(data.message)
      toast.success("Job deleted")
      fetchJobs()
    } catch (err: any) {
      toast.error(err.message || "Delete failed")
    }
  }

  let statCards = [
    {label: "Total Jobs", value: stats.total, icon: Briefcase},
    {label: "Active Jobs", value: stats.active, icon: CheckCircle},
    {label: "Closed Jobs", value: stats.closed, icon: XCircle},
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employer Dashboard
            </h1>
            <p className="text-gray-500 mt-1 hidden sm:block">
              Welcome back! Here's what's happening with your job listings
              today.
            </p>
          </div>
          <Link
            href="/employer-dashboard/post-job"
            className="flex items-center justify-center gap-2 bg-[#2d4fd6] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#2440b8] transition-colors cursor-pointer w-full sm:w-auto"
          >
            <Pencil className="w-4 h-4" />
            Post Job
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map(({label, value, icon: Icon}) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-sm"
            >
              <div className="bg-[#eef1fb] p-3 rounded-xl">
                <Icon className="w-6 h-6 text-[#2d4fd6]" />
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                  {label}
                </p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-6">
          <div
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col"
            style={{height: "520px"}}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              My Posted Jobs
            </h2>
            <div className="overflow-auto flex-1">
              {jobs.length === 0 ? (
                <p className="text-gray-400 text-sm">No jobs posted yet.</p>
              ) : (
                <table className="w-full text-sm min-w-[500px]">
                  <thead>
                    <tr className="text-gray-400 text-left border-b">
                      <th className="pb-3 font-medium">Job Title</th>
                      <th className="pb-3 font-medium">Applications</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {jobs.map((job) => (
                      <tr key={job._id} className="border-b last:border-0">
                        <td className="py-3">
                          <p className="font-semibold text-gray-900">
                            {job.title}
                          </p>
                          <p className="text-xs text-gray-400">
                            {job.category} • {job.jobType}
                          </p>
                        </td>
                        <td className="py-3 text-gray-700">0</td>
                        <td className="py-3">
                          <span
                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                              job.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {job.isActive ? "ACTIVE" : "CLOSED"}
                          </span>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:text-[#2d4fd6] text-gray-400 transition-colors cursor-pointer">
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(job._id)}
                              className="p-1 hover:text-red-500 text-gray-400 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          <div
            className="bg-white rounded-2xl shadow-sm p-6 flex flex-col"
            style={{height: "520px"}}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Recent Applicants
            </h2>
            <div className="overflow-y-auto flex-1 pr-1 space-y-3">
              {applicants.map((a) => (
                <div
                  key={a.name}
                  className="flex flex-col gap-2 border-b pb-3 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={a.img}
                      alt={a.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {a.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Applied for{" "}
                        <span className="text-[#2d4fd6] font-medium">
                          {a.role}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex-1 text-xs py-1 bg-[#eef1fb] text-[#2d4fd6] rounded-lg font-medium hover:bg-[#2d4fd6] hover:text-white transition-colors cursor-pointer">
                      View
                    </button>
                    <button className="flex-1 text-xs py-1 bg-green-50 text-green-700 rounded-lg font-medium hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                      Accept
                    </button>
                    <button className="flex-1 text-xs py-1 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-colors cursor-pointer">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
