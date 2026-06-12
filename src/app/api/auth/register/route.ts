import connectDB from "@/lib/db"
import authModel from "@/model/authModel"
import {NextRequest, NextResponse} from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    let body = await req.json()
    let {name, email, password, role, companyName} = body

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        {message: "All Fields are Required"},
        {status: 400},
      )
    }

    if (role === "employer" && !companyName) {
      return NextResponse.json(
        {message: "Company Name is Required"},
        {status: 400},
      )
    }

    await connectDB()
    let existingUser = await authModel.findOne({email})
    if (existingUser)
      return NextResponse.json({message: "User Already Exists"}, {status: 400})

    let userPassword = await bcrypt.hash(password, 10)
    await authModel.create({
      name,
      email,
      password: userPassword,
      role,
      companyName,
    })

    return NextResponse.json(
      {message: "Registered Successfully"},
      {status: 201},
    )
  } catch (e) {
    return NextResponse.json(
      {message: "Error Occur During Register"},
      {status: 500},
    )
  }
}