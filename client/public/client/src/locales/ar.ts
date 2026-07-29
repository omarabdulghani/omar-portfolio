import type { LocaleMessages } from "./types";
import { en } from "./en";

export const ar: LocaleMessages = {
  ...en,
  nav: {
    ...en.nav,
    home: "الرئيسية",
    about: "نبذة عني",
    portfolio: "المشاريع",
    skills: "المهارات",
    contact: "تواصل",
    letsTalk: "لنتحدث",
  },
  footer: {
    ...en.footer,
    description:
      "متخصص إبداعي تقني، يبني منتجات متكاملة (Full-stack)، يؤتمت مسارات العمل باستخدام الذكاء الاصطناعي، ويصمم تجارب وواجهات مستخدم (UX/UI) بديهية.",
    quickLinks: "روابط سريعة",
    home: "الرئيسية",
    aboutMe: "نبذة عني",
    portfolio: "المشاريع",
    skillsExpertise: "المهارات والخبرات",
    contact: "تواصل",
    rightsReserved: "جميع الحقوق محفوظة.",
    cookieSettings: "إعدادات ملفات تعريف الارتباط",
    builtWith: "تم التصميم والتطوير باستخدام React & Tailwind",
    cityCountry: "أمستلفين، هولندا",
  },
  hero: {
    ...en.hero,
    available: "أبحث بنشاط عن فرص عمل بدوام كامل",
    title: "مرحباً، أنا",
    name: "عمر عبد الغني",
    subtitleRole: "تقني مبدع",
    subtitleRest:
      "أدمج بين التطوير، والذكاء الاصطناعي، والتصميم لابتكار منتجات رقمية قابلة للتوسع.",
    ctaViewWork: "استكشف مشاريعي",
    ctaContact: "تواصل معي",
    download: "تحميل",
    cvPdf: "السيرة الذاتية",
  },
  sections: {
    ...en.sections,
    whatIDo: "ما أقوم به",
    ctaTitle: "هل أنت مستعد لابتكار شيء رائع؟",
    ctaBody:
      "أنا متاح حالياً للفرص والتعاونات الجديدة. دعنا نناقش كيف يمكنني المساعدة في تحويل رؤيتك إلى واقع.",
    ctaButton: "لنعمل معاً",
  },
  cards: {
    ...en.cards,
    conceptDevelopment: {
      title: "تطوير الويب و Full-Stack",
      body: "بناء منتجات رقمية قوية تُترجم المتطلبات المعقدة إلى هيكليات قابلة للتوسع، وربط سلس لـ API، وكود برمجي\u00A0فعّال.",
    },
    uxUi: {
      title: "تصميم UX/UI واستراتيجية المنتجات الرقمية",
      body: "تصميم تجارب رقمية بديهية مبنية على أبحاث المستخدم، وتحليل السلوك، والتفكير الاستراتيجي. أُحّول الأفكار المعقدة إلى واجهات واضحة تتمحور حول المستخدم، وتحقق التوازن بين الوظائف، وسهولة الاستخدام، والهوية البصرية.",
    },
    creativeTechnology: {
      title: "أتمتة الذكاء الاصطناعي ومسارات العمل (Workflows)",
      body: "تبسيط عمليات التطوير والتشغيل من خلال مسارات مؤتمتة (Automated pipelines)، والتطوير الموجه بالأوامر (Prompt-driven development)، وأدوات الذكاء الاصطناعي المتقدمة (Cursor, Claude Code, Codex).",
    },
  },
  heroSlides: {
    viewProject: "عرض المشروع",
    independentProject: "مشروع مستقل",
    categories: {
      uxUiProductDesign: "تصميم UX/UI وتصميم المنتجات",
      aiProductArchitecture: "مشاريع بالذكاء الاصطناعي",
      webOptimizationUxUi: "تحسين الويب و UX/UI",
      brandActivation: "تفعيل العلامة التجارية",
    },
    slides: {
      pphe: {
        title: "PPHE Hotel Group",
        description: "تحسين واجهة وتجربة المستخدم (UI/UX) لعلامات فندقية عالمية.",
        category: "تحسين الويب و UX/UI",
      },
      theraNeck: {
        title: "TheraNeck | منتج تجارة إلكترونية",
        description: "اختبار لموقع تسوق الكتروني.",
        category: "مشاريع بالذكاء الاصطناعي",
      },
      hallenCity: {
        title: "HallenCity",
        description: "نموذج تطبيق شامل ومتكامل لتجربة السينما.",
        category: "تصميم UX/UI وتصميم المنتجات",
      },
      jobScout: {
        title: "Job Scout",
        description: "البحث عن عمل بكل سهولة.",
        category: "مشاريع بالذكاء الاصطناعي",
      },
      patronApp: {
        title: "PatronApp",
        description: "تجربة موسيقية تفاعلية جديدة كلياً.",
        category: "مشاريع بالذكاء الاصطناعي",
      },
      moesTuinen: {
        title: "MOES Tuinen",
        description: "تفعيل متكامل للعلامة التجارية رقمياً وعلى الأرض.",
        category: "تفعيل العلامة التجارية",
      },
      moonlit: {
        title: "Moonlit Firefly Bloom",
        description: "لعبة آركيد ساحرة ومريحة",
        category: "تصميم UX/UI وتصميم المنتجات",
      },
      amstelhof: {
        title: "Amstelhof Connect",
        description: "تطبيق لتسهيل عمل موظفين نادي رياضي ومنتجع صحي.",
        category: "تصميم UX/UI وتصميم المنتجات",
      },
    },
  },
};
