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
	case "show":
       show();
        break;
}
$json = array();

function pic_num(){
	global $conn;
	global $json;
	$json = array();
	$sqlt="SELECT COUNT(`pic_id`) as `all` FROM `pic_upload`";
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
	//echo json_encode( $json );
	//echo $json[0][all];
}

function add(){
	global $conn;
	global $json;
	$FILE=$_FILES["fileToUpload"];
	$ext = end(explode('.', $FILE['name']));
	date_default_timezone_set("Asia/Taipei");//設定時間台灣 會被這個搞死
	$t1=$_POST['add_text'];
	$prod_time=date("Y-m-d H_i_s");
	if(empty($FILE)){// upload file is null
		$prod_src="";
		die('無照片或傳送失敗，請聯絡工程師!!!');
	}else{
		pic_num();
		$pic_num = $json[0][all]+1;
		$prod_src=$pic_num.".".$ext;// name+time 系統辨識用
		upload_pic($prod_src);
		$prod_src="server/upload_img/".$pic_num.".".$ext;// name+time 系統辨識用
	}
	// `pic_id`, `pic_src`, `pic_backtext`, `pic_time`
	$sqlt="INSERT INTO `pic_upload` (`pic_src`, `pic_backtext`, `pic_time`)
						VALUES('$prod_src','$t1','$prod_time')";
	if ($conn->query($sqlt) === TRUE) {
		echo "New record created successfully";
	} else {
		echo "Error: " . $sqlt . "<br>" . $conn->error;
	}
}

function show(){
	global $conn;
	$json = array();
	if(empty($_POST['id'])){
		$sqlt="SELECT * FROM `pic_upload` ORDER BY `pic_upload`.`pic_id` DESC";
	}else{
		$sqlt="SELECT * FROM `pic_upload` WHERE `prod_id` = '".$_POST['id']."'";
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

function upload_pic($file_name){
	$FILE=$_FILES["fileToUpload"];
	$position="upload_img/";
	//檢查有無檔案
	if(empty($FILE)){
		die("無檔案");
	}
	//是否存在
	if (file_exists($position . $FILE["name"])){
		echo "檔案已經存在，請勿重覆上傳相同檔案!!<br>";
	}else{
		if(move_uploaded_file($FILE["tmp_name"],iconv("UTF-8", "big5", $position.$file_name ))) {
		//echo "檔案：". $FILE['name'] . " 上傳成功!";
		echo "上傳成功";
		} else{
		echo "檔案上傳失敗，請再試一次!";
		}
	}
}



?>