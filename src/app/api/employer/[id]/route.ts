import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import jobModel from "@/model/jobModel"

export async function DELETE(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  let session = (await getServerSession(authOptions)) as any
  if (!session)
    return NextResponse.json({message: "Unauthorized"}, {status: 401})

  let {id} = await params
  await connectDB()
  let job = await jobModel.findById(id)
  if (!job) return NextResponse.json({message: "Job not found"}, {status: 404})
  if (job.employer.toString() !== session.user.id) {
    return NextResponse.json({message: "Forbidden"}, {status: 403})
  }

  await jobModel.findByIdAndDelete(id)
  return NextResponse.json({message: "Job deleted"})
}

export async function PATCH(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    let session = (await getServerSession(authOptions)) as any
    if (!session)
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    let {id} = await params
    await connectDB()
    let job = await jobModel.findById(id)
    if (!job)
      return NextResponse.json({message: "Job not found"}, {status: 404})
    if (job.employer.toString() !== session.user.id) {
      return NextResponse.json({message: "Not allowed"}, {status: 403})
    }
    let body = await req.json()
    job.isActive = body.isActive
    await job.save()
    return NextResponse.json({message: "Status updated", job})
  } catch (err: any) {
    return NextResponse.json({message: err.message}, {status: 500})
  }
}
