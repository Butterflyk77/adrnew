$("#div1").load("mod.html");

log();
function log(){
$("#login_iu2").hide();
var menu_html='';
	$.ajax({
		type: 'POST',
		url: "mag/server/account.php",
		dataType: "json",
		data:{
			mod_tab:'login_status',
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status.status==0 || JSON.stringify(status)==0){
			$(".navbar-nav").prepend('<li><a href="account.html">登入/註冊</a></li>');
			$(".list-group").append('<a class="list-group-item" href="account.html">登入/註冊</a>');	

			}else{
			//var a = $(".navbar-brand").html();
			//$(".navbar-brand").html(a+"~"+status.user_name+'，你好~');
			$(".navbar-nav").prepend('<li><a onclick="logout()"><span class="glyphicon glyphicon-off"></span>登出</a></li>');
			$(".navbar-nav").prepend('<li><a href="account.html"><span class="glyphicon glyphicon-user"></span>'+status.user_name+'你好~</a></li>');
			$(".list-group").append('<a class="list-group-item" href="account.html"><span class="glyphicon glyphicon-user"></span> '+status.user_name+'，你好~</a>');
			$(".list-group").append('<a class="list-group-item" onclick="logout()" href="#"><span class="glyphicon glyphicon-off"></span>登出</a>');
			
			$("#login_iu").hide();
			$("#login_iu2").show();
			
			$("#t1").val(status.user_name);
			$("#t2").val(status.user_mail);
			$("#t3").val(status.phone);
			}
		}
	});
}

function fblogout(status){
	try {
		FB.logout(function(response) {
			
		});
	}
	catch(err) {
		//document.getElementById("demo").innerHTML = err.message;
		alert(err.message);
	}
	alert(status);
	location.reload();
}

function logout(){
	$.ajax({
		type: 'POST',
		url: "mag/server/account.php",
		data:{
			mod_tab:'logout',
		},
		success: function(status){
			//alert(JSON.stringify(status));
			//alert(status.user_name);
			
			fblogout(status);
			//
		}
	});
};
