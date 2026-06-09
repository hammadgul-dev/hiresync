import mongoose from "mongoose"

let isConnected = false

export default async function connectDB() {
  try {
    if (isConnected) return
    await mongoose.connect(process.env.MONGODB_URI!)
    isConnected = true
  } catch (e) {
    console.log("DB CONNECTION FAILED!")
  }
}
