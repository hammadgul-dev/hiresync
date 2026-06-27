import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import authOptions from "@/lib/auth"
import dbConnect from "@/lib/db"
import jobModel from "@/model/jobModel"

export async function POST(req: NextRequest) {
  try {
    let session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    if (session.user.role !== "employer") {
      return NextResponse.json(
        {message: "Only Employers can post jobs"},
        {status: 403},
      )
    }
    await dbConnect()
    let body = await req.json()
    let {
      title,
      category,
      jobType,
      location,
      salaryMin,
      salaryMax,
      currency,
      experience,
      deadline,
      skills,
      description,
      requirements,
      benefits,
    } = body

    if (
      !title ||
      !category ||
      !jobType ||
      !location ||
      !salaryMin ||
      !salaryMax ||
      !experience ||
      !deadline ||
      !description ||
      !requirements
    ) {
      return NextResponse.json(
        {message: "All Required fields must be filled"},
        {status: 400},
      )
    }

    if (!skills || skills.length === 0) {
      return NextResponse.json(
        {message: "At least one skill required"},
        {status: 400},
      )
    }

    if (Number(salaryMin) >= Number(salaryMax)) {
      return NextResponse.json(
        {message: "Max salary must be greater than min"},
        {status: 400},
      )
    }

    let job = await jobModel.create({
      title,
      category,
      jobType,
      location,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency,
      experience,
      deadline: new Date(deadline),
      skills,
      description,
      requirements,
      benefits,
      employer: (session.user as any)?.id,
      companyName: (session.user as any)?.companyName,
    })
    return NextResponse.json(
      {message: "Job posted successfully"},
      {status: 201},
    )
  } catch {
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    let {searchParams} = new URL(req.url)
    let page = Number(searchParams.get("page") || 1)
    let limit = 10
    let skip = (page - 1) * limit
    let search = searchParams.get("search") || ""
    let location = searchParams.get("location") || ""
    let jobType = searchParams.get("jobType") || ""
    let category = searchParams.get("category") || ""
    let experience = searchParams.get("experience") || ""
    let filter: any = {isActive: true}

    if (search) filter.title = {$regex: search, $options: "i"}
    if (location) filter.location = {$regex: location, $options: "i"}
    if (jobType) filter.jobType = jobType
    if (category) filter.category = category
    if (experience) filter.experience = experience

    let [jobs, total] = await Promise.all([
      jobModel.find(filter).sort({createdAt: -1}).skip(skip).limit(limit),
      jobModel.countDocuments(filter),
    ])
    return NextResponse.json({jobs, total}, {status: 200})
  } catch {
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}
