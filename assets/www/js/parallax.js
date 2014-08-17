'use strict';

var Parallax = {};

Parallax.navigate = function (hash) {
    console.log('stub: ' + hash);
};

(function () {
    var animators = [],
        animatedScrollTop = 0,
        $window = $(window);

    var transform = (function () {
        var transformProperty = ['MozTransform', 'webkitTransform', 'msTransform', 'transform'].filter(function (p) {
            return $('body')[0].style[p] !== undefined;
        })[0];

        return function ($element, value) {
            $element.each(function () {
                this.style[transformProperty] = value;
            });
        };
    }) ();

    var startLoop = function () {
        var lastScrollTop = 0;

        $window.on('scroll', function () {
            lastScrollTop = $window.scrollTop();
        });

        (function () {
            var previousUpTime;

            function calcNextStep(timeSpan) {
                if (animatedScrollTop === lastScrollTop) { return false; }
                var distance = lastScrollTop - animatedScrollTop;
                var baseStep = Math.abs(distance) <= 200 ? 10 : 20;
                var scrollStep = distance > 0 ? baseStep : -baseStep;
                scrollStep = Math.floor(scrollStep * timeSpan / 17);
                var nextStep = Math.abs(distance) > Math.abs(scrollStep) ? scrollStep : distance;
                animatedScrollTop += nextStep;

                if (Math.abs(distance) > Math.abs(scrollStep) * 40) {
                    animatedScrollTop = lastScrollTop;
                }

                return true;
            }

            function frameloop(upTime){
                if (calcNextStep(upTime - previousUpTime)) {
                    animate();
                }
                previousUpTime = upTime;
                window.requestAnimationFrame(frameloop);
            }

            window.requestAnimationFrame(function(upTime) {
                previousUpTime = upTime - 17;
                frameloop(upTime);
            });
        })();

        startLoop = function () {}
    };

    function clearAnimators() {
        animators = [];
    }

    function animate() {
        animators.forEach(function (animator) { animator(animatedScrollTop); });
    }

    Parallax.addAnimator = function (animator) {
        animators.push(animator);
        return Parallax;
    };

    Parallax.scrollTo = function(pos) {
        $window.scrollTop(pos);
    };

    Parallax.on = function () {
        startLoop();
        // force layer to reduce paints on document
        transform($('.page-wrapper'), 'translateZ(0)');
        $('.page-wrapper').addClass('parallax');
        clearAnimators();
        transform($('.parallax-block'), '');
        $('.side-navigation li a').off();
        Parallax.init();
        animate();
    };

    Parallax.off = function () {
        clearAnimators();
        transform($('.page-item'), '');
        $('.side-navigation li a').off();
        $('body').css('height', 'auto');
        $('.page-wrapper').removeClass('parallax');
        Parallax.navigate = function () {};
    };

    Parallax.init = function () {
        var $parallaxImagine = $('.item-imagine'),              
            $parallaxIdea = $('.item-idea'),                    
            $parallaxHow = $('.item-how-it-works'),             
            $parallaxFb = $('.fb-share'),                       
            $parallaxInteraction = $('.item-interaction'),      
            $parallaxGlass = $('.glass-ui'),                    
            $parallaxProgramming = $('.item-programing'),       
            $parallaxPossibilities = $('.item-possibilities'),  
            $parallaxContacts = $('.item-contacts');            

        var heightImagine,
            heightIdea,
            heightHow,
            heightFb,
            heightScreen,
            heightInteraction,
            heightGlass,
            heightProgramming,
            heightPossibilities,
            heightContacts;

        var topIdea,
            topHow,
            topFb,
            topInteraction,
            topGlass,
            topProgramming,
            topPossibilities,
            topContacts;

        var durationPause,
            durationImagine,
            durationIdea,
            durationHow,
            durationFbUncover,
            durationFb,
            durationInteractionUncover,
            durationInteraction,
            durationGlass,
            durationGlassSlides,
            durationProgramming,
            durationPossibilities,
            durationContacts;

        var $scrollTip = $('.scroll-tip');

        function linearInterpolate(x1, x2, y1, y2) {
            var slope = (y2 - y1) / (x2 - x1),
                intercept = y1 - x1 * slope;

            return function (x) {
                return slope * x + intercept;
            }
        }

        // for grid enter animation
        var onNavigate = function () {};

        var translateY = function (pos) {
            return 'translateY(' + (-pos) + 'px)';
        };

        function runOnce(f) {
            var temp = f;
            return function () {
                temp();
                temp = function () {};
            }
        }

        function animateText($element){
            if($element.hasClass('animation-done')){
                return;
            }

            $element.addClass('animation-done');

            var temp = $element.html().replace(/\s+/g, ' '),
                i = 0,
                r = '',
                h = false,
                possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            (function changeText() {
                h = false;
                r = '';
                if (i < 20) {
                    for(var j=0; j<temp.length; j++){
                        if (temp[j] == '<') {
                            h = true;
                        }
                        r += h || temp[j] == ' ' ? temp[j] : possible.charAt(Math.floor(Math.random() * possible.length));
                        if (temp[j] == '>') {
                            h = false;
                        }
                    }
                    $element.html(r);
                    i++;
                    setTimeout(changeText, 100);
                } else {
                    $element.html(temp);
                }
            })();
        }

        function calcVars() {
            heightImagine = $parallaxImagine.outerHeight();
            heightIdea = $parallaxIdea.outerHeight();
            heightHow = $parallaxHow.outerHeight();
            heightFb = $parallaxFb.outerHeight();
            heightScreen = heightImagine;
            heightInteraction = $parallaxInteraction.outerHeight();
            heightGlass = $parallaxGlass.outerHeight();
            heightProgramming = $parallaxProgramming.outerHeight();
            heightPossibilities = $parallaxPossibilities.outerHeight();
            heightContacts = $parallaxContacts.outerHeight();

            topIdea = $parallaxIdea.position().top;
            topHow = $parallaxHow.position().top;
            topFb = $parallaxFb.position().top;
            topInteraction = $parallaxInteraction.position().top;
            topGlass = $parallaxGlass.position().top;
            topProgramming = $parallaxProgramming.position().top;
            topPossibilities = $parallaxPossibilities.position().top;
            topContacts = $parallaxContacts.position().top;

            durationPause = 1000;
            durationImagine = 1000;
            durationIdea = 3000 + durationPause;
            durationHow = 2000;
            durationFbUncover = heightFb;
            durationFb = durationFbUncover + durationPause;
            durationInteractionUncover = heightScreen;
            durationInteraction = durationInteractionUncover + durationPause;
            durationGlassSlides = 1600;
            durationGlass = heightScreen + durationGlassSlides;
            durationProgramming = heightProgramming + durationPause;
            durationPossibilities = 3000 + durationPause;
            durationContacts = heightContacts;
        }

        function runIfVisible($element, startTime, duration, animator) {
            var isHidden = false;
            return function (time) {
                var hideTranslation;
                if (time < startTime || time >= startTime + duration) {
                    if (isHidden) { return; }

                    hideTranslation = $element === $parallaxImagine ? heightImagine : 0;
                    transform($element, translateY(hideTranslation));
                    //$element.addClass('invisible');
                    isHidden = true;
                } else {
                    animator(time - startTime, isHidden, time);

                    if (isHidden) {
                        //$element.removeClass('invisible');
                        isHidden = false;
                    }
                }
            }
        }

        function translator($element) {
            var prevOffset;
            return function (offset, force) {
                if (prevOffset !== offset || force) {
                    transform($element, translateY(offset));
                    prevOffset = offset;
                }
            }
        }

        function clamp(value, min, max) {
            return Math.min(Math.max(value, min), max);
        }

        function showScrollTip() {
            $scrollTip[0].classList.add('show');
        }

        function hideScrollTip() {
            $scrollTip[0].classList.remove('show');
        }

        function createImagineAnimator() {
            var $background = $('.item-imagine .item-background'),
                animator;

            function rotateAnimator(pos, hidden) {
                var rotation, angle, clampedPos;

                clampedPos = clamp(pos, 0, durationImagine);
                angle = 30 - clampedPos * 30 / durationImagine;
                rotation = 'perspective(500px) rotateX('+ angle + 'deg)';

                transform($background, rotation);
                if (hidden) {
                    transform($parallaxImagine, translateY(0));
                }
                hideScrollTip();
            }

            function enterAnimator() {
                transform($background, '');
                $parallaxImagine.addClass('before-animation');
                setTimeout(function () { $parallaxImagine.addClass('start-animation'); }, 0);
            }

            animator = rotateAnimator;
            onNavigate = function () {
                onNavigate = function () {};
                enterAnimator();
                setTimeout(function () {
                    $parallaxImagine.removeClass('start-animation');
                    $parallaxImagine.removeClass('before-animation');
                    animator = rotateAnimator;
                    //animator(0, true);
                }, 1500);
            };

            return function (pos, hidden) {
                animator(pos, hidden)
            };
        }

        function createIdeaAnimator() {
            var elBackgroundVelo = $('.item-idea .item-background')[0],
                lastVeloSrc = '',
                prevVeloSrc = '',
                translate = translator($parallaxIdea),
                interpolate = linearInterpolate(durationIdea, durationIdea + durationHow, 0, heightIdea / 2),
                animateContent = runOnce(function () {
                    $parallaxIdea.addClass('start-animation');
                    animateText($('.item-idea .title2'));
                });

            function getImage(num) {
                var numString = Math.floor(num + 3).toString();
                var image = '1_00' + new Array(3 - numString.length + 1).join('0') + numString + '.jpg';
                var imagePath = '//project-g.s3.amazonaws.com/img/parallax_video/1_1/';
                return imagePath + image;
            }

            return function (pos, hidden) {
                var clampedPos = clamp(pos, 0, durationIdea - durationPause);

                if (pos <= durationIdea) {
                    translate(topIdea, hidden)
                } else if (pos <= durationIdea + durationHow) {
                    translate(topIdea + interpolate(pos), hidden);
                }

                if (pos > (durationIdea - durationPause) * 2 / 3) {
                    animateContent();
                    showScrollTip();
                } else {
                    hideScrollTip();
                }

                lastVeloSrc = getImage(91 * clampedPos / (durationIdea - durationPause));

                if (lastVeloSrc !== prevVeloSrc) {
                    elBackgroundVelo.src = lastVeloSrc;
                    prevVeloSrc = lastVeloSrc;
                }
            }
        }

        function createHowAnimator() {
            var translate = translator($parallaxHow),
                interpolateUncover = linearInterpolate(0, durationHow, -heightScreen, heightHow - heightScreen),
                interpolateFb = linearInterpolate(
                    durationHow,
                    durationHow + durationFbUncover,
                    heightHow - heightScreen,
                    heightHow - heightScreen + heightFb),
                interpolateInteraction = linearInterpolate(
                    durationHow + durationFb,
                    durationHow + durationFb + durationInteractionUncover,
                    heightHow - heightScreen + heightFb,
                    heightHow + heightFb),
                animateContent = runOnce(function () {
                    $('.item-how-it-works .block').each(function (i, val) {
                        setTimeout(function () {
                            $(val).find('img').attr('src',($(val).find('img').attr('src')) + '?restart');
                            $(val).addClass('start-animation');
                        }, 500 * i);
                    });
                });

            return function (pos, hidden) {
                if (pos <= durationHow) {
                    translate(topHow + interpolateUncover(pos), hidden)
                } else if (pos <= durationHow + durationFbUncover) {
                    translate(topHow + interpolateFb(pos), hidden);
                } else if (pos <= durationHow + durationFb) {
                    translate(topHow + heightHow - heightScreen + heightFb, hidden);
                } else {
                    translate(topHow + interpolateInteraction(pos), hidden);
                }

                if (pos > durationHow * 2 / 3) {
                    animateContent();
                    showScrollTip();
                } else {
                    hideScrollTip();
                }
            }
        }

        function createFacebookAnimator() {
            var translate = translator($parallaxFb),
                interpolate = linearInterpolate(
                    durationFb, durationFb + durationInteractionUncover,
                    topFb - heightScreen + heightFb, topFb + heightFb);

            return function (pos, hidden) {
                if (pos < 0) {
                    transform($parallaxFb, translateY(0));
                    return;
                }

                if (pos <= durationFb) {
                    translate(topFb - heightScreen + heightFb, hidden);
                } else if (pos <= durationFb + durationInteractionUncover) {
                    translate(interpolate(pos), hidden);
                }

                showScrollTip();
            }
        }

        function createInteractionAnimator() {
            var translate = translator($parallaxInteraction),
                isAnimated = false,
                interpolate = linearInterpolate(
                    durationInteraction, durationInteraction + durationGlass - durationGlassSlides,
                    topInteraction, topInteraction + heightScreen),
                animateContent = runOnce(function () {
                    $parallaxInteraction.addClass('start-animation');
                    animateText($('.item-interaction .title2'));
                });

            return function (pos, hidden, time) {
                if (pos <= durationInteraction) {
                    translate(topInteraction, hidden);
                } else {
                    translate(interpolate(pos), hidden);
                }

                if (pos > durationInteractionUncover) {
                    isAnimated = true;
                    animateContent();
                    showScrollTip();
                } else if (!isAnimated && !$('body').hasClass('stop-scrolling')) {
                    hideScrollTip();
                    Parallax.scrollTo(time + 100);
                } else {
                    hideScrollTip();
                }
            }
        }

        function createGlassAnimator() {
            var translate = translator($parallaxGlass),
                currentSlide,
                interpolateUncover = linearInterpolate(0, durationGlass - durationGlassSlides, -heightGlass / 2, 0),
                interpolateHide = linearInterpolate(
                    durationGlass, durationGlass + durationProgramming - durationPause, 0, heightGlass / 2),
                animateContent = runOnce(function () {
                    $parallaxGlass.addClass('start-animation');
                });

            function updateCurrentSlide(pos) {
                var nextSlide, slidePos;

                slidePos = pos - durationGlass + durationGlassSlides;
                if (slidePos < 0 || slidePos > (durationGlassSlides - 200)) {
                    slidePos < 0 ? slider.goToSlide(1) : slider.goToSlide(7);
                    return;
                }

                nextSlide = Math.floor(slidePos * 6 / (durationGlassSlides - 200)) + 1;
                nextSlide = clamp(nextSlide, 1, 7);
                if (nextSlide !== currentSlide) {
                    slider.goToSlide(nextSlide);
                    currentSlide = nextSlide;
                }
            }

            return function (pos, hidden) {
                var durationGlassUncover = durationGlass - durationGlassSlides;

                if (pos <= durationGlassUncover) {
                    translate(topGlass + interpolateUncover(pos), hidden);
                } else if (pos <= durationGlass) {
                    translate(topGlass, hidden);
                } else {
                    translate(topGlass + interpolateHide(pos), hidden);
                }

                updateCurrentSlide(pos);

                if (pos > durationGlassUncover / 3) {
                    animateContent();
                }
                hideScrollTip();
            }
        }

        function createProgrammingAnimator() {
            var translate = translator($parallaxProgramming),
                interpolate = linearInterpolate(0, durationProgramming - durationPause, -heightScreen, heightProgramming - heightScreen),
                animateContent = runOnce(function () {
                $('.item-programing .block').each(function( i, val ) {
                    setTimeout(function (){
                        $(val).find('img').attr('src',($(val).find('img').attr('src'))+'?restart');
                        $(val).addClass('start-animation');
                    },500*i)
                });
            });

            return function (pos, hidden) {
                if (pos <= durationProgramming - durationPause) {
                    translate(topProgramming + interpolate(pos), hidden);
                } else if (pos <= durationProgramming) {
                    translate(topProgramming + heightProgramming - heightScreen, hidden);
                }

                if (pos > (durationProgramming - durationPause) * 2 / 3) {
                    animateContent();
                    showScrollTip();
                } else {
                    hideScrollTip();
                }
            }
        }

        function createPossibilitiesAnimator() {
            var translate = translator($parallaxPossibilities),
                interpolate = linearInterpolate(durationPossibilities, durationPossibilities + heightPossibilities, 0, heightPossibilities),
                elBackgroundPossibilities = $('.item-possibilities .item-background')[0],
                lastPossibilitiesSrc = '',
                prevPossibilitiesSrc = '',
                animateContent = runOnce(function () {
                    $parallaxPossibilities.addClass('start-animation');
                    animateText($('.item-possibilities .title2'));
                });


            function getImage(num) {
                var numString = Math.floor(num).toString();
                var image = '2_00' + new Array(3 - numString.length + 1).join('0') + numString + '.jpg';
                var imagePath = '//project-g.s3.amazonaws.com/img/parallax_video/2_3/';
                return imagePath + image;
            }

            return function (pos, hidden) {
                var clampedPos = clamp(pos, 0, durationPossibilities - durationPause);

                if (pos <= durationPossibilities) {
                    translate(topPossibilities, hidden);
                } else {
                    translate(topPossibilities + interpolate(pos), hidden);
                }

                if (pos > (durationPossibilities - durationPause) * 2 / 3) {
                    animateContent();
                    showScrollTip();
                } else {
                    hideScrollTip();
                }

                lastPossibilitiesSrc = getImage(149 * clampedPos / (durationPossibilities - durationPause));

                if (lastPossibilitiesSrc !== prevPossibilitiesSrc) {
                    elBackgroundPossibilities.src = lastPossibilitiesSrc;
                    prevPossibilitiesSrc = lastPossibilitiesSrc;
                }
            }
        }

        function createContactsAnimator() {
            var translate = translator($parallaxContacts),
                heightInspired = 581,
                catchDuration = heightInspired * durationContacts / heightContacts,
                catchOffset = heightScreen - heightInspired,
                interpolate = linearInterpolate(catchDuration, durationContacts, -catchOffset, heightContacts - heightScreen),
                animateContent = runOnce(function () {
                    $parallaxContacts.addClass('start-animation');
                });

            return function (pos, hidden) {

                if (pos <= catchDuration) {
                    translate(topContacts - catchOffset, hidden);
                } else if (pos <= durationContacts) {
                    translate(topContacts + interpolate(pos), hidden);
                } else {
                    translate(topContacts + heightContacts - heightScreen, hidden);
                }

                if (pos > durationContacts - 100) {
                    animateContent();
                }
                hideScrollTip();
            }
        }

        function createHashAnimator() {
            var lastHash;

            return function (time) {
                var duration = 0,
                    hashTimings = [
                        { hash: 'imagine', time: duration },
                        { hash: 'idea', time: duration += durationImagine },
                        { hash: 'how-it-works', time: duration += durationIdea },
                        { hash: 'interaction', time: duration += durationHow + durationFb },
                        { hash: 'programming', time: duration += durationInteraction + durationGlass },
                        { hash: 'possibilities', time: duration += durationProgramming },
                        { hash: 'contacts', time: duration += durationPossibilities }
                    ];

                var hashTiming = hashTimings.reduce(function (acc, hashTiming) {
                    return hashTiming.time < time ? hashTiming : acc
                }, { hash: '', time: -1});

                if (lastHash !== hashTiming.hash) {
                    Menu.highlight(hashTiming.hash);
                    lastHash = hashTiming.hash;
                }
            }
        }

        calcVars();

        $parallaxIdea.addClass('before-animation');
        $parallaxHow.addClass('before-animation');
        $parallaxInteraction.addClass('before-animation');
        $parallaxGlass.addClass('before-animation');
        $parallaxProgramming.addClass('before-animation');
        $parallaxPossibilities.addClass('before-animation');
        $parallaxContacts.addClass('before-animation');

        function addAnimators() {
            var duration = 0;
            Parallax.addAnimator(runIfVisible($parallaxImagine, duration, durationImagine, createImagineAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxIdea, duration += durationImagine, durationIdea + durationHow, createIdeaAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxHow, duration += durationIdea, durationHow + durationFb + durationInteractionUncover, createHowAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxFb, duration += durationHow, durationFb + durationInteractionUncover, createFacebookAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxInteraction, duration += durationFb, durationInteraction + durationGlass, createInteractionAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxGlass, duration += durationInteraction, durationGlass + durationProgramming - durationPause, createGlassAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxProgramming, duration += durationGlass, durationProgramming, createProgrammingAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxPossibilities, duration += durationProgramming, durationPossibilities + durationContacts, createPossibilitiesAnimator()));
            Parallax.addAnimator(runIfVisible($parallaxContacts, duration += durationPossibilities, durationGlass + heightScreen, createContactsAnimator()));
            Parallax.addAnimator(createHashAnimator());

            $('body').height(
                durationImagine +
                    durationIdea +
                    durationHow +
                    durationFb +
                    durationInteraction +
                    durationGlass +
                    durationProgramming +
                    durationPossibilities +
                    durationContacts +
                    heightScreen + 10);
        }

        addAnimators();

        Parallax.navigate = function (hash) {
            var duration = 0,
                aboutTime = duration,
                ideaTime = (duration += durationImagine) + (durationIdea - durationPause) + 100,
                howItWorksTime = (duration += durationIdea) + (durationHow * 9 / 10),
                interactionTime = (duration += durationHow + durationFb) + durationInteractionUncover + 100,
                programmingTime = (duration += durationInteraction + durationGlass) + (durationProgramming - durationPause),
                possibilitiesTime = (duration += durationProgramming) + (durationPossibilities - durationPause) + 100,
                contactsTime = (duration += durationPossibilities) + durationContacts,
                hashTimings = (function() { return [
                    { hash: 'about', time: aboutTime },
                    { hash: 'imagine', time: aboutTime },
                    { hash: 'idea', time: ideaTime },
                    { hash: 'how-it-works', time: howItWorksTime },
                    { hash: 'interaction', time: interactionTime },
                    { hash: 'programming', time: programmingTime },
                    { hash: 'possibilities', time: possibilitiesTime },
                    { hash: 'contacts', time: duration += durationPossibilities }
                ]; })();

            var hashTiming = hashTimings.filter(function (ht) { return ht.hash === hash; })[0];
            Parallax.scrollTo(hashTiming.time);

            onNavigate();
        };

        (function () {
            ['about', 'idea', 'how-it-works', 'interaction', 'programming', 'possibilities', 'contacts'].forEach(function (hash) {
                $('.side-navigation li a[href=#' + hash + ']').click(function () { Parallax.navigate(hash)});
            });
        })();
    };
})();

