"use client"

import {useEffect} from "react"
import {useRouter} from "next/navigation"

export default function PostLoginPage() {
  let router = useRouter()

  useEffect(() => {
    checkSession()
  }, [])

  async function checkSession() {
    let res = await fetch("/api/auth/session")
    let session = await res.json()
    if (!session?.user) {
      return router.replace("/auth/login")
    }
    let role = session.user.role
    let isProfileComplete = session.user.isProfileComplete
    if (!role) {
      return router.replace("/auth/select-role")
    }
    if (!isProfileComplete) {
      return router.replace("/profile-setup")
    }
    if (role === "employer") {
      router.replace("/employer-dashboard")
    } else {
      router.replace("/job-seeker-dashboard")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-gray-500">Redirecting...</p>
    </div>
  )
}
