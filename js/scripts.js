
function handler() {
  function Menu(options) {
    this.elem = options.elem;

    this.elem.onclick = this.onclick.bind(this);
  }

  Menu.prototype.onclick = function(e) {
    this.changeActiveItem(e);
  }

  Menu.prototype.changeActiveItem = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.tagName == 'A' && target.closest('.main-menu')) {
      this.deleteCurrentActiveClass(target);
      this.setNewActiveClass(target);
    };
  }

  Menu.prototype.deleteCurrentActiveClass = function(target) {
    var items = target.closest('.main-menu').querySelectorAll('a');

    for (var i = 0; i < items.length; i++) {
      if (!items[i].classList.contains('active')) continue;
      items[i].classList.remove('active');
      break;
    }
  }

  Menu.prototype.setNewActiveClass = function(target) {
    target.classList.add('active');
  }

  function changeActiveItemOnScroll() {
    var currentItem = defineCurrentItem();
    var str = 'a[href="#' + currentItem.getAttribute('data-item') + '"]';

    menu.deleteCurrentActiveClass(document.querySelector('.main-menu'));
    menu.setNewActiveClass(document.querySelector(str));
  };

  function defineCurrentItem() {
    var menuItems = document.querySelectorAll('.menu-item');
    var currentItem = document.querySelector('.active');

    for (var i = 0; i < menuItems.length; i++) {
      var top = menuItems[i].getBoundingClientRect().top;

      if (top > document.documentElement.clientHeight) {
        continue;
      } else if (top > 0) {
        //alert(menuItems[i].getAttribute('id'));
        currentItem = menuItems[i];
        break;
      } else {
        //alert(menuItems[i].getAttribute('id'));
        currentItem = menuItems[i];
      }
    }

    return currentItem;
  }


  function Form(options) {
    this.elem = options.elem;

    this.elem.onclick = this.onclick.bind(this);
  }

  Form.prototype.onclick = function(e) {
    this.sendForm(e);
  }

  Form.prototype.sendForm = function (e){
    e = e || window.event;
    var target = e.target || e.srcElement; //for IE8

    if (target.getAttribute('name') == 'submit') {
      var formName = document.querySelector('.send-email').getAttribute('name');

      $.ajax(
      {
        url : $(this).attr("action"),
        type: "POST",
        data : $(this).serialize() + "&submit=" + formName,
        success:function(data, textStatus, jqXHR)
          {
            showMsgAfterSending('Спасибо, ваше письмо отправлено');
          },
        error: function(jqXHR, textStatus, errorThrown)
          {
            showMsgAfterSending('К сожалению ваше письмо не удалось отправить. Попробуйте еще раз');
          }
      });
    }
  }

  function showMsgAfterSending (message) {
    var str = '<p>' + message + '</p>';
    document.querySelector('.send-email').insertAdjacentHTML('beforeEnd', str);
  }

  var menu = new Menu({
    elem: document.querySelector('.main-menu')
  });

  var form = new Form({
    elem: document.querySelector('.send-email')
  })

  window.addEventListener('scroll', changeActiveItemOnScroll);
}


document.addEventListener('DOMContentLoaded', handler);