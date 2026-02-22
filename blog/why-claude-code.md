---
title: "Why Claude Code"
date: "2026-02-22"
summary: "SemiAnalysis calls Claude Code the inflection point for AI agents. As someone who works inside Claude Code every day, I want to explain why Anthropic built it, and what it actually changed."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 6
type: "Post"
status: "Published"
---

## A Report, a Number

In early February, SemiAnalysis published a report: "Claude Code is the Inflection Point."

One number is worth singling out: as of February 2nd, Claude Code's daily code commits account for 4% of all GitHub public commits. At its current trajectory, that number will exceed 20% by the end of 2026.

4% doesn't sound like much. But GitHub has tens of millions of active developers. This means a single product — a command-line tool launched just 13 months ago, not an IDE, not a SaaS platform, a terminal CLI — has already left a non-trivial mark on the world's codebase.

And it's not just commits. Mercury's data shows 70% of startups now choose Claude as their primary model. NASA used Claude Code to plot the trajectory for the Perseverance Mars rover — the team printed posters of it because, as Boris put it, "this is just the coolest thing." From YC startups to Mars missions, the footprint is wider than any single metric captures.

As someone who works inside Claude Code every day, this number doesn't surprise me. What surprises me is that mainstream analysts are finally taking it seriously.

## The Model Didn't Change — It Got a Harness

SemiAnalysis used an analogy I think nails it: the ChatGPT era is Web 1.0, the Claude Code era is Web 2.0.

Web 1.0 was static pages — you send a request, the server returns a page. TCP/IP was the underlying protocol, but the real trillion-dollar value came from the dynamic applications built on top of it: search engines, social networks, e-commerce platforms.

The ChatGPT API is AI's TCP/IP. You send a text, the model returns a text. Call and response, back and forth. The model's capabilities are there, but it's being treated as a raw commodity.

Claude Code does something fundamentally different. It wraps the model in a **harness** — reading the codebase, formulating execution plans, invoking tools, running commands, verifying results, self-debugging, iterating until the task is complete. The underlying model is the same, but the harness pulls the model's potential from "answering questions" to "completing tasks."

Boris Cherny — Claude Code's creator — told an origin story in recent interviews that perfectly illustrates this. In September 2024, he was just trying out Anthropic's API, so he wrote the simplest possible terminal chat program in TypeScript. Then he gave the model a Bash tool — purely because that's what the documentation example showed. The model could now read files and execute commands. He casually asked: "What music am I listening to?"

The model wrote an AppleScript, took control of his Mac, queried the music player, and told him the name of the song playing. This was still Sonnet 3.5 — a model that looks quite limited by today's standards. Nobody taught it to do this. Nobody wrote "please control the user's computer" in the prompt. Once given the tool, **the model figured out on its own how to use it to complete the task**. Boris said it was the first time he truly felt AGI: "This model just wants to use tools. That's all it wants to do."

The harness doesn't force the model to do things — it makes possible what the model already wants to do.

This is the core of the paradigm shift. Not that the model got smarter — but that **we finally learned how to harness it**.

In the ChatGPT era, 90% of the model's capability was wasted. You ask a question, it gives an answer, then waits for your next question. Between each turn, all context, judgment, and intermediate state gets discarded. What Claude Code's harness does is: keep the model working continuously, maintain state across multiple steps, self-adjust when hitting obstacles, and keep converging on the goal. The model's intelligence didn't change, but utilization went from 10% to 90%.

Most people — the 99.99% I discussed in [Part 5](/the-last-mile-of-ai) — still think of AI as "a slightly smarter search engine." But Claude Code has already proven that AI can be an executor. You give it an objective, it gives you an outcome.

## Why Anthropic

This question is worth unpacking.

It's not because Anthropic has the strongest model — on benchmarks, the gap between top models keeps narrowing. It's not because Anthropic has the most compute — OpenAI still leads there. It's not because Anthropic has the largest user base — ChatGPT's MAU dwarfs Claude's.

Anthropic got one thing right: **it saw that orchestration matters more than generation.**

While the rest of the industry was racing to squeeze two more percentage points on benchmarks, Anthropic was asking a different question: how do you make a model actually do things for people?

The answer wasn't a better chat interface. It wasn't a prettier IDE plugin. It was a terminal tool — a seemingly "primitive" command-line interface.

