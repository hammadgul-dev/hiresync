import connectDB from "@/lib/db"
import authModel from "@/model/authModel"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import {NextRequest, NextResponse} from "next/server"

export async function POST(req: NextRequest) {
  try {
    let session: any = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    let body = await req.json()
    let {role, companyName} = body
    if (!role) {
      return NextResponse.json({message: "Role Is Required"}, {status: 400})
    }
    if (role === "employer" && !companyName) {
      return NextResponse.json(
        {message: "Company Name is Required"},
        {status: 400},
      )
    }
    await connectDB()
    await authModel.findByIdAndUpdate(session.user.id, {role, companyName})
    return NextResponse.json({message: "Role Set Successfully"}, {status: 200})
  } catch (e) {
    return NextResponse.json({message: "Error Setting Role"}, {status: 500})
  }
}
