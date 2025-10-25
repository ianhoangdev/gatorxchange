import { Users, Shield, MessageCircle, TrendingUp } from "lucide-react"

export function About() {
  const features = [
    {
      icon: Users,
      title: "Community Driven",
      description: "A trusted marketplace for your local community.",
    },
    {
      icon: TrendingUp,
      title: "Local Community",
      description: "Connect with students on your campus for easy exchanges.",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Verified profiles and secure authentication keep you protected.",
    },
    {
      icon: MessageCircle,
      title: "By Gators, For Gators",
      description: "Developers that understand their userbase, feedback matters.",
    },
    {
      icon: TrendingUp,
      title: "Relevant Listings",
      description: "Easily find things students actually want.",
    },
  ]

  return (
    <section id="about" className="py-24 px-4 bg-gradient-to-b from-white to-[#0021A5]/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0021A5] mb-4">Why Choose Gator Exchange?</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Built by students, for students. Experience the best marketplace designed specifically for the UF community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-transparent hover:border-[#FA4616] group"
            >
              <div className="w-14 h-14 bg-[#FA4616]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#FA4616] transition-colors">
                <feature.icon className="h-7 w-7 text-[#FA4616] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-xl font-bold text-[#0021A5] mb-3">{feature.title}</h3>
              <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
