var prod_sel;
var prod_json;
get_json();
function get_json(){
	
$.ajax({
	type: 'POST',
	url: "server/mail.php",
	dataType: "json",
	data:{
		mod_tab:'show_list'
	},
	success: function(status){
		console.log(JSON.stringify(status));
		prod_json=status;
		var mail_list='';
		for(i=0;i<=status.length-1;i++){
		mail_list +='<a class="list-group-item" onclick="modal('+i+')">'+status[i].name+' <span class="badge">'+status[i].post_time+'</span></a> ';
		}
		$("#mail_list").html(mail_list);
	}
});
}

function modal(i){
	//alert(i);
	$("#t0").text(prod_json[i].post_time);
	$("#t1").text(prod_json[i].name);
	$("#t2").text(prod_json[i].email);
	$("#t3").text(prod_json[i].phone);
	$("#t4").text(prod_json[i].msg);
	$("#mail_info").click();
}

var user_json;
get_userjson();//取得列表
$("#mail_info").hide();
function get_userjson(){
	user_list = '<li class="list-group-item">無資料<span class="badge">0</span></li>';
$.ajax({
	type: 'POST',
	url: "server/mail.php",
	dataType: "json",
	data:{
		mod_tab:'user_list'
	},
	success: function(status){
		user_json=status;
		console.log(JSON.stringify(status));
		var user_list='';
		for(i=0;i<=status.length-1;i++){
		var a;
		a=i+1;
		user_list +='<a href="#" class="list-group-item" data-toggle="modal" data-target="#Modal_user" onclick=modaluser('+i+')>'
					     +a+'.'+status[i].name+':'+status[i].mail+'</a>';
		}
		$("#user_list").html(user_list);
	}
});
}
function modaluser(i){
	//alert(i);
	prod_sel = user_json[i].id;
	$("#t1_m").val(user_json[i].name);
	$("#t2_m").val(user_json[i].mail);
}

$("#add").click(function (){
	var t1,t2;
	t1=$("#u1").val();
	t2=$("#u2").val();
	$.ajax({
		type: 'POST',
		url: "server/mail.php",
		data:{
			mod_tab:'user_add',
			t1:t1,
			t2:t2
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status=="New record created successfully"){
				alert('新增成功!!');
				location.reload();
			}else{
				alert(status);
			}
		}
	});
});

$("#chg").click(function (){
	var t1,t2;
	t1=$("#t1_m").val();
	t2=$("#t2_m").val();
	//alert('t1='+t1+"\nt2="+t2+"\nid="+prod_sel);
	
	$.ajax({
		type: 'POST',
		url: "server/mail.php",
		data:{
			mod_tab:'user_chg',
			id:prod_sel,
			t1:t1,
			t2:t2
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status=="Record updated successfully"){
				alert('修改成功!!');
				location.reload();
			}
		}
	});
});

$("#del").click(function (){
	$.ajax({
		type: 'POST',
		url: "server/mail.php",
		data:{
			mod_tab:'user_del',
			id:prod_sel
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status=="Record deleted successfully"){
				alert('刪除成功!!');
				location.reload();
			}
		}
	});
});