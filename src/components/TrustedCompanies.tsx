export default function TrustedCompanies() {
  const companies = [
    "TechFlow",
    "CloudNine",
    "Pulse",
    "Zenith",
    "Orbit",
    "Vertex",
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-gray-400 uppercase mb-8">
          Trusted by Leading Companies
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <span
              key={company}
              className="text-xl font-semibold text-gray-300 hover:text-gray-500 transition-colors duration-200 cursor-default"
            >
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
