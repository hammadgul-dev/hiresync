"use client"

import {useState} from "react"
import {User, Briefcase} from "lucide-react"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast"

export default function SelectRolePage() {
  let [role, setRole] = useState<"jobSeeker" | "employer" | "">("")
  let [companyName, setCompanyName] = useState("")
  let router = useRouter()

  async function handleSubmit() {
    if (!role) return toast.error("Please Select a Role!")
    if (role === "employer" && !companyName.trim())
      return toast.error("Company Name is Required!")

    let res = await fetch("/api/auth/set-role", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({role, companyName}),
    })
    let data = await res.json()
    if (!res.ok) return toast.error(data?.message || "Something Went Wrong")
    toast.success("Role Set Successfully")
    window.location.href = "/profile-setup"
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-md">
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gray-900">Choose Your Role</h1>
          <p className="text-gray-500 text-xs mt-1">
            Tell us how you want to use HireSync.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            onClick={() => setRole("jobSeeker")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              role === "jobSeeker"
                ? "border-[#2d4fd6] bg-[#f0f4ff] text-[#2d4fd6]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <User size={16} />
            <span className="text-xs font-medium">Job Seeker</span>
          </button>
          <button
            onClick={() => setRole("employer")}
            className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
              role === "employer"
                ? "border-[#2d4fd6] bg-[#f0f4ff] text-[#2d4fd6]"
                : "border-gray-200 text-gray-500 hover:border-gray-300"
            }`}
          >
            <Briefcase size={16} />
            <span className="text-xs font-medium">Employer</span>
          </button>
        </div>

        {role === "employer" && (
          <div className="mb-4">
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Company Name
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Enter Company Name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
            />
          </div>
        )}

        <button
          onClick={() => handleSubmit()}
          className="w-full bg-[#2d4fd6] hover:bg-[#2440b8] text-white font-medium py-2 rounded-lg cursor-pointer transition-colors text-sm"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
