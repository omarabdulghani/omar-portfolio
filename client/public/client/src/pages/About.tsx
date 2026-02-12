import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, GraduationCap, Briefcase, Globe } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl opacity-50" />
                <img 
                  src="/images/CV%20Resume.png" 
                  alt="Omar Abdulghani" 
                  className="relative rounded-2xl border border-white/10 shadow-2xl w-full max-w-md mx-auto lg:mx-0"
                />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                About Me
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold">
                Bridging Creativity & <span className="text-primary">Business Strategy</span>
              </h1>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  I am a graduate in <strong className="text-foreground">International Creative Business</strong> from InHolland University of Applied Sciences, with a minor in <strong className="text-foreground">Digital Marketing</strong>.
                </p>
                <p>
                  My background bridges UX/UI design, branding, digital marketing, and content creation. I don't just design; I transform research and strategy into meaningful user experiences that drive results.
                </p>
                <p>
                  Throughout my studies, I've collaborated with real organizations such as <span className="text-foreground">Patronaat</span>, <span className="text-foreground">Amstelhof</span>, and <span className="text-foreground">De FilmHallen</span>, delivering creative solutions that blend design thinking with measurable business impact.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="gap-2 rounded-full">
                  <Download size={18} /> Download CV (English)
                </Button>
                <Button variant="outline" className="gap-2 rounded-full">
                  <Download size={18} /> Download CV (Dutch)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Education & Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">International Creative Business</h4>
                    <Badge variant="secondary">2021 - 2025</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">InHolland University of Applied Sciences</p>
                  <p className="text-muted-foreground text-sm">
                    Focus on creative leadership, media management, and business innovation.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Digital Marketing Minor</h4>
                    <Badge variant="secondary">Minor</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Rotterdam Business University</p>
                  <p className="text-muted-foreground text-sm">
                    Specialized in SEO, SEA, content strategy, and data analytics.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Practical Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold">Practical Experience</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors h-full">
                <CardContent className="p-6 space-y-4">
                  <p className="text-muted-foreground">
                    Unlike traditional programs, my education was rooted in real-world application from day one.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">Worked with real companies and organizations throughout the degree.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">Delivered actual client projects, campaigns, and strategic proposals.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="text-sm">Gained hands-on professional experience, functioning in real professional roles.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-white/5 text-muted-foreground text-sm font-medium mb-6">
            <Globe size={14} /> Global Mindset
          </div>
          <h2 className="text-3xl font-heading font-bold mb-12">Languages & Communication</h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                EN
              </div>
              <div>
                <h3 className="font-bold">English</h3>
                <p className="text-sm text-muted-foreground">Professional Proficiency</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                NL
              </div>
              <div>
                <h3 className="font-bold">Dutch</h3>
                <p className="text-sm text-muted-foreground">Professional Proficiency</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
