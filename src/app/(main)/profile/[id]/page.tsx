"use client"

import {useState, useEffect} from "react"
import {useParams} from "next/navigation"
import {MapPin, Globe, Briefcase, GraduationCap, Users} from "lucide-react"

type ProfileData = {
  role: string
  fullName: string
  location?: string
  photo?: string
  jobTitle?: string
  shortBio?: string
  skills?: string[]
  experience?: {
    jobTitle: string
    companyName: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }[]
  education?: {
    degreeName: string
    institution: string
    year: string
  }[]
  industry?: string
  companySize?: string
  website?: string
  companyDescription?: string
}

export default function ProfilePage() {
  let {id} = useParams()
  let [profile, setProfile] = useState<ProfileData | null>(null)
  let [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        let res = await fetch(`/api/profile/${id}`)
        let data = await res.json()
        if (res.ok) {
          setProfile(data.profile)
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchProfile()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400 text-sm">
        Profile not found
      </div>
    )
  }

  if (profile.role === "employer") {
    return (
      <div className="min-h-screen bg-[#f0f4ff] px-4 py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#eef1fb] flex items-center justify-center shrink-0 text-3xl">
              🏢
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-lg font-bold text-gray-900">
                {profile.fullName}
              </h1>
              <p className="text-sm text-[#2d4fd6] font-medium mt-0.5">
                {profile.industry}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={12} />
                  {profile.location}
                </span>
                {profile.companySize && (
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Users size={12} />
                    {profile.companySize} employees
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {profile.companyDescription}
              </p>
              {profile.website && (
                <a
                  href={profile.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-[#2d4fd6] hover:underline mt-2 cursor-pointer"
                >
                  <Globe size={12} />
                  {profile.website}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-[#eef1fb] flex items-center justify-center shrink-0 text-3xl">
            👤
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg font-bold text-gray-900">
              {profile.fullName}
            </h1>
            <p className="text-sm text-[#2d4fd6] font-medium mt-0.5">
              {profile.jobTitle}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-gray-400 mt-1.5">
              <MapPin size={12} />
              <span>{profile.location}</span>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {profile.shortBio}
            </p>
          </div>
        </div>

        {profile.skills && profile.skills.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((s) => (
                <span
                  key={s}
                  className="bg-[#eef1fb] text-[#2d4fd6] text-xs px-3 py-1 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {profile.experience && profile.experience.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Briefcase size={15} className="text-[#2d4fd6]" />
              Work Experience
            </h2>
            <div className="flex flex-col gap-3">
              {profile.experience.map((exp, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {exp.jobTitle}
                  </p>
                  <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                    {exp.companyName}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.education && profile.education.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <GraduationCap size={15} className="text-[#2d4fd6]" />
              Education
            </h2>
            <div className="flex flex-col gap-3">
              {profile.education.map((edu, i) => (
                <div key={i} className="border border-gray-100 rounded-xl p-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {edu.degreeName}
                  </p>
                  <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                    {edu.institution}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Class of {edu.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
