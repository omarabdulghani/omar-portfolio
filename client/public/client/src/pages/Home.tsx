import { Link } from "wouter";
import { ArrowRight, Download, ExternalLink, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProjectCard from "@/components/ProjectCard";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredProjects = [
    {
      id: "moes-tuinen",
      title: "MOES Tuinen",
      category: "Brand Activation",
      image: "/images/project-moes.jpg", // Placeholder, will need to be replaced or mapped
      description: "A comprehensive brand activation campaign including pop-up stands, social media strategy, and digital marketing planning.",
      tags: ["Brand Activation", "Social Media", "Digital Marketing"]
    },
    {
      id: "amstelhof-connect",
      title: "Amstelhof Connect",
      category: "App UX/UI Design",
      image: "/images/project-amstelhof.jpg",
      description: "Internal staff application designed to streamline operations and enhance employee engagement through AI-powered features.",
      tags: ["UX/UI Design", "App Concept", "Process Optimization"]
    },
    {
      id: "patronapp",
      title: "PatronApp",
      category: "App UX/UI Design",
      image: "/images/project-patronapp.jpg",
      description: "Concert experience app enhancing the connection between visitors and the venue through personalized recommendations.",
      tags: ["UX Research", "Prototyping", "User Strategy"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-[64px] md:-mt-[80px] pt-[calc(4rem+64px)] md:pt-[calc(5rem+80px)] pb-16 md:pb-32">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('/images/hero-bg.png')] bg-cover bg-center opacity-20 dark:opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-50 dark:opacity-100" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-50 dark:opacity-100" />
        </div>

        <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/10 border border-foreground/20 text-foreground/90 dark:bg-white/10 dark:border-white/20 dark:text-white text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/80 dark:bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground dark:bg-white"></span>
              </span>
              Available for new projects
            </div>

            <div className="mt-6 md:mt-0">
            <div className="relative md:block">
              <h1 className="text-5xl md:text-7xl font-heading font-bold leading-tight tracking-tight pr-[132px] md:pr-0">
                Hello, I'm <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/60">
                  Omar Abdulghani
                </span>
              </h1>
              <div className="md:hidden absolute top-1 right-0 w-[120px] h-[120px] rounded-full overflow-hidden border border-white/20">
                <img
                  src="/images/CV%20Resume.png"
                  alt="Omar Abdulghani"
                  className="w-full h-full object-cover scale-125"
                />
              </div>
            </div>
            
            <p className="mt-4 md:mt-0 text-xl md:text-2xl text-black dark:text-muted-foreground max-w-lg leading-relaxed">
              <span className="text-primary font-semibold">Creative Business Specialist</span> bridging the gap between design, strategy, and digital marketing.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8 md:mt-4">
              <Link href="/portfolio">
                <Button size="lg" className="flex items-center justify-center gap-2 rounded-full px-8 text-base h-14 shadow-[0_0_20px_-5px_rgba(75,120,216,0.3)] hover:shadow-[0_0_30px_-5px_rgba(75,120,216,0.5)] transition-all duration-300">
                  View My Work <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-lg h-14 bg-foreground/5 border-foreground/15 text-foreground hover:bg-foreground/10 dark:bg-transparent dark:border-white/10 dark:hover:bg-white/5"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Abstract decorative elements behind photo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-purple-500/20 rounded-full blur-3xl opacity-50 animate-pulse" />
              <div className="absolute inset-0 border border-white/10 rounded-full rotate-12 scale-110" />
              <div className="absolute inset-0 border border-primary/20 rounded-full -rotate-6 scale-105" />
              
              {/* Photo Container */}
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <img 
                  src="/images/CV%20Resume.png" 
                  alt="Omar Abdulghani" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute bottom-10 -left-10 bg-card/80 backdrop-blur-md border border-white/10 p-4 rounded-2xl shadow-xl animate-shine-once">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/20 p-2 rounded-lg text-primary">
                    <Download size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Download</p>
                    <p className="font-bold text-sm">Curriculum Vitae</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-[#efefef] dark:bg-white/[0.02]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Strategic Design</h3>
              <p className="text-black dark:text-muted-foreground">Transforming research and insights into meaningful user experiences that drive business goals.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Digital Marketing</h3>
              <p className="text-black dark:text-muted-foreground">Building effective strategies for creative products using SEO, analytics, and content creation.</p>
            </div>
            <div className="p-6 rounded-2xl bg-primary/10 dark:bg-primary/10 transition-colors group">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Creative Problem Solving</h3>
              <p className="text-black dark:text-muted-foreground">Delivering practical solutions that blend design thinking with measurable business impact.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 relative">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Featured Projects</h2>
              <p className="text-muted-foreground max-w-xl md:max-w-none">
                A selection of recent work where I've combined design, strategy, and creativity to solve real-world problems.
              </p>
            </div>
            <Link href="/portfolio">
              <Button variant="ghost" className="group">
                View All Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                {...project}
                image={`/images/project-${project.id}.jpg`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-20 mix-blend-overlay" />
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">Ready to create something amazing?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            I'm currently open to new opportunities and collaborations. Let's discuss how I can help bring your vision to life.
          </p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-10 py-8 text-xl shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105">
              Let's Work Together
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
