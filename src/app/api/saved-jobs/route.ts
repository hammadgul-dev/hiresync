import {NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import connectDB from "@/lib/db"
import {JobSeekerProfile} from "@/model/profileModel"

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
    return NextResponse.json({error: "Profile Not found"}, {status: 404})
  }
  let alreadySaved = profile.savedJobs.some((j: any) => j.toString() === jobId)
  if (alreadySaved) {
    profile.savedJobs = profile.savedJobs.filter(
      (j: any) => j.toString() !== jobId,
    )
  } else {
    profile.savedJobs.push(jobId)
  }
  await profile.save()
  return NextResponse.json({saved: !alreadySaved})
}

export async function GET() {
  await connectDB()
  let session = (await getServerSession(authOptions)) as any
  if (!session || session.user.role !== "jobSeeker") {
    return NextResponse.json({error: "Unauthorized"}, {status: 401})
  }
  let profile = (await JobSeekerProfile.findOne({
    userId: session.user.id,
  }).populate("savedJobs")) as any
  if (!profile) {
    return NextResponse.json({error: "Profile not found"}, {status: 404})
  }
  return NextResponse.json({savedJobs: profile.savedJobs})
}
