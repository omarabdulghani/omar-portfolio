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
        messages.skills.categories.digitalMarketingGrowth.skills.digitalMarketingStrategyPlanning,
        messages.skills.categories.digitalMarketingGrowth.skills.seoTechnicalOnPage,
        messages.skills.categories.digitalMarketingGrowth.skills.socialMediaMarketing,
        messages.skills.categories.digitalMarketingGrowth.skills.contentStrategyCampaignMessaging,
        messages.skills.categories.digitalMarketingGrowth.skills.brandStorytelling,
        messages.skills.categories.digitalMarketingGrowth.skills.brandActivationExperientialConcepts,
        messages.skills.categories.digitalMarketingGrowth.skills.conversionOptimization,
        messages.skills.categories.digitalMarketingGrowth.skills.performanceTrackingReporting
      ],
      tools: [
        "Google Analytics 4",
        "Adobe Analytics",
        "Google Ads",
        "Meta Ads Manager",
        "Google Search Console",
        "SEMrush",
        "Hotjar",
        "WordPress",
        "GTmetrix"
      ]
    },
    {
      title: messages.skills.categories.researchStrategy.title,
      icon: <Search className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.researchStrategy.skills.userInterviewsSurveyDesign,
        messages.skills.categories.researchStrategy.skills.qualitativeQuantitativeAnalysis,
        messages.skills.categories.researchStrategy.skills.marketCompetitorResearch,
        messages.skills.categories.researchStrategy.skills.personaJourneyEmpathyMapping,
        messages.skills.categories.researchStrategy.skills.valueCreationPositioningStrategy,
        messages.skills.categories.researchStrategy.skills.evidenceBasedDecisionMaking
      ],
      tools: ["Google Forms", "Typeform", "Miro", "Excel (Advanced)", "Tableau"]
    },
    {
      title: messages.skills.categories.businessPlanningDelivery.title,
      icon: <Briefcase className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.businessPlanningDelivery.skills.conceptCreationIdeasToExperiences,
        messages.skills.categories.businessPlanningDelivery.skills.projectStakeholderManagement,
        messages.skills.categories.businessPlanningDelivery.skills.clientBriefingDebriefing,
        messages.skills.categories.businessPlanningDelivery.skills.crossFunctionalCollaboration,
        messages.skills.categories.businessPlanningDelivery.skills.exportMarketEntryPlanning,
        messages.skills.categories.businessPlanningDelivery.skills.financialPlanningBudgetStructuring,
        messages.skills.categories.businessPlanningDelivery.skills.kpiSmartGoalFrameworks,
        messages.skills.categories.businessPlanningDelivery.skills.clientFacingPresentationDocumentation,
        messages.skills.categories.businessPlanningDelivery.skills.htmlCssFundamentals,
        messages.skills.categories.businessPlanningDelivery.skills.sqlFundamentals
      ],
      tools: ["Asana", "Jira", "Notion", "Trello", "Slack", "Microsoft Office", "VS Code"]
    },
    {
      title: messages.skills.categories.aiAssistedCreation.title,
      icon: <Bot className="w-6 h-6 text-primary" />,
      skills: [
        messages.skills.categories.aiAssistedCreation.skills.vibeCoding,
        messages.skills.categories.aiAssistedCreation.skills.aiAssistedWebsiteAppPrototyping,
        messages.skills.categories.aiAssistedCreation.skills.rapidIterationIdeaToMvp,
        messages.skills.categories.aiAssistedCreation.skills.promptDrivenDevelopmentWorkflows,
        messages.skills.categories.aiAssistedCreation.skills.creativeExperimentationAiTools
      ],
      tools: ["Cursor", "OpenAI Codex", "Claude Code", "Vercel", "Aura", "Unity (Prototype Exploration)"]
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
              <Card key={index} className="bg-card/50 border-white/5 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center gap-4 pb-2">
                  <div className="p-3 bg-primary/10 rounded-xl">
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
                  <div key={certificate} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-white/5">
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
                  <div key={language.name} className="p-4 rounded-xl bg-card border border-white/5">
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
                  <div key={skill} className="flex h-full items-start gap-3 rounded-lg bg-secondary/30 p-4">
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





