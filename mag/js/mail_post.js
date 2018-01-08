$("#ok").click(function(){
	t1=$("#t1").val();//name
	t2=$("#t2").val();//mail
	t3=$("#t3").val();//phone
	t4=$("#t4").val();//msg
	var msg = 'name='+t1+"\nmail="+t2+"\nphone="+t3+"\nmsg="+t4;
	//alert(msg);
	//console.log(msg);
	if( (t1!="") && (t2!="")&& (t3!="")&& (t4!="") ){
		$.ajax({
			type: 'POST',
			url: "mag/server/PHPMailer/mail2.php",
			data:{
				t1:t1,
				t2:t2,
				t3:t3,
				t4:t4
			},
			success: function(status){
				alert(status);
				if(status!=="訊息送出"){
					
				}else{
				location.reload();
				}
			}
		});
	}else{
		alert("所有欄位都須輸入");
	}
});
