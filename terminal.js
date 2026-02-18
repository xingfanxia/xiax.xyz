/**
 * Terminal emulator for ax0x.ai personal site.
 *
 * SECURITY: All rendered content is hardcoded in the sequence arrays
 * below. No user input or external data is ever used with innerHTML.
 * Every string that touches the DOM originates from trusted, static source
 * defined by the site author. This is a static personal site with zero
 * dynamic/user-generated content.
 */
(function() {
    'use strict';

    var terminal = document.getElementById('terminal');
    var lineCountEl = document.getElementById('line-count');
    var clickHint = document.getElementById('click-hint');
    var lineCount = 0;
    var speed = 1;
    var skipped = false;
    var activeTab = 'home';
    var runningTimers = [];

    document.addEventListener('click', function(e) {
        // Don't trigger skip when clicking tabs or links
        if (e.target.closest('.terminal-tab') || e.target.closest('a')) return;
        if (!skipped) {
            skipped = true;
            speed = 100;
            if (clickHint) clickHint.style.opacity = '0';
        }
    });

    function updateLineCount() {
        lineCount++;
        if (lineCountEl) lineCountEl.textContent = lineCount + ' lines';
    }

    function clearTimers() {
        for (var i = 0; i < runningTimers.length; i++) {
            clearTimeout(runningTimers[i]);
            clearInterval(runningTimers[i]);
        }
        runningTimers = [];
    }

    function trackedTimeout(fn, ms) {
        var id = setTimeout(fn, ms);
        runningTimers.push(id);
        return id;
    }

    function trackedInterval(fn, ms) {
        var id = setInterval(fn, ms);
        runningTimers.push(id);
        return id;
    }

    // Static prompt markup - no external input
    function promptMarkup(path) {
        return '<span class="prompt-user">ax</span>' +
               '<span class="prompt-at">@</span>' +
               '<span class="prompt-host">ax0x.ai</span>' +
               '<span class="prompt-colon">:</span>' +
               '<span class="prompt-path">' + (path || '~') + '</span>' +
               '<span class="prompt-dollar">$</span> ';
    }

    // Append a line to the terminal (static trusted content only)
    function addLine(staticHTML, cls) {
        var div = document.createElement('div');
        div.className = 'terminal-line' + (cls ? ' ' + cls : '');
        // SAFE: staticHTML is always a hardcoded string from this file
        div.innerHTML = staticHTML;
        terminal.appendChild(div);
        requestAnimationFrame(function() { div.classList.add('visible'); });
        updateLineCount();
        terminal.scrollTop = terminal.scrollHeight;
        return div;
    }

    function addSeparator() {
        var hr = document.createElement('hr');
        hr.className = 'separator';
        terminal.appendChild(hr);
    }

    function makeCursor() {
        var el = document.createElement('span');
        el.className = 'cursor';
        return el;
    }

    function colorFlags(text) {
        return text.replace(/(--\w+)/g, '<span class="prompt-flag">$1</span>');
    }

    function typeCommand(cmd, cb) {
        var line = addLine(promptMarkup(activeTab === 'projects' ? '~/projects' : '~'), '');
        var base = line.innerHTML;
        var i = 0;
        var iv = trackedInterval(function() {
            if (i < cmd.length) {
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd.substring(0, i + 1)) + '</span>';
                line.appendChild(makeCursor());
                i++;
            } else {
                clearInterval(iv);
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd) + '</span>';
                trackedTimeout(cb, Math.max(300 / speed, 5));
            }
        }, Math.max(35 / speed, 2));
    }

    function typeOutput(lines, cb) {
        var idx = 0;
        (function next() {
            if (idx < lines.length) {
                addLine(lines[idx], 'output');
                idx++;
                trackedTimeout(next, Math.max(60 / speed, 3));
            } else {
                trackedTimeout(cb, Math.max(400 / speed, 5));
            }
        })();
    }

    // ---- Static content definitions (all trusted, author-written) ----

    var homeSequence = [
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

    var projectsSequence = [
        {
            cmd: 'ls -la projects/',
            output: [
                '<span class="output-dim">total 2 projects</span>',
                '<span class="output-dim">drwxr-xr-x  ax  staff  Jan 2026</span>  <span class="output-highlight">panpanmao/</span>',
                '<span class="output-dim">drwxr-xr-x  ax  staff  Feb 2026</span>  <span class="output-highlight">ax0x.ai/</span>',
                ''
            ]
        },
        {
            cmd: 'cat panpanmao/README.md',
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
            cmd: 'ls panpanmao/apps/',
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
            cmd: 'cat panpanmao/stack.yml',
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
            cmd: 'git log --oneline panpanmao/ | head -5',
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
        }
    ];

    var claudeCodeSequence = [
        {
            cmd: 'cat agentic-coding/setup.yml',
            output: [
                '',
                '  <span class="output-bold">Daily Drivers</span>',
                '',
                '  <span class="output-dim">primary:</span>     <span class="output-bold">Claude Code</span> <span class="output-dim">\u2014 interactive dev, architecture, debugging</span>',
                '  <span class="output-dim">parallel:</span>    <span class="output-bold">OpenAI Codex</span> <span class="output-dim">\u2014 background tasks, bulk refactors, CI fixes</span>',
                '  <span class="output-dim">ide:</span>         <span class="output-bold">Cursor</span> <span class="output-dim">\u2014 visual editing, quick inline changes</span>',
                ''
            ]
        },
        {
            cmd: 'cat agentic-coding/workflow.md',
            output: [
                '',
                '  <span class="output-bold">How I ship code in 2026:</span>',
                '',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">Claude Code</span> for interactive dev \u2014 plan, implement, review',
                '  <span class="output-green">\u25A0</span> <span class="output-bold">Codex</span> running parallel tasks in the background',
                '  <span class="output-green">\u25A0</span> Agent teams: multiple Claude instances on one feature',
                '  <span class="output-green">\u25A0</span> Custom hooks, skills, eval pipelines, auto-learning',
                '  <span class="output-green">\u25A0</span> Git worktree isolation \u2014 parallel sessions, no conflicts',
                '  <span class="output-green">\u25A0</span> <span class="output-dim">I direct and review \u2014 AI writes 95% of the code</span>',
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

    var thoughtsSequence = [
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
            cmd: 'cat thoughts/on-zero-knowledge-domains.md',
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
            cmd: 'cat thoughts/on-shipping.md',
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

    // Map tab names to their sequences
    var tabSequences = {
        'home': homeSequence,
        'projects': projectsSequence,
        'claude-code': claudeCodeSequence,
        'thoughts': thoughtsSequence
    };

    // ---- Tab switching ----

    var tabs = document.querySelectorAll('.terminal-tab');

    function switchTab(tabName) {
        if (tabName === activeTab) return;

        // Stop all running animations
        clearTimers();

        // Update active tab styling
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
            if (tabs[i].getAttribute('data-tab') === tabName) {
                tabs[i].classList.add('active');
            }
        }

        // Reset terminal
        activeTab = tabName;
        terminal.innerHTML = '';
        lineCount = 0;
        if (lineCountEl) lineCountEl.textContent = '0 lines';

        // Reset animation speed — type out at normal pace, click to skip
        skipped = false;
        speed = 1;
        if (clickHint) {
            clickHint.style.opacity = '1';
            clickHint.textContent = 'click anywhere to skip animation';
        }

        // Boot new tab content
        var seq = tabSequences[tabName] || homeSequence;
        addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
        trackedTimeout(function() { runSequence(seq, 0); }, Math.max(500 / speed, 10));
    }

    for (var t = 0; t < tabs.length; t++) {
        (function(tab) {
            tab.addEventListener('click', function(e) {
                e.stopPropagation();
                var tabName = tab.getAttribute('data-tab');
                switchTab(tabName);
            });
        })(tabs[t]);
    }

    // ---- Run ----

    function runSequence(seq, idx) {
        if (idx >= seq.length) {
            var finalLine = addLine(promptMarkup(activeTab === 'projects' ? '~/projects' : '~'), '');
            finalLine.appendChild(makeCursor());
            if (clickHint) clickHint.style.opacity = '0';
            return;
        }
        if (idx > 0) addSeparator();
        typeCommand(seq[idx].cmd, function() {
            typeOutput(seq[idx].output, function() {
                runSequence(seq, idx + 1);
            });
        });
    }

    // Boot home tab
    addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
    trackedTimeout(function() { runSequence(homeSequence, 0); }, Math.max(500 / speed, 10));

})();
