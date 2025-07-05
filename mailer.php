<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

if (isset($_POST['name']) && isset($_POST['email'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $message = $_POST['message'];
 



    $mail = new PHPMailer();

    //SMTP Settings
    $mail->isSMTP();
    
    $mail->SMTPDebug = 4; // debugging: 1 = errors and messages, 2 = messages only
    $mail->SMTPAuth = true; // authentication enabled
    $mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for Gmail
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587; // or 587
    $mail->Username = "info.abivruthi@gmail.com";
    $mail->Password = 'msxwghsikdrzbiqg';
    //Email Settings
    $mail->isHTML(true);
    $mail->setFrom("info.abivruthi@gmail.com", $name);
    $mail->addAddress("info.abivruthi@gmail.com");
    $mail->Subject = "🚀 Mail_From_website 🌟";
    $mail->Body = 'name: ' . $name . ' <br> email: ' . $email . '  <br> number: ' . $number . '  <br> Message: ' . $message . '<br> service: ' . $service .
    $mail->isHTML(true);
    if ($mail->send()) {
        $status = "success";
        $response = "Email sent";
    } else {
        $status = "failed";
        $response = "Something is wrong: <br><br>" . $mail->ErrorInfo;
    }

    exit(json_encode(array("status" => $status, "response" => $response)));
}
?>