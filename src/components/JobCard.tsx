import {Building2, MapPin, Bookmark} from "lucide-react"

interface Job {
  _id: string
  title: string
  companyName: string
  location: string
  jobType: string
  salaryMin: number
  salaryMax: number
  currency: string
  createdAt: string
}

export default function JobCard({job}: {job: Job}) {
  let initials = job.companyName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  let posted = new Date(job.createdAt)
  let diff = Math.floor((Date.now() - posted.getTime()) / (1000 * 60 * 60))
  let postedLabel =
    diff < 24
      ? `Posted ${diff} hours ago`
      : `Posted ${Math.floor(diff / 24)} days ago`

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-5 flex items-start gap-3 sm:gap-4 hover:shadow-md transition">
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#eef1fb] flex items-center justify-center text-[#2d4fd6] font-bold text-xs sm:text-sm shrink-0">
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
            {job.title}
          </h3>
          <button className="cursor-pointer text-gray-400 hover:text-[#2d4fd6] transition shrink-0 mt-0.5">
            <Bookmark size={17} />
          </button>
        </div>
        <div className="flex flex-wrap items-center gap-x-1 gap-y-0.5 text-xs text-gray-500 mt-1">
          <Building2 size={12} className="shrink-0" />
          <span>{job.companyName}</span>
          <span className="mx-0.5">·</span>
          <MapPin size={12} className="shrink-0" />
          <span className="truncate">{job.location}</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 mt-2.5">
          <span className="text-xs bg-[#eef1fb] text-[#2d4fd6] px-2.5 py-0.5 rounded-full">
            {job.jobType}
          </span>
          <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
            {job.currency} {job.salaryMin.toLocaleString()} -{" "}
            {job.salaryMax.toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-400">{postedLabel}</span>
          <button className="bg-[#2d4fd6] hover:bg-[#2440b8] text-white text-xs px-4 py-1.5 rounded-lg cursor-pointer transition">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  )
}
