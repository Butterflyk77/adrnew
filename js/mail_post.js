$("#submit").click(function(){
	t1=$("#tname").val();//name
	t2=$("#temail").val();//mail
	t3=$("#tphone").val();//phone
	t4=$("#ttext").val();//msg
	//alert(t1+"\n"+t2+"\n"+t3+"\n"+t4);
	if( (t1!="") && (t2!="")&& (t3!="")&& (t4!="") ){
		$.ajax({
			type: 'POST',
			//url: "mag/server/PHPMailer/mail.php",//google
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
