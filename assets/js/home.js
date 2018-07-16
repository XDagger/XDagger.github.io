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
    responsive: { 0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
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
  var breakPoint = '600px';
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

/**
 * Pool list functionality
 */
 
Array.prototype.shuffle = function() {
  const input = this;
  for (let i = input.length-1; i >=0; i--) {
    const randomIndex = Math.floor(Math.random()*(i+1));
    let itemAtIndex = input[randomIndex];
    input[randomIndex] = input[i];
    input[i] = itemAtIndex;
  }
  return input;
};

(function() {
  var poolList = document.querySelector('.plist');
  var pools = document.querySelectorAll('.plist > p');
  var toggle = document.querySelector('.js-pool-info-toggle');
  var shuffledPools = Array.prototype.slice.call(pools).shuffle();
  var fragment = document.createDocumentFragment();
  var proxy = 'https://powerful-sea-54885.herokuapp.com/';
  var proxyFallback = 'https://cors-anywhere.herokuapp.com/';
  var messages = [
    {
      text: 'Synchronized with the main network. Normal operation.'
    },
    {
      text: 'Connected to the main network. Synchronizing.'
    },
    {
      text: 'Loading blocks from the local storage.'
    },
    {
      text: 'Can\'t connect to unix domain socket errno:111',
      userFriendlyText: 'Offline.'
    }
  ];
  var messageFallback = 'Could not be resolved';



  for (pool of shuffledPools) {
    fragment.appendChild(pool);
  }

  poolList.innerHTML = "";
  poolList.appendChild(fragment);

  toggle.addEventListener('click', renderPoolStates);

  function renderPoolStates() {
    for (pool of shuffledPools) {
      let stateEl = pool.querySelector('.js-pool-state');
      let url = stateEl.dataset.url;

      if (url === '') {
        stateEl.textContent = messageFallback;
      } else {
        stateEl.textContent = 'Loading pool state...';
        handleStateCheck(url, stateEl, true);
      }
    }

    toggle.removeEventListener('click', renderPoolStates);
  }

  function handleStateCheck(url, el, firstRun) {
    $.ajax({
      url: proxy + url,
      type: 'GET',
      success: function(res) {
        res = res.state ? res.state : res;
        
        var message = messages.find(function(message) {
          return res.indexOf(message.text) > -1;
        });

        if (message !== undefined) {
          el.textContent = message.hasOwnProperty('userFriendlyText') ? message.userFriendlyText : message.text;
        } else {
          el.textContent = messageFallback;
        }
      },
      error: function(res) {
        if (firstRun) {
          proxy = proxyFallback;
          handleStateCheck(url, el, false);
        } else {
          el.textContent = messageFallback; 
        }
      }
    });
  }
})();