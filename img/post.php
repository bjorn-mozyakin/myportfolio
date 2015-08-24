<?php
if($_POST['submit'] == 'send-email') {
  // trim() - убираем все лишние пробелы и переносы строк,
  // htmlspecialchars() - преобразует специальные символы в HTML сущности,
  // будем считать для того,
  // чтобы простейшие попытки взломать наш сайт обломались,
  $name = htmlspecialchars(trim($_POST['name']));
  $email = htmlspecialchars(trim($_POST['email']));
  $text = htmlspecialchars(trim($_POST['message']));

  $message = '
            <p><strong>Имя:</strong> '.$name.'</p>
            <p><strong>Контактный e-mail:<strong> <a href="mailto:'.$email.'">'.$email.'</a></p>
            <p><strong>Текст сообщения:</strong><br />'.$text.'<p>
          ';

  // $to - кому отправляем
  $to = 'rakov.di@gmail.com';
  //$email = array('rakov.di@gmail.com');
  //$to = implode(",", $email);
  // $from - от кого
  $subject='Письмо с сайта crablog.ru';
  //Дополнительные загловки
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

  $headers .= 'From: <info@crablog.ru>' . "\r\n";

  // функция, которая отправляет наше письмо.
  mail($to, $subject, $message, $headers);

  //проверяем отправку
//  if(TRUE === $mail) echo 'Thanks. Ваше сообщение успешно отправлено!';
//  else echo 'Sorry. Произошла ошибка при отправке сообщения.';
  echo 'Ваше письмо успешно отправлено!';
}

?>

