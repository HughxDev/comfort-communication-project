<?php
// require 'PHPMailerAutoload.php';
require 'vendor/autoload.php';

setlocale( LC_ALL, "en_US.UTF-8" );

$entityBody = file_get_contents( 'php://input' );

if ( !empty( $entityBody ) ) {
  $files = split( "\n---pretest/posttest separator---\n", $entityBody );

  $mail = new PHPMailer;

  //$mail->SMTPDebug = 3;                               // Enable verbose debug output

  // $mail->isSMTP();                                      // Set mailer to use SMTP
  // $mail->Host = 'smtp1.example.com;smtp2.example.com';  // Specify main and backup SMTP servers
  // $mail->SMTPAuth = true;                               // Enable SMTP authentication
  // $mail->Username = 'user@example.com';                 // SMTP username
  // $mail->Password = 'secret';                           // SMTP password
  // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  // $mail->Port = 587;                                    // TCP port to connect to

  $mail->setFrom('noreply@communicatecomfort.com', 'Family Caregiver Bot');

  // if ( strpos( $_SERVER[ 'SERVER_NAME' ], 'hughguiney.com' ) !== false ) {
    $mail->addAddress('hugh@hughguiney.com', 'Hugh Guiney');     // Add a recipient
  // } else {
    // $mail->addAddress('communicatecomfort@gmail.com');               // Name is optional
  // }
  // $mail->addReplyTo('info@example.com', 'Information');
  // $mail->addCC('cc@example.com');
  // $mail->addBCC('bcc@example.com');

  // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  $mail->addStringAttachment( $files[0], 'pretest.csv' );
  $mail->addStringAttachment( $files[1], 'posttest.csv' );
  $mail->isHTML(false);                                    // Set email format to HTML

  $mail->Subject = 'Module Completed';
  // $mail->Body    = 'This is the HTML message body <b>in bold!</b>';
  $mail->Body = "IP address: " . $_SERVER[ 'REMOTE_ADDR' ] . $files[2];
  // $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
  $mail->CharSet = 'UTF-8';

  if( !$mail->send() ) {
      header( 'HTTP/1.1 500 Internal Server Error' );
      // header( 'HTTP/1.1 400 Bad Request' );

      echo 'Message could not be sent.';
      echo 'Mailer Error: ' . $mail->ErrorInfo;
  } else {
      echo 'Message has been sent';
      echo $entityBody;
  }
} else {
  header( 'HTTP/1.1 400 Bad Request' );
  echo 'Message is empty';
}