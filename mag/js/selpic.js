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
