(function(doc, win) {
    if(!doc.querySelector) {
        return alert('Your browser sucks. Sorry.');
    }

    var list = doc.querySelector('ul'),
        all = list.children,
        i = all.length,
        html = [];

    // Store original innerHTML from the page's own content (trusted source)
    while(i--) {
        html[i] = all[i].innerHTML;
        all[i].innerHTML = '';
    }

    var speedMultiplier = 1;

    document.addEventListener('click', function() {
        speedMultiplier = 20;
    });

    function scrollToTyping(element) {
        var elementBottom = element.getBoundingClientRect().bottom + window.scrollY;
        var offset = 100;
        var scrollPosition = elementBottom + offset - window.innerHeight;

        if (scrollPosition > window.scrollY) {
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        }
    }

    var animate = function(i) {
        if (i >= all.length) {
            return;
        }
        var me = all[i],
            add = 'dollar',
            c = 0, d = 0;

        me.className = add;
        list.style.marginTop = '-' + (((i + 1) * 25) / 2) + 'px';
        var action_list = [
            "ping ax0x.ai",
            "cat about.md",
            "claude-code --ship",
            "echo $PHILOSOPHY",
            "ls compute-labs/agents/",
            "git log --oneline career/",
            "cat manifesto.md",
            "ls links/"
        ];

        var fullPrompt = "ax@ax0x.ai:~$ " + action_list[i];
        // Note: response content comes from the page's own static HTML (trusted)
        var response = html[i];
        var typeLine = setInterval(function() {
            if (c < fullPrompt.length) {
                me.innerHTML = fullPrompt.substring(0, c) + '<span class="typing">|</span>';
                c++;
            } else if (c === fullPrompt.length) {
                me.innerHTML = fullPrompt + '<span class="typing">|</span>';
                c++;
            } else {
                clearInterval(typeLine);
                setTimeout(function() {
                    var typeResponse = setInterval(function() {
                        if (d < response.length) {
                            me.innerHTML = fullPrompt + "<br>" + '<span class="white-text">' + response.substring(0, d) + '</span><span class="typing">|</span>';
                            d++;
                        } else {
                            clearInterval(typeResponse);
                            me.innerHTML = fullPrompt + "<br>" + '<span class="white-text">' + response + '</span>';
                            i++;
                            if (i < all.length) {
                                setTimeout(function() {
                                    animate(i);
                                }, 800 / speedMultiplier);
                            }
                        }
                    }, 8 / speedMultiplier);
                }, 800 / speedMultiplier);
            }
            scrollToTyping(me);
        }, 8 / speedMultiplier);
    };

    animate(0);

    // Easter eggs - keyboard shortcuts
    var t = [82,85,65], d = [];
    var light = [76,73,71,72,84], lightTheme = function() {
        var link = document.getElementById("theme");
        link.setAttribute('href', 'css/day.css');
        d = [];
    };
    var dark = [68,65,82,75], darkTheme = function() {
        var link = document.getElementById("theme");
        link.setAttribute('href', 'css/night.css');
        d = [];
    };

    window.onkeyup = function(e) {
        if(t.equals(d)) {
            d = [];
            return;
        } else if (light.equals(d)) {
            return lightTheme();
        } else if (dark.equals(d)) {
            return darkTheme();
        }
        if (d.length==+!0 && d[0]!=t[0] && d[0]!=light[0] && d[0]!=dark[0]) d=[];
        e.which && d.push(e.which);
    };
})(document, window);

Array.prototype.equals = function(arr) {
    if(this.length != arr.length) {
        return false;
    }
    for(var i = 0; i < arr.length; i++) {
        if(this[i].compareArrays) {
            if(!this[i].compareArrays(arr[i])) {
                return false;
            }
        }
        if(this[i] != arr[i]) {
            return false;
        }
    }
    return true;
};
