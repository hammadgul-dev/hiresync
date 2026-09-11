import {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
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
        if (!user.password) {
          throw new Error("Please Login With Google")
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
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as any,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as any,
    }),
  ],
  session: {strategy: "jwt"},
  callbacks: {
    async signIn({user, account}: any) {
      if (account.provider === "google") {
        await connectDB()
        let existingUser = await authModel.findOne({email: user.email})
        if (!existingUser) {
          existingUser = await authModel.create({
            name: user.name,
            email: user.email,
            role: "",
            isProfileComplete: false,
          })
        }
      }
      return true
    },
    async jwt({token, user, account, trigger, session}: any) {
      if (trigger === "update" && session) {
        token.role = session.role
        token.companyName = session.companyName
        token.isProfileComplete = session.isProfileComplete
      }
      if (user) {
        token.role = user.role
        token.id = user.id
        token.companyName = user.companyName
        token.isProfileComplete = user.isProfileComplete
      }
      if (account?.provider === "google") {
        await connectDB()
        let dbUser = await authModel.findOne({email: token.email})
        if (dbUser) {
          token.id = dbUser._id.toString()
          token.role = dbUser.role
          token.companyName = dbUser.companyName
          token.isProfileComplete = dbUser.isProfileComplete
        }
      }
      if (!token.role && token.email) {
        await connectDB()
        let dbUser = await authModel.findOne({email: token.email})
        if (dbUser && dbUser.role) {
          token.role = dbUser.role
          token.companyName = dbUser.companyName
          token.isProfileComplete = dbUser.isProfileComplete
        }
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
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
