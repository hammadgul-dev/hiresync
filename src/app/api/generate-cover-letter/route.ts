import {NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import {JobSeekerProfile} from "@/model/profileModel"
import Job from "@/model/jobModel"
import Groq from "groq-sdk"
let groq = new Groq({apiKey: process.env.GROQ_API_KEY})

export async function POST(req: Request) {
  await connectDB()
  let session = (await getServerSession(authOptions)) as any
  if (!session || session.user.role !== "jobSeeker") {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  let {jobId} = await req.json()
  if (!jobId) {
    return NextResponse.json({error: "Job ID required"}, {status: 400})
  }
  let profile = (await JobSeekerProfile.findOne({
    userId: session.user.id,
  })) as any
  if (!profile) {
    return NextResponse.json({error: "Profile not found"}, {status: 404})
  }
  if (profile.coverLetterCount >= 3) {
    return NextResponse.json({error: "Limit Reached"}, {status: 403})
  }
  let job = (await Job.findById(jobId)) as any
  if (!job) {
    return NextResponse.json({error: "Job not found"}, {status: 404})
  }
  let template = process.env.COVER_LETTER_PROMPT || ""
  let prompt = template
    .replace("{{JOB_TITLE}}", job.title)
    .replace("{{COMPANY}}", job.companyName)
    .replace("{{JOB_DESCRIPTION}}", job.description)
    .replace("{{NAME}}", profile.fullName)
    .replace("{{SKILLS}}", profile.skills?.join(", ") || "N/A")
  try {
    let completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{role: "user", content: prompt}],
    })
    let coverLetter = completion.choices[0]?.message?.content || ""
    profile.coverLetterCount += 1
    await profile.save()
    return NextResponse.json({coverLetter})
  } catch (err) {
    return NextResponse.json(
      {error: "Failed to generate cover letter"},
      {status: 500},
    )
  }
}
