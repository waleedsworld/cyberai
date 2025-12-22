import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Brain } from "lucide-react"

const WhySection = () => {
  const reasons = [
    {
      icon: TrendingUp,
      title: "Evolving Threats in the Gulf",
      description: "Zero-day ransomware attacks specifically targeting Saudi & UAE oil, banking, and government sectors are increasing by 40% annually.",
      highlight: "40% increase"
    },
    {
      icon: AlertTriangle,
      title: "Compliance Pressure",
      description: "Strict enforcement of NCA ECC-1, SAMA regulations, and Aramco CCC audits with penalties reaching SAR 5M+ for non-compliance.",
      highlight: "SAR 5M+ penalties"
    },
    {
      icon: Brain,
      title: "Alert Fatigue",
      description: "SOCs in KSA/UAE process 10,000+ daily alerts with 95% false positives, overwhelming analysts and missing real threats.",
      highlight: "95% false positives"
    }
  ]

  return (
    <section id="why" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Why PointBlank?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The cybersecurity landscape in the Gulf is rapidly evolving. Traditional security tools 
            can't keep pace with AI-powered threats and strict regional compliance requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="bg-card border-border hover:border-cyber-teal/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyber-purple to-cyber-teal rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <reason.icon className="w-8 h-8 text-cyber-light" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {reason.title}
                  </h3>
                  <div className="text-3xl font-bold text-cyber-teal mb-4">
                    {reason.highlight}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            Loneliness and lack of preparation have{" "}
            <span className="text-cyber-purple font-semibold">devastating consequences</span>{" "}
            on Gulf enterprises at a time when they are{" "}
            <span className="text-cyber-teal font-semibold">most vulnerable</span>. 
            We want to <span className="text-foreground font-semibold">prevent that</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default WhySection
