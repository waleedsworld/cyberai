import { Card, CardContent } from "@/components/ui/card"
import { Shield, Eye, Mail, Zap, FileCheck, Bot, UserX, Radar, Target } from "lucide-react"
import dashboardImage from "@/assets/cyber-dashboard.jpg"

const FeaturesSection = () => {
  const features = [
    {
      icon: Shield,
      title: "AI Threat Detection",
      description: "Real-time anomaly detection for ransomware, zero-days, and advanced persistent threats targeting Gulf enterprises."
    },
    {
      icon: Eye,
      title: "Dark Web Intelligence",
      description: "Monitor Arabic & global forums, Telegram channels, and detect stolen data from Saudi and GCC organizations."
    },
    {
      icon: Mail,
      title: "Phishing & Fraud Defense",
      description: "AI-powered detection of Arabic phishing websites, emails, and logo impersonation attacks on Gulf brands."
    },
    {
      icon: Zap,
      title: "AI-Powered Incident Response",
      description: "Automated triage of false positives with integrated digital forensics for faster threat containment."
    },
    {
      icon: FileCheck,
      title: "Continuous Compliance with AI",
      description: "Automated checks for NCA ECC-1, SAMA Cybersecurity Framework, Aramco CCC, PCI DSS, and GDPR."
    },
    {
      icon: Bot,
      title: "SOC Copilot AI",
      description: "Bilingual Arabic & English LLM assistant for security analysts with Gulf-specific threat intelligence."
    },
    {
      icon: UserX,
      title: "Insider Threat Detection",
      description: "User behavior analytics (UEBA) detecting abnormal logins and privilege abuse in Gulf enterprises."
    },
    {
      icon: Radar,
      title: "Drone & IoT AI Security",
      description: "Specialized monitoring for unauthorized drones and IoT anomalies in Oil & Gas critical infrastructure."
    },
    {
      icon: Target,
      title: "Generative AI Threat Simulation",
      description: "Simulate phishing campaigns and deepfake attacks tailored for Gulf enterprise security training."
    }
  ]

  return (
    <section id="features" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Building the Future of AI Cybersecurity in the Gulf
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            PointBlank is under active development, with modules being tested by leading Saudi and GCC enterprises.
            Experience the next generation of AI-powered security designed for the Middle East.
          </p>
        </div>

        <div className="mb-16">
          <img 
            src={dashboardImage} 
            alt="PointBlank dashboard"
            className="w-full rounded-2xl shadow-2xl border border-border"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border hover:border-cyber-purple/50 transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-teal rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-6 h-6 text-cyber-light" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
