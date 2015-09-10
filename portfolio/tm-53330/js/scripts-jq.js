$(document).ready(function() {
/* Show starts in product rating*/
  showProductStars();

/* Generate menu for small resolutions - Select-option */
  generateMenu();

/* Slideshow */
  currentImg = 2;
  MAX_IMG_COUNT = 3;
  var imgPosition = [[0, 70, 85], [0, 15, 85], [0, 15, 30]];
  $('.slideshow img').on('load', defineImgHeight);

  var timerSlideshow = setInterval(slideshow, 5000);

  $('.slideshow img').on('mouseover', stopSlideshow);
  $('.slideshow img').on('mouseout', startSlideshow);

/* Fix main menu while scroll */
  $(document).on('scroll', fixMainMenu);

/* Show/hide rating on hovering*/
  $('.fp_rating_container').on('mouseover', 'img', showProductRating);
  $('.fp_rating_container').on('mouseout', 'img', hideProductRating);

  $('.os_rating_container').on('mouseover', 'img', showProductRating);
  $('.os_rating_container').on('mouseout', 'img', hideProductRating);

/* Show/hide Quick button on hover */
  $('.wrapper-featured-products').on('mouseenter', '.fp_img', showQuickViewButton);
  $('.wrapper-featured-products').on('mouseleave', '.fp_img', hideQuickViewButton);
  $('.wrapper-onsale').on('mouseenter', '.os_img', showQuickViewButton);
  $('.wrapper-onsale').on('mouseleave', '.os_img', hideQuickViewButton);

/* Slider */
  var IMG_ALL = $('.onsale .os').length;
  var currentMargin = 0;
  //var currentNumStep = 0;
  var IMG_VISIBLE;
  var marginStep;
  var maxSteps;
  var maxMargin;

  sliderImgSizes();

  $(window).on('resize', sliderImgSizes);

  $('.wrapper-onsale').on('click', '.arrow-right', scrollRight);
  $('.wrapper-onsale').on('click', '.arrow-left', scrollLeft);

/* Unfinished funcs*/
  $('.main-menu').on('mouseover', '.parent', showSubSubMenu);
  $('.main-menu').on('mouseleave', '.parent', hideSubSubMenu);

/* On DOM load */
  function showProductStars() {
    var MAX_RAITING = 5;
    var MAX_WIDTH = 100;

    $(".fp_rating_value").each(function(i, elem){
      var raitingWidth = +$(elem).text() * MAX_WIDTH / MAX_RAITING;
      $(this).siblings('.fp_rating_block').css({'width': raitingWidth + 'px'});
    });

    $(".os_rating_value").each(function(i, elem){
      var raitingWidth = +$(elem).text() * MAX_WIDTH / MAX_RAITING;
      $(this).siblings('.os_rating_block').css({'width': raitingWidth + 'px'});
    });
  }

  function generateMenu() {
    var tire='';
    $('.nav-main').append('<select class="main-menu_small-res">');

    $('.main-menu>li').each(addItem);

    function addItem() {
      if ($(this).hasClass('parent')) {
        $('.main-menu_small-res').append('<option>'+ tire + $(this).find('a:first').text() + '</option>')

        if ($(this).find('ul>li').length) {
          tire+='-';
          $(this).find('ul>li').each(addItem);
          tire = tire.slice(0, -1);
          return true;
        }

      }

      $('.main-menu_small-res').append('<option>'+ tire + $(this).text() + '</option>')
    }
  }

/* Slideshow */
  function defineImgHeight() {
    $('.slideshow').height($(this).height());
  }

  function slideshow(argument) {
    var currentCoords = imgPosition[currentImg-1];

    currentCoords.forEach(function(item, i) {
      $('.sh-img' + (i+1)).animate({'left': item + '%'}, 1000);
    });

    currentImg++;
    if (currentImg > MAX_IMG_COUNT) currentImg = 1;
  }

  function stopSlideshow(e) {
    //if (!$(e.relatedTarget).closest('.slideshow').length) {
      clearInterval(timerSlideshow);
    //}
    var currentImg = $(this).attr('data-number');
    var currentCoords = imgPosition[currentImg-1];

    currentCoords.forEach(function(item, i) {
      $('.sh-img' + (i+1)).animate({'left': item + '%'}, 1000);
    });
  };

  function startSlideshow(e) {
    if ($(e.relatedTarget).closest('.slideshow').length) return;
    currentImg++;
    if (currentImg > MAX_IMG_COUNT) currentImg = 1;
    timerSlideshow = setInterval(slideshow, 5000);
  };

/* Fixed main menu */
  function fixMainMenu() {
    if ($('body').scrollTop() > 91) {
      if (!$('.main-menu').hasClass('fixed-menu')) {
        $('.logo').hide();
        $('.top-panel-first').hide();
        //$('.wrapper-search').hide();
        $('.main-menu').addClass('fixed-menu');
      }
    } else {
      if ($('.main-menu').hasClass('fixed-menu')) {
        $('.logo').show();
        $('.top-panel-first').show();
        //$('.wrapper-search').show();
        $('.main-menu').removeClass('fixed-menu');
      }
    }
  }

/* For products */
  function showProductRating() {
    //$(this).find('.fp_rating_value').animate({top: "-28px", display: 'block'}, "slow");
    $(this).prevAll('.fp_rating_value').animate({opacity: "show", top: "-40"}, 500);
    $(this).prevAll('.os_rating_value').animate({opacity: "show", top: "-40"}, 500);
  }

  function hideProductRating() {
    $(this).prevAll('.fp_rating_value').animate({opacity: "hide", top: "-60"}, 500);
    $(this).prevAll('.os_rating_value').animate({opacity: "hide", top: "-60"}, 500);
  }

  function showQuickViewButton() {
    $(this).find('.fp_quick-view').animate({opacity: "show", top: "50%"}, 500);
    $(this).find('.os_quick-view').animate({opacity: "show", top: "50%"}, 500);
  }

  function hideQuickViewButton(str) {
    $(this).find('.fp_quick-view').animate({opacity: "hide", top: "-50%"}, 500);
    $(this).find('.os_quick-view').animate({opacity: "hide", top: "-50%"}, 500);
  }

/* Slider On-Sale Arrows*/
  function sliderImgSizes() {
    if ($(document).width() > 980) {
      IMG_VISIBLE = 4;
    } else if ($(document).width() > 876) {
      IMG_VISIBLE = 3;
    } else if ($(document).width() > 496){
      IMG_VISIBLE = 2;
    } else {
      IMG_VISIBLE = 1;
    }
    marginStep = 100 / IMG_VISIBLE;
    maxSteps = IMG_ALL - IMG_VISIBLE;
    maxMargin = maxSteps * marginStep;
    //    currentMargin = currentNumStep*marginStep;
    $('.onsale .os').css({'width': marginStep + '%'});
    $('.onsale').css({'margin-left': '0'});
    $('.onsale').css({'margin-right': '0'});
  }

  function scrollRight(e) {
    if (currentMargin - marginStep < 0 - maxMargin) {
      currentMargin = 0
      currentNumStep = 0;
      $('.onsale').css({'margin-left': currentMargin + '%'});
      $('.onsale').css({'margin-right': (0-currentMargin) + '%'});

      return;
    }
    currentMargin -= marginStep;
    $('.onsale').css({'margin-left': currentMargin + '%'});
    $('.onsale').css({'margin-right': (0 - currentMargin) + '%'});

    currentNumStep++;
  }

  function scrollLeft(e) {
    if (currentMargin + marginStep > 0) {
      currentMargin = 0 - maxMargin;
      currentNumStep =maxSteps;
      $('.onsale').css({'margin-left': currentMargin + '%'});
      $('.onsale').css({'margin-right': (0 - currentMargin) + '%'});
      return;
    }
    currentMargin += marginStep;
    $('.onsale').css({'margin-left': currentMargin + '%'});
    $('.onsale').css({'margin-right': (0 - currentMargin) + '%'});
    currentNumStep--;
  }


/* Unfinished funcs */
  function showSubMenu(e) {

    if (currentElem) {
      return;
    }

    var target = e.target;

    // уж не на TD ли?
    if (!$(target).closest('.parent').length) return;

    while (target != this) {
      if ($(target).hasClass('parent')) break;
      target = target.parentNode;
    }
    if (target == this) return;

    // да, элемент перешёл внутрь TD!
    currentElem = target;

    /*    var target = e.target;
    var currentElem = target.closest('.parent');
    if ($(target).parent('.submenu').length) {
      $(target).children('.submenu').css({})
      var left = $(target).parent('.submenu').offset().left + 200;
      var top = $(target).parent('.submenu').offset().top;
      $(target).children('.submenu').offset({
        top: top,
        left: left
      });
      console.log(1);
    }*/

    if ($(target).hasClass('submenu')) {
      $(target).animate({height: 'show'}, 10);
      return;
    }
    $(target).children('.submenu').animate({height: 'show'}, 10);
  }

  function hideSubMenu(e) {

    if (!currentElem) return;

    // произошёл уход с элемента - проверим, куда, может быть на потомка?
    var relatedTarget = e.relatedTarget;
    if (relatedTarget) { // может быть relatedTarget = null
      while (relatedTarget) {
        // идём по цепочке родителей и проверяем,
        // если переход внутрь currentElem - игнорируем это событие
        if (relatedTarget == currentElem) return;
        relatedTarget = relatedTarget.parentNode;
      }
    }

    if ($(currentElem).hasClass('submenu')) {
      $(currentElem).animate({height: 'hide'}, 10);
      currentElem = null;
      return;
    }
    $(currentElem).children('.submenu').animate({height: 'hide'}, 10);
    currentElem = null;
  }

  function showSubSubMenu(e) {
    var target = e.target;

    if ($(target).closest('.submenu').length) {
      $(target).children('.submenu').animate({height: 'show'}, 10);
    }
  }

  function hideSubSubMenu(e) {
    var target = e.target;

    if ($(target).closest('.submenu').length) {
      $(target).children('.submenu').animate({height: 'hide'}, 10);
    }
  }

});