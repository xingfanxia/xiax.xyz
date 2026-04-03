/**
 * Terminal emulator engine for ax0x.ai personal site.
 *
 * Content lives in content.js (SITE_CONTENT) and blog-content.js (BLOG_CONTENT).
 *
 * SECURITY: All rendered content is hardcoded in SITE_CONTENT and BLOG_CONTENT.
 * No user input or external data is ever used with innerHTML.
 * Every string that touches the DOM originates from trusted, static source
 * defined by the site author. This is a static personal site with zero
 * dynamic/user-generated content.
 */
(function() {
    'use strict';

    var tabSequences = SITE_CONTENT.tabSequences;
    var tabPaths = SITE_CONTENT.tabPaths;
    var blogPosts = SITE_CONTENT.blogPosts;

    var terminal = document.getElementById('terminal');
    var lineCountEl = document.getElementById('line-count');
    var clickHint = document.getElementById('click-hint');
    var lineCount = 0;
    var speed = 1;
    var skipped = false;
    var activeTab = 'home';
    var inReaderMode = false;
    var runningTimers = [];

    // ---- Effects integration ----
    var effects = (typeof TerminalEffects === 'function')
        ? new TerminalEffects(terminal)
        : null;

    // Expose re-render hook for scroll-gravity recovery
    window._terminalRerender = function() {
        instantRender(activeTab);
    };

    // Track whether effects are animating (suppresses click-to-skip)
    var effectsRunning = false;

    document.addEventListener('click', function(e) {
        // Don't trigger skip when clicking tabs or links, or during effects
        if (e.target.closest('.terminal-tab') || e.target.closest('a')) return;
        if (effectsRunning) return;
        if (!skipped) {
            skipped = true;
            speed = 100;
            if (clickHint) clickHint.style.opacity = '0';
        }
    });

    // Keyboard shortcut: press 'q' to exit reader mode
    document.addEventListener('keydown', function(e) {
        if (inReaderMode && e.key === 'q') {
            e.preventDefault();
            switchTab('blog');
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
    // SAFE: staticHTML is always a hardcoded string from content.js
    // When `immediate` is true, line is visible immediately (for instant render)
    function addLine(staticHTML, cls, immediate) {
        var div = document.createElement('div');
        div.className = 'terminal-line' + (cls ? ' ' + cls : '');
        // SAFE: all HTML comes from hardcoded content.js / blog-content.js
        div.innerHTML = staticHTML; // eslint-disable-line no-unsanitized/property
        terminal.appendChild(div);
        if (immediate) {
            div.classList.add('visible');
        } else {
            requestAnimationFrame(function() { div.classList.add('visible'); });
        }
        updateLineCount();
        terminal.scrollTop = terminal.scrollHeight;
        return div;
    }

    function addSeparator(immediate) {
        var hr = document.createElement('hr');
        hr.className = 'separator';
        terminal.appendChild(hr);
        if (immediate) {
            hr.classList.add('visible');
        }
    }

    function makeCursor() {
        var el = document.createElement('span');
        el.className = 'cursor';
        return el;
    }

    function colorFlags(text) {
        return text.replace(/(--\w+)/g, '<span class="prompt-flag">$1</span>');
    }

    // ---- Instant render (all content at once, no animation) ----
    // Used by effects system: render everything, then animate characters in.

    function instantRender(tabName) {
        terminal.textContent = '';
        lineCount = 0;
        if (lineCountEl) lineCountEl.textContent = '0 lines';

        var seq = tabSequences[tabName] || tabSequences['home'];
        var path = tabPaths[tabName] || '~';

        addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '', true);

        for (var i = 0; i < seq.length; i++) {
            if (i > 0) addSeparator(true);

            addLine(
                promptMarkup(path) +
                '<span class="prompt-cmd">' + colorFlags(seq[i].cmd) + '</span>',
                '', true
            );

            for (var j = 0; j < seq[i].output.length; j++) {
                addLine(seq[i].output[j], 'output', true);
            }
        }

        // Final prompt with cursor
        var finalEl = addLine(promptMarkup(path), '', true);
        finalEl.appendChild(makeCursor());

        terminal.scrollTop = 0;
    }

    function typeCommand(cmd, cb) {
        var line = addLine(promptMarkup(tabPaths[activeTab] || '~'), '');
        var base = line.innerHTML; // eslint-disable-line no-unsanitized/property
        var i = 0;
        var iv = trackedInterval(function() {
            if (i < cmd.length) {
                // SAFE: cmd comes from hardcoded content.js
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd.substring(0, i + 1)) + '</span>'; // eslint-disable-line no-unsanitized/property
                line.appendChild(makeCursor());
                i++;
            } else {
                clearInterval(iv);
                line.innerHTML = base + '<span class="prompt-cmd">' + colorFlags(cmd) + '</span>'; // eslint-disable-line no-unsanitized/property
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

    // ---- Tab switching ----

    var tabs = document.querySelectorAll('.terminal-tab');

    function updateTabCSS(tabName) {
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.remove('active');
            if (tabs[i].getAttribute('data-tab') === tabName) {
                tabs[i].classList.add('active');
            }
        }
    }

    function switchTab(tabName, clickEvent) {
        if (tabName === activeTab && !inReaderMode) return;
        if (effectsRunning) return;

        clearTimers();

        var clickX = clickEvent ? clickEvent.clientX : window.innerWidth / 2;
        var clickY = clickEvent ? clickEvent.clientY : window.innerHeight / 2;

        // With effects: explode outgoing, then typewriter the new content
        if (effects && !effects.disabled) {
            effectsRunning = true;

            effects.explode(clickX, clickY).then(function() {
                effectsRunning = false;

                // Now typewriter the new tab (same as original behavior)
                updateTabCSS(tabName);
                activeTab = tabName;
                inReaderMode = false;
                terminal.textContent = '';
                lineCount = 0;
                if (lineCountEl) lineCountEl.textContent = '0 lines';

                skipped = false;
                speed = 1;
                if (clickHint) {
                    clickHint.style.opacity = '1';
                    clickHint.textContent = 'click anywhere to skip animation';
                }

                var seq = tabSequences[tabName] || tabSequences['home'];
                addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
                trackedTimeout(function() { runSequence(seq, 0); }, Math.max(500 / speed, 10));
            });
        } else {
            // No effects: original typewriter behavior
            updateTabCSS(tabName);
            activeTab = tabName;
            inReaderMode = false;
            terminal.textContent = '';
            lineCount = 0;
            if (lineCountEl) lineCountEl.textContent = '0 lines';

            skipped = false;
            speed = 1;
            if (clickHint) {
                clickHint.style.opacity = '1';
                clickHint.textContent = 'click anywhere to skip animation';
            }

            var seq = tabSequences[tabName] || tabSequences['home'];
            addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
            trackedTimeout(function() { runSequence(seq, 0); }, Math.max(500 / speed, 10));
        }
    }

    for (var t = 0; t < tabs.length; t++) {
        (function(tab) {
            tab.addEventListener('click', function(e) {
                e.stopPropagation();
                var tabName = tab.getAttribute('data-tab');
                switchTab(tabName, e);
            });
        })(tabs[t]);
    }

    // ---- Blog reader mode ----

    // Lightweight markdown to terminal HTML
    // SAFE: only processes static author-written .md files from same origin
    function mdToHtml(text) {
        return text
            .replace(/\*\*(.+?)\*\*/g, '<span class="output-bold">$1</span>')
            .replace(/\*(.+?)\*/g, '<span class="output-dim">$1</span>')
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" class="output-link">$1</a>');
    }

    // Renders a markdown file in less(1)-style reader mode
    // SAFE: content is only fetched from same-origin static .md files
    function renderReader(mdLines, postId) {
        clearTimers();
        terminal.textContent = '';
        lineCount = 0;

        var post = blogPosts[postId];

        // Top bar
        var bar = document.createElement('div');
        bar.className = 'reader-bar';
        var barLeft = document.createElement('span');
        barLeft.className = 'output-dim';
        barLeft.textContent = 'less ' + post.title;
        var barRight = document.createElement('span');
        var backBtn = document.createElement('a');
        backBtn.href = '#';
        backBtn.className = 'reader-back';
        backBtn.textContent = '[q] back';
        backBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchTab('blog');
        });
        var langBtn = document.createElement('a');
        langBtn.href = '#';
        langBtn.className = 'reader-lang-toggle';
        langBtn.setAttribute('data-post', post.alt);
        langBtn.textContent = ' ' + post.altLabel;
        langBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openBlogPost(post.alt);
        });
        barRight.appendChild(backBtn);
        barRight.appendChild(langBtn);
        bar.appendChild(barLeft);
        bar.appendChild(barRight);
        terminal.appendChild(bar);

        // Render each markdown line
        for (var i = 0; i < mdLines.length; i++) {
            var line = mdLines[i];
            var div = document.createElement('div');
            div.className = 'reader-line';

            if (line === '---') {
                div.className = 'reader-line reader-sep';
            } else if (line.indexOf('## ') === 0) {
                div.className = 'reader-line reader-h2';
                // SAFE: static author-written markdown only
                div.innerHTML = mdToHtml(line.substring(3)); // eslint-disable-line no-unsanitized/property
            } else if (line.indexOf('# ') === 0) {
                div.className = 'reader-line reader-h1';
                div.innerHTML = mdToHtml(line.substring(2)); // eslint-disable-line no-unsanitized/property
            } else if (line.indexOf('- ') === 0) {
                div.innerHTML = '<span class="output-green">\u25A0</span> ' + mdToHtml(line.substring(2)); // eslint-disable-line no-unsanitized/property
            } else if (line === '') {
                div.textContent = '\u00A0';
            } else {
                div.innerHTML = mdToHtml(line); // eslint-disable-line no-unsanitized/property
            }

            terminal.appendChild(div);
            lineCount++;
        }

        // Footer
        var footer = document.createElement('div');
        footer.className = 'reader-bar';
        footer.style.marginTop = '12px';
        var footerLeft = document.createElement('span');
        footerLeft.className = 'output-dim';
        footerLeft.textContent = '(END)';
        var footerBack = document.createElement('a');
        footerBack.href = '#';
        footerBack.className = 'reader-back';
        footerBack.textContent = ' [q] back to posts';
        footerBack.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            switchTab('blog');
        });
        footer.appendChild(footerLeft);
        footer.appendChild(footerBack);
        terminal.appendChild(footer);

        inReaderMode = true;
        if (lineCountEl) lineCountEl.textContent = lineCount + ' lines';
        if (clickHint) clickHint.style.opacity = '0';
        terminal.scrollTop = 0;
    }

    function openBlogPost(postId, clickEvent) {
        var post = blogPosts[postId];
        if (!post) return;
        var content = typeof BLOG_CONTENT !== 'undefined' && BLOG_CONTENT[postId];
        if (!content) return;

        var clickX = clickEvent ? clickEvent.clientX : window.innerWidth / 2;
        var clickY = clickEvent ? clickEvent.clientY : window.innerHeight / 2;

        // With effects: explode outgoing, then render reader normally
        if (effects && !effects.disabled) {
            effectsRunning = true;
            effects.explode(clickX, clickY).then(function() {
                effectsRunning = false;
                renderReader(content, postId);
            });
        } else {
            renderReader(content, postId);
        }
    }

    // Handle clickable links: tab links, blog posts, reader controls
    terminal.addEventListener('click', function(e) {
        if (effectsRunning) return;

        // Blog post links
        var postLink = e.target.closest('.blog-post-link');
        if (postLink) {
            e.preventDefault();
            e.stopPropagation();
            openBlogPost(postLink.getAttribute('data-post'), e);
            return;
        }

        // Reader back button
        var backLink = e.target.closest('.reader-back');
        if (backLink) {
            e.preventDefault();
            e.stopPropagation();
            switchTab('blog', e);
            return;
        }

        // Reader language toggle
        var langToggle = e.target.closest('.reader-lang-toggle');
        if (langToggle) {
            e.preventDefault();
            e.stopPropagation();
            openBlogPost(langToggle.getAttribute('data-post'), e);
            return;
        }

        // Tab navigation links (projects sub-tabs)
        var link = e.target.closest('.tab-link');
        if (link) {
            e.preventDefault();
            e.stopPropagation();
            var targetTab = link.getAttribute('data-target-tab');
            if (targetTab) switchTab(targetTab, e);
        }
    });

    // ---- Run ----

    // ---- Live data helpers ----

    function fmtTokens(n) {
        if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
        if (n >= 1e6) return Math.round(n / 1e6) + 'M';
        if (n >= 1e3) return Math.round(n / 1e3) + 'K';
        return String(n);
    }

    function fmtCost(n) {
        return n.toLocaleString('en-US', { maximumFractionDigits: 0 });
    }

    function fmtDate(d) {
        var parts = d.split('-');
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        return months[parseInt(parts[1]) - 1] + ' ' + parseInt(parts[2]) + ', ' + parts[0];
    }

    function buildTokenUsageOutput(data) {
        var s = data.stats;
        var lines = [
            '',
            '  <span class="output-dim">\u250C\u2500 TOKEN USAGE REPORT \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510</span>',
            '  <span class="output-dim">\u2502</span>                                        <span class="output-dim">\u2502</span>',
            '  <span class="output-dim">\u2502</span>  <span class="output-dim">Total Spend</span>    <span class="output-bold">$' + fmtCost(s.totalCost) + '</span>  <span class="output-dim">(' + fmtTokens(s.totalTokens) + ' tokens)</span>',
            '  <span class="output-dim">\u2502</span>  <span class="output-dim">Daily Average</span>  <span class="output-bold">$' + fmtCost(s.avgCostPerDay) + '/day</span>  <span class="output-dim">(' + fmtTokens(s.avgTokensPerDay) + ' tokens)</span>',
            '  <span class="output-dim">\u2502</span>  <span class="output-dim">Peak Day</span>      <span class="output-bold">$' + fmtCost(s.peakCost) + '</span>  <span class="output-dim">(' + fmtDate(s.peakDay) + ')</span>',
            '  <span class="output-dim">\u2502</span>  <span class="output-dim">Tracking</span>      <span class="output-bold">' + s.activeDays + ' days</span>  <span class="output-dim">(' + s.instances + ' instances)</span>',
            '  <span class="output-dim">\u2502</span>                                        <span class="output-dim">\u2502</span>'
        ];

        // Monthly breakdown with ASCII bars
        var monthly = {};
        for (var i = 0; i < data.chartData.length; i++) {
            var d = data.chartData[i];
            var mo = d.date.substring(0, 7);
            if (!monthly[mo]) monthly[mo] = 0;
            monthly[mo] += d.cost;
        }
        var months = Object.keys(monthly).sort();
        var maxMo = 0;
        for (var j = 0; j < months.length; j++) {
            if (monthly[months[j]] > maxMo) maxMo = monthly[months[j]];
        }

        lines.push('  <span class="output-dim">\u2502</span>  <span class="output-dim">Monthly:</span>');

        for (var k = 0; k < months.length; k++) {
            var cost = monthly[months[k]];
            var barLen = Math.max(1, Math.round((cost / maxMo) * 24));
            var bar = '';
            for (var b = 0; b < barLen; b++) bar += '\u2588';
            var isLatest = k === months.length - 1;
            var cls = isLatest ? 'output-green' : (k >= months.length - 3 ? 'output-highlight' : 'output-dim');
            var marker = isLatest ? ' \u25C0' : '';
            lines.push('  <span class="output-dim">\u2502</span>  <span class="' + cls + '">' + months[k] + '  ' + bar + '</span> <span class="' + cls + '">$' + fmtCost(Math.round(cost)) + marker + '</span>');
        }

        lines.push('  <span class="output-dim">\u2502</span>                                        <span class="output-dim">\u2502</span>');
        lines.push('  <span class="output-dim">\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518</span>');
        lines.push('  <span class="output-dim">Live data from</span> <a href="https://blog.ax0x.ai/token-usage" target="_blank" class="output-link">blog.ax0x.ai/token-usage</a>');
        lines.push('');

        return lines;
    }

    function fetchLiveOutput(type, fallbackOutput, cb) {
        if (type === 'token-usage') {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://blog.ax0x.ai/api/token-usage');
            xhr.timeout = 5000;
            xhr.onload = function() {
                if (xhr.status === 200) {
                    try {
                        var data = JSON.parse(xhr.responseText);
                        cb(buildTokenUsageOutput(data));
                    } catch (e) {
                        cb(fallbackOutput);
                    }
                } else {
                    cb(fallbackOutput);
                }
            };
            xhr.onerror = function() { cb(fallbackOutput); };
            xhr.ontimeout = function() { cb(fallbackOutput); };
            xhr.send();
        } else {
            cb(fallbackOutput);
        }
    }

    function runSequence(seq, idx) {
        if (idx >= seq.length) {
            var finalLine = addLine(promptMarkup(tabPaths[activeTab] || '~'), '');
            finalLine.appendChild(makeCursor());
            if (clickHint) clickHint.style.opacity = '0';
            return;
        }
        if (idx > 0) addSeparator();
        typeCommand(seq[idx].cmd, function() {
            if (seq[idx].live) {
                fetchLiveOutput(seq[idx].live, seq[idx].output, function(output) {
                    typeOutput(output, function() {
                        runSequence(seq, idx + 1);
                    });
                });
            } else {
                typeOutput(seq[idx].output, function() {
                    runSequence(seq, idx + 1);
                });
            }
        });
    }

    // ---- Boot (always typewriter) ----

    addLine('<span class="output-dim">Last login: ' + new Date().toDateString() + ' on ttys001</span>', '');
    trackedTimeout(function() { runSequence(tabSequences['home'], 0); }, Math.max(500 / speed, 10));

})();
