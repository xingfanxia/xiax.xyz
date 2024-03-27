//  JavaScript is a lot like a shopping centre in a recession
//  There's a lot of closures
(function(doc, win) {

    //  If you don't have QSA, you must hate me
    if(!doc.querySelector) {
        return alert('Your browser sucks. Sorry.');
    }
    
    //  I never node her that well, Officer.
    var list = doc.querySelector('ul'),
        all = list.children,
        i = all.length,
        html = [];
        
    //  Censorship, yo
    while(i--) {
        html[i] = all[i].innerHTML;
        all[i].innerHTML = '';
    }
        
    var speedMultiplier = 1; // Speed multiplier, initially 1

    document.addEventListener('click', function() {
        speedMultiplier = 20; // Speed up the animation 20 times on mouse click
    });
    
    var animate = function(i) {
        if (i >= all.length) {
            return; // Stop if there are no more items to animate.
        }
        var me = all[i],
            add = 'dollar',
            c = 0, d = 0; // Character and line indices for typing animation.
    
        me.className = add;
        list.style.marginTop = '-' + (((i + 1) * 25) / 2) + 'px';
        var action_list = ["ping xiax.xyz", "echo $ID", "cat README.md", "ls projects/", "dig blog.xiax.xyz", "dig collab.xiax.xyz", "ls fun_stuffs/", "ping work.xiax.xyz"];
        
        var fullPrompt = "visitor@xiax.xyz:~$ " + action_list[i];
        var response = html[i]; // The response to be typed after the action.
    
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
                                }, 800 / speedMultiplier); // Adjust delay based on speedMultiplier
                            }
                        }
                    }, 8 / speedMultiplier); // Adjust interval based on speedMultiplier
                }, 800 / speedMultiplier); // Adjust delay before typing the response based on speedMultiplier
            }
        }, 8 / speedMultiplier); // Adjust interval based on speedMultiplier
    };
    
    // It's assumed that 'all', 'html', and 'list' variables exist in the scope and are correctly defined elsewhere in the code.

    animate(0);
    
    //  Totally not easter egg stuff
    var t = [82,85,65], d = [], r = function(m,a) {
        return Math.floor(Math.random() * 100) + (m-a)+a;
    };

    var light = [76,73,71,72,84], lightTheme = function() {
        var link = document.getElementById("theme");
        link.setAttribute('href', 'css/day.css');
        d = []
    };

    var dark = [68,65,82,75], darkTheme = function() {
        var link = document.getElementById("theme");
        link.setAttribute('href', 'css/night.css');
        d = []
    };

    var counter = 0, s = function(limit) {
        if(!window.atob) return false;
        while(counter < limit) {
            var u = atob('aHR0cDovL2xvcmVtZmxpY2tyLmNvbS8=') + r(2e2,4e2) + '/' + r(1e2,6e2);
            var i = doc.createElement(atob('aW1n'));
            i.src = u; i.setAttribute('style', 'position: absolute; left: ' + r(0,100) + '%; top: ' + r(0,100) + '%;');
            doc.body.appendChild(i);
            counter++;      
        }
        
    }; //render cats

    window.onkeyup = function(e) {
        if(t.equals(d)) {
            d = [];
            counter = 0;
            return s(99);
        } else if (light.equals(d)) {
            return lightTheme();
        } else if (dark.equals(d)) {
            return darkTheme();
        }
        if (d.length==+!0 && d[0]!=t[0] && d[0]!=light[0] && d[0]!=dark[0]) d=[];
        e.which && d.push(e.which);
    };
})(document, window);

//  It's like Go Compare, but without the opera singer
Array.prototype.equals = function(arr) {
    //  If it's too long, it's not the right, uh.. Something that's not a penis joke
    if(this.length != arr.length) {
        return false;
    }
    
    for(var i = 0; i < arr.length; i++) {
        //  RECURSION MOTHERFUCKER DO YOU UNDERSTAND IT?
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
}