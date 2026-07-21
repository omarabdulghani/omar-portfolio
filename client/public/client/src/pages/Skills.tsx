import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { Palette, Megaphone, Search, Award, Users, Briefcase, Globe, Bot } from "lucide-react";

export default function Skills() {
  const { language, messages } = useLanguage();

  const skillCategories = [
    {
      title: messages.skills.categories.uxUiProductDesign.title,
      icon: <Palette className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.uxUiProductDesign.skills.uxUiDesign,
        messages.skills.categories.uxUiProductDesign.skills.userFlowsInformationArchitecture,
        messages.skills.categories.uxUiProductDesign.skills.wireframingInteractivePrototyping,
        messages.skills.categories.uxUiProductDesign.skills.designSystemsVisualConsistency,
        messages.skills.categories.uxUiProductDesign.skills.responsiveInterfaceDesign,
        messages.skills.categories.uxUiProductDesign.skills.accessibilityAwareDesignDecisions
      ],
      tools: ["Figma", "Adobe XD", "Framer", "Miro", "Canva", "Adobe Photoshop", "Adobe Illustrator"]
    },
    {
      title: messages.skills.categories.digitalMarketingGrowth.title,
      icon: <Megaphone className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.digitalMarketingGrowth.skills.frontendDevelopment,
        messages.skills.categories.digitalMarketingGrowth.skills.backendArchitecture,
        messages.skills.categories.digitalMarketingGrowth.skills.apiIntegration,
        messages.skills.categories.digitalMarketingGrowth.skills.versionControl,
        messages.skills.categories.digitalMarketingGrowth.skills.databaseManagement,
        messages.skills.categories.digitalMarketingGrowth.skills.performanceOptimization
      ],
      tools: [
        "React",
        "TypeScript",
        "Node.js",
        "Tailwind CSS",
        "SQL",
        "REST APIs",
        "Git & GitHub",
        "Vite",
        "Next.js"
      ]
    },
    {
      title: messages.skills.categories.researchStrategy.title,
      icon: <Search className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.researchStrategy.skills.productStrategyPositioning,
        messages.skills.categories.researchStrategy.skills.userResearchTesting,
        messages.skills.categories.researchStrategy.skills.crossFunctionalCollaboration,
        messages.skills.categories.researchStrategy.skills.projectStakeholderManagement,
        messages.skills.categories.researchStrategy.skills.processAutomation,
        messages.skills.categories.researchStrategy.skills.evidenceBasedDecisionMaking
      ],
      tools: ["Miro", "Notion", "Jira", "Asana", "Trello", "Google Workspace"]
    },
    {
      title: messages.skills.categories.aiAssistedCreation.title,
      icon: <Bot className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.aiAssistedCreation.skills.claudeCursorCodex,
        messages.skills.categories.aiAssistedCreation.skills.promptDrivenDevelopment,
        messages.skills.categories.aiAssistedCreation.skills.apiAutomationPipelines,
        messages.skills.categories.aiAssistedCreation.skills.rapidIterationMvp,
        messages.skills.categories.aiAssistedCreation.skills.vibeCoding
      ],
      tools: ["Cursor", "Claude Code", "OpenAI Codex", "Vercel", "GitHub Actions"]
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/abstract-texture.png')] opacity-10 mix-blend-overlay" />
        <div className="container relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            {messages.skills.hero.titlePrefix} <span className="text-primary">{messages.skills.hero.titleHighlight}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {messages.skills.hero.description}
          </p>
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="relative rounded-[2rem] bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.15)] group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <CardHeader className="flex flex-row items-center gap-4 pb-2">
                    <div className="p-3 bg-primary/10 rounded-2xl text-slate-900 dark:text-white group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_15px_rgba(var(--primary),0.1)] group-hover:shadow-[0_0_25px_rgba(var(--primary),0.3)]">
                    {category.icon}
                  </div>
                  <CardTitle className="text-2xl font-heading">{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{messages.skills.labels.coreCompetencies}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-secondary/50 hover:bg-primary/20 transition-colors py-1.5">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">{messages.skills.labels.toolsPlatforms}</h4>
                    <div className="flex flex-wrap gap-2">
                      {category.tools.map((tool) => (
                        <span key={tool} className="text-sm text-muted-foreground border border-white/10 px-3 py-1 rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Soft Skills */}
      <section className="py-20 bg-white/[0.02] border-t border-white/5">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Certifications */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">{messages.skills.sections.certifications}</h2>
              </div>
              <div className="space-y-3">
                {[
                  messages.skills.certifications.ga4Certificate,
                  messages.skills.certifications.googleFundamentalsDigitalMarketing,
                  messages.skills.certifications.startupCampusEntrepreneurship,
                  messages.skills.certifications.ieltsEnglishLanguageTesting,
                  messages.skills.certifications.dutchLanguageCertificate
                ].map((certificate) => (
                  <div key={certificate} className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.05)]">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="font-medium">{certificate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Globe className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">{messages.skills.sections.languages}</h2>
              </div>
              <div className="space-y-4">
                {[
                  { name: messages.skills.languages.arabic.name, level: messages.skills.languages.arabic.level },
                  { name: messages.skills.languages.english.name, level: messages.skills.languages.english.level },
                  { name: messages.skills.languages.dutch.name, level: messages.skills.languages.dutch.level }
                ].map((language) => (
                  <div key={language.name} className="p-4 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.05)]">
                    <h3 className="font-bold">{language.name}</h3>
                    <p className="text-sm text-muted-foreground">{language.level}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Users className="text-primary" size={28} />
                <h2 className="text-3xl font-heading font-bold">{messages.skills.sections.softSkills}</h2>
              </div>
              <div className={language === "nl" ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4"}>
                {[
                  messages.skills.softSkills.creativeProblemSolving,
                  messages.skills.softSkills.strategicThinking,
                  messages.skills.softSkills.communication,
                  messages.skills.softSkills.crossCulturalCollaboration,
                  messages.skills.softSkills.stakeholderManagement,
                  messages.skills.softSkills.teachingKnowledgeTransfer,
                  messages.skills.softSkills.adaptability,
                  messages.skills.softSkills.ownershipProactiveExecution
                ].map((skill) => (
                  <div key={skill} className="flex h-full items-start gap-3 rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-50 dark:hover:bg-white/10 hover:shadow-lg dark:hover:shadow-[0_8px_30px_rgba(var(--primary),0.05)]">
                    <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    <span className="font-medium leading-snug">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}





