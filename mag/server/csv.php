<?php 
//$csv = "Column1,Column2,Column3\nRow1,中文測試";

$data = $_POST['datajson'];
if(empty($data)){
	die('GG');
}
$csv="";
$json = array();
foreach($data as $row) {
    if(empty($json)){
		array_push($json, array_keys($row));
		$csv .=implode(",", str_replace(",", "", $row))."\n";
	}
	if($csv==implode(",", str_replace(",", "", $row))."\n"){
		
	}else{
		$csv .=implode(",", str_replace(",", "", $row))."\n";
		array_push($json, $row); 
	}
}

$csv = mb_convert_encoding($csv , "Big5" , "UTF-8");
$csv_filename='contacts.csv';
$file = fopen("contacts.csv","w");
file_put_contents($csv_filename,$csv);
fclose($file);
//echo 'Successfully converted json to csv file. <a href="' . $csv_filename . '" target="_blank">Click here to open it.</a>';
echo "server/".$csv_filename;
exit;


?>