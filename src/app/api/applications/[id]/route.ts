import {NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import Application from "@/model/applicationModel"
import Job from "@/model/jobModel"

export async function PATCH(
  req: Request,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    let session = (await getServerSession(authOptions)) as any
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    if (session.user.role !== "employer") {
      return NextResponse.json({error: "Access denied"}, {status: 403})
    }
    let {id} = await params
    let {status} = await req.json()
    if (!["accepted", "rejected"].includes(status)) {
      return NextResponse.json({error: "Invalid status"}, {status: 400})
    }
    await connectDB()
    let application = await Application.findById(id).populate("job")
    if (!application) {
      return NextResponse.json({error: "Application Not Found"}, {status: 404})
    }
    let job = application.job as any
    if (job.employer.toString() !== session.user.id) {
      return NextResponse.json({error: "Access denied"}, {status: 403})
    }
    application.status = status
    await application.save()
    return NextResponse.json(
      {message: `Application ${status}`, application},
      {status: 200},
    )
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}
