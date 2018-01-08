
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
			kind:'n5'
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
			t2:'n5'
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
		show:'n5'
	},
	success: function(status){
		prod_json=status;
		console.log(JSON.stringify(status));
		var text_json_list='';
		var demo="";
		for(i=0;i<=status.length-1;i++){
		var a;
		a=i+1;
		
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
	t1=$("#t1").val();//title
	t2a= $("#t2a").val();
	t2b= $("#t2b").val();
	t2=t2a+"@@"+t2b;//2prod
	t3=$("#t3").val();//textbox
	t4=$("#t4").val();//textbox
	s1=$("#s1").val();
	pa = $('.previewa').attr('src');
	pb = $('.previewb').attr('src');
	pic =pa+"@@"+pb;
	$.ajax({
		type: 'POST',
		url: "server/newst.php",
		data:{
			mod_tab:'add5',
			nn:'n5',
			t1:t1,
			t2:t2,
			t3:t3,
			t4:t4,
			pic:pic,
			s1:s1
		},
		success: function(status){
			if(status=="New record created successfully"){
				alert('新增成功!!');
				location.reload();
			}
		},error: function(e){
			console.log(e);
		}
	});
});

$("#tablechg").hide();
function modal(i){
	//alert(i);
	prod_sel = prod_json[i].id;
	$("#m_time").text(prod_json[i].news_time);
	$("#t1m").val(prod_json[i].back);
	$("#t2am").val(prod_json[i].text.split("@@")[0]);
	$("#t2bm").val(prod_json[i].text.split("@@")[1]);
	$(".previewam").attr('src',''+prod_json[i].pic.split("@@")[0]);
	$(".previewbm").attr('src',''+prod_json[i].pic.split("@@")[1]);
	$("#s2").val(prod_json[i].kind);
	$("#t3m").val(prod_json[i].pdf);
	$("#tablechg").click();
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
	t1=$("#t1m").val();//title
	t2a= $("#t2am").val();
	t2b= $("#t2bm").val();
	t2=t2a+"@@"+t2b;//2prod
	t3=$("#t3m").val();//textbox
	s1=$("#s2").val();
	pa = $('.previewam').attr('src');
	pb = $('.previewbm').attr('src');
	pic =pa+"@@"+pb;
	$.ajax({
		type: 'POST',
		url: "server/newst.php",
		data:{
			id:prod_sel,
			mod_tab:'chg5',
			t1:t1,
			t2:t2,
			t3:t3,
			pic:pic,
			s1:s1
		},
		success: function(status){
			console.log(status);
			if(status=="Record updated successfully"){
				alert('新增成功!!');
				location.reload();
			}
		},error: function(e){
			console.log(e);
		}
	});
});

/*home pic sel*/
$("body").on("change", ".upla", function (){
    preview(this);
})
function preview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
			console.log(e);
			img=e;
            $('.previewa').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
		var formData = new FormData();
		formData.append('fileToUpload', $('#myFilea')[0].files[0]);
		formData.append('mod_tab', 'addprodpic');
		formData.append('add_text', 'productview');
		formData.append('pickind', 'prod');
		$.ajax({
			type: 'POST',
			url: "server/pic.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				console.log(status);
				img = status;
				$('.previewa').attr('src', 'server/'+img);
			},error :function (e){
				console.log(e);
			}
		});
    }
}
/*chg pic sel*/
$("body").on("change", ".uplb", function (){
    previewm(this);
})
function previewm(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
			console.log(e);
			img=e;
            $('.previewb').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
		var formData = new FormData();
		formData.append('fileToUpload', $('#myFileb')[0].files[0]);
		formData.append('mod_tab', 'addprodpic');
		formData.append('add_text', 'productview');
		formData.append('pickind', 'prod');
		$.ajax({
			type: 'POST',
			url: "server/pic.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				console.log(status);
				img = status;
				$('.previewb').attr('src', 'server/'+img);
			}
		});
    }
}

/*home pic sel*/
$("body").on("change", ".uplam", function (){
    previewma(this);
})
function previewma(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
			console.log(e);
			img=e;
            $('.previewam').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
		var formData = new FormData();
		formData.append('fileToUpload', $('#myFileam')[0].files[0]);
		formData.append('mod_tab', 'addprodpic');
		formData.append('add_text', 'productview');
		formData.append('pickind', 'prod');
		$.ajax({
			type: 'POST',
			url: "server/pic.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				console.log(status);
				img = status;
				$('.previewam').attr('src', 'server/'+img);
			},error :function (e){
				console.log(e);
			}
		});
    }
}
/*chg pic sel*/
$("body").on("change", ".uplbm", function (){
    previewmm(this);
})
function previewmm(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
			console.log(e);
			img=e;
            $('.previewbm').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
		var formData = new FormData();
		formData.append('fileToUpload', $('#myFilebm')[0].files[0]);
		formData.append('mod_tab', 'addprodpic');
		formData.append('add_text', 'productview');
		formData.append('pickind', 'prod');
		$.ajax({
			type: 'POST',
			url: "server/pic.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				console.log(status);
				img = status;
				$('.previewbm').attr('src', 'server/'+img);
			}
		});
    }
}