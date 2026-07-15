import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import jobModel from "@/model/jobModel"
import applicationModel from "@/model/applicationModel"
import cloudinary from "@/lib/cloudinary"

export async function POST(req: NextRequest) {
  let session = (await getServerSession(authOptions)) as any
  if (!session)
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  if (session.user.role !== "jobSeeker")
    return NextResponse.json(
      {message: "Only job seekers can apply"},
      {status: 403},
    )

  let formData = await req.formData()
  let jobId = formData.get("job") as string
  let fullName = formData.get("fullName") as string
  let email = formData.get("email") as string
  let coverLetter = formData.get("coverLetter") as string
  let cvFile = formData.get("cv") as File

  if (!jobId || !fullName || !email || !cvFile)
    return NextResponse.json(
      {message: "Missing required fields"},
      {status: 400},
    )
  await connectDB()
  let job = await jobModel.findById(jobId)
  if (!job) return NextResponse.json({message: "Job not found"}, {status: 404})

  let existing = await applicationModel.findOne({
    job: jobId,
    applicant: session.user.id,
  })
  if (existing)
    return NextResponse.json(
      {message: "You Already Applied to this job"},
      {status: 400},
    )
  let bytes = await cvFile.arrayBuffer()
  let buffer = Buffer.from(bytes)
  let uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {resource_type: "raw", folder: "hiresync-cvs"},
        (err, result) => (err ? reject(err) : resolve(result)),
      )
      .end(buffer)
  })
  console.log(uploadResult)
  console.log(buffer)
  console.log(bytes)
  let cvUrl = uploadResult.secure_url
  let application = await applicationModel.create({
    job: jobId,
    applicant: session.user.id,
    fullName,
    email,
    coverLetter,
    cvUrl,
  })
  return NextResponse.json({message: "Application submitted", application})
}
