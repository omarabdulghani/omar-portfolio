import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "UX/UI Design", "Brand Activation", "Digital Marketing", "App Design"];

  const projects = [
    {
      id: "moes-tuinen",
      title: "MOES Tuinen",
      category: "Brand Activation",
      image: "/images/project-moes-tuinen.jpg",
      description: "A comprehensive brand activation campaign including pop-up stands, social media strategy, and digital marketing planning.",
      tags: ["Brand Activation", "Social Media", "Digital Marketing"]
    },
    {
      id: "amstelhof-connect",
      title: "Amstelhof Connect",
      category: "App Design",
      image: "/images/project-amstelhof-connect.jpg",
      description: "Internal staff application designed to streamline operations and enhance employee engagement through AI-powered features.",
      tags: ["UX/UI Design", "App Concept", "Process Optimization"]
    },
    {
      id: "patronapp",
      title: "PatronApp",
      category: "UX/UI Design",
      image: "/images/project-patronapp.jpg",
      description: "Concert experience app enhancing the connection between visitors and the venue through personalized recommendations.",
      tags: ["UX Research", "Prototyping", "User Strategy"]
    },
    {
      id: "pphe-hotel",
      title: "PPHE Hotel Group",
      category: "UX/UI Design",
      image: "/images/pphe-project.jpg",
      description: "Improved UI/UX of multiple website pages across hotel brands to enhance usability and conversion flow.",
      tags: ["Web Design", "Conversion Optimization", "Analytics"]
    },
    {
      id: "pro-detailing",
      title: "Pro Detailing",
      category: "Digital Marketing",
      image: "/images/pro-detaling-project.jpg",
      description: "Digital marketing strategy and website redesign for local visibility and customer engagement.",
      tags: ["Web Design", "SEO", "Local Marketing"]
    },
    {
      id: "hallencity",
      title: "HallenCity+",
      category: "App Design",
      image: "/images/hallen-city-app.png",
      imageClassName: "object-top scale-[1.03]",
      description: "Reimagining the cinema experience through online ticketing, snack ordering, and social features.",
      tags: ["App Concept", "Community Building", "Service Design"]
    }
  ];

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter || project.tags.includes(filter));

  return (
    <Layout>
      <section className="py-20 relative">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Selected <span className="text-primary">Works</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A collection of projects where I've applied design thinking, strategic marketing, and creative problem-solving.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={filter === cat ? "default" : "outline"}
                onClick={() => setFilter(cat)}
                className="rounded-full"
              >
                {cat}
              </Button>
            ))}
          </div>

          {/* Project Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
              />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