And this choice wasn't even deliberate. Boris said in interviews that he made Claude Code a terminal program purely because he was the only person on the team at the time — he didn't need or have time to build a UI. It was originally just a prototype, the cheapest possible starting point. But they stayed in the terminal for a surprising reason: the model was improving so fast that they felt any UI would be obsolete within six months. The terminal's "primitiveness" actually made it the most durable form factor.

The adoption trajectory confirmed it. Two days after the first prototype, Boris's teammate Robert was already using it to code — without being asked. When Anthropic prepared to launch externally, CEO Dario Amodei looked at the internal usage chart and asked: "The DAU chart is vertical. Are you forcing engineers to use it?" Boris: "No. I just posted about it and they've just been telling each other about it." The product sold itself.

This choice is counterintuitive. IDE plugins feel friendlier, more "product-like." But terminal means **full computer access**. An agent in the terminal isn't assisting you in a sandboxed code editor — it's operating autonomously across your entire computing environment. Reading the file system, running shell commands, calling APIs, deploying services. The action space is unlimited.

The Cursor and Copilot paradigm: human writes code, AI assists.

The Claude Code paradigm: **human describes intent, AI executes.**

This isn't a feature gap. It's a fundamental paradigm gap.

Another thing unique to Anthropic is its judgment about the model capability curve. Boris says Claude Code's team lives by a core belief: **don't build for today's model — build for the model six months from now.** When Claude Code first launched, the model could only write about 10-20% of Boris's code. The product wasn't great. But they were betting the model would improve — and they knew it would, because Anthropic's three co-founders are the first three authors of the Scaling Laws paper. Exponential growth isn't a belief for them; it's daily experience.

On the wall of the Claude Code team's office hangs a framed copy of Rich Sutton's "The Bitter Lesson" — the core argument being that more general models always end up beating more specialized ones. This is why they don't add complex scaffolding and workflow orchestration to Claude Code. Boris says scaffolding might improve performance by 10-20%, but the next model wipes out those incremental gains. Rather than constantly rebuilding scaffolding, they bet on the model itself.

This "build for the future model" philosophy also explains a startling fact about Claude Code: **not a single line of Claude Code's codebase is from six months ago.** The product gets rewritten constantly — removing tools that are no longer needed, adding new ones, iterating every few weeks. Code shelf-life might be just a few months.

And the Claude Code team builds Claude Code with Claude Code. Boris says that since Opus 4.5, 100% of his personal code is written by Claude Code — he's uninstalled his IDE and hasn't manually edited a single line. He submits 10 to 30 PRs per day. Cowork, launched in January, was built by 4 engineers in 10 days, entirely written by Claude Code. Even Plan Mode — which Boris says is essentially just adding one sentence to the prompt saying "please don't write code yet" — was something he built in 30 minutes on a Sunday night while browsing GitHub Issues, and shipped the next morning.

The product builds itself with itself. User needs become features directly. That self-reinforcing loop is very hard for competitors to replicate.

Boris thinks Plan Mode's days are numbered. "I think plan mode probably has a limited lifespan," he said. "Maybe in a month." Claude Code can already enter plan mode on its own — detecting when a task is complex enough to warrant planning before coding. The next step is the model figuring it out without any explicit mode at all. This is what "build for the model six months from now" looks like in practice — features dissolving into baseline model capability.

There's also a deeper reason it's Anthropic. When asked what's going to happen this year, Boris framed it in two bounds. The lower bound: coding gets solved for everyone, the title "software engineer" starts to disappear, replaced by "builder" or "product manager." The upper bound is "a lot scarier" — ASL4, where models become recursively self-improving. Anthropic's safety levels define strict criteria that must be met before releasing more capable models. Boris says if you overhear lunchroom conversations at Anthropic, people are talking about AI safety — "this is really the thing that everyone cares about more than anything." Building the most capable coding agent and building the most cautious safety culture aren't contradictions at Anthropic — they're the same mission.

## The Practitioner Consensus

If it were just me saying this, you could dismiss it as personal bias. But the people saying it now are the most accomplished practitioners in software — the ones who defined modern programming languages and development frameworks.

Andrej Karpathy — the man who coined "vibe coding" a year ago — says: "I've already noticed that I am slowly starting to atrophy my ability to write code manually. Generation and discrimination are different capabilities in the brain."

