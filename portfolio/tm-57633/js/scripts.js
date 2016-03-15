$(document).ready(function(){

/* CONSTRUCTORS */

/* BEGIN Constructor Document */
  function Document(options) {
    this.elem = options.elem;
    this.offsetYTopPanel = $('.top-panel').offset().top;
    this.elem.onscroll = this.onscroll.bind(this);
  }

  Document.prototype.onscroll = function(e) {
    if ( $(this.elem).scrollTop() >= this.offsetYTopPanel ) {
      this.attachTopPanel();
      this.showScrollTopButton();
    } else {
      this.detachTopPanel();
      this.hideScrollTopButton();
    }
  }

  Document.prototype.attachTopPanel = function() {
    $('.top-panel').css({
      'position':'fixed',
      'left': '0',
      'top': '0',
      'background': '#000'
    });
  };

  Document.prototype.detachTopPanel = function() {
    $('.top-panel').css({
      'position':'',
      'left': '',
      'top': '',
      'background': ''
    });
  };

  Document.prototype.showScrollTopButton = function() {
    $('.scroll-top-button').fadeIn(500);
  };

  Document.prototype.hideScrollTopButton = function() {
    $('.scroll-top-button').fadeOut(500);
  };
/* END Constructor Document */

/* BEGIN Constructor ScrollTopButton */
  function ScrollTopButton(options) {
    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  ScrollTopButton.prototype.onclick = function(e) {
    $('html, body').animate({
      'scrollTop': 0
    }, 500)
  }
/* END Constructor ScrollTopButton */

/* BEGIN Constructor Menu*/
  function Menu(options) {
    this.elem = options.elem;
    this.timerSubMenu = this.timerSubSubmenu = null;
    this.elem.onmouseover = this.onmouseover.bind(this);
    this.elem.onmouseout = this.onmouseout.bind(this);

  }

  Menu.prototype.onmouseover = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement; //for IE8

    if (!$(target).closest('.nav_menu_item_has-submenu')[0]) return;

    if ($(target).hasClass('nav_menu_item_link') || $(target).closest('.nav_menu_item_submenu')[0]) {
      clearTimeout(this.timerSubMenu);
      this.showSubMenu( $('.nav_menu_item_submenu') );
    }

    if (!$(target).closest('.nav_menu_item_submenu_subitem_has-submenu')[0]) return;

    if ($(target).hasClass('nav_menu_item_submenu_subitem_link') || $(target).closest('.nav_menu_item_submenu_subitem_subsubmenu')[0]) {
      clearTimeout(this.timerSubSubMenu);
      this.showSubMenu( $('.nav_menu_item_submenu_subitem_subsubmenu') );
    }
    // this.timer = setTimeout(function() {
    // }, 1000);
  }

  Menu.prototype.showSubMenu = function(menu) {
    //$('.nav_menu_item_submenu').css({'display':'block'});
    $(menu).slideDown(500);
  }

  Menu.prototype.onmouseout = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement; //for IE8

    if (!$(target).closest('.nav_menu_item_has-submenu')[0]) return;

    if ($(target).hasClass('nav_menu_item_link') || $(target).closest('.nav_menu_item_submenu')[0]) {
      var self = this;
      this.timerSubMenu = setTimeout(function() {
        self.hideSubMenu( $('.nav_menu_item_submenu') );
      }, 1000);
    }

    if (!$(target).closest('.nav_menu_item_submenu_subitem_has-submenu')[0]) return;

    if ($(target).hasClass('nav_menu_item_submenu_subitem_link') || $(target).closest('.nav_menu_item_submenu_subitem_subsubmenu')[0]) {
      var self = this;
      this.timerSubSubMenu = setTimeout(function() {
        self.hideSubMenu( $('.nav_menu_item_submenu_subitem_subsubmenu') );
      }, 1000);
    }
  }

  Menu.prototype.hideSubMenu = function(menu) {
    $(menu).slideUp(500);
  }
/* END Constructor Menu*/

/* BEGIN Constructor Slideshow*/
  function Slideshow(options) {
    this._BANNER_NUM = 3;

    this.elem = options.elem;
    this.elem.onclick = this.onclick.bind(this);
  }

  Slideshow.prototype.onclick = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement; //for IE8

    if ($(target).hasClass('arrow-left')) {
      this.showPrevBanner();
      return;
    }

    if ($(target).hasClass('arrow-right')) {
      this.showNextBanner();
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
/* END Constructor Slideshow*/


  var mainDocument = new Document({
    elem: $(document)[0]
  });

  var mainMenu = new Menu({
    elem: $('.nav_menu')[0]
  });


  var scrollTopButton = new ScrollTopButton({
    elem: $('.scroll-top-button')[0]
  });

  var slideshow = new Slideshow({
    elem: $('.slideshow')[0]
  });

  getSizes();
  $('.banner').on('load', getBannerHeight);
  $(window).on('resize', getSizes);




/* ADDITIONAL FUNCTIONS */
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
