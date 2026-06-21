import {NextRequest, NextResponse} from "next/server"
import connectDB from "@/lib/db"
import authModel from "@/model/authModel"
import {JobSeekerProfile, EmployerProfile} from "@/model/profileModel"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    let session = await getServerSession(authOptions)
    if (!session)
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    let userId = (session.user as any).id
    let role = (session.user as any).role
    let body = await req.json()
    await connectDB()

    if (role === "jobSeeker") {
      let {
        fullName,
        jobTitle,
        location,
        shortBio,
        skills,
        experience,
        education,
        photo,
      } = body
      if (!fullName || !jobTitle || !location || !shortBio)
        return NextResponse.json(
          {message: "All fields are required"},
          {status: 400},
        )

      await JobSeekerProfile.create({
        userId,
        fullName,
        jobTitle,
        location,
        shortBio,
        skills: skills || [],
        experience: experience || [],
        education: education || [],
        photo: photo || "",
      })
    } else {
      let {
        fullName,
        industry,
        companySize,
        location,
        website,
        companyDescription,
        photo,
      } = body
      if (!fullName || !location || !companyDescription)
        return NextResponse.json(
          {message: "All fields are required"},
          {status: 400},
        )
      await EmployerProfile.create({
        userId,
        fullName,
        industry,
        companySize,
        location,
        website: website || "",
        companyDescription,
        photo: photo || "",
      })
    }
    await authModel.findByIdAndUpdate(userId, {isProfileComplete: true})
    return NextResponse.json(
      {message: "Profile saved successfully"},
      {status: 201},
    )
  } catch (e) {
    return NextResponse.json({message: (e as Error).message}, {status: 500})
  }
}
