/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */



// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul .page-scroll a').click(function() {
    $('.navbar-toggle:visible').click();
});

function enter(e){
    if(e.keyCode==13){
        $("#search").click();
    }
}

$("#search").click(function (){
    t1=$("#searcht1").val();
    $.ajax({
        type: 'POST',
        url: "mag/server/newst.php",
        dataType: "json",
        data:{
            mod_tab:'search',
            t1:t1
        },
        success: function(status){
            prod_json=status;
            console.log(JSON.stringify(status));
            var text_json_list='';
            var demo="";
            var tag_style = ["primary","warning","info","success","default"];
            for(i=0;i<=status.length-1;i++){
            
                demo +='<div class="col-xs-6 col-sm-6 col-lg-6">                                                    ';
                demo +='        <div class="panel panel-default thumbnail blog-post">                               ';
                demo +='          <img src="mag/server/'+status[i].pic+'" class="img-responsive" />                 ';
                demo +='          <div class="panel-body caption">                                                  ';
                demo +='            <div class="blog-post-meta">                                                    ';
                demo +='              <span class="label label-light label-'+tag_style[i]+'">'+status[i].name+'</span>      ';
                demo +='              <p class="blog-post-date pull-right">'+status[i].time+'</p>                   ';
                demo +='            </div>                                                                          ';
                demo +='            <div class="blog-post-content">                                                 ';
                demo +='              <a href="informationA.html?id='+status[i].id+'">                              ';
                demo +='                <h2 class="blog-post-title">'+status[i].back+'</h2>                         ';
                demo +='              </a>                                                                          ';
                demo +='              <p class="flex-text">'+status[i].text.replace(/(?:\\[rn]|[\r\n]+)+/g, "").substring(0,79)+'</p>';
                demo +='            </div>                                                                          ';
                demo +='          </div>                                                                            ';
                demo +='              <a class="btn btn-info" href="informationA.html?id='+status[i].id+'">看更多</a>';
                demo +='        </div>                                                                              ';
                demo +='</div>                                                                                      ';
            }
            $("#newdiv").html(demo);
        },error: function(e){
			console.log(e);
			if(e.responseText == "0 results[]"){
				demo = "<h3>查無 "+t1+" 相關資料<h3>";
				$("#newdiv").html(demo);
			}
		}
    });
});
function ccimg(){
    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }
        
    });
    $('.image-popup-fit-width').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });
    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });
}