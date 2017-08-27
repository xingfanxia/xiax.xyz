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
        
    //  Go all Frankenstein and shit
    var animate = function(i) {
        var me = all[i],
        
            add = 'dollar',
            
            //  C = character delay
            //  D = line delay
            c = 0, d = 0;
            
        //  Censor the page
        me.className = add;
        list.style.marginTop = '-' + (((i + 1) * 25) / 2) + 'px';
        
        var inty = setInterval(function() {
            //  MOAR TEXTS
            me.innerHTML = html[i].substr(0, c) + '<span class="typing">|</span>';

            //  What's the best programming language in the world?
            //  Not this one.
            c++;
            
            if(html[i].length < c) {
                clearInterval(inty);
                i++;
                
                
                if(all[i]) {
                    setTimeout(function() {
                        me.innerHTML = html[i - 1];
                        animate(i);
                    }, 400);
                }
            }
        }, 70);
    };
    
    animate(0);
    
    //  Totally not easter egg stuff
    var t = [77, 69, 79, 87], d = [], r = function(m,a) {
        return Math.floor(Math.random() * 100) + (m-a)+a;
    };
    var s = function() {
        if(!window.atob) return false;
        
        var u = atob('aHR0cDovL3BsYWNla2l0dGVuLmNvbS8=') + r(2e2,4e2) + '/' + r(1e2,6e2);
        var i = doc.createElement(atob('aW1n'));
        i.src = u; i.setAttribute('style', 'position: absolute; left: ' + r(0,100) + '%; top: ' + r(0,100) + '%;');
        doc.body.appendChild(i);
    };
    window.onkeyup = function(e) {
        if(t.equals(d)) {
            return s();
        }
        
        if(d.length==+!0 && d[0]!=t[0]) d=[];
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