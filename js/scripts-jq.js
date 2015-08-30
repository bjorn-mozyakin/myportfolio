$(document).ready(function(){

  $(window).on('scroll', changeActiveItemOnScroll);

  $('.send-email').on('submit', sendForm);



  function changeActiveItemOnScroll() {
    var currentItem = defineCurrentItem($('.active'));

    $('.main-menu a').each(function() {
      if (!$(this).hasClass('active')) return true;
      $(this).removeClass('active');
      return false;
    });

    var str = 'a[href="#' + $(currentItem).attr('data-item') + '"]';
    $(str).addClass('active');
  };

  function defineCurrentItem(currentItem) {
    $('.menu-item').each(function (index, elem) {
      var top = elem.getBoundingClientRect().top;

      if (top > $(window).height()) {
        return true;
      } else if (top > 0) {
        currentItem = elem;
        return false;
      } else {
        currentItem = elem;
      }
    });

    return currentItem;
  }


  function sendForm(e) {
    e.preventDefault(); //STOP default action

    if ($(this).attr('name') == 'send-email') {
      var formName = $(this).attr('name');

      $.ajax({
        url: $('.send-email').attr("action"),
        type: "POST",
        data: $('.send-email').serialize() + "&submit=" + formName,
        success: function(data, textStatus, jqXHR)
          {
            $('.send-email').find('input[type=text], input[type=email], textarea').val('');
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
    $('.after-sending').text(message);
  }

});
