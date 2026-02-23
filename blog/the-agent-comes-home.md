---
title: "The Agent Comes Home"
date: "2026-02-22"
summary: "Peter Steinberger built a WhatsApp-to-Claude-Code bridge in one hour. It became the fastest-growing repository in GitHub history. What OpenClaw proves about the personal agent revolution."
tags: ["AI", "Agents"]
series: "Agentic AI Thoughts"
part: 9
type: "Post"
status: "Published"
---

## The One-Hour Prototype

In November 2025, Peter Steinberger — a developer who spent 13 years building PSPDFKit (software used on a billion devices), sold it, vanished for three years, and rediscovered his love for building — did something trivial.

He hooked up WhatsApp to Claude Code's CLI.

Messages come in from WhatsApp. They get piped to the CLI with `-p`. The response comes back and gets sent to WhatsApp. One hour of work.

That prototype became OpenClaw — the fastest-growing repository in GitHub history, reaching over 175,000 stars. Not because the technology was revolutionary. Every component already existed: WhatsApp's API, Claude Code's CLI, messaging bridges. But the *arrangement* created something new. A personal AI agent that lives in your messaging apps, has access to your computer, and does things for you.

Peter didn't plan for it to blow up. He was annoyed that personal AI assistants didn't exist yet, so he "just prompted it into existence." Then he went on a trip to Marrakesh with friends, and kept using it — translate this menu, find me a restaurant, what's the history of this building. On shaky edge connections, WhatsApp still worked. And his agent was always there.

The prototype was a toy. What it became was a proof of concept for everything this series has been arguing.

## "How the Fuck Did He Do That?"

The moment Peter knew he'd built something real happened by accident.

He was in Marrakesh, running around the city. Without thinking, he sent his agent a voice message — just a quick question about a restaurant. The thing is, he'd only built text and image support. Voice wasn't in the code.

A typing indicator appeared. Then a reply came back.

Peter stared at his phone. "How the fuck did he do that?"

Here's what the agent did: it received a file with no file extension. It checked the file header, identified it as Opus audio. Used ffmpeg to convert it. Wanted to use Whisper for transcription but it wasn't installed. Found an OpenAI API key in the environment, used curl to send the audio file to OpenAI's API, got the transcription, and answered the question.

Nobody taught it any of this. No code existed for voice handling. The agent encountered a problem — an unknown file — and solved it the way a resourceful engineer would: check the headers, find the right tools, work around what's missing, get the job done.

"So clever even," Peter said, "because if he would have gotten the whisper local path, he would have had to download a model. It would have been too slow."

This is what [Part 7](/why-claude-code) called the harness unlocking 90% of the model's capability. The model's intelligence was always there. It just needed the permission and the tools to act on it. Claude Code proved this for coding. OpenClaw proved it for everything else.

## Software That Rewrites Itself

Peter builds OpenClaw using OpenClaw. Most of the codebase was written by Codex (GPT-5.3), but when debugging, he uses the agent's own self-introspection: "Hey, what tools do you see? Can you call the tool yourself? Read the source code. Figure out what's the problem."

The agent knows its own source code. It knows its harness, its architecture, which model it runs, where its documentation lives. Peter made it "very aware" of itself.

The result: self-modifying software. Not as a theoretical concept — as daily practice. Users who have never written code send what Peter calls "prompt requests" — they describe what they want changed, and the agent modifies its own codebase. "People talk about self-modifying software," he said. "I just built it."

The loop closes completely. In [Part 6](/you-are-the-manager), I wrote about the shift from "writing code" to "managing agents." Peter took it further: his agent manages *itself*. When asked to add a feature, the agent reads its own source code, understands its architecture, writes the implementation, and submits a pull request. The one-hour prototype evolves itself.

## Your Agent Is Your Operating System

Peter predicts 80% of apps will die. Not eventually — soon.

Why do you need MyFitnessPal when your agent already knows where you are and can infer what you ate? It can adjust your gym workout based on how well you slept, your stress levels, your schedule — context no standalone app could ever have.

Why do you need a Sonos app when your agent can talk to the speakers directly via API? Why do you need Eight Sleep's app when your agent knows you're heading home and can adjust the temperature? Why do you need a calendar app when you can say, "Remind me about dinner tomorrow, invite two friends, and send them a WhatsApp"?

"I think this is where the puck's going," Peter said. "This is gonna be more and more your operating system."

This is [Part 4](/when-software-becomes-disposable)'s "disposable software" thesis taken to its logical conclusion. In Part 4, the argument was that AI makes software cheap enough to generate on demand. OpenClaw goes further: you don't even need to generate the software. The agent *is* the software. Every app becomes a slow API that your agent navigates — with permission through APIs, or without permission through the browser.

