"use client"

import {useState} from "react"
import {Mail, Lock, Eye, EyeOff} from "lucide-react"
import Link from "next/link"
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation"
import toast from "react-hot-toast"

export default function LoginPage() {
  let [showPassword, setShowPassword] = useState(false)
  let router = useRouter()

  let [emailInfo, setEmailInfo] = useState({
    email: "",
    password: "",
  })

  async function handleLoginForm() {
    let {email, password} = emailInfo
    if (!email || !password) return toast.error("Both Field Are Required!")
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
      return toast.error("Invalid email!")
    if (password.length < 6)
      return toast.error("Password must be at least 6 characters!")

    let res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })
    if (res?.error) {
      return toast.error(res.error)
    }
    let sessionRes = await fetch("/api/auth/session")
    let session = await sessionRes.json()
    let role = session?.user?.role
    toast.success("Login Successful")

    if (role === "employer") {
      router.push("/employer-dashboard")
    } else {
      router.push("/job-seeker-dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 text-xs mt-1">
            Log in to your HireSync account to continue your journey.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2d4fd6] focus-within:border-transparent">
              <Mail size={15} className="text-gray-400 shrink-0" />
              <input
                type="email"
                value={emailInfo.email}
                onChange={(e) =>
                  setEmailInfo({...emailInfo, email: e.target.value})
                }
                placeholder="name@company.com"
                className="flex-1 text-sm outline-none bg-transparent"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-gray-700">
                Password
              </label>
              <Link
                href="#"
                className="text-xs text-[#2d4fd6] hover:underline cursor-pointer"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 focus-within:ring-2 focus-within:ring-[#2d4fd6] focus-within:border-transparent">
              <Lock size={15} className="text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                value={emailInfo.password}
                onChange={(e) =>
                  setEmailInfo({...emailInfo, password: e.target.value})
                }
                placeholder="••••••••"
                className="flex-1 text-sm outline-none bg-transparent"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <button
            onClick={() => handleLoginForm()}
            className="w-full bg-[#2d4fd6] hover:bg-[#2440b8] text-white font-medium py-2 rounded-lg cursor-pointer transition-colors text-sm mt-1"
          >
            Login
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">OR</span>
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
        </div>

        <p className="text-center text-xs text-gray-500 mt-5">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/register"
            className="text-[#2d4fd6] font-medium hover:underline cursor-pointer"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
