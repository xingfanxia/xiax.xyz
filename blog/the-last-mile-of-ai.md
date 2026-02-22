---
title: "The Last Mile of AI"
date: "2026-02-22"
summary: "A weekend teaching a non-engineer friend to use AI agents revealed the real bottleneck of the agent revolution: not technology, not cost, but cognition."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 5
type: "Post"
status: "Published"
---

## A Weekend, a Friend, a Laptop

An old friend visited from Beijing on a business trip to Seattle. Beyond catching up, he had a clear agenda: he wanted to learn how to use AI agents for productivity.

He's one of my closest friends from college. He works in finance — reviewing deals, writing investment research reports. He took a few CS intro classes back in school, but that was eight years ago and long since forgotten. He's sharp, learns fast, and — most critically — he was motivated. I'd been regularly sharing my AI agent use cases with him, and he'd seen enough to know this was real. He couldn't wait any longer.

So we spent the weekend on one thing: I taught him Claude Code, hands on.

We started from zero: deployed his own OpenClaw instance on GCP, integrated with Feishu, configured tunnel forwarding, then used Claude Code for a series of things he genuinely needed — financial analysis, data wrangling, even building a custom tool for his specific business scenario.

That weekend showed me three things, each more visceral than anything I'd theorized about before.

## The Last Mile

In Part 4, I wrote about the agent marketplace's "conversational entry point" — users shouldn't browse a shelf of agents, they should just state their need and let the platform match. Sounds elegant.

But reality: before my friend could "converse," he had to cross a massive threshold.

GCP account registration, gcloud CLI installation, server configuration, OpenClaw deployment, Feishu integration, tunnel forwarding — each step took me minutes, but for him, every single one triggered a chain of "What is this? Why do I need this?" Not because he's slow — because these things simply don't exist in a non-technical person's cognitive map.

Here's the interesting part: once the environment was set up, Claude Code handled nearly everything from there. It wrote scripts, read documentation, debugged errors, deployed services. The problem wasn't the agent itself — the agent is already powerful enough. **The problem was the distance between "I want an agent" and "I have a working agent."**

This is the "last mile" problem of the agent revolution.

Logistics has a classic concept: the last mile is the most expensive, least efficient segment of the entire delivery chain. Warehouse to city is fast. City to neighborhood is fast. But from the neighborhood entrance to your front door — those final few hundred meters consume a disproportionate share of the total cost.

The agent space looks exactly the same. The foundational model capabilities are here. Claude Code as a general agent is powerful enough. The Skills ecosystem is forming. But **the infrastructure between ordinary users and actually using any of this is almost entirely missing.**

Everyone's discussing what agents can do. Very few are solving how ordinary people can get to use them.

## The Perception Gap

The second discovery went deeper than the first.

My friend wasn't unaware of AI — he'd used ChatGPT, Doubao, various free chatbots. His mental model of AI was: "a Q&A tool that's slightly smarter than a search engine."

That's roughly 99.99% of people's understanding.

But my friend was different. Because I'd been sharing cases with him, he came in with expectations — he knew this stuff "should be impressive." But knowing and seeing are two different things.

When Claude Code did financial analysis for him — not "answer questions about finance," but actually read his data, build models, generate analytical reports, then iterate based on his feedback — his reaction wasn't "yeah, like you said." It was **genuine awe.** The kind of "I knew it could do this, but watching it work on my own data hits completely differently" awe.

Then we built something even more fun: a voice-controlled Flappy Bird game from scratch using Claude Code. Took about an hour. The gameplay mechanic: the pitch of your voice controls the bird's altitude. What followed was two grown men screaming "AHHH—ahhh—AHHH" at a laptop, voices lurching up and down, trying to keep a pixelated bird from smashing into pipes. The room was filled with absurd, undulating howls. He couldn't stop laughing.

But after the laughter subsided, he went quiet. Because he realized something: **an hour ago, this game didn't exist. Now it does. And it exists for the sole purpose of two friends having fun in this moment.**

Then when Claude Code built him a custom tool tailored entirely to his business scenario — not some generic software configuration, but an application that existed solely for his needs — he went quiet for a long time again.

This validates the "disposable software" thesis from Part 4: building software for a single person is already technically feasible. **But 99.99% of people don't even know they can ask for it.**

They've never seen agent-level capabilities. They've used free-tier, stripped-down, rate-limited models. Their entire impression of AI is a chat box that occasionally produces a useful answer.

This isn't a technology problem. It's a **perception problem.**

People don't know what's possible. And when you don't know what's possible, you don't even think to want it. You can't demand something you don't know exists.

## You Are the Manager

The third discovery was the most interesting — and the most counterintuitive.

After my friend learned the basics, he started assigning tasks to Claude Code on his own. His instructions looked like this:

"Help me analyze this."

What data? Along what dimensions? Who's the audience for the conclusions? What decisions will it inform? What format? — None of that specified.

Claude Code can guess, of course. It'll produce a reasonable default analysis. But this is like telling an extremely capable new hire "help me deal with that thing" — you'll get a result, but it's almost certainly not the one you wanted.

**The problem isn't AI capability — it's human management skill.**

I spent half a day teaching him not how to use Claude Code's features — but how to give instructions. How to decompose a vague need into a clear spec. How to provide sufficient context. How to define success criteria. How to give targeted feedback after the first draft instead of "not quite right, try again."

This is essentially **management training.**

We keep asking "what can AI do for you," but the real question is "what can you do for AI." Can you provide clear requirements? Sufficient context? If you don't know what you want yet, can you use the agent as a collaborator to figure it out together, instead of expecting it to read your mind?

