jQuery(document).ready(function( $ ) {
  $('.news>li').click(function (e) {
      if(e.target.nodeName !== "A"){
          $(this).find(".all").toggle();
          $(this).find(".top").toggle();
          $(this).find("i").toggleClass("ion-ios-arrow-up");
      }
  });
    $('.cont a').each(function() {
        $(this).attr('target', '_blank');
    });
});
