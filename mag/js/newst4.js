
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
			kind:'n4'
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
			t2:'n4'
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
	url: "server/newst.php",
	dataType: "json",
	data:{
		mod_tab:'show_list',
		show:'n4'
	},
	success: function(status){
		prod_json=status;
		console.log(JSON.stringify(status));
		var text_json_list='';
		var demo="";
		for(i=0;i<=status.length-1;i++){
		var a;
		a=i+1;
		demo +='<a href="server/'+status[i].pdf+'">                       ';
		demo +='<div class="col-sm-4">                                    ';
		demo +='	<div class="panel panel-default">                     ';
		demo +='		<div class="panel-body">                          ';
		demo +='		<img class="nn" src="server/'+status[i].pic+'">   ';
		demo +='		<p class="jtt">'+status[i].text.replace(/(?:\\[rn]|[\r\n]+)+/g, "").substring(0,79)+' ';
		demo +='		</div>                                            ';
		demo +='	</div>                                                ';
		demo +='</div>                                                    ';
		demo +='</a>                                                      ';
		
		text_json_list +='<a href="#" class="list-group-item" data-toggle="modal" data-target="#Modal_prod" onclick=modal('+i+')>'
					      +a+'.'+status[i].back
						 +'<span class="badge">'+status[i].time+'</span></a>';
		}
		$("#list_prod").html(text_json_list);
		$("#demo").html(demo);
		//console.log(demo);
	}
});
}

$("#add").click(function (){
	var t1,t2,mod_tab;
	mod_tab="add";
	t1=$("#t1").val();
	t2=$("#t2").val();
	t3=$("#t3").val();
	s1=$("#s1").val();
	//alert('t1='+t1+"\nt2="+t2+"\ns1="+s1);
	var formData = new FormData();
	formData.append('fileToUpload', $('#myFile')[0].files[0]);
	formData.append('fileToUploadpdf', $('#myFilepdf')[0].files[0]);
	formData.append('mod_tab', 'add');
	formData.append('t1', t1);
	formData.append('t2', t2);
	formData.append('t3', t3);
	formData.append('s1', s1);
	formData.append('nn', 'n4');
	//$('#myFile')[0].files[0]== undefined || $('#myFilepdf')[0].files[0]== undefined
	if(false){
		alert('無照片 或 PDF');
	}else{
		
		$.ajax({
			type: 'POST',
			url: "server/newst.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				if(status=="New record created successfully"){
					alert('新增成功!!');
					location.reload();
				}
			}
		});
	}
});

$("#tablechg").hide();
function modal(i){
	//alert(i);
	prod_sel = prod_json[i].id;
	$("#m_time").text(prod_json[i].news_time);
	$("#t1_m").val(prod_json[i].back);
	$("#t2_m").val(prod_json[i].text);
	$("#t3_m").val(prod_json[i].link);
	$("#s2").val(prod_json[i].kind);
	$("#tablechg").click();
	mkpdf = prod_json[i].pdf.split('/');
	$("[for='myFilepdf2']").html("PDF:→<a target='_blank' href='server/"+prod_json[i].pdf+"'>原先版本:"+prod_json[i].pdfname+"</a>←");
	if(prod_json[i].pdf == ""){
		$("[for='myFilepdf2']").html('無PDF');
	}
}

$("#del").click(function (){
	$.ajax({
		type: 'POST',
		url: "server/newst.php",
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

$("#chg").click(function (){
	var t1,t2,mod_tab;
	mod_tab="add";
	t1=$("#t1_m").val();
	t2=$("#t2_m").val();
	t3=$("#t3_m").val();
	s2=$("#s2").val();
	//alert('t1='+t1+"\nt2="+t2+"\nid="+prod_sel);
	var formData = new FormData();
	formData.append('fileToUpload', $('#myFile2')[0].files[0]);
	formData.append('fileToUploadpdf', $('#myFilepdf2')[0].files[0]);
	formData.append('mod_tab', 'chg');
	formData.append('t1', t1);
	formData.append('t2', t2);
	formData.append('t3', t3);
	formData.append('s2', s2);
	formData.append('id', prod_sel);
	
	console.log((formData));
	
	$.ajax({
		type: 'POST',
		url: "server/newst.php",
		data:formData,
		cache: false,
		contentType: false,
		processData: false,
		success: function(status){
			console.log(status);
			if(status=="Record updated successfully"){
				alert("更新成功");
				location.reload();
			}
		}
	});
	
	
});

/*
get_kindjson();//取得列表
function get_kindjson(){
	$.ajax({
		type: 'POST',
		url: "server/newskind.php",
		dataType: "json",
		data:{
			mod_tab:'show_list'
		},
		success: function(status){
			console.log(JSON.stringify(status));
			var kind='';
			for(i=0;i<=status.length-1;i++){
			var a;
			a=i+1;
			kind +='<option value="'+status[i].id+'">'+status[i].name+'</option>';
			}
			$("#s1").html(kind);
			$("#s2").html(kind);
		}
	});
}
*/


/* pic view*/
$("body").on("change", ".upl", function (){
    preview(this);
})

function preview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.preview').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

$("body").on("change", ".upl2", function (){
    preview2(this);
})

function preview2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.preview2').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
