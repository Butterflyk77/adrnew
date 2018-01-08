
var prod_sel;//文章選擇
var prod_json;//文章JSON
var text_json_list;//文章列表
var sel_pic_src;//圖庫照片的src
get_json();//取得列表
function get_json(){
	text_json_list = '<li class="list-group-item">無資料<span class="badge">0</span></li>';
$.ajax({
	type: 'POST',
	url: "server/newskind.php",
	dataType: "json",
	data:{
		mod_tab:'show_list'
	},
	success: function(status){
		prod_json=status;
		console.log(JSON.stringify(status));
		var text_json_list='';
		for(i=0;i<=status.length-1;i++){
		var a;
		a=i+1;
		text_json_list +='<a href="#" class="list-group-item" data-toggle="modal" data-target="#Modal_prod" onclick=modal('+i+')>'
					     +a+'.'+status[i].name+'</a>';
		}
		$("#list_prod").html(text_json_list);
	}
});
}

$("#add").click(function (){
	var t1;
	t1=$("#t1").val();
	//alert('t1='+t1+"\nt2="+t2+"\nt3="+t3+"\n");
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'add',
			t1:t1,
		},
		success: function(status){
			console.log(JSON.stringify(status));
			if(status=="New record created successfully"){
				alert('新增成功!!');
				location.reload();
			}
		}
	});
});

$("#del").click(function (){
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'del',
			id_news:prod_sel
		},
		success: function(status){
			alert(status);
			get_json();
		}
	});
});

function modal(i){
	//alert(i);
	prod_sel = prod_json[i].id;
	$("#t1_m").val(prod_json[i].name);
}

$("#chg").click(function (){
	var t1;
	t1=$("#t1_m").val();
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'chg',
			id_news:prod_sel,
			t1:t1
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
