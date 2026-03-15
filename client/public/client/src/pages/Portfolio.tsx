import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";

export default function Portfolio() {
  const { messages } = useLanguage();
  const [filter, setFilter] = useState("all");

  const categories = [
    { value: "all", label: messages.portfolio.filters.all },
    { value: "ux-ui-design", label: messages.portfolio.filters.uxUiDesign },
    { value: "brand-activation", label: messages.portfolio.filters.brandActivation },
    { value: "digital-marketing", label: messages.portfolio.filters.digitalMarketing },
    { value: "app-design", label: messages.portfolio.filters.appDesign },
    { value: "brand-positioning", label: messages.portfolio.filters.brandPositioning },
    { value: "artist-strategy", label: messages.portfolio.filters.artistStrategy },
    { value: "export-strategy", label: messages.portfolio.filters.exportStrategy },
    { value: "event-promotion", label: messages.portfolio.filters.eventPromotion },
    { value: "poster-design", label: messages.portfolio.filters.posterDesign },
    { value: "music-strategy", label: messages.portfolio.filters.musicStrategy },
    { value: "value-creation", label: messages.portfolio.filters.valueCreation },
    { value: "financial-planning", label: messages.portfolio.filters.financialPlanning },
    { value: "market-research", label: messages.portfolio.filters.marketResearch }
  ];

  const projects = [
    {
      id: "moes-tuinen",
      title: "MOES Tuinen",
      categoryValue: "brand-activation",
      category: messages.portfolio.filters.brandActivation,
      image: "/images/project-moes-tuinen.jpg",
      description: messages.portfolio.projects.moesTuinen.description,
      tags: [messages.portfolio.tags.brandActivation, messages.portfolio.tags.socialMedia, messages.portfolio.tags.digitalMarketing],
      tagValues: ["brand-activation", "social-media", "digital-marketing"]
    },
    {
      id: "amstelhof-connect",
      title: "Amstelhof Connect",
      categoryValue: "app-design",
      category: messages.portfolio.filters.appDesign,
      image: "/images/project-amstelhof-connect.jpg",
      description: messages.portfolio.projects.amstelhofConnect.description,
      tags: [messages.portfolio.filters.uxUiDesign, messages.portfolio.tags.appConcept, messages.portfolio.tags.processOptimization],
      tagValues: ["ux-ui-design", "app-concept", "process-optimization"]
    },
    {
      id: "patronapp",
      title: "PatronApp",
      categoryValue: "ux-ui-design",
      category: messages.portfolio.filters.uxUiDesign,
      image: "/images/project-patronapp.jpg",
      description: messages.portfolio.projects.patronApp.description,
      tags: [messages.portfolio.tags.uxResearch, messages.portfolio.tags.prototyping, messages.portfolio.tags.userStrategy],
      tagValues: ["ux-research", "prototyping", "user-strategy"]
    },
    {
      id: "pphe-hotel",
      title: "PPHE Hotel Group",
      categoryValue: "ux-ui-design",
      category: messages.portfolio.filters.uxUiDesign,
      image: "/images/pphe-project.jpg",
      description: messages.portfolio.projects.ppheHotel.description,
      tags: [messages.portfolio.tags.webDesign, messages.portfolio.tags.conversionOptimization, messages.portfolio.tags.analytics],
      tagValues: ["web-design", "conversion-optimization", "analytics"]
    },
    {
      id: "pro-detailing",
      title: "Pro Detailing",
      categoryValue: "digital-marketing",
      category: messages.portfolio.filters.digitalMarketing,
      image: "/images/pro-detaling-project.jpg",
      description: messages.portfolio.projects.proDetailing.description,
      tags: [messages.portfolio.tags.webDesign, messages.portfolio.tags.seo, messages.portfolio.tags.localMarketing],
      tagValues: ["web-design", "seo", "local-marketing"]
    },
    {
      id: "hallencity",
      title: "HallenCity+",
      categoryValue: "app-design",
      category: messages.portfolio.filters.appDesign,
      image: "/images/hallen-city-app.png",
      imageClassName: "object-top scale-[1.03]",
      description: messages.portfolio.projects.hallenCity.description,
      tags: [messages.portfolio.tags.appConcept, messages.portfolio.tags.communityBuilding, messages.portfolio.tags.serviceDesign],
      tagValues: ["app-concept", "community-building", "service-design"]
    },
    {
      id: "burning-man-campaign",
      title: "Burning Man Brand Positioning",
      categoryValue: "brand-positioning",
      category: messages.portfolio.filters.brandPositioning,
      image: "/images/burningman.jpg",
      description: messages.portfolio.projects.burningManCampaign.description,
      tags: [messages.portfolio.tags.audienceResearch, messages.portfolio.tags.eventPromotion, messages.portfolio.tags.posterDesign],
      tagValues: ["audience-research", "event-promotion", "poster-design"]
    },
    {
      id: "streaming-emotions-value-plan",
      title: "Jacob Drescher Value Plan",
      categoryValue: "artist-strategy",
      category: messages.portfolio.filters.artistStrategy,
      image: "/images/jacobdrescher.jpg",
      description: messages.portfolio.projects.streamingEmotionsValuePlan.description,
      tags: [messages.portfolio.tags.musicStrategy, messages.portfolio.tags.audienceInsights, messages.portfolio.tags.valueCreation],
      tagValues: ["music-strategy", "audience-insights", "value-creation"]
    },
    {
      id: "beex-export-strategy",
      title: "BEEX Export Strategy",
      categoryValue: "export-strategy",
      category: messages.portfolio.filters.exportStrategy,
      image: "/images/beex.jpg",
      description: messages.portfolio.projects.beexExportStrategy.description,
      tags: [messages.portfolio.tags.exportPlanning, messages.portfolio.tags.financialPlanning, messages.portfolio.tags.marketResearch],
      tagValues: ["export-planning", "financial-planning", "market-research"]
    }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.categoryValue === filter || project.tagValues.includes(filter));

  return (
    <Layout>
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              {messages.portfolio.hero.titlePrefix} <span className="text-primary">{messages.portfolio.hero.titleHighlight}</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              {messages.portfolio.hero.description}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={filter === cat.value ? "default" : "outline"}
                onClick={() => {
                  if (filter !== cat.value) {
                    trackEvent("portfolio_filter_select", { filter: cat.value });
                  }
                  setFilter(cat.value);
                }}
                className="rounded-full"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                analyticsContext="portfolio_grid"
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
