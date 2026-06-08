import {MapPin, Users} from "lucide-react"

const companies = [
  {
    id: 1,
    name: "TechFlow Solutions",
    industry: "Software Development",
    location: "San Francisco, CA",
    size: "500-1000",
    description:
      "Building next-generation web applications and cloud solutions for enterprises worldwide.",
  },
  {
    id: 2,
    name: "CreativeMind Studio",
    industry: "Design & Creative",
    location: "New York, NY",
    size: "50-200",
    description:
      "Award-winning design studio crafting beautiful digital experiences for global brands.",
  },
  {
    id: 3,
    name: "Analytica AI",
    industry: "Artificial Intelligence",
    location: "Austin, TX",
    size: "200-500",
    description:
      "Pioneering AI and machine learning solutions to transform business intelligence.",
  },
  {
    id: 4,
    name: "CloudBase Inc",
    industry: "Cloud Infrastructure",
    location: "Seattle, WA",
    size: "1000+",
    description:
      "Leading cloud infrastructure provider serving Fortune 500 companies globally.",
  },
  {
    id: 5,
    name: "SafeGuard Ltd",
    industry: "Cybersecurity",
    location: "Washington, DC",
    size: "200-500",
    description:
      "Protecting businesses with enterprise-grade cybersecurity solutions and threat intelligence.",
  },
  {
    id: 6,
    name: "GrowthHub",
    industry: "Marketing & Growth",
    location: "Los Angeles, CA",
    size: "50-200",
    description:
      "Data-driven marketing agency helping startups and enterprises scale their growth.",
  },
  {
    id: 7,
    name: "NeuralTech",
    industry: "Machine Learning",
    location: "Boston, MA",
    size: "100-500",
    description:
      "Cutting-edge neural network research and production ML systems for enterprise clients.",
  },
  {
    id: 8,
    name: "RetailPro",
    industry: "E-Commerce",
    location: "Chicago, IL",
    size: "500-1000",
    description:
      "Powering the future of retail with smart e-commerce platforms and supply chain tech.",
  },
  {
    id: 9,
    name: "PixelCraft",
    industry: "UI/UX Design",
    location: "Portland, OR",
    size: "10-50",
    description:
      "Boutique design agency focused on pixel-perfect interfaces and user-centered design.",
  },
  {
    id: 10,
    name: "InsightCo",
    industry: "Data Analytics",
    location: "Denver, CO",
    size: "100-500",
    description:
      "Turning raw data into actionable business insights through advanced analytics platforms.",
  },
  {
    id: 11,
    name: "SkyNet Systems",
    industry: "Cloud & DevOps",
    location: "Austin, TX (Remote)",
    size: "200-500",
    description:
      "Cloud-native DevOps solutions helping engineering teams ship faster and more reliably.",
  },
  {
    id: 12,
    name: "MediCore Health",
    industry: "Healthcare Tech",
    location: "Nashville, TN",
    size: "500-1000",
    description:
      "Revolutionizing healthcare delivery through innovative digital health platforms.",
  },
]

const industries = [
  "All",
  "Software Development",
  "Artificial Intelligence",
  "Cybersecurity",
  "Design & Creative",
  "Cloud Infrastructure",
  "Marketing & Growth",
  "Machine Learning",
  "E-Commerce",
  "Data Analytics",
]

export default function CompaniesPage() {
  return (
    <div className="min-h-screen bg-[#f0f4ff]">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Browse Companies</h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover top companies hiring right now
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="text"
            placeholder="Search companies..."
            className="flex-1 border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] focus:border-transparent"
          />
          <select className="border border-gray-200 bg-white rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#2d4fd6] cursor-pointer text-gray-600">
            {industries.map((i) => (
              <option key={i}>{i}</option>
            ))}
          </select>
        </div>

        <p className="text-sm text-gray-500 mb-5">
          {companies.length} companies found
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#eef1fb] flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-[#2d4fd6]">
                    {company.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {company.name}
                  </p>
                  <p className="text-xs text-[#2d4fd6]">{company.industry}</p>
                </div>
              </div>

              <p className="text-xs text-gray-500 leading-relaxed">
                {company.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MapPin size={12} />
                  {company.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users size={12} />
                  {company.size}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
