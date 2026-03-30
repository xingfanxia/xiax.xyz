/**
 * Canvas-based text effects for the terminal.
 *
 * Five effects:
 *   1. Matrix rain     — first page load (characters rain down and assemble)
 *   2. Explosion       — tab switch outgoing (characters scatter from click point)
 *   3. Assembly        — tab switch incoming (characters converge to positions)
 *   4. Scroll gravity  — overscroll at bottom (characters fall with gravity)
 *   5. Clawd reflow    — animated Clawd crab follows cursor, text displaces radially
 *
 * Physics inspired by @chenglou/pretext-explosive demo.
 * No external dependencies.
 */
(function() {
    'use strict';

    // ================================================================
    //  Configuration
    // ================================================================

    var GRAVITY = 580;            // px/s^2
    var AIR_RESISTANCE = 0.965;   // velocity multiplier per frame
    var EXPLOSION_FORCE = 30000;  // inverse-square force at distance=1
    var MIN_BLAST_DIST = 25;      // prevents infinite force near epicenter
    var SHRAPNEL_MS = 600;        // base explosion duration
    var ASSEMBLY_MS = 750;        // base assembly duration
    var RAIN_MS = 1600;           // base matrix rain duration
    var GRAVITY_FALL_MS = 2200;   // scroll-gravity duration

    var MATRIX_CHARS = (
        '\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3' +  // katakana
        '\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8' +
        '\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB' +
        '\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA' +
        '0123456789><=#{}'
    ).split('');

    // ================================================================
    //  Easing functions
    // ================================================================

    function elasticOut(t) {
        if (t <= 0) return 0;
        if (t >= 1) return 1;
        return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.8) + 1;
    }

    // easeOutQuart available for future use
    // function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    // ================================================================
    //  Character extraction from DOM
    // ================================================================

    /**
     * Extract per-character position + style data from a container.
     * Uses a hybrid approach: one getBoundingClientRect per text node (fast),
     * then monospace math for individual characters within each node.
     * Falls back to per-character Range for wrapped text nodes.
     */
    function extractCharacters(container) {
        var chars = [];
        var cRect = container.getBoundingClientRect();
        var scrollTop = container.scrollTop;
        var viewH = container.clientHeight;

        var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null, false);
        var node;

        while ((node = walker.nextNode())) {
            var parent = node.parentElement;
            if (!parent) continue;
            // skip cursor, hidden, and zero-width elements
            if (parent.classList.contains('cursor') || parent.closest('.cursor')) continue;

            var text = node.textContent;
            if (!text) continue;

            var style = getComputedStyle(parent);
            var color = style.color;
            var fontSize = parseFloat(style.fontSize);
            var font = style.fontWeight + ' ' + fontSize + 'px ' + style.fontFamily;

            // Measure entire text node at once
            var range = document.createRange();
            range.selectNodeContents(node);
            var nRect = range.getBoundingClientRect();
            range.detach();

            if (nRect.width < 0.5 || nRect.height < 0.5) continue;

            // Check for wrapped text (height > ~2 lines)
            var isWrapped = nRect.height > fontSize * 2.8;

            if (isWrapped) {
                // Wrapped text: per-character Range (slower but accurate)
                for (var j = 0; j < text.length; j++) {
                    var ch = text[j];
                    if (ch === '\n' || ch === '\r') continue;

                    var r = document.createRange();
                    r.setStart(node, j);
                    r.setEnd(node, j + 1);
                    var cr = r.getBoundingClientRect();
                    r.detach();

                    if (cr.width < 0.5 || cr.height < 0.5) continue;

                    var cy = cr.top - cRect.top;
                    if (cy + cr.height < -50 || cy > viewH + 50) continue;

                    chars.push({
                        char: ch,
                        x: cr.left - cRect.left,
                        y: cy,
                        width: cr.width,
                        height: cr.height,
                        color: color,
                        font: font,
                        fontSize: fontSize
                    });
                }
            } else {
                // Single line: monospace math from node rect
                var charW = text.length > 0 ? nRect.width / text.length : 0;
                var ny = nRect.top - cRect.top;

                if (ny + nRect.height < -50 || ny > viewH + 50) continue;

                for (var i = 0; i < text.length; i++) {
                    var c = text[i];
                    if (c === '\n' || c === '\r') continue;

                    chars.push({
                        char: c,
                        x: nRect.left - cRect.left + i * charW,
                        y: ny,
                        width: charW,
                        height: nRect.height,
                        color: color,
                        font: font,
                        fontSize: fontSize
                    });
                }
            }
        }

        return chars;
    }

    // ================================================================
    //  Particle creation
    // ================================================================

    function makeParticle(info) {
        return {
            // visual
            char: info.char,
            origChar: info.char,
            color: info.color,
            font: info.font,
            w: info.width,
            h: info.height,
            // current position
            x: info.x,
            y: info.y,
            // target (home)
            tx: info.x,
            ty: info.y,
            // velocity
            vx: 0,
            vy: 0,
            // rotation
            rot: 0,
            av: 0,   // angular velocity
            // opacity
            op: 1,
            // state machine
            state: 'rest',
            t: 0,        // elapsed ms
            dur: 0,       // duration ms
            // assembly origin
            fx: 0,
            fy: 0,
            fr: 0
        };
    }

    // ================================================================
    //  Canvas manager
    // ================================================================

    function Canvas(body) {
        this.body = body;
        this.dpr = window.devicePixelRatio || 1;
        this.w = 0;
        this.h = 0;
        this.raf = null;

        this.el = document.createElement('canvas');
        this.el.id = 'effects-canvas';
        // position dynamically in resize()
        this.el.style.cssText = 'position:absolute;pointer-events:none;z-index:5;display:none;';
        body.parentElement.appendChild(this.el);
        this.ctx = this.el.getContext('2d');

        this.resize();
        var self = this;
        window.addEventListener('resize', function() { self.resize(); });
    }

    Canvas.prototype.resize = function() {
        var bRect = this.body.getBoundingClientRect();
        var pRect = this.body.parentElement.getBoundingClientRect();
        var top = bRect.top - pRect.top;
        var left = bRect.left - pRect.left;

        this.w = bRect.width;
        this.h = bRect.height;
        this.el.width = Math.round(bRect.width * this.dpr);
        this.el.height = Math.round(bRect.height * this.dpr);
        this.el.style.top = top + 'px';
        this.el.style.left = left + 'px';
        this.el.style.width = bRect.width + 'px';
        this.el.style.height = bRect.height + 'px';
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    };

    Canvas.prototype.show = function() {
        this.resize();
        this.el.style.display = 'block';
    };

    Canvas.prototype.hide = function() {
        this.el.style.display = 'none';
        if (this.raf) {
            cancelAnimationFrame(this.raf);
            this.raf = null;
        }
    };

    Canvas.prototype.clear = function() {
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
        this.ctx.clearRect(0, 0, this.w, this.h);
    };

    Canvas.prototype.loop = function(fn) {
        var self = this;
        var last = performance.now();
        function tick(now) {
            var dt = Math.min((now - last) / 1000, 0.05); // cap 50ms
            last = now;
            self.clear();
            if (fn(self.ctx, dt)) {
                self.hide();
            } else {
                self.raf = requestAnimationFrame(tick);
            }
        }
        this.raf = requestAnimationFrame(tick);
    };

    // ================================================================
    //  Rendering
    // ================================================================

    function drawParticle(ctx, p) {
        if (p.op <= 0.01) return;

        ctx.globalAlpha = Math.min(Math.max(p.op, 0), 1);
        ctx.fillStyle = p.color;
        ctx.font = p.font;
        ctx.textBaseline = 'top';

        if (Math.abs(p.rot) > 0.01) {
            var cx = p.x + p.w * 0.5;
            var cy = p.y + p.h * 0.5;
            ctx.save();
            ctx.translate(cx, cy);
            ctx.rotate(p.rot);
            ctx.fillText(p.char, -p.w * 0.5, -p.h * 0.5);
            ctx.restore();
        } else {
            ctx.fillText(p.char, p.x, p.y);
        }
        ctx.globalAlpha = 1;
    }

    // ================================================================
    //  Physics: Shrapnel (explosion)
    // ================================================================

    function tickShrapnel(p, dt) {
        p.t += dt * 1000;
        p.vx *= AIR_RESISTANCE;
        p.vy *= AIR_RESISTANCE;
        p.vy += GRAVITY * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.av * dt;

        var prog = p.t / p.dur;
        if (prog > 0.5) {
            p.op = Math.max(0, 1 - (prog - 0.5) * 2);
        }
        return prog >= 1;
    }

    // ================================================================
    //  Physics: Assembly (converge to target)
    // ================================================================

    function tickAssembly(p, dt) {
        p.t += dt * 1000;
        var prog = Math.min(p.t / p.dur, 1);
        var e = elasticOut(prog);

        p.x = p.fx + (p.tx - p.fx) * e;
        p.y = p.fy + (p.ty - p.fy) * e;
        p.rot = p.fr * (1 - e);
        p.op = Math.min(prog * 3.5, 1);

        return prog >= 1;
    }

    // ================================================================
    //  Physics: Matrix rain
    // ================================================================

    function tickRain(p, dt) {
        p.t += dt * 1000;
        var prog = Math.min(p.t / p.dur, 1);

        if (prog < 0.55) {
            // Phase 1: falling with character flicker
            p.y += p.vy * dt;
            p.x += Math.sin(p.t * 0.004 + p.fx * 0.1) * 0.4;
            p.op = Math.min(p.t / 250, 0.75);

            if (Math.random() < 0.04) {
                p.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
            }
        } else {
            // Phase 2: restore char and converge
            p.char = p.origChar;
            var ct = (prog - 0.55) / 0.45;
            var e = elasticOut(ct);
            var wobble = Math.sin(p.t * 0.004) * 0.4 * (1 - ct);

            p.x = p.fx + (p.tx - p.fx) * e + wobble;
            p.y = p.y + (p.ty - p.y) * Math.min(ct * 1.8, 1);
            p.op = 0.75 + ct * 0.25;
        }

        return prog >= 1;
    }

    // ================================================================
    //  Physics: Gravity fall
    // ================================================================

    function tickGravityFall(p, dt) {
        // Delayed start: negative elapsed means waiting
        if (p.t < 0) {
            p.t += dt * 1000;
            return false;
        }
        p.t += dt * 1000;

        p.vy += GRAVITY * 0.6 * dt;
        p.y += p.vy * dt;
        p.x += p.vx * dt;
        p.rot += p.av * dt;

        var prog = p.t / p.dur;
        if (prog > 0.6) {
            p.op = Math.max(0, 1 - (prog - 0.6) * 2.5);
        }
        return prog >= 1;
    }

    // ================================================================
    //  Main controller
    // ================================================================

    function TerminalEffects(body) {
        this.body = body;
        this.canvas = new Canvas(body);
        this.particles = [];
        this.running = false;
        this._onComplete = null;

        // Respect reduced-motion preference
        this.disabled = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        this._initSkip();
        this._initMousePush();
    }

    // ---- Skip: click during animation completes instantly ----

    TerminalEffects.prototype._initSkip = function() {
        var self = this;
        document.addEventListener('click', function(e) {
            if (!self.running) return;
            if (e.target.closest('.terminal-tab') || e.target.closest('a')) return;
            self._skipToEnd();
        });
    };

    TerminalEffects.prototype._skipToEnd = function() {
        for (var i = 0; i < this.particles.length; i++) {
            var p = this.particles[i];
            if (p.state === 'shrapnel') {
                p.op = 0;
            } else {
                p.x = p.tx;
                p.y = p.ty;
                p.rot = 0;
                p.op = 1;
                p.char = p.origChar;
            }
            p.state = 'done';
        }
    };

    // ---- Explosion (outgoing) ----

    TerminalEffects.prototype.explode = function(clickX, clickY) {
        if (this.disabled) return Promise.resolve();

        // Instant visual feedback — dim body while extracting
        this.body.style.opacity = '0.3';
        this.body.style.transition = 'opacity 0.1s';

        var chars = extractCharacters(this.body);

        this.body.style.transition = '';
        this.body.style.opacity = '';
        if (chars.length === 0) return Promise.resolve();

        var bRect = this.body.getBoundingClientRect();
        var ox = clickX - bRect.left;
        var oy = clickY - bRect.top;

        this.particles = [];
        for (var i = 0; i < chars.length; i++) {
            var p = makeParticle(chars[i]);

            var dx = p.x + p.w * 0.5 - ox;
            var dy = p.y + p.h * 0.5 - oy;
            var dist = Math.max(Math.sqrt(dx * dx + dy * dy), MIN_BLAST_DIST);
            var force = EXPLOSION_FORCE / (dist * dist);
            var angle = Math.atan2(dy, dx) + (Math.random() - 0.5) * 0.7;

            p.vx = Math.cos(angle) * force;
            p.vy = Math.sin(angle) * force - 80 - Math.random() * 120;
            p.av = (Math.random() - 0.5) * 14;
            p.state = 'shrapnel';
            p.dur = SHRAPNEL_MS + Math.random() * 150;

            this.particles.push(p);
        }

        return this._runEffect();
    };

    // ---- Assembly (incoming) ----

    TerminalEffects.prototype.assemble = function() {
        if (this.disabled) return Promise.resolve();

        var chars = extractCharacters(this.body);
        if (chars.length === 0) return Promise.resolve();

        var w = this.canvas.w;
        var h = this.canvas.h;

        this.particles = [];
        for (var i = 0; i < chars.length; i++) {
            var p = makeParticle(chars[i]);

            var angle = Math.random() * Math.PI * 2;
            var dist = Math.max(w, h) * (0.4 + Math.random() * 0.5);
            p.fx = p.tx + Math.cos(angle) * dist;
            p.fy = p.ty + Math.sin(angle) * dist;
            p.fr = (Math.random() - 0.5) * Math.PI * 2.5;
            p.x = p.fx;
            p.y = p.fy;
            p.rot = p.fr;
            p.op = 0;
            p.state = 'assembling';

            var d = Math.sqrt((p.fx - p.tx) * (p.fx - p.tx) + (p.fy - p.ty) * (p.fy - p.ty));
            p.dur = ASSEMBLY_MS + Math.min(d * 0.08, 250) + Math.random() * 200;

            this.particles.push(p);
        }

        return this._runEffect();
    };

    // ---- Matrix rain (first load) ----

    TerminalEffects.prototype.matrixRain = function() {
        if (this.disabled) return Promise.resolve();

        var chars = extractCharacters(this.body);
        if (chars.length === 0) return Promise.resolve();

        var h = this.canvas.h;

        this.particles = [];
        for (var i = 0; i < chars.length; i++) {
            var p = makeParticle(chars[i]);

            p.fx = p.tx + (Math.random() - 0.5) * 25;
            p.fy = -30 - Math.random() * h * 0.8;
            p.x = p.fx;
            p.y = p.fy;
            p.vy = 250 + Math.random() * 180;
            p.op = 0;
            p.state = 'raining';

            // Top characters arrive first, staggered
            p.dur = RAIN_MS + p.ty * 1.0 + Math.random() * 300;

            this.particles.push(p);
        }

        return this._runEffect();
    };

    // ---- Shared animation runner ----

    TerminalEffects.prototype._runEffect = function() {
        var self = this;
        this.running = true;
        this.canvas.show();
        this.body.style.visibility = 'hidden';

        return new Promise(function(resolve) {
            self._onComplete = resolve;

            self.canvas.loop(function(ctx, dt) {
                var allDone = true;

                for (var i = 0; i < self.particles.length; i++) {
                    var p = self.particles[i];
                    var done = false;

                    if (p.state === 'shrapnel') {
                        done = tickShrapnel(p, dt);
                    } else if (p.state === 'assembling') {
                        done = tickAssembly(p, dt);
                    } else if (p.state === 'raining') {
                        done = tickRain(p, dt);
                    } else if (p.state === 'done') {
                        done = true;
                    }

                    if (done) {
                        p.state = 'done';
                    } else {
                        allDone = false;
                    }

                    drawParticle(ctx, p);
                }

                if (allDone) {
                    self.body.style.visibility = '';
                    self.running = false;
                    self.particles = [];
                    if (self._onComplete) {
                        self._onComplete();
                        self._onComplete = null;
                    }
                    return true; // stop loop
                }
                return false;
            });
        });
    };

    // ---- Scroll gravity ----

    TerminalEffects.prototype._initScrollGravity = function() {
        var self = this;
        var overscroll = 0;
        var lastST = 0;
        var triggered = false;

        this.body.addEventListener('scroll', function() {
            if (self.running || self.disabled) return;

            var st = self.body.scrollTop;
            var max = self.body.scrollHeight - self.body.clientHeight;

            if (max > 10 && st >= max - 2 && st > lastST) {
                overscroll += st - lastST;
                if (overscroll > 60 && !triggered) {
                    triggered = true;
                    self._doScrollGravity();
                }
            } else {
                overscroll = Math.max(0, overscroll - 5);
                if (st < max - 10) triggered = false;
            }
            lastST = st;
        });
    };

    TerminalEffects.prototype._doScrollGravity = function() {
        var chars = extractCharacters(this.body);
        if (chars.length === 0) return;

        var h = this.canvas.h;
        this.particles = [];

        for (var i = 0; i < chars.length; i++) {
            var p = makeParticle(chars[i]);
            var distFromBottom = h - p.y;

            p.vx = (Math.random() - 0.5) * 25;
            p.vy = 0;
            p.av = (Math.random() - 0.5) * 4;
            p.state = 'gravity';
            p.dur = GRAVITY_FALL_MS;
            // Stagger: bottom chars fall first (negative elapsed = delay)
            p.t = -(distFromBottom * 2.5 + Math.random() * 150);

            this.particles.push(p);
        }

        var self = this;
        this.running = true;
        this.canvas.show();
        this.body.style.visibility = 'hidden';

        this.canvas.loop(function(ctx, dt) {
            var allDone = true;

            for (var i = 0; i < self.particles.length; i++) {
                var p = self.particles[i];
                if (p.state === 'gravity') {
                    if (!tickGravityFall(p, dt)) allDone = false;
                    else p.state = 'done';
                } else if (p.state === 'done') {
                    // skip
                } else {
                    allDone = false;
                }
                drawParticle(ctx, p);
            }

            if (allDone || !self.running) {
                self.body.style.visibility = '';
                self.running = false;
                self.particles = [];
                // Re-render current tab after gravity
                if (window._terminalRerender) window._terminalRerender();
                return true;
            }
            return false;
        });
    };

    // ---- Clawd reflow + machine gun (crab follows cursor, click to shoot) ----

    TerminalEffects.prototype._initMousePush = function() {
        var self = this;

        // Clawd sizing & positioning
        var CLAWD_SIZE = 100;
        // The crab body sits at ~78% from top of the SVG viewBox
        var CLAWD_CENTER_Y = 0.78;
        var FOLLOW_SPEED = 0.1;

        // Subtle body displacement (just avoid overlapping Clawd)
        var BODY_R = 20;
        var BODY_PUSH = 8;

        // Bullet / machine gun config
        var BULLET_SPEED = 450;    // px/s
        var BULLET_LIFE = 4000;    // ms (long-lived, bouncing kills them via energy)
        var BULLET_R = 2.5;        // visual radius
        var BULLET_HIT_R = 24;     // impact radius on characters
        var BULLET_IMPULSE = 160;  // velocity impulse on impact
        var BASE_FIRE_RATE = 6;    // shots/sec at start
        var MAX_FIRE_RATE = 40;    // shots/sec ramped up
        var RAMP_TIME = 2000;      // ms to reach max fire rate
        var BASE_SPREAD = 0.15;    // radians at start
        var MAX_SPREAD = 0.8;      // radians ramped up

        // Character spring physics
        var SPRING = 0.04;
        var DAMPING = 0.92;

        // Create Clawd element
        var clawd = document.createElement('img');
        clawd.src = 'clawd-walking.svg';
        clawd.id = 'clawd';
        clawd.style.cssText =
            'position:absolute;width:' + CLAWD_SIZE + 'px;height:' + CLAWD_SIZE + 'px;' +
            'pointer-events:none;z-index:10;display:none;opacity:0;' +
            'transition:opacity 0.3s ease;image-rendering:pixelated;';
        this.body.parentElement.appendChild(clawd);

        var active = false;
        var raf = null;
        var particles = null;
        var mouseX = 0, mouseY = 0;
        var clawdX = 0, clawdY = 0;
        var prevMouseX = 0, prevMouseY = 0;
        var facingAngle = 0;  // radians — follows mouse drag direction

        // Bullet state
        var bullets = [];
        var mouseDown = false;
        var holdStart = 0;
        var lastFireTime = 0;

        var windowEl = this.body.parentElement;

        // ================ Desktop: double-click to enter ================

        self.body.addEventListener('dblclick', function(e) {
            if (self.running || self.disabled || active) return;
            e.preventDefault();
            activate(e.clientX, e.clientY);
        });

        windowEl.addEventListener('mousemove', function(e) {
            if (!active) return;
            var bRect = self.body.getBoundingClientRect();
            var inBounds =
                e.clientX >= bRect.left - 10 && e.clientX <= bRect.right + 10 &&
                e.clientY >= bRect.top - 10  && e.clientY <= bRect.bottom + 10;
            if (inBounds) {
                mouseX = e.clientX - bRect.left;
                mouseY = e.clientY - bRect.top;
            } else {
                deactivate();
            }
        });

        windowEl.addEventListener('mouseleave', function() {
            if (active) deactivate();
        });

        windowEl.addEventListener('mousedown', function(e) {
            if (!active || e.button !== 0) return;
            e.preventDefault();
            mouseDown = true;
            holdStart = performance.now();
            lastFireTime = 0;
        });

        document.addEventListener('mouseup', function() {
            mouseDown = false;
        });

        // ================ Mobile: double-tap to enter, touch to shoot ================
        // NOTE: Once Clawd is active, self.body is visibility:hidden and won't
        // receive touch events. So shooting listeners go on windowEl/document.

        var lastTapTime = 0;

        // Double-tap detection (on body — it's visible before Clawd activates)
        self.body.addEventListener('touchend', function(e) {
            if (active || self.running || self.disabled) return;
            var now = Date.now();
            if (now - lastTapTime < 350) {
                e.preventDefault();
                var touch = e.changedTouches[0];
                activate(touch.clientX, touch.clientY);
                lastTapTime = 0;
            } else {
                lastTapTime = now;
            }
        }, { passive: false });

        // Touch-start on windowEl: start shooting if in Clawd mode
        windowEl.addEventListener('touchstart', function(e) {
            if (!active || self.running) return;
            e.preventDefault();
            var touch = e.touches[0];
            var bRect = self.body.getBoundingClientRect();
            mouseX = touch.clientX - bRect.left;
            mouseY = touch.clientY - bRect.top;
            mouseDown = true;
            holdStart = performance.now();
            lastFireTime = 0;
        }, { passive: false });

        // Touch-move on document: drag to aim (document so we don't lose it)
        document.addEventListener('touchmove', function(e) {
            if (!active) return;
            e.preventDefault();
            var touch = e.touches[0];
            var bRect = self.body.getBoundingClientRect();
            mouseX = touch.clientX - bRect.left;
            mouseY = touch.clientY - bRect.top;
        }, { passive: false });

        // Touch-end on document: stop shooting
        document.addEventListener('touchend', function(e) {
            if (!active) return;
            mouseDown = false;
        }, { passive: true });

        // ================ Shared: Escape / tap-outside exits ================

        document.addEventListener('keydown', function(e) {
            if (active && e.key === 'Escape') {
                e.preventDefault();
                deactivate();
            }
        });

        // Mobile: tap outside terminal body → exit Clawd mode
        // (Desktop exits via mousemove bounds check — no click handler needed)
        document.addEventListener('touchstart', function(e) {
            if (!active) return;
            var touch = e.touches[0];
            var bRect = self.body.getBoundingClientRect();
            var inBody = touch.clientX >= bRect.left && touch.clientX <= bRect.right &&
                         touch.clientY >= bRect.top && touch.clientY <= bRect.bottom;
            if (!inBody) {
                deactivate();
            }
        }, { passive: true });

        // ---- Activate / deactivate ----

        function activate(cx, cy) {
            active = true;
            particles = extractCharacters(self.body).map(function(c) {
                var p = makeParticle(c);
                p.vx = 0; p.vy = 0; // velocity for spring physics
                return p;
            });
            if (particles.length === 0) { active = false; return; }

            var bRect = self.body.getBoundingClientRect();
            mouseX = cx - bRect.left;
            mouseY = cy - bRect.top;
            clawdX = mouseX;
            clawdY = mouseY;
            prevMouseX = mouseX;
            prevMouseY = mouseY;
            bullets = [];
            mouseDown = false;

            self.canvas.show();
            self.body.style.visibility = 'hidden';
            self.body.style.overflowY = 'hidden';
            windowEl.style.cursor = 'none';
            windowEl.style.userSelect = 'none';
            windowEl.style.webkitUserSelect = 'none';
            clawd.style.display = 'block';
            requestAnimationFrame(function() { clawd.style.opacity = '1'; });
            startLoop();
        }

        function deactivate() {
            active = false;
            mouseDown = false;
            clawd.style.opacity = '0';
            windowEl.style.cursor = '';
            windowEl.style.userSelect = '';
            windowEl.style.webkitUserSelect = '';
            setTimeout(function() { clawd.style.display = 'none'; }, 300);
            if (raf) { cancelAnimationFrame(raf); raf = null; }
            self.canvas.hide();
            self.body.style.visibility = '';
            self.body.style.overflowY = '';
            particles = null;
            bullets = [];
        }

        // ---- Main loop ----

        function startLoop() {
            var lastTime = performance.now();

            function frame(now) {
                if (!active) return;
                var dt = Math.min((now - lastTime) / 1000, 0.05);
                lastTime = now;

                // -- Clawd follow --
                clawdX += (mouseX - clawdX) * FOLLOW_SPEED;
                clawdY += (mouseY - clawdY) * FOLLOW_SPEED;

                // Face direction follows mouse drag (full 360)
                var moveDx = mouseX - prevMouseX;
                var moveDy = mouseY - prevMouseY;
                var moveSpeed = Math.sqrt(moveDx * moveDx + moveDy * moveDy);
                if (moveSpeed > 1.5) {
                    facingAngle = Math.atan2(moveDy, moveDx);
                    // Flip SVG based on horizontal component
                    clawd.style.transform = (moveDx < 0) ? 'scaleX(1)' : 'scaleX(-1)';
                }
                prevMouseX = mouseX;
                prevMouseY = mouseY;

                // Position Clawd centered on cursor
                var bRect = self.body.getBoundingClientRect();
                var pRect = windowEl.getBoundingClientRect();
                var offTop = bRect.top - pRect.top;
                var offLeft = bRect.left - pRect.left;
                clawd.style.left = (offLeft + clawdX - CLAWD_SIZE * 0.5) + 'px';
                clawd.style.top = (offTop + clawdY - CLAWD_SIZE * CLAWD_CENTER_Y) + 'px';

                // -- Spawn bullets --
                if (mouseDown) {
                    var holdMs = now - holdStart;
                    var ramp = Math.min(holdMs / RAMP_TIME, 1);
                    var fireRate = BASE_FIRE_RATE + (MAX_FIRE_RATE - BASE_FIRE_RATE) * ramp;
                    var spread = BASE_SPREAD + (MAX_SPREAD - BASE_SPREAD) * ramp;
                    var fireInterval = 1000 / fireRate;

                    while (now - lastFireTime >= fireInterval) {
                        lastFireTime = lastFireTime || now;
                        lastFireTime += fireInterval;

                        var angle = facingAngle + (Math.random() - 0.5) * spread;
                        bullets.push({
                            x: clawdX,
                            y: clawdY - 5,
                            vx: Math.cos(angle) * BULLET_SPEED,
                            vy: Math.sin(angle) * BULLET_SPEED,
                            life: BULLET_LIFE,
                            maxLife: BULLET_LIFE
                        });
                    }
                } else {
                    lastFireTime = 0;
                }

                // -- Update bullets (bounce off walls) --
                var cw = self.canvas.w;
                var ch = self.canvas.h;
                var BOUNCE = 0.55; // energy retained per bounce
                var MIN_SPEED = 30; // remove when slower than this

                for (var b = bullets.length - 1; b >= 0; b--) {
                    var bul = bullets[b];
                    bul.x += bul.vx * dt;
                    bul.y += bul.vy * dt;
                    bul.life -= dt * 1000;

                    // Wall bouncing with energy loss
                    if (bul.x <= 0) {
                        bul.x = 0;
                        bul.vx = Math.abs(bul.vx) * BOUNCE;
                        bul.vy *= BOUNCE;
                    } else if (bul.x >= cw) {
                        bul.x = cw;
                        bul.vx = -Math.abs(bul.vx) * BOUNCE;
                        bul.vy *= BOUNCE;
                    }
                    if (bul.y <= 0) {
                        bul.y = 0;
                        bul.vy = Math.abs(bul.vy) * BOUNCE;
                        bul.vx *= BOUNCE;
                    } else if (bul.y >= ch) {
                        bul.y = ch;
                        bul.vy = -Math.abs(bul.vy) * BOUNCE;
                        bul.vx *= BOUNCE;
                    }

                    // Check impacts with characters
                    for (var ci = 0; ci < particles.length; ci++) {
                        var chr = particles[ci];
                        var bdx = (chr.x + chr.w * 0.5) - bul.x;
                        var bdy = (chr.y + chr.h * 0.5) - bul.y;
                        var bdist = Math.sqrt(bdx * bdx + bdy * bdy);

                        if (bdist < BULLET_HIT_R) {
                            var impAngle = Math.atan2(bdy, bdx);
                            chr.vx += Math.cos(impAngle) * BULLET_IMPULSE * dt * 8;
                            chr.vy += Math.sin(impAngle) * BULLET_IMPULSE * dt * 8;
                        }
                    }

                    // Remove when too slow or timed out
                    var speed = Math.sqrt(bul.vx * bul.vx + bul.vy * bul.vy);
                    if (bul.life <= 0 || speed < MIN_SPEED) {
                        bullets.splice(b, 1);
                    }
                }

                // -- Update characters (spring physics) --
                self.canvas.clear();
                var ctx = self.canvas.ctx;

                for (var i = 0; i < particles.length; i++) {
                    var p = particles[i];

                    // Small radial push from Clawd body (avoid overlap)
                    var cdx = (p.x + p.w * 0.5) - clawdX;
                    var cdy = (p.y + p.h * 0.5) - clawdY;
                    var cdist = Math.sqrt(cdx * cdx + cdy * cdy);
                    if (cdist < BODY_R && cdist > 0) {
                        var pushF = (1 - cdist / BODY_R) * BODY_PUSH;
                        p.vx += (cdx / cdist) * pushF;
                        p.vy += (cdy / cdist) * pushF;
                    }

                    // Spring force toward home
                    p.vx += (p.tx - p.x) * SPRING;
                    p.vy += (p.ty - p.y) * SPRING;

                    // Damping
                    p.vx *= DAMPING;
                    p.vy *= DAMPING;

                    // Integrate
                    p.x += p.vx;
                    p.y += p.vy;
                    p.op = 1;

                    drawParticle(ctx, p);
                }

                // -- Draw bullets --
                ctx.globalAlpha = 1;
                for (var j = 0; j < bullets.length; j++) {
                    var bl = bullets[j];
                    var bOp = Math.min(bl.life / bl.maxLife * 2, 1);
                    ctx.globalAlpha = bOp;
                    ctx.fillStyle = '#ffa657';
                    ctx.beginPath();
                    ctx.arc(bl.x, bl.y, BULLET_R, 0, Math.PI * 2);
                    ctx.fill();
                    // Glow
                    ctx.globalAlpha = bOp * 0.3;
                    ctx.fillStyle = '#ffa657';
                    ctx.beginPath();
                    ctx.arc(bl.x, bl.y, BULLET_R * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.globalAlpha = 1;

                raf = requestAnimationFrame(frame);
            }
            raf = requestAnimationFrame(frame);
        }
    };

    // ---- Expose globally ----

    window.TerminalEffects = TerminalEffects;

})();