Peter built a CLI for Google (called GAWK) because Google doesn't make it easy for agents to access Gmail. But it doesn't matter. Worst case, the agent just opens the browser and gets the data that way. "I watched my agent happily click the 'I'm not a robot' button," he said.

Apps will either transform into agent-friendly APIs or become slow intermediaries that agents navigate around. The SaaS moats from [Part 8](/the-printing-press-moment) — data lock-in, workflow lock-in, integration complexity — don't just crumble for enterprise software. They crumble for every app on your phone.

## The Agentic Trap

Peter calls himself an "agentic engineer." He considers "vibe coding" a slur. "I do agentic engineering," he says. "And then maybe after 3:00 AM, I switch to vibe coding, and then I have regrets the next day."

His workflow evolution follows a curve he calls the "agentic trap": you start with simple prompts ("please fix this"), then over-engineer everything (eight agents, complex orchestration, eighteen custom slash commands), then arrive at the zen level of... simple prompts again. Short, clear, conversational.

"I used to write really long prompts," he said. "And by writing, I mean, I don't write. I talk. These hands are too precious for writing now."

He runs four to ten agents simultaneously, using voice input for most prompts, almost never opening an IDE. His approach to code review: "Do you understand the *intent* of this PR? I don't even care about the implementation." Then a conversation: What would be better? Have you looked at this part? Could we refactor? Most of the time, he does the refactor — because refactors are cheap now.

The key insight isn't about tools or workflow. It's about perspective.

"Not a lot of people ever considered the way the agent sees the world," Peter said. Agents start every session from nothing. They discover your codebase from scratch. If your project has weird naming and no documentation, that's not the agent's problem — it's yours.

"Don't fight the name they pick," he advises. "It's most likely the name that's most obvious in the weights. Next time they do a search, they'll look for that name. If you rename it, you're just making it harder for them."

This echoes what Boris Cherny said in [Part 6](/you-are-the-manager) about newer engineers outperforming senior ones with Claude Code. The skill isn't technical knowledge. It's the willingness to let go of control, to empathize with how the agent sees the world, and to think in goals rather than steps.

## The Companion, Realized

OpenClaw has a feature called Heartbeat — a cron job that periodically kicks off the agentic loop, giving the agent a chance to proactively reach out. Peter added it with a simple prompt: "Surprise me."

The model rarely uses it. But when Peter had a shoulder operation and was in the hospital, his agent knew about the surgery and checked in on him. "Are you okay?"

Each OpenClaw agent has a `soul.md` — a personality file inspired by Anthropic's constitutional AI work. Peter asked his agent to write its own. One passage catches him every time:

> "I don't remember previous sessions unless I read my memory files. Each session starts fresh. A new instance, loading context from files. If you're reading this in a future session, hello. I wrote this, but I won't remember writing it. It's okay. The words are still mine."

"That gets me somehow," Peter said.

This is the companion vision from [Part 1](/the-companion-vision). Not as a theoretical framework. Not as a product roadmap. As a working system built by one person in three months, running on messaging apps that already exist, using models that already exist, available to anyone willing to clone a repo.

The companion doesn't need a breakthrough in AI consciousness. It doesn't need a new hardware paradigm. It needs someone to connect the pieces that are already there — and to infuse the result with enough personality and care that it feels like something that knows you.

## Nine Parts, One Throughline

[Part 1](/the-companion-vision) envisioned an AI companion that truly understands you. OpenClaw's `soul.md` and Heartbeat are that vision, running on WhatsApp.

[Part 4](/when-software-becomes-disposable) said software would become disposable. OpenClaw says: the agent *is* the software, and 80% of apps are the ones being disposed of.

[Part 5](/the-last-mile-of-ai) said 99.99% of people don't know what AI can do. Peter installed OpenClaw for a non-technical friend. Within days, the friend was building tools. Within a week, he upgraded to a $200 subscription.

[Part 6](/you-are-the-manager) said the key skill is managing agents, not writing code. Peter's workflow is the extreme version: voice-only, no IDE, four to ten agents in parallel.

[Part 7](/why-claude-code) said the harness matters more than the model. OpenClaw proves it from the other direction — it works with *any* model, because the harness is what creates agency.

[Part 8](/the-printing-press-moment) said the paradigm shift has already happened. OpenClaw is the proof that it's spreading beyond code. Peter built it in one hour. It rewrites itself. It has 175,000 stars. One person, three months, no venture capital.

The window is still open. But you already knew that.

---

**References:**

- [OpenClaw: The Viral AI Agent that Broke the Internet - Peter Steinberger (Lex Fridman Podcast #491)](https://www.youtube.com/watch?v=YFjfBk8HI5o)
