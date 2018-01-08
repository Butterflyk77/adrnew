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
	$prod_time=date("Y-m-d H:i:s");
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //simp
	$t3=$_POST['t3']; //html
	$s1=$_POST['s1']; //sel
	$sqlt="INSERT INTO `news`(`kind`,`news_title`, `news_content`,`news_time`, `news_status`, `simp_con`,`news_click`) 
						VALUES ('$s1','$t1','$t3','$prod_time','1','$t2','0')";
	if ($conn->query($sqlt) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function show_list(){
	global $conn;
	$json = array();
	if(empty($_POST['id'])){
		$sqlt="SELECT * FROM `news`";
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

function chg(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$prod_time=date("Y-m-d H:i:s");
	$id_news=$_POST['id_news']; //id
	if(empty($id_news)){
		die('No id');
	}
	$t1=$_POST['t1']; //title
	$t2=$_POST['t2']; //simp
	$t3=$_POST['t3']; //html
	$s2=$_POST['s2']; //sel
	//id sec_kindid sec_kindsn sec_name sec_count

	$sqlt="UPDATE `news` SET `kind`='$s2',`news_title`='$t1', `news_content`='$t3',`news_time`='$prod_time', `simp_con`='$t2' WHERE `news_id`='$id_news'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function del(){
	global $conn;
	$id_news=$_POST['id_news']; //id
	if(empty($id_news)){
		die('No id');
	}
	$sqlt = "DELETE FROM `news` WHERE `news_id`= '$id_news'";
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