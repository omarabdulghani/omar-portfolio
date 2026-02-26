import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PdfFlipbookLink } from "@/components/PdfFlipbookModal";
import { cn } from "@/lib/utils";
import { Download, GraduationCap, Briefcase, Globe } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pb-12 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              About Me
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              Bridging Creativity & <span className="text-primary">Business Strategy</span>
            </h1>

            <div className="mt-3 md:mt-5 space-y-4 text-base md:text-[1.02rem] lg:text-[1.06rem] leading-7 text-muted-foreground caret-transparent [&_p]:text-justify [&_strong]:text-foreground [&_strong]:font-semibold [&_strong]:bg-primary/10 [&_strong]:px-1 [&_strong]:rounded-sm [&_span.text-foreground]:text-foreground [&_span.text-foreground]:font-semibold">
              <div className="relative mx-auto w-max md:w-auto md:float-right md:ml-8 md:mb-4 md:[shape-outside:circle(50%)]">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl opacity-70" />
                <img
                  src="/images/CV%20Resume.png"
                  alt="Omar Abdulghani"
                  className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border border-white/15 shadow-2xl object-cover object-top"
                />
              </div>

              <p>
                I didn't grow up with one clear passion. I grew up <strong className="text-foreground">curious about everything</strong>.
              </p>
              <p>
                As a child, I was already experimenting with media and technology, filming short horror movies, directing and editing music videos, and exploring how ideas could become something visual and tangible. At the same time, I loved language and communication, which made choosing one study path difficult.
              </p>
              <p>
                I first studied English teaching and gained knowledge in phonetics, psychology, and literature. Teaching still matters to me: I taught English to children in Syria and later taught Arabic to adults in the Netherlands. I then moved into Information Technology, building a foundation in <strong className="text-foreground">C#, HTML, SQL, Python, and UX/UI</strong>.
              </p>
              <p>
                Everything came together when I discovered <strong className="text-foreground">International Creative Business</strong> at Inholland University of Applied Sciences in Haarlem, where I graduated in 2025 with a Bachelor's degree and a minor in <strong className="text-foreground">Digital Marketing</strong>. This was where I could combine strategy, branding, UX/UI, business thinking, and creativity into one multidisciplinary approach.
              </p>
              <p>
                During my IT and Creative Business studies, I worked on real client projects with organizations such as <span className="text-foreground">Patronaat</span>, <span className="text-foreground">Amstelhof</span>, and <span className="text-foreground">De FilmHallen</span>. From briefing and research to final presentations and delivery, I helped turn concepts into tangible outcomes with measurable impact.
              </p>
              <p>
                Recently, I have been exploring <strong className="text-foreground">vibe coding</strong> with AI-powered tools such as Cursor, Claude Code, and Codex to rapidly build websites, apps, and interactive concepts. With my technical background, I do not just experiment creatively; I understand the structure behind what I build.
              </p>
              <p>
                Today, I specialize in <strong className="text-foreground">branding, UX/UI design, digital marketing, and concept development</strong>, especially in early-stage ideation, brand storytelling, and experiential thinking.
              </p>
              <p>
                Fluent in Arabic, English, and at B1 level in Dutch, I bring a <strong className="text-foreground">cross-cultural perspective</strong>, technical understanding, and hands-on creativity to every collaboration.
              </p>
              <p>
                If you are looking for someone who connects strategy with imagination and turns concepts into real experiences, let's create something impactful together.
              </p>

              <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-start gap-3">
                <PdfFlipbookLink
                  href="/CV.pdf"
                  title="Omar Abdulghani CV"
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "inline-flex h-auto gap-2 rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
                  )}
                >
                  <Download size={18} />
                  View CV
                </PdfFlipbookLink>
                <a
                  href="/contact"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "inline-flex h-auto rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  )}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="pt-14 pb-20 bg-white/[0.02] border-y border-white/5">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">Education & Experience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold">Education</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">International Creative Business</h4>
                    <Badge variant="secondary">2021 - 2025</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Inholland University of Applied Sciences, Haarlem</p>
                  <p className="text-muted-foreground text-sm">
                    Bachelor's degree with a multidisciplinary focus on branding, UX/UI, strategy, and business innovation. Included a minor in Digital Marketing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Information Technology</h4>
                    <Badge variant="secondary">2018 - 2020</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Haarlem University of Applied Sciences</p>
                  <p className="text-muted-foreground text-sm">
                    Built foundations in programming, systems thinking, and interface design (C#, HTML, SQL, Python, UX/UI basics).
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Teacher of English</h4>
                    <Badge variant="secondary">2017 - 2018</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Utrecht University of Applied Sciences</p>
                  <p className="text-muted-foreground text-sm">
                    Studied language teaching fundamentals including communication, pedagogy, and literature analysis.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Practical Experience */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Briefcase size={24} />
                </div>
                <h3 className="text-2xl font-bold">Practical Experience</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Digital Marketing & Web Development Intern</h4>
                    <Badge variant="secondary">2024</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Park Plaza Hotel Group Europe (PPHE), Amsterdam</p>
                  <p className="text-muted-foreground text-sm">
                    Contributed to UX projects, supported technical and non-technical SEO initiatives, and analyzed website performance using Google Analytics and Adobe Analytics.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Freelance Language Tutor</h4>
                    <Badge variant="secondary">2019 - 2024</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Amstelveen, The Netherlands</p>
                  <p className="text-muted-foreground text-sm">
                    Taught Arabic and English in one-to-one and small-group settings, adapting content to different learner backgrounds and goals.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">Early Professional Roles</h4>
                    <Badge variant="secondary">2014 - 2019</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">Netherlands & Syria</p>
                  <p className="text-muted-foreground text-sm">
                    Experience across software testing (Flavour x War Child), teacher assistant internship, interpreter/translator work, and kindergarten teaching.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-20">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-white/5 text-muted-foreground text-sm font-medium mb-6">
            <Globe size={14} /> Global Mindset
          </div>
          <h2 className="text-3xl font-heading font-bold mb-12">Languages & Communication</h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                AR
              </div>
              <div>
                <h3 className="font-bold">Arabic</h3>
                <p className="text-sm text-muted-foreground">Native</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                EN
              </div>
              <div>
                <h3 className="font-bold">English</h3>
                <p className="text-sm text-muted-foreground">Professional Proficiency</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                NL
              </div>
              <div>
                <h3 className="font-bold">Dutch</h3>
                <p className="text-sm text-muted-foreground">B1 Level (Working Proficiency)</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
