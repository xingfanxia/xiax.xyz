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

## Feedback, Not Redo

After my friend learned to give instructions, he hit a second wall: what to do when the output wasn't right.

He had Claude Code analyze a company's financials. The first draft came back. He looked at it: "Not quite." Then: "Do it again."

This is like handing your employee an investment report and getting back "not quite right, redo it" — they have no idea what's wrong, so they just guess again.

The most important skill in managing AI isn't writing the perfect instruction on the first try — it's **being able to articulate exactly what's wrong when the result misses the mark.**

"The fundamentals section is fine, but I care about the debt structure and cash flow risk, not revenue growth. Use DCF for the valuation, not P/E." That kind of feedback, the agent corrects in one round.

"Not quite right, try again." That kind of feedback, the agent just guesses again.

By the end of the weekend, his iteration cycles dropped from five or six rounds to two or three. Not because the AI got smarter — because his feedback got more precise. He stopped saying "wrong" and started saying "direction's right, but switch the valuation model, and add FX exposure to the risk section."

That's management. A good manager doesn't see an imperfect first draft and say "start over" — they say "keep this part, change that part, here's the direction."

And when you genuinely can't articulate what's wrong — the problem might not be the AI. **It might be that you haven't figured out what you want yet.** When that happens, the best move isn't to keep issuing instructions — it's to use the AI as a thinking partner: "I have a rough idea, help me work through it." That's the third phase from the previous section — from tool to collaborator.

## The Bottleneck Is You

The tools are here. The capability is here. The perception gap from [Part 5](/the-last-mile-of-ai) is being bridged.

But there's a stretch of road only you can walk: learning to think like a manager.

Know what you want. Provide context. Define what "done" looks like. When the result is off, say why. When you're not sure what you want, treat the AI as a partner to think it through.

These aren't technical skills — they're management skills. In the agent era, **everyone is a manager**, whether you write code or not.

[Part 7](/why-claude-code) steps back to the bigger picture: why Claude Code specifically became the inflection point.
