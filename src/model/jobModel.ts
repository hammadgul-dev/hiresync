import mongoose from "mongoose"

let jobSchema = new mongoose.Schema(
  {
    title: {type: String, required: true},
    category: {type: String, required: true},
    jobType: {type: String, required: true},
    location: {type: String, required: true},
    salaryMin: {type: Number, required: true},
    salaryMax: {type: Number, required: true},
    currency: {type: String, default: "USD"},
    experience: {type: String, required: true},
    deadline: {type: Date, required: true},
    skills: [{type: String}],
    description: {type: String, required: true},
    requirements: {type: String},
    benefits: {type: String},
    employer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyName: {type: String, required: true},
    isActive: {type: Boolean, default: true},
  },
  {timestamps: true},
)

let jobModel = mongoose.models.Job || mongoose.model("Job", jobSchema)

export default jobModel
