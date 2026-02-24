import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Link, useRoute } from "wouter";
import { useEffect, useRef } from "react";
import ProjectGallery, {
  type ProjectGalleryHandle,
  type ProjectGalleryMedia,
} from "@/components/ProjectGallery";
import DeviceMockup from "@/components/DeviceMockup";
import NotFound from "./NotFound";

// This would typically come from a data file or API
const projectsData: Record<string, any> = {
  "moes-tuinen": {
    title: "MOES Tuinen",
    subtitle: "Brand Awareness, Pop-up Activation & Social Media Strategy",
    year: "2025",
    client: "MOES Tuinen",
    clientLogo: "/images/moestuinenlogo.jpg",
    clientLogoDark: "/images/moestuinenlogo-darkmode.png",
    clientWebsite: "https://moes-tuinen.nl/",
    role: "Design-Based Researcher & Communication Designer",
    primaryActionLabel: "View Project's Report",
    primaryActionHref: "/images/moes-tuinen-report.pdf",
    primaryActionDownload: true,
    demoVideoSrc: "/images/moes-tuinen gallery/MOESTuinen-recap-video.mp4",
    demoVideoPoster: "/images/moes-tuinen gallery/MOESTuinen-recap-video-poster.jpg",
    demoVideoLabel: "Watch Demo Video",
    description: "A Design-Based Research graduation project for MOES Tuinen focused on improving brand visibility, user engagement, and community outreach in Amstelveen. The final concept combined a physical brand activation at Pure Markt with a bilingual social media strategy and ready-to-use communication assets.",
    challenge: "As MOES Tuinen expanded, **brand awareness** stayed low among **expats and internationals**. Communication on-site was also too informal, making the customer journey less clear. The key priority became a more visible and **accessible brand presence** in Amstelveen.",
    solution: "I developed a **high-impact, low-barrier activation**: a branded pop-up stand, bilingual flyers, and cherry tomato grow-kit giveaways. This was supported by a focused **social media strategy** with an introduction video and a “Meet the Gardener” mini-series to improve reach and engagement.",
    impact: "The intervention strengthened MOES Tuinen's local visibility and digital presence, especially among internationals and younger audiences. The Pure Markt activation also revealed strong volunteer ambassador potential, with members actively engaging the public. Most importantly, MOES received a replicable outreach toolkit (pop-up format, design materials, and content templates) that can be reused for future campaigns and partnerships.",
    tags: ["Brand Activation", "Community Engagement", "Bilingual Communication", "Social Media Strategy"],
    tools: ["Design-Based Research", "Survey & Interviews", "Figma", "Canva", "Meta Business Suite"],
    image: "/images/project-moes-tuinen.jpg",
    gallery: [
      {
        type: "video",
        src: "/images/moes-tuinen gallery/Introduction Video.mp4",
        alt: "Introduction video",
        title: "Introduction Video",
        poster: "/images/moes-tuinen gallery/MOESTuinen-Intro-Video-poster.jpg"
      },
      {
        type: "video",
        src: "/images/moes-tuinen gallery/Pop Up Stand Design.mp4",
        alt: "Pop-up stand design video",
        title: "Pop-up Stand Design Video",
        poster: "/images/moes-tuinen gallery/Pop Up Stand Design-poster.jpg"
      },
      {
        type: "video",
        src: "/images/moes-tuinen gallery/🌱 Meet Cansu.mp4",
        alt: "Meet Cansu video",
        title: "Meet Cansu",
        poster: "/images/moes-tuinen gallery/🌱 Meet Cansu-poster.jpg"
      },
      {
        type: "video",
        src: "/images/moes-tuinen gallery/🌿 Meet Jasper.mp4",
        alt: "Meet Jasper video",
        title: "Meet Jasper",
        poster: "/images/moes-tuinen gallery/🌿 Meet Jasper-poster.jpg"
      },
      {
        type: "video",
        src: "/images/moes-tuinen gallery/🌿 Meet Margret.mp4",
        alt: "Meet Margret video",
        title: "Meet Margret",
        poster: "/images/moes-tuinen gallery/🌿 Meet Margret-poster.jpg"
      },
      {
        type: "video",
        src: "/images/moes-tuinen gallery/🌿 Meet Sascha.mp4",
        alt: "Meet Sascha video",
        title: "Meet Sascha",
        poster: "/images/moes-tuinen gallery/🌿 Meet Sascha-poster.jpg"
      },
      {
        type: "image",
        src: "/images/moes-tuinen gallery/Grow Kit Giveaway.jpg",
        alt: "Grow kit giveaway visual",
        title: "Grow Kit Giveaway"
      },
      {
        type: "image",
        src: "/images/moes-tuinen gallery/Grow Kit Giveaway Prodcution.jpg",
        alt: "Grow kit giveaway production",
        title: "Grow Kit Giveaway Production"
      },
      {
        type: "image",
        src: "/images/moes-tuinen gallery/Grow Kit Contents - MOES Tuinen.jpg",
        alt: "Grow kit contents visual",
        title: "Grow Kit Contents"
      },
      {
        type: "image",
        src: "/images/moes-tuinen gallery/Pop Up Stand Design.png",
        alt: "Pop-up stand design visual",
        title: "Pop-up Stand Design"
      },
      {
        type: "image",
        src: "/images/moes-tuinen gallery/MOES Tuinen Poster.png",
        alt: "Poster design",
        title: "Poster Design"
      },
      {
        type: "document",
        src: "/images/moes-tuinen gallery/Deliverables,  Project Timeline & Budget.pdf",
        alt: "Deliverables timeline and budget document",
        title: "Deliverables, Project Timeline & Budget"
      }
    ]
  },
  "amstelhof-connect": {
    title: "Amstelhof Connect",
    subtitle: "Staff Operations, Personalization & Internal Communication App Concept",
    year: "2025",
    client: "Amstelhof Sport & Health Club",
    clientLogo: "/images/amstelhof-connect gallery/amstelhof-logo light mode.png",
    clientLogoDark: "/images/amstelhof-connect gallery/amstelhof-logo dark mode.png",
    clientWebsite: "https://www.amstelhof.com/",
    role: "UX/UI Designer, Researcher & Concept Strategist",
    primaryActionLabel: "View Figma Prototype",
    primaryActionHref: "https://www.figma.com/proto/wVKWBrwyRTkEJ3cJ9fuw2s/Amstelhof-Staff-App?scaling=contain",
    demoVideoLabel: "View Project's Report",
    demoVideoSrc: "/images/amstelhof-connect gallery/(Report) 16-12-24 - 628674 Omar Abdulghani -  689779 Niklas forget - UoS2 - Marketing of Value Creation_compressed.pdf",
    deviceMockup: {
      type: "ipad",
      orientation: "landscape",
      mode: "static",
      showArrows: true,
      images: [
        "/images/amstelhof-connect gallery/Amstelhof Connect images/1.png",
        "/images/amstelhof-connect gallery/Amstelhof Connect images/2.png",
        "/images/amstelhof-connect gallery/Amstelhof Connect images/3.png",
        "/images/amstelhof-connect gallery/Amstelhof Connect images/4.png",
        "/images/amstelhof-connect gallery/Amstelhof Connect images/5.png",
        "/images/amstelhof-connect gallery/Amstelhof Connect images/6.png"
      ],
    },
    description: "Amstelhof Connect is a staff-first app concept for Amstelhof Sport & Health Club, developed to centralize communication, task coordination, and member follow-up. This project was created in collaboration with my classmate Niklas Forget: I led the app concept and prototype design, while we worked together on research and early-stage ideation. The outcome combines strategic marketing goals with iterative UX development to improve internal workflows and support more personalized member experiences.",
    challenge: "Amstelhof staff worked across **fragmented tools** for communication, scheduling, and feedback, which created **operational inefficiencies** and reduced team coordination. At the same time, staff found it difficult to scale **personalized member engagement** because member insights and follow-up actions were scattered.",
    solution: "Using an **iterative, user-centered process** (interviews, survey, focus group, and usability tests), we designed a modular prototype with four core layers: an **Email Center with AI support**, a **Happiness Index & Feedback Feed**, a **Member Interaction & Follow-Up Center**, and a **Staff Center** for tasks, scheduling, messaging, and role-based permissions.",
    impact: "The concept showed strong validation from research and testing: around **500 survey responses**, with **70%** indicating personalized interactions influence loyalty, **68%** saying recognition increases consistency, and **59%** showing interest in rewards-based engagement. The final prototype created a clear roadmap to streamline staff operations and strengthen member retention through proactive, data-informed communication.",
    tags: ["UX/UI Design", "Service Design", "Internal Operations", "Member Engagement"],
    tools: ["Figma", "Interviews", "Survey Analysis", "Focus Group", "Usability Testing"],
    image: "/images/project-amstelhof-connect.jpg",
    gallery: [
      {
        type: "image",
        src: "/images/amstelhof-connect gallery/Members Center.jpg",
        alt: "Amstelhof members center screen",
        title: "Members Center"
      },
      {
        type: "image",
        src: "/images/amstelhof-connect gallery/Main Dashboard.png",
        alt: "Amstelhof main dashboard screen",
        title: "Main Dashboard"
      },
      {
        type: "document",
        src: "/images/amstelhof-connect gallery/Amstelhof Connect End Presentation.pdf",
        alt: "Amstelhof Connect end presentation",
        title: "Amstelhof Connect End Presentation"
      }
    ]
  },
  "patronapp": {
    title: "PatronApp",
    subtitle: "Chosen App Concept for Patronaat's International Audience",
    year: "2024",
    client: "Patronaat",
    clientLogo: "/images/patronapp gallery/patronaat logo.png",
    clientLogoDark: "/images/patronapp gallery/patronaat logo.png",
    clientWebsite: "https://patronaat.nl/",
    role: "Concept Lead & UX/UI Designer (Adobe XD)",
    primaryActionLabel: "View Adobe XD Prototype",
    primaryActionHref: "https://xd.adobe.com/view/42819443-3895-426f-a706-cba6af4b7fd8-17d2/",
    demoVideoSrc: "/images/patronapp gallery/PatronApp Promo 2.mp4",
    deviceMockup: {
      type: "iphone",
      orientation: "portrait",
      mode: "interactive",
      iframeSrc: "https://xd.adobe.com/embed/42819443-3895-426f-a706-cba6af4b7fd8-17d2/",
      iframeTitle: "PatronApp Adobe XD prototype",
      showArrows: false,
      allowFullscreen: false
    },
    description: "PatronApp was developed with my classmates in **ZOOTS** (Zuzanna, Omar, Oliwia, Tamara, and Susanna) for Patronaat in Haarlem. Across the three module phases - **Creation, Justification, and Production** - we proposed three concepts, and **PatronApp (my concept)** was selected by the client for further development. I led the app ideation and designed the interactive prototype in Adobe XD.",
    challenge: "Patronaat needed to improve **online communication and reach**, especially for **international visitors** who faced language and inclusion barriers. Existing communication felt too generic, while users asked for a more personal, interactive, and community-driven music venue experience.",
    solution: "I translated the concept into a fully interactive Adobe XD prototype focused on **usability, social connection, and immersion**. Core features included multilingual onboarding, agenda and ticket flow, Spotify/Apple Music-based recommendations, community matching and chat, in-venue games and rewards, and the **Patronaat+** membership layer with exclusive content and benefits.",
    impact: "PatronApp received strong feedback for its **colorful UI, clear navigation, and social features**, and was chosen by Patronaat as the concept to continue. The project delivered a practical roadmap that combined product design and marketing strategy, including launch planning, content direction, and phased implementation from demo toward full technical development.",
    tags: ["App Concept", "UX/UI Design", "Community Building", "Music Venue Innovation"],
    tools: ["Adobe XD", "User Interviews", "Survey Research", "Ideation Methods", "Prototype Testing"],
    image: "/images/project-patronapp.jpg",
    gallery: [
      {
        type: "video",
        src: "/images/patronapp gallery/PatronApp Promo 1.mp4",
        alt: "PatronApp promo video 1",
        title: "PatronApp Promo 1"
      },
      {
        type: "video",
        src: "/images/patronapp gallery/PatronApp Promo 2.mp4",
        alt: "PatronApp promo video 2",
        title: "PatronApp Promo 2"
      },
      {
        type: "image",
        src: "/images/patronapp gallery/PatronApp.jpg",
        alt: "PatronApp concept visual",
        title: "PatronApp Visual"
      },
      {
        type: "document",
        src: "/images/patronapp gallery/End Report - PatronApp.pdf",
        alt: "End report document",
        title: "End Report - PatronApp"
      },
      {
        type: "document",
        src: "/images/patronapp gallery/Debriefing Report.pdf",
        alt: "Debriefing report document",
        title: "Debriefing Report"
      }
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
    subtitle: "UX/UI, SEO & Conversion Optimization Across Hotel Websites",
    year: "2024",
    client: "PPHE Hotel Group",
    clientLogos: [
      {
        src: "/images/pphe-hotel-group gallery/pphe-logo.png",
        href: "https://www.pphe.com/",
        alt: "PPHE Hotel Group logo"
      },
      {
        src: "/images/pphe-hotel-group gallery/artotel logo.png",
        href: "https://artotel.com",
        alt: "art'otel logo"
      }
    ],
    role: "Digital Marketing Intern (UX/UI & Web Optimization)",
    description: "During my internship at PPHE Hotel Group, I worked on UX/UI and web optimization initiatives across multiple hotel and venue websites. My scope combined hands-on interface improvements with technical performance analysis, supporting both user experience quality and business conversion goals.",
    challenge: "PPHE websites faced recurring **UX friction**, including booking-flow usability issues, missing or inconsistent multilingual content, and technical performance bottlenecks. The challenge was to improve **usability, speed, and conversion potential** while maintaining brand consistency across different teams and properties.",
    solution: "I contributed through a structured optimization workflow: WordPress UX issue resolution, A/B testing hypotheses and prototypes for booking interfaces, GTmetrix-led technical SEO audits, and data analysis using Google Analytics, Google Search Console, and Google Tag Manager. I also created Figma prototypes for page improvements (including Park Plaza Moments and Tozi Events) and coordinated implementation with internal stakeholders and external development partners.",
    impact: "The work created a clearer and more scalable optimization foundation for PPHE's web ecosystem. A/B testing validated high-impact UX changes (including a fixed booking panel approach), while technical audit actions improved page performance priorities and handoff clarity. Overall, the project strengthened decision-making with data-driven insights and improved alignment between UX design, marketing, and development teams.",
    tags: ["UX/UI Design", "Technical SEO", "A/B Testing", "Conversion Optimization"],
    tools: ["Figma", "WordPress", "Google Analytics", "Google Search Console", "GTmetrix", "Asana"],
    image: "/images/pphe-project.jpg",
    gallery: [
      {
        type: "image",
        src: "/images/pphe-hotel-group gallery/project images/Booking Panel Improvement.png",
        alt: "Booking panel improvement",
        title: "Booking Panel Improvement"
      },
      {
        type: "image",
        src: "/images/pphe-hotel-group gallery/project images/Park Plaza M&E Panel Improvement.png",
        alt: "Park Plaza M&E panel improvement",
        title: "Park Plaza M&E Panel Improvement"
      },
      {
        type: "image",
        src: "/images/pphe-hotel-group gallery/project images/artotel Booking Panel Mobile Improvement.png",
        alt: "art'otel booking panel mobile improvement",
        title: "art'otel Booking Panel Mobile Improvement"
      },
      {
        type: "image",
        src: "/images/pphe-hotel-group gallery/project images/artotel Destinations Desktop Improvement.png",
        alt: "art'otel destinations desktop improvement",
        title: "art'otel Destinations Desktop Improvement"
      },
      {
        type: "image",
        src: "/images/pphe-hotel-group gallery/project images/artotel Destinations Mobile Improvement.png",
        alt: "art'otel destinations mobile improvement",
        title: "art'otel Destinations Mobile Improvement"
      },
      {
        type: "document",
        src: "/images/pphe-hotel-group gallery/Personal Development Report 1.pdf",
        alt: "Personal Development Report 1",
        title: "Personal Development Report 1"
      },
      {
        type: "document",
        src: "/images/pphe-hotel-group gallery/Personal Development Report 2.pdf",
        alt: "Personal Development Report 2",
        title: "Personal Development Report 2"
      }
    ]
  }
};

function renderWithBold(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

function isPdfHref(href?: string): boolean {
  if (!href) return false;
  return /\.pdf(\?|$)/i.test(href);
}

function isVideoHref(href?: string): boolean {
  if (!href) return false;
  return /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i.test(href);
}

export default function ProjectDetail() {
  const [match, params] = useRoute("/portfolio/:id");
  const galleryRef = useRef<ProjectGalleryHandle>(null);
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
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {renderWithBold(project.description)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">The Challenge</h3>
                <p className="text-muted-foreground">
                  {renderWithBold(project.challenge)}
                </p>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">The Solution</h3>
                <p className="text-muted-foreground">
                  {renderWithBold(project.solution)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">Impact & Results</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {renderWithBold(project.impact)}
              </p>
            </div>

            {project.deviceMockup ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">Prototype Preview</h2>
                <DeviceMockup
                  type={project.deviceMockup.type}
                  mode={project.deviceMockup.mode}
                  orientation={project.deviceMockup.orientation}
                  images={project.deviceMockup.images}
                  iframeSrc={project.deviceMockup.iframeSrc}
                  iframeTitle={project.deviceMockup.iframeTitle}
                  showArrows={project.deviceMockup.showArrows}
                  allowFullscreen={project.deviceMockup.allowFullscreen}
                  enableTilt={project.deviceMockup.enableTilt}
                  imageFit={project.deviceMockup.imageFit}
                />
              </div>
            ) : null}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">Project Gallery</h2>
                <ProjectGallery
                  ref={galleryRef}
                  items={project.gallery as ProjectGalleryMedia[]}
                  fallbackPoster={project.image}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-card border border-white/10 rounded-xl p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">Client</h3>
                {project.clientLogos?.length ? (
                  <div className="mt-2 mb-2 min-h-[48px] flex flex-wrap items-center gap-3">
                    {project.clientLogos.map((logo: any, index: number) =>
                      logo.href ? (
                        <a
                          key={`${logo.src}-${index}`}
                          href={logo.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${logo.alt || "client"} website`}
                          className="inline-flex items-center"
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt || "Client logo"}
                            className="h-10 w-auto object-contain"
                          />
                        </a>
                      ) : (
                        <img
                          key={`${logo.src}-${index}`}
                          src={logo.src}
                          alt={logo.alt || "Client logo"}
                          className="h-10 w-auto object-contain"
                        />
                      )
                    )}
                  </div>
                ) : project.clientLogo ? (
                  <div className="mt-2 mb-2 min-h-[48px] flex items-center">
                    {project.clientWebsite ? (
                      <a
                        href={project.clientWebsite}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${project.client} website`}
                        className="inline-flex items-center"
                      >
                        <>
                          <img
                            src={project.clientLogo}
                            alt={`${project.client} logo`}
                            className={`h-10 w-auto object-contain dark:hidden ${
                              project.clientLogoDark ? "" : "dark:block"
                            }`}
                          />
                          {project.clientLogoDark ? (
                            <img
                              src={project.clientLogoDark}
                              alt={`${project.client} logo`}
                              className="hidden h-10 w-auto object-contain dark:block"
                            />
                          ) : null}
                        </>
                      </a>
                    ) : (
                      <>
                        <img
                          src={project.clientLogo}
                          alt={`${project.client} logo`}
                          className={`h-10 w-auto object-contain dark:hidden ${
                            project.clientLogoDark ? "" : "dark:block"
                          }`}
                        />
                        {project.clientLogoDark ? (
                          <img
                            src={project.clientLogoDark}
                            alt={`${project.client} logo`}
                            className="hidden h-10 w-auto object-contain dark:block"
                          />
                        ) : null}
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-lg font-bold">{project.client}</p>
                )}
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

              {(project.primaryActionHref || project.demoVideoSrc) ? (
                <div className="pt-4 flex flex-col gap-3">
                  {project.primaryActionHref ? (
                    isPdfHref(project.primaryActionHref) ? (
                      <Button
                        className="w-full gap-2"
                        onClick={() => {
                          galleryRef.current?.openBySrc(project.primaryActionHref, {
                            title: project.primaryActionLabel || "Project Report",
                          });
                        }}
                      >
                        <ExternalLink size={18} /> {project.primaryActionLabel || "View Live Project"}
                      </Button>
                    ) : (
                      <a
                        href={project.primaryActionHref}
                        target={project.primaryActionDownload ? undefined : "_blank"}
                        rel={project.primaryActionDownload ? undefined : "noreferrer"}
                        download={project.primaryActionDownload ? true : undefined}
                        className="block w-full"
                      >
                        <Button className="w-full gap-2">
                          <ExternalLink size={18} /> {project.primaryActionLabel || "View Live Project"}
                        </Button>
                      </a>
                    )
                  ) : null}

                  {project.demoVideoSrc ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        const demoIsVideo = isVideoHref(project.demoVideoSrc);
                        galleryRef.current?.openBySrc(project.demoVideoSrc, {
                          alt: demoIsVideo
                            ? `${project.title} demo video`
                            : `${project.title} project report`,
                          poster: demoIsVideo ? project.demoVideoPoster : undefined,
                          title: project.demoVideoLabel || undefined,
                        });
                      }}
                    >
                      {isVideoHref(project.demoVideoSrc) ? <Play size={18} /> : <ExternalLink size={18} />}
                      {project.demoVideoLabel || "Watch Demo Video"}
                    </Button>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