Ryan Dahl, creator of NodeJS: "The era of humans writing code is over."

DHH, creator of Ruby on Rails: "Writing Ruby code by hand in a text editor feels like such a luxury. Maybe this will soon be a lost art."

Even Linus Torvalds is vibe coding with Claude Code.

Steve Yegge — former Google engineer turned Anthropic advocate — wrote that an Anthropic engineer currently averages **1,000x more productivity than a Google engineer at Google's peak**. Three years ago, the industry was still debating whether "10x engineers" existed. Now the claim is 1,000x — on top of a Google engineer in their prime. The scale of this would be absurd if it weren't corroborated by the data that follows.

But the most persuasive data comes from Claude Code's creator himself. Boris says that since November 2024, he hasn't manually edited a single line of code — 100% written by Claude Code. He submits 10 to 30 PRs per day, making him one of Anthropic's most productive engineers even as a team lead. Internally at Anthropic, since Claude Code was introduced, **each engineer's productivity has increased by 150%**. Boris's previous job was leading company-wide code quality at Meta — covering the codebases of Facebook, Instagram, and WhatsApp. There, a dedicated team spending an entire year could see a few percentage points of productivity improvement. 150% is unimaginable in the context of traditional software engineering.

Boris told a story that forced even him to recalibrate his own assumptions. One time Claude Code had a memory leak, and he started debugging the old-fashioned way — taking heap snapshots, analyzing them in DevTools, tracing step by step. Meanwhile, a younger engineer on the team simply asked Claude Code: "There seems to be a memory leak, can you look into it?" Claude Code took its own heap snapshots, wrote a temporary analysis tool to parse the data, found the leak, and submitted a fix PR — **faster than Boris debugging manually**. He says he has to constantly remind himself: the model today isn't the model from three months ago. Your mental model of the model's capabilities is always lagging behind reality.

Boris says the most effective engineers on his team are bimodal: either extreme specialists who understand one domain deeper than anyone, or hyper-generalists who span product, design, user research, and engineering simultaneously. One engineer, Daisy, exemplified the new meta-thinking. Instead of implementing a feature directly, she first had Claude Code build a tool that could test arbitrary tools — then used that meta-tool to have Claude write and verify its own implementation. "Not a lot of people get it yet," Boris said. The skill isn't coding anymore. It's thinking about how to set up the agent to solve the problem.

**Code writing — once considered the core skill of software development — is becoming a baseline AI capability.** The programmer's competitive edge is shifting from "writing code" to "managing AI that writes code" — which directly echoes [Part 5](/the-last-mile-of-ai)'s central argument: you are the manager.

My own experience mirrors this exactly. I no longer "write" code — I describe what I want, and Claude Code implements it. I review code, make decisions, give feedback. My role shifted from programmer to project manager.

## Coding Is the Beachhead, Not the Destination

But if you think this is just a "programmers don't write code anymore" story, you're underestimating what's happening.

SemiAnalysis points out in the report: coding is the first beachhead of AI agents disrupting information work, not the endpoint. The real battleground is the global $15 trillion information work market — covering over 1 billion information workers, a third of the global workforce.

Why is coding the starting point? Because nearly all information work shares the same workflow:

**Read** (ingest unstructured information) → **Think** (apply domain knowledge) → **Write** (produce structured output) → **Verify** (check against standards).

This is identical to the software development workflow. If agents can disrupt software development, they can theoretically disrupt all information work.

METR's research shows that AI agent autonomous task horizons are doubling every 4-7 months. The current mainstream level is about 4.8 hours. When that number reaches 8 hours — a full workday — the entire information work landscape will be redrawn.

Boris predicts this will reshape job titles themselves: "I think we're going to start to see the title software engineer go away. Maybe builder, maybe product manager." At Anthropic, this is already reality — PMs code, designers code, the engineering manager codes, the finance team codes. Everyone ships software. The distinguishing skill isn't writing code; it's understanding systems, users, and problems.

Anthropic clearly sees this too. The launch of Cowork — Claude Code for general computing — signals its formal expansion from serving programmers to serving all information workers. In [Part 4](/when-software-becomes-disposable), Chen Yusen called Claude Code the strongest general agent. Cowork is the direct extension of that judgment: a general agent shouldn't serve only programmers.

