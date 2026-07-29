export type Language = "en" | "nl" | "ar";

export interface LocaleMessages {
  nav: {
    home: string;
    about: string;
    portfolio: string;
    skills: string;
    contact: string;
    letsTalk: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    home: string;
    aboutMe: string;
    portfolio: string;
    skillsExpertise: string;
    contact: string;
    rightsReserved: string;
    cookieSettings: string;
    builtWith: string;
    cityCountry: string;
  };
  about: {
    hero: {
      badge: string;
      titlePrefix: string;
      titleHighlight: string;
      name: string;
      description: string;
      ctaViewWork: string;
      ctaDownloadCv: string;
    };
    workflow: {
      title: string;
      steps: {
        understand: {
          title: string;
          description: string;
        };
        design: {
          title: string;
          description: string;
        };
        prototype: {
          title: string;
          description: string;
        };
        testIterate: {
          title: string;
          description: string;
        };
        deliver: {
          title: string;
          description: string;
        };
      };
    };
    overview: {
      focusTitle: string;
      focusItems: {
        brandStrategy: {
          title: string;
          description: string;
        };
        uxUiDesign: {
          title: string;
          description: string;
        };
        aiPrototyping: {
          title: string;
          description: string;
        };
      };
      highlightsTitle: string;
      highlights: {
        organizations: string;
        interactivePrototypes: string;
        crossCulturalCommunication: string;
        multilingualPerspective: string;
      };
    };
    story: {
      title: string;
      sections: {
        background: {
          title: string;
          paragraph1: string;
          paragraph2: string;
        };
        crossCulturalExperience: {
          title: string;
          paragraph1: string;
          paragraph2: string;
        };
        technologyDesign: {
          title: string;
          paragraph1: string;
          paragraph2: string;
        };
        creativeBusinessClientWork: {
          title: string;
          paragraph1: string;
          paragraph2: string;
        };
        aiPrototyping: {
          title: string;
          paragraph1: string;
          paragraph2: string;
        };
        focusToday: {
          title: string;
          paragraph1: string;
        };
        languages: {
          title: string;
          paragraph1: string;
        };
      };
      closingLine: string;
      ctaViewCv: string;
      ctaContact: string;
    };
    sections: {
      educationExperience: string;
    };
    education: {
      title: string;
      item1: {
        title: string;
        school: string;
        description: string;
      };
      item2: {
        title: string;
        school: string;
        description: string;
      };
      item3: {
        title: string;
        school: string;
        description: string;
      };
    };
    experience: {
      title: string;
      item1: {
        title: string;
        company: string;
        description: string;
      };
      item2: {
        title: string;
        company: string;
        description: string;
      };
      item3: {
        title: string;
        company: string;
        description: string;
      };
    };
    languages: {
      badge: string;
      title: string;
      arabic: {
        name: string;
        level: string;
      };
      english: {
        name: string;
        level: string;
      };
      dutch: {
        name: string;
        level: string;
      };
    };
  };
  skills: {
    hero: {
      titlePrefix: string;
      titleHighlight: string;
      description: string;
    };
    labels: {
      coreCompetencies: string;
      toolsPlatforms: string;
    };
    categories: {
      uxUiProductDesign: {
        title: string;
        skills: {
          uxUiDesign: string;
          userFlowsInformationArchitecture: string;
          wireframingInteractivePrototyping: string;
          designSystemsVisualConsistency: string;
          responsiveInterfaceDesign: string;
          accessibilityAwareDesignDecisions: string;
        };
      };
      digitalMarketingGrowth: {
        title: string;
        skills: {
          digitalMarketingStrategyPlanning: string;
          seoTechnicalOnPage: string;
          socialMediaMarketing: string;
          contentStrategyCampaignMessaging: string;
          brandStorytelling: string;
          brandActivationExperientialConcepts: string;
          conversionOptimization: string;
          performanceTrackingReporting: string;
        };
      };
      researchStrategy: {
        title: string;
        skills: {
          userInterviewsSurveyDesign: string;
          qualitativeQuantitativeAnalysis: string;
          marketCompetitorResearch: string;
          personaJourneyEmpathyMapping: string;
          valueCreationPositioningStrategy: string;
          evidenceBasedDecisionMaking: string;
        };
      };
      businessPlanningDelivery: {
        title: string;
        skills: {
          conceptCreationIdeasToExperiences: string;
          projectStakeholderManagement: string;
          clientBriefingDebriefing: string;
          crossFunctionalCollaboration: string;
          exportMarketEntryPlanning: string;
          financialPlanningBudgetStructuring: string;
          kpiSmartGoalFrameworks: string;
          clientFacingPresentationDocumentation: string;
          htmlCssFundamentals: string;
          sqlFundamentals: string;
        };
      };
      aiAssistedCreation: {
        title: string;
        skills: {
          vibeCoding: string;
          aiAssistedWebsiteAppPrototyping: string;
          rapidIterationIdeaToMvp: string;
          promptDrivenDevelopmentWorkflows: string;
          creativeExperimentationAiTools: string;
        };
      };
    };
    sections: {
      certifications: string;
      languages: string;
      softSkills: string;
    };
    certifications: {
      ga4Certificate: string;
      googleFundamentalsDigitalMarketing: string;
      startupCampusEntrepreneurship: string;
      ieltsEnglishLanguageTesting: string;
      dutchLanguageCertificate: string;
    };
    languages: {
      arabic: {
        name: string;
        level: string;
      };
      english: {
        name: string;
        level: string;
      };
      dutch: {
        name: string;
        level: string;
      };
    };
    softSkills: {
      creativeProblemSolving: string;
      strategicThinking: string;
      communication: string;
      crossCulturalCollaboration: string;
      stakeholderManagement: string;
      teachingKnowledgeTransfer: string;
      adaptability: string;
      ownershipProactiveExecution: string;
    };
  };
  contact: {
    hero: {
      titlePrefix: string;
      titleHighlight: string;
      description: string;
    };
    info: {
      emailMe: string;
      callMe: string;
      location: string;
      cityCountry: string;
    };
    form: {
      title: string;
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      messageLabel: string;
      messagePlaceholder: string;
      submit: string;
    };
  };
  portfolio: {
    hero: {
      titlePrefix: string;
      titleHighlight: string;
      description: string;
    };
    filters: {
      all: string;
      softwareEngineering: string;
      uxUiProductDesign: string;
      digitalMarketingEcommerce: string;
      creativeStrategyBranding: string;
    };
    projects: {
      theraNeckEcommerce: { description: string };
      moesTuinen: { description: string };
      amstelhofConnect: { description: string };
      patronApp: { description: string };
      ppheHotel: { description: string };
      proDetailing: { description: string };
      hallenCity: { description: string };
      burningManCampaign: { description: string };
      streamingEmotionsValuePlan: { description: string };
      beexExportStrategy: { description: string };
      jobScout: { description: string };
      moonlit: { description: string };
    };
    tags: {
      eCommerce: string;
      productValidation: string;
      behaviouralAnalytics: string;
      brandActivation: string;
      socialMedia: string;
      digitalMarketing: string;
      uxResearch: string;
      prototyping: string;
      userStrategy: string;
      processOptimization: string;
      webDesign: string;
      conversionOptimization: string;
      analytics: string;
      seo: string;
      localMarketing: string;
      appConcept: string;
      communityBuilding: string;
      serviceDesign: string;
      audienceResearch: string;
      audienceInsights: string;
      exportPlanning: string;
      financialPlanning: string;
      marketResearch: string;
      eventPromotion: string;
      posterDesign: string;
      musicStrategy: string;
      valueCreation: string;
    };
  };
  projectDetails: {
    common: {
      backToPortfolio: string;
      overview: string;
      challenge: string;
      solution: string;
      solutionBreakdown: string;
      impactResults: string;
      ethics: string;
      prototypePreview: string;
      website: string;
      client: string;
      year: string;
      myRole: string;
      toolsUsed: string;
      projectGallery: string;
      gallerySections: {
        videos: string;
        images: string;
        documents: string;
      };
    };
    theraNeckEcommerce: {
      title: string;
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      role: string;
      tags: string[];
      tools: string[];
      solutionSections: Array<{
        title: string;
        body: string;
      }>;
      galleryTitles: {
        storefrontHero: string;
      };
    };
    moesTuinen: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      role: string;
      primaryActionLabel: string;
      demoVideoLabel: string;
      galleryTitles: {
        introductionVideo: string;
        popUpStandDesignVideo: string;
        meetCansu: string;
        meetJasper: string;
        meetMargret: string;
        meetSascha: string;
        growKitGiveaway: string;
        growKitGiveawayProduction: string;
        growKitContents: string;
        popUpStandDesign: string;
        posterDesign: string;
        deliverablesTimelineBudget: string;
      };
    };
    amstelhofConnect: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      primaryActionLabel: string;
      demoVideoLabel: string;
      galleryTitles: {
        membersCenter: string;
        mainDashboard: string;
        endPresentation: string;
      };
    };
    patronApp: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      primaryActionLabel: string;
      demoVideoLabel: string;
      galleryTitles: {
        promo1: string;
        promo2: string;
        visual: string;
        endReport: string;
        debriefingReport: string;
      };
    };
    ppheHotel: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        bookingPanelImprovement: string;
        parkPlazaPanelImprovement: string;
        artotelBookingPanelMobileImprovement: string;
        artotelDestinationsDesktopImprovement: string;
        artotelDestinationsMobileImprovement: string;
        personalDevelopmentReport1: string;
        personalDevelopmentReport2: string;
      };
    };
    proDetailing: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        improvedUiUxVisual: string;
      };
    };
    hallenCity: {
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        appVisual: string;
      };
    };
    burningManCampaign: {
      title: string;
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        designedPoster: string;
        brandPositioningReport: string;
        eventPromotionResearch: string;
        sociallyEngagedEventResearch: string;
      };
    };
    streamingEmotionsValuePlan: {
      title: string;
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        dataAnalysisReport: string;
        valueCreationReport1: string;
        valueCreationReport2: string;
      };
    };
    beexExportStrategy: {
      title: string;
      subtitle: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      galleryTitles: {
        exportResearch: string;
        exportPlan: string;
        financialExportPlan: string;
      };
    };
    jobScout: {
      title: string;
      subtitle: string;
      role: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      ethics: string;
    };
    moonlit: {
      title: string;
      subtitle: string;
      role: string;
      description: string;
      challenge: string;
      solution: string;
      impact: string;
      metrics?: string[];
    };
  };
  hero: {
    available: string;
    title: string;
    name: string;
    subtitleRole: string;
    subtitleRest: string;
    subtitleEnding: string;
    ctaViewWork: string;
    ctaContact: string;
    download: string;
    cvPdf: string;
  };
  sections: {
    whatIDo: string;
    featuredProjects: string;
    featuredProjectsDescription: string;
    viewAllProjects: string;
    ctaTitle: string;
    ctaBody: string;
    ctaButton: string;
  };
  cards: {
    conceptDevelopment: {
      title: string;
      body: string;
    };
    uxUi: {
      title: string;
      body: string;
    };
    creativeTechnology: {
      title: string;
      body: string;
    };
  };
  tags: {
    brandActivation: string;
    socialMedia: string;
    digitalMarketing: string;
    uxUiDesign: string;
    appConcept: string;
    processOptimization: string;
    uxResearch: string;
    prototyping: string;
    userStrategy: string;
  };
  heroSlides: {
    viewProject: string;
    independentProject: string;
    categories: {
      uxUiProductDesign: string;
      aiProductArchitecture: string;
      webOptimizationUxUi: string;
      brandActivation: string;
    };
    slides: {
      pphe: { title: string; description: string; category: string };
      theraNeck: { title: string; description: string; category: string };
      hallenCity: { title: string; description: string; category: string };
      jobScout: { title: string; description: string; category: string };
      patronApp: { title: string; description: string; category: string };
      moesTuinen: { title: string; description: string; category: string };
      moonlit: { title: string; description: string; category: string };
      amstelhof: { title: string; description: string; category: string };
    };
  };
}













