/**
 * OneMoreEpoch — episode data
 * ---------------------------------------------------------------
 * This is the ONE place you need to edit to publish real episodes.
 *
 * For each episode:
 *   - title:       episode title
 *   - description: one or two sentence summary
 *   - date:        "YYYY-MM-DD" (shown on the card)
 *   - duration:    display string, e.g. "48 min"
 *   - topic:       one of "models" | "agents" | "research" | "tools"
 *                  (must match a key in TOPICS below)
 *   - youtubeId:   the YouTube video ID (the part after "v=" in the
 *                  video URL), e.g. for
 *                  https://www.youtube.com/watch?v=dQw4w9WgXcQ
 *                  the ID is "dQw4w9WgXcQ".
 *                  Leave as null to show a placeholder card.
 *   - featured:    true/false — featured episodes appear on the homepage
 *
 * Add, remove, or reorder entries freely — the pages render whatever
 * is in this array, newest first.
 */

const TOPICS = {
  models: {
    label: "Models & Architectures",
    tag: "MODELS",
    description:
      "How today's models are built and trained, and why design choices matter.",
  },
  agents: {
    label: "Agents & Tool Use",
    tag: "AGENTS",
    description:
      "What it actually takes to get an AI system to plan and do things.",
  },
  research: {
    label: "Research, Read Aloud",
    tag: "RESEARCH",
    description:
      "Breaking down the papers and benchmarks everyone's talking about.",
  },
  tools: {
    label: "Tools & Workflows",
    tag: "TOOLS",
    description: "Real builds, real pitfalls — what's actually worth your time.",
  },
};

const EPISODES = [
  {
    number: 6,
    title: "Placeholder: How Agents Actually Plan",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2026-02-20",
    duration: "51 min",
    topic: "agents",
    youtubeId: null,
    featured: true,
  },
  {
    number: 5,
    title: "Placeholder: Inside a Training Run",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2026-02-06",
    duration: "39 min",
    topic: "models",
    youtubeId: null,
    featured: true,
  },
  {
    number: 4,
    title: "Placeholder: Open Weights, Open Questions",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2026-01-23",
    duration: "44 min",
    topic: "models",
    youtubeId: null,
    featured: true,
  },
  {
    number: 3,
    title: "Placeholder: Evals Nobody Believes",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2026-01-09",
    duration: "47 min",
    topic: "research",
    youtubeId: null,
    featured: false,
  },
  {
    number: 2,
    title: "Placeholder: The Context Window Problem",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2025-12-26",
    duration: "36 min",
    topic: "tools",
    youtubeId: null,
    featured: false,
  },
  {
    number: 1,
    title: "Placeholder: Why We Started OneMoreEpoch",
    description:
      "A placeholder episode card — swap in your real title, description, and YouTube video ID in js/episodes-data.js.",
    date: "2025-12-12",
    duration: "33 min",
    topic: "research",
    youtubeId: null,
    featured: false,
  },
];
