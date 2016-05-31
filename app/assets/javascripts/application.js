// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require bootstrap
//= require_tree .

$( document ).ready(function() {

	$('#iconified').on('keyup', function() {
	    var input = $(this);
	    if(input.val().length === 0) {
	        input.addClass('empty');
	    } else {
	        input.removeClass('empty');
	    }
	});



$("#form-post-img").on("submit",function (e){
	e.preventDefault();
	var formData = new FormData(this);
	 $.ajax({
            type:'POST',
            url: $(this).attr('action'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(response){
                console.log("success");
                console.log(response);
                if (response.status_code==200) {
                	url_image = response.data.thumb_url;
					$("#new_post").append(
							"<input type='text' name='post[img_url]' value='"+url_image+"'>"
						)         	
                };
                debugger;
                $("#new_post").submit();
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });


});

	/*$( "body" ).mousemove(function( event ) {
		if(event.pageY<60){
			if ($("nav.nav-desktop").length) {
				$("nav.nav-desktop").fadeIn();
			}
		}else{
			if ($("nav.nav-desktop").length) {
				$("nav.nav-desktop").fadeOut();
			}
		}
	});*/

});

var url_image;
function getUrlImage(){
	$("#form-post-img").submit();
}

function saveimg(){
	var img = new FormData($("#post-img"));
	$.ajax({
		method: "POST",
		url: "http://uploads.im/api",
		processData: false,
    	contentType: false,
		data: {upload: img}
	}).done(
		function(data){
			debugger;
			alert("OK");
	}).error(
		function(data){
			debugger;
			alert("FAIL");
		}
	);
}