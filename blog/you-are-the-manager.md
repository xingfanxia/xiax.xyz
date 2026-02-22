---
title: "You Are the Manager"
date: "2026-02-22"
summary: "The skill that matters in the agent era isn't coding — it's managing AI. From giving clear instructions to calibrating trust, here's what working with agents actually looks like."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 6
type: "Post"
status: "Published"
---

## "Help Me Analyze This"

In [Part 5](/the-last-mile-of-ai), I described teaching a non-engineer friend to use Claude Code over a weekend. The infrastructure gap was brutal. The perception gap was even bigger. But the third discovery was the most counterintuitive.

After my friend learned the basics, he started assigning tasks to Claude Code on his own. His instructions looked like this:

"Help me analyze this."

What data? Along what dimensions? Who's the audience for the conclusions? What decisions will it inform? What format? — None of that specified.

Claude Code can guess, of course. It'll produce a reasonable default analysis. But this is like telling an extremely capable new hire "help me deal with that thing" — you'll get a result, but it's almost certainly not the one you wanted.

**The problem isn't AI capability — it's human management skill.**

I spent half a day teaching him not how to use Claude Code's features — but how to give instructions. How to decompose a vague need into a clear spec. How to provide sufficient context. How to define success criteria. How to give targeted feedback after the first draft instead of "not quite right, try again."

This is essentially **management training.**

Here's a concrete example. Compare these two instructions:

"Write me a Python script to parse this CSV" — you're prescribing steps. "I have sales data, I need to know which customers have decreased their order frequency in the past three months, and possible reasons why" — you're describing a goal. Let the agent decide how to get there. The result is almost always better than your predetermined path.

Context matters just as much. Who you are, who will see this output, what decision you'll make with it. The same data analysis looks completely different presented for your boss versus for an investor. The agent isn't a mind reader — the more background you give it, the more accurate the result.

We keep asking "what can AI do for you," but the real question is "what can you do for AI." Can you provide clear requirements? Sufficient context? If you don't know what you want yet, can you use the agent as a collaborator to figure it out together, instead of expecting it to read your mind?

Flip the perspective: if you're a CEO and your direct report is extremely capable but has zero background information — how would you manage them? You wouldn't say "deal with that." You'd show them the data, explain the context, define the objectives, agree on delivery standards.

**Same with AI. You are the manager.**

Boris Cherny — Claude Code's creator — made an observation about this that surprised even him. At Anthropic, newer engineers — people with less experience and fewer strong opinions — often use Claude Code more effectively than veterans. The senior engineers' deeply ingrained habits and strong convictions about "the right way to do things" actually get in the way. "The biggest skill is people that can think scientifically and from first principles," Boris said. "A lot of these strong opinions just aren't relevant anymore."

This applies directly to non-engineers learning to use agents. My friend's lack of engineering background wasn't just a barrier — in some ways, it was an advantage. He had no preconceptions about how software "should" work. Once he learned the management skill — how to frame clear goals and provide context — he had nothing to unlearn. The beginner's mind, it turns out, is better suited to the agent era than the expert's.

## From Tool to Partner

My friend's mental model went through three phase shifts over the weekend.

**Day 1**: Search engine. He asked Claude Code questions like he was using Google. "What is GCP?" "How do I register?" He was waiting for answers.

**Day 1 evening**: Tool. He started making Claude Code do things. "Write this script for me." "Convert this file format." He was operating a tool.

**End of Day 2**: Collaborator. He started discussing with Claude Code. "I have an idea — do you think it's feasible?" "What risks am I not seeing in this approach?" "Can we try a different angle?" He wasn't using a tool anymore — he was working with a partner.

These three phase shifts — search engine, tool, collaborator — are the evolution the entire market needs to undergo.

The vast majority of people are still at step one. They treat AI as a smarter search engine: give it a question, expect an answer. A smaller group has reached step two, using AI as a tool — but still unidirectional, command-driven. Very few have reached step three, treating AI as a genuine collaborator.

This connects directly to the companion vision I wrote about in [Part 1](/the-companion-vision). An AI companion that truly understands you requires more than memory orchestration and personality modeling on the technical side — **it requires a human willing to be understood.**

If you won't provide context, won't share what you really think, won't invest time building shared understanding with the agent — then no memory system, however sophisticated, can help you. The upper bound of an AI companion's effectiveness isn't determined by AI capability. It's determined by the depth of your engagement.

## Your Mental Model Is Always Lagging

Boris told a story that forced even him to recalibrate his own assumptions. One time Claude Code had a memory leak, and he started debugging the old-fashioned way — taking heap snapshots, analyzing them in DevTools, tracing step by step. Meanwhile, a younger engineer on the team simply asked Claude Code: "There seems to be a memory leak, can you look into it?" Claude Code took its own heap snapshots, wrote a temporary analysis tool to parse the data, found the leak, and submitted a fix PR — **faster than Boris debugging manually**. He says he has to constantly remind himself: the model today isn't the model from three months ago. Your mental model of the model's capabilities is always lagging behind reality.

The most effective engineers on Boris's team are bimodal: either extreme specialists who understand one domain deeper than anyone, or hyper-generalists who span product, design, user research, and engineering simultaneously. One engineer, Daisy, exemplified the new meta-thinking. Instead of implementing a feature directly, she first had Claude Code build a tool that could test arbitrary tools — then used that meta-tool to have Claude write and verify its own implementation. "Not a lot of people get it yet," Boris said. The skill isn't coding anymore. It's thinking about how to set up the agent to solve the problem.

**Code writing — once considered the core skill of software development — is becoming a baseline AI capability.** The programmer's competitive edge is shifting from "writing code" to "managing AI that writes code."

My own experience mirrors this exactly. I no longer "write" code — I describe what I want, and Claude Code implements it. I review code, make decisions, give feedback. My role shifted from programmer to project manager.

## Three Principles for the Agent Era

For those who've already crossed the threshold from tool-user to manager, here are three power-user principles from Boris:

**Calibrate your trust.** The memory leak story has one core lesson: **your mental model of the model's capabilities is always lagging behind reality.** If you think it can't do something, try it anyway. The biggest waste isn't giving the agent a task too hard and watching it fail — it's never giving it the chance to attempt something you assumed it couldn't do.

**Keep your instructions minimal.** Boris's personal Claude.md — the instruction file that shapes how Claude Code works for him — is just two lines. One enables auto-merge on pull requests. The other posts PRs to his team's Slack channel. That's it. His advice: "Delete your Claude.md and start fresh. A lot of people overengineer this. Do the minimal possible thing to get the model on track. With every model, you have to add less and less."

**Throw more agents at hard problems.** Boris calibrates the number of parallel sub-agents to a task's difficulty. Easy bug? One agent. Medium complexity? Three agents researching in parallel. Really hard? Five or even ten agents, each investigating a different angle simultaneously. The insight: throwing more independent context windows at a problem is itself a form of compute — what he calls "uncorrelated context windows." More agents means more capability, not just more speed.

## The Question That Matters

Even hiring is changing. YC is experimenting with having engineering candidates submit Claude Code session transcripts — recordings of themselves building a feature with an agent. "You can figure out how someone thinks," the YC partners explained. "Do they look at the logs? Can they correct the agent when it goes off track? Do they use plan mode? Do they think about systems?" Boris wants a spider chart — like in NBA 2K — rating engineers on dimensions like systems thinking, testing discipline, product sense, and automation instinct.

Boris's own approach to hiring confirms the shift. He doesn't look for candidates with the strongest technical opinions or the most impressive resumes. He asks one question: "What's an example of when you were wrong?" He wants to see if people can recognize mistakes in hindsight, take ownership, and learn from them. "A lot of very senior people will never really take the blame for a mistake," he said. "But I'm wrong probably half the time. You just have to try stuff."

The question is no longer "can you write code?" It's "can you steer an agent to build what's needed?"

The tools are here. The capability is here. The bottleneck is you — your management skill, your willingness to engage, your ability to think in goals rather than steps.

[Part 7](/why-claude-code) steps back to the bigger picture: why Claude Code specifically became the inflection point, and what it tells us about where this is all heading.
