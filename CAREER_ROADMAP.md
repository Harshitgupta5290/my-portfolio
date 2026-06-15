# Career Roadmap — Harshit Gupta
> Updated: June 2026 | Target Role: Agentic AI Engineer | Goal: Top 1% — $200K–$400K+

---

## Why Agentic AI Engineer, Not Just "AI Engineer"

The market split is happening right now:

| Role | What You Build | Salary Ceiling |
|---|---|---|
| AI Engineer (generic) | LLM integrations, RAG, wrappers | $120K–$170K |
| **Agentic AI Engineer** | Autonomous agents, multi-agent systems, tool use, memory, planning | **$200K–$400K+** |
| AI Research Scientist | Papers, models, novel architectures | Requires PhD |

**The bet**: Companies are desperately hiring engineers who can build systems where AI *acts* — not just answers. Agents that use tools, plan across steps, call APIs, spawn sub-agents, and recover from failures. This is the highest-paying sub-specialty you can reach without a PhD.

---

## What Top 1% Actually Looks Like (Honest)

- 50% — You have shipped agentic AI systems that handle non-trivial real-world tasks (not chatbots)
- 20% — You can pass technical interviews at high-signal companies (systems design + LLM depth + Python)
- 15% — Hard certs that require you to *write code*, not guess multiple choice
- 10% — You have public evidence: GitHub, OSS contributions, blog posts, or conference talks
- 5%  — You can articulate trade-offs clearly (why LangGraph over AutoGen for this use case, etc.)

**The trap**: Collecting certs without shipping agents = resume padding that senior interviewers see through.
**The play**: Build working agentic systems first. Certs validate, they don't substitute.

---

## Current Strengths

