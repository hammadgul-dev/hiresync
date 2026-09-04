import {NextResponse} from "next/server"
import connectDB from "@/lib/db"
import Profile from "@/model/profileModel"

export async function GET(
  req: Request,
  {params}: {params: Promise<{id: string}>},
) {
  try {
    let {id} = await params
    await connectDB()
    let profile: any = await Profile.findOne({userId: id})
    if (!profile) {
      return NextResponse.json({error: "Profile not found"}, {status: 404})
    }
    if (profile.role === "JobSeekerProfile") {
      profile.profileViews = (profile.profileViews || 0) + 1
      await profile.save()
    }
    return NextResponse.json({profile}, {status: 200})
  } catch (err) {
    console.error(err)
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}
