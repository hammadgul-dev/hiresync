import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import dbConnect from "@/lib/db"
import jobModel from "@/model/jobModel"

export async function GET(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    await dbConnect()
    let {id} = await params
    let job = await jobModel.findById(id)
    if (!job)
      return NextResponse.json({message: "Job not found"}, {status: 404})
    return NextResponse.json({job}, {status: 200})
  } catch {
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}

export async function PUT(
  req: NextRequest,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    let session = (await getServerSession(authOptions)) as any
    if (!session)
      return NextResponse.json({message: "Unauthorized"}, {status: 401})

    let {id} = await params
    await dbConnect()

    let job = await jobModel.findById(id)
    if (!job)
      return NextResponse.json({message: "Job not found"}, {status: 404})
    if (job.employer.toString() !== session.user.id) {
      return NextResponse.json({message: "Forbidden"}, {status: 403})
    }

    let body = await req.json()
    let updated = await jobModel.findByIdAndUpdate(id, body, {new: true})

    return NextResponse.json(
      {message: "Job updated successfully", job: updated},
      {status: 200},
    )
  } catch {
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}
