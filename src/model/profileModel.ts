import mongoose from "mongoose"

const baseOptions = {
  discriminatorKey: "role",
  collection: "profiles",
}

const baseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    photo: {type: String},
    fullName: {type: String, required: true},
    location: {type: String},
  },
  {...baseOptions, timestamps: true},
)

const Profile = mongoose.models.Profile || mongoose.model("Profile", baseSchema)

const jobSeekerSchema = new mongoose.Schema({
  jobTitle: {type: String},
  shortBio: {type: String},
  skills: [{type: String}],
  experience: [
    {
      jobTitle: {type: String},
      companyName: {type: String},
      startDate: {type: String},
      endDate: {type: String},
      current: {type: Boolean, default: false},
      description: {type: String},
    },
  ],
  education: [
    {
      degreeName: {type: String},
      institution: {type: String},
      year: {type: String},
    },
  ],
})

const employerSchema = new mongoose.Schema({
  industry: {type: String},
  companySize: {type: String},
  website: {type: String},
  companyDescription: {type: String},
})

export const JobSeekerProfile =
  mongoose.models.JobSeekerProfile ||
  Profile.discriminator("JobSeekerProfile", jobSeekerSchema)

export const EmployerProfile =
  mongoose.models.EmployerProfile ||
  Profile.discriminator("EmployerProfile", employerSchema)

export default Profile
