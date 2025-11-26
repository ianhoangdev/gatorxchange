import { Card, CardContent } from "@/components/ui/card"
import { Users, MapPin, Shield, Heart, Search } from "lucide-react"

const benefits = [
  {
    icon: Users,
    title: "Community Driven",
    description: "A trusted marketplace for your local community.",
  },
  {
    icon: MapPin,
    title: "Local Community",
    description: "Connect with students on your campus for easy exchanges.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified profiles and secure authentication keep you protected.",
  },
  {
    icon: Heart,
    title: "By Gators, For Gators",
    description: "Developers that understand their userbase, feedback matters.",
  },
  {
    icon: Search,
    title: "Relevant Listings",
    description: "Easily find things students actually want.",
  },
]

export function Benefits() {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-balance">
            Why Choose <span className="text-primary">GatorXchange</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Built specifically for the UF community with features that matter to students.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
