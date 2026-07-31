import { useLanguage } from "@/lib/i18n";

export interface ProjectMetadata {
  id: string;
  title: string;
  categoryValue: string;
  category: string;
  image: string;
  imageClassName?: string;
  description: string;
  tags: string[];
  tagValues: string[];
}

export function useProjects(): ProjectMetadata[] {
  const { messages } = useLanguage();

  return [
    {
      id: "job-scout",
      title: messages.projectDetails.jobScout?.title || "Job Scout",
      categoryValue: "software-engineering",
      category: messages.portfolio.filters.softwareEngineering,
      image: "/images/job-scout-gallery/thumbnail.png",
      description: messages.portfolio.projects.jobScout.description,
      tags: [messages.portfolio.tags.python, messages.portfolio.tags.frontendUiUx, messages.portfolio.tags.multiLlmRouting, messages.portfolio.tags.aiAssisted],
      tagValues: ["python", "frontend", "multi-llm", "ai-assisted"]
    },
    {
      id: "moonlit-firefly-bloom",
      title: messages.projectDetails.moonlit?.title || "Moonlit Firefly Bloom",
      categoryValue: "software-engineering",
      category: messages.portfolio.filters.softwareEngineering,
      image: "/images/moonlit-gallery/moonlit cover.jpg",
      description: messages.portfolio.projects.moonlit.description,
      tags: [messages.portfolio.tags.typeScript, messages.portfolio.tags.engineArchitecture, messages.portfolio.tags.aiAssisted, messages.portfolio.tags.productDesign],
      tagValues: ["typescript", "engine-architecture", "ai-assisted", "product-design"]
    },
    {
      id: "patronapp",
      title: messages.projectDetails.patronApp?.title || "PatronApp",
      categoryValue: "ux-ui-product-design",
      category: messages.portfolio.filters.uxUiProductDesign,
      image: "/images/project-patronapp.jpg",
      description: messages.portfolio.projects.patronApp.description,
      tags: [messages.portfolio.tags.uxResearch, messages.portfolio.tags.appConcept, messages.portfolio.tags.prototyping, messages.portfolio.tags.userStrategy],
      tagValues: ["ux-research", "app-concept", "prototyping", "user-strategy"]
    },
    {
      id: "amstelhof-connect",
      title: messages.projectDetails.amstelhofConnect?.title || "Amstelhof Connect",
      categoryValue: "ux-ui-product-design",
      category: messages.portfolio.filters.uxUiProductDesign,
      image: "/images/project-amstelhof-connect.jpg",
      description: messages.portfolio.projects.amstelhofConnect.description,
      tags: [messages.portfolio.tags.uxUi, messages.portfolio.tags.appConcept, messages.portfolio.tags.processOptimization],
      tagValues: ["ux-ui-design", "app-concept", "process-optimization"]
    },
    {
      id: "hallencity",
      title: messages.projectDetails.hallenCity?.title || "HallenCity+",
      categoryValue: "ux-ui-product-design",
      category: messages.portfolio.filters.uxUiProductDesign,
      image: "/images/hallen-city-app.png",
      imageClassName: "object-top scale-[1.03]",
      description: messages.portfolio.projects.hallenCity.description,
      tags: [messages.portfolio.tags.appConcept, messages.portfolio.tags.communityBuilding, messages.portfolio.tags.serviceDesign],
      tagValues: ["app-concept", "community-building", "service-design"]
    },
    {
      id: "theraneck-ecommerce",
      title: messages.projectDetails.theraNeckEcommerce?.title || "TheraNeck | E-commerce Product",
      categoryValue: "software-engineering",
      category: messages.portfolio.filters.softwareEngineering,
      image: "/images/theraneck-gallery/theraneck%20thumbnail-updated.jpg",
      description: messages.portfolio.projects.theraNeckEcommerce.description,
      tags: [
        messages.portfolio.tags.eCommerce,
        messages.portfolio.tags.productValidation,
        messages.portfolio.tags.conversionOptimization,
        messages.portfolio.tags.behaviouralAnalytics,
        messages.portfolio.tags.aiAssisted
      ],
      tagValues: ["e-commerce", "product-validation", "conversion-optimization", "behavioural-analytics", "ai-assisted"],
    },
    {
      id: "moes-tuinen",
      title: messages.projectDetails.moesTuinen?.title || "MOES Tuinen",
      categoryValue: "brand-activation",
      category: messages.portfolio.filters.brandActivation || "Brand Activation",
      image: "/images/project-moes-tuinen.jpg",
      description: messages.portfolio.projects.moesTuinen.description,
      tags: [messages.portfolio.tags.brandActivation, messages.portfolio.tags.socialMedia, messages.portfolio.tags.digitalMarketing],
      tagValues: ["brand-activation", "social-media", "digital-marketing"]
    },
    {
      id: "pphe-hotel",
      title: messages.projectDetails.ppheHotel?.title || "PPHE Hotel Group",
      categoryValue: "web-optimization-ux",
      category: messages.portfolio.filters.webOptimizationUxUi || "Web Optimization & UX/UI",
      image: "/images/pphe-project.jpg",
      description: messages.portfolio.projects.ppheHotel.description,
      tags: [messages.portfolio.tags.webDesign, messages.portfolio.tags.conversionOptimization, messages.portfolio.tags.analytics],
      tagValues: ["web-design", "conversion-optimization", "analytics"]
    },
    {
      id: "pro-detailing",
      title: messages.projectDetails.proDetailing?.title || "Pro Detailing",
      categoryValue: "digital-marketing-ecommerce",
      category: messages.portfolio.filters.digitalMarketingEcommerce,
      image: "/images/pro-detaling-project.jpg",
      description: messages.portfolio.projects.proDetailing.description,
      tags: [messages.portfolio.tags.webDesign, messages.portfolio.tags.seo, messages.portfolio.tags.localMarketing],
      tagValues: ["web-design", "seo", "local-marketing"]
    },
    {
      id: "burning-man-campaign",
      title: messages.projectDetails.burningManCampaign?.title || "Burning Man Brand Positioning",
      categoryValue: "creative-strategy-branding",
      category: messages.portfolio.filters.creativeStrategyBranding,
      image: "/images/burningman.jpg",
      description: messages.portfolio.projects.burningManCampaign.description,
      tags: [messages.portfolio.tags.audienceResearch, messages.portfolio.tags.eventPromotion, messages.portfolio.tags.posterDesign],
      tagValues: ["audience-research", "event-promotion", "poster-design"]
    },
    {
      id: "streaming-emotions-value-plan",
      title: messages.projectDetails.streamingEmotionsValuePlan?.title || "Jacob Drescher Value Plan",
      categoryValue: "creative-strategy-branding",
      category: messages.portfolio.filters.creativeStrategyBranding,
      image: "/images/jacobdrescher.jpg",
      description: messages.portfolio.projects.streamingEmotionsValuePlan.description,
      tags: [messages.portfolio.tags.musicStrategy, messages.portfolio.tags.audienceInsights, messages.portfolio.tags.valueCreation],
      tagValues: ["music-strategy", "audience-insights", "value-creation"]
    },
    {
      id: "beex-export-strategy",
      title: messages.projectDetails.beexExportStrategy?.title || "BEEX Export Strategy",
      categoryValue: "creative-strategy-branding",
      category: messages.portfolio.filters.creativeStrategyBranding,
      image: "/images/beex.jpg",
      description: messages.portfolio.projects.beexExportStrategy.description,
      tags: [messages.portfolio.tags.exportPlanning, messages.portfolio.tags.financialPlanning, messages.portfolio.tags.marketResearch],
      tagValues: ["export-planning", "financial-planning", "market-research"]
    }
  ];
}