Flip the perspective: if you're a CEO and your direct report is extremely capable but has zero background information — how would you manage them? You wouldn't say "deal with that." You'd show them the data, explain the context, define the objectives, agree on delivery standards.

**Same with AI. You are the manager.**

## The Cognitive Leap: From Tool to Partner

My friend's mental model went through three phase shifts over the weekend.

**Day 1**: Search engine. He asked Claude Code questions like he was using Google. "What is GCP?" "How do I register?" He was waiting for answers.

**Day 1 evening**: Tool. He started making Claude Code do things. "Write this script for me." "Convert this file format." He was operating a tool.

**End of Day 2**: Collaborator. He started discussing with Claude Code. "I have an idea — do you think it's feasible?" "What risks am I not seeing in this approach?" "Can we try a different angle?" He wasn't using a tool anymore — he was working with a partner.

These three phase shifts — search engine, tool, collaborator — are the evolution the entire market needs to undergo.

The vast majority of people are still at step one. They treat AI as a smarter search engine: give it a question, expect an answer. A smaller group has reached step two, using AI as a tool — but still unidirectional, command-driven. Very few have reached step three, treating AI as a genuine collaborator.

This connects directly to the companion vision I wrote about in Part 1. An AI companion that truly understands you requires more than memory orchestration and personality modeling on the technical side — **it requires a human willing to be understood.**

If you won't provide context, won't share what you really think, won't invest time building shared understanding with the agent — then no memory system, however sophisticated, can help you. The upper bound of an AI companion's effectiveness isn't determined by AI capability. It's determined by the depth of your engagement.

## The Real Bottleneck of Democratization

Back to the throughline of this series.

In Part 2, I wrote about "democratizing the executive lifestyle" — everyone deserves their own personal coach and advisor. In Part 4, I wrote about "disposable software" and the "3D printing metaphor" — AI makes it economically viable to build software for a single person.

These theses all hold on a technical level.

Capability? It's there. Claude Code is already the strongest general agent, capable of handling nearly any task on a computer.

Cost? Entry-level is $20 a month — a meal out, a few coffees. Heavy users need the $100-200/month Max Plan, but even that is absurdly cheap relative to the value it generates. And there are even cheaper alternatives — Kimi, GLM, MiniMax in China — with the entry barrier continuing to drop.

**So why hasn't the agent revolution actually happened yet?**

Because the bottleneck isn't technology or cost — it's **education.**

99.99% of people don't know what AI can do. Of those who do, 99% don't know how to use it effectively. Of those who know how, most still haven't built the mental model that "AI is a collaborator, not a tool."

This is a **cognitive funnel.** Every layer bleeds massive attrition.

The agent revolution won't be bottlenecked by technology. Won't be bottlenecked by cost. **It will be bottlenecked by education.**

My weekend was the clearest evidence. My friend isn't lacking in intelligence, motivation, or learning ability — but he needed someone sitting next to him, spending two days, walking him through everything from environment setup to mental model building, hand-holding him across that chasm.

Doing this at scale — helping millions of people cross the chasm from "heard of AI" to "actually using agents" — that's the real hard problem. Not better models. Not cheaper prices. Education.

But here's the colder reality: **AI is a cognitive gap amplifier.**

In the past, the productivity difference between a sharp person and an average person was maybe two or three times. But when the sharp person learns to use agents while the average person is still using search engines — that gap might be a hundred times. Not because AI made the sharp person smarter, but because AI tore the chasm between "those who can use it" and "those who can't" wide open.

My friend crossed the chasm this weekend. But only because he happened to have a friend who knows this stuff and was willing to spend two days teaching him hands-on. The vast majority of people don't have that luck.

And honestly — who has the incentive to do this at scale? Education has never been a good business model. Teaching someone to use an agent generates no direct revenue. Helping people cross the cognitive gap has no calculable ROI. Companies building agent tools are optimizing their products. Companies building agent platforms are racing for market share. Nobody's KPI is "help more people understand what AI can actually do."

This is a classic tragedy of the commons: everyone benefits from more people being able to use AI, but nobody has sufficient incentive to bear the cost of education.

## The Fault Line in Education

And the institution that should be bearing this responsibility — schools — is completely unprepared.

Higher education being disconnected from reality isn't news. But in the AI era, that disconnection has become a fracture.

Our education systems still test memorization. They still teach students to answer standardized questions in standardized formats. Memorize definitions, apply formulas, recite key points — the entire evaluation framework revolves around "can you accurately reproduce what you were taught."

But that's precisely what AI is best at. The memorization and reproduction skills you spent four years training? An agent does it in a fraction of a second, and does it better than you.

The education system almost entirely ignores what actually matters: **the ability to think independently, to make decisions, to ask the right questions, to be self-driven.**

In the AI Native era, these are a person's real competitive advantages. Knowing how to ask the right question is worth a hundred times more than being able to answer one. Having your own ideas and judgment framework matters a hundred times more than memorizing someone else's. Having the intrinsic drive to explore, to experiment, to create — that's what agents can't replace.

Apart from a handful of cutting-edge institutions attempting to evolve, the vast majority of schools haven't even begun to think about this problem. They're still running assembly lines designed for the industrial age, producing a product the AI age no longer needs.

This makes the last mile problem even thornier. It's not just that nobody has the incentive to teach ordinary people how to use AI — **the education system itself is cultivating a capability structure that runs counter to the AI era.** It trains people to be executors, not managers. To memorize answers, not to ask questions.

So the last mile might persist indefinitely. Not because the technology isn't good enough. Not because the price isn't low enough. But because nobody has enough reason to pave that road — and the institution that should be paving it is walking in the opposite direction.

Brutal, maybe. But that's how it is.
