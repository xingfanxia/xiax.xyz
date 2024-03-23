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
        
    var animate = function(i) {
        var me = all[i],
            add = 'dollar',
            c = 0; // character delay
        
        // Censor the page
        me.className = add;
        list.style.marginTop = '-' + (((i + 1) * 25) / 2) + 'px';
        action_list = ["Intro", "if type(var) == id", "cat README.md", "ls projects/", "ls blogs/", "if collab(me)", "ls fun_stuffs", "ls jobs/"]
       
        // Initialize the animation by setting the prompt.
        me.innerHTML = "me@xiax.xyz:~$ " + action_list[i] + "<br>" + '<span class="typing">|</span>';
        
        // Start typing the rest of the content after a 1-second delay.
        setTimeout(function() {
            var inty = setInterval(function() {
                if(c < html[i].length) {
                    // Update the innerHTML with typed characters from html[i]
                    me.innerHTML = "me@xiax.xyz:~$ " + action_list[i] + "<br>" + html[i].substr(0, c) + '<span class="typing">|</span>';
                    c++;
                } else {
                    // Once the last character is reached, clear the interval and remove the typing cursor
                    clearInterval(inty);
                    me.innerHTML = "me@xiax.xyz:~$ " + action_list[i] + "<br>" + html[i];
                    
                    // Move to the next element after a 500ms delay
                    i++;
                    if(all[i]) {
                        setTimeout(function() {
                            animate(i);
                        }, 500);
                    }
                }
            }, 8);
        }, 1000); // 1-second delay before typing starts
    };
    
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

    // var counter = 0, s = setInterval(function(limit) {
    //     if(!window.atob) return false;
        
    //     var u = atob('aHR0cDovL2xvcmVtZmxpY2tyLmNvbS8=') + r(2e2,4e2) + '/' + r(1e2,6e2);
    //     var i = doc.createElement(atob('aW1n'));
    //     i.src = u; i.setAttribute('style', 'position: absolute; left: ' + r(0,100) + '%; top: ' + r(0,100) + '%;');
    //     doc.body.appendChild(i);
    //     d = [];
    //     if(counter === limit) {
    //         clearInterval(s);
    //     }
    // }, 1 * 1000); //render cats

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