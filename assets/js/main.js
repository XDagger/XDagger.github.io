/**
 * Display elements on scroll to view
 */

new WOW({
  resetAnimation: false
}).init();

/**
 * Execute callbacks depending on user scroll position
 */

(function() {
  /**
   * triggerPoint = vertical scroll value where the callbacks are executed
   * callbackBelowTrigger = callback to execute when window.scrollY turns to less than (<) the trigger point 
   * callbackOverTrigger = callback to execute when window.scrollY turns to more or the same as (>=) the trigger point 
   */
  function scrollTrigger(triggerPoint, callbackBelowTrigger, callbackOverTrigger) {
    var isPastTriggerPoint;

    if (isOver()) {
      callbackOverTrigger();
      isPastTriggerPoint = true;
    } else {
      callbackBelowTrigger();
      isPastTriggerPoint = false;
    } 

    function isBelow() {
      return window.scrollY < triggerPoint;
    }

    function isOver() {
      return window.scrollY >= triggerPoint;
    }

    function handleCallback() {
      if (isOver() && !isPastTriggerPoint) {
        callbackOverTrigger();
        isPastTriggerPoint = true;
      } else if (isBelow() && isPastTriggerPoint) {
        callbackBelowTrigger();
        isPastTriggerPoint = false;
      } 
    }

    // Optimized scroll listener
    // src: https://developer.mozilla.org/en-US/docs/Web/Events/scroll
    var ticking = false;
    var last_known_scroll_position = 0;

    window.addEventListener("scroll", function() {
      last_known_scroll_position = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function() {
          handleCallback();
          ticking = false;
        });
         
        ticking = true;
      }
    });
  }

  var $backToTop = $('.back-to-top');
  scrollTrigger(
    100,
    function() {
      $backToTop.fadeOut('slow');
    },
    function() {
      $backToTop.fadeIn('slow');
    }
  );

  var header = document.querySelector('#header');
  scrollTrigger(
    10,
    function() {
      header.classList.remove('header-scrolled');
    },
    function() {
      header.classList.add('header-scrolled');
    }
  );
})();

/**
 * Accessibility
 */

var accessibility = (function() {
  window.addEventListener('keydown', handleFocusable);

  function handleFocusable(e) {
    var code = (e.key ? e.key : e.keyCode);
    if (code === 9 || code === "Tab") {
      document.body.classList.add('is-focusable');
      window.removeEventListener('keydown', handleFocusable);
    }
  }

  function isClick(e) {
    var code = (e.key ? e.key : e.keyCode);

    switch (code) {
      case 13:
      case "Enter":
      case 32:
      case " ":
        return true;
      default:
        return false;
    }
  }

  return {
    isClick: isClick
  };
})();

/**
 * Optimized resize listener
 * src: https://developer.mozilla.org/en-US/docs/Web/Events/resize
 */

var throttle = function(type, name, obj) {
  obj = obj || window;
  var running = false;
  var func = function() {
    if (running) { return; }
    running = true;
    requestAnimationFrame(function() {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };
  obj.addEventListener(type, func);
};
throttle("resize", "optimizedResize");

/**
 * Main navigation
 */

var nav = (function() {
  // $nav-breakpoint in main.scss
  var navBreakpoint = '1300px';
  var navToggle = document.querySelector('.js-nav-main-toggle');
  var noSubItems = document.querySelectorAll('.js-nav-no-sublevel');
  var subItems = document.querySelectorAll('.js-nav-has-sublevel');
  var labels = document.querySelectorAll('.js-nav-sublevel-label');
  var isCurrentlyDesktopView = window.innerWidth > 950;

  var $nav = $('.js-nav-main').superfish({
    // disable hover triggers under this value
    breakpoint: navBreakpoint,
    cssArrows: false,
    delay: 600,
    speed: 400,
    speedOut: 400,
    hoverClass: 'is-active',
    disableHI: true,
    animation: {
      height: 'show',
      opacity: 1
    },
    animationOut: {
      height: 'hide',
      opacity: 0
    },
    onBeforeShow: function() {
      var self = this[0];

      if (self) {
        var label = self.parentNode.querySelector('.js-nav-sublevel-label');
        label.setAttribute('aria-expanded', true);
      }
    },
    onHide: function() {
      var self = this[0];

      if (self) {
        var label = self.parentNode.querySelector('.js-nav-sublevel-label');
        label.setAttribute('aria-expanded', false);
      }
      this.removeAttr("style");
    },
    onHandleTouch: function() {
      return false;
    }
  });

  function isDesktopView() {
    return window.matchMedia('(min-width:' + navBreakpoint + ')').matches;
  }

  window.addEventListener('optimizedResize', function() {
    if (!isCurrentlyDesktopView && window.innerWidth > 950) {
      isCurrentlyDesktopView = true;
      $nav.superfish('hide', true);
    } else if (isCurrentlyDesktopView && window.innerWidth < 950) {
      isCurrentlyDesktopView = false;
    }
  });

  Array.prototype.forEach.call(labels, function(label) {
    var sublevel = label.parentNode.querySelector('.js-nav-sublevel');

    label.setAttribute('aria-expanded', false);
    label.setAttribute('aria-role', 'button');
    label.setAttribute('aria-controls', sublevel.id);

    label.addEventListener('click', function(e) {
      var item = label.parentNode;
      if (item.classList.contains('is-active')) {
        $(item).superfish('hide');
      } else {
        $(item).superfish('show');
      }
    });

    label.addEventListener('keypress', function(e) {
      var item = label.parentNode;

      if (accessibility.isClick(e)) {
        item.classList.contains('is-active') ? $(item).superfish('hide') : $(item).superfish('show');
      } 
    });
  });

  Array.prototype.forEach.call(noSubItems, function(item) {
    item.addEventListener('mouseenter', function() {
      if(isDesktopView()) {
        $nav.superfish('hide');
      }
    });
  });

  navToggle.addEventListener('change', function() {
    document.body.classList.toggle('nav-overlay-active');
  });

  return {
    $el: $nav
  };
})();

// Mitigate IE/Edge bug showing bullets on lists which are hidden when loading the page
// src: https://github.com/sonarwhal/sonarwhal.com/issues/210
if (document.documentMode || /Edge/.test(navigator.userAgent)) {
  $('ul:hidden').each(function(){
    $(this).parent().append($(this).detach());
  });
}

/**
 * Smooth scroll to element
 */

(function() {
  var links = document.querySelectorAll('.nav-main a, .js-scrollto');
  var header = document.querySelector('.js-header');
  var navToggle = document.querySelector('.js-nav-main-toggle');
  var $html = $('html');

  for (link of links) {
    if (isCurrentPageHash(link)) {
      link.addEventListener('click', handleClick);
      link.addEventListener('keypress', handleKeyboard);
    }
  }

  function handleScroll(e) {
    var $scrollTarget = $(e.target.hash);
    var headerHeight = header.classList.contains('header-scrolled') ? header.offsetHeight : header.offsetHeight - 20;

    navToggle.checked = false;
    document.body.classList.remove('nav-overlay-active');
    nav.$el.superfish('hide');
    $('html, body').animate({
      scrollTop: $scrollTarget.offset().top - headerHeight
    }, 1500, 'easeInOutExpo');
  }

  function handleKeyboard(e) {
    if (accessibility.isClick(e)) {
      e.preventDefault();
      handleClick(e);
    }
  }

  function handleClick(e) {
    e.preventDefault();
    handleScroll(e);
  }

  function isCurrentPageHash(link) {
    return link.hash && 
           location.pathname.replace('index.html', '') === link.pathname.replace('index.html', '') && 
           location.hostname === link.hostname;
  }
})();