- Oracle AI certs (RAG, Vector DB, OCI) — real and current
- Backend depth: Flask, MySQL, PostgreSQL, Python
- Full-stack breadth + AI/ML trajectory already started
- Live project: rechr (https://rechr.vercel.app)

---

## Budget Philosophy

> Every rupee/dollar spent should unlock something that cannot be learned for free.

**Free (zero cost) — use these first:**
- LangChain / LangGraph docs (better than any paid course)
- Anthropic docs + Claude API free credits
- Groq free tier (fast inference for agents)
- HuggingFace courses (free, excellent)
- NeetCode.io free tier (150 problems)
- Andrej Karpathy's YouTube (transformers from scratch)
- fast.ai (practical deep learning, free)
- deeplearning.ai free audit option

**Only pay for:**
- Certification exams (after you're ready, not before)
- Coursera subscription ($50/mo) only when actively completing a Meta Professional cert — cancel after

**Total budget across all 3 phases: ~$1,500** (down from $3,000+ if you buy courses blindly)

---

# PHASE 0 — Interview Readiness Foundation
> Do this in parallel with everything else. Most people skip this and fail interviews even with good skills.
> Timeline: Start now, ongoing forever | Budget: $0

## Strategy: Target No-DSA AI Companies

DSA (LeetCode-style algorithmic interviews) is required at FAANG SWE pipelines. It is **not** required at most high-paying AI companies. The strategy is simple: don't apply to companies that do it.

**Companies that do NOT require heavy DSA for AI Engineer roles:**
- Anthropic — practical coding + system design + LLM depth
- Cognition, Cursor, Glean, Harvey AI, Cohere — take-home project or "build with our API"
- Any YC-backed AI startup under 500 people — they want to see you ship things
- Remote-first AI product companies — most use portfolio + take-home screening

**What these companies test instead:**
- Write basic Python (not algorithmic — parsing, API calls, data wrangling)
- Walk me through how you built your agent project (your own code, your decisions)
- System design for an AI system (you design something, explain trade-offs)
- Take-home: build a small working agent in 3–5 days using their stack
- LLM depth questions (these are unavoidable — see section below)

**What this means for you:** Ship a great agentic project. Know it deeply. Know the AI/LLM fundamentals cold. You don't need to sort a binary tree to make $200K as an Agentic AI Engineer.

### LLM & Agent Technical Depth (What Separates You)

These are the questions that decide if you get the high-comp offer:

**Must be able to answer cold:**
- How does transformer attention work? What is KV cache?
- What is RAG? What are its failure modes? How do you evaluate it?
- How does function/tool calling work at the API level?
- What is ReAct pattern? How does an agent decide when to use a tool?
- What is the difference between LangGraph and LangChain? When would you use each?
- How do you handle agent memory? Short-term vs long-term vs episodic?
- How do you prevent prompt injection in agentic systems?
- What is MCP (Model Context Protocol) and why does it matter?
- How do you evaluate an agent? What metrics matter?
- What are the latency/cost trade-offs in multi-agent vs single-agent architectures?
- How does streaming work with LLMs? What is token streaming vs structured output?
- What is fine-tuning vs RAG vs prompt engineering — when to use each?

**How to build this:** Build agents. Every question above is answered by building something that breaks.

### System Design for AI (High-Signal Round)

Senior AI Engineer interviews always include a system design round. These are the most common:

1. **Design a document Q&A system** (RAG pipeline at scale — 10M documents)
2. **Design an autonomous coding agent** (tool use, sandboxing, memory)
3. **Design a multi-agent customer support system** (routing, escalation, human-in-loop)
4. **Design a real-time AI data pipeline** (streaming, latency, cost)
5. **Design a production LLM serving system** (caching, batching, fallbacks)

**How to prepare:**
- Read: "Building AI Systems" patterns on LangChain blog, Anthropic engineering blog
- Study: How Cognition (Devin), Cursor, and Linear AI actually work architecturally
- Practice: Draw the diagram. Explain the trade-offs out loud. Time yourself to 45 minutes.

**Resource:** Anthropic engineering blog (free), LangChain blog (free), ByteByteGo (system design fundamentals, has free YouTube)

### Behavioral (Often Ignored, Often Eliminates)

Agentic AI companies are small and high-trust. They probe for:
- Ownership: "Tell me about a system you built that failed in production."
- Depth: "Walk me through a technical decision you made that you'd do differently."
- Curiosity: "What agent architecture problem are you thinking about right now?"

Prepare 5 STAR-format stories. Write them down. Practice saying them aloud.

---

# PHASE 1 — Defensible Foundation
> Close all obvious gaps. Every skill has proof.
> Timeline: 2–3 months | Budget: ~$200

## Certifications

| # | Certification | Issuer | Cost | Time |
|---|---|---|---|---|
| 1 | **Redis University RU101** | Redis | **Free** | 4 hrs |
| 2 | **MongoDB Associate Developer** | MongoDB University | **Free** | 1–2 days |
| 3 | **AWS Certified AI Practitioner (AIF-C01)** | AWS | $150 | 1–2 wks |
| 4 | **Meta Front-End Developer Professional** | Meta / Coursera | ~$50/mo | 7 months |

> Skip AWS Cloud Practitioner — AI Practitioner covers same ground plus AI.
> Meta Front-End: only pay Coursera when actively working through it. Cancel when done.
> Free prep for AIF-C01: AWS Skill Builder free tier. Only buy exam when ready.

## Projects — Phase 1

**1. RAG Document Q&A App** (Biggest credibility gap — build this first)
- Upload PDFs → ask questions → cited answers with sources
- Stack: Python + Claude API (cheapest) or OpenAI + ChromaDB + FastAPI + React
- Must have: live URL, source citations, evaluation metrics displayed
- Backs all 3 Oracle AI certs immediately

**2. Deploy 4–5 Existing Projects**
- ViBlog, TRAVELIX, Flask Login, rechr → Vercel (free) or Railway (free tier)
- Every portfolio project needs a clickable live URL

**3. CI/CD on 2–3 Repos**
- GitHub Actions only (free) — lint + test on push
- Repos: RAG app, rechr, one other

## Priority Order

```
Week 1–2:   Redis RU101 + MongoDB cert                  (free, fast, done)
Week 2–4:   Deploy all existing projects with live URLs  (1 weekend seriously)
Week 3–8:   Build RAG Document Q&A App (with UI)         (most important)
Week 4–8:   AWS AI Practitioner study (free prep)
Week 8–10:  AWS AI Practitioner exam                     ($150)
Week 10+:   Meta Front-End (self-paced, cancel Coursera when done)
```

---

# PHASE 2 — Agentic AI Engineer (The Target)
> This is the money phase. This is where you get the high-comp offers.
> Timeline: 3–9 months after Phase 1 | Budget: ~$700

## Core Agentic AI Skills to Master (All Free)

Before touching certs in this phase, build real agent systems using:

| Framework | What It's For | Why It Matters |
|---|---|---|
| **LangGraph** | Stateful, graph-based agent orchestration | Standard at companies building production agents |
| **Anthropic Claude API** | Tool use, multi-turn, vision, extended thinking | Highest-quality agent reasoning; most agentic companies use it |
| **OpenAI API (function calling)** | Structured tool calling, parallel tool use | Must know both; different strengths |
| **Pydantic AI** | Type-safe agent development | Used heavily in production Python agent systems |
| **MCP (Model Context Protocol)** | Standardized tool/context protocol | New standard Anthropic pushed; most companies adopting |
| **LlamaIndex** | Data-heavy RAG pipelines, knowledge graphs | Better than LangChain for document-heavy use cases |
| **CrewAI or AutoGen** | Multi-agent orchestration | For systems where multiple agents collaborate |

**Free resources:**
- LangGraph tutorials: langchain-ai.github.io (free, official, excellent)
- Anthropic docs (tool use, agents): docs.anthropic.com (free)
- deeplearning.ai "AI Agents in LangGraph" (free to audit)
- deeplearning.ai "Multi AI Agent Systems" (free to audit)
- Groq free tier: use for fast agent iteration without API cost

## Certifications — Phase 2

| # | Certification | Issuer | Cost | Why |
|---|---|---|---|---|
| 1 | **AWS Solutions Architect Associate (SAA-C03)** | AWS | $150 | Foundation for all AWS AI services |
| 2 | **IBM RAG and Agentic AI Professional Certificate** | IBM / Coursera | ~$150 | Fastest route to "Agentic AI" on cert stack |
| 3 | **AWS Machine Learning Engineer Associate (MLA-C01)** | AWS | $300 | Validates ML pipeline depth |
| 4 | **TensorFlow Developer Certificate** | Google | $100 | Coding exam — hard to fake, high signal |
| 5 | **Meta Back-End Developer Professional** | Meta / Coursera | ~$50/mo | Completes full-stack picture |

> IBM RAG and Agentic AI: moved from Phase 3. Do this early — it directly targets the role title you want.
> TensorFlow cert: you write actual code in a time-boxed exam. Rare signal.
> AWS GenAI Developer Professional (AIP-C01): skip for now — too new, too easy, low signal.

## Projects — Phase 2 (These Get You Offers)

**1. Production Agentic AI System** — the most important project on the entire roadmap

Pick ONE real problem and build an agent that actually solves it autonomously:
- Customer research agent: given a company name, it browses web, reads docs, synthesizes a brief
- Code review agent: reviews PRs, catches issues, posts comments on GitHub
- Data extraction agent: given any website, extracts structured data reliably
- Personal finance agent: reads bank statements, categorizes, detects anomalies, reports

Requirements (non-negotiable):
- Uses tool calling (web search, code execution, or external APIs — real calls, not mocked)
- Has memory across sessions (short-term + some form of long-term)
- Has a real UI (not a CLI demo)
- Handles failures gracefully (retry logic, fallback, user escalation)
- Has an evaluation system (you can measure if it's working)
- Live URL. Real users (even 10 is fine).

Stack: Python + LangGraph + Claude API + FastAPI + Next.js + PostgreSQL + Vercel + Railway

**2. Multi-Agent System with Visible Orchestration**
- Two or more agents that collaborate: one plans, one executes, one evaluates
- The UI should show the agent reasoning — what each agent decided, what tools it called
- This demonstrates you understand the orchestration layer, not just prompting

**3. Open-Source Contribution to an Agentic Framework**
- Target: LangChain, LangGraph, LlamaIndex, Pydantic AI, or MCP ecosystem
- Find a real bug you hit while building above projects. Fix it. Open a PR.
- One merged PR signals more than 5 solo projects.

## Priority Order

```
Month 1:    Master LangGraph + Claude tool calling (build as you learn)
Month 1:    IBM RAG and Agentic AI cert (Coursera, fast-track it)
Month 1–2:  AWS SAA-C03 study (free: ExamPro on YouTube, Adrian Cantrill free content)
Month 2:    AWS SAA-C03 exam ($150)
Month 2–4:  Build Production Agentic AI System (the career-defining project)
Month 3–4:  TensorFlow Developer Certificate ($100)
Month 4–5:  AWS MLA-C01 ($300 — only after SAA, leverages same knowledge)
Month 5–6:  Build Multi-Agent System with UI
Month 6+:   Meta Back-End cert (self-paced alongside above)
Month 6+:   Open-source contribution (ongoing — start early)
Parallel:   System design practice — 1 AI system design per week (free, just draw + explain out loud)
```

---

# PHASE 3 — Top 1% Global Tier
> Certs that almost nobody has. Projects that have no Stack Overflow answers.
> Timeline: 6–18 months after Phase 2 | Budget: ~$600

## Certifications — Phase 3

| Certification | Issuer | Cost | Why |
|---|---|---|---|
| **NVIDIA Agentic AI Professional (NCP-AAI)** | NVIDIA | $200 | Launched 2026 — almost nobody has it. First-mover. |
| **NVIDIA GenAI LLMs Professional (NCP-GENL)** | NVIDIA | $200 | Pairs with NCP-AAI, validates LLM production depth |
| **AWS Solutions Architect Professional (SAP-C02)** | AWS | $300 | <15% of AWS cert holders reach this tier. Median salary $221K. |
| **Google Cloud Professional ML Engineer** | Google | $200 | Validates GCP-specific ML infrastructure |
| **Databricks ML Professional** | Databricks | $200 | Enterprise ML standard — MLflow, Feature Store, distributed training |

> Skip Google Cloud Architect unless you have a specific reason — SAP-C02 is higher signal for the money.
> Azure path (AZ-305, AI-103): only if you're targeting Microsoft or large enterprise clients.

## Projects — Phase 3

**1. Agentic AI Product With Real Traction**
- Not a demo. Not a portfolio piece. An actual product people use.
- Fine-tune or distill a model for a specific domain if it gives a performance edge
- Build a custom evaluation framework — know exactly where your agent fails and why
- Aim for 100+ active users or $100 MRR. Either one signals product-market fit.

**2. Published Technical Content With Depth**
- Not a tutorial. Not a summary of docs.
- A post about something non-obvious you discovered building your agent system
- "Why ReAct fails for long-horizon tasks and what we built instead"
- Post to: dev.to (free), HN (free), your own blog (free with GitHub Pages)

**3. Conference Talk or Podcast**
- Python/AI meetup, local tech conference, or guest on an AI engineering podcast
- Topic: something you built, not something you read about

---

# Interview Preparation — Company Targeting

## Companies to Target (Ranked by Comp + Agentic AI Fit)

### Tier 1 — $250K–$500K+ (Frontier)
| Company | What They Build | How to Get In |
|---|---|---|
| Anthropic | Claude, MCP, agent infrastructure | OSS contributions, deep Claude API knowledge |
| OpenAI | GPT, Agents SDK, function calling | Top-tier DSA + LLM research depth |
| Cognition | Devin (coding agent) | Strong agent systems + code generation background |
| Cursor | AI-first code editor | Strong TypeScript + agent UX background |

### Tier 2 — $180K–$280K (High-Growth AI Startups)
| Company | What They Build | What They Look For |
|---|---|---|
| Glean | Enterprise AI search + agents | RAG + enterprise knowledge graphs |
| Harvey AI | Legal AI agents | Domain-specific agents + reliability |
| Scale AI | AI training data + RLHF | Data pipelines + LLM evaluation |
| Cohere | Enterprise LLMs | LLM serving + fine-tuning |
| Mistral | Open LLMs | Python + distributed ML |

### Tier 3 — $140K–$200K (Big Tech AI Teams)
| Company | Team | Notes |
|---|---|---|
| Google | DeepMind, Google AI | Strongest if you have GCP certs |
| Microsoft | Azure AI, Copilot | Strongest if you have Azure certs |
| Meta | LLaMA, AI Research | Open-source contributions help |
| Amazon | AWS AI/ML, Alexa | Strongest with AWS certs |

### Tier 4 — $120K–$160K (Remote-First AI Companies)
Any YC-backed AI startup, AI-native SaaS companies. These are the fastest to interview and highest hit rate early in the journey.

## Interview Process Breakdown

**Agentic AI Engineer interview typically has 4 rounds:**
1. **Recruiter screen (30 min)** — background, why AI, what you've built
2. **Technical screen (60 min)** — LeetCode medium + LLM knowledge questions
3. **System design (60 min)** — Design an agent system (prepare the 5 from Phase 0)
4. **Final/culture (60 min)** — Behavioral + deep-dive on one of your projects

**What wins round 3 (system design):**
- You have actually built what you're designing
- You know the failure modes from experience
- You talk about cost, latency, and reliability — not just functionality

## Before Any Interview — Checklist

- [ ] Live demo of your most impressive agentic project ready to share screen
- [ ] Can explain every technical decision in that project in detail (why LangGraph, why this memory design, how you handle failures)
- [ ] Can answer all LLM depth questions from Phase 0 without hesitation
- [ ] 5 STAR behavioral stories written and practiced
- [ ] Read company's engineering blog (shows genuine interest)
- [ ] Know which LLM the company uses in production and why

---

# Full Credential Stack

```
AGENTIC AI (The Priority Track)
├── IBM RAG and Agentic AI Professional              Phase 2  ← moved up
├── NVIDIA Agentic AI Professional (NCP-AAI)         Phase 3  ← first-mover
└── NVIDIA GenAI LLMs Professional (NCP-GENL)        Phase 3

CLOUD + ARCHITECTURE
├── AWS AI Practitioner (AIF-C01)                    Phase 1
├── AWS Solutions Architect Associate (SAA-C03)      Phase 2
├── AWS ML Engineer Associate (MLA-C01)              Phase 2
├── AWS Solutions Architect Professional (SAP-C02)   Phase 3
├── Google Cloud Professional ML Engineer            Phase 3
└── Databricks ML Professional                       Phase 3

FULL STACK
├── Meta Front-End Developer Professional            Phase 1
└── Meta Back-End Developer Professional             Phase 2

ML / CODING
└── TensorFlow Developer Certificate                 Phase 2

FOUNDATION (Fast + Free)
├── Redis University RU101                           Phase 1
└── MongoDB Associate Developer                      Phase 1
```

---

# Budget Breakdown

| Phase | Cert Exams | Tools/Subscriptions | Total |
|---|---|---|---|
| Phase 0 | $0 | $0 (NeetCode free tier) | **$0** |
| Phase 1 | $150 (AWS AIF) | ~$50 (1 month Coursera) | **~$200** |
| Phase 2 | $700 (SAA + MLA + TF + IBM) | ~$100 (Claude/OpenAI API for building) | **~$800** |
| Phase 3 | $900 (SAP + NVIDIA x2 + GCP + Databricks) | $0 | **~$900** |
| **Total** | | | **~$1,900** |

**Where NOT to spend:**
- Don't buy Udemy courses — YouTube + official docs are better
- Don't buy LeetCode Premium — NeetCode free + Leetcode free is enough
- Don't buy prep books for AWS exams — AWS Skill Builder free tier is sufficient
- Don't use OpenAI API for building and testing agents — Groq free tier + Claude free credits are cheaper
- Don't pay for cloud infrastructure while building — Vercel free, Railway free tier, Supabase free tier

---

## Salary Reality

| Milestone | Typical Role | Salary Range (USD) |
|---|---|---|
| Phase 1 complete + 1 live agent project | AI Developer / ML Engineer | $80K–$120K |
| Phase 2 complete + production agentic system | Agentic AI Engineer | $140K–$200K |
| Phase 2 + strong interview skills + big tech offer | Senior AI Engineer | $200K–$280K |
| Phase 3 complete + OSS contributions + content | Staff / Principal AI Engineer | $280K–$400K+ |

> The jump from $120K to $200K+ is entirely driven by: (1) shipping a real agentic system, (2) being able to pass the system design round, and (3) targeting the right companies. Certs alone do not get you there.

---

## What Not To Do

- Don't build chatbots and call them "agents." Interviewers know the difference.
- Don't use LangChain for everything — know when LangGraph is better, when raw API calls are better.
- Don't skip the UI — a CLI demo is not a portfolio project. Real products have interfaces.
- Don't front-load certifications — one shipped agentic system is worth 5 certs to a senior hiring manager.
- Don't collect Practitioner-tier certs — they don't unlock salary jumps.
- Don't use paid courses when docs exist — LangGraph docs, Anthropic docs, FastAPI docs are better than any course.
- Don't interview before your agent project is live — you need something impressive to demo.
- Don't ignore the behavioral round — at high-comp companies, it eliminates more candidates than the technical rounds.
