<?php
date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
$servername = "localhost";
$username = "verakore_user";
$password = "0919167710";
$dbname = "verakore_mid";
// Create connection
$conn = new mysqli ( $servername, $username, $password, $dbname );

// Check connection
$conn->set_charset ( 'utf8' );
if ($conn->connect_error) {
	die ( "Connection failed: " . $conn->connect_error );
}
//echo 'ok';
?>