var playbackController = new PlaybackController();

$(function () {
    function videoLoaded() {
        $('.loader-pop-up-screen').addClass('before-hide');
        setTimeout(function () {
            $(".loader-pop-up-screen").addClass('hide');
            $(".player-screen").removeClass('hide');
            setTimeout(function () {
                $(".player-screen").css('background-color', 'rgba(5, 9, 44, 0)');
            }, 10);
            $('.video-progress').removeClass('hide');
            VideoHelper.showVideo(document.getElementById('full-video'));
            $('.loader-pop-up-screen .percents').text('0%');
            $('.loader-pop-up-screen .progress').css('width', '0%');
            $('.read-about').removeClass('hide');
        }, 500);
    }

    var runFullVideoScript = function (quality) {
        VideoFactory.createFullVideo(quality);
        var fullVideo = document.getElementById('full-video');
        VolumeController.reapply();

        $(".loader-pop-up-screen").removeClass('hide');
        $(".progress-dot").hide();
        playbackController.setVideos(
            [
                {
                    video:fullVideo,
                    play: function(){progressPlay(fullVideo)},
                    pause: function(){progressPause(fullVideo)}
                }
            ],
            {
                onTimeUpdate: function (progress) {
                    $('.video-progress .progress').css('width', progress + '%');
                }
            }
        );
        function progressPause(video) {
            $(video).removeClass('show').addClass('hide');
            video.pause();
        }

        function progressPlay(video) {
            $(video).removeClass('hide').addClass('show');
            if ($('.video_container.pause').length < 1) {
                video.play();
            }
        }

        var loader = new MultipleMediaLoader();
        loader.load(
            [fullVideo],
            function (percent) {
                $('.loader-pop-up-screen .percents').text(percent+'%');
                $('.loader-pop-up-screen .progress').css('width', percent+'%');
                $('.loader-pop-up-screen .progress').css('box-shadow', '0 0 10px 0 #19f5e8');
                setTimeout(function () {
                    $('.loader-pop-up-screen .progress').css('box-shadow', '0 0 0 0 #19f5e8');
                }, 500);
            },
            videoLoaded);

        $(fullVideo).on('ended', function () {
            router.goToPage('about');
        });

        runFullVideoScript = videoLoaded;
    };

    function onCommonLoaderDone(quality) {
        if(!browserType.isChrome()){
            setTimeout(function(){$('.browser-notification').addClass('show');},1000);
        }

        if (window.location.hash) {
            router.handleHash();
        }

        $('.start-exploring').on('click',function () {
            $('.read-about').addClass('hide');
            $(".main-screen").addClass("before-hide");
            setTimeout(function () {
                $(".main-screen").addClass("hide");

                if (browserType.isChrome()) {
                    $(".microphone-pop-up-screen").removeClass("hide").addClass('show');

                    setTimeout(function(){$(".allow-mic").addClass('show');},100);

                    var interval = window.setInterval(function () {
                        $('.microphone-underlines').append($('.microphone-underline').first());
                    }, 100);
                    Equalizer.run(
                        function () {
                            $(".microphone-pop-up-screen").addClass("hide");
                            runChromeVideoScript(quality);
                            window.clearInterval(interval);
                        },
                        function () {
                            $(".microphone-pop-up-screen").addClass("hide");
                            runFullVideoScript(quality);
                            window.clearInterval(interval);
                        }
                    );
                } else {
                    runFullVideoScript(quality);
                }
            }, 1000);
        });

        $('.player-screen, .play-button-container').on('click',function(){
            if($('.screenshot-container .screenshot.show').length<1){
                if($('.video_container.pause').length>0){
                    $('.play-button').removeClass('pause').addClass('play');
                    $('.play-button-container').removeClass('hide').addClass('show');
                    setTimeout(function () {
                        $('.play-button-container').removeClass('show').addClass('hide');

                    }, 100);
                    $('.video_container').removeClass('pause');
                    $('.video_container video.show')[0].play();
                    $(".player-screen").css('background-color', 'rgba(5, 9, 44, 0)');
                } else {
                    $('.play-button').removeClass('play').addClass('pause');
                    $('.play-button-container').removeClass('hide').addClass('show');
                    setTimeout(function () {
                        $('.play-button-container').removeClass('show').addClass('hide');
                    }, 100);
                    $('.video_container').addClass('pause');
                    $('.video_container video.show')[0].pause();
                    $(".player-screen").css('background-color', 'rgba(5, 9, 44, 0.3)');
                }
            }
        });

        $(".video-progress").on('click', function (e){
            if ($('.voice-bar.show').length<1) {
                if (!$(e.target).hasClass('playback')) {
                    return;
                }

                function clientWidth() {
                    return document.documentElement.clientWidth == 0 ? document.body.clientWidth : document.documentElement.clientWidth;
                }
                playbackController.seek(e.pageX/clientWidth()*100);
            }
        });
    }

    function loadDesktop() {
        VideoFactory.createIntro(QualityDetector.defaultQuality());

        var videoIntro = document.getElementById('home-video');

        var mainLoader = new MainLoader();
        mainLoader.load({
            images: imagesToLoad(),
            media: videoIntro,
            onProgress: function(percent) {
                $('.common-load-screen .percents').text(percent+'%');
                $('.common-load-screen .progress').css('width', percent+'%');
                $('.common-load-screen .progress').css('box-shadow', '0 0 10px 0 #19f5e8');
                setTimeout(function () {
                    $('.common-load-screen .progress').css('box-shadow', '0 0 0 0 #19f5e8');
                }, 500);
            },
            onComplete: function(ev) {
                $('.common-load-screen').addClass('before-hide');
                setTimeout(function () {
                    $('.common-load-screen').removeClass('show').addClass('hide');
                    $('.main-screen').removeClass('hide');
                    setTimeout(function () {
                        $('.main-screen').addClass('show');
                    }, 20);

                    setTimeout(function () {
                        $('.main-screen h2').addClass('show');
                        setTimeout(function () {$('.main-screen h2').html('o<span></span>h<span></span>z<span></span>o<span></span>b<span></span>s<span></span>w<span></span>o<span></span>x<span></span>d');}, 100);
                        setTimeout(function () {$('.main-screen h2').html('n<span></span>g<span></span>y<span></span>n<span></span>a<span></span>r<span></span>v<span></span>n<span></span>w<span></span>c');}, 200);
                        setTimeout(function () {$('.main-screen h2').html('h<span></span>t<span></span>e<span></span>r<span></span>h<span></span>n<span></span>t<span></span>a<span></span>u<span></span>o');}, 300);
                        setTimeout(function () {$('.main-screen h2').html('e<span></span>f<span></span>p<span></span>k<span></span>f<span></span>t<span></span>c<span></span>z<span></span>j<span></span>g');}, 400);
                        setTimeout(function () {$('.main-screen h2').html('j<span></span>n<span></span>l<span></span>d<span></span>k<span></span>z<span></span>l<span></span>x<span></span>k<span></span>c');}, 500);
                        setTimeout(function () {$('.main-screen h2').html('c<span></span>d<span></span>c<span></span>o<span></span>t<span></span>o<span></span>w<span></span>c<span></span>h<span></span>s');}, 600);
                        setTimeout(function () {$('.main-screen h2').html('k<span></span>l<span></span>y<span></span>q<span></span>b<span></span>d<span></span>f<span></span>d<span></span>f<span></span>b');}, 700);
                        setTimeout(function () {$('.main-screen h2').html('t<span></span>w<span></span>e<span></span>p<span></span>p<span></span>m<span></span>i<span></span>f<span></span>d<span></span>l');}, 800);
                        setTimeout(function () {$('.main-screen h2').html('p<span></span>u<span></span>y<span></span>x<span></span>o<span></span>r<span></span>g<span></span>g<span></span>r<span></span>d');}, 900);
                        setTimeout(function () {$('.main-screen h2').html('E<span></span>x<span></span>p<span></span>e<span></span>r<span></span>i<span></span>m<span></span>e<span></span>n<span></span>t');}, 1000);
                    }, 700);

                    setTimeout(function () {
                        $('.bottom-bar').addClass('show');
                    }, 1700);

                    setTimeout(function () {
                        $('.start-exploring').addClass('show');
                    }, 2000);

                    onCommonLoaderDone(
                        QualityDetector.recommendedQuality(ev.loadSpeed)
                    );
                }, 500);
            }
        });
    }

    function loadMobile(quality) {
        VideoFactory.createMobileVideo(quality);
        $(".progress-dot").hide();
    }

    function loadTablet(quality) {
        var loader = new ImageLoader();

        VideoFactory.createMobileVideo(quality);
        $(".progress-dot").hide();
        $('.common-load-screen').removeClass('hide').addClass('show');

        loader.load({
            images: imagesToLoad(),
            onProgress: function (percent) {
                var $loadScreenPercents  = $('.common-load-screen .percents'),
                    $loadScreenProgress = $('.common-load-screen .progress');
                $loadScreenPercents.text(percent+'%');
                $loadScreenProgress.css('width', percent+'%');
                $loadScreenProgress.css('box-shadow', '0 0 10px 0 #19f5e8');
                setTimeout(function () {
                    $loadScreenProgress.css('box-shadow', '0 0 0 0 #19f5e8');
                }, 500);
            },
            onComplete: function () {
                setTimeout(function () {
                    $('.common-load-screen').removeClass('show').addClass('hide');
                    $('.intro-wrapper').addClass('hide-on-device hide');
                }, 500)
            }
        });
    }

    $(document).ready(function () {
        if (browserType.isMobile()) {
            if(browserType.isMobileOpera()){
                $('.side-navigation').remove();
                $('.menu-button').remove();
                $('.intro-wrapper').css('position','absolute');
                if(browserType.isOperaMini()){
                    $('.icon').remove();
                    $('.glass-ui').remove();
                    $('.mobile-main-screen h2').css('margin','0');
                    $('.item-interaction .interaction').css('text-align','left');
                    $('.item-interaction .interaction').css('margin','0');
                    $('.title1 span, .title2 span').css('margin-left','0');
                }
            }
            loadMobile('360p');
        } else if (browserType.isTablet()) {
            initDevicePageActions();
            loadTablet('480p');
        } else {
            initDesktopPageActions();
            loadDesktop();
        }
    });

    function disable_scroll() {
        $('html,body').addClass('stop-scrolling').bind('touchmove', function(e){e.preventDefault()});
    }

    function enable_scroll() {
        $('html,body').removeClass('stop-scrolling').unbind('touchmove');
    }

    function initDesktopPageActions() {
        disable_scroll();

        function addParallaxRoute(hash) {
            router.addRoute("#" + hash,function () {
                $(".intro-wrapper").addClass('hide');
                $('.video-progress').addClass('hide');
                VideoHelper.stopAllMedia();
                setTimeout(function(){enable_scroll();},0);
                Parallax.navigate(hash);
            });
        }

        router.addRoute("",function () {
            Menu.hide();
            $(".intro-wrapper").removeClass('hide');
            VideoHelper.showVideo(document.getElementById('home-video'));
            $(".screen-wrapper>div").addClass('hide');
            $(".main-screen").removeClass('hide');

            $('.video-progress').addClass('hide');
            $(".main-screen").removeClass("before-hide");
            $(".allow-mic").removeClass('show');
            $('.loader-pop-up-screen').removeClass('before-hide');
            $(".player-screen").css('background-color', 'rgba(5, 9, 44, 1)');
            setTimeout(function(){disable_scroll();},0);
        });

        addParallaxRoute('about');
        addParallaxRoute('imagine');
        addParallaxRoute('idea');
        addParallaxRoute('how-it-works');
        addParallaxRoute('interaction');
        addParallaxRoute('programming');
        addParallaxRoute('possibilities');
        addParallaxRoute('contacts');
    }

    function initDevicePageActions() {
    }

    function imagesToLoad() {
        var localImages =[
            'img/fb_background.jpg',
            'img/posibilities.jpg',
            'img/video_inspired.jpg',
            'img/glass_ui/background/distance_run_map.jpg',
            'img/glass_ui/background/facebook_comment.jpg',
            'img/glass_ui/background/sprint_race.jpg',
            'img/glass_ui/background/team_play_first_view.jpg',
            'img/glass_ui/background/team_play_leader_board.jpg',
            'img/glass_ui/background/team_play_map.jpg',
            'img/glass_ui/mobile/distance_run_map.jpg',
            'img/glass_ui/mobile/facebook_comment.jpg',
            'img/glass_ui/mobile/sprint_race.jpg',
            'img/glass_ui/mobile/team_play_first_view.jpg',
            'img/glass_ui/mobile/team_play_leader_board.jpg',
            'img/glass_ui/mobile/team_play_map.jpg',
            'img/mobile/2.jpg',
            'img/mobile/3.jpg',
            'img/mobile/4.jpg',
            'img/mobile/fb_background.jpg',
            'img/mobile/parallax_photo.jpg',
            'img/mobile/slider/1.jpg',
            'img/mobile/slider/2.jpg',
            'img/mobile/slider/3.jpg',
            'img/screenshots/1back.jpg',
            'img/screenshots/2back.jpg',
            'img/screenshots/3back.jpg',
            'img/screenshots/4back.jpg',
            'apple-touch-icon-114×114-precomposed.png',
            'apple-touch-icon-144×144-precomposed.png',
            'apple-touch-icon-72×72-precomposed.png',
            'apple-touch-icon-precomposed.png',
            'img/android_ico.png',
            'img/arrow.png',
            'img/arrows_scroll.png',
            'img/bird-small.png',
            'img/chromme.png',
            'img/circle_sprite.png',
            'img/dot_grid.png',
            'img/fade_panel.png',
            'img/fb_ico.png',
            'img/footer_logos.png',
            'img/footer_logo_eleks.png',
            'img/footer_logo_vgnc.png',
            'img/glass_ico.png',
            'img/google_mirror_ico.png',
            'img/jabber_ico.png',
            'img/logo-mobile.png',
            'img/logo.png',
            'img/logo_glitch_sprite.png',
            'img/logo_glitch_spritev2.png',
            'img/logo_last_sprite@2x.png',
            'img/logo_sprite@2x.png',
            'img/menu.png',
            'img/mic2.png',
            'img/mic_b.png',
            'img/mic_bt.png',
            'img/mic_no.png',
            'img/mic_r.png',
            'img/mic_t.png',
            'img/mobile_icon.png',
            'img/mute.png',
            'img/play_pause.png',
            'img/read_more_arrow.png',
            'img/scroll.png',
            'img/share_photo.png',
            'img/slider_arrow.png',
            'img/social.png',
            'img/social50.png',
            'img/social_sprite_98x96.png',
            'img/soundwave.png',
            'img/watch_video.png',
            'img/web_ico.png',
            'img/web_speech_ico.png',
            'img/glass_ui/ui/distance_run_map.png',
            'img/glass_ui/ui/facebook_comment.png',
            'img/glass_ui/ui/sprint_race.png',
            'img/glass_ui/ui/team_play.png',
            'img/glass_ui/ui/team_play_leader_board.png',
            'img/glass_ui/ui/team_play_map.png',
            'img/mobile/4.png',
            'img/mobile/fb.png',
            'img/mobile/logo.png',
            'img/mobile/menu-button-close.png',
            'img/mobile/menu-button.png',
            'img/mobile/rotate_device@2x.png',
            'img/mobile/social.png',
            'img/mobile/soundwave.png',
            'img/screenshots/1front.png',
            'img/screenshots/2front.png',
            'img/screenshots/3front.png',
            'img/screenshots/4front.png',
            'img/connection_dots.gif',
            'img/ie.gif',
            'img/gif/android@2x.gif',
            'img/gif/connection_dots.gif',
            'img/gif/glass@2x.gif',
            'img/gif/jabber@2x.gif',
            'img/gif/mirror_api.gif',
            'img/gif/mobile@2x.gif',
            'img/gif/web@2x.gif',
            'img/gif/web_speech@2x.gif'
        ];
        var amazonImages = [
            'img/parallax_video/1_1/1_00003.jpg',
            'img/parallax_video/1_1/1_00004.jpg',
            'img/parallax_video/1_1/1_00005.jpg',
            'img/parallax_video/1_1/1_00006.jpg',
            'img/parallax_video/1_1/1_00007.jpg',
            'img/parallax_video/1_1/1_00008.jpg',
            'img/parallax_video/1_1/1_00009.jpg',
            'img/parallax_video/1_1/1_00010.jpg',
            'img/parallax_video/1_1/1_00011.jpg',
            'img/parallax_video/1_1/1_00012.jpg',
            'img/parallax_video/1_1/1_00013.jpg',
            'img/parallax_video/1_1/1_00014.jpg',
            'img/parallax_video/1_1/1_00015.jpg',
            'img/parallax_video/1_1/1_00016.jpg',
            'img/parallax_video/1_1/1_00017.jpg',
            'img/parallax_video/1_1/1_00018.jpg',
            'img/parallax_video/1_1/1_00019.jpg',
            'img/parallax_video/1_1/1_00020.jpg',
            'img/parallax_video/1_1/1_00021.jpg',
            'img/parallax_video/1_1/1_00022.jpg',
            'img/parallax_video/1_1/1_00023.jpg',
            'img/parallax_video/1_1/1_00024.jpg',
            'img/parallax_video/1_1/1_00025.jpg',
            'img/parallax_video/1_1/1_00026.jpg',
            'img/parallax_video/1_1/1_00027.jpg',
            'img/parallax_video/1_1/1_00028.jpg',
            'img/parallax_video/1_1/1_00029.jpg',
            'img/parallax_video/1_1/1_00030.jpg',
            'img/parallax_video/1_1/1_00031.jpg',
            'img/parallax_video/1_1/1_00032.jpg',
            'img/parallax_video/1_1/1_00033.jpg',
            'img/parallax_video/1_1/1_00034.jpg',
            'img/parallax_video/1_1/1_00035.jpg',
            'img/parallax_video/1_1/1_00036.jpg',
            'img/parallax_video/1_1/1_00037.jpg',
            'img/parallax_video/1_1/1_00038.jpg',
            'img/parallax_video/1_1/1_00039.jpg',
            'img/parallax_video/1_1/1_00040.jpg',
            'img/parallax_video/1_1/1_00041.jpg',
            'img/parallax_video/1_1/1_00042.jpg',
            'img/parallax_video/1_1/1_00043.jpg',
            'img/parallax_video/1_1/1_00044.jpg',
            'img/parallax_video/1_1/1_00045.jpg',
            'img/parallax_video/1_1/1_00046.jpg',
            'img/parallax_video/1_1/1_00047.jpg',
            'img/parallax_video/1_1/1_00048.jpg',
            'img/parallax_video/1_1/1_00049.jpg',
            'img/parallax_video/1_1/1_00050.jpg',
            'img/parallax_video/1_1/1_00051.jpg',
            'img/parallax_video/1_1/1_00052.jpg',
            'img/parallax_video/1_1/1_00053.jpg',
            'img/parallax_video/1_1/1_00054.jpg',
            'img/parallax_video/1_1/1_00055.jpg',
            'img/parallax_video/1_1/1_00056.jpg',
            'img/parallax_video/1_1/1_00057.jpg',
            'img/parallax_video/1_1/1_00058.jpg',
            'img/parallax_video/1_1/1_00059.jpg',
            'img/parallax_video/1_1/1_00060.jpg',
            'img/parallax_video/1_1/1_00061.jpg',
            'img/parallax_video/1_1/1_00062.jpg',
            'img/parallax_video/1_1/1_00063.jpg',
            'img/parallax_video/1_1/1_00064.jpg',
            'img/parallax_video/1_1/1_00065.jpg',
            'img/parallax_video/1_1/1_00066.jpg',
            'img/parallax_video/1_1/1_00067.jpg',
            'img/parallax_video/1_1/1_00068.jpg',
            'img/parallax_video/1_1/1_00069.jpg',
            'img/parallax_video/1_1/1_00070.jpg',
            'img/parallax_video/1_1/1_00071.jpg',
            'img/parallax_video/1_1/1_00072.jpg',
            'img/parallax_video/1_1/1_00073.jpg',
            'img/parallax_video/1_1/1_00074.jpg',
            'img/parallax_video/1_1/1_00075.jpg',
            'img/parallax_video/1_1/1_00076.jpg',
            'img/parallax_video/1_1/1_00077.jpg',
            'img/parallax_video/1_1/1_00078.jpg',
            'img/parallax_video/1_1/1_00079.jpg',
            'img/parallax_video/1_1/1_00080.jpg',
            'img/parallax_video/1_1/1_00081.jpg',
            'img/parallax_video/1_1/1_00082.jpg',
            'img/parallax_video/1_1/1_00083.jpg',
            'img/parallax_video/1_1/1_00084.jpg',
            'img/parallax_video/1_1/1_00085.jpg',
            'img/parallax_video/1_1/1_00086.jpg',
            'img/parallax_video/1_1/1_00087.jpg',
            'img/parallax_video/1_1/1_00088.jpg',
            'img/parallax_video/1_1/1_00089.jpg',
            'img/parallax_video/1_1/1_00090.jpg',
            'img/parallax_video/1_1/1_00091.jpg',
            'img/parallax_video/1_1/1_00092.jpg',
            'img/parallax_video/1_1/1_00093.jpg',
            'img/parallax_video/1_1/1_00094.jpg',
            'img/parallax_video/2_3/2_00000.jpg',
            'img/parallax_video/2_3/2_00001.jpg',
            'img/parallax_video/2_3/2_00002.jpg',
            'img/parallax_video/2_3/2_00003.jpg',
            'img/parallax_video/2_3/2_00004.jpg',
            'img/parallax_video/2_3/2_00005.jpg',
            'img/parallax_video/2_3/2_00006.jpg',
            'img/parallax_video/2_3/2_00007.jpg',
            'img/parallax_video/2_3/2_00008.jpg',
            'img/parallax_video/2_3/2_00009.jpg',
            'img/parallax_video/2_3/2_00010.jpg',
            'img/parallax_video/2_3/2_00011.jpg',
            'img/parallax_video/2_3/2_00012.jpg',
            'img/parallax_video/2_3/2_00013.jpg',
            'img/parallax_video/2_3/2_00014.jpg',
            'img/parallax_video/2_3/2_00015.jpg',
            'img/parallax_video/2_3/2_00016.jpg',
            'img/parallax_video/2_3/2_00017.jpg',
            'img/parallax_video/2_3/2_00018.jpg',
            'img/parallax_video/2_3/2_00019.jpg',
            'img/parallax_video/2_3/2_00020.jpg',
            'img/parallax_video/2_3/2_00021.jpg',
            'img/parallax_video/2_3/2_00022.jpg',
            'img/parallax_video/2_3/2_00023.jpg',
            'img/parallax_video/2_3/2_00024.jpg',
            'img/parallax_video/2_3/2_00025.jpg',
            'img/parallax_video/2_3/2_00026.jpg',
            'img/parallax_video/2_3/2_00027.jpg',
            'img/parallax_video/2_3/2_00028.jpg',
            'img/parallax_video/2_3/2_00029.jpg',
            'img/parallax_video/2_3/2_00030.jpg',
            'img/parallax_video/2_3/2_00031.jpg',
            'img/parallax_video/2_3/2_00032.jpg',
            'img/parallax_video/2_3/2_00033.jpg',
            'img/parallax_video/2_3/2_00034.jpg',
            'img/parallax_video/2_3/2_00035.jpg',
            'img/parallax_video/2_3/2_00036.jpg',
            'img/parallax_video/2_3/2_00037.jpg',
            'img/parallax_video/2_3/2_00038.jpg',
            'img/parallax_video/2_3/2_00039.jpg',
            'img/parallax_video/2_3/2_00040.jpg',
            'img/parallax_video/2_3/2_00041.jpg',
            'img/parallax_video/2_3/2_00042.jpg',
            'img/parallax_video/2_3/2_00043.jpg',
            'img/parallax_video/2_3/2_00044.jpg',
            'img/parallax_video/2_3/2_00045.jpg',
            'img/parallax_video/2_3/2_00046.jpg',
            'img/parallax_video/2_3/2_00047.jpg',
            'img/parallax_video/2_3/2_00048.jpg',
            'img/parallax_video/2_3/2_00049.jpg',
            'img/parallax_video/2_3/2_00050.jpg',
            'img/parallax_video/2_3/2_00051.jpg',
            'img/parallax_video/2_3/2_00052.jpg',
            'img/parallax_video/2_3/2_00053.jpg',
            'img/parallax_video/2_3/2_00054.jpg',
            'img/parallax_video/2_3/2_00055.jpg',
            'img/parallax_video/2_3/2_00056.jpg',
            'img/parallax_video/2_3/2_00057.jpg',
            'img/parallax_video/2_3/2_00058.jpg',
            'img/parallax_video/2_3/2_00059.jpg',
            'img/parallax_video/2_3/2_00060.jpg',
            'img/parallax_video/2_3/2_00061.jpg',
            'img/parallax_video/2_3/2_00062.jpg',
            'img/parallax_video/2_3/2_00063.jpg',
            'img/parallax_video/2_3/2_00064.jpg',
            'img/parallax_video/2_3/2_00065.jpg',
            'img/parallax_video/2_3/2_00066.jpg',
            'img/parallax_video/2_3/2_00067.jpg',
            'img/parallax_video/2_3/2_00068.jpg',
            'img/parallax_video/2_3/2_00069.jpg',
            'img/parallax_video/2_3/2_00070.jpg',
            'img/parallax_video/2_3/2_00071.jpg',
            'img/parallax_video/2_3/2_00072.jpg',
            'img/parallax_video/2_3/2_00073.jpg',
            'img/parallax_video/2_3/2_00074.jpg',
            'img/parallax_video/2_3/2_00075.jpg',
            'img/parallax_video/2_3/2_00076.jpg',
            'img/parallax_video/2_3/2_00077.jpg',
            'img/parallax_video/2_3/2_00078.jpg',
            'img/parallax_video/2_3/2_00079.jpg',
            'img/parallax_video/2_3/2_00080.jpg',
            'img/parallax_video/2_3/2_00081.jpg',
            'img/parallax_video/2_3/2_00082.jpg',
            'img/parallax_video/2_3/2_00083.jpg',
            'img/parallax_video/2_3/2_00084.jpg',
            'img/parallax_video/2_3/2_00085.jpg',
            'img/parallax_video/2_3/2_00086.jpg',
            'img/parallax_video/2_3/2_00087.jpg',
            'img/parallax_video/2_3/2_00088.jpg',
            'img/parallax_video/2_3/2_00089.jpg',
            'img/parallax_video/2_3/2_00090.jpg',
            'img/parallax_video/2_3/2_00091.jpg',
            'img/parallax_video/2_3/2_00092.jpg',
            'img/parallax_video/2_3/2_00093.jpg',
            'img/parallax_video/2_3/2_00094.jpg',
            'img/parallax_video/2_3/2_00095.jpg',
            'img/parallax_video/2_3/2_00096.jpg',
            'img/parallax_video/2_3/2_00097.jpg',
            'img/parallax_video/2_3/2_00098.jpg',
            'img/parallax_video/2_3/2_00099.jpg',
            'img/parallax_video/2_3/2_00100.jpg',
            'img/parallax_video/2_3/2_00101.jpg',
            'img/parallax_video/2_3/2_00102.jpg',
            'img/parallax_video/2_3/2_00103.jpg',
            'img/parallax_video/2_3/2_00104.jpg',
            'img/parallax_video/2_3/2_00105.jpg',
            'img/parallax_video/2_3/2_00106.jpg',
            'img/parallax_video/2_3/2_00107.jpg',
            'img/parallax_video/2_3/2_00108.jpg',
            'img/parallax_video/2_3/2_00109.jpg',
            'img/parallax_video/2_3/2_00110.jpg',
            'img/parallax_video/2_3/2_00111.jpg',
            'img/parallax_video/2_3/2_00112.jpg',
            'img/parallax_video/2_3/2_00113.jpg',
            'img/parallax_video/2_3/2_00114.jpg',
            'img/parallax_video/2_3/2_00115.jpg',
            'img/parallax_video/2_3/2_00116.jpg',
            'img/parallax_video/2_3/2_00117.jpg',
            'img/parallax_video/2_3/2_00118.jpg',
            'img/parallax_video/2_3/2_00119.jpg',
            'img/parallax_video/2_3/2_00120.jpg',
            'img/parallax_video/2_3/2_00121.jpg',
            'img/parallax_video/2_3/2_00122.jpg',
            'img/parallax_video/2_3/2_00123.jpg',
            'img/parallax_video/2_3/2_00124.jpg',
            'img/parallax_video/2_3/2_00125.jpg',
            'img/parallax_video/2_3/2_00126.jpg',
            'img/parallax_video/2_3/2_00127.jpg',
            'img/parallax_video/2_3/2_00128.jpg',
            'img/parallax_video/2_3/2_00129.jpg',
            'img/parallax_video/2_3/2_00130.jpg',
            'img/parallax_video/2_3/2_00131.jpg',
            'img/parallax_video/2_3/2_00132.jpg',
            'img/parallax_video/2_3/2_00133.jpg',
            'img/parallax_video/2_3/2_00134.jpg',
            'img/parallax_video/2_3/2_00135.jpg',
            'img/parallax_video/2_3/2_00136.jpg',
            'img/parallax_video/2_3/2_00137.jpg',
            'img/parallax_video/2_3/2_00138.jpg',
            'img/parallax_video/2_3/2_00139.jpg',
            'img/parallax_video/2_3/2_00140.jpg',
            'img/parallax_video/2_3/2_00141.jpg',
            'img/parallax_video/2_3/2_00142.jpg',
            'img/parallax_video/2_3/2_00143.jpg',
            'img/parallax_video/2_3/2_00144.jpg',
            'img/parallax_video/2_3/2_00145.jpg',
            'img/parallax_video/2_3/2_00146.jpg',
            'img/parallax_video/2_3/2_00147.jpg',
            'img/parallax_video/2_3/2_00148.jpg',
            'img/parallax_video/2_3/2_00149.jpg'
        ].map(function (u) { return '//project-g.s3.amazonaws.com/' + u; });

        return browserType.supportsParallax() ? localImages.concat(amazonImages) : localImages;
    }
});