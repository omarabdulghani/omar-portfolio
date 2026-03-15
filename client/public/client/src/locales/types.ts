export type Language = "en" | "nl";

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
  };
  about: {
    hero: {
      badge: string;
      titlePrefix: string;
      titleHighlight: string;
      paragraph1: {
        beforeHighlight: string;
        highlight: string;
        afterHighlight: string;
      };
      paragraph2: string;
      paragraph3: {
        beforeHighlight: string;
        highlight: string;
        afterHighlight: string;
      };
      paragraph4: {
        beforeHighlight1: string;
        highlight1: string;
        middle: string;
        highlight2: string;
        afterHighlight2: string;
      };
      paragraph5: {
        beforeClient1: string;
        client1: string;
        betweenClient1And2: string;
        client2: string;
        betweenClient2And3: string;
        client3: string;
        afterClient3: string;
      };
      paragraph6: {
        beforeHighlight: string;
        highlight: string;
        afterHighlight: string;
      };
      paragraph7: {
        beforeHighlight: string;
        highlight: string;
        afterHighlight: string;
      };
      paragraph8: {
        beforeHighlight: string;
        highlight: string;
        afterHighlight: string;
      };
      paragraph9: string;
      paragraph10: string;
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
      uxUiDesign: string;
      brandActivation: string;
      digitalMarketing: string;
      appDesign: string;
      brandPositioning: string;
      artistStrategy: string;
      exportStrategy: string;
      eventPromotion: string;
      posterDesign: string;
      musicStrategy: string;
      valueCreation: string;
      financialPlanning: string;
      marketResearch: string;
    };
    projects: {
      moesTuinen: { description: string };
      amstelhofConnect: { description: string };
      patronApp: { description: string };
      ppheHotel: { description: string };
      proDetailing: { description: string };
      hallenCity: { description: string };
      burningManCampaign: { description: string };
      streamingEmotionsValuePlan: { description: string };
      beexExportStrategy: { description: string };
    };
    tags: {
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
      impactResults: string;
      prototypePreview: string;
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
}













