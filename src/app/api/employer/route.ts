import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import Job from "@/model/jobModel"

export async function GET(req: NextRequest) {
  let session = (await getServerSession(authOptions)) as any
  if (!session || session.user.role !== "employer") {
    return NextResponse.json({message: "Unauthorized"}, {status: 401})
  }

  await connectDB()
  let jobs = await Job.find({employer: session.user.id}).sort({createdAt: -1})

  let total = jobs.length
  let active = jobs.filter((j: any) => j.isActive).length
  let closed = total - active

  return NextResponse.json({
    stats: {total, active, closed},
    jobs,
  })
}