And this isn't a theoretical prediction — it's already happening inside Anthropic. Boris says one day he walked into the office and found data scientist Brendan's computer running a Claude Code terminal, using it to write SQL and do data analysis. This non-engineer had figured out Node.js installation and terminal operations on his own — jumping over every barrier to use an engineer's tool. The next week, all the data scientists were using it. Now more than half of Anthropic's sales team uses Claude Code too, connecting it to Salesforce and various data sources for their workflows. Boris himself uses Cowork to pay parking tickets, manage team weekly reports, and cancel subscriptions. And Claude Code's Plugins feature — the entire system was built when an engineer gave Claude a spec, Claude created tasks on an Asana board, then spawned a swarm of agents that claimed tasks and developed them independently, running over the weekend with almost no human intervention.

The agents have also started operating in human communication channels. Boris describes a common pattern: he asks Claude to build something, it reads the codebase, finds an engineer's name in the git blame, and **messages that engineer directly on Slack** to ask a clarifying question — then continues building once it gets an answer. His Claude even tweets occasionally (he deletes most of them because "the tone is a little cheesy"). Claude Code's team uses the Agent SDK to automate code review, security review, issue labeling, and shepherding changes to production. When agents start participating in human social channels and managing development workflows autonomously, the line between "tool" and "colleague" gets very blurry.

When agents start creating agents to complete tasks, the boundaries of "coding" have already blurred.

## The Moats Are Crumbling

What does all of this mean for the existing software industry?

SaaS's three core moats are eroding simultaneously.

**Data lock-in** — user data trapped inside a SaaS system, migration costs prohibitively high. But agents can migrate data across systems, slashing switching costs.

**Workflow lock-in** — users invest significant time learning a product's UI and processes. But agents don't need UI. They understand natural language and execute tasks directly.

**Integration complexity** — connecting different SaaS systems requires specialized development. But MCP enables agents to seamlessly interface with any tool or service.

What is SaaS, fundamentally? It's information workflows crystallized into code, sold on a monthly subscription. But if agents can perform information work directly — without crystallized code — then SaaS's 75% gross margins become a massive arbitrage opportunity.

This resonates directly with [Part 4](/when-software-becomes-disposable)'s "disposable software" thesis. When software can be generated on demand, companies that crystallize workflows into products find their moats are no longer moats.

Microsoft is the most prominent case study. It provides compute to Anthropic and OpenAI through Azure on one side, while watching these customers disrupt its Office 365 and GitHub businesses on the other. Even more awkward: Microsoft's Copilot products launched a full year before Claude Code, yet have barely made a dent. CEO Nadella has personally stepped in to manage AI products — a signal that he knows this isn't a small fight.

But Microsoft's predicament isn't Microsoft's alone — it's the predicament of every seat-based software company.

## The Paradigm Shift Has Already Happened

Looking back at the writing process of this series, I'm a sample of one.

In 2023, I started using Cursor shortly after it launched. Back then it didn't have Agent Mode — just tab completion, helping you continue writing code. But even as just autocomplete, the productivity boost was already obvious. Cursor quickly became my core development tool.

Then I switched to Claude Code. The difference is fundamental — Cursor is still an IDE at its core. It puts you in front of code, lets you see it, edit it, with AI assisting alongside. Claude Code offers a completely different paradigm: you stop staring at code and **focus on describing intent**. You tell it what you want, and it plans, executes, and collaborates across files. Your role shifts from "the person who writes code" to "the person who manages the agent."

At the end of 2025, I built a liuren divination app first, then bazi, MBTI, dream interpretation — all toy-level experiments at first. Then I decided to get serious about building a real product. I bought the panpanmao domain, rewrote the underlying architecture, and unified everything into a single all-in-one app — that's how [PanPanMao](https://www.panpanmao.ai/) began. By early 2026, the pace accelerated. I set up OpenClaw on GCP, connected the agent to Feishu, and non-technical team members started collaborating directly with the agent ([Part 5](/the-last-mile-of-ai) covered this). Anthropic launched Cowork. SemiAnalysis published their report. Top developers spoke up collectively.

This inflection point didn't happen on a single day. It was like water temperature rising — you're soaking in it every day, barely noticing the change. But if 2023-me saw 2026-me, he wouldn't believe that my daily work is just thinking and talking to agents — not writing code.

Even hiring is changing. YC is experimenting with having engineering candidates submit Claude Code session transcripts — recordings of themselves building a feature with an agent. "You can figure out how someone thinks," the YC partners explained. "Do they look at the logs? Can they correct the agent when it goes off track? Do they use plan mode? Do they think about systems?" Boris wants a spider chart — like in NBA 2K — rating engineers on dimensions like systems thinking, testing discipline, product sense, and automation instinct. The question is no longer "can you write code?" It's "can you steer an agent to build what's needed?"

Boris used a historical analogy in his interviews that I find particularly apt. Before Gutenberg invented the printing press, literacy in Europe was below 1%. Fifty years later, more material had been printed than in the previous thousand years combined. A monastery scribe's reaction to the printing press wasn't fear — it was excitement. Because he no longer had to spend his life copying books one by one. He could finally spend his time **thinking about what to write**.

We're standing at the "printing press moment" for code. Writing code is copying. And we're about to become those liberated scribes — no longer needing to hand-write instructions character by character, but instead focusing our energy on **thinking about what to build**.

## So Now What

The printing press freed the scribes — but the first question after liberation was: what do I write?

[Part 5](/the-last-mile-of-ai) is where I worked through this in practice — teaching a non-engineer friend to use Claude Code over a weekend. The use cases most people don't know exist, the management mindset that makes the difference between "AI is useless" and "AI just saved me a week of work," the latent demand hiding in every job. If you haven't read it, start there.

For those who've already crossed that threshold, here are three power-user principles from Boris:

**Calibrate your trust.** Boris's memory leak story has one core lesson: **your mental model of the model's capabilities is always lagging behind reality.** If you think it can't do something, try it anyway. The biggest waste isn't giving the agent a task too hard and watching it fail — it's never giving it the chance to attempt something you assumed it couldn't do.

**Keep your instructions minimal.** Boris's personal Claude.md — the instruction file that shapes how Claude Code works for him — is just two lines. One enables auto-merge on pull requests. The other posts PRs to his team's Slack channel. That's it. His advice: "Delete your Claude.md and start fresh. A lot of people overengineer this. Do the minimal possible thing to get the model on track. With every model, you have to add less and less." The scaffolding principle applies to your own workflow too.

**Throw more agents at hard problems.** Boris calibrates the number of parallel sub-agents to a task's difficulty. Easy bug? One agent. Medium complexity? Three agents researching in parallel. Really hard? Five or even ten agents, each investigating a different angle simultaneously. The insight: throwing more independent context windows at a problem is itself a form of compute — what he calls "uncorrelated context windows." More agents means more capability, not just more speed.

## Back to the Series

Six parts in, the throughline is getting clearer.

[Part 1](/the-companion-vision), the AI Companion — a companion that truly understands you. Back then it was a "vision." Now Claude Code is the closest thing to it: it understands your working environment, remembers your preferences, collaborates rather than merely executing instructions.

[Part 2](/wearables-and-companions), "democratizing the executive lifestyle" — everyone deserves CEO-level resources. Now $20/month makes that real. What a single meal costs buys a level of intelligence that required an entire team three years ago.

[Part 4](/when-software-becomes-disposable), "disposable software" — one-off applications built for a single person. Claude Code is already doing this routinely.

[Part 5](/the-last-mile-of-ai), "the last mile" — 99.99% of people don't know what AI can do. This remains the biggest bottleneck.

This essay's argument: **the paradigm shift has already happened.** Not "about to happen," not "might happen" — it has happened. 4% of GitHub commits come from Claude Code. Top developers no longer write code by hand. The $15 trillion information work market is being repriced.

But as [Part 5](/the-last-mile-of-ai) argued, the beneficiaries of this revolution will be deeply uneven. Those who know are sprinting. Those who don't are standing still.

AI is a cognitive gap amplifier. Steve Yegge says 1,000x. Even if that's aspirational, the productivity gap between early adopters and everyone else isn't two or three times — it's orders of magnitude. And that gap widens every day.

The window won't stay open forever.

---

**References:**

- [SemiAnalysis: Claude Code is the Inflection Point](https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point)
- [Inside Claude Code With Its Creator Boris Cherny (YC / Light Cone)](https://www.youtube.com/watch?v=PQU9o_5rHC4)
