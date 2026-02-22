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

In [Part 4](/when-software-becomes-disposable), I wrote about the agent marketplace's "conversational entry point" — users shouldn't browse a shelf of agents, they should just state their need and let the platform match. Sounds elegant.

But reality: before my friend could "converse," he had to cross a massive threshold.

GCP account registration, gcloud CLI installation, server configuration, OpenClaw deployment, Feishu integration, tunnel forwarding — each step took me minutes, but for him, every single one triggered a chain of "What is this? Why do I need this?" Not because he's slow — because these things simply don't exist in a non-technical person's cognitive map.

Here's the interesting part: once the environment was set up, Claude Code handled nearly everything from there. It wrote scripts, read documentation, debugged errors, deployed services. The problem wasn't the agent itself — the agent is already powerful enough. **The problem was the distance between "I want an agent" and "I have a working agent."**

This is the "last mile" problem of the agent revolution.

Logistics has a classic concept: the last mile is the most expensive, least efficient segment of the entire delivery chain. Warehouse to city is fast. City to neighborhood is fast. But from the neighborhood entrance to your front door — those final few hundred meters consume a disproportionate share of the total cost.

The agent space looks exactly the same. The foundational model capabilities are here. Claude Code as a general agent is powerful enough. The Skills ecosystem is forming. But **the infrastructure between ordinary users and actually using any of this is almost entirely missing.**

Everyone's discussing what agents can do. Very few are solving how ordinary people can get to use them.

Some products are partially solving the entry point problem. Take my own example — I used OpenClaw to build a fully automated AI engineer for PanPanMao on GCP, integrated with Feishu (a workplace messaging app). Team members don't need to file bug reports or feature requests with me. They just chat with the agent in the Feishu group. The agent automatically validates and triages issues, creates GitHub Issues, generates task tracking; for simple bugs, it submits fix PRs directly; for structural changes and feature requests, it creates a detailed report in the GitHub Issue — complete with context, analysis, and recommendations. This massively freed me up: instead of collecting information from team members one by one, all I need to do is think and make decisions.

For the team members, using the agent is as simple as chatting with a colleague in Feishu. The entry point problem is genuinely solved.

But the person who built that experience was me — an engineer who works in Claude Code every day. **Ordinary users don't have the ability, the inclination, or even the awareness to set any of this up.** They don't even know this kind of experience is possible.

So the essence of the "last mile" isn't "agents aren't good enough" — it's "someone has to pave that road for you." Right now, that someone can only be a technical person. And the vast majority of people don't have a technical person in their life willing to spend the time paving it.

Anthropic saw this problem too. Boris Cherny — Claude Code's creator — described in a recent interview how even inside Anthropic, non-engineers were "jumping over hoops" to install Claude Code in the terminal. Designers, data scientists, the finance team — they were all figuring out Node.js installation and terminal commands on their own, just to access agent-level capability. Outside Anthropic, people were using it to monitor tomato plants, recover wedding photos from corrupted hard drives, do financial analysis. The demand was unmistakable — but the barrier was absurd. A terminal CLI shouldn't be the entry point for someone who wants to pay a parking ticket with AI.

So Anthropic built Cowork: Claude Code wrapped in an accessible desktop interface, running inside a virtual machine with deletion safeguards and permission guardrails. Four engineers built it in ten days — entirely written by Claude Code itself. Cowork is the first serious attempt to pave that last mile road at scale. It's Claude Code's full agent capability, minus the terminal barrier. Anthropic's sales team has already started migrating from Claude Code to Cowork — "because it's a little easier to use, and it has a VM so it's a little bit safer," Boris said.

This doesn't solve the whole problem — users still need to learn how to give good instructions, how to think in goals rather than steps. But it removes the most brutal barrier: the one where you have to be an engineer just to get started.

## The Perception Gap

The second discovery went deeper than the first.

My friend wasn't unaware of AI — he'd used ChatGPT, Doubao, various free chatbots. His mental model of AI was: "a Q&A tool that's slightly smarter than a search engine."

That's roughly 99.99% of people's understanding.

But my friend was different. Because I'd been sharing cases with him, he came in with expectations — he knew this stuff "should be impressive." But knowing and seeing are two different things.

When Claude Code did financial analysis for him — not "answer questions about finance," but actually read his data, build models, generate analytical reports, then iterate based on his feedback — his reaction wasn't "yeah, like you said." It was **genuine awe.** The kind of "I knew it could do this, but watching it work on my own data hits completely differently" awe.

Then we built something even more fun: a voice-controlled Flappy Bird game from scratch using Claude Code. Took about an hour. The gameplay mechanic: the pitch of your voice controls the bird's altitude. What followed was two grown men screaming "AHHH—ahhh—AHHH" at a laptop, voices lurching up and down, trying to keep a pixelated bird from smashing into pipes. The room was filled with absurd, undulating howls. He couldn't stop laughing.

But after the laughter subsided, he went quiet. Because he realized something: **an hour ago, this game didn't exist. Now it does. And it exists for the sole purpose of two friends having fun in this moment.**

Then when Claude Code built him a custom tool tailored entirely to his business scenario — not some generic software configuration, but an application that existed solely for his needs — he went quiet for a long time again.

This validates the "disposable software" thesis from [Part 4](/when-software-becomes-disposable): building software for a single person is already technically feasible. **But 99.99% of people don't even know they can ask for it.**

They've never seen agent-level capabilities. They've used free-tier, stripped-down, rate-limited models. Their entire impression of AI is a chat box that occasionally produces a useful answer.

This isn't a technology problem. It's a **perception problem.**

People don't know what's possible. And when you don't know what's possible, you don't even think to want it. You can't demand something you don't know exists.

Boris Cherny has a product term for this: **latent demand**. "People will only do a thing that they already do. You can't get people to do a new thing. If people are trying to do a thing and you make it easier, that's a good idea. But if people are doing a thing and you try to make them do a different thing, they're not going to do that."

My friend wasn't lacking demand — he was already doing financial analysis, already building reports, already making investment decisions. The demand was always there. What he lacked was the awareness that AI could make those things 10x easier. Once he saw it — once he experienced Claude Code working on his actual data — the latent demand exploded into active demand instantly. The gap wasn't motivation. It was exposure.

The last mile problem, at its core, is a latent demand problem. The demand exists — billions of people do information work that agents could transform. But they don't know the supply exists. And you can't demand what you've never seen.

So what does latent demand look like in practice? These are real use cases Boris mentioned — none of them are coding:

**The repetitive work you already do every day.** Paying parking tickets, canceling subscriptions, summarizing team weekly reports. Things everyone has to do but nobody wants to.

**Data analysis and research.** Not "answer this data question" — but "here's my database, explore the data, find interesting patterns, write it up as a report." The agent decides on its own what queries to run and how to present the results.

**Custom tools for your specific situation.** [Part 4](/when-software-becomes-disposable)'s "disposable software" — describe your need and let the agent build a tool that serves only you.

**Learn anything you want to learn.** Not search-engine-style "what is X" — but "I want to understand X, my background is Y, explain it so I can understand, give me a practical example, walk me through it step by step." A private tutor with infinite patience.

The demand is everywhere. The capability is here. But between "seeing what's possible" and "actually being effective," there's a third gap — the most counterintuitive one.

It's not about learning features or memorizing commands. It's about learning to manage.

That's [Part 6](/you-are-the-manager).
