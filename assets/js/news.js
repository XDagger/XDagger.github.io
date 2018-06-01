jQuery(document).ready(function( $ ) {
  $('.news .rht').click(function (e) {
      $(this).parent().find(".all").toggle();
      $(this).parent().find(".top").toggle();
      $(this).parent().find("i").toggleClass("ion-ios-arrow-up");
  });

  $('.news .lft').click(function (e) {
      if(e.target.nodeName !== "A"){
          $(this).find(".all").show();
          $(this).find(".top").hide();
          $(this).parent().find("i").addClass("ion-ios-arrow-up");
      }
  });

  $('.cont a').each(function() {
      $(this).attr('target', '_blank');
  });
});
