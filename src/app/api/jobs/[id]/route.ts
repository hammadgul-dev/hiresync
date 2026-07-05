import {NextRequest, NextResponse} from "next/server"
import dbConnect from "@/lib/db"
import jobModel from "@/model/jobModel"

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  try {
    await dbConnect()
    let job = await jobModel.findById(params.id)
    if (!job)
      return NextResponse.json({message: "Job not found"}, {status: 404})
    return NextResponse.json({job}, {status: 200})
  } catch {
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}
