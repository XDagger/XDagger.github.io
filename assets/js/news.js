jQuery(document).ready(function( $ ) {

  function toggleContent($parent) {
      var on = $parent.find(".js-toggle-content").hasClass("ion-ios-arrow-up");

      if (on) {
          $parent.find(".all").hide();
          $parent.find(".top").show();
          $parent.find(".js-toggle-content").removeClass("ion-ios-arrow-up");
      } else {
          $parent.find(".all").show();
          $parent.find(".top").hide();
          $parent.find(".js-toggle-content").addClass("ion-ios-arrow-up");
      }
  }

  $('.news .rht').click(function() {
      toggleContent($(this).parent());
  });

  $('.news .tit .js-toggle-content').click(function() {
      toggleContent($(this).parent().parent().parent());
  });

  $('.news .top').click(function (e) {
      if(e.target.nodeName !== "A"){
          var $parent = $(this).parent().parent();

          $parent.find(".all").show();
          $(this).hide();
          $parent.find(".js-toggle-content").addClass("ion-ios-arrow-up");
      }
  });

  $('.cont a').each(function() {
      $(this).attr('target', '_blank');
  });
});
