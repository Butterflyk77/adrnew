<?php
include 'conn.php';//登入
$mod_sql=$_POST['mod_p'];
$mod_tab=$_POST['mod_tab'];
$sqlt="";
//$mod_tab='add';
switch ($mod_tab) {
    case "add":
        add();
        break;
	case "show_list":
        show_list();
        break;
	case "chg":
        chg();
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
	$t1=$_POST['t1']; //background
	$t2=$_POST['t2']; //logo
	$t3=$_POST['t3']; //logotext
	$tt=date("Y-m-d_H-i-s");
	$sqlt="INSERT INTO `web`(`background`,`logo`,`logotext`,`time`) 
						VALUES ('$t1','$t2','$t3','$tt')";
	if ($conn->query($sqlt) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}


function show_list(){
	global $conn;
	$json = array();
	if($_POST['kind']!=="mid"){
		$sqlt="SELECT * FROM `web` ORDER BY `web`.`id` DESC";
	}else{
		$sqlt="SELECT * FROM `web` WHERE `kind` = '2' ORDER BY `web`.`id` DESC";
	}
	
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
	$prod_time=date("Y-m-d H:i:s");
	$id=$_POST['id']; //id
	if(empty($id)){
		die('No id');
	}
	$t1=$_POST['t1']; //background
	$t11=$_POST['t11']; //backgroundy
	$t2=$_POST['t2']; //logo
	$t3=$_POST['t3']; //logotext
	$tt=date("Y-m-d_H-i-s");
	$sqlt="UPDATE `web` SET 
							`background`='$t1',
							`backgroundy`='$t11',
							`logo` ='$t2',
							`logotext`='$t3',
							`time`='$tt'";
	
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