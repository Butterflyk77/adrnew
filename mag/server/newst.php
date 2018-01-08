<?php
include 'conn.php';//登入

$mod_tab=$_POST['mod_tab'];
$sqlt="";
//$mod_tab='add';
switch ($mod_tab) {
    case "add":
        add();
        break;
	case "add5":
        add5();
        break;
	case "show_list":
        show_list();
        break;
    case "search":
        search();
        break;
	case "show_list_key":
        show_list_key();
        break;
	case "chg":
        chg();
        break;
	case "chg5":
        chg5();
        break;
	case "del":
        del();
        break;
	case "clickurl":
        clickurl();
        break;
	case "hshow_list":
        hshow_list();
        break;
    default:
        echo "test";
}

function add(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //simp
	$t3=$_POST['t3']; //simp
	$s1=$_POST['s1']; //simp
	$n1=$_POST['nn']; //simp
	$FILE=$_FILES["fileToUpload"];
	$FILEpdf=$_FILES["fileToUploadpdf"];
	$picsrc="upload_img/";
	$pdfsrc="upload_pdf/";
	//檢查有無檔案
	if(empty($FILE)||empty($FILEpdf)){
		//die("無檔案");
	}
	//是否存在
	$tt=date("Y-m-d H:i:s");
	$tt2=date("Y-m-d_H-i-s");
	// $picsrc .=$tt2."-".$FILE["name"];
	$picsrc .=$tt2."-".end(explode(".", $FILE["name"]));
	$pdfsrc .=$tt2.".".end(explode(".", $FILEpdf["name"]));
	//$pdfsrc .=$FILEpdf["name"];
	if (file_exists($picsrc)){
		echo "檔案已經存在，請勿重覆上傳相同檔案a";
	}else{
		move_uploaded_file($FILE["tmp_name"],iconv("UTF-8", "big5", $picsrc));
	}
	if (file_exists($pdfsrc)){
		echo "檔案已經存在，請勿重覆上傳相同檔案b";
	}else{
		move_uploaded_file($FILEpdf["tmp_name"],iconv("UTF-8", "big5", $pdfsrc));
	}
	$pdfname=$FILEpdf["name"];
	$sqlt="INSERT INTO `newst`(`kind`, `back`,`pic`,`text`,`link`, `pdf`, `pdfname`,`time`,`show`) 
						VALUES ('$s1', '$t1','$picsrc','$t2','$t3','$pdfsrc','$pdfname','$tt','$n1')";
	if ($conn->query($sqlt) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function add5(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //simp
	$t3=$_POST['t3']; //simp
	$t4=$_POST['t4']; //simp
	$s1=$_POST['s1']; //simp
	$n1=$_POST['nn']; //simp
	$pic=$_POST['pic']; //simp
	//是否存在
	$tt=date("Y-m-d H:i:s");
	$sqlt="INSERT INTO `newst`(`kind`, `back`,`pic`,`text`, `pdf`, `link`,`time`,`show`) 
						VALUES ('$s1', '$t1','$pic','$t2','$t3','$t4','$tt','$n1')";
	if ($conn->query($sqlt) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function chg5(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$id=$_POST['id']; //id
	if(empty($id)){
		die('No id');
	}
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //text
	$t3=$_POST['t3']; //text
	$t4=$_POST['t4']; //text
	$s1=$_POST['s1']; //text
	$pic=$_POST['pic']; //text
	$tt=date("Y-m-d H:i:s");
	$sqlt="UPDATE `newst` 
		SET `kind`='$s1',
		`back`='$t1',
		`pic`='$pic',
		`text`='$t2',
		`pdf`='$t3',
		`link`='$t4',
		`time`='$tt' 
		WHERE `id`='$id'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function show_list(){
	global $conn;
	$json = array();
	if(!empty($_POST['kind'])){
		$sqlt="SELECT * FROM `newst` WHERE `kind` = '".$_POST['kind']."' ORDER BY `newst`.`id` DESC";
	}else{
		$sqlt="SELECT * FROM `newst` ORDER BY `newst`.`id` DESC";
	}
	
	if(!empty($_POST['limit'])){
		$sqlt="SELECT * FROM `newst` WHERE `kind` = '".$_POST['kind']."' ORDER BY `newst`.`id` DESC LIMIT ".$_POST['limit'];
	}
	
	if(!empty($_POST['kind'])&& $_POST['kind']=="all"){
		$sqlt="SELECT * FROM `newst` ORDER BY `newst`.`id` DESC";
	}
	
	if(!empty($_POST['show'])){
		if(!empty($_POST['id'])){
			$id = $_POST['id'];
			$ifid ="&& `newst`.`id` = '$id'";
		}else{
			$ifid ="";
		}
		$show=$_POST['show'];
		//$sqlt="SELECT * FROM `newst` WHERE `show` = '$show' ORDER BY `newst`.`id` DESC";
		$sqlt="SELECT `newst`.`id`, `newst`.`kind`, `newst`.`back`, `newst`.`pic`,
		`newst`.`text`, `newst`.`pdf`,`newst`.`pdfname`, `newst`.`time`, `newst`.`show`, `newst`.`link` ,`news_kind`.`name`
		FROM `newst` ,`news_kind`
		WHERE `newst`.`kind` = `news_kind`.`id` && `show` = '$show' $ifid
		ORDER BY `newst`.`id` DESC";
	}
	// echo $sqlt;
	$result = $conn->query($sqlt);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			array_push($json, $row); 
		}
	} else {
		echo "0 results";
	}
	echo json_encode( $json );
}


function search(){
	global $conn;
	if(empty($_POST['t1'])){
		die('No Keyword');
	}
	$t1 = $_POST['t1'];
	$json = array();
	$sqlt="SELECT * FROM `newst` WHERE `back` LIKE '%$t1%' OR `text` LIKE '%$t1%' ORDER BY `newst`.`id` DESC";
	$sqlt="SELECT `newst`.`id`, `newst`.`kind`, `newst`.`back`, `newst`.`pic`, 
		`newst`.`text`, `newst`.`pdf`, `newst`.`time`, `newst`.`show`,`news_kind`.`name`
		FROM `newst`
		RIGHT JOIN `news_kind` ON `newst`.`show` = `news_kind`.`kind`

		WHERE (`back` LIKE '%$t1%' OR `text` LIKE '%$t1%') ANd `newst`.`show` != 'n5'
		GROUP BY `newst`.`id`
		ORDER BY `newst`.`id` DESC";
	$result = $conn->query($sqlt);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			//echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
			array_push($json, $row); 
		}
	} else {
		echo "0 results";
	}
	echo json_encode( $json );
}

function show_list_key(){
	global $conn;
	$json = array();
	$t1=$_POST['t1'];
	if($_POST['kind']!=="mid"){
		$sqlt="SELECT * FROM `newst` WHERE `text` LIKE '%".$t1."%' ORDER BY `newst`.`id` DESC";
	}else{
		//$sqlt="SELECT * FROM `newst` WHERE `kind` = '2' ORDER BY `newst`.`id` DESC";
		$sqlt="SELECT * FROM `newst` WHERE `text` LIKE '%".$t1."%' AND `kind` = '2' ORDER BY `newst`.`id` DESC";
	}
	
	$sqlt="SELECT * FROM `newst` WHERE `text` LIKE '%".$t1."%' OR `back` LIKE '%".$t1."%' ORDER BY `newst`.`id` DESC";
	
	$result = $conn->query($sqlt);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			array_push($json, $row); 
		}
	} else {
		echo "0 results";
	}
	echo json_encode( $json );
}

