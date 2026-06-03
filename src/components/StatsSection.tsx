import {Briefcase, Building2, Users} from "lucide-react"

const stats = [
  {icon: Briefcase, value: "10,000+", label: "Jobs listed daily"},
  {icon: Building2, value: "5,000+", label: "Verified companies"},
  {icon: Users, value: "50,000+", label: "Talent hired"},
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-[#f0f4ff]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map(({icon: Icon, value, label}) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-sm"
            >
              <div className="bg-[#eef1fb] p-4 rounded-xl mb-6">
                <Icon className="w-7 h-7 text-[#2d4fd6]" />
              </div>
              <h3 className="text-5xl font-bold text-gray-900 mb-2">{value}</h3>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
