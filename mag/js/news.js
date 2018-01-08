CKEDITOR.replace( 'editor1' );
CKEDITOR.replace( 'editor1_m' );
var prod_sel;//文章選擇
var prod_json;//文章JSON
var text_json_list;//文章列表
var sel_pic_src;//圖庫照片的src
get_json();//取得列表
function get_json(){
	text_json_list = '<li class="list-group-item">無資料<span class="badge">0</span></li>';
$.ajax({
	type: 'POST',
	url: "server/news.php",
	dataType: "json",
	data:{
		mod_tab:'show_list'
	},
	success: function(status){
		prod_json=status;
		console.log(JSON.stringify(status));
		var text_json_list='';
		var demo="";
		for(i=0;i<=status.length-1;i++){
		var a;
		a=i+1;
		demo +='<div align="left" class="news_name">» &nbsp;<a href="news_demo.html?id='+status[i].news_id+'">'+status[i].news_title+'</a></div> ';
		demo +='<div class="news_info">'+status[i].simp_con+'</div>                                                                                  ';
		demo +='<div class="news_date">發佈日期：'+status[i].news_time+'&nbsp;<a href="news.php?id=24"></a></div>                  ';
		
		text_json_list +='<a href="#" class="list-group-item" data-toggle="modal" data-target="#Modal_prod" onclick=modal('+i+')>'
					     +a+'.'+status[i].news_title
						 +'<span class="badge">'+status[i].news_click+'</span></a>';
		}
		$("#list_prod").html(text_json_list);
		$("#demo").html(demo);
	}
});
}

$("#add").click(function (){
	var t1,t2,t3;
	var editorText = CKEDITOR.instances.editor1.getData();
	t1=$("#t1").val();
	t2=$("#t2").val();
	s1=$("#s1").val();
	t3=editorText;
	//alert('t1='+t1+"\nt2="+t2+"\nt3="+t3+"\n"+"s1="+s1);
	
	$.ajax({
		type: 'POST',
		url: "server/news.php",
		data:{
			mod_tab:'add',
			t1:t1,
			t2:t2,
			t3:t3,
			s1:s1
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
$("#tablechg").hide();
function modal(i){
	//alert(i);
	prod_sel = prod_json[i].news_id;
	$("#m_time").text(prod_json[i].news_time);
	$("#t1_m").val(prod_json[i].news_title);
	$("#t2_m").val(prod_json[i].simp_con);
	CKEDITOR.instances['editor1_m'].setData(prod_json[i].news_content);
	$("#s2").val(prod_json[i].kind);
	$("#tablechg").click();
}

$("#del").click(function (){
	$.ajax({
		type: 'POST',
		url: "server/news.php",
		data:{
			mod_tab:'del',
			id_news:prod_sel
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
	var t1,t2,t3;
	var editorText = CKEDITOR.instances.editor1_m.getData();
	t1=$("#t1_m").val();
	t2=$("#t2_m").val();
	s2=$("#s2").val();
	t3=editorText;
	//alert('t1='+t1+"\nt2="+t2+"\nt3="+t3+"\nid="+prod_sel+"\ns2="+s2);
	
	$.ajax({
		type: 'POST',
		url: "server/news.php",
		data:{
			mod_tab:'chg',
			id_news:prod_sel,
			t1:t1,
			t2:t2,
			t3:t3,
			s2:s2
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

get_pic();
function get_pic(){
	$.ajax({
		type: 'POST',
		url: "server/pic.php",
		dataType: "json",
		data:{
			mod_tab:'show'
		},
		//	id_news user_name title_news pic_news time_news content_news status_news
		success: function(status){
			//prod_json=status;
			var text_json='';
			for(i=0;i<=status.length-1;i++){
			text_json += '<div class="row">                                       ';
			text_json += '	<div class="col-xs-4">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" ondblclick="dbclick();" src="'+status[i].pic_src+'">  ';
			text_json += '	<br>                                                ';
			text_json += '	<br>                                                ';
			text_json += '	</div>                                                ';
			i++;
			if ( i>=status.length) { 
			text_json += '</div>                                                  ';
			break; 
			}
			text_json += '	<div class="col-xs-4">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" ondblclick="dbclick();" src="'+status[i].pic_src+'">  ';
			text_json += '	<br>                                                ';
			text_json += '	<br>                                                ';
			text_json += '	</div>                                                ';
			i++;
			if ( i>=status.length) { 
			text_json += '</div>                                                  ';
			break; 
			}
			text_json += '	<div class="col-xs-4 ">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" ondblclick="dbclick();" src="'+status[i].pic_src+'">  ';
			text_json += '	<br>                                                ';
			text_json += '	<br>                                                ';
			text_json += '	</div>                                                ';
			text_json += '	</div>                                                ';
			text_json += '	<br>                                                ';
			}
			//alert(text_json);
			$("#pic_demo").html(text_json);
		}
	});
}

function sel(e){
	$('.sel').attr('width','100%');
	$('.sel').removeClass("selcss")
	$(e).attr('width','110%');
	$(e).addClass("selcss");
	sel_pic_src=$(e).attr('src');
	//alert(sel_pic_src);
}

$("#sel_pic").click(function (){
	switch (pic_chg) {
		case 1://新增的照片
			
			img_str='';
			img_str +='<img src="';
			img_str +=sel_pic_src;
			img_str +='">';
			addpic(img_str);
			break;
		case 2://新增html的照片
			so=CKEDITOR.instances.editor1.getData();
			var img_str='';
			img_str +='<img width="100%" src="';
			img_str +=sel_pic_src;
			img_str +='">';
			//$("#editor").after(img_str); 
			CKEDITOR.instances['editor1'].setData(so+img_str);
			break;
		case 3://修改的照片
			img_str='';
			img_str +='<img src="';
			img_str +=sel_pic_src;
			img_str +='">';
			addchpic(img_str);
			break;
		case 4://修改html的照片
			so=CKEDITOR.instances.editor1_m.getData();
			var img_str='';
			img_str +='<img width="100%" src="';
			img_str +=sel_pic_src;
			img_str +='">';
			//$("#editor").after(img_str); 
			CKEDITOR.instances['editor1_m'].setData(so+img_str);
			break;
		case 5://修改html的照片
			
			break;
	}
});

function dbclick(){
	$("#sel_pic").click();
}

function chg_pic(i){
	//alert(i)
	pic_chg=i;
}

/*圖庫更新 每5秒*/
function timedCount() {
    get_pic();
    t = setTimeout(function(){ timedCount() }, 10000);
}
startCount()
function startCount() {
        timedCount();
}
