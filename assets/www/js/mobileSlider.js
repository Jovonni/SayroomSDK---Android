var slider = new GlassSlider;

$(document).ready(function () {

    $('.arrow-next').on('click', function (e) {
        slider.next();
    });

    $('.arrow-prev').on('click', function (e) {
        slider.prev();
    });

    $('.switchers div').on('click', function (e) {
        slider.goToSlide($(this).attr('data-slide'));
    });

    $('.slides .slide').on('click', function (e) {
        slider.goToSlide($(this).attr('data-slide'));
    });

    $('.glass-ui').hammer().on("swipeleft", function() {
        slider.next();
    });

    $('.glass-ui').hammer().on("swiperight", function() {
        slider.prev();
    });

    slider.goToSlide(1);

});

$(window).resize(function(){
    slider.resize()
});

$(window).load(function(){
    slider.resize()
});

function GlassSlider() {
    function slideWidth() {
        return $('.glass-ui .slide.active').outerWidth(true);
    }

    function currentSlide() {
        return $('.glass-ui .slide.active').attr('data-slide');
    }

    function transformSlides(){
        var current = currentSlide();
        $('.glass-ui .slide').removeClass('l2 l1 r1 r2');
        $('.glass-ui div[data-slide=' + (current * 1 - 2) + ']').addClass('l2');
        $('.glass-ui div[data-slide=' + (current * 1 - 1) + ']').addClass('l1');
        $('.glass-ui div[data-slide=' + (current * 1 + 1) + ']').addClass('r1');
        $('.glass-ui div[data-slide=' + (current * 1 + 2) + ']').addClass('r2');
    }

    this.next = function () {
        if (!$('.glass-ui .slide.active').hasClass('slide-last')) {
            var current = currentSlide();
            this.goToSlide(current*1+1)
        }

    }

    this.prev = function () {
        if (!$('.glass-ui .slide.active').hasClass('slide-first')) {
            var current = currentSlide();
            this.goToSlide(current*1-1)
        }
    }

    this.goToSlide = function(slide){
        var current = currentSlide();
        $('.glass-ui .slides').css('margin-left', (slideWidth()/2+slideWidth()*slide*(-1))+'px');
        $('.glass-ui div[data-slide=' + current + ']').removeClass('active');
        $('.glass-ui div[data-slide=' + slide + ']').addClass('active');
        transformSlides();
    }

    this.resize = function(){
        var s = this;
        setTimeout(function(){
            s.goToSlide(currentSlide()*1);
        },500);
    }
}












var mobileSlider;

if (browserType.isMobile() || browserType.isTablet()) {
    mobileSlider = new MobileSlider;

    $(document).ready(function () {
        mobileSlider.goToSlide(1);
		
		
        setInterval(function(){
            mobileSlider.next();
        },4000);
    });
}

function MobileSlider() {

    var transform = (function () {
        var transformProperty = ['MozTransform', 'webkitTransform', 'msTransform', 'oTransform', 'transform'].filter(function (p) {
            return $('body')[0].style[p] !== undefined;
        })[0];

        return function ($element, value) {
            $element.each(function () {
                this.style[transformProperty] = value;
            });
        };
    }) ();

    var $activeSlide = $('.mobile-slider .slide.active');
    function currentSlide() {
        return $('.mobile-slider .slide.active').attr('data-slide');
    }

    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(eventData) {
            var LR = eventData.gamma;
            var FB = eventData.beta;
            var DIR = eventData.alpha;
            deviceOrientationHandler(LR, FB, DIR);
        }, false);
    }

    function deviceOrientationHandler(LR, FB, DIR) {
        var slideLeft=0,slideTop=0;
        if(Math.abs(LR)<90){
            slideLeft = LR/90*8;
        }
        if(Math.abs(FB)<90){
            slideTop = FB/90*8;
        }
        transform($activeSlide,'translate3d('+slideLeft+'% ,'+slideTop+'% ,0)');
    }

    this.next = function () {
        if (!$('.mobile-slider .slide.active').hasClass('slide-last')) {
            var current = currentSlide();
            this.goToSlide(current*1+1)
        } else {
            mobileSlider.goToSlide(1);
        }

    }

    this.goToSlide = function(slide){
        $('.mobile-slider .slide').removeClass('active');
        $activeSlide = $('.mobile-slider .slide[data-slide=' + slide + ']');
        $activeSlide.addClass('active');
    }
}