"use client"

import {useState, useRef, useEffect} from "react"
import dynamic from "next/dynamic"
import {MapPin, Briefcase, FileText, Info, Send} from "lucide-react"

const ReactQuill = dynamic(() => import("react-quill-new"), {ssr: false})
import "react-quill-new/dist/quill.snow.css"

const categories = [
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "Healthcare",
  "Education",
  "Sales",
  "Engineering",
]
const currencies = ["USD", "PKR", "EUR", "GBP", "AED"]
const experienceLevels = ["Entry", "Mid", "Senior", "Lead", "Manager"]
const jobTypes = ["Full Time", "Part Time", "Remote", "Hybrid"]

export default function PostJobPage() {
  const [selectedType, setSelectedType] = useState("Full Time")
  const [skills, setSkills] = useState<string[]>([
    "React",
    "TypeScript",
    "Tailwind",
  ])
  const [skillInput, setSkillInput] = useState("")
  const [description, setDescription] = useState("")
  const [form, setForm] = useState({
    title: "",
    category: "Technology",
    location: "",
    salaryMin: "50,000",
    salaryMax: "120,000",
    currency: "USD",
    experience: "Entry",
    deadline: "",
    requirements: "",
    benefits: "",
  })

  const skillInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const addSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault()
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()])
      }
      setSkillInput("")
    }
  }

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill))
  }

  const handlePublish = () => {
    console.log({...form, jobType: selectedType, skills, description})
  }

  const quillModules = {
    toolbar: [["bold", "italic"], [{list: "bullet"}], ["link"]],
  }

  return (
    <div
      className="min-h-screen bg-[#f0f4ff] flex flex-col"
      style={{fontFamily: "Poppins, sans-serif"}}
    >
      <main className="flex-1 px-4 py-10 max-w-3xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a New Job</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details below to find the perfect candidate
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 flex flex-col gap-10">
          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-[#eef1fb] p-1.5 rounded-md">
                <Info size={16} className="text-[#2d4fd6]" />
              </span>
              <h2 className="font-semibold text-gray-800 text-base">
                Basic Information
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition bg-white cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Type
                </label>
                <div className="flex flex-wrap gap-2">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-1.5 rounded-full text-sm border transition cursor-pointer ${
                        selectedType === type
                          ? "bg-[#2d4fd6] text-white border-[#2d4fd6]"
                          : "bg-white text-gray-600 border-gray-200 hover:border-[#2d4fd6]"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-[#eef1fb] p-1.5 rounded-md">
                <MapPin size={16} className="text-[#2d4fd6]" />
              </span>
              <h2 className="font-semibold text-gray-800 text-base">
                Location & Salary
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Location
                </label>
                <div className="relative">
                  <MapPin
                    size={15}
                    className="absolute left-3 top-3 text-gray-400"
                  />
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. San Francisco, CA or Remote"
                    className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Salary Min
                  </label>
                  <input
                    name="salaryMin"
                    value={form.salaryMin}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Salary Max
                  </label>
                  <input
                    name="salaryMax"
                    value={form.salaryMax}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Currency
                  </label>
                  <select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition bg-white cursor-pointer"
                  >
                    {currencies.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-[#eef1fb] p-1.5 rounded-md">
                <Briefcase size={16} className="text-[#2d4fd6]" />
              </span>
              <h2 className="font-semibold text-gray-800 text-base">
                Job Details
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Experience Level
                  </label>
                  <select
                    name="experience"
                    value={form.experience}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition bg-white cursor-pointer"
                  >
                    {experienceLevels.map((l) => (
                      <option key={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={form.deadline}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Required Skills
                </label>
                <div
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 flex flex-wrap gap-2 cursor-text min-h-[44px] focus-within:border-[#2d4fd6] transition"
                  onClick={() => skillInputRef.current?.focus()}
                >
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1 bg-[#eef1fb] text-[#2d4fd6] text-xs px-3 py-1 rounded-full"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-1 text-[#2d4fd6] hover:text-red-400 cursor-pointer"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    ref={skillInputRef}
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={addSkill}
                    placeholder="Add skill..."
                    className="outline-none text-sm flex-1 min-w-[100px] bg-transparent"
                  />
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="bg-[#eef1fb] p-1.5 rounded-md">
                <FileText size={16} className="text-[#2d4fd6]" />
              </span>
              <h2 className="font-semibold text-gray-800 text-base">
                Full Description
              </h2>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Job Description
                </label>
                <div className="rounded-lg overflow-hidden border border-gray-200 focus-within:border-[#2d4fd6] transition">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    onChange={setDescription}
                    modules={quillModules}
                    placeholder="Describe the role and day-to-day responsibilities..."
                    className="bg-white [&_.ql-container]:min-h-[150px] [&_.ql-editor]:min-h-[150px]"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handleChange}
                  placeholder="List key qualifications and skills..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition resize-none"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Benefits
                </label>
                <textarea
                  name="benefits"
                  value={form.benefits}
                  onChange={handleChange}
                  placeholder="Insurance, gym, equity, etc..."
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#2d4fd6] transition resize-none"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end pt-2">
            <button
              onClick={handlePublish}
              className="flex items-center gap-2 bg-[#2d4fd6] hover:bg-[#2440b8] text-white px-6 py-2.5 rounded-lg text-sm font-medium transition cursor-pointer"
            >
              Publish Job <Send size={14} />
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
