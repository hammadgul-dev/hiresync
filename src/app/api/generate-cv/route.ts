import {NextRequest, NextResponse} from "next/server"
import {getServerSession} from "next-auth"
import connectDB from "@/lib/db"
import authOptions from "@/lib/auth"
import {JobSeekerProfile} from "@/model/profileModel"
import cloudinary from "@/lib/cloudinary"
import Groq from "groq-sdk"
let PDFKitModule = require("pdfkit")
let PDFDocument = PDFKitModule.default ? PDFKitModule.default : PDFKitModule

let groq = new Groq({apiKey: process.env.GROQ_API_KEY})
export async function POST(req: NextRequest) {
  try {
    let session: any = await getServerSession(authOptions as any)
    if (!session || session.user.role !== "jobSeeker") {
      return NextResponse.json({message: "Unauthorized"}, {status: 401})
    }
    await connectDB()
    let profile: any = await JobSeekerProfile.findOne({userId: session.user.id})
    console.log(profile)
    if (!profile) {
      return NextResponse.json({message: "Profile not found"}, {status: 404})
    }
    if (profile.cvCount >= 3) {
      return NextResponse.json({message: "Limit Reached"}, {status: 403})
    }
    let name = session.user.name || "Job Seeker"
    let email = session.user.email || ""
    let skills =
      profile.skills && profile.skills.length > 0
        ? profile.skills.join(", ")
        : "N/A - skip this section"
    let bio = profile.shortBio ? profile.shortBio : "N/A - skip this section"
    let experience =
      profile.experience && profile.experience.length > 0
        ? JSON.stringify(profile.experience)
        : "N/A - skip this section"

    let prompt = (process.env.CV_PROMPT as string)
      .replace("{{NAME}}", name)
      .replace("{{SKILLS}}", skills)
      .replace("{{BIO}}", bio)
      .replace("{{EXPERIENCE}}", experience)

    let completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{role: "user", content: prompt}],
    })
    let cvText = completion.choices[0].message.content as any
    let pdfBuffer: Buffer = await new Promise((resolve, reject) => {
      let doc = new PDFDocument({margin: 50})
      let chunks: any[] = []
      doc.on("data", (chunk) => chunks.push(chunk))
      doc.on("end", () => resolve(Buffer.concat(chunks)))
      doc.on("error", reject)
      doc.fontSize(20).text(name, {align: "center"})
      doc.fontSize(10).fillColor("gray").text(email, {align: "center"})
      doc.moveDown(1.5)
      doc.fillColor("black").fontSize(12).text(cvText, {align: "left"})
      doc.end()
    })

    let safeName = name.replace(/\s+/g, "_")
    let uploadResult: any = await new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "hiresync/cvs",
          public_id: `${safeName}_CV_${Date.now()}`,
          format: "pdf",
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        },
      )
      stream.end(pdfBuffer)
    })
    profile.cvCount += 1
    await profile.save()
    return NextResponse.json({cvUrl: uploadResult.secure_url}, {status: 200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({message: "Something went wrong"}, {status: 500})
  }
}
