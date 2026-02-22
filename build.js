#!/usr/bin/env node
/**
 * Generates blog-content.js from blog/*.md files.
 *
 * Usage: node build.js
 *
 * Reads the blogPosts registry from content.js (file -> postId mapping),
 * then reads each .md file and outputs blog-content.js.
 */
var fs = require('fs');
var path = require('path');

var BLOG_DIR = path.join(__dirname, 'blog');
var OUTPUT = path.join(__dirname, 'blog-content.js');

// Reverse mapping: filename -> postId
// Derived from SITE_CONTENT.blogPosts in content.js
var FILE_TO_ID = {
    'the-companion-vision.md': 'companion-en',
    'the-companion-vision-zh.md': 'companion-zh',
    'the-agent-economy.md': 'agents-en',
    'the-agent-economy-zh.md': 'agents-zh',
    'wearables-and-companions.md': 'wearables-en',
    'wearables-and-companions-zh.md': 'wearables-zh',
    'when-software-becomes-disposable.md': 'disposable-en',
    'when-software-becomes-disposable-zh.md': 'disposable-zh',
    'the-last-mile-of-ai.md': 'lastmile-en',
    'the-last-mile-of-ai-zh.md': 'lastmile-zh',
    'why-claude-code.md': 'claudecode-en',
    'why-claude-code-zh.md': 'claudecode-zh'
};

var entries = {};
var files = fs.readdirSync(BLOG_DIR).filter(function(f) { return f.endsWith('.md'); });

files.forEach(function(filename) {
    var postId = FILE_TO_ID[filename];
    if (!postId) {
        console.warn('WARNING: No postId mapping for ' + filename + ' — skipping');
        return;
    }
    var content = fs.readFileSync(path.join(BLOG_DIR, filename), 'utf8');
    // Split into lines, strip front-matter (lines between --- markers at top)
    var lines = content.split('\n');
    var start = 0;
    if (lines[0] && lines[0].trim() === '---') {
        for (var i = 1; i < lines.length; i++) {
            if (lines[i].trim() === '---') {
                start = i + 1;
                break;
            }
        }
    }
    // Remove trailing empty lines
    var body = lines.slice(start);
    while (body.length > 0 && body[body.length - 1].trim() === '') {
        body.pop();
    }
    entries[postId] = body;
});

// Build output
var out = '/**\n * Blog post content \u2014 auto-generated from blog/*.md files.\n * Do not edit manually. Regenerate with: node build.js\n */\n';
out += 'var BLOG_CONTENT = ' + JSON.stringify(entries, null, 4) + ';\n';

fs.writeFileSync(OUTPUT, out, 'utf8');
console.log('Generated ' + OUTPUT + ' (' + Object.keys(entries).length + ' posts)');
