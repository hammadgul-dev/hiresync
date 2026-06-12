import mongoose from "mongoose"

let authSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {type: String, required: true},
    role: {type: String, enum: ["employer", "jobSeeker"], required: true},
    companyName: {type: String},
  },
  {timestamps: true},
)

let authModel = mongoose.models.User || mongoose.model("User", authSchema)

export default authModel
