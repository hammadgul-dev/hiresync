import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import {Toaster} from "react-hot-toast"

export default function MainLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{duration: 2500, style: {fontSize: "14px"}}}
      />
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
