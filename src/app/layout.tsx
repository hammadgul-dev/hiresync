import type {Metadata} from "next"
import {Poppins} from "next/font/google"
import "./globals.css"
import Navbar from "@/components/Navbar"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "HireSync",
  description: "Find your dream job or hire top talent",
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
