import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, Play } from "lucide-react";
import { Link, useLocation, useRoute } from "wouter";
import { useEffect, useRef } from "react";
import ProjectGallery, {
  type ProjectGalleryHandle,
  type ProjectGalleryMedia,
} from "@/components/ProjectGallery";
import DeviceMockup from "@/components/DeviceMockup";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
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
      iframeSrc: "https://xd.adobe.com/embed/439405d9-a8db-4f25-9593-524b00c3079e-16c7/",
      iframeTitle: "PatronApp Adobe XD prototype",
      showArrows: false,
      deferIframeUntilPlay: true,
      backClosesPrototype: true,
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
    subtitle: "Inclusive Cinema Experience App Concept",
    year: "2024",
    client: "De FilmHallen",
    clientLogo: "/images/hallencity gallery/logo-De-Filmhallen (light mode).png",
    clientLogoDark: "/images/hallencity gallery/logo-De-Filmhallen (dark mode).png",
    clientLogoClass: "h-24",
    clientWebsite: "https://filmhallen.nl/",
    role: "Research & Concept Lead (Internal/External Analysis, Ideation, Adobe XD UX/UI Design)",
    primaryActionLabel: "View Adobe XD Prototype",
    primaryActionHref: "https://xd.adobe.com/view/29c63204-8788-48d1-b055-25073fbd86ba-7c95/",
    description: "HallenCity+ was developed in a team project for De FilmHallen as an all-in-one cinema app concept designed to be inclusive for everyone. I was responsible for the internal and external research, ideation process, and the app concept design in Adobe XD.",
    challenge: "The cinema journey was fragmented across ticketing, snacks, venue information, and engagement touchpoints. Research showed users wanted a smoother end-to-end experience with better convenience, comfort, and accessible interactions while keeping the cinema experience welcoming for all visitors.",
    solution: "We combined desk and field research methods, including stakeholder analysis, interviews, empathy mapping, persona and journey mapping, and concept testing. Based on these insights, I created HallenCity+: an app concept that unifies ticket booking, snack pre-order and pickup, activity discovery, venue navigation, and in-app incident reporting.",
    impact: "User testing validated the concept's clear layout and ease of use, while feedback helped refine features such as map coverage and point-system clarity. The project delivered a practical concept roadmap that can reduce friction, improve customer experience, and strengthen engagement before, during, and after cinema visits.",
    tags: ["App Concept", "Inclusive Design", "UX/UI Design", "Customer Journey Innovation"],
    tools: ["Adobe XD", "Interview Research", "Empathy Mapping", "Journey Mapping", "Stakeholder Analysis"],
    image: "/images/hallen-city-app.png",
    deviceMockup: {
      type: "iphone",
      mode: "interactive",
      orientation: "portrait",
      iframeSrc: "https://xd.adobe.com/embed/29c63204-8788-48d1-b055-25073fbd86ba-7c95/",
      iframeTitle: "HallenCity+ prototype",
      showArrows: false,
      deferIframeUntilPlay: true,
      backClosesPrototype: true,
      allowFullscreen: false
    },
    gallery: [
      {
        type: "image",
        src: "/images/hallen-city-app.png",
        alt: "HallenCity+ app concept visual",
        title: "HallenCity+ App Visual"
      }
    ]
  },
  "pro-detailing": {
    title: "Pro Detailing",
    subtitle: "Digital Marketing Plan, UX/UI Optimization & Conversion Strategy",
    year: "2024",
    client: "Pro Detailing",
    clientLogo: "/images/pro-detailing gallery/pro-detailing-logo (light mode).png",
    clientLogoDark: "/images/pro-detailing gallery/pro-detailing-logo (dark mode).png",
    clientWebsite: "https://www.pro-detailing.de/",
    role: "UI/UX & Conversion Lead, Internal/External Analysis, KPI & SMART Goal Planning",
    description: "Developed in a team for my Digital Marketing minor at Rotterdam Business School, this project delivered a full Digital Marketing Plan for Pro Detailing. I focused on **UI/UX improvements and conversion optimization**, while also contributing to the **internal/external analysis** and defining **SMART goals with KPIs** to guide execution.",
    challenge: "Pro Detailing had **low social engagement**, weak conversion from social channels, and a website experience that needed clearer navigation, stronger product information, and more persuasive conversion paths.",
    solution: "We built a complete strategy across the funnel: digital health check, personas, customer journey and content mapping, competitor and partner analysis, SWOT/TOWS, and channel plans. My core contribution was the **website UX/UI redesign and conversion-focused prototype work** (Adobe XD), including clearer page structure, improved product communication, and stronger CTA flow.",
    impact: "The project provided Pro Detailing with a practical roadmap covering **SEO, social media, email marketing, and web optimization**, supported by measurable targets such as growth in engagement, traffic, CTR, and repeat purchase behavior. The redesign direction created a stronger foundation for turning visits and social traffic into qualified conversions.",
    tags: ["UI/UX Optimization", "Conversion Strategy", "Digital Marketing Plan", "SEO & Social Media"],
    tools: ["Adobe XD", "Customer Journey Mapping", "SWOT/TOWS", "SMART KPI Framework", "Google Analytics"],
    image: "/images/pro-detaling-project.jpg",
    deviceMockup: {
      type: "desktop",
      mode: "interactive",
      orientation: "landscape",
      iframeSrc: "https://xd.adobe.com/embed/c1387df0-0e9c-4b18-8b55-0f7e6aea7d3f-946b/",
      iframeTitle: "Pro Detailing prototype",
      showArrows: false,
      allowFullscreen: true
    },
    gallery: [
      {
        type: "image",
        src: "/images/pro-detaling-project.jpg",
        alt: "Imrpoved UI/UX visual",
        title: "Imrpoved UI/UX visual"
      }
    ]
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
  },
  "burning-man-campaign": {
    title: "Burning Man Brand Positioning & Event Promotion",
    subtitle: "Audience Research, Event Promotion Strategy & Poster Design",
    year: "2021-2022",
    client: "Burning Man (Academic Client Case)",
    clientLogo: "/images/burningman gallery/Burning_Man_Project_Logo (light mode).png",
    clientLogoDark: "/images/burningman gallery/Burning_Man_Project_Logo (dark mode).png",
    clientLogoClass: "h-14",
    clientWebsite: "https://burningman.org/",
    role: "Researcher & Poster Designer",
    description: "This project combined **brand positioning research**, **event promotion strategy**, and **poster design** for Burning Man. Working in a team, I translated research insights into a clearer communication direction and designed visual outputs to support audience engagement.",
    challenge: "Burning Man needed sharper communication around **inclusivity, media exposure, and safety**, while still preserving its unique identity. The key challenge was turning broad brand values into **practical, audience-facing promotion assets**.",
    solution: "We conducted internal and external analysis, competitor comparison, and survey-based insight gathering. From this, we built a focused event-promotion concept and I developed the final poster direction to reflect **brand values, audience fit, and campaign clarity**.",
    impact: "The project delivered a reusable strategy-to-design workflow: from research question setup and survey analysis to creative execution. It produced concrete materials that strengthened how the event could communicate positioning and improve **awareness, consistency, and engagement**.",
    tags: ["Brand Positioning", "Audience Research", "Event Promotion", "Poster Design"],
    tools: ["Survey Research", "SWOT/PESTLE Analysis", "Competitor Analysis", "Creative Briefing", "Poster Design", "Adobe Photoshop"],
    image: "/images/burningman.jpg",
    gallery: [
      {
        type: "image",
        src: "/images/burningman gallery/Burning Man's Designed Poster.jpg",
        alt: "Burning Man designed poster",
        title: "Burning Man's Designed Poster"
      },
      {
        type: "document",
        src: "/images/burningman gallery/Brand Positioning Report.pdf",
        alt: "Brand Positioning Report",
        title: "Brand Positioning Report"
      },
      {
        type: "document",
        src: "/images/burningman gallery/Event Promotion Research.pdf",
        alt: "Event Promotion Research",
        title: "Event Promotion Research"
      },
      {
        type: "document",
        src: "/images/burningman gallery/Socially Engaged Event Research.pdf",
        alt: "Socially Engaged Event Research",
        title: "Socially Engaged Event Research"
      }
    ]
  },
  "streaming-emotions-value-plan": {
    title: "Jacob Drescher Value Creation Strategy",
    subtitle: "Music Data Analysis, Audience Insights & Growth Plan",
    year: "2022",
    client: "Jacob Drescher (.WAV Media Project)",
    clientLogo: "/images/jacobdrescher gallery/jacobdrescher logo (light mode).png",
    clientLogoDark: "/images/jacobdrescher gallery/jacobdrescher logo (dark mode).png",
    clientWebsite: "https://www.instagram.com/jacob.drescher/",
    role: "Researcher (.WAV Media)",
    description: "Developed in a team project for artist Jacob Drescher, this case focused on building a **value creation strategy** grounded in market and audience data. My contribution centered on research synthesis to shape practical growth recommendations.",
    challenge: "The artist needed a clearer path to grow visibility and engagement in a crowded music market. The challenge was turning fragmented qualitative and quantitative inputs into a **focused, actionable artist growth plan**.",
    solution: "We combined interview transcription analysis, genre and market research, audience segmentation, and value-creation planning. The final output aligned content direction, audience touchpoints, and brand communication into one coherent strategy framework.",
    impact: "The project delivered a structured roadmap for audience development and stronger artist positioning, including practical recommendations for content and engagement channels. It created a research-backed foundation for **sustainable audience growth** and more consistent brand communication.",
    tags: ["Artist Strategy", "Music Strategy", "Value Creation", "Audience Insights"],
    tools: ["Interview Analysis", "Market Research", "Audience Segmentation", "Value Proposition Design", "Strategic Planning"],
    image: "/images/jacobdrescher.jpg",
    gallery: [
      {
        type: "document",
        src: "/images/jacobdrescher gallery/Data Analysis Report (Arcando).pdf",
        alt: "Data Analysis Report (Arcando)",
        title: "Data Analysis Report (Arcando)"
      },
      {
        type: "document",
        src: "/images/jacobdrescher gallery/Value Creation Report 1.pdf",
        alt: "Value Creation Report 1",
        title: "Value Creation Report 1"
      },
      {
        type: "document",
        src: "/images/jacobdrescher gallery/Value Creation Report 2.pdf",
        alt: "Value Creation Report 2",
        title: "Value Creation Report 2"
      }
    ]
  },
  "beex-export-strategy": {
    title: "BEEX Belgium Export Strategy",
    subtitle: "Export Research, Financial Planning & Market Entry Roadmap",
    year: "2022-2023",
    client: "BEEX Branding",
    clientLogo: "/images/beex gallery/beexlogo (light mode).png",
    clientLogoDark: "/images/beex gallery/beexlogo dark mode).png",
    clientWebsite: "https://beexbranding.com/",
    role: "Financial Manager & Research Lead",
    description: "This project developed a full **export strategy** for BEEX Branding's expansion into Belgium. I led financial planning and contributed to market and organizational research to align strategic direction with operational feasibility.",
    challenge: "BEEX needed a realistic market-entry plan balancing **commercial opportunity, operational setup, and financial viability**. The team had to translate research into decisions on market approach, risk handling, and measurable objectives.",
    solution: "We produced an integrated package: export plan, export research, organizational analysis, and financial planning. My focus was building the financial foundation and supporting strategic analysis so recommendations remained data-backed and executable.",
    impact: "The outcome provided BEEX with a practical roadmap for Belgium expansion, including strategic priorities, operational considerations, and financial scenarios. It improved decision confidence by connecting **market insights, risk awareness, and budget logic** in one coherent plan.",
    tags: ["Export Strategy", "Financial Planning", "Market Research", "International Expansion"],
    tools: ["Financial Modeling", "Export Research", "SWOT/PESTLE Analysis", "Operational Planning", "SMART KPI Framing"],
    image: "/images/beex.jpg",
    gallery: [
      {
        type: "document",
        src: "/images/beex gallery/Export Research.pdf",
        alt: "Export Research",
        title: "Export Research"
      },
      {
        type: "document",
        src: "/images/beex gallery/Export Plan.pdf",
        alt: "Export Plan",
        title: "Export Plan"
      },
      {
        type: "document",
        src: "/images/beex gallery/Financial Export Plan (Excel File).xlsx",
        alt: "Financial Export Plan (Excel File)",
        title: "Financial Export Plan (Excel File)"
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
  const [, setLocation] = useLocation();
  const galleryRef = useRef<ProjectGalleryHandle>(null);
  const { messages } = useLanguage();
  const projectId = params?.id;
  const project = projectId ? projectsData[projectId] : undefined;
  const isMoesTuinen = projectId === "moes-tuinen";
  const isAmstelhofConnect = projectId === "amstelhof-connect";
  const isPatronApp = projectId === "patronapp";
  const isPpheHotel = projectId === "pphe-hotel";
  const isProDetailing = projectId === "pro-detailing";
  const isHallenCity = projectId === "hallencity";
  const isBurningManCampaign = projectId === "burning-man-campaign";
  const isStreamingEmotionsValuePlan = projectId === "streaming-emotions-value-plan";
  const isBeexExportStrategy = projectId === "beex-export-strategy";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  useEffect(() => {
    if (!projectId || !project) return;

    trackEvent("project_view", {
      project_id: projectId,
      project_title: project.title,
    });
  }, [projectId, project]);

  if (!match || !project) {
    return <NotFound />;
  }

  const localizedProject = isMoesTuinen
    ? {
        ...project,
        subtitle: messages.projectDetails.moesTuinen.subtitle,
        description: messages.projectDetails.moesTuinen.description,
        challenge: messages.projectDetails.moesTuinen.challenge,
        solution: messages.projectDetails.moesTuinen.solution,
        impact: messages.projectDetails.moesTuinen.impact,
        role: messages.projectDetails.moesTuinen.role,
        primaryActionLabel: messages.projectDetails.moesTuinen.primaryActionLabel,
        demoVideoLabel: messages.projectDetails.moesTuinen.demoVideoLabel,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Introduction Video": messages.projectDetails.moesTuinen.galleryTitles.introductionVideo,
            "Pop-up Stand Design Video": messages.projectDetails.moesTuinen.galleryTitles.popUpStandDesignVideo,
            "Meet Cansu": messages.projectDetails.moesTuinen.galleryTitles.meetCansu,
            "Meet Jasper": messages.projectDetails.moesTuinen.galleryTitles.meetJasper,
            "Meet Margret": messages.projectDetails.moesTuinen.galleryTitles.meetMargret,
            "Meet Sascha": messages.projectDetails.moesTuinen.galleryTitles.meetSascha,
            "Grow Kit Giveaway": messages.projectDetails.moesTuinen.galleryTitles.growKitGiveaway,
            "Grow Kit Giveaway Production": messages.projectDetails.moesTuinen.galleryTitles.growKitGiveawayProduction,
            "Grow Kit Contents": messages.projectDetails.moesTuinen.galleryTitles.growKitContents,
            "Pop-up Stand Design": messages.projectDetails.moesTuinen.galleryTitles.popUpStandDesign,
            "Poster Design": messages.projectDetails.moesTuinen.galleryTitles.posterDesign,
            "Deliverables, Project Timeline & Budget": messages.projectDetails.moesTuinen.galleryTitles.deliverablesTimelineBudget,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isAmstelhofConnect
    ? {
        ...project,
        subtitle: messages.projectDetails.amstelhofConnect.subtitle,
        description: messages.projectDetails.amstelhofConnect.description,
        challenge: messages.projectDetails.amstelhofConnect.challenge,
        solution: messages.projectDetails.amstelhofConnect.solution,
        impact: messages.projectDetails.amstelhofConnect.impact,
        primaryActionLabel: messages.projectDetails.amstelhofConnect.primaryActionLabel,
        demoVideoLabel: messages.projectDetails.amstelhofConnect.demoVideoLabel,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Members Center": messages.projectDetails.amstelhofConnect.galleryTitles.membersCenter,
            "Main Dashboard": messages.projectDetails.amstelhofConnect.galleryTitles.mainDashboard,
            "Amstelhof Connect End Presentation": messages.projectDetails.amstelhofConnect.galleryTitles.endPresentation,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isPatronApp
    ? {
        ...project,
        subtitle: messages.projectDetails.patronApp.subtitle,
        description: messages.projectDetails.patronApp.description,
        challenge: messages.projectDetails.patronApp.challenge,
        solution: messages.projectDetails.patronApp.solution,
        impact: messages.projectDetails.patronApp.impact,
        primaryActionLabel: messages.projectDetails.patronApp.primaryActionLabel,
        demoVideoLabel: messages.projectDetails.patronApp.demoVideoLabel,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "PatronApp Promo 1": messages.projectDetails.patronApp.galleryTitles.promo1,
            "PatronApp Promo 2": messages.projectDetails.patronApp.galleryTitles.promo2,
            "PatronApp Visual": messages.projectDetails.patronApp.galleryTitles.visual,
            "End Report - PatronApp": messages.projectDetails.patronApp.galleryTitles.endReport,
            "Debriefing Report": messages.projectDetails.patronApp.galleryTitles.debriefingReport,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isPpheHotel
    ? {
        ...project,
        subtitle: messages.projectDetails.ppheHotel.subtitle,
        description: messages.projectDetails.ppheHotel.description,
        challenge: messages.projectDetails.ppheHotel.challenge,
        solution: messages.projectDetails.ppheHotel.solution,
        impact: messages.projectDetails.ppheHotel.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Booking Panel Improvement":
              messages.projectDetails.ppheHotel.galleryTitles.bookingPanelImprovement,
            "Park Plaza M&E Panel Improvement":
              messages.projectDetails.ppheHotel.galleryTitles.parkPlazaPanelImprovement,
            "art'otel Booking Panel Mobile Improvement":
              messages.projectDetails.ppheHotel.galleryTitles.artotelBookingPanelMobileImprovement,
            "art'otel Destinations Desktop Improvement":
              messages.projectDetails.ppheHotel.galleryTitles.artotelDestinationsDesktopImprovement,
            "art'otel Destinations Mobile Improvement":
              messages.projectDetails.ppheHotel.galleryTitles.artotelDestinationsMobileImprovement,
            "Personal Development Report 1":
              messages.projectDetails.ppheHotel.galleryTitles.personalDevelopmentReport1,
            "Personal Development Report 2":
              messages.projectDetails.ppheHotel.galleryTitles.personalDevelopmentReport2,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isProDetailing
    ? {
        ...project,
        subtitle: messages.projectDetails.proDetailing.subtitle,
        description: messages.projectDetails.proDetailing.description,
        challenge: messages.projectDetails.proDetailing.challenge,
        solution: messages.projectDetails.proDetailing.solution,
        impact: messages.projectDetails.proDetailing.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Imrpoved UI/UX visual":
              messages.projectDetails.proDetailing.galleryTitles.improvedUiUxVisual,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isHallenCity
    ? {
        ...project,
        subtitle: messages.projectDetails.hallenCity.subtitle,
        description: messages.projectDetails.hallenCity.description,
        challenge: messages.projectDetails.hallenCity.challenge,
        solution: messages.projectDetails.hallenCity.solution,
        impact: messages.projectDetails.hallenCity.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "HallenCity+ App Visual":
              messages.projectDetails.hallenCity.galleryTitles.appVisual,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isBurningManCampaign
    ? {
        ...project,
        title: messages.projectDetails.burningManCampaign.title,
        subtitle: messages.projectDetails.burningManCampaign.subtitle,
        description: messages.projectDetails.burningManCampaign.description,
        challenge: messages.projectDetails.burningManCampaign.challenge,
        solution: messages.projectDetails.burningManCampaign.solution,
        impact: messages.projectDetails.burningManCampaign.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Burning Man's Designed Poster":
              messages.projectDetails.burningManCampaign.galleryTitles.designedPoster,
            "Brand Positioning Report":
              messages.projectDetails.burningManCampaign.galleryTitles.brandPositioningReport,
            "Event Promotion Research":
              messages.projectDetails.burningManCampaign.galleryTitles.eventPromotionResearch,
            "Socially Engaged Event Research":
              messages.projectDetails.burningManCampaign.galleryTitles.sociallyEngagedEventResearch,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isStreamingEmotionsValuePlan
    ? {
        ...project,
        title: messages.projectDetails.streamingEmotionsValuePlan.title,
        subtitle: messages.projectDetails.streamingEmotionsValuePlan.subtitle,
        description: messages.projectDetails.streamingEmotionsValuePlan.description,
        challenge: messages.projectDetails.streamingEmotionsValuePlan.challenge,
        solution: messages.projectDetails.streamingEmotionsValuePlan.solution,
        impact: messages.projectDetails.streamingEmotionsValuePlan.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Data Analysis Report (Arcando)":
              messages.projectDetails.streamingEmotionsValuePlan.galleryTitles.dataAnalysisReport,
            "Value Creation Report 1":
              messages.projectDetails.streamingEmotionsValuePlan.galleryTitles.valueCreationReport1,
            "Value Creation Report 2":
              messages.projectDetails.streamingEmotionsValuePlan.galleryTitles.valueCreationReport2,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : isBeexExportStrategy
    ? {
        ...project,
        title: messages.projectDetails.beexExportStrategy.title,
        subtitle: messages.projectDetails.beexExportStrategy.subtitle,
        description: messages.projectDetails.beexExportStrategy.description,
        challenge: messages.projectDetails.beexExportStrategy.challenge,
        solution: messages.projectDetails.beexExportStrategy.solution,
        impact: messages.projectDetails.beexExportStrategy.impact,
        gallery: project.gallery?.map((item: any) => {
          if (!item || typeof item === "string") return item;

          const translatedTitles: Record<string, string> = {
            "Export Research":
              messages.projectDetails.beexExportStrategy.galleryTitles.exportResearch,
            "Export Plan":
              messages.projectDetails.beexExportStrategy.galleryTitles.exportPlan,
            "Financial Export Plan (Excel File)":
              messages.projectDetails.beexExportStrategy.galleryTitles.financialExportPlan,
          };

          return {
            ...item,
            title: item.title ? translatedTitles[item.title] ?? item.title : item.title,
          };
        }),
      }
    : project;

  return (
    <Layout>
      {/* Hero Banner */}
      <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={localizedProject.image} 
          alt={localizedProject.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 container flex flex-col justify-end pb-16">
          <Link href="/portfolio">
            <a
              className="inline-flex items-center text-white/80 hover:text-primary mb-6 transition-colors"
              onClick={() => trackEvent("nav_click", { location: "project_detail_hero", destination: "/portfolio" })}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> {(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.backToPortfolio : "Back to Portfolio"}
            </a>
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            {localizedProject.tags.map((tag: string) => (
              <Badge key={tag} className="bg-white/90 text-black hover:bg-white border-transparent">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
            {localizedProject.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">
            {localizedProject.subtitle}
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="order-2 lg:order-1 lg:col-span-2 space-y-12">
            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.overview : "Overview"}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {renderWithBold(localizedProject.description)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.challenge : "The Challenge"}</h3>
                <p className="text-muted-foreground">
                  {renderWithBold(localizedProject.challenge)}
                </p>
              </div>
              <div className="bg-card/50 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-3 text-primary">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.solution : "The Solution"}</h3>
                <p className="text-muted-foreground">
                  {renderWithBold(localizedProject.solution)}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-heading font-bold mb-4">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.impactResults : "Impact & Results"}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {renderWithBold(localizedProject.impact)}
              </p>
            </div>

            {project.deviceMockup ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">
                  {(isAmstelhofConnect || isPatronApp || isProDetailing || isHallenCity)
                    ? messages.projectDetails.common.prototypePreview
                    : "Prototype Preview"}
                </h2>
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
                  screenAspectRatio={project.deviceMockup.screenAspectRatio}
                  hideNotch={project.deviceMockup.hideNotch}
                  disableEmbeddedNavigation={project.deviceMockup.disableEmbeddedNavigation}
                  interactiveHref={project.deviceMockup.interactiveHref}
                  requireInteractionToggle={project.deviceMockup.requireInteractionToggle}
                  deferIframeUntilPlay={project.deviceMockup.deferIframeUntilPlay}
                  backClosesPrototype={project.deviceMockup.backClosesPrototype}
                  showExitNav={project.deviceMockup.showExitNav}
                  onExitToPortfolio={() => {
                    trackEvent("cta_click", {
                      location: "project_prototype",
                      label: "back_to_portfolio",
                      project_id: projectId ?? null,
                    });
                    setLocation("/portfolio/");
                  }}
                />
              </div>
            ) : null}

            {/* Gallery */}
            {localizedProject.gallery && localizedProject.gallery.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-bold">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.projectGallery : "Project Gallery"}</h2>
                <ProjectGallery
                  ref={galleryRef}
                  items={localizedProject.gallery as ProjectGalleryMedia[]}
                  fallbackPoster={localizedProject.image}
                  sectionLabels={(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.gallerySections : undefined}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="bg-card border border-white/10 rounded-xl p-6 space-y-6 sticky top-24">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.client : "Client"}</h3>
                {localizedProject.clientLogos?.length ? (
                  <div className="mt-2 mb-2 min-h-[48px] flex flex-wrap items-center gap-3">
                    {localizedProject.clientLogos.map((logo: any, index: number) =>
                      logo.href ? (
                        <a
                          key={`${logo.src}-${index}`}
                          href={logo.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`Visit ${logo.alt || "client"} website`}
                          className="inline-flex items-center"
                          onClick={() => trackEvent("external_link_click", { location: "project_client", project_id: projectId ?? null })}
                        >
                          <img
                            src={logo.src}
                            alt={logo.alt || "Client logo"}
                            className={`${logo.logoClass || project.clientLogoClass || "h-10"} w-auto object-contain`}
                          />
                        </a>
                      ) : (
                        <img
                          key={`${logo.src}-${index}`}
                          src={logo.src}
                          alt={logo.alt || "Client logo"}
                          className={`${logo.logoClass || project.clientLogoClass || "h-10"} w-auto object-contain`}
                        />
                      )
                    )}
                  </div>
                ) : localizedProject.clientLogo ? (
                  <div className="mt-2 mb-2 min-h-[48px] flex items-center">
                    {localizedProject.clientWebsite ? (
                      <a
                        href={localizedProject.clientWebsite}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${localizedProject.client} website`}
                        className="inline-flex items-center"
                        onClick={() => trackEvent("external_link_click", { location: "project_client", project_id: projectId ?? null })}
                      >
                        <>
                          <img
                            src={localizedProject.clientLogo}
                            alt={`${localizedProject.client} logo`}
                            className={`${localizedProject.clientLogoClass || "h-10"} w-auto object-contain dark:hidden ${
                              localizedProject.clientLogoDark ? "" : "dark:block"
                            }`}
                          />
                          {localizedProject.clientLogoDark ? (
                            <img
                              src={localizedProject.clientLogoDark}
                              alt={`${localizedProject.client} logo`}
                              className={`hidden ${localizedProject.clientLogoClass || "h-10"} w-auto object-contain dark:block`}
                            />
                          ) : null}
                        </>
                      </a>
                    ) : (
                        <>
                          <img
                            src={localizedProject.clientLogo}
                            alt={`${localizedProject.client} logo`}
                            className={`${localizedProject.clientLogoClass || "h-10"} w-auto object-contain dark:hidden ${
                              localizedProject.clientLogoDark ? "" : "dark:block"
                            }`}
                          />
                        {localizedProject.clientLogoDark ? (
                          <img
                            src={localizedProject.clientLogoDark}
                            alt={`${localizedProject.client} logo`}
                            className={`hidden ${localizedProject.clientLogoClass || "h-10"} w-auto object-contain dark:block`}
                          />
                        ) : null}
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-lg font-bold">{localizedProject.client}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.year : "Year"}</h3>
                <p className="text-lg font-bold">{localizedProject.year}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.myRole : "My Role"}</h3>
                <p className="text-lg font-bold">{localizedProject.role}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">{(isMoesTuinen || isAmstelhofConnect || isPatronApp || isPpheHotel || isProDetailing || isHallenCity || isBurningManCampaign || isStreamingEmotionsValuePlan || isBeexExportStrategy) ? messages.projectDetails.common.toolsUsed : "Tools Used"}</h3>
                <div className="flex flex-wrap gap-2">
                  {localizedProject.tools.map((tool: string) => (
                    <span key={tool} className="text-sm border border-white/10 px-2 py-1 rounded bg-secondary/50">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {(localizedProject.primaryActionHref || localizedProject.demoVideoSrc) ? (
                <div className="pt-4 flex flex-col gap-3">
                  {localizedProject.primaryActionHref ? (
                    isPdfHref(localizedProject.primaryActionHref) ? (
                      <Button
                        className="w-full gap-2"
                        onClick={() => {
                          trackEvent("project_action_click", {
                            location: "project_detail_sidebar",
                            action: localizedProject.primaryActionLabel || "primary_action",
                            project_id: projectId ?? null,
                            type: "document",
                          });
                          galleryRef.current?.openBySrc(localizedProject.primaryActionHref, {
                            title: localizedProject.primaryActionLabel || "Project Report",
                          });
                        }}
                      >
                        <ExternalLink size={18} /> {localizedProject.primaryActionLabel || "View Live Project"}
                      </Button>
                    ) : (
                      <a
                        href={localizedProject.primaryActionHref}
                        target={localizedProject.primaryActionDownload ? undefined : "_blank"}
                        rel={localizedProject.primaryActionDownload ? undefined : "noreferrer"}
                        download={localizedProject.primaryActionDownload ? true : undefined}
                        className="block w-full"
                        onClick={() => trackEvent("project_action_click", {
                          location: "project_detail_sidebar",
                          action: localizedProject.primaryActionLabel || "primary_action",
                          project_id: projectId ?? null,
                          type: localizedProject.primaryActionDownload ? "download" : "external_link",
                        })}
                      >
                        <Button className="w-full gap-2">
                          <ExternalLink size={18} /> {localizedProject.primaryActionLabel || "View Live Project"}
                        </Button>
                      </a>
                    )
                  ) : null}

                  {localizedProject.demoVideoSrc ? (
                    <Button
                      variant="outline"
                      className="w-full gap-2"
                      onClick={() => {
                        const demoIsVideo = isVideoHref(localizedProject.demoVideoSrc);
                        trackEvent("project_action_click", {
                          location: "project_detail_sidebar",
                          action: localizedProject.demoVideoLabel || "demo_media",
                          project_id: projectId ?? null,
                          type: demoIsVideo ? "video" : "document",
                        });
                        galleryRef.current?.openBySrc(localizedProject.demoVideoSrc, {
                          alt: demoIsVideo
                            ? `${localizedProject.title} demo video`
                            : `${localizedProject.title} project report`,
                          poster: demoIsVideo ? localizedProject.demoVideoPoster : undefined,
                          title: localizedProject.demoVideoLabel || undefined,
                        });
                      }}
                    >
                      {isVideoHref(localizedProject.demoVideoSrc) ? <Play size={18} /> : <ExternalLink size={18} />}
                      {localizedProject.demoVideoLabel || "Watch Demo Video"}
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