function chg(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	
	$id=$_POST['id']; //id
	if(empty($id)){
		die('No id');
	}
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //text
	$t3=$_POST['t3']; //text
	$s2=$_POST['s2']; //text
	$FILE="";
	$FILEpdf="";
	if(!empty($_FILES["fileToUpload"])){
		$FILE=$_FILES["fileToUpload"];
	}
	if(!empty($_FILES["fileToUploadpdf"])){
		$FILEpdf=$_FILES["fileToUploadpdf"];
	}
	//$FILE=$_FILES["fileToUpload"];
	//$FILEpdf=$_FILES["fileToUploadpdf"];
	$picsrc="upload_img/";
	$pdfsrc="upload_pdf/";
	
	$tt=date("Y-m-d H:i:s");
	$tt2=date("Y-m-d_H-i-s");
	// $picsrc .=$tt2."-".$FILE["name"];
	$picsrc .=$tt2."-".end(explode(".", $FILE["name"]));
	$pdfsrc .=$tt2.".".end(explode(".", $FILEpdf["name"]));
	$pdfname=$FILEpdf["name"];
	//$ .=$FILEpdf["name"];
	$sqlt="UPDATE `newst` 
	SET `kind`='$s2',
	`back`='$t1',
	`text`='$t2',
	`link`='$t3',
	`pdfname`='$pdfname',";
	if(empty($FILE)){
		//echo "使用原始照片";
	}else{
		move_uploaded_file($FILE["tmp_name"],iconv("UTF-8", "big5", $picsrc));
		//echo "已更新圖片";
		$sqlt.="`pic`='$picsrc',";
	}
	if(empty($FILEpdf)){
		//echo "使用原始PDF檔案";
	}else{
		move_uploaded_file($FILEpdf["tmp_name"],iconv("UTF-8", "big5", $pdfsrc));
		//echo "已更新PDF檔案";
		$sqlt.="`pdf`='$pdfsrc',";
	}
	
	$sqlt.="`time`='$tt' 
			WHERE `id`='$id'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
	
}

function del(){
	global $conn;
	$id=$_POST['id']; //id
	if(empty($id)){
		die('No id');
	}
	$sqlt = "DELETE FROM `newst` WHERE `id`= '$id'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record deleted successfully";
	} else {
		echo "Error deleting record: " . $conn->error;
	}
}

function clickurl(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$id_news=$_POST['id_news']; //id
	if(empty($id_news)){
		die('No id');
	}

	$sqlt="UPDATE `news` SET `news_click`=`news_click`+1 WHERE `news_id` = '$id_news'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function hshow_list(){
	global $conn;
	$json = array();
	if(empty($_POST['id'])){
		$sqlt="SELECT `news`.`news_id`,`news`.`news_time`,`news_kind`.`name`,`news`.`news_title`
FROM `news`,`news_kind`
WHERE `news`.`kind` = `news_kind`.`id`";
	}else{
		$sqlt="SELECT * FROM `prodk_sec WHERE `id` = '".$_POST['id']."'";
	}
	$result = $conn->query($sqlt);
	if ($result->num_rows > 0) {
		// output data of each row
		while($row = $result->fetch_assoc()) {
			//echo "id: " . $row["id"]. " - Name: " . $row["firstname"]. " " . $row["lastname"]. "<br>";
			array_push($json, $row); 
		}
	} else {
		echo "0 results";
	}
	echo json_encode( $json );
}
?>