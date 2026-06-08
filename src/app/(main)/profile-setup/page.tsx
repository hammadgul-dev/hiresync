"use client"

import {useState, useRef} from "react"
import {MapPin, Plus, X, Trash2, Sparkles} from "lucide-react"

interface Experience {
  id: number
  title: string
  company: string
  startDate: string
  endDate: string
  current: boolean
  description: string
}

interface Education {
  id: number
  degree: string
  institution: string
  year: string
}

export default function ProfileSetupPage() {
  const [photo, setPhoto] = useState<string | null>(null)
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Tailwind CSS",
  ])
  const [skillInput, setSkillInput] = useState("")
  const [experiences, setExperiences] = useState<Experience[]>([
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechFlow Solutions",
      startDate: "Jan 2021",
      endDate: "",
      current: true,
      description:
        "Led the redesign of the core dashboard application using React and Tailwind.",
    },
  ])
  const [educations, setEducations] = useState<Education[]>([
    {
      id: 1,
      degree: "B.S. Computer Science",
      institution: "Stanford University",
      year: "2020",
    },
  ])
  const [showExpForm, setShowExpForm] = useState(false)
  const [showEduForm, setShowEduForm] = useState(false)
  const [newExp, setNewExp] = useState<Omit<Experience, "id">>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  })
  const [newEdu, setNewEdu] = useState<Omit<Education, "id">>({
    degree: "",
    institution: "",
    year: "",
  })
  const fileRef = useRef<HTMLInputElement>(null)

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setPhoto(URL.createObjectURL(file))
  }

  const addSkill = () => {
    const s = skillInput.trim()
    if (s && !skills.includes(s)) setSkills([...skills, s])
    setSkillInput("")
  }

  const addExperience = () => {
    if (!newExp.title || !newExp.company) return
    setExperiences([...experiences, {...newExp, id: Date.now()}])
    setNewExp({
      title: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    })
    setShowExpForm(false)
  }

  const addEducation = () => {
    if (!newEdu.degree || !newEdu.institution) return
    setEducations([...educations, {...newEdu, id: Date.now()}])
    setNewEdu({degree: "", institution: "", year: ""})
    setShowEduForm(false)
  }

  const inputCls =
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

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900">
            Basic Information
          </h2>

          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-20 h-20 rounded-full bg-[#eef1fb] flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-[#2d4fd6]"
            >
              {photo ? (
                <img
                  src={photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-3xl text-gray-300">👤</span>
              )}
            </div>
            <p className="text-xs text-gray-400">Click to upload photo</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhoto}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Full Name
              </label>
              <input type="text" placeholder="John Doe" className={inputCls} />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Job Title
              </label>
              <input
                type="text"
                placeholder="Frontend Developer"
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
                placeholder="San Francisco, CA"
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Short Bio
            </label>
            <textarea
              placeholder="Briefly describe your professional background and what you're looking for..."
              rows={4}
              className={inputCls + " resize-none"}
            />
          </div>
        </div>

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
                    placeholder="Frontend Engineer"
                    value={newExp.title}
                    onChange={(e) =>
                      setNewExp({...newExp, title: e.target.value})
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
                    placeholder="TechFlow"
                    value={newExp.company}
                    onChange={(e) =>
                      setNewExp({...newExp, company: e.target.value})
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
                    placeholder="Jan 2021"
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
                    placeholder="Present"
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
                    {exp.title}
                  </p>
                  <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                    {exp.company}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-2">
                      {exp.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() =>
                    setExperiences(experiences.filter((e) => e.id !== exp.id))
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
            <h2 className="text-sm font-semibold text-gray-900">Education</h2>
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
                    value={newEdu.degree}
                    onChange={(e) =>
                      setNewEdu({...newEdu, degree: e.target.value})
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
                    placeholder="Stanford University"
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
                    placeholder="2020"
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
                    {edu.degree}
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

        <button className="w-full flex items-center justify-center gap-2 bg-[#2d4fd6] hover:bg-[#2440b8] text-white font-medium py-3 rounded-xl cursor-pointer transition-colors">
          <Sparkles size={16} />
          Generate CV with AI
        </button>

        <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-2.5 rounded-xl text-sm cursor-pointer hover:bg-gray-50 transition-colors mb-4">
          Save Progress
        </button>
      </div>
    </div>
  )
}
