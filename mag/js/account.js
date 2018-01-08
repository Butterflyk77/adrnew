$("#signin").click(function (){
	var t1,t2;
	t1=$("#inputEmail").val();
	t2=$("#inputPassword").val();
	//alert("t1="+t1+"\nt2="+t2);
	$.ajax({
		type: 'POST',
		url: "server/account.php",
		data:{
			mod_tab:'login',
			t1:t1,
			t2:t2
		},
		success: function(status){
			//alert(JSON.stringify(status));
			alert(status);
			location.reload();
		}
	});
	
});
$("#panelmag").hide();
log();
function log(){
//$("#login_iu2").hide();

var menu_html='';
	$.ajax({
		type: 'POST',
		url: "server/account.php",
		dataType: "json",
		data:{
			mod_tab:'login_status',
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status==0){
				var urlk;
				urlk = location.href.split("/").slice(-1);
				//console.log(urlk);
				if(urlk[0] !== 'index.html'){
					alert('請登入');
					location.assign("index.html");
				}
			}else{
				$("#panellogin").hide();
				$("#panelmag").show();
			}
		}
	});
}

$("#chgacc").click(function (){
	var t1,t2;
	t1=$("#pwd1").val();
	t2=$("#pwd2").val();
	$.ajax({
		type: 'POST',
		url: "server/account.php",
		data:{
			mod_tab:'chg',
			t1:t1,
			t2:t2
		},
		success: function(status){
			console.log(status);
			if(status=="修改成功"){
				alert("修改成功");
				location.reload();
			}else{
				
				alert(status);
			}
			
		}
	});
});

function logout(){
	$.ajax({
		type: 'POST',
		url: "server/account.php",
		data:{
			mod_tab:'logout',
		},
		success: function(status){
			//alert(JSON.stringify(status));
			//alert(status.user_name);
			alert(status);
			location.reload();
		}
	});
};

function enter(e){
	if(e.keyCode==13){
		$("#signin").click();
	}
}