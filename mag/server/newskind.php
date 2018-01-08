<?php
include 'conn.php';//登入

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
    default:
        echo "test";
}

function add(){
	global $conn;
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$ktime=date("Y-m-d H:i:s");
	$t1=$_POST['t1']; //name
	$t2=$_POST['t2']; //kind
	$sqlt="INSERT INTO `news_kind`(`name`,`kind`,`time`) VALUES ('$t1','$t2','$ktime')";
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
		$sqlt="SELECT * FROM `news_kind`";
	}else{
		$sqlt="SELECT * FROM `news_kind` WHERE `id` = '".$_POST['id']."'";
	}
	if(!empty($_POST['kind'])){
		$sqlt="SELECT * FROM `news_kind` WHERE `kind` = '".$_POST['kind']."'";
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
	$id_news=$_POST['id_news']; //html
	if(empty($id_news)){
		die('No id');
	}
	$t1=$_POST['t1']; //title
	$sqlt="UPDATE `news_kind` SET `name`='$t1' WHERE `id` = '$id_news'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record updated successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function del(){
	global $conn;
	$id=$_POST['id_news']; //html
	if(empty($id)){
		die('No id');
	}
	$sqlt="SELECT * FROM `qa` WHERE `sel` = '$id'";
	$result = $conn->query($sqlt);
	if ($result->num_rows > 0) {
		while($row = $result->fetch_assoc()) {
			die('上有發佈消息正在使用這個類別，刪除會導致錯誤。 \n 提示訊息:'.$row['q']);
		}
	} else {
		
	}
	$sqlt = "DELETE FROM `news_kind` WHERE `id`= '$id'";
	if ($conn->query($sqlt) === TRUE) {
		echo "Record deleted successfully";
	} else {
		echo "Error deleting record: " . $conn->error;
	}
}

?>