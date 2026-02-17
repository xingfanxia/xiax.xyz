/**
 * Terminal emulator for ax0x.ai personal site.
 *
 * SECURITY: All rendered content is hardcoded in the `sequence` array
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

    document.addEventListener('click', function() {
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

    // Static prompt markup - no external input
    function promptMarkup() {
        return '<span class="prompt-user">ax</span>' +
               '<span class="prompt-at">@</span>' +
               '<span class="prompt-host">ax0x.ai</span>' +
               '<span class="prompt-colon">:</span>' +
               '<span class="prompt-path">~</span>' +
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
        var line = addLine(promptMarkup(), '');
        var base = line.innerHTML;
        var i = 0;
        var iv = setInterval(function() {
            if (i < cmd.length) {
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd.substring(0, i + 1)) + '</span>';
                line.appendChild(makeCursor());
                i++;
            } else {
                clearInterval(iv);
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd) + '</span>';
                setTimeout(cb, Math.max(300 / speed, 5));
            }
        }, Math.max(35 / speed, 2));
    }

    function typeOutput(lines, cb) {
        var idx = 0;
        (function next() {
            if (idx < lines.length) {
                addLine(lines[idx], 'output');
                idx++;
                setTimeout(next, Math.max(60 / speed, 3));
            } else {
                setTimeout(cb, Math.max(400 / speed, 5));
            }
        })();
    }

    // ---- Static content definitions (all trusted, author-written) ----

    var sequence = [
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

    // ---- Run ----

    function runSequence(idx) {
        if (idx >= sequence.length) {
            var finalLine = addLine(promptMarkup(), '');
            finalLine.appendChild(makeCursor());
            if (clickHint) clickHint.style.opacity = '0';
            return;
        }
        if (idx > 0) addSeparator();
        typeCommand(sequence[idx].cmd, function() {
            typeOutput(sequence[idx].output, function() {
                runSequence(idx + 1);
            });
        });
    }

    // Boot
    addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
    setTimeout(function() { runSequence(0); }, Math.max(500 / speed, 10));

})();
