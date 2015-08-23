
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

  var menu = new Menu({
    elem: document.querySelector('.main-menu')
  });

  window.addEventListener('scroll', changeActiveItemOnScroll);
}

document.addEventListener('DOMContentLoaded', handler);