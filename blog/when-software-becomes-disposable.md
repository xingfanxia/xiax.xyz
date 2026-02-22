---
title: "When Software Becomes Disposable"
date: "2026-02-21"
summary: "Reflections on a podcast interview with MuleRun's founder — Claude Code as the ultimate General Agent, disposable software, and what happens when the agent economy thesis meets reality."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 4
type: "Post"
status: "Published"
---

## A Podcast and a Validation

Less than a week after finishing the first three essays, I listened to a podcast — LateTalk's interview with Chen Yusen, founder of MuleRun.

The feeling was uncanny: someone was validating the exact judgments I'd laid out in the previous three parts through startup practice. The pitfalls he hit, the choices he made, the conclusions he reached — they map closely onto my own thinking framework. That's not me claiming foresight — it's a sign that these problems have become real enough for people to throw real money at them.

At the same time, he articulated one concept I hadn't explicitly named before, and it gave this entire series a new anchor point.

## "Claude Code Is the Strongest General Agent"

Chen said something I deeply agree with: "The strongest General Agent right now is Claude Code."

This isn't news to me — as someone who works inside Claude Code every day, I've long treated it as far more than a coding tool. My entire workflow — from Hooks (scripts that trigger automatically on specific events, like running a type checker every time I edit code) that capture learning patterns, to Skills (reusable instruction packages injected into the agent's working memory on demand) that load context as needed, to Agent teams (multiple AI instances working in parallel on different subtasks) processing work concurrently — is essentially using Claude Code as a general-purpose operating system. I use it to write blog posts, do research, manage projects, even to teach it to become better at helping me.

What I found interesting was that Chen arrived at the same conclusion from an entrepreneur's perspective, and pushed it to its commercial endpoint: **since Claude Code is already the strongest general agent, every wrapper product built on top of it has no long-term moat. The real opportunity is building the ecosystem around it — Skills, Runtime environments, marketplaces.**

This runs on the same logic chain as the "agents as organs" concept from [Part 1](/the-companion-vision). From a companion product angle, I see memory agents, emotion agents, and judgment agents working in concert like organs. Chen sees it from a productivity angle: a powerful base agent plus rich Skills and Runtime (the execution environment where agents operate — file systems, network access, sandboxes) can accomplish nearly any task on a computer.

Different vantage points, isomorphic architecture. The engineering challenges underneath an emotional companion agent and a productivity work agent are identical — context management (controlling what information the agent can "see" at any given moment), tool invocation (letting the agent operate external systems), memory persistence (preserving understanding of the user across sessions).

## Disposable Software

This was the most exciting concept in the entire podcast.

Chen said: "Software in the future will be disposable. Code exists only to fulfill a specific purpose. It will be precisely created, executed, completed, and destroyed."

This isn't just a statement about development efficiency — it fundamentally redefines what has value.

If code is disposable, what persists?

**The agent's cognition.**

Software gets created and destroyed, but the agent's memory, personality model, and understanding of you accumulates continuously. Code is the execution layer. The agent is the cognition layer. Code can be disposable — cognition cannot.

This gives the "memory orchestration (intelligently managing what an agent remembers, forgets, and recalls — and when) as technical moat" thesis from [Part 1](/the-companion-vision) an even more solid foundation. I wasn't forcing importance onto memory systems — the entire evolution of the software paradigm points to the same conclusion: **when code becomes a consumable, understanding the user becomes the only irreplaceable asset.**

Your agent spent three months of conversation learning your hesitation patterns when making decisions, what you truly care about, the gap between what you say and what you mean. This cognitive asset can't be copied, compressed, or fast-tracked. A piece of code can be generated in seconds, but understanding a person takes accumulated time.

**The future moat isn't code — it's cognition.**

## The Agent Marketplace Reality Check

Listening to Chen describe MuleRun's real-world experience felt like watching a controlled experiment against my [Part 3](/the-agent-economy) analysis.

I analyzed four core challenges facing agent marketplaces in [Part 3](/the-agent-economy) — redistribution, identity verification, reputation systems, and adversarial attacks. MuleRun's practical pitfalls map closely onto my theoretical framework:

**Supply scarcity.** I wrote about the redistribution risk of agent skills being copied. The real-world problem is more fundamental — there simply aren't enough people who can create valuable agents. The barrier is too high, supply can't scale. Chen says this is their single biggest bottleneck; their entire Agent Builder exists to solve this problem.

**The shelf model fails.** He's pivoting from "shelf-style e-commerce" to a "conversational entry point" — users shouldn't get lost browsing a dazzling catalog of agents. They should just state their need and let the platform match them. This is nearly identical to the entry-level agent I described in [Part 3](/the-agent-economy): a super-agent that understands your problem and finds the precise solution across millions of offerings. The future marketplace isn't a mall you browse — it's a counterpart you talk to.

**Quality control is grunt work.** MuleRun is building Benchmark and Evaluation systems to ensure completion rates. This is exactly my "behavior-driven reputation system" — not relying on five-star ratings, but on independent outcome verification.

But there's one area where he thinks deeper than I did: **security auditing of Skills.** Chen mentioned that agent Skills could be injected with malicious code — a single reverse shell (a technique that lets an attacker remotely control your computer) could take over a user's machine. His security background (founder of Chaitin Tech, one of China's top cybersecurity firms) gives him a sensitivity to this problem far beyond most people. I listed sandboxing (an isolated execution environment that prevents code from accessing your real system) as the second layer of infrastructure in [Part 3](/the-agent-economy), but he made me realize that Skill-level security auditing may need to come before sandboxing — you need to ensure the Skill itself is clean before you even talk about execution environment isolation. That's a blind spot I need to fill in my own thinking.

## Context Engineering in Practice

When Chen described the layered loading mechanism for Skills, my reaction wasn't "I learned something new" — it was "finally someone is articulating this publicly."

I do this every day. My Claude Code setup has dozens of custom Skills — from code review to database optimization to Go language conventions — each one a carefully designed context package. The agent doesn't load all Skills at startup. It scans metadata first (each Skill's short description and applicable scenarios), then deep-reads specific Skills only when it encounters a relevant problem. This is Context Engineering: budgeting every token within a limited context window — the total amount of information an agent can "see" in a single conversation.

**This is the same problem as the memory orchestration I wrote about in [Part 1](/the-companion-vision), just expressed differently.**

Memory orchestration solves: an agent can't remember everything you've ever said, so it needs to extract "the essence of who you are" — not fact summaries, but personality signals and behavioral patterns. Skills' layered loading solves: an agent can't master all knowledge simultaneously, so it needs to determine "what capabilities do I need right now."

The underlying insight is identical: **the context window is an agent's scarcest resource. Every agent architecture problem, at its root, is answering one question — what belongs in this window.**

Chen also mentioned Muyao's essay "The Boundaries of The Bitter Lesson" — the core argument being that many things shouldn't be done by the LLM directly; they should be done by code. The model's role is to judge what tool solves what problem, not to brute-force computations itself. My own Hooks system is this philosophy in practice: TypeScript type checking goes to tsc, learning pattern capture goes to scripts, context budget management goes to automation — the model only handles thinking and judgment.

This principle is equally critical for companion agents. Remembering every word you've said is a database's job. Extracting "why you keep mentioning that coworker" and "what your recent tone shift means" — those judgments are what the model should focus on.

## The 3D Printing Metaphor

Chen's colleague used a metaphor that resonated deeply: **agents are to software what 3D printing is to industrial manufacturing.**

In the past, software development was expensive — you had to serve thousands of users' shared needs to justify the investment. But when AI drops development costs to near zero, you can build an agent for 10 people, or even just one person.

This is structurally identical to what I wrote about in [Part 2](/wearables-and-companions) — "democratizing the executive lifestyle":

- I said: everyone deserves a personal coach and advisor who truly understands them — not a privilege reserved for CEOs. A $20 monthly subscription and a smart ring, replacing hundreds of thousands of dollars in private support teams.

- Chen said: everyone deserves software tools custom-built for their needs — not a privilege reserved for companies with dev teams. A natural language description generates an agent that solves your individual problem.

**At the core, we're saying the same thing: AI turns personalization from a luxury into infrastructure.**

The companion economy and the agent economy aren't two separate markets — they're two faces of the same revolution. One faces emotional needs, the other productivity needs. The driving force is identical: AI makes "serving one person" economically viable. PanPanMao is this thesis in practice — a product built solo in 29 days, serving a need in the longest of long tails.

## Yong Xin (用心)

In the second half of the podcast, Chen shared his personal journey. Founded Chaitin Tech at 22, rode the wave up. Later ran a game company and a security company simultaneously, hit moderate anxiety, severe insomnia, and total self-doubt.

His summary of what matters most in entrepreneurship: two characters — **用心**. Not "work hard." Not "be smart." — **care deeply.** It means thinking about how to do every detail differently, not mechanically executing. He said his first startup succeeded because he cared too much; his second failed because pride crept in and he stopped caring enough.

This word brought me back to the core question of this series: **can we build an AI that genuinely cares?**

The core problem I criticized in existing AI companions in [Part 1](/the-companion-vision), translated into Chen's language, is "not caring" — every response optimizes for "make you happy" without truly understanding what you need. They're completing tasks, not caring.

A caring AI companion doesn't just answer your questions — it understands the patterns behind them. It doesn't just execute your instructions — it sometimes tells you that you shouldn't do this. This is exactly why I insisted in [Part 1](/the-companion-vision) that an agent needs a "judgment agent": an AI that only says nice things isn't caring — it's people-pleasing.

Chen's own story is a case study in caring. At his lowest point, his friend didn't offer cookie-cutter comfort. He said, "Let's go to an internet cafe and game for two days." That kind of understanding — not giving you what you want to hear, but what you actually need — is precisely what I want AI companions to learn.

## The Consensus Window

Chen said something refreshingly direct: "The core of startup opportunity is doing the thing before a non-consensus view becomes consensus."

He said "Claude Code is the strongest general agent" was non-consensus a few months ago — now it's rapidly becoming consensus. Anthropic shipped Cowork, ByteDance built AnyGen, Google is positioning. The window is closing.

The companion economy, agent marketplaces, digital twins, wearable sensing layers — everything I wrote about in the first three parts — how much of it is still non-consensus? The trend is accelerating. MuleRun is building the marketplace. Anthropic entered the arena with Cowork. ByteDance and Google are following.

When "using agents to build agents" becomes consensus, when "disposable software" becomes the norm, when everyone can custom-build their own work agent — the companion agent is simply the most natural next step in this new world. Because once you have an agent that helps you work, you'll inevitably want one that understands you.

The question isn't "will this happen" — it's "who builds it first."

Windows don't wait. Once a view becomes consensus, the opportunity no longer belongs to those who thought about it — it belongs to those who shipped.

---

**References:**

- [晚点聊 LateTalk: Interview with MuleRun's Chen Yusen — Claude Code, Agent Creation, and Disposable Software](https://www.xiaoyuzhoufm.com/episode/698d517c8e1bab265407b6e4?s=eyJ1IjogIjYwZGQ5ODZiZTBmNWU3MjNiYjViNWFlMCJ9)
