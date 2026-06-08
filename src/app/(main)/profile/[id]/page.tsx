import {
  MapPin,
  Globe,
  Briefcase,
  GraduationCap,
  Download,
  Users,
  Building2,
} from "lucide-react"

const seekerProfile = {
  role: "jobSeeker",
  name: "John Doe",
  title: "Senior Frontend Developer",
  location: "San Francisco, CA",
  bio: "Passionate frontend developer with 4+ years of experience building scalable web applications using React, TypeScript, and Tailwind CSS.",
  skills: [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Next.js",
    "Node.js",
    "MongoDB",
  ],
  experience: [
    {
      id: 1,
      title: "Senior Frontend Engineer",
      company: "TechFlow Solutions",
      startDate: "Jan 2021",
      endDate: "",
      current: true,
      description:
        "Led the redesign of the core dashboard application using React and Tailwind, improving performance by 40%.",
    },
    {
      id: 2,
      title: "Frontend Developer",
      company: "PixelCraft",
      startDate: "Mar 2019",
      endDate: "Dec 2020",
      current: false,
      description:
        "Built responsive UI components and integrated REST APIs for client projects.",
    },
  ],
  education: [
    {
      id: 1,
      degree: "B.S. Computer Science",
      institution: "Stanford University",
      year: "2020",
    },
  ],
}

const employerProfile = {
  role: "employer",
  name: "TechFlow Solutions",
  industry: "Software Development",
  location: "San Francisco, CA",
  size: "500-1000",
  website: "https://techflow.com",
  description:
    "Building next-generation web applications and cloud solutions for enterprises worldwide. We are a team of passionate engineers and designers who love what we do.",
}

export default function ProfilePage() {
  const role = seekerProfile.role

  if (role === "employer") {
    return (
      <div className="min-h-screen bg-[#f0f4ff] px-4 py-10">
        <div className="max-w-2xl mx-auto flex flex-col gap-5">
          <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="w-20 h-20 rounded-2xl bg-[#eef1fb] flex items-center justify-center shrink-0 text-3xl">
              🏢
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-lg font-bold text-gray-900">
                {employerProfile.name}
              </h1>
              <p className="text-sm text-[#2d4fd6] font-medium mt-0.5">
                {employerProfile.industry}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <MapPin size={12} />
                  {employerProfile.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Users size={12} />
                  {employerProfile.size} employees
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {employerProfile.description}
              </p>
              <a
                href={employerProfile.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-[#2d4fd6] hover:underline mt-2 cursor-pointer"
              >
                <Globe size={12} />
                {employerProfile.website}
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0f4ff] px-4 py-10">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-20 h-20 rounded-full bg-[#eef1fb] flex items-center justify-center shrink-0 text-3xl">
            👤
          </div>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-lg font-bold text-gray-900">
              {seekerProfile.name}
            </h1>
            <p className="text-sm text-[#2d4fd6] font-medium mt-0.5">
              {seekerProfile.title}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-gray-400 mt-1.5">
              <MapPin size={12} />
              <span>{seekerProfile.location}</span>
            </div>
            <p className="text-xs text-gray-500 mt-3 leading-relaxed">
              {seekerProfile.bio}
            </p>
          </div>
          <button className="flex items-center gap-2 bg-[#2d4fd6] hover:bg-[#2440b8] text-white text-xs font-medium px-4 py-2 rounded-lg cursor-pointer transition-colors shrink-0">
            <Download size={13} />
            Download CV
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-gray-900">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {seekerProfile.skills.map((s) => (
              <span
                key={s}
                className="bg-[#eef1fb] text-[#2d4fd6] text-xs px-3 py-1 rounded-full"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Briefcase size={15} className="text-[#2d4fd6]" />
            Work Experience
          </h2>
          <div className="flex flex-col gap-3">
            {seekerProfile.experience.map((exp) => (
              <div
                key={exp.id}
                className="border border-gray-100 rounded-xl p-4"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {exp.title}
                </p>
                <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                  {exp.company}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {exp.startDate} — {exp.current ? "Present" : exp.endDate}
                </p>
                {exp.description && (
                  <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <GraduationCap size={15} className="text-[#2d4fd6]" />
            Education
          </h2>
          <div className="flex flex-col gap-3">
            {seekerProfile.education.map((edu) => (
              <div
                key={edu.id}
                className="border border-gray-100 rounded-xl p-4"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {edu.degree}
                </p>
                <p className="text-xs text-[#2d4fd6] font-medium mt-0.5">
                  {edu.institution}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  Class of {edu.year}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
