import {
  UserPlus,
  Search,
  Send,
  Briefcase,
  ClipboardList,
  Users,
} from "lucide-react"

const seekerSteps = [
  {
    icon: UserPlus,
    title: "Create Account",
    desc: "Complete your profile and upload your resume to get noticed by recruiters.",
  },
  {
    icon: Search,
    title: "Browse Jobs",
    desc: "Use our intelligent filters to find roles that match your skills and goals.",
  },
  {
    icon: Send,
    title: "Apply",
    desc: "Send tailored applications with just one click and track your progress.",
  },
]

const employerSteps = [
  {
    icon: Briefcase,
    title: "Post Job",
    desc: "List your open positions and reach millions of qualified candidates.",
  },
  {
    icon: ClipboardList,
    title: "Review Applicants",
    desc: "Use our screening tools to filter and manage top-tier talent effortlessly.",
  },
  {
    icon: Users,
    title: "Hire",
    desc: "Connect with your favorite candidates and build your dream team.",
  },
]

function StepList({steps}: {steps: typeof seekerSteps}) {
  return (
    <ul className="space-y-6">
      {steps.map((step, i) => (
        <li key={step.title} className="flex items-start gap-4">
          <span className="w-8 h-8 rounded-full bg-[#2d4fd6] text-white text-sm font-bold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <div>
            <p className="font-semibold text-gray-900">{step.title}</p>
            <p className="text-sm text-gray-500 mt-1">{step.desc}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function StepsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Simple Steps to Success
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#f7f8ff] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <UserPlus className="w-5 h-5 text-[#2d4fd6]" />
              <h3 className="font-semibold text-gray-900">For Job Seekers</h3>
            </div>
            <StepList steps={seekerSteps} />
          </div>
          <div className="bg-[#f7f8ff] rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase className="w-5 h-5 text-[#2d4fd6]" />
              <h3 className="font-semibold text-gray-900">For Employers</h3>
            </div>
            <StepList steps={employerSteps} />
          </div>
        </div>
      </div>
    </section>
  )
}
