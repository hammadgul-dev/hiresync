import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import connectDB from "@/lib/db"
import authModel from "@/model/authModel"
import bcrypt from "bcryptjs"

let authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {label: "Email", type: "email"},
        password: {label: "password", type: "password"},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("All Fields Are Required")
        }
        await connectDB()
        let user = await authModel.findOne({email: credentials.email})
        if (!user) {
          throw new Error("User Not Found")
        }
        let isMatch = await bcrypt.compare(credentials.password, user.password)
        if (!isMatch) {
          throw new Error("Invalid Password")
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          isProfileComplete: user.isProfileComplete,
        }
      },
    }),
  ],
  session: {strategy: "jwt"},
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.role = (user as any).role
        token.id = (user as any).id
        token.companyName = (user as any).companyName
        token.isProfileComplete = (user as any).isProfileComplete
      }
      return token
    },
    async session({session, token}) {
      if (session.user) {
        let user = session.user as any
        user.role = token.role
        user.id = token.id
        user.companyName = token.companyName
        user.isProfileComplete = token.isProfileComplete
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
