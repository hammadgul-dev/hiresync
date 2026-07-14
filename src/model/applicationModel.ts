import mongoose from "mongoose"

let applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    coverLetter: {type: String},
    cvUrl: {type: String, required: true},
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
  },
  {timestamps: true},
)

let applicationModel =
  mongoose.models.Application ||
  mongoose.model("Application", applicationSchema)

export default applicationModel
