"use client"

import {useState} from "react"
import {User, Briefcase} from "lucide-react"
import Link from "next/link"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [role, setRole] = useState<"jobSeeker" | "employer">("jobSeeker")
  let [jobSeeker, setJobSeeker] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
  })
  let [employer, setEmployer] = useState({
    name: "",
    companyName: "",
    email: "",
    password: "",
    cPassword: "",
  })

  async function handleRegisterForm() {
    let data = role === "jobSeeker" ? jobSeeker : employer
    if (!data.name.trim()) return toast.error("Name Is Required!")
    if (/^[0-9]/.test(data.name.trim()))
      return toast.error("Name Must Start With a Letter!")
    if (role === "employer") {
      if (!employer.companyName.trim())
        return toast.error("Company name is required!")
      if (/^[0-9]/.test(employer.companyName.trim()))
        return toast.error("Company name must start with a letter!")
    }
    if (!data.email.trim()) return toast.error("Email is required!")
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        data.email.trim(),
      )
    )
      return toast.error("Invalid email!")
    if (!data.password.trim()) return toast.error("Password is required!")
    if (data.password.trim().length < 6)
      return toast.error("Password must be at least 6 characters!")
    if (!data.cPassword.trim())
      return toast.error("Confirm password is required!")
    if (data.password.trim() !== data.cPassword.trim())
      return toast.error("Passwords Do Not Match!")

    try {
      let payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: role,
        companyName: role === "employer" ? employer.companyName : "",
      }
      let res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload),
      })
      let apiData = await res.json()
      if (!res.ok)
        return toast.error(apiData?.message || "Error Occur During Register")
      toast.success(apiData?.message)
      if (role === "jobSeeker") {
        setJobSeeker({name: "", email: "", password: "", cPassword: ""})
      } else {
        setEmployer({
          name: "",
          companyName: "",
          email: "",
          password: "",
          cPassword: "",
        })
      }
    } catch (e) {
      toast.error((e as Error)?.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-md">
        <div className="text-center mb-5">
          <h1 className="text-xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-gray-500 text-xs mt-1">
            Join thousands of professionals finding their next role.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
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

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={role === "jobSeeker" ? jobSeeker.name : employer.name}
              onChange={(e) =>
                role === "jobSeeker"
                  ? setJobSeeker({...jobSeeker, name: e.target.value})
                  : setEmployer({...employer, name: e.target.value})
              }
              placeholder="Enter Your Name"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
            />
          </div>

          {role === "employer" && (
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={employer.companyName}
                placeholder="Enter Company Name"
                onChange={(e) =>
                  setEmployer({...employer, companyName: e.target.value})
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={role === "jobSeeker" ? jobSeeker.email : employer.email}
              onChange={(e) =>
                role === "jobSeeker"
                  ? setJobSeeker({...jobSeeker, email: e.target.value})
                  : setEmployer({...employer, email: e.target.value})
              }
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={
                  role === "jobSeeker" ? jobSeeker.password : employer.password
                }
                onChange={(e) =>
                  role === "jobSeeker"
                    ? setJobSeeker({...jobSeeker, password: e.target.value})
                    : setEmployer({...employer, password: e.target.value})
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={
                  role === "jobSeeker"
                    ? jobSeeker.cPassword
                    : employer.cPassword
                }
                onChange={(e) =>
                  role === "jobSeeker"
                    ? setJobSeeker({...jobSeeker, cPassword: e.target.value})
                    : setEmployer({...employer, cPassword: e.target.value})
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 my-1">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => handleRegisterForm()}
            className="w-full bg-[#2d4fd6] hover:bg-[#2440b8] text-white font-medium py-2 rounded-lg cursor-pointer transition-colors text-sm"
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-4">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-[#2d4fd6] font-medium hover:underline cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
