jQuery(document).ready(function( $ ) {

  /**
   * Video overlay
   */

  $('.playvideo').click(function () {
    $(".mask").show();
    $(".playbrdr").show();
    var iframeUrl=$("iframe").attr("src");
    $("iframe").attr("src","https://www.youtube.com/embed/mUlEVP2MjgQ?autoplay=1")
  });
  $('.videoclose').click(function () {
    $(".mask").hide();
    $(".playbrdr").hide();
    var iframeUrl=$("iframe").attr("src");
    $("iframe").attr("src","https://www.youtube.com/embed/mUlEVP2MjgQ?rel=0&amp;showinfo=0")
  });

  /**
   * Banner
   */

  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
  (index === 0) ?
  introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
  introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");
  });
  $(".carousel").swipe({
  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');
  },
  allowPageScroll:"vertical"
  });

  /**
   * Community
   */

  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 1180: { items: 8 }
    }
  });
});

/**
 * Roadmap
 */

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

/*
 * Exchanges
 */

(function() {

  var exchangesList = document.querySelector('.js-exchange-list') 
  var exchanges = exchangesList.querySelectorAll('.js-exchange');
  var shuffledExchanges = Array.prototype.slice.call(exchanges).shuffle();
  var fragment = document.createDocumentFragment();
  var shuffledExchangesList = exchangesList.cloneNode(false);

  Array.prototype.forEach.call(shuffledExchanges, function(exchange, i) {
    exchange.classList.add('wow', 'fadeInUp');
    exchange.dataset.wowDelay = '0.' + i + 's';
    fragment.appendChild(exchange);
  });

  shuffledExchangesList.appendChild(fragment);
  exchangesList.parentNode.replaceChild(shuffledExchangesList, exchangesList);

})();