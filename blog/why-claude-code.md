---
title: "Why Claude Code"
date: "2026-02-22"
summary: "SemiAnalysis calls Claude Code the inflection point. As someone who works inside Claude Code every day, I want to explain why Anthropic built it, and what it actually changed."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 7
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

Steve Yegge — former Google engineer turned Anthropic advocate — wrote that an Anthropic engineer currently averages **1,000x more productivity than a Google engineer at Google's peak**. Three years ago, the industry was still debating whether "10x engineers" existed. Now the claim is 1,000x — on top of a Google engineer in their prime. The scale of this would be absurd if it weren't corroborated by the data.

Internally at Anthropic, since Claude Code was introduced, **each engineer's productivity has increased by 150%**. Boris's previous job was leading company-wide code quality at Meta — covering the codebases of Facebook, Instagram, and WhatsApp. There, a dedicated team spending an entire year could see a few percentage points of productivity improvement. 150% in that context is unimaginable.

The consensus is clear. The practitioners who defined modern programming are saying the same thing, each in their own way: the era of writing code by hand is ending.

But if you think this is only about programming, you're underestimating what's happening. Coding is the first beachhead — not the destination. [Part 8](/the-printing-press-moment) looks at what happens when the paradigm shift spreads beyond code.

---

**References:**

- [SemiAnalysis: Claude Code is the Inflection Point](https://newsletter.semianalysis.com/p/claude-code-is-the-inflection-point)
- [Inside Claude Code With Its Creator Boris Cherny (YC / Light Cone)](https://www.youtube.com/watch?v=PQU9o_5rHC4)
