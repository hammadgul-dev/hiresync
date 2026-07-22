import {NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import Application from "@/model/applicationModel"
import Job from "@/model/jobModel"

export async function GET() {
  try {
    let session = (await getServerSession(authOptions)) as any
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    await connectDB()
    if (session.user.role === "jobSeeker") {
      let applications = await Application.find({applicant: session.user.id})
        .populate("job", "title companyName")
        .sort({createdAt: -1})
      return NextResponse.json({applications}, {status: 200})
    }
    if (session.user.role === "employer") {
      let jobs = await Job.find({employer: session.user.id}).select("_id")
      let jobIds = jobs.map((j) => j._id)
      let applications = await Application.find({job: {$in: jobIds}})
        .populate("job", "title companyName")
        .populate("applicant", "fullName email")
        .sort({createdAt: -1})
      return NextResponse.json({applications}, {status: 200})
    }
    return NextResponse.json({error: "Access denied"}, {status: 403})
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}
