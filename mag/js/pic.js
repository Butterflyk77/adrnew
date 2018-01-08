
var prod_sel;
var prod_json;
var text_json_list;

get_json();
function get_json(){
	$.ajax({
		type: 'POST',
		url: "server/pic.php",
		dataType: "json",
		data:{
			mod_tab:'show'
		},
		//	id_news user_name title_news pic_news time_news content_news status_news
		success: function(status){
			console.log(JSON.stringify(status));
			prod_json=status;
			var text_json='';
			for(i=0;i<=status.length-1;i++){
			
			text_json += '<div class="row">                                       ';
			text_json += '	<div class="col-sm-4">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" src="'+status[i].pic_src+'">  ';
			text_json += '	<br>                                                ';
			text_json += '	<br>                                                ';
			text_json += '	</div>                                                ';
			i++;
			if ( i>=status.length) { 
			text_json += '</div>                                                  ';
			break; 
			}
			text_json += '	<div class="col-sm-4">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" src="'+status[i].pic_src+'">  ';
			text_json += '	<br>                                                ';
			text_json += '	<br>                                                ';
			text_json += '	</div>                                                ';
			i++;
			if ( i>=status.length) { 
			text_json += '</div>                                                  ';
			break; 
			}
			text_json += '	<div class="col-sm-4 ">                                ';
			text_json += '		<img width="100%" class="sel" onclick="sel(this)" src="'+status[i].pic_src+'">  ';
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
}

/* pic view*/
$("body").on("change", ".upl", function (){
    preview(this);
})

function preview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('.preview').attr('src', e.target.result);
            //$('.preview').attr('width', '100%');
            var KB = format_float(e.total / 1024, 2);
            $('.size').text("檔案大小：" + KB + " KB");
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function format_float(num, pos)
{
    var size = Math.pow(10, pos);
    return Math.round(num * size) / size;
}
/* pic view end*/

$("#add").click(function (){
	var t1,t2,t3;
	t1=$("#add_text").val();
	//alert('t1='+t1+"\nt2="+t2+"\nt3="+t3+"\n");
	var formData = new FormData();
	formData.append('fileToUpload', $('#myFile')[0].files[0]);
	formData.append('mod_tab', 'add');
	formData.append('add_text', t1);
	
	if($('#myFile')[0].files[0]== undefined){
		alert('無照片');
	}else{
		$.ajax({
			type: 'POST',
			url: "server/pic.php",
			data:formData,
			cache: false,
			contentType: false,
			processData: false,
			success: function(status){
				alert(status);
				console.log(status);
				get_json();
			}
		});
	}
});