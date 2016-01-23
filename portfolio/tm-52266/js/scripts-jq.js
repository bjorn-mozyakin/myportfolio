$(document).ready(function(){
  var timerIdBegin;
  var timerIdEnd;

  $('.submenu-exists a').on('mouseover', showSubMenu);
  $('.submenu-exists a').on('mouseout', hideSubMenu);

  function showSubMenu(e) {

    var target = e.target;

    if ($(target).parent().parent('.submenu') == undefined) {
      clearTimeout(timerIdEnd);

    }

    if ($(target).parent('.submenu-exists')[0] != undefined) {
      var submenu =  $( target ).next('.submenu');
      $(submenu).slideDown( 300 );
    }
    // else if ($(target).parent().parent('.submenu')) {
    //   var submenu =  $( target ).parent().parent('.submenu');
    // }

    //$(submenu).slideDown( 300 );
    // timerIdStart = setTimeout(function(){
    // }, 1000);
    // else if ($(target).parent('.subsubmenu-exists')[0] != undefined) {
    //   var submenu =  $( target ).next('.submenu__submenu');
    //   $(submenu).slideDown( 300 );
    // }
  }



  function hideSubMenu(e) {
    //clearTimeout(timerIdBegin);

    var target = e.target;
    var relatedTarget = e.relatedTarget;

    if ($(target).parent('.submenu-exists')[0] != undefined) {
      var submenu =  $( target ).next('.submenu');
    } else if ($(target).parent().parent('.submenu')) {
      var submenu =  $( target ).parent().parent('.submenu');
    }

    // else if ($(target).parent('.subsubmenu-exists')[0] != undefined) {
    //   var submenu =  $( target ).next('.header__nav__menu__submenu__submenu');
    // }

    //  else {
    //   var submenu =  $( target ).parents('.header__nav__menu__submenu');
    // }

    timerIdEnd = setTimeout(function(){
      $(submenu).slideUp( 300 );
    }, 1000);

  }

});