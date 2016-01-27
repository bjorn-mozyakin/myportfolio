$(document).ready(function(){
  var timerIdBegin;
  var timerIdEnd;

  if (window.addEventListener) {
    window.addEventListener("wheel", onWheel);
  } else { // IE8-
    window.attachEvent("onmousewheel", onWheel);
  }
/* -------------------------------- */
  $("ul.header__nav__menu li").hover(showSubmenu, hideSubmenu);
/* -------------------------------- */
  var timerSlider = setInterval(changeImgInSlider, 5000);

  $('.slider__captions__circles__circle').on('click', changeImgInSlider2);
/* -------------------------------- */
  $(window).on('scroll', animateElements);
/* -------------------------------- */
  $('.magnify').on('click', magnifyImg);

  $(document).on('keydown', keyboardHandler);
  $(document).on('click', mouseHandler);

  $(window).on('resize', positionNavElems);
/* -------------------------------- */
/* -------------------------------- */
/* -------------------------------- */
  function onWheel(e) {
    var delta = -e.deltaY  / 100 || e.wheelDelta / 120 || -e.detail / 3;
    var time = 500;
    var distance = 200;

    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time );

    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false; // for IE8- ?
    }
  }
/* -------------------------------- */
  function showSubmenu(e) {
    var target = e.target;
    var relatedTarget = e.relatedTarget;

    if ($(e.relatedTarget).parents('.submenu-exists')[0] == undefined) {
     clearTimeout(timerIdEnd);
    }

    $('ul:first',this).slideDown(300);
  }

  function hideSubmenu (e){
    var target = e.target;
    var relatedTarget = e.relatedTarget;

    var list = $('ul:first', this);

    timerIdEnd = setTimeout(function(){
      $(list).slideUp( 300 );
    }, 500);
  }
/* -------------------------------- */
  function changeImgInSlider() {
    var imgnum = $('.slider__images__image_active').data('imgnum');

    // $('.slider__images__image_active').fadeOut(500);
    // $('.slider__captions__caption_active').fadeOut(500);
    // $('.slider__captions__circles__circle_active').fadeOut(500);

    $('.slider__images__image_active').removeClass('slider__images__image_active');
    $('.slider__captions__caption_active').removeClass('slider__captions__caption_active');
    $('.slider__captions__circles__circle_active').removeClass('slider__captions__circles__circle_active');


    imgnum++;
    if (imgnum > 3) imgnum = 1;

    $('[data-imgnum=' + imgnum + ']').addClass('slider__images__image_active');
    $('[data-capnum=' + imgnum + ']').addClass('slider__captions__caption_active');
    $('[data-circlenum=' + imgnum + ']').addClass('slider__captions__circles__circle_active');
  }

  function changeImgInSlider2(e) {
    clearTimeout(timerSlider);

    var target = e.target;
    var circlenum = $(target).data('circlenum');

    $('.slider__images__image_active').removeClass('slider__images__image_active');
    $('.slider__captions__caption_active').removeClass('slider__captions__caption_active');
    $('.slider__captions__circles__circle_active').removeClass('slider__captions__circles__circle_active');

    $('[data-imgnum=' + circlenum + ']').addClass('slider__images__image_active');
    $('[data-capnum=' + circlenum + ']').addClass('slider__captions__caption_active');
    $('[data-circlenum=' + circlenum + ']').addClass('slider__captions__circles__circle_active');

    timerSlider = setInterval(changeImgInSlider, 5000);
  }

/* -------------------------------- */
  function magnifyImg(e) {
    var target = e.target;

    e.preventDefault();

    $('body').css({'overflow': 'hidden'});
    var href = $(target).closest('a').attr('href');
    var str = ' \
    <div class="fogging"> \
      <img class="large-img" src="' + href + '"> \
      <div class="close"></div> \
    </div> \
    ';
    $('body').append(str);

    $('.large-img').on('load', showGalleryNav);

    function showGalleryNav() {
      $('.close').css({'display': 'inline-block'});
      positionNavElems();
    }
  }

  function positionNavElems() {
    if (!$('.fogging').length) return;

    var largeImg = $('.large-img');
    var close = $('.close');

    var mainElem;

    mainElem = largeImg;

    close.css({'margin-left': mainElem.innerWidth() / 2 - parseInt(close.css('width')) + 'px'});
    close.css({'margin-top': 0 - mainElem.innerHeight() / 2 + 'px'});
  }

  function keyboardHandler(e) {
    var target = e.target;

    if (!$('.fogging').length) return;

    if (e.keyCode == 27) {
      hideAll();
      return;
    }
  }

  function mouseHandler(e) {
    var target = e.target;

    if (!$('.fogging').length) return;

    if ($(target).hasClass('fogging') || $(target).hasClass('close')) {
      hideAll();
      return;
    }
  }

  function hideAll() {
    $('.fogging').remove();
    $('body').css({'overflow': ''});
  }
/* -------------------------------- */
  function animateElements(){
    var currentHeight = $(this).scrollTop() + $(window).height();
    var element;

    $('.slider__images').animate({'bottom': '-' + $(this).scrollTop() / 5 + 'px'}, 10);


    element = $(".whatwedo__header");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('whatwedo__header_animated');
    }

    element = $(".whatwedo__list");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('whatwedo__list_animated');
    }

    element = $(".ourservices__header");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourservices__header_animated');
    }

    element = $(".ourservices__list");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourservices__list_animated');
    }

    element = $(".ourservices__button");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourservices__button_animated');
    }

    element = $(".ourprojects__header");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourprojects__header_animated');
    }

    element = $(".ourprojects__main__left");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourprojects__main__left_animated');
    }

    element = $(".ourprojects__main__right__ac");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourprojects__main__right__ac_animated');
    }

    element = $(".ourteam__header");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourteam__header_animated');
    }

    element = $(".ourteam__team");
    if (currentHeight >=
          $(element).offset().top +
          $(element).height()/2 +
          parseFloat($(element).css('margin-top')) +
          parseFloat($(element).css('border-top')) +
          parseFloat($(element).css('padding-top'))
        )
    {
      $(element).addClass('ourteam__team_animated');
    }
  }
});