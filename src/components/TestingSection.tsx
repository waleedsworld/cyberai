import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Building, Briefcase, Info, Target } from "lucide-react"
import { Link } from "react-router-dom"

const TestingSection = () => {
  return (
    <section id="testing" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="px-4 py-2 text-sm bg-cyber-teal/20 text-cyber-teal border-cyber-teal/50 mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            Now Available for Public Testing
          </Badge>
          
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Be Part of the Cybersecurity Revolution
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            PointBlank is opening beta access for enterprises, SOCs, and compliance teams across Saudi Arabia,
            UAE, and the broader GCC region. Join the future of AI-powered cybersecurity.
          </p>

          <div className="bg-gradient-to-r from-cyber-purple/10 to-cyber-teal/10 rounded-2xl p-8 mb-12 border border-cyber-purple/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Aligned with Saudi Vision 2030
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Supporting the Kingdom's digital transformation goals through cutting-edge AI cybersecurity 
              innovation, strengthening the national cyber defense ecosystem.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="bg-card border-border text-center group hover:border-cyber-purple/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-teal rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 text-cyber-light" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Enterprise SOCs
              </h3>
              <p className="text-muted-foreground">
                Large organizations with dedicated security operations centers
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center group hover:border-cyber-teal/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyber-teal to-cyber-purple rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-cyber-light" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Compliance Teams
              </h3>
              <p className="text-muted-foreground">
                Organizations managing NCA, SAMA, and Aramco compliance requirements
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border text-center group hover:border-cyber-purple/50 transition-all duration-300">
            <CardContent className="p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-cyber-purple to-cyber-teal rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-6 h-6 text-cyber-light" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Cybersecurity Vendors
              </h3>
              <p className="text-muted-foreground">
                Regional partners looking to integrate AI-powered capabilities
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4 group relative">
            <Button variant="cyber" size="xl" className="px-12 py-4 text-xl" asChild>
              <Link to="/compliance-check">Try PointBlank</Link>
            </Button>
            <Info className="w-5 h-5 text-muted-foreground group-hover:text-cyber-teal cursor-help transition-colors" />
            <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-3 py-2 bg-popover border border-border rounded-md text-sm text-popover-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
              This is a demonstration of our text compliance AI tool
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Beta access • No commitment required • Gulf enterprises priority
          </p>
        </div>
      </div>
    </section>
  )
}

export default TestingSection
