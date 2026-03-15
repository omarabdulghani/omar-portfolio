import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PdfFlipbookLink } from "@/components/PdfFlipbookModal";
import { trackEvent } from "@/lib/analytics";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Download, GraduationCap, Briefcase, Globe } from "lucide-react";

export default function About() {
  const { messages } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pb-12 overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              {messages.about.hero.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold">
              {messages.about.hero.titlePrefix} <span className="text-primary">{messages.about.hero.titleHighlight}</span>
            </h1>

            <div className="mt-3 md:mt-5 space-y-4 text-base md:text-[1.02rem] lg:text-[1.06rem] leading-7 text-muted-foreground caret-transparent [&_p]:text-justify [&_strong]:text-foreground [&_strong]:font-semibold [&_strong]:bg-primary/10 [&_strong]:px-1 [&_strong]:rounded-sm [&_span.text-foreground]:text-foreground [&_span.text-foreground]:font-semibold">
              <div className="relative mx-auto w-max md:w-auto md:float-right md:ml-8 md:mb-4 md:[shape-outside:circle(50%)]">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-primary/5 rounded-full blur-xl opacity-70" />
                <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full border border-white/15 shadow-2xl overflow-hidden">
                  <img
                    src="/images/CV%20Resume.png"
                    alt="Omar Abdulghani"
                    className="w-full h-full object-cover object-top scale-[1.2]"
                  />
                </div>
              </div>

              <p>
                {messages.about.hero.paragraph1.beforeHighlight} <strong className="text-foreground">{messages.about.hero.paragraph1.highlight}</strong>{messages.about.hero.paragraph1.afterHighlight}
              </p>
              <p>
                {messages.about.hero.paragraph2}
              </p>
              <p>
                {messages.about.hero.paragraph3.beforeHighlight} <strong className="text-foreground">{messages.about.hero.paragraph3.highlight}</strong>{messages.about.hero.paragraph3.afterHighlight}
              </p>
              <p>
                {messages.about.hero.paragraph4.beforeHighlight1} <strong className="text-foreground">{messages.about.hero.paragraph4.highlight1}</strong> {messages.about.hero.paragraph4.middle} <strong className="text-foreground">{messages.about.hero.paragraph4.highlight2}</strong>{messages.about.hero.paragraph4.afterHighlight2}
              </p>
              <p>
                {messages.about.hero.paragraph6.beforeHighlight} <strong className="text-foreground">{messages.about.hero.paragraph6.highlight}</strong> {messages.about.hero.paragraph6.afterHighlight}
              </p>
              <p>
                {messages.about.hero.paragraph5.beforeClient1} <span className="text-foreground">{messages.about.hero.paragraph5.client1}</span>{messages.about.hero.paragraph5.betweenClient1And2} <span className="text-foreground">{messages.about.hero.paragraph5.client2}</span>{messages.about.hero.paragraph5.betweenClient2And3} <span className="text-foreground">{messages.about.hero.paragraph5.client3}</span>{messages.about.hero.paragraph5.afterClient3}
              </p>
              <p>
                {messages.about.hero.paragraph7.beforeHighlight} <strong className="text-foreground">{messages.about.hero.paragraph7.highlight}</strong>{messages.about.hero.paragraph7.afterHighlight}
              </p>
              <p>
                {messages.about.hero.paragraph8.beforeHighlight} <strong className="text-foreground">{messages.about.hero.paragraph8.highlight}</strong>{messages.about.hero.paragraph8.afterHighlight}
              </p>
              <p>
                {messages.about.hero.paragraph9}
              </p>
              <p>
                {messages.about.hero.paragraph10}
              </p>

              <div className="pt-6 md:pt-8 flex flex-col sm:flex-row items-start gap-3">
                <PdfFlipbookLink
                  href="/Omar%20Abdulghani%20-%20CV%20Resume.pdf"
                  title="Omar Abdulghani CV"
                  onClick={() => trackEvent("cv_open", { location: "about_hero", label: "view_cv" })}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "inline-flex h-auto gap-2 rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:brightness-105"
                  )}
                >
                  <Download size={18} />
                  {messages.about.hero.ctaViewCv}
                </PdfFlipbookLink>
                <a
                  href="/contact"
                  onClick={() => trackEvent("cta_click", { location: "about_hero", label: "contact_me", destination: "/contact" })}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "inline-flex h-auto rounded-xl px-6 py-3 text-sm md:text-base font-semibold transition-all duration-200 hover:-translate-y-0.5"
                  )}
                >
                  {messages.about.hero.ctaContact}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="pt-14 pb-20 bg-white/[0.02] border-y border-white/5">
        <div className="container">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center">{messages.about.sections.educationExperience}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <GraduationCap size={24} />
                </div>
                <h3 className="text-2xl font-bold">{messages.about.education.title}</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.education.item1.title}</h4>
                    <Badge variant="secondary">2021 - 2025</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.education.item1.school}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.education.item1.description}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.education.item2.title}</h4>
                    <Badge variant="secondary">2018 - 2020</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.education.item2.school}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.education.item2.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.education.item3.title}</h4>
                    <Badge variant="secondary">2017 - 2018</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.education.item3.school}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.education.item3.description}
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
                <h3 className="text-2xl font-bold">{messages.about.experience.title}</h3>
              </div>
              
              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.experience.item1.title}</h4>
                    <Badge variant="secondary">2024</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.experience.item1.company}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.experience.item1.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.experience.item2.title}</h4>
                    <Badge variant="secondary">2019 - 2024</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.experience.item2.company}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.experience.item2.description}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-white/5 hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-xl font-bold">{messages.about.experience.item3.title}</h4>
                    <Badge variant="secondary">2014 - 2019</Badge>
                  </div>
                  <p className="text-primary font-medium mb-2">{messages.about.experience.item3.company}</p>
                  <p className="text-muted-foreground text-sm">
                    {messages.about.experience.item3.description}
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
            <Globe size={14} /> {messages.about.languages.badge}
          </div>
          <h2 className="text-3xl font-heading font-bold mb-12">{messages.about.languages.title}</h2>
          
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                AR
              </div>
              <div>
                <h3 className="font-bold">{messages.about.languages.arabic.name}</h3>
                <p className="text-sm text-muted-foreground">{messages.about.languages.arabic.level}</p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                EN
              </div>
              <div>
                <h3 className="font-bold">{messages.about.languages.english.name}</h3>
                <p className="text-sm text-muted-foreground">{messages.about.languages.english.level}</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-card border border-white/5 w-48 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                NL
              </div>
              <div>
                <h3 className="font-bold">{messages.about.languages.dutch.name}</h3>
                <p className="text-sm text-muted-foreground">{messages.about.languages.dutch.level}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
