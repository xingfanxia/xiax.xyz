---
title: "The Printing Press Moment"
date: "2026-02-22"
summary: "Coding is the beachhead, not the destination. The paradigm shift has already happened — but the window won't stay open forever."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 8
type: "Post"
status: "Published"
---

## Coding Is the Beachhead

If you think this series is just a "programmers don't write code anymore" story, you're underestimating what's happening.

SemiAnalysis points out in their report: coding is the first beachhead of AI agents disrupting information work, not the endpoint. The real battleground is the global $15 trillion information work market — covering over 1 billion information workers, a third of the global workforce.

Why is coding the starting point? Because nearly all information work shares the same workflow:

**Read** (ingest unstructured information) → **Think** (apply domain knowledge) → **Write** (produce structured output) → **Verify** (check against standards).

This is identical to the software development workflow. If agents can disrupt software development, they can theoretically disrupt all information work.

METR's research shows that AI agent autonomous task horizons are doubling every 4-7 months. The current mainstream level is about 4.8 hours. When that number reaches 8 hours — a full workday — the entire information work landscape will be redrawn.

Boris Cherny predicts this will reshape job titles themselves: "I think we're going to start to see the title software engineer go away. Maybe builder, maybe product manager." At Anthropic, this is already reality — PMs code, designers code, the engineering manager codes, the finance team codes. Everyone ships software. The distinguishing skill isn't writing code; it's understanding systems, users, and problems.

Anthropic clearly sees this too. The launch of Cowork — Claude Code for general computing — signals its formal expansion from serving programmers to serving all information workers. In [Part 4](/when-software-becomes-disposable), Chen Yusen called Claude Code the strongest general agent. Cowork is the direct extension of that judgment: a general agent shouldn't serve only programmers.

This isn't theoretical — it's already happening inside Anthropic. Data scientists use Claude Code for SQL and analysis, the sales team connects it to Salesforce, and the Plugins feature was built entirely by an agent swarm that self-organized over a weekend with almost no human intervention.

The agents have also started operating in human communication channels. Boris describes a common pattern: he asks Claude to build something, it reads the codebase, finds an engineer's name in the git blame, and **messages that engineer directly on Slack** to ask a clarifying question — then continues building once it gets an answer. Claude Code's team uses the Agent SDK to automate code review, security review, issue labeling, and shepherding changes to production. When agents start participating in human social channels and managing development workflows autonomously, the line between "tool" and "colleague" gets very blurry.

When agents start creating agents to complete tasks, the boundaries of "coding" have already blurred.

## The Moats Are Crumbling

What does all of this mean for the existing software industry?

SaaS's three core moats are eroding simultaneously.

**Data lock-in** — user data trapped inside a SaaS system, migration costs prohibitively high. But agents can migrate data across systems, slashing switching costs.

**Workflow lock-in** — users invest significant time learning a product's UI and processes. But agents don't need UI. They understand natural language and execute tasks directly.

**Integration complexity** — connecting different SaaS systems requires specialized development. But MCP enables agents to seamlessly interface with any tool or service.

What is SaaS, fundamentally? It's information workflows crystallized into code, sold on a monthly subscription. But if agents can perform information work directly — without crystallized code — then SaaS's 75% gross margins become a massive arbitrage opportunity.

This resonates directly with [Part 4](/when-software-becomes-disposable)'s "disposable software" thesis. When software can be generated on demand, companies that crystallize workflows into products find their moats are no longer moats.

Microsoft is the most prominent case study. It provides compute to Anthropic and OpenAI through Azure on one side, while watching these customers disrupt its Office 365 and GitHub businesses on the other. Microsoft's Copilot products launched a full year before Claude Code, yet have barely made a dent. But Microsoft's predicament isn't Microsoft's alone — it's the predicament of every seat-based software company.

## The Paradigm Shift Has Already Happened

Looking back at the writing process of this series, I'm a sample of one.

In 2023, I started using Cursor shortly after it launched. Back then it didn't have Agent Mode — just tab completion, helping you continue writing code. But even as just autocomplete, the productivity boost was already obvious. Cursor quickly became my core development tool.

Then I switched to Claude Code. The difference is fundamental — Cursor is still an IDE at its core. It puts you in front of code, lets you see it, edit it, with AI assisting alongside. Claude Code offers a completely different paradigm: you stop staring at code and **focus on describing intent**. You tell it what you want, and it plans, executes, and collaborates across files. Your role shifts from "the person who writes code" to "the person who manages the agent."

