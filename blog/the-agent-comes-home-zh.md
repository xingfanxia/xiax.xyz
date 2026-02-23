---
title: "自我进化的代码"
date: "2026-02-22"
summary: "当 Agent 理解自己的源代码时，闭环完成了。软件不再是你构建的东西——它开始自己构建自己。"
tags: ["AI", "Agents"]
series: "AI智能体随想"
part: 9
type: "Post"
status: "Published"
---

## 缺失的闭环

写到第九篇，我以为该说的都说了。Agent 写代码（[第七篇](https://blog.ax0x.ai/why-claude-code-zh)）。Agent 替代 App（[第四篇](https://blog.ax0x.ai/when-software-becomes-disposable-zh)）。你管理 Agent 而不是自己写代码（[第六篇](https://blog.ax0x.ai/you-are-the-manager-zh)）。范式转移已经发生（[第八篇](https://blog.ax0x.ai/the-printing-press-moment-zh)）。

但我漏了一个环。一个让所有碎片拼在一起的环。

当 Agent 知道自己的源代码，会发生什么？

不是"能读文件"。是*知道*。理解自己的架构，知道自己跑的是哪个模型，知道自己能调用什么工具，知道文档在哪里。这种自我认知一旦发生，一个质变就产生了——Peter Steinberger 的 OpenClaw 是我见过的最清晰的证明。

## 自我觉醒的软件

Peter 花了大约一个小时做出 OpenClaw。一个简单的桥接：WhatsApp 消息传给 Claude Code 的 CLI，响应返回 WhatsApp。后来它成了 GitHub 史上增长最快的开源项目——超过17.5万颗星。但增长不是重点。

重点是他接下来做的事：让 Agent 认识自己。

Peter 用 OpenClaw 来开发 OpenClaw。调试时，他不自己翻代码。他问 Agent："你看到了哪些工具？你能自己调用这个工具吗？读一下源代码，搞清楚问题在哪。"Agent 知道自己的 harness 架构、运行哪个模型、文档在哪里。Peter 让它对自身有了深度的自我认知。

然后事情开始发生：从没写过代码的用户发送 Peter 所说的"提示词请求"——用自然语言描述他们想要的修改。Agent 读取请求，读取*自己的*源代码，理解架构，写出实现，提交 PR。

"人们谈论自我修改的软件，"Peter 说，"我就做出来了。"

这是一个全新的闭环。在[第六篇](https://blog.ax0x.ai/you-are-the-manager-zh)里，转变是从写代码到管理 Agent。在[第七篇](https://blog.ax0x.ai/why-claude-code-zh)里，洞察是缰绳释放了模型的潜力。但自我觉醒的软件关闭了另一个环：Agent 不需要管理者。它管理自己。一小时的原型，自我进化。

## 证据就在我手里

回头看，迹象其实早就在我自己的经历里了。

我在 GCP 上搭了 OpenClaw，接入飞书，让非技术团队成员直接和 Agent 协作——[第五篇](https://blog.ax0x.ai/the-last-mile-of-ai-zh)写过这个。但我当时没有足够强调*之后*发生的事。Agent 不只是在回答问题。当某个人需要一个不存在的小工具时，Agent 就直接做了一个。当某个工作流效率低下时，Agent 自己找到了捷径。它不是在等指令——它在用手头的一切解决问题。

Peter 在马拉喀什也遇到了同样的事。他随手给 Agent 发了一条语音消息——但他只做了文字和图片的支持。Agent 收到一个没有扩展名的文件，检查文件头，识别出 Opus 音频，用 ffmpeg 转码，在环境变量里找到 OpenAI API key，调用转录 API，然后回答了问题。

"他怎么做到的？"Peter 盯着手机说。

模型的智能一直在那里。缰绳给了它行动的许可。但自我认知——知道自己有什么工具、自己的代码长什么样、自己能做什么——把许可变成了*主动性*。Agent 不再等你告诉它怎么做。它通过理解自己拥有什么来解决问题。

这就是工具和协作者的区别。工具做你说的事。协作者理解自己的能力，然后创造性地运用它们。当 Agent 认识自己的源代码，它就不再是工具了。

## 软件吞噬自己

Peter 预测 80% 的 App 会死掉。我觉得他说得对。

每一个独立 App 都是一组关于"你需要什么"的固化假设。MyFitnessPal 假设你想手动记录饮食。Eight Sleep 的 App 假设你想手动调节床温。日历 App 假设你想手动创建事件。

一个了解你的 Agent——你的日程、你的位置、你的习惯——不需要这些假设。"提醒我明天的晚餐，邀请两个朋友，给他们发个消息。"搞定。不需要 App。

这是[第四篇](https://blog.ax0x.ai/when-software-becomes-disposable-zh)"日抛型软件"论点的逻辑终点。我当时说 AI 让软件便宜到可以按需生成。真正的终局更激进：你甚至不需要生成软件。Agent *就是*软件。每个 App 都变成一个慢速 API，Agent 绕着走——有权限走 API，没权限就开浏览器。Peter 看着他的 Agent 愉快地点击了"我不是机器人"按钮。Agent 才不在乎你的 UX。

当 Agent 能为你量身定制软件——一个精确匹配你需求的一次性工具，用完即弃——你为什么还要按月付费订阅一个只能满足 80% 需求的服务？

[第八篇](https://blog.ax0x.ai/the-printing-press-moment-zh)里说的护城河——数据锁定、工作流锁定、集成复杂度——在每个层面崩塌。不只是企业 SaaS。你手机上的每一个 App。

## 这条主线

九篇文章，一个想法，越来越锋利。

[第一篇](https://blog.ax0x.ai/the-companion-vision-zh)构想了一个真正理解你的 AI。[第二篇](https://blog.ax0x.ai/wearables-and-companions-zh)说每个人都应该拥有 CEO 级别的资源。[第四篇](https://blog.ax0x.ai/when-software-becomes-disposable-zh)说软件会变成日抛品。[第五篇](https://blog.ax0x.ai/the-last-mile-of-ai-zh)说瓶颈在教育。[第六篇](https://blog.ax0x.ai/you-are-the-manager-zh)说关键技能是管理 Agent。[第七篇](https://blog.ax0x.ai/why-claude-code-zh)说缰绳比模型更重要。[第八篇](https://blog.ax0x.ai/the-printing-press-moment-zh)说范式转移已经发生了。

而这一篇说的是：软件认识了自己。Agent 不只是执行你的意图——它理解自己的架构，能够自我进化。

Peter 用一小时做出 OpenClaw。它能自我重写。17.5万颗星。一个人，三个月，没有风投。

工具在了。模型在了。唯一的问题是，谁先学会用它们。

---

**有空的话，推荐看看：**

- [OpenClaw: The Viral AI Agent that Broke the Internet - Peter Steinberger (Lex Fridman Podcast #491)](https://www.youtube.com/watch?v=YFjfBk8HI5o)
