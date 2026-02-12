import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Megaphone, Code, Search, Award, Users } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Design & Creative",
      icon: <Palette className="w-6 h-6 text-primary" />,
      skills: [
        "UX/UI Design",
        "Branding & Visual Identity",
        "Graphic Design",
        "Web & App Prototyping",
        "Video Editing & Motion Graphics",
        "Visual Storytelling"
      ],
      tools: ["Figma", "Framer", "Adobe XD", "Photoshop", "Illustrator", "Premiere Pro"]
    },
    {
      title: "Marketing & Content",
      icon: <Megaphone className="w-6 h-6 text-primary" />,
      skills: [
        "Digital Marketing Strategy",
        "Content Creation & Copywriting",
        "Social Media Marketing",
        "SEO, Analytics & Optimization",
        "Email & Performance Marketing",
        "Brand Positioning"
      ],
      tools: ["Google Analytics", "Meta Ads", "Mailchimp", "Hootsuite", "SEMrush"]
    },
    {
      title: "Research & Strategy",
      icon: <Search className="w-6 h-6 text-primary" />,
      skills: [
        "User Research & Testing",
        "Market & Trend Analysis",
        "Consumer Insights",
        "Behavior Mapping",
        "Creative Consulting",
        "Data-Driven Decision Making"
      ],
      tools: ["Miro", "Hotjar", "Typeform", "Google Trends"]
    },
    {
      title: "Technical & Management",
      icon: <Code className="w-6 h-6 text-primary" />,
      skills: [
        "Project & Business Management",
        "Cross-Team Collaboration",
        "HTML & CSS Fundamentals",
        "SQL Fundamentals",
        "Agile Methodologies",
        "Client Relations"
      ],
      tools: ["Notion", "Trello", "Jira", "Slack", "VS Code"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-10 mix-blend-overlay" />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Skills & <span className="text-primary">Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Through creative and strategic approaches, I help businesses grow by combining design thinking with data-driven marketing.
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="bg-card/50 border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl font-heading">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Core Competencies</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-primary/20 transition-colors py-1.5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Tools & Platforms</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span key={tool} className="text-sm text-muted-foreground border border-white/10 px-3 py-1 rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Soft Skills */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">Certifications</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Google Digital Marketing</h3>
                    <p className="text-sm text-muted-foreground">Certified Professional</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-white/5">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Google_Analytics_logo_icon.svg/1024px-Google_Analytics_logo_icon.svg.png" alt="GA4" className="w-8 h-8" />
                  <div>
                    <h3 className="font-bold">Google Analytics (GA4)</h3>
                    <p className="text-sm text-muted-foreground">Advanced Certification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">Soft Skills</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Creative Problem-Solving",
                  "Strategic Thinking",
                  "Communication",
                  "Adaptability",
                  "Teamwork",
                  "Proactive Mindset"
                ].map((skill) => (
                  <div key={skill} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
