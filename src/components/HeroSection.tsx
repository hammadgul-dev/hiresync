"use client"

import {useSession} from "next-auth/react"
import {useRouter} from "next/navigation"

export default function HeroSection() {
  let {data: session} = useSession()
  let router = useRouter()
  let role = (session?.user as any)?.role

  let handlePostJob = () => {
    if (!session) return router.push("/auth/login")
    if (role === "employer") return router.push("/post-job")
    router.push("/")
  }

  return (
    <section className="bg-gradient-to-br from-[#e8eeff] via-[#dde6fb] to-[#eef2fb] flex items-center justify-center px-6 py-36 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
          Find Your Dream Job or{" "}
          <span className="text-blue-600">Hire Top Talent</span>
        </h1>
        <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
          Connecting the world&apos;s best talent with top companies around the
          globe. Join over 50,000 professionals finding their path today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => router.push("/find-jobs")}
            className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold px-7 py-2.5 rounded-lg text-sm cursor-pointer"
          >
            Find Jobs
          </button>
          <button
            onClick={handlePostJob}
            className="border-2 border-slate-300 hover:border-slate-400 transition-colors text-slate-800 font-semibold px-7 py-2.5 rounded-lg text-sm cursor-pointer"
          >
            Post a Job
          </button>
        </div>
      </div>
    </section>
  )
}
