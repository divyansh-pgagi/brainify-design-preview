export const NAV_LINKS = [
  { label: "Paths", href: "#paths" },
  { label: "Features", href: "#inside-app" },
  { label: "Certification", href: "#certification" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO_TRUST_BADGES = [
  "Project-led, not video-soup",
  "Built-in AI mentor",
  "Earn certified proof of skill",
] as const;

export const HERO_BADGE_TEXT = "Live in 175 countries · 11 languages";

/** Single source of truth for supported languages — used by the Languages
    carousel and the FAQ answer so the two can never drift apart. */
export const LANGUAGES = [
  "English", "Arabic", "Hindi", "French", "Russian", "Farsi",
  "German", "Spanish", "Turkish", "Kurdish", "Vietnamese",
] as const;

export const HERO_HEADING = "The way you learn is about to";

export const HERO_HEADING_HIGHLIGHT = "change.";

export const HERO_SUBHEADING =
  "brAInify isn't another course platform. It's a complete AI-powered learning ecosystem that guides you from foundation to mastery.";

export const HERO_DOWNLOAD_LABEL = "Download the app · Free to start";

export const HERO_CTA_LINK = "Or see how the ecosystem works →";

export const STORY_SCROLL_HINT = "Scroll to play";

/** Global Reach section (world map + stats). */
export const GLOBAL_REACH_BADGE = "Global Reach";
export const GLOBAL_REACH_HEADING_PRE = "Learning ";
export const GLOBAL_REACH_HEADING_HIGHLIGHT = "Without Limits";
export const GLOBAL_REACH_HEADING_POST = "Across the World";
export const GLOBAL_REACH_STATS = [
  { value: 8, suffix: "k", label: "Learners" },
  { value: 14, suffix: "", label: "Languages" },
  { value: 175, suffix: "", label: "Countries" },
  { value: 5, suffix: ".0", label: "App Rating" },
] as const;

/** Speech-bubble lines the travelling robot says at each section. */
export const ROBOT_JOURNEY_MESSAGES = [
  { section: "features", text: "Meet our mentors!" },
  { section: "paths", text: "Pick your path" },
  { section: "inside-app", text: "That's me, your AI mentor!" },
  { section: "tools", text: "Real tools, real skills" },
  { section: "certification", text: "Earn certified proof" },
  { section: "faq", text: "Got questions?" },
  { section: "story", text: "Watch this!" },
  { section: "footer", text: "Download Now!" },
] as const;

export const WHATSAPP_CHANNEL_URL = "https://whatsapp.com/channel/0029Vb7w7AlHAdNeB2w8Nb3a";

/** Scroll-driven chat played inside the InsideApp phone mockup. */
export const INSIDE_APP_CHAT = [
  { from: "user",   text: "I want to build an AI agent but I've never coded." },
  { from: "mentor", text: "Perfect starting point. Module 1 is no-jargon, project-first. You'll ship something real today." },
  { from: "mentor", text: "Quick win: let's automate one boring task from your week." },
  { from: "user",   text: "Let's do it." },
  { from: "system", text: "+50 XP · Streak day 3" },
] as const;

export const MARQUEE_TEXT =
  "YouTube videos. Saved posts. Half-finished courses. Information isn't your problem. Structure is. · brAInify was built to fix the one thing the rest of the internet can't: a system that actually finishes you.";

export const EDUCATORS = [
  { name: "Ryan",   specialty: "AI",                 image: "/images/educators/ryan.png"   },
  { name: "Sarah",  specialty: "Content Creator",    image: "/images/educators/sarah.png"  },
  { name: "Adam",   specialty: "Digital Marketing",  image: "/images/educators/adam.png"   },
  { name: "Daniel", specialty: "Financial Intelligence", image: "/images/educators/daniel.png" },
  { name: "Steve",  specialty: "Digital Economy",    image: "/images/educators/steve.png"  },
  { name: "Luke",   specialty: "AI Youth",           image: "/images/educators/luke.png"   },
  { name: "Carol",  specialty: "Tools",              image: "/images/educators/carol.png"  },
] as const;
