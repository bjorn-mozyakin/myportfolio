
function handler() {
  function Slider(options) {
    this.elem = options.elem;

    this.elem.onclick = this.onclick.bind(this);
  }

  Slider.prototype.onclick = function(e) {
    this.changeImage(e);
  }

  Slider.prototype.changeImage = function(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;

    if (target.classList.contains('switcher')) {

      clearInterval(timer);
      var newNumber = +target.getAttribute('data-number');
      target.classList.add('active');

      var img = target.closest('.slider').children[0]

      var currentSrc = img.getAttribute('src');
      var pos = currentSrc.indexOf('.png') - 1;

      var currentNumber = currentSrc.substr(pos, 1);
      var str = '[data-number="' + currentNumber + '"]';
      document.querySelector(str).classList.remove('active');

      var newSrc = currentSrc.slice(0, pos) + newNumber + currentSrc.slice(pos + 1);
      img.setAttribute('src', newSrc);

      timer = setInterval(slider.carusel, 5000);
    };
  }

  Slider.prototype.carusel = function() {
    var currentImg = document.querySelector('.slider').querySelector('img');
    var currentSrc = currentImg.getAttribute('src');
    var pos = currentSrc.indexOf('.png') - 1;
    var currentNumber = +currentSrc.substr(pos, 1);

    var newNumber = currentNumber + 1;
    if (newNumber > 5) {
      newNumber = 1;
    }

    var newSrc = currentSrc.slice(0, pos) + newNumber + currentSrc.slice(pos + 1);
    currentImg.setAttribute('src', newSrc);

    var strCurrent = '[data-number="' + currentNumber + '"]';
    var strNew = '[data-number="' + newNumber + '"]';
    document.querySelector(strCurrent).classList.remove('active');
    document.querySelector(strNew).classList.add('active');

  }

  var slider = new Slider({
    elem: document.querySelector('.slider')
  });

  var timer = setInterval(slider.carusel, 5000);
}


document.addEventListener('DOMContentLoaded', handler);