export interface RecruiterHighlight {
  id: string;
  iconName: "Sparkles" | "Bot" | "Cpu" | "Palette" | "Zap" | "Globe" | "Users" | "Rocket" | "Target" | "Award" | "Layers" | "Brain" | "Music" | "Leaf" | "Gamepad2" | "Heart";
  badge: string;
  title: string;
  subtitle: string;
  position: "top-right" | "middle-left" | "top-left" | "middle-right";
}

export function preventOrphans(text: string): string {
  if (!text) return text;
  const lastSpaceIndex = text.lastIndexOf(" ");
  if (lastSpaceIndex === -1) return text;
  return text.slice(0, lastSpaceIndex) + "\u00a0" + text.slice(lastSpaceIndex + 1);
}

export const RECRUITER_HIGHLIGHTS: Omit<RecruiterHighlight, "position">[] = [
  {
    id: "ai-product-builder",
    iconName: "Bot",
    badge: "AI Product Craft",
    title: "Prompt-Driven Product Builder",
    subtitle: "Creating full-stack apps with Claude Code, Cursor & Antigravity IDE",
  },
  {
    id: "creative-technologist",
    iconName: "Sparkles",
    badge: "Identity",
    title: "Creative Technologist",
    subtitle: "Blending UX/UI design, AI automation & front-end tech",
  },
  {
    id: "vibe-coding",
    iconName: "Zap",
    badge: "Build Velocity",
    title: "Vibe Coding Specialist",
    subtitle: "Transforming ideas into interactive MVPs in record time",
  },
  {
    id: "ai-workflows",
    iconName: "Brain",
    badge: "AI Automation",
    title: "AI & Agentic Workflows",
    subtitle: "Streamlining development with prompt engineering & LLM APIs",
  },
  {
    id: "ux-ui-design",
    iconName: "Palette",
    badge: "UX/UI Craft",
    title: "UX/UI Product Designer",
    subtitle: "Crafting intuitive digital flows from Figma to production code",
  },
  {
    id: "multilingual",
    iconName: "Globe",
    badge: "Global Mindset",
    title: "Fluent Trilingual Communicator",
    subtitle: "Seamlessly bridging English, Arabic & Dutch (B1)",
  },
  {
    id: "international-collab",
    iconName: "Users",
    badge: "Global Perspective",
    title: "Cross-Cultural Collaborator",
    subtitle: "Thriving in international environments & diverse global teams",
  },
  {
    id: "global-empathy",
    iconName: "Globe",
    badge: "Cultural Bridge",
    title: "Global Product & User Empathy",
    subtitle: "Designing inclusive experiences for international markets",
  },
  {
    id: "music-lover",
    iconName: "Music",
    badge: "Personal Passion",
    title: "Music & Audio Creator",
    subtitle: "Inspired by rhythm, soundscapes & interactive audio flows",
  },
  {
    id: "plant-lover",
    iconName: "Leaf",
    badge: "Workspace Ethos",
    title: "Lush Plant Collector",
    subtitle: "Nurturing green environments for focus & creative clarity",
  },
  {
    id: "gamer-craft",
    iconName: "Gamepad2",
    badge: "Play & Design",
    title: "Avid Gamer & Game Designer",
    subtitle: "Fascinated by game mechanics, cozy art & immersive worlds",
  },
  {
    id: "concept-dev",
    iconName: "Rocket",
    badge: "Product Strategy",
    title: "End-to-End Product Creator",
    subtitle: "Research, wireframing, rapid prototyping & launch",
  },
  {
    id: "micro-interactions",
    iconName: "Layers",
    badge: "Design Polish",
    title: "Obsessive Craft & Polish",
    subtitle: "Liquid Glass aesthetics & smooth fluid motion",
  },
  {
    id: "user-centric",
    iconName: "Target",
    badge: "User Research",
    title: "Evidence-Based Design",
    subtitle: "Testing assumptions with data-backed user research",
  },
  {
    id: "lifelong-learner",
    iconName: "Heart",
    badge: "Mindset",
    title: "Curious & Lifelong Learner",
    subtitle: "Driven by constant experimentation, growth & discovery",
  },
];

const POSITIONS: RecruiterHighlight["position"][] = [
  "top-right",
  "middle-left",
  "top-left",
  "middle-right",
];

export function getRandomHighlights(count: number = RECRUITER_HIGHLIGHTS.length): RecruiterHighlight[] {
  const shuffled = [...RECRUITER_HIGHLIGHTS].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, count);

  return selected.map((item, index) => ({
    ...item,
    position: POSITIONS[index % POSITIONS.length],
  }));
}
