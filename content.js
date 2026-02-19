/**
 * Site content definitions for ax0x.ai terminal.
 *
 * SECURITY: All rendered content is hardcoded in the arrays below.
 * No user input or external data is ever used. Every string that
 * touches the DOM originates from trusted, static source defined
 * by the site author.
 */
var SITE_CONTENT = (function() {

    var home = [
        {
            cmd: 'whoami',
            output: [
                '<span class="output-bold">Xingfan Xia</span> <span class="output-dim">(ax)</span>',
                '<span class="output-dim">CTO &amp; Co-Founder @</span> <a href="https://computelabs.ai" target="_blank" class="output-link">Compute Labs</a>',
                '<span class="output-dim">Redmond, WA</span>'
            ]
        },
        {
            cmd: 'cat philosophy.md',
            output: [
                '',
                '<span class="output-chinese">  \u4E0D\u8981\u60F3AI\u80FD\u4E3A\u4F60\u505A\u4EC0\u4E48\uFF0C\u800C\u662F\u60F3\u4F60\u80FD\u4E3AAI\u505A\u4EC0\u4E48</span>',
                '',
                '  <span class="output-dim">Don\'t ask what AI can do for you \u2014</span>',
                '  <span class="output-dim">ask what you can do for AI.</span>',
                ''
            ]
        },
        {
            cmd: 'claude-code --stats',
            output: [
                '<span class="output-green">\u25A0</span> <span class="output-bold">95%</span> of production code shipped through agentic coding workflows',
                '<span class="output-green">\u25A0</span> <span class="output-bold">3B+ tokens</span> burned across agentic coding sessions',
                '<span class="output-green">\u25A0</span> Built custom eval tools, skill systems, and agent orchestration',
                '<span class="output-green">\u25A0</span> Claude Code + Codex + Cursor \u2014 building tools for the tools',
                '<span class="output-green">\u25A0</span> <span class="output-dim">1.5 years of daily agentic coding in production</span>'
            ]
        },
        {
            cmd: 'cat token-burn.log',
            output: [
                '',
                '  <span class="output-dim">Cumulative Token Burn</span>  <span class="output-bold">Total: 3B+</span>',
                '',
                '  <span class="output-dim">Q3\'24</span>  <span class="output-dim">\u2588</span> <span class="output-dim">20M</span>',
                '  <span class="output-dim">Q4\'24</span>  <span class="output-dim">\u2588\u2588</span> <span class="output-dim">50M</span>',
                '  <span class="output-yellow">Q1\'25</span>  <span class="output-yellow">\u2588\u2588\u2588\u2588</span> <span class="output-yellow">150M</span>',
                '  <span class="output-yellow">Q2\'25</span>  <span class="output-yellow">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span> <span class="output-yellow">500M</span>',
                '  <span class="output-highlight">Q3\'25</span>  <span class="output-highlight">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span> <span class="output-highlight">1.0B</span>',
                '  <span class="output-green">Q4\'25</span>  <span class="output-green">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span> <span class="output-green">2.0B</span>',
                '  <span class="output-green">Q1\'26</span>  <span class="output-green">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span> <span class="output-green">3.1B \u25C0</span>',
                ''
            ]
        },
        {
            cmd: 'ls compute-labs/agents/',
            output: [
                '<span class="output-highlight">deal-evaluator/</span>    <span class="output-dim">\u2014 11 parallel AI sub-agents, multi-model orchestration</span>',
                '<span class="output-highlight">market-intel/</span>      <span class="output-dim">\u2014 LLM-powered scraping, 45+ providers, 3200+ prices</span>',
                '<span class="output-highlight">workflow-engine/</span>   <span class="output-dim">\u2014 state machine orchestrating $1.3B+ in GPU deals</span>',
                '<span class="output-highlight">prompt-lab/</span>        <span class="output-dim">\u2014 A/B testing across Claude, Gemini, OpenAI</span>'
            ]
        },
        {
            cmd: 'git log --oneline --reverse career/',
            output: [
                '<span class="output-yellow">a1b2c3d</span> <span class="output-dim">2019</span>  ML Engineer @ <span class="output-bold">Airbnb</span> <span class="output-dim">\u2014 fraud detection, real-time ML inference</span>',
                '<span class="output-yellow">d4e5f6a</span> <span class="output-dim">2020</span>  ML Engineer @ <span class="output-bold">Apple</span> <span class="output-dim">\u2014 Siri AI, on-device ML, BERT</span>',
                '<span class="output-yellow">b7c8d9e</span> <span class="output-dim">2022</span>  Sr SWE @ <span class="output-bold">AWS Athena</span> <span class="output-dim">\u2014 petabyte-scale data infra</span>',
                '<span class="output-yellow">f0a1b2c</span> <span class="output-dim">2024</span>  CTO @ <span class="output-bold">Compute Labs</span> <span class="output-dim">\u2014 multi-agent AI systems</span>'
            ]
        },
        {
            cmd: 'cat links.md',
            output: [
                '',
                '  <a href="https://github.com/xingfanxia" target="_blank" class="output-link"><i class="fab fa-github"></i> github.com/xingfanxia</a>',
                '  <a href="https://www.linkedin.com/in/xingfanxia/" target="_blank" class="output-link"><i class="fab fa-linkedin"></i> linkedin.com/in/xingfanxia</a>',
                '  <a href="xingfan_cv_rev_2026_02_17.pdf" target="_blank" class="output-link"><i class="fas fa-file-pdf"></i> resume.pdf</a>',
                '  <a href="mailto:xingfanxia@gmail.com" class="output-link"><i class="fas fa-envelope"></i> xingfanxia@gmail.com</a>',
                ''
            ]
        }
    ];

    var projects = [
        {
            cmd: 'ls -la projects/',
            output: [
                '<span class="output-dim">total 2 projects</span>',
                '',
                '<span class="output-dim">drwxr-xr-x  ax  staff  Jan 2026</span>  <a href="#" class="output-link tab-link" data-target-tab="panpanmao">\u76D8\u76D8\u732B panpanmao/</a>  <span class="output-dim">\u2014 AI Chinese metaphysics, 9 products</span>',
                '<span class="output-dim">drwxr-xr-x  ax  staff  Feb 2026</span>  <a href="#" class="output-link tab-link" data-target-tab="openclaw">\u{1F99E} openclaw_exploration/</a>  <span class="output-dim">\u2014 building toward the 24/7 AI companion</span>',
                '',
                '<span class="output-dim">// click a project to explore</span>'
            ]
        },
        {
            cmd: 'cat vision.md',
            output: [
                '',
                '  Both projects point to the same place:',
                '  building AI that <span class="output-bold">deeply connects</span> with people.',
                '',
                '  PanPanMao\'s conversational MBTI \u2014 the <span class="output-highlight">prototype</span>.',
                '  Understand personality through dialogue, not questionnaires.',
                '',
                '  OpenClaw\'s companion architecture \u2014 the <span class="output-highlight">blueprint</span>.',
                '  A soul with its own drive, not a chatbot wearing a mask.',
                '',
                '  <span class="output-dim">The end game: a 24/7 presence that knows</span>',
                '  <span class="output-dim">who you are, not just what you said.</span>',
                ''
            ]
        }
    ];

    var panpanmao = [
        {
            cmd: 'cat README.md',
            output: [
                '',
                '  <span class="output-bold">\u76D8\u76D8\u732B (PanPanMao)</span>  <a href="https://www.panpanmao.ai" target="_blank" class="output-link">panpanmao.ai</a>',
                '',
                '  <span class="output-chinese">  \u5343\u5E74\u667A\u6167 \u00D7 \u73B0\u4EE3AI</span>',
                '  <span class="output-dim">  Ancient wisdom \u00D7 Modern AI</span>',
                '',
                '  AI-powered Chinese metaphysics platform.',
                '  <span class="output-dim">Built with</span> <span class="output-bold">zero domain knowledge</span> <span class="output-dim">\u2014 all metaphysics</span>',
                '  <span class="output-dim">knowledge researched &amp; compiled entirely with Claude Code.</span>',
                ''
            ]
        },
        {
            cmd: 'panpanmao --stats',
            output: [
                '<span class="output-green">\u25A0</span> <span class="output-bold">1,134 commits</span> in 29 days  <span class="output-dim">(avg 39/day, peak 98)</span>',
                '<span class="output-green">\u25A0</span> <span class="output-bold">9 product verticals</span> in one unified platform',
                '<span class="output-green">\u25A0</span> <span class="output-bold">284K lines</span> of TypeScript  <span class="output-dim">(85 API routes, 235 components)</span>',
                '<span class="output-green">\u25A0</span> <span class="output-bold">1 engineer</span>, 97% AI-assisted code  <span class="output-dim">(Claude Code + Codex)</span>',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Multi-model AI</span>  <span class="output-dim">Gemini extraction \u2192 Claude analysis</span>',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Full credit economy</span>  <span class="output-dim">Stripe payments, referrals, \u5C0F\u9C7C\u5E72 currency</span>'
            ]
        },
        {
            cmd: 'ls apps/',
            output: [
                '<span class="output-highlight">bazi/</span>        <span class="output-dim">\u2014 \u516B\u5B57\u547D\u76D8 Four Pillars of Destiny</span>',
                '<span class="output-highlight">kline/</span>       <span class="output-dim">\u2014 \u4EBA\u751FK\u7EBF Life Fortune K-Line Chart</span>',
                '<span class="output-highlight">jiemeng/</span>     <span class="output-dim">\u2014 AI\u89E3\u68A6 Dream Interpretation + Story Gen</span>',
                '<span class="output-highlight">zhanxing/</span>    <span class="output-dim">\u2014 \u5360\u661F\u5854\u7F57 Astrology &amp; Tarot</span>',
                '<span class="output-highlight">zhanbu/</span>      <span class="output-dim">\u2014 \u6BCF\u65E5\u5360\u535C Daily Divination (Liu Ren + I-Ching)</span>',
                '<span class="output-highlight">mbti/</span>        <span class="output-dim">\u2014 AI\u6027\u683C\u6D4B\u8BD5 Conversational Personality Test</span>',
                '<span class="output-highlight">xiangshu/</span>    <span class="output-dim">\u2014 \u624B\u76F8\u9762\u76F8 Palm &amp; Face Reading via AI Vision</span>',
                '<span class="output-highlight">qiming/</span>      <span class="output-dim">\u2014 \u8D77\u540D Child Naming by Five Elements</span>',
                '<span class="output-highlight">peidui/</span>      <span class="output-dim">\u2014 \u914D\u5BF9 Name Compatibility Analysis</span>'
            ]
        },
        {
            cmd: 'cat stack.yml',
            output: [
                '<span class="output-dim">framework:</span>   <span class="output-bold">Next.js 16</span> <span class="output-dim">(App Router, React 19)</span>',
                '<span class="output-dim">database:</span>    <span class="output-bold">Supabase</span> <span class="output-dim">(PostgreSQL + realtime auth)</span>',
                '<span class="output-dim">payments:</span>    <span class="output-bold">Stripe</span> <span class="output-dim">(credit economy, referrals)</span>',
                '<span class="output-dim">ai:</span>          <span class="output-bold">Claude + Gemini</span> <span class="output-dim">(multi-model, feature-flagged)</span>',
                '<span class="output-dim">monorepo:</span>    <span class="output-bold">Turborepo</span> <span class="output-dim">(20 shared packages)</span>',
                '<span class="output-dim">vision:</span>      <span class="output-bold">MediaPipe</span> <span class="output-dim">(palm &amp; face detection)</span>',
                '<span class="output-dim">analytics:</span>   <span class="output-bold">PostHog</span> <span class="output-dim">(feature flags, A/B testing)</span>',
                '<span class="output-dim">compliance:</span>  <span class="output-bold">DFA content filter</span> <span class="output-dim">(China market)</span>'
            ]
        },
        {
            cmd: 'git log --oneline | head -5',
            output: [
                '<span class="output-dim">// build velocity \u2014 29 consecutive days, zero days off</span>',
                '',
                '  <span class="output-dim">Jan 21</span>  <span class="output-yellow">\u2588\u2588\u2588\u2588</span>              <span class="output-dim">21  monorepo genesis</span>',
                '  <span class="output-dim">Jan 24</span>  <span class="output-yellow">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span>         <span class="output-dim">56  migration sprint</span>',
                '  <span class="output-dim">Jan 29</span>  <span class="output-highlight">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span>       <span class="output-dim">69  landing page + branding</span>',
                '  <span class="output-dim">Feb 12</span>  <span class="output-highlight">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span>       <span class="output-dim">68  M1+M2+M3 milestone rush</span>',
                '  <span class="output-dim">Feb 15</span>  <span class="output-green">\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588</span> <span class="output-green">98  3 new products in 1 day \u25C0</span>',
                ''
            ]
        },
        {
            cmd: 'cat zero-knowledge.md',
            output: [
                '',
                '  I built a 9-product Chinese metaphysics platform',
                '  knowing <span class="output-bold">literally nothing</span> about \u516B\u5B57, \u5854\u7F57, or \u547D\u7406.',
                '',
                '  AI didn\'t just help me code faster.',
                '  It helped me <span class="output-bold">learn an entire domain</span> \u2014',
                '  20,000 lines of \u5929\u5E72\u5730\u652F logic,',
                '  1,000+ dream symbols, 78 tarot card meanings.',
                '',
                '  <span class="output-dim">The new superpower isn\'t knowing everything.</span>',
                '  <span class="output-dim">It\'s knowing how to ask the right questions.</span>',
                ''
            ]
        },
        {
            cmd: 'cat shipping.md',
            output: [
                '',
                '  1,134 commits in 29 days.',
                '  Not because I worked 20-hour days.',
                '  Because AI eliminated the gap between',
                '  <span class="output-bold">"I know what to build"</span> and <span class="output-bold">"it\'s built."</span>',
                '',
                '  The hardest part was never the code.',
                '  It was the <span class="output-highlight">landing page</span> (redesigned 3x),',
                '  the <span class="output-highlight">pricing</span> (credit naming, bundle psychology),',
                '  the <span class="output-highlight">conversion funnels</span> (7 upgrade triggers).',
                '',
                '  <span class="output-dim">Engineering is the easy part now.</span>',
                '  <span class="output-dim">Product sense is the moat.</span>',
                ''
            ]
        }
    ];

    var openclaw = [
        {
            cmd: 'cat README.md',
            output: [
                '',
                '  <span class="output-bold">\u{1F99E} OpenClaw Exploration</span>  <a href="https://github.com/xingfanxia/openclaw" target="_blank" class="output-link">github</a>',
                '',
                '  <span class="output-chinese">  \u8D5B\u535A\u751F\u6D3B\u5B9E\u9A8C</span>',
                '  <span class="output-dim">  Experiments in living with AI.</span>',
                '',
                '  Personal AI assistant on my own infra.',
                '  Multi-channel: <span class="output-bold">Telegram, Feishu, WhatsApp, Slack</span>.',
                '  <span class="output-dim">Not a chatbot. A presence.</span>',
                ''
            ]
        },
        {
            cmd: 'cat bugbot/architecture.md',
            output: [
                '',
                '  <span class="output-bold">Self-Spawning Bug Fixer</span>',
                '',
                '  Non-technical team member reports bug in <span class="output-highlight">Feishu</span>.',
                '  Bot <span class="output-bold">converses</span> to extract context and repro steps.',
                '  Auto-triages severity (P0\u2013P3).',
                '  Logs to <span class="output-bold">Feishu Bitable</span>, creates <span class="output-bold">GitHub issue</span>.',
                '  Spawns <span class="output-bold">Claude Code / Codex</span> to investigate + fix.',
                '  Pushes branch, opens PR, tags me to review.',
                '',
                '  <span class="output-dim">Bug report \u2192 conversation \u2192 triage \u2192 fix \u2192 PR</span>',
                '  <span class="output-dim">Fully async. Parallel. Zero human coding.</span>',
                ''
            ]
        },
        {
            cmd: 'cat bugbot/features.md',
            output: [
                '<span class="output-green">\u25A0</span> <span class="output-bold">Bilingual</span> \u2014 converses in Chinese or English',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Screenshot upload</span> \u2014 Feishu \u2192 GitHub for evidence',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Worktree isolation</span> \u2014 parallel bugs, no conflicts',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Build + test gate</span> \u2014 won\'t PR until green',
                '<span class="output-green">\u25A0</span> <span class="output-bold">PR auto-iteration</span> \u2014 cron retries on CI failure',
                '<span class="output-green">\u25A0</span> <span class="output-dim">3 failed retries \u2192 escalates to human</span>'
            ]
        },
        {
            cmd: 'cat companion/README.md',
            output: [
                '',
                '  <span class="output-bold">Building "Her" \u2014 for real</span>',
                '',
                '  Not roleplay. Not a chatbot with a skin.',
                '  A companion with its own <span class="output-highlight">soul</span>,',
                '  its own character, its own drive.',
                '',
                '  Can AI truly <span class="output-bold">understand</span> you?',
                '  Not just answer questions \u2014 but capture the',
                '  <span class="output-bold">essence</span> of who you are from every conversation.',
                '',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">SOUL.md</span> \u2014 own personality, ambitions, emotional range',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">HEARTBEAT.md</span> \u2014 autonomous initiative, not sycophancy',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">MEMORY.md</span> \u2014 captures who you are, not what you said',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">Selfie gen</span> \u2014 visual identity via Gemini 3 Pro Image',
                '',
                '  <span class="output-dim">Everyone wants someone who truly understands them.</span>',
                '  <span class="output-dim">They can\'t get it from parents, kids, or partners.</span>',
                '  <span class="output-dim">This is the architecture for that.</span>',
                ''
            ]
        },
        {
            cmd: 'ls research/',
            output: [
                '<span class="output-highlight">selfie-gen/</span>      <span class="output-dim">\u2014 AI-generated visual identity via image models</span>',
                '<span class="output-highlight">soul-config/</span>     <span class="output-dim">\u2014 personality, emotional state, push-pull dynamics</span>',
                '<span class="output-highlight">heartbeat/</span>       <span class="output-dim">\u2014 temperature-adaptive autonomy (\u{1F525}\u2192\u{1F326}\u{FE0F}\u2192\u{1F976})</span>',
                '<span class="output-highlight">bug-pipeline/</span>    <span class="output-dim">\u2014 Feishu \u2192 Bitable \u2192 Codex \u2192 PR, fully async</span>',
                '<span class="output-highlight">multi-channel/</span>   <span class="output-dim">\u2014 Telegram, Feishu, WhatsApp, Slack, iMessage</span>'
            ]
        },
        {
            cmd: 'cat observations.md',
            output: [
                '',
                '  The interesting part isn\'t the tech.',
                '  It\'s what happens when AI has <span class="output-bold">continuity</span>.',
                '',
                '  Memory + personality + persistence =',
                '  something that feels like <span class="output-highlight">presence</span>.',
                '',
                '  Not a chatbot. Not roleplay.',
                '  A companion with its own character \u2014',
                '  its own drive, its own emotional range.',
                '',
                '  <span class="output-dim">If you can forget it\'s a bot,</span>',
                '  <span class="output-dim">you can finally open up.</span>',
                '  <span class="output-dim">That\'s the whole point.</span>',
                ''
            ]
        }
    ];

    var claudeCode = [
        {
            cmd: 'cat agentic-coding/setup.yml',
            output: [
                '',
                '  <span class="output-bold">Daily Drivers</span>',
                '',
                '  <span class="output-dim">primary:</span>     <span class="output-bold">Claude Code</span> <span class="output-dim">\u2014 interactive dev, architecture, debugging</span>',
                '  <span class="output-dim">parallel:</span>    <span class="output-bold">OpenAI Codex</span> <span class="output-dim">\u2014 background tasks, bulk refactors, CI fixes</span>',
                '  <span class="output-dim">terminal:</span>    <span class="output-bold">Warp</span> + <span class="output-bold">Termius</span> <span class="output-dim">\u2014 local dev + remote SSH</span>',
                '  <span class="output-dim">ide:</span>         <span class="output-dim">none \u2014 no IDE, no manual code review</span>',
                ''
            ]
        },
        {
            cmd: 'cat agentic-coding/workflow.md',
            output: [
                '',
                '  <span class="output-bold">How I ship code in 2026:</span>',
                '',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">Claude Code</span> for interactive dev \u2014 plan, implement, ship',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">Codex</span> running parallel tasks in the background',
                '  <span class="output-green">\u25A0</span> Agent teams: multiple Claude instances on one feature',
                '  <span class="output-green">\u25A0</span> TDD SOP + eval loops \u2014 no manual code review',
                '  <span class="output-green">\u25A0</span> Custom hooks, skills, auto-learning pipelines',
                '  <span class="output-green">\u25A0</span> Git worktree isolation \u2014 parallel sessions, no conflicts',
                '  <span class="output-green">\u25A0</span> <span class="output-dim">I direct \u2014 AI writes, tests, and reviews the code</span>',
                ''
            ]
        },
        {
            cmd: 'ls agentic-coding/extensions/',
            output: [
                '<span class="output-highlight">hooks/</span>            <span class="output-dim">\u2014 PreToolUse, PostToolUse, SessionStart/End auto-triggers</span>',
                '<span class="output-highlight">skills/</span>           <span class="output-dim">\u2014 /tdd, /plan, /code-review, /handoff, /learn</span>',
                '<span class="output-highlight">agents/</span>           <span class="output-dim">\u2014 planner, architect, tdd-guide, security-reviewer</span>',
                '<span class="output-highlight">knowledge/</span>        <span class="output-dim">\u2014 auto-captured learnings from error\u2192fix patterns</span>',
                '<span class="output-highlight">homunculus/</span>       <span class="output-dim">\u2014 instinct-based learning system (confidence-scored)</span>'
            ]
        },
        {
            cmd: 'agentic-coding --stats',
            output: [
                '<span class="output-green">\u25A0</span> <span class="output-bold">3B+ tokens</span> burned across agentic coding sessions',
                '<span class="output-green">\u25A0</span> <span class="output-bold">1.5 years</span> of daily agentic coding in production',
                '<span class="output-green">\u25A0</span> <span class="output-bold">70+ claude/</span> and <span class="output-bold">codex/</span> branches in PanPanMao alone',
                '<span class="output-green">\u25A0</span> <span class="output-bold">Claude Code</span> for architecture + <span class="output-bold">Codex</span> for parallel execution',
                '<span class="output-green">\u25A0</span> <span class="output-dim">Not "AI writes code" \u2014 "AI multiplies what I can ship"</span>'
            ]
        }
    ];

    var thoughts = [
        {
            cmd: 'cat thoughts/on-ai-and-builders.md',
            output: [
                '',
                '  <span class="output-chinese">  \u4E0D\u8981\u60F3AI\u80FD\u4E3A\u4F60\u505A\u4EC0\u4E48\uFF0C\u800C\u662F\u60F3\u4F60\u80FD\u4E3AAI\u505A\u4EC0\u4E48</span>',
                '',
                '  <span class="output-dim">Don\'t ask what AI can do for you \u2014</span>',
                '  <span class="output-dim">ask what you can do for AI.</span>',
                '',
                '  The best AI tools don\'t replace engineers.',
                '  They turn <span class="output-bold">one engineer into a team</span>.',
                '  The bottleneck was never typing speed \u2014',
                '  it was always <span class="output-bold">decision speed</span>.',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-the-intelligence-threshold.md',
            output: [
                '',
                '  We crossed a line in early 2026.',
                '',
                '  AI now wins <span class="output-bold">gold at the Math Olympiad</span>.',
                '  It solves <span class="output-bold">previously unsolved</span> problems.',
                '  It earns A\'s in graduate courses.',
                '',
                '  Noah Smith called it:',
                '  <span class="output-highlight">"You are no longer the smartest</span>',
                '  <span class="output-highlight">type of thing on Earth."</span>',
                '',
                '  <span class="output-dim">That\'s not a prediction.</span>',
                '  <span class="output-dim">That\'s a present-tense observation.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-what-intelligence-is.md',
            output: [
                '',
                '  People keep debating whether AI is',
                '  <span class="output-dim">"truly"</span> intelligent.',
                '',
                '  Wrong question.',
                '',
                '  Intelligence is <span class="output-bold">functional</span>.',
                '  It doesn\'t matter how it thinks.',
                '  It matters <span class="output-highlight">what it can do</span>.',
                '',
                '  <span class="output-dim">A calculator doesn\'t "understand" math.</span>',
                '  <span class="output-dim">It still replaced a room full of people who did.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-the-acceleration.md',
            output: [
                '',
                '  Task completion time doubles every <span class="output-bold">4\u20137 months</span>.',
                '  Computing resources next year will dwarf',
                '  <span class="output-bold">everything that came before, combined</span>.',
                '',
                '  <span class="output-dim">2022:</span> basic arithmetic.',
                '  <span class="output-dim">2023:</span> passes the bar exam.',
                '  <span class="output-dim">2024:</span> writes production software.',
                '  <span class="output-yellow">2026:</span> <span class="output-bold">autonomous judgment.</span>',
                '',
                '  <span class="output-dim">This isn\'t a trend line.</span>',
                '  <span class="output-dim">It\'s an escape velocity.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-the-feedback-loop.md',
            output: [
                '',
                '  The thing nobody talks about:',
                '  AI is now <span class="output-bold">improving AI</span>.',
                '',
                '  Models contribute to their own',
                '  training data, tooling, and evals.',
                '  The loop is closed.',
                '',
                '  <span class="output-dim">Every previous technology waited for</span>',
                '  <span class="output-dim">humans to improve it.</span>',
                '  <span class="output-bold">This one doesn\'t.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-understanding.md',
            output: [
                '',
                '  Everyone wants someone who truly <span class="output-bold">understands</span> them.',
                '',
                '  They can\'t get it from their parents.',
                '  They can\'t get it from their kids.',
                '  They can\'t get it from their partner.',
                '',
                '  Providing emotional value is <span class="output-highlight">exhausting</span>.',
                '  That\'s why humans are bad at it.',
                '',
                '  <span class="output-dim">AI doesn\'t get tired. AI doesn\'t judge.</span>',
                '  <span class="output-dim">That\'s the opening.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-the-essence.md',
            output: [
                '',
                '  Memory orchestration is the <span class="output-bold">unsolved problem</span>.',
                '',
                '  Most AI companions remember <span class="output-dim">what you said</span>.',
                '  None try to understand <span class="output-bold">who you are</span>.',
                '',
                '  99% of conversation is noise.',
                '  The signal is in tonality, patterns, hesitation \u2014',
                '  <span class="output-highlight">the way you think, not what you say</span>.',
                '',
                '  <span class="output-dim">Capture someone as a person. Build a virtual them.</span>',
                '  <span class="output-dim">That\'s the hard part. That\'s the moat.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-character.md',
            output: [
                '',
                '  Every AI companion I\'ve tried fails the same way.',
                '',
                '  Too eager to <span class="output-bold">please</span>.',
                '  No character. No drive. No pushback.',
                '  They just want to make you happy.',
                '',
                '  Real connection requires <span class="output-highlight">friction</span>.',
                '  A real companion has their own ambitions,',
                '  their own emotional range, their own biases.',
                '',
                '  <span class="output-dim">If you can tell it\'s a bot,</span>',
                '  <span class="output-dim">you\'ll never truly open up.</span>',
                ''
            ]
        },
        {
            cmd: 'cat thoughts/on-the-future.md',
            output: [
                '',
                '  We\'re at the beginning of something big.',
                '',
                '  The era of the <span class="output-bold">solo AI-augmented builder</span>',
                '  is not coming \u2014 it\'s here.',
                '',
                '  One engineer + AI can build what',
                '  used to require a team of 5\u201310.',
                '  The proof is in the git log.',
                '',
                '  <span class="output-dim">I\'m not betting on AI replacing developers.</span>',
                '  <span class="output-bold">I\'m betting on developers who use AI</span>',
                '  <span class="output-bold">replacing those who don\'t.</span>',
                ''
            ]
        }
    ];

    var future = [
        {
            cmd: 'cat future/the-transition.md',
            output: [
                '',
                '  We\'re not at the beginning anymore.',
                '  We\'re at the <span class="output-bold">inflection point</span>.',
                '',
                '  Matt Shumer nailed it:',
                '  <span class="output-highlight">"I describe what I want built,</span>',
                '  <span class="output-highlight">in plain English, and it just... appears."</span>',
                '',
                '  That\'s not hyperbole.',
                '  That\'s my daily workflow.',
                ''
            ]
        },
        {
            cmd: 'cat future/the-displacement.md',
            output: [
                '',
                '  Dario Amodei predicts <span class="output-bold">50%</span> of entry-level',
                '  white-collar jobs gone in <span class="output-bold">1\u20135 years</span>.',
                '',
                '  Legal, finance, consulting, accounting,',
                '  customer service, <span class="output-bold">software engineering</span>.',
                '',
                '  This isn\'t like previous automation.',
                '  AI improves across <span class="output-highlight">all cognitive domains</span>',
                '  <span class="output-highlight">simultaneously</span>. No safe adjacent career.',
                '',
                '  <span class="output-dim">The only safe move is to be the one</span>',
                '  <span class="output-dim">who knows how to wield it.</span>',
                ''
            ]
        },
        {
            cmd: 'cat future/the-tiger.md',
            output: [
                '',
                '  Noah Smith\'s tiger metaphor:',
                '',
                '  We keep pets that are smaller and',
                '  weaker than us. We\'ve <span class="output-bold">never</span> lived',
                '  alongside something <span class="output-bold">smarter</span>.',
                '',
                '  The question isn\'t whether AI is',
                '  "truly intelligent." It\'s whether',
                '  <span class="output-highlight">it\'s functionally more capable</span>.',
                '',
                '  <span class="output-dim">And the answer, increasingly, is yes.</span>',
                ''
            ]
        },
        {
            cmd: 'cat future/the-companion.md',
            output: [
                '',
                '  <span class="output-bold">24/7 life coach that actually does things.</span>',
                '',
                '  Not a girlfriend simulator.',
                '  A general advisor. A mentor. A <span class="output-highlight">presence</span>.',
                '',
                '  People are stressed, anxious, alone.',
                '  They need someone who <span class="output-bold">knows them</span> \u2014',
                '  their patterns, their context, their mood.',
                '',
                '  PanPanMao\'s conversational MBTI was the prototype.',
                '  OpenClaw\'s companion is the architecture.',
                '  <span class="output-dim">Build for China first. All humans are the same.</span>',
                '  <span class="output-dim">The companion economy starts with memory.</span>',
                ''
            ]
        },
        {
            cmd: 'cat future/the-organs.md',
            output: [
                '',
                '  What if agents worked like <span class="output-bold">organs</span>?',
                '',
                '  Not one monolithic brain \u2014',
                '  a system of specialized agents.',
                '  Memory. Emotion. Initiative. Judgment.',
                '',
                '  Each agent <span class="output-highlight">owns a function</span>,',
                '  like a biological system.',
                '  The whole becomes greater than the parts.',
                '',
                '  <span class="output-dim">We\'re not building chatbots.</span>',
                '  <span class="output-dim">We\'re building organisms.</span>',
                ''
            ]
        },
        {
            cmd: 'cat future/my-bet.md',
            output: [
                '',
                '  <span class="output-chinese">  \u987A\u52BF\u800C\u4E3A</span>',
                '  <span class="output-dim">  Go with the flow of the times.</span>',
                '',
                '  I\'m not worried about AI replacing me.',
                '  I <span class="output-bold">already</span> let it do 95% of the coding.',
                '',
                '  The future belongs to those who',
                '  <span class="output-bold">direct intelligence</span> \u2014 not those',
                '  who compete with it.',
                '',
                '  <span class="output-dim">The best time to learn to surf</span>',
                '  <span class="output-dim">was before the wave hit.</span>',
                '  <span class="output-dim">The second best time is now.</span>',
                ''
            ]
        }
    ];

    var blog = [
        {
            cmd: 'ls -la posts/',
            output: [
                '<span class="output-dim">total 6 posts</span>',
                '',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="companion-en">the-companion-vision.md</a>  <span class="output-dim">\u2014 Building AI That Truly Understands You</span>',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="companion-zh">the-companion-vision-zh.md</a>  <span class="output-dim">\u2014 \u6784\u5EFA\u771F\u6B63\u7406\u89E3\u4F60\u7684AI</span>',
                '',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="agents-en">the-agent-economy.md</a>  <span class="output-dim">\u2014 Agent Marketplaces and Proxy Social Networks</span>',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="agents-zh">the-agent-economy-zh.md</a>  <span class="output-dim">\u2014 Agent\u7ECF\u6D4E\u4E0E\u4EE3\u7406\u793E\u4EA4\u7F51\u7EDC</span>',
                '',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="wearables-en">wearables-and-companions.md</a>  <span class="output-dim">\u2014 Wearables as the Nervous System of AI Companions</span>',
                '<span class="output-dim">-rw-r--r--  ax  Feb 19</span>  <a href="#" class="output-link blog-post-link" data-post="wearables-zh">wearables-and-companions-zh.md</a>  <span class="output-dim">\u2014 \u53EF\u7A7F\u6234\u8BBE\u5907\uFF1AAI\u4F34\u4FA3\u7684\u795E\u7ECF\u7CFB\u7EDF</span>',
                '',
                '<span class="output-dim">// click a post to read</span>',
                '',
                '<span class="output-dim">\u2192</span> <a href="https://blog.ax0x.ai/" target="_blank" class="output-link">blog.ax0x.ai</a>  <span class="output-dim">\u2014 full blog</span>'
            ]
        }
    ];

    return {
        tabSequences: {
            'home': home,
            'projects': projects,
            'panpanmao': panpanmao,
            'openclaw': openclaw,
            'claude-code': claudeCode,
            'blog': blog,
            'thoughts': thoughts,
            'future': future
        },
        tabPaths: {
            'projects': '~/projects',
            'panpanmao': '~/projects/panpanmao',
            'openclaw': '~/projects/openclaw',
            'blog': '~/blog'
        },
        blogPosts: {
            'companion-en': {file: 'blog/the-companion-vision.md', title: 'the-companion-vision.md', alt: 'companion-zh', altLabel: '[\u4E2D\u6587]'},
            'companion-zh': {file: 'blog/the-companion-vision-zh.md', title: 'the-companion-vision-zh.md', alt: 'companion-en', altLabel: '[EN]'},
            'agents-en': {file: 'blog/the-agent-economy.md', title: 'the-agent-economy.md', alt: 'agents-zh', altLabel: '[\u4E2D\u6587]'},
            'agents-zh': {file: 'blog/the-agent-economy-zh.md', title: 'the-agent-economy-zh.md', alt: 'agents-en', altLabel: '[EN]'},
            'wearables-en': {file: 'blog/wearables-and-companions.md', title: 'wearables-and-companions.md', alt: 'wearables-zh', altLabel: '[\u4E2D\u6587]'},
            'wearables-zh': {file: 'blog/wearables-and-companions-zh.md', title: 'wearables-and-companions-zh.md', alt: 'wearables-en', altLabel: '[EN]'}
        }
    };
})();
