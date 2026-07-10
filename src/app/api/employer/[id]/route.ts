import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import Job from "@/model/jobModel"

export async function DELETE(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  let session = (await getServerSession(authOptions)) as any
  if (!session)
    return NextResponse.json({message: "Unauthorized"}, {status: 401})

  let {id} = await params
  await connectDB()
  let job = await Job.findById(id)
  if (!job) return NextResponse.json({message: "Job not found"}, {status: 404})
  if (job.employer.toString() !== session.user.id) {
    return NextResponse.json({message: "Forbidden"}, {status: 403})
  }

  await Job.findByIdAndDelete(id)
  return NextResponse.json({message: "Job deleted"})
}
