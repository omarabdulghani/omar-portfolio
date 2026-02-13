import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Github, Play } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect } from "react";
import NotFound from "./NotFound";

// This would typically come from a data file or API
const projectsData: Record<string, any> = {
  "moes-tuinen": {
    title: "MOES Tuinen",
    subtitle: "Brand Activation & Community Engagement",
    year: "2025",
    client: "MOES Tuinen",
    role: "Creative Strategist",
    description: "A comprehensive brand activation campaign including pop-up stands, social media strategy, and digital marketing planning.",
    challenge: "MOES Tuinen needed to increase local awareness and engage the community with their urban gardening initiative. The challenge was to create a physical and digital presence that felt authentic and inviting.",
    solution: "We designed a pop-up stand activation coupled with a 'grow kit' giveaway to create tangible touchpoints. This was supported by a targeted social media strategy and a long-term digital marketing plan to sustain growth.",
    impact: "The campaign successfully increased local engagement, with the pop-up stand attracting hundreds of visitors and the social media channels seeing a significant boost in followers and interaction.",
    tags: ["Brand Activation", "Social Media", "Digital Marketing", "Event Design"],
    tools: ["Adobe Illustrator", "Canva", "Meta Business Suite"],
    image: "/images/project-moes-tuinen.jpg",
    gallery: [
      "/images/gallery-moes-1.jpg",
      "/images/gallery-moes-2.jpg"
    ]
  },
  "amstelhof-connect": {
    title: "Amstelhof Connect",
    subtitle: "Internal Staff App",
    year: "2025",
    client: "Amstelhof Sport & Health Club",
    role: "UX/UI Designer",
    description: "Internal staff application designed to streamline operations and enhance employee engagement through AI-powered features.",
    challenge: "Internal communication at the health club was fragmented, leading to operational inefficiencies and a lack of connection among staff members.",
    solution: "I designed a centralized mobile app featuring task management, AI-powered communication tools, and member interaction tracking. The interface was designed to be intuitive for staff of all technical skill levels.",
    impact: "The prototype demonstrated a clear path to reducing administrative time by 20% and improving staff response times to member needs.",
    tags: ["UX/UI Design", "App Concept", "Process Optimization", "Figma"],
    tools: ["Figma", "Miro", "User Testing"],
    image: "/images/project-amstelhof-connect.jpg",
    gallery: [
      "/images/gallery-amstelhof-1.jpg",
      "/images/gallery-amstelhof-2.jpg"
    ]
  },
  "patronapp": {
    title: "PatronApp",
    subtitle: "Concert Experience App",
    year: "2024",
    client: "Patronaat",
    role: "Product Designer",
    description: "Concert experience app enhancing the connection between visitors and the venue through personalized recommendations.",
    challenge: "Concert-goers often miss out on events they'd love due to poor discovery mechanisms, and the in-venue experience lacked digital engagement.",
    solution: "PatronApp offers personalized event recommendations based on listening habits, interactive venue maps, and community features that connect fans before the show.",
    impact: "The concept received high praise for its user-centric approach and potential to increase ticket sales through better discovery.",
    tags: ["UX Research", "Prototyping", "User Strategy", "Mobile App"],
    tools: ["Figma", "Adobe XD", "After Effects"],
    image: "/images/project-patronapp.jpg",
    gallery: [
      "/images/gallery-patronapp-1.jpg",
      "/images/gallery-patronapp-2.jpg"
    ]
  },
  "hallencity": {
    title: "HallenCity+",
    subtitle: "Cinema Experience App Concept",
    year: "2024",
    client: "De FilmHallen",
    role: "UX/UI Designer",
    description: "Reimagining the cinema experience through online ticketing, snack ordering, and social features.",
    challenge: "Visitors experienced fragmented touchpoints across ticketing, concessions, and in-venue engagement. The challenge was to create one cohesive digital journey.",
    solution: "I designed an app concept that combines seamless ticket booking, pre-ordering snacks, and social discovery features to improve convenience and engagement.",
    impact: "The concept demonstrated how a unified app can streamline the cinema journey and increase user interaction before and during visits.",
    tags: ["App Concept", "UX/UI Design", "Service Design", "Community Building"],
    tools: ["Figma", "User Flows", "Wireframing"],
    image: "/images/hallen-city-app.png",
    gallery: []
  },
  "pro-detailing": {
    title: "Pro Detailing",
    subtitle: "Digital Marketing & Website Strategy",
    year: "2024",
    client: "Pro Detailing",
    role: "Digital Marketing Strategist",
    description: "Digital marketing strategy and website redesign for local visibility and customer engagement.",
    challenge: "The business had limited online visibility and an inconsistent customer journey across search and website touchpoints.",
    solution: "I created a focused local marketing strategy combining SEO improvements, content updates, and a clearer website structure optimized for conversion.",
    impact: "The project established a stronger digital presence and a more streamlined path from search discovery to customer inquiry.",
    tags: ["Web Design", "SEO", "Local Marketing", "Conversion Strategy"],
    tools: ["Google Analytics", "SEO Tools", "Content Planning"],
    image: "/images/pro-detaling-project.jpg",
    gallery: []
  },
  "pphe-hotel": {
    title: "PPHE Hotel Group",
    subtitle: "Website UX/UI Optimization",
    year: "2024",
    client: "PPHE Hotel Group",
    role: "UX/UI Designer",
    description: "Improved UI/UX of multiple website pages across hotel brands to enhance usability and conversion flow.",
    challenge: "Multiple brand pages had friction in navigation and booking-related flows, impacting user clarity and conversion potential.",
    solution: "I redesigned key page structures, improved information hierarchy, and streamlined interaction patterns to support clearer decision-making.",
    impact: "The redesign direction created a more intuitive browsing experience and a stronger foundation for conversion-focused optimization.",
    tags: ["UX/UI Design", "Web Design", "Conversion Optimization", "Analytics"],
    tools: ["Figma", "Analytics Review", "UX Audit"],
    image: "/images/pphe-project.jpg",
    gallery: []
  }
};

export default function ProjectDetail() {
  const [match, params] = useRoute("/portfolio/:id");
  const projectId = params?.id;
  const project = projectId ? projectsData[projectId] : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!match || !project) {
    return <NotFound />;
  }

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={project.image} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 container flex flex-col justify-end pb-16">
          <Link href="/portfolio">
            <a className="inline-flex items-center text-white/80 hover:text-primary mb-6 transition-colors">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Portfolio
            </a>
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            {project.tags.map((tag: string) => (
              <Badge key={tag} className="bg-white/90 text-black hover:bg-white border-transparent">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
            {project.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            {project.subtitle}
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">The Challenge</h3>
                <p className="text-muted-foreground">
                  {project.challenge}
                </p>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">The Solution</h3>
                <p className="text-muted-foreground">
                  {project.solution}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Impact & Results</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">Project Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.gallery.map((img: string, index: number) => (
                    <div key={index} className="rounded-xl overflow-hidden border border-white/10 aspect-video">
                      <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-card border border-white/10 rounded-xl p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Client</h3>
                <p className="text-lg font-bold">{project.client}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Year</h3>
                <p className="text-lg font-bold">{project.year}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">My Role</h3>
                <p className="text-lg font-bold">{project.role}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool: string) => (
                    <span key={tool} className="text-sm border border-white/10 px-2 py-1 rounded bg-secondary/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <Button className="w-full gap-2">
                  <ExternalLink size={18} /> View Live Project
                </Button>
                <Button variant="outline" className="w-full gap-2">
                  <Play size={18} /> Watch Demo Video
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
