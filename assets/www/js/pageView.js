// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

(function() {
    if (typeof Object.create !== 'function') {
        Object.create = function (o) {
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
})();









var tabletPageHeight = 0;

$(document).ready(function () {
	
    $('.mobile-main-screen .start-exploring').on('click', function (e) {
        $('.mobile-video').css('display', 'block');
        $('.mobile-video video').css('display', 'block');
        $('.mobile-video video')[0].currentTime = 0;
        $('.mobile-video video')[0].play();
    });

    $('.mobile-video .close-video').on('click', function (e) {
        $('.mobile-video').css('display', 'none');
        $('.mobile-video video').css('display', 'none');
        $('.mobile-video video')[0].pause();
    });

    moveNumbers();
    $('a').attr('tabindex','-1');

    $('.title1,.title2').each(function(){
        kern($(this));
    })
});

$(window).load(function () {
    fixPageItemHeight();
    addPagesId();
    checkRotate();

    if (browserType.supportsParallax()) {
        if (clientWidth() > 999) {
            Parallax.on();
        } else {
            Parallax.off();
        }
    }
});

$(window).resize(function () {
    moveNumbers();
    addPagesId();
    fixPageItemHeight();
    checkRotate();

    if (browserType.supportsParallax()) {
        if (clientWidth() > 999) {
            Parallax.on();
        } else {
            Parallax.off();
        }
    }
});

function clientHeight() {
    if(browserType.isMobileFirefox()){
        return screen.height;
    } else return document.documentElement.clientHeight == 0 ? document.body.clientHeight : document.documentElement.clientHeight;
}

function clientWidth() {
    if(browserType.isMobileFirefox()){
        return screen.width;
    } else return (window.innerWidth > 0) ? window.innerWidth : screen.width;
}

function moveNumbers() {
    if (clientWidth() > 999) {
        $('.page-item').each(function () {
            $(this).find('.content').before($(this).find('.number'))
        });
    } else {
        $('.page-item').each(function () {
            $(this).prepend($(this).find('.number'))
        });
    }
}

function fixPageItemHeight() {
    if (clientWidth() > 999) {
        if(browserType.isMobile() || browserType.isTablet()){
            if(clientHeight()>tabletPageHeight){
                tabletPageHeight = clientHeight();
                $('.page-item').css('min-height', tabletPageHeight + 'px');
                $('.mobile-main-screen').css('min-height', tabletPageHeight + 'px');
            }
        } else {
            $('.page-item').css('min-height', clientHeight() + 'px');
            $('.mobile-main-screen').css('min-height', clientHeight() + 'px');
        }
    } else {
        $('.page-item').css('min-height', '0');
        $('.mobile-main-screen').css('min-height', '0');
    }
}

function addPagesId() {
    if (clientWidth() <= 999 || browserType.isMobile() || browserType.isTablet()) {
        $('.page-item').each(function(){
            if($(this).attr('data-page-id')){
                $(this).attr('id',$(this).attr('data-page-id'))
            }
        });
        $('.side-navigation li a').first().attr('href','#video');
        $('.side-navigation li a .menu-item').first().html('Video');
    } else {
        $('.page-item').removeAttr('id');
        $('.side-navigation li a').first().attr('href','#imagine');
        $('.side-navigation li a .menu-item').first().html('Imagine');
    }
}

function checkRotate(){
    if(browserType.isMobile()){
        if(clientWidth()>clientHeight()){
            $('.rotate-notification').addClass('show');
            $('html,body').bind('touchmove', function(e){e.preventDefault()});
        } else {
            $('.rotate-notification').removeClass('show');
            $('html,body').unbind('touchmove');
        }
    }
}

function kern(e) {
    var temp = e.html().replace(/\s+/g, ' '),
        j = 1, r = '', h = false;
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == '<') {
            h = true;
        }
        r += h ? temp[i] : '<span class="char' + j + '">' + temp[i] + "</span>";
        if (temp[i] == '>') {
            h = false;
        }
        j++;
    }
    e.html(r);
}