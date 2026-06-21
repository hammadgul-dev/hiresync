"use client"

import {useState, useRef} from "react"
import {MapPin, Plus, X, Trash2, Globe} from "lucide-react"
import {useSession} from "next-auth/react"
import toast from "react-hot-toast"
import {useRouter} from "next/navigation"

let industries = [
  "Software Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "Design & Creative",
  "Cloud Infrastructure",
  "Marketing & Growth",
  "E-Commerce",
  "Data Analytics",
  "Healthcare Tech",
  "Finance & Fintech",
]
let companySizes = ["1-10", "10-50", "50-200", "200-500", "500-1000", "1000+"]

export default function ProfileSetupPage() {
  let {data: session, update} = useSession()
  let role = session?.user?.role as "jobSeeker" | "employer"
  let router = useRouter()

  let [photo, setPhoto] = useState<string | null>(null)
  let [skills, setSkills] = useState<string[]>([])
  let [skillInput, setSkillInput] = useState("")
  let [experiences, setExperiences] = useState<any[]>([])
  let [educations, setEducations] = useState<any[]>([])
  let [showExpForm, setShowExpForm] = useState(false)
  let [showEduForm, setShowEduForm] = useState(false)

  let [jobSeekerForm, setJobSeekerForm] = useState({
    fullName: "",
    jobTitle: "",
    location: "",
    shortBio: "",
  })

  let [employerForm, setEmployerForm] = useState({
    fullName: "",
    industry: industries[0],
    companySize: companySizes[0],
    location: "",
    website: "",
    companyDescription: "",
  })

  let [newExp, setNewExp] = useState({
    jobTitle: "",
    companyName: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })

  let [newEdu, setNewEdu] = useState({
    degreeName: "",
    institution: "",
    year: "",
  })

  let fileRef = useRef<HTMLInputElement>(null)

  let handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  let addSkill = () => {
    let s = skillInput.trim()
    if (!s) return toast.error("Skill cannot be empty!")
    if (skills.includes(s)) return toast.error("Skill already added!")
    setSkills([...skills, s])
    setSkillInput("")
  }

  let addExperience = () => {
    if (!newExp.jobTitle.trim()) return toast.error("Job title is Required!")
    if (!newExp.companyName.trim())
      return toast.error("Company name is Required!")
    if (!newExp.startDate.trim()) return toast.error("Start date is Required!")
    setExperiences([...experiences, {...newExp, id: Date.now()}])
    setNewExp({
      jobTitle: "",
      companyName: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
    setShowExpForm(false)
  }

  let addEducation = () => {
    if (!newEdu.degreeName.trim()) return toast.error("Degree is Required!")
    if (!newEdu.institution.trim())
      return toast.error("Institution is Required!")
    if (!newEdu.year.trim()) return toast.error("Year is Required!")
    setEducations([...educations, {...newEdu, id: Date.now()}])
    setNewEdu({degreeName: "", institution: "", year: ""})
    setShowEduForm(false)
  }

  let handleSubmit = async () => {
    if (role === "jobSeeker") {
      if (!jobSeekerForm.fullName.trim())
        return toast.error("Full name is Required!")
      if (!jobSeekerForm.jobTitle.trim())
        return toast.error("Job title is Required!")
      if (!jobSeekerForm.location.trim())
        return toast.error("Location is Required!")
      if (!jobSeekerForm.shortBio.trim())
        return toast.error("Short bio is Required!")
      if (skills.length === 0) return toast.error("Add at least one skill!")
    } else {
      if (!employerForm.fullName.trim())
        return toast.error("Full name is Required!")
      if (!employerForm.location.trim())
        return toast.error("Location is Required!")
      if (!employerForm.companyDescription.trim())
        return toast.error("Company description is Required!")
    }

    try {
      let res = await fetch("/api/profile", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
          role === "jobSeeker"
            ? {
                ...jobSeekerForm,
                skills,
                experience: experiences,
                education: educations,
                photo,
              }
            : {...employerForm, photo},
        ),
      })
      let data = await res.json()
      if (!res.ok) return toast.error(data?.message || "Something went wrong")
      await update({isProfileComplete: true})
      toast.success("Profile saved!")
      if (role === "employer") {
        router.push("/employer-dashboard")
      } else {
        router.push("/job-seeker-dashboard")
      }
    } catch (e) {
      toast.error((e as Error).message)
    }
  }

  let inputCls =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"

  return (
    <div className="min-h-screen bg-[#f0f4ff] px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">
            Setup Your Profile
          </h1>
          <button className="text-xs text-[#2d4fd6] border border-[#2d4fd6] px-3 py-1.5 rounded-lg hover:bg-[#f0f4ff] cursor-pointer">
            Preview Profile
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            disabled
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-not-allowed text-sm font-medium ${role === "jobSeeker" ? "border-[#2d4fd6] bg-[#f0f4ff] text-[#2d4fd6]" : "border-gray-200 text-gray-400 opacity-50"}`}
          >
            Job Seeker
          </button>
          <button
            disabled
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-not-allowed text-sm font-medium ${role === "employer" ? "border-[#2d4fd6] bg-[#f0f4ff] text-[#2d4fd6]" : "border-gray-200 text-gray-400 opacity-50"}`}
          >
            Employer
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900">
            {role === "jobSeeker" ? "Basic Information" : "Company Information"}
          </h2>

          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className={`bg-[#eef1fb] flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-[#2d4fd6] ${role === "employer" ? "w-24 h-24 rounded-2xl" : "w-20 h-20 rounded-full"}`}
            >
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-300">
                  {role === "employer" ? "🏢" : "👤"}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400">
              {role === "employer"
                ? "Click to upload company logo"
                : "Click to upload photo"}
            </p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
          </div>

          {role === "jobSeeker" ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={jobSeekerForm.fullName}
                    onChange={(e) =>
                      setJobSeekerForm({
                        ...jobSeekerForm,
                        fullName: e.target.value,
                      })
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={jobSeekerForm.jobTitle}
                    onChange={(e) =>
                      setJobSeekerForm({
                        ...jobSeekerForm,
                        jobTitle: e.target.value,
                      })
                    }
                    className={inputCls}
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Location
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2d4fd6]">
                  <MapPin size={14} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="Location"
                    value={jobSeekerForm.location}
                    onChange={(e) =>
                      setJobSeekerForm({
                        ...jobSeekerForm,
                        location: e.target.value,
                      })
                    }
                    className="flex-1 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Short Bio
                </label>
                <textarea
                  placeholder="Briefly describe your professional background..."
                  rows={4}
                  value={jobSeekerForm.shortBio}
                  onChange={(e) =>
                    setJobSeekerForm({
                      ...jobSeekerForm,
                      shortBio: e.target.value,
                    })
                  }
                  className={inputCls + " resize-none"}
                />
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={employerForm.fullName}
                    onChange={(e) =>
                      setEmployerForm({
                        ...employerForm,
                        fullName: e.target.value,
                      })
                    }
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Industry
                  </label>
                  <select
                    value={employerForm.industry}
                    onChange={(e) =>
                      setEmployerForm({
                        ...employerForm,
                        industry: e.target.value,
                      })
                    }
                    className={inputCls + " cursor-pointer text-gray-600"}
                  >
                    {industries.map((i) => (
                      <option key={i}>{i}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Company Size
                  </label>
                  <select
                    value={employerForm.companySize}
                    onChange={(e) =>
                      setEmployerForm({
                        ...employerForm,
                        companySize: e.target.value,
                      })
                    }
                    className={inputCls + " cursor-pointer text-gray-600"}
                  >
                    {companySizes.map((s) => (
                      <option key={s}>{s} employees</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700 block mb-1">
                    Location
                  </label>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2d4fd6]">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Location"
                      value={employerForm.location}
                      onChange={(e) =>
                        setEmployerForm({
                          ...employerForm,
                          location: e.target.value,
                        })
                      }
                      className="flex-1 text-sm outline-none bg-transparent"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Website
                </label>
                <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2d4fd6]">
                  <Globe size={14} className="text-gray-400 shrink-0" />
                  <input
                    type="text"
                    placeholder="https://yourcompany.com"
                    value={employerForm.website}
                    onChange={(e) =>
                      setEmployerForm({
                        ...employerForm,
                        website: e.target.value,
                      })
                    }
                    className="flex-1 text-sm outline-none bg-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700 block mb-1">
                  Company Description
                </label>
                <textarea
                  placeholder="Briefly describe your company, culture and what you do..."
                  rows={4}
                  value={employerForm.companyDescription}
                  onChange={(e) =>
                    setEmployerForm({
                      ...employerForm,
                      companyDescription: e.target.value,
                    })
                  }
                  className={inputCls + " resize-none"}
                />
              </div>
            </>
          )}
        </div>

        {role === "jobSeeker" && (
          <>
            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
              <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-1 bg-[#eef1fb] text-[#2d4fd6] text-xs px-3 py-1 rounded-full"
                  >
                    {s}
                    <button
                      onClick={() => setSkills(skills.filter((sk) => sk !== s))}
                      className="cursor-pointer hover:text-red-400"
                    >
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#2d4fd6]">
                <input
                  type="text"
                  placeholder="Add a skill..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  className="flex-1 px-3 py-2 text-sm outline-none"
                />
                <button
                  onClick={addSkill}
                  className="px-4 text-sm font-medium text-[#2d4fd6] hover:bg-[#f0f4ff] cursor-pointer h-full py-2"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Work Experience
                </h2>
                <button
                  onClick={() => setShowExpForm(!showExpForm)}
                  className="flex items-center gap-1 text-xs text-[#2d4fd6] cursor-pointer hover:underline"
                >
                  <Plus size={13} /> Add Experience
                </button>
              </div>
              {showExpForm && (
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3 bg-[#f9faff]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        placeholder="Job Title"
                        value={newExp.jobTitle}
                        onChange={(e) =>
                          setNewExp({...newExp, jobTitle: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        placeholder="Company Name"
                        value={newExp.companyName}
                        onChange={(e) =>
                          setNewExp({...newExp, companyName: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Start Date
                      </label>
                      <input
                        type="text"
                        placeholder="Start Date"
                        value={newExp.startDate}
                        onChange={(e) =>
                          setNewExp({...newExp, startDate: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        End Date
                      </label>
                      <input
                        type="text"
                        placeholder="End Date"
                        disabled={newExp.current}
                        value={newExp.current ? "Present" : newExp.endDate}
                        onChange={(e) =>
                          setNewExp({...newExp, endDate: e.target.value})
                        }
                        className={inputCls + " disabled:bg-gray-50"}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newExp.current}
                      onChange={(e) =>
                        setNewExp({...newExp, current: e.target.checked})
                      }
                      className="accent-[#2d4fd6]"
                    />
                    Currently working here
                  </label>
                  <div>
                    <label className="text-xs font-medium text-gray-700 block mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Describe your role..."
                      rows={3}
                      value={newExp.description}
                      onChange={(e) =>
                        setNewExp({...newExp, description: e.target.value})
                      }
                      className={inputCls + " resize-none"}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addExperience}
                      className="bg-[#2d4fd6] text-white text-xs px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2440b8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowExpForm(false)}
                      className="text-xs text-gray-500 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border border-gray-100 rounded-xl p-4 flex justify-between gap-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {exp.jobTitle}
                      </p>
                      <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                        {exp.companyName}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {exp.startDate} —{" "}
                        {exp.current ? "Present" : exp.endDate}
                      </p>
                      {exp.description && (
                        <p className="text-xs text-gray-600 mt-2">
                          {exp.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() =>
                        setExperiences(
                          experiences.filter((e) => e.id !== exp.id),
                        )
                      }
                      className="text-gray-300 hover:text-red-400 cursor-pointer shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-900">
                  Education
                </h2>
                <button
                  onClick={() => setShowEduForm(!showEduForm)}
                  className="flex items-center gap-1 text-xs text-[#2d4fd6] cursor-pointer hover:underline"
                >
                  <Plus size={13} /> Add Education
                </button>
              </div>
              {showEduForm && (
                <div className="border border-gray-100 rounded-xl p-4 flex flex-col gap-3 bg-[#f9faff]">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        placeholder="B.S. Computer Science"
                        value={newEdu.degreeName}
                        onChange={(e) =>
                          setNewEdu({...newEdu, degreeName: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Institution
                      </label>
                      <input
                        type="text"
                        placeholder="Institution Name"
                        value={newEdu.institution}
                        onChange={(e) =>
                          setNewEdu({...newEdu, institution: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-1">
                        Year
                      </label>
                      <input
                        type="text"
                        placeholder="Year"
                        value={newEdu.year}
                        onChange={(e) =>
                          setNewEdu({...newEdu, year: e.target.value})
                        }
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addEducation}
                      className="bg-[#2d4fd6] text-white text-xs px-4 py-2 rounded-lg cursor-pointer hover:bg-[#2440b8]"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShowEduForm(false)}
                      className="text-xs text-gray-500 px-4 py-2 rounded-lg border border-gray-200 cursor-pointer hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="flex flex-col gap-3">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="border border-gray-100 rounded-xl p-4 flex justify-between gap-3"
                  >
                    <div>
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
                    <button
                      onClick={() =>
                        setEducations(educations.filter((e) => e.id !== edu.id))
                      }
                      className="text-gray-300 hover:text-red-400 cursor-pointer shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition-colors mb-4"
        >
          {role === "employer" ? "Save & Continue" : "Save Progress"}
        </button>
      </div>
    </div>
  )
}
