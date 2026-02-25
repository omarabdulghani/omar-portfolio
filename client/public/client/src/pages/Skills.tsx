import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Megaphone, Search, Award, Users, Briefcase, Globe, Bot } from "lucide-react";

export default function Skills() {
  const skillCategories = [
    {
      title: "UX/UI & Product Design",
      icon: <Palette className="w-6 h-6 text-primary" />,
      skills: [
        "UX/UI Design",
        "User Flows & Information Architecture",
        "Wireframing & Interactive Prototyping",
        "Design Systems & Visual Consistency",
        "Responsive Interface Design",
        "Accessibility-Aware Design Decisions"
      ],
      tools: ["Figma", "Adobe XD", "Framer", "Miro", "Canva", "Adobe Photoshop", "Adobe Illustrator"]
    },
    {
      title: "Digital Marketing & Growth",
      icon: <Megaphone className="w-6 h-6 text-primary" />,
      skills: [
        "Digital Marketing Strategy & Planning",
        "SEO (Technical & On-Page)",
        "Social Media Marketing",
        "Content Strategy & Campaign Messaging",
        "Brand Storytelling",
        "Brand Activation & Experiential Concepts",
        "Conversion Optimization",
        "Performance Tracking & Reporting"
      ],
      tools: [
        "Google Analytics 4",
        "Adobe Analytics",
        "Google Ads",
        "Meta Ads Manager",
        "Google Search Console",
        "SEMrush",
        "Hotjar",
        "WordPress",
        "GTmetrix"
      ]
    },
    {
      title: "Research & Strategy",
      icon: <Search className="w-6 h-6 text-primary" />,
      skills: [
        "User Interviews & Survey Design",
        "Qualitative & Quantitative Analysis",
        "Market & Competitor Research",
        "Persona, Journey & Empathy Mapping",
        "Value Creation & Positioning Strategy",
        "Evidence-Based Decision Making"
      ],
      tools: ["Google Forms", "Typeform", "Miro", "Excel (Advanced)", "Tableau"]
    },
    {
      title: "Business, Planning & Delivery",
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      skills: [
        "Concept Creation (Ideas to Experiences)",
        "Project & Stakeholder Management",
        "Client Briefing & Debriefing",
        "Cross-Functional Collaboration",
        "Export & Market Entry Planning",
        "Financial Planning & Budget Structuring",
        "KPI & SMART Goal Frameworks",
        "Client-Facing Presentation & Documentation",
        "HTML & CSS Fundamentals",
        "SQL Fundamentals"
      ],
      tools: ["Asana", "Jira", "Notion", "Trello", "Slack", "Microsoft Office", "VS Code"]
    },
    {
      title: "AI-Assisted Creation & Vibe Coding",
      icon: <Bot className="w-6 h-6 text-primary" />,
      skills: [
        "Vibe Coding",
        "AI-Assisted Website/App Prototyping",
        "Rapid Iteration from Idea to MVP",
        "Prompt-Driven Development Workflows",
        "Creative Experimentation with AI Tools"
      ],
      tools: ["Cursor", "OpenAI Codex", "Claude Code", "Vercel", "Aura", "Unity (Prototype Exploration)"]
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
            A practical blend of UX/UI design, strategic research, and digital marketing execution built through real client projects across branding, product concepts, and growth optimization.
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">Certifications</h2>
              </div>
              <div className="space-y-3">
                {[
                  "Google Analytics 4 Certificate",
                  "Google Fundamentals of Digital Marketing",
                  "StartUP Campus - Entrepreneurship",
                  "IELTS (English Language Testing)",
                  "Dutch Language Certificate (B1-B2)"
                ].map((certificate) => (
                  <div key={certificate} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="font-medium">{certificate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">Languages</h2>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Arabic", level: "Native" },
                  { name: "English", level: "Professional" },
                  { name: "Dutch", level: "B1-B2" }
                ].map((language) => (
                  <div key={language.name} className="p-4 rounded-xl bg-card border border-white/5">
                    <h3 className="font-bold">{language.name}</h3>
                    <p className="text-sm text-muted-foreground">{language.level}</p>
                  </div>
                ))}
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
                  "Cross-Cultural Collaboration",
                  "Stakeholder Management",
                  "Teaching & Knowledge Transfer",
                  "Adaptability",
                  "Ownership & Proactive Execution"
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
