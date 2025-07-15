<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once "PHPMailer/PHPMailer.php";
require_once "PHPMailer/SMTP.php";
require_once "PHPMailer/Exception.php";

// Check if it's a contact form submission
if (isset($_POST['name']) && isset($_POST['email']) && !isset($_POST['childName'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $message = $_POST['message'];

    $mail = new PHPMailer();

    //SMTP Settings
    $mail->isSMTP();
    $mail->SMTPDebug = 0; // Set to 0 for production
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->Username = "info.abivruthi@gmail.com";
    $mail->Password = 'msxwghsikdrzbiqg';
    
    //Email Settings
    $mail->isHTML(true);
    $mail->setFrom("info.abivruthi@gmail.com", $name);
    $mail->addAddress("info.abivruthi@gmail.com");
    $mail->Subject = "🚀 Contact Form - Abivruthi Website 🌟";
    $mail->Body = 'Name: ' . $name . ' <br> Email: ' . $email . ' <br> Phone: ' . $number . ' <br> Message: ' . $message;
    
    if ($mail->send()) {
        $status = "success";
        $response = "Email sent successfully!";
    } else {
        $status = "failed";
        $response = "Something went wrong: " . $mail->ErrorInfo;
    }

    exit(json_encode(array("status" => $status, "response" => $response)));
}

// Check if it's an admission form submission
if (isset($_POST['childName']) && isset($_POST['emailAddress'])) {
    $childName = $_POST['childName'];
    $childDOB = $_POST['childDOB'];
    $gradeLevel = $_POST['gradeLevel'];
    $session = $_POST['session'];
    $fatherName = $_POST['fatherName'];
    $motherName = $_POST['motherName'];
    $phoneNumber = $_POST['phoneNumber'];
    $emailAddress = $_POST['emailAddress'];
    $address = $_POST['address'];
    $previousSchool = $_POST['previousSchool'] ?? '';
    $emergencyContact = $_POST['emergencyContact'];
    $specialNeeds = $_POST['specialNeeds'] ?? '';
    $agreeTerms = isset($_POST['agreeTerms']) ? 'Yes' : 'No';

    $mail = new PHPMailer();

    //SMTP Settings
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'tls';
    $mail->Host = 'smtp.gmail.com';
    $mail->Port = 587;
    $mail->Username = "info.abivruthi@gmail.com";
    $mail->Password = 'msxwghsikdrzbiqg';
    
    //Email Settings
    $mail->isHTML(true);
    $mail->setFrom("info.abivruthi@gmail.com", "Abivruthi Kindergarten");
    $mail->addAddress("info.abivruthi@gmail.com");
    $mail->addReplyTo($emailAddress, $fatherName);
    $mail->Subject = "🎓 New Admission Application - " . $childName;
    
    // Create HTML email body
    $mailBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .section { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
            .section h3 { color: #667eea; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
            .field { margin: 10px 0; }
            .label { font-weight: bold; color: #555; }
            .value { color: #333; }
            .footer { background: #333; color: white; padding: 15px; text-align: center; margin-top: 20px; }
        </style>
    </head>
    <body>
        <div class="header">
            <h1>🎓 New Admission Application</h1>
            <p>Abivruthi Kindergarten School</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👶 Child Information</h3>
                <div class="field">
                    <span class="label">Child\'s Full Name:</span>
                    <span class="value">' . htmlspecialchars($childName) . '</span>
                </div>
                <div class="field">
                    <span class="label">Date of Birth:</span>
                    <span class="value">' . htmlspecialchars($childDOB) . '</span>
                </div>
                <div class="field">
                    <span class="label">Grade Level:</span>
                    <span class="value">' . htmlspecialchars($gradeLevel) . '</span>
                </div>
                <div class="field">
                    <span class="label">Preferred Session:</span>
                    <span class="value">' . htmlspecialchars($session) . '</span>
                </div>
            </div>

            <div class="section">
                <h3>👨‍👩‍👧‍👦 Parent Information</h3>
                <div class="field">
                    <span class="label">Father\'s Name:</span>
                    <span class="value">' . htmlspecialchars($fatherName) . '</span>
                </div>
                <div class="field">
                    <span class="label">Mother\'s Name:</span>
                    <span class="value">' . htmlspecialchars($motherName) . '</span>
                </div>
                <div class="field">
                    <span class="label">Phone Number:</span>
                    <span class="value">' . htmlspecialchars($phoneNumber) . '</span>
                </div>
                <div class="field">
                    <span class="label">Email Address:</span>
                    <span class="value">' . htmlspecialchars($emailAddress) . '</span>
                </div>
                <div class="field">
                    <span class="label">Emergency Contact:</span>
                    <span class="value">' . htmlspecialchars($emergencyContact) . '</span>
                </div>
            </div>

            <div class="section">
                <h3>📍 Address & Additional Information</h3>
                <div class="field">
                    <span class="label">Complete Address:</span>
                    <span class="value">' . nl2br(htmlspecialchars($address)) . '</span>
                </div>
                <div class="field">
                    <span class="label">Previous School:</span>
                    <span class="value">' . (empty($previousSchool) ? 'None' : htmlspecialchars($previousSchool)) . '</span>
                </div>
                <div class="field">
                    <span class="label">Special Needs/Medical Conditions:</span>
                    <span class="value">' . (empty($specialNeeds) ? 'None' : nl2br(htmlspecialchars($specialNeeds))) . '</span>
                </div>
                <div class="field">
                    <span class="label">Terms & Conditions Agreed:</span>
                    <span class="value">' . $agreeTerms . '</span>
                </div>
            </div>

            <div class="section">
                <h3>📅 Application Details</h3>
                <div class="field">
                    <span class="label">Application Date:</span>
                    <span class="value">' . date('F j, Y, g:i a') . '</span>
                </div>
                <div class="field">
                    <span class="label">IP Address:</span>
                    <span class="value">' . $_SERVER['REMOTE_ADDR'] . '</span>
                </div>
            </div>
        </div>

        <div class="footer">
            <p>This application was submitted through the Abivruthi Kindergarten website.</p>
            <p>Please contact the family within 24 hours to schedule an interview.</p>
        </div>
    </body>
    </html>';

    $mail->Body = $mailBody;
    
    if ($mail->send()) {
        $status = "success";
        $response = "Admission application submitted successfully! We will contact you within 24 hours.";
    } else {
        $status = "failed";
        $response = "Something went wrong: " . $mail->ErrorInfo;
    }

    exit(json_encode(array("status" => $status, "response" => $response)));
}
?>