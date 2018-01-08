/*
CKEDITOR.replace( 'editor1');
CKEDITOR.replace( 'editor1_m');
var data = '<p>- Seroquel&reg; 屬於非典型性的抗精神疾病用藥，一般用於精神分裂症之治療。<br />      ';
data+='- 使用劑量一般會由低劑量一天兩次，每次25毫克開始，再往上調整，達到病患最佳的治療劑量為止。<br /> ';
data+='- 常見的副作用有嗜睡、頭暈、焦躁、頭痛、失眠、體重增加、便秘、口乾等。<br />                     ';
data+='- 其他如低血壓、心跳加快、神經緊張、腹痛、肝功能及血脂肪指數上升等亦可能出現。</p>               ';
CKEDITOR.instances['editor1'].setData(data);
*/

var prod_sel;//文章選擇
var prod_json;//文章JSON
var text_json_list;//文章列表
var sel_pic_src;//圖庫照片的src

var prod_jsonlist = [];
get_jsonlist();//取得列表
function get_jsonlist(){
	tt = '';
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		dataType: "json",
		data:{
			mod_tab:'show_list',
			kind:'qa'
		},
		success: function(status){
			prod_jsonlist=status;
			console.log(JSON.stringify(status));
			var text_json_sel='';
			for(i=0;i<=status.length-1;i++){
				tt +='<a href="#" class="list-group-item" data-toggle="modal" data-target="#Modal_prodk" onclick=modalk('+i+')>'+status[i].name+'</a>';
				text_json_sel +='<option value="'+status[i].id+'">'+status[i].name+'</option>';
			}
			$("#s1").html(text_json_sel);
			$("#s2").html(text_json_sel);
			$("#list_prodk").html(tt);
		}
	});
}
var prod_selk;
function modalk(i){
	//alert(i);
	prod_selk = prod_jsonlist[i].id;
	$("#t1_kindm").val(prod_jsonlist[i].name);
}

$("#add_kind").click(function (){
	var t1;
	t1=$("#t1_kind").val();
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'add',
			t1:t1,
			t2:'qa'
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

$("#chgk").click(function (){
	var t1;
	t1=$("#t1_kindm").val();
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'chg',
			id_news:prod_selk,
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
$("#delk").click(function (){
	var t1;
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		data:{
			mod_tab:'del',
			id_news:prod_selk
		},
		success: function(status){
			console.log(status);
			alert(status);
			if(status=="Record deleted successfully"){
				//alert('刪除成功!!');
				location.reload();
			}
		}
	});
	
});

get_json();//取得列表
function get_json(){
text_json_list = '<li class="list-group-item">無資料<span class="badge">0</span></li>';
$.ajax({
	type: 'POST',
	url: "server/qa.php",
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
		text_json_list +='<a href="#" class="list-group-item" onclick=modal('+i+')>'
					     +a+'.'+status[i].q+'</a>';
		}
		$("#list_prod").html(text_json_list);
	}
});
}

$("#add").click(function (){
	var t1;
	//var t2 = CKEDITOR.instances.editor1.getData();
	t1=$("#t1").val();
	t2=$("#editor1").val();
	//alert('t1='+t1+"\nt2="+t2);
	$.ajax({
		type: 'POST',
		url: "server/qa.php",
		data:{
			mod_tab:'add',
			t1:t1,
			t2:t2
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
		url: "server/qa.php",
		data:{
			mod_tab:'del',
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

$("#tablechg").hide();
function modal(i){
	//alert(i);
	prod_sel = prod_json[i].id;
	$("#t1_m").val(prod_json[i].q);
	$("#editor1_m").val(prod_json[i].a);
	$("#s2").val(prod_json[i].sel);
	//CKEDITOR.instances['editor1_m'].setData(prod_json[i].a);
	$("#tablechg").click();
}

$("#chg").click(function (){
	var t1;
	t1=$("#t1_m").val();
	t2=$("#editor1_m").val();
	s1=$("#s2").val();
	//var t2 = CKEDITOR.instances.editor1_m.getData();
	//alert("t1="+t1+"\nt2="+t2);
	$.ajax({
		type: 'POST',
		url: "server/qa.php",
		data:{
			mod_tab:'chg',
			id:prod_sel,
			t1:t1,
			t2:t2,
			s1:s1
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
