import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { useState } from "react";
import { useProjects } from "@/hooks/useProjects";

export default function Portfolio() {
  const { messages } = useLanguage();
  const [filter, setFilter] = useState("all");

  const categories = [
    { value: "all", label: messages.portfolio.filters.all },
    { value: "software-engineering", label: messages.portfolio.filters.softwareEngineering },
    { value: "ux-ui-product-design", label: messages.portfolio.filters.uxUiProductDesign },
    { value: "digital-marketing-ecommerce", label: messages.portfolio.filters.digitalMarketingEcommerce },
    { value: "creative-strategy-branding", label: messages.portfolio.filters.creativeStrategyBranding }
  ];

  const projects = useProjects();

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
