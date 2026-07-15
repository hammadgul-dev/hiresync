"use client"

import {useState, useRef} from "react"
import {X, Upload, FileText} from "lucide-react"
import {useSession} from "next-auth/react"
import toast from "react-hot-toast"

interface ApplyModalProps {
  jobId: string
  jobTitle: string
  company: string
  onClose: () => void
}

export default function ApplyModal({
  jobId,
  jobTitle,
  company,
  onClose,
}: ApplyModalProps) {
  let {data: session} = useSession()
  let [coverLetter, setCoverLetter] = useState("")
  let [cv, setCv] = useState<File | null>(null)
  let [submitting, setSubmitting] = useState(false)
  let fileRef = useRef<HTMLInputElement>(null)

  let handleCv = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0]
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Only PDF files allowed")
        return
      }
      setCv(file)
    }
  }

  let handleSubmit = async () => {
    if (!cv) {
      toast.error("Please upload your CV")
      return
    }

    let formData = new FormData()
    formData.append("job", jobId)
    formData.append("fullName", session?.user?.name || "")
    formData.append("email", session?.user?.email || "")
    formData.append("coverLetter", coverLetter)
    formData.append("cv", cv)
    setSubmitting(true)
    try {
      let res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      })
      let data = await res.json()
      if (!res.ok) throw new Error(data.message)
      toast.success(data?.message || "Application submitted")
      onClose()
    } catch (err: any) {
      toast.error(err.message || "Failed to submit application")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-lg w-full max-w-md p-6 flex flex-col gap-4 z-10">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-gray-900">
              Apply for this Job
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {jobTitle} · {company}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={session?.user?.name || ""}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Email
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Cover Letter{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Why are you a great fit for this role..."
              rows={3}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-gray-700 block mb-1">
              Upload CV <span className="text-gray-400 font-normal">(PDF)</span>
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-200 rounded-lg px-3 py-4 flex flex-col items-center gap-2 cursor-pointer hover:border-[#2d4fd6] hover:bg-[#f0f4ff] transition-colors"
            >
              {cv ? (
                <div className="flex items-center gap-2 text-xs text-gray-700">
                  <FileText size={16} className="text-[#2d4fd6]" />
                  <span className="truncate max-w-[200px]">{cv.name}</span>
                </div>
              ) : (
                <>
                  <Upload size={18} className="text-gray-400" />
                  <p className="text-xs text-gray-400">Click to upload PDF</p>
                </>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleCv}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={onClose}
            disabled={submitting}
            className="flex-1 border border-gray-200 text-gray-600 text-sm font-medium py-2.5 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="flex-1 bg-[#2d4fd6] hover:bg-[#2440b8] text-white text-sm font-medium py-2.5 rounded-lg cursor-pointer transition-colors disabled:opacity-50"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </div>
      </div>
    </div>
  )
}