At the end of 2025, I built a liuren divination app first, then bazi, MBTI, dream interpretation — all toy-level experiments at first. Then I decided to get serious about building a real product. I bought the panpanmao domain, rewrote the underlying architecture, and unified everything into a single all-in-one app — that's how [PanPanMao](https://www.panpanmao.ai/) began. By early 2026, the pace accelerated. I set up OpenClaw on GCP, connected the agent to Feishu, and non-technical team members started collaborating directly with the agent ([Part 5](/the-last-mile-of-ai) covered this). Anthropic launched Cowork. SemiAnalysis published their report. Top developers spoke up collectively.

This inflection point didn't happen on a single day. It was like water temperature rising — you're soaking in it every day, barely noticing the change. But if 2023-me saw 2026-me, he wouldn't believe that my daily work is just thinking and talking to agents — not writing code.

## The Window

But the beneficiaries of this revolution will be deeply uneven.

Capability? It's here. Claude Code is already the strongest general agent.

Cost? Entry-level is $20 a month — a meal out, a few coffees. Heavy users need the $100-200/month Max Plan, but even that is absurdly cheap relative to the value it generates.

**So why hasn't the agent revolution actually happened yet?**

Because the bottleneck isn't technology or cost — it's **education.**

99.99% of people don't know what AI can do. Of those who do, 99% don't know how to use it effectively. Of those who know how, most still haven't built the mental model that "AI is a collaborator, not a tool." This is a **cognitive funnel.** Every layer bleeds massive attrition.

And the institution that should be addressing this — schools — is walking in the opposite direction. Our education systems still test memorization. They still teach students to answer standardized questions in standardized formats. But that's precisely what AI is best at. The memorization and reproduction skills you spent four years training? An agent does it in a fraction of a second, and does it better than you.

The education system almost entirely ignores what actually matters: **the ability to think independently, to make decisions, to ask the right questions, to be self-driven.** It trains people to be executors, not managers. To memorize answers, not to ask questions.

**AI is a cognitive gap amplifier.** In the past, the productivity difference between a sharp person and an average person was maybe two or three times. But when the sharp person learns to use agents while the average person is still using search engines — that gap might be a hundred times. Not because AI made the sharp person smarter, but because AI tore the chasm between "those who can use it" and "those who can't" wide open.

## The Printing Press

Boris used a historical analogy in his interviews that I find particularly apt. Before Gutenberg invented the printing press, literacy in Europe was below 1%. Fifty years later, more material had been printed than in the previous thousand years combined. A monastery scribe's reaction to the printing press wasn't fear — it was excitement. Because he no longer had to spend his life copying books one by one. He could finally spend his time **thinking about what to write**.

We're standing at the "printing press moment" for code. Writing code is copying. And we're about to become those liberated scribes — no longer needing to hand-write instructions character by character, but instead focusing our energy on **thinking about what to build**.

## Eight Parts, One Throughline

[Part 1](/the-companion-vision), the AI Companion — a companion that truly understands you. Back then it was a "vision." Now Claude Code is the closest thing to it: it understands your working environment, remembers your preferences, collaborates rather than merely executing instructions.

[Part 2](/wearables-and-companions), "democratizing the executive lifestyle" — everyone deserves CEO-level resources. Now $20/month makes that real.

[Part 4](/when-software-becomes-disposable), "disposable software" — one-off applications built for a single person. Claude Code is already doing this routinely.

[Part 5](/the-last-mile-of-ai), "the last mile" — 99.99% of people don't know what AI can do. This remains the biggest bottleneck.

[Part 6](/you-are-the-manager), "you are the manager" — the skill isn't coding anymore, it's managing agents. The competitive edge has shifted.

[Part 7](/why-claude-code), "why Claude Code" — the harness matters more than the model. Orchestration beats generation.

The paradigm shift has already happened. Not "about to happen," not "might happen" — it has happened. 4% of GitHub commits come from Claude Code. Top developers no longer write code by hand. The $15 trillion information work market is being repriced.

Those who know are sprinting. Those who don't are standing still. And that gap widens every day.

The window won't stay open forever.

---

**References:**

- [SemiAnalysis: Claude Code is the Inflection Point](https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point)
- [Inside Claude Code With Its Creator Boris Cherny (YC / Light Cone)](https://www.youtube.com/watch?v=PQU9o_5rHC4)
