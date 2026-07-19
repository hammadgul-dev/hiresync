import {NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import Application from "@/model/applicationModel"

export async function GET() {
  try {
    let session = (await getServerSession(authOptions)) as any
    if (!session) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }
    if (session.user.role !== "jobSeeker") {
      return NextResponse.json({error: "Access denied"}, {status: 403})
    }
    await connectDB()
    let applications = await Application.find({applicant: session.user.id})
      .populate("job", "title companyName")
      .sort({createdAt: -1})
    return NextResponse.json({applications}, {status: 200})
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}
