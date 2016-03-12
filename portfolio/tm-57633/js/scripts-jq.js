// $(document).ready(function(){

// /*---- CALL FUNCTIONS ----*/
//   function imageLoaded() {
//     counter--; // уменьшаем значение счетчика
//     if( counter === 0 ) {
//       var headerHeight = $('.header_slider_picture_active').height();
//       $('.header').css({'height': headerHeight});
//     }
//   }

//   var images = $('.header_slider_picture_active'); // выбираем все изображения на странице
//   var counter = images.length; // количество изображений на странице

//   images.each(function() {
//     if( this.complete ) {
//       imageLoaded.call( this );
//     } else {
//       $(this).one('load', imageLoaded);
//     }
//   });

//   //setHeaderHeight();

//   var PIC_NUMBER = 3;
//   var currentPic = 1;
//   $('.header_slidernav_left-arrow').on('click', showPrevPic);
//   $('.header_slidernav_right-arrow').on('click', showNextPic);

//   $(window).on('resize', setHeaderHeight);
//   //  $('.header_slider_picture_active').on('load', setHeaderHeight);
// /*---- END CALL FUNCTIONS ----*/

// /*---- FUNCTIONS ----*/
//   function showPrevPic() {
//     $('[data-picnum=' + currentPic + ']').fadeOut(1000);
//     $('[data-capnum=' + currentPic + ']').fadeOut(1000);

//     currentPic--;
//     if (currentPic == 0) {currentPic = 3};

//     $('[data-picnum=' + currentPic + ']').fadeIn(1000);
//     $('[data-capnum=' + currentPic + ']').fadeIn(1000);
//   }

//   function showNextPic() {
//     $('[data-picnum=' + currentPic + ']').fadeOut(1000);
//     $('[data-capnum=' + currentPic + ']').fadeOut(1000);

//     currentPic++;
//     if (currentPic == 4) {currentPic = 1};

//     $('[data-picnum=' + currentPic + ']').fadeIn(1000);
//     $('[data-capnum=' + currentPic + ']').fadeIn(1000);
//   }

//   function setHeaderHeight() {
//     var headerHeight = $('.header_slider_picture_active').height();
//     $('.header').css({'height': headerHeight});
//   }
// /*---- END FUNCTIONS ----*/

// });

$(document).ready(function(){

  function Slideshow(options) {
    this._BANNER_NUM = 3;

    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  Slideshow.prototype.onclick = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement; //for IE8

    if ($(target).hasClass('arrow-left')) {
      this.showPrevBanner(e);
      return;
    }

    if ($(target).hasClass('arrow-right')) {
      this.showNextBanner(e);
      return;
    }
  }

  Slideshow.prototype.showPrevBanner = function() {
    var bannum = $('.banner_active').data('bannum');

    this._removeActiveClass();

    bannum--;
    if (bannum < 1) bannum = this._BANNER_NUM;

    this._addActiveClass(bannum);
  }

  Slideshow.prototype.showNextBanner = function() {
    var bannum = $('.banner_active').data('bannum');

    this._removeActiveClass();

    bannum++;
    if (bannum > this._BANNER_NUM) bannum = 1;

    this._addActiveClass(bannum);
  }

  Slideshow.prototype._removeActiveClass = function() {
    $('.banner_active').removeClass('banner_active');
    $('.caption_active').removeClass('caption_active');
    $('.switch_active').removeClass('switch_active');
  }

  Slideshow.prototype._addActiveClass = function(num) {
    $('[data-bannum=' + num + ']').addClass('banner_active');
    $('[data-capnum=' + num + ']').addClass('caption_active');
    $('[data-swnum=' + num + ']').addClass('switch_active');
  }

  var slideshow = new Slideshow({
    elem: $('.slideshow')[0]
  });


  getSizes();

  $('.banner').on('load', getBannerHeight);

  $(window).on('resize', getSizes);


  function getSizes() {
    getBannerHeight();
    getCaptionHeight();
    getArrowsHeight();
  }

  function getBannerHeight() {
    $('.slideshow').css({'height': $('.banner').height()});
    $('.header').css({'height': $('.banner').height()});

  }

  function getCaptionHeight() {
    $('.caption').css({'margin-top': -$('.caption').height()/2});
  }

  function getArrowsHeight() {
    $('.slideshow_arrows .arrow-left').css({'margin-top': -$('.slideshow_arrows .arrow-left').height()/2});
    $('.slideshow_arrows .arrow-right').css({'margin-top': -$('.slideshow_arrows .arrow-right').height()/2});
  }
});
