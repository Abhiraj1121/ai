export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
  command?: string;
}

export interface TopologyStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
}

export interface ComparisonRow {
  feature: string;
  eka: string;
  traditional: string;
  advantage: string;
}

export interface RoadmapItem {
  quarter: string;
  status: 'completed' | 'in-progress' | 'planned';
  title: string;
  description: string;
}

export interface DemoPreset {
  id: string;
  label: string;
  toolName: string;
  command: string;
  userPrompt: string;
  aiResponse: string;
  badge: string;
}

export const EKA_FEATURES: FeatureItem[] = [
  {
    id: "ai-core",
    icon: "Brain",
    title: "Conversational Core",
    description: "Cloud-based text generation with context memory and smart fallback logic for resilient, concise, and ultra-reliable responses.",
    tag: "Always Active"
  },
  {
    id: "agentic-router",
    icon: "Cpu",
    title: "Agentic Tool Orchestrator",
    description: "Primary router model (Nemotron 3 Super) uses native function calling to auto-detect intent from plain language without slash commands.",
    tag: "Core Engine"
  },
  {
    id: "code-writer",
    icon: "Code",
    title: "AI Code Writer & Verification",
    description: "Laguna-XS code model with AST static syntax verification. Generated code is checked for syntax before delivery and never executed server-side.",
    tag: "/code",
    command: "/code python reverse_linked_list"
  },
  {
    id: "diagram-engine",
    icon: "Network",
    title: "Live Diagram Engine",
    description: "Transforms natural language descriptions into interactive, vector-rendered Mermaid.js flowcharts, sequence, and system diagrams in real time.",
    tag: "/diagram",
    command: "/diagram sequence auth_flow"
  },
  {
    id: "document-press",
    icon: "FileText",
    title: "Document Press",
    description: "Generates reports, resumes, proposals, and essays. Automatically exports to formatted Markdown, DOCX, or PDF with graceful fallback.",
    tag: "/doc",
    command: "/doc pdf renewable_energy_report"
  },
  {
    id: "avatar-forge",
    icon: "Sparkles",
    title: "AI Avatar Forge",
    description: "Instant SVG identity generation powered by DiceBear across 10 distinct styles (bottts, avataaars, pixel-art) with zero API keys required.",
    tag: "/avatar",
    command: "/avatar Nova pixel-art"
  },
  {
    id: "web-search",
    icon: "Globe",
    title: "Integrated Web Search",
    description: "Toggle-based Wikipedia & live web lookup with intelligent AI fallback when query context requires updated real-world grounding.",
    tag: "Search Toggle"
  },
  {
    id: "byok-security",
    icon: "Key",
    title: "Bring Your Own Key (BYOK)",
    description: "Supply your own OpenRouter key. Keys stay strictly in local browser storage, forwarded over encrypted headers without server-side persistence.",
    tag: "Zero Telemetry"
  },
  {
    id: "auth-store",
    icon: "ShieldCheck",
    title: "PBKDF2 Secured Authentication",
    description: "SQLite user store backed by PBKDF2-HMAC-SHA256 (260k iterations) password hashing with per-user salt and timing-safe checks.",
    tag: "Enterprise Auth"
  }
];

export const TOPOLOGY_STEPS: TopologyStep[] = [
  {
    step: "01",
    title: "User Input Ingestion",
    subtitle: "Multimodal Voice & Text",
    description: "Captures natural language text or audio via Web Speech API, detecting English or Hindi auto-routing metadata.",
    badge: "Web Speech API"
  },
  {
    step: "02",
    title: "Nemotron Router Handoff",
    subtitle: "Intent Classification",
    description: "Function-calling model parses prompt intent and classifies whether to respond directly or dispatch specialist tooling.",
    badge: "Function Calling"
  },
  {
    step: "03",
    title: "Specialist Execution Core",
    subtitle: "AST & AST Static Auditing",
    description: "Routes payload to Laguna-XS code model, Mermaid compiler, Document Press, or SVG Avatar Forge with non-executing safety checks.",
    badge: "AST Verified"
  },
  {
    step: "04",
    title: "Synthesis & Delivery",
    subtitle: "Inline Vector & Export",
    description: "Renders interactive SVG diagrams, downloadable PDF/DOCX files, or syntax-highlighted code directly in the chat stream.",
    badge: "Instant Stream"
  }
];

export const COMPARISON_DATA: ComparisonRow[] = [
  {
    feature: "Tool Dispatch",
    eka: "Automatic Natural Language Handoff",
    traditional: "Manual Slash Commands / Mode Switches",
    advantage: "Zero Friction"
  },
  {
    feature: "Code Reliability",
    eka: "AST Static Syntax Audited before Delivery",
    traditional: "Raw Unverified Code Blocks",
    advantage: "Zero Broken Syntax"
  },
  {
    feature: "Diagram Rendering",
    eka: "Live Native Interactive Mermaid Vector",
    traditional: "Plain Markdown Text Code Blocks",
    advantage: "Visual Clarity"
  },
  {
    feature: "Privacy & Key Control",
    eka: "BYOK Browser Storage (Never Logged)",
    traditional: "Forced Subscription / Centralized Keys",
    advantage: "100% Data Ownership"
  },
  {
    feature: "Document Export",
    eka: "Instant Markdown, DOCX & PDF Engine",
    traditional: "Copy-Paste Plain Text Only",
    advantage: "Production Ready"
  }
];

export const ROADMAP_DATA: RoadmapItem[] = [
  {
    quarter: "Q1 2026",
    status: "completed",
    title: "Agentic Tool Router & Core Architecture",
    description: "Launched Nemotron 3 Super router, AST static code verification, Mermaid diagram engine, and free SVG Avatar Forge."
  },
  {
    quarter: "Q2 2026",
    status: "completed",
    title: "BYOK Security & Document Press",
    description: "Integrated local-storage key encryption, PDF/DOCX document generators, and Web Speech voice input/output."
  },
  {
    quarter: "Q3 2026",
    status: "in-progress",
    title: "Multi-Agent Canvas & Workflow Sandboxing",
    description: "Enabling parallel subagent dispatch, browser-side WebAssembly python execution sandbox, and drag-and-drop workflow node graph."
  },
  {
    quarter: "Q4 2026",
    status: "planned",
    title: "On-Premise Enterprise Agent Runtime",
    description: "Self-hosted Docker runtime, custom local LLM integration via Ollama, and encrypted SQLite sync across devices."
  }
];

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: "code",
    label: "Code Writer",
    toolName: "eka — code writer",
    command: "/code python reverse_linked_list",
    userPrompt: "Write a python function to reverse a linked list",
    aiResponse: `def reverse_list(head):\n    prev = None\n    current = head\n    while current:\n        next_node = current.next\n        current.next = prev\n        prev = current\n        current = next_node\n    return prev\n# ✅ AST Static Syntax Check Passed`,
    badge: "Laguna-XS Engine"
  },
  {
    id: "diagram",
    label: "Diagram Engine",
    toolName: "eka — diagram engine",
    command: "/diagram sequence auth_flow",
    userPrompt: "Sketch a login flow diagram",
    aiResponse: "[User] -> (Enter Credentials) -> [EKA Router] -> (Verify PBKDF2) -> [Dashboard Active]",
    badge: "Mermaid.js Vector"
  },
  {
    id: "doc",
    label: "Document Press",
    toolName: "eka — document press",
    command: "/doc pdf renewable_energy_report",
    userPrompt: "Generate a one-page report on renewable energy as PDF",
    aiResponse: "renewable-energy-report.pdf (Generated & Ready to Download - 248 KB)",
    badge: "ReportLab Engine"
  },
  {
    id: "avatar",
    label: "Avatar Forge",
    toolName: "eka — avatar forge",
    command: "/avatar Nova bottts",
    userPrompt: "Make me an avatar named Nova",
    aiResponse: "Nova (Bottts Vector Style Generated via DiceBear SVG)",
    badge: "DiceBear Engine"
  }
];
