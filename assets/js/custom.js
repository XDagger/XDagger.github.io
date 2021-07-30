
$(function() {
    (function() {
        var roadmap = document.querySelector('.js-roadmap');
        var timeline = roadmap.querySelector('.js-roadmap-timeline');
        var nav = roadmap.querySelector('.js-roadmap-nav');

        var timeframes = timeline.querySelectorAll('.js-roadmap-timeframe');
        var navEls = roadmap.querySelectorAll('.js-roadmap-link');
        var navActiveClass = 'roadmap__nav-link--active';
        var $carousel = $(timeline);
        var breakPoint = '650px';
        var stage;
        var previousHeight;

        var startIndex = Array.prototype.findIndex.call(navEls, function(el) {
            return el.classList.contains(navActiveClass);
        });

        $carousel.on('translated.owl.carousel', handleCurrentSlide);
        $carousel.on('resized.owl.carousel', handleCurrentSlide);
        $carousel.on('initialized.owl.carousel', function() {
            stage = roadmap.querySelector('.owl-stage-outer');
            styleRoadmapHeight(startIndex);

        });

        $carousel.owlCarousel({
            autoplay: false,
            loop: false,
            startPosition: startIndex,
            items: 1
        });

        Array.prototype.forEach.call(navEls, function(el, i) {
            var nextIndex = i;

            el.addEventListener('click', function(e) {
                goToSlide(nextIndex);
            })
        });

        function goToSlide(nextIndex) {
            $carousel.trigger('to.owl.carousel', nextIndex, 1000);

            Array.prototype.forEach.call(navEls, function(el, i) {
                el.classList.remove(navActiveClass);

                if (i === nextIndex) {
                    el.classList.add(navActiveClass);
                }
            });
        }

        function handleCurrentSlide(translateEvent) {
            styleNavLinks(translateEvent.item.index);
            styleRoadmapHeight(translateEvent.item.index);
        }

        function isDesktopView() {
            return window.matchMedia('(min-width:' + breakPoint + ')').matches;
        }

        function styleRoadmapHeight(slideIndex) {

            var timeframeHeight = timeframes[slideIndex].offsetHeight;

            if (isDesktopView()) {
                var navHeight = nav.offsetHeight;
                var nextHeight = timeframeHeight > navHeight ? timeframeHeight : navHeight;

                if (previousHeight !== nextHeight) {
                    $(roadmap).animate({
                        height: nextHeight
                    }, 1000, 'easeInOutQuart');
                }

                previousHeight = nextHeight;
            } else {
                $(stage).animate({
                    height: timeframeHeight
                }, 1000, 'easeInOutQuart');
            }
        }

        function styleNavLinks(slideIndex) {
            var nodes = roadmap.querySelectorAll('.js-roadmap-link');

            Array.prototype.forEach.call(nodes, function(node, i) {
                node.classList.remove(navActiveClass);

                if (i === slideIndex) {
                    node.classList.add(navActiveClass);
                }
            });
        }
    })();

});
