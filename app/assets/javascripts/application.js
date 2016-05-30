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


function saveimg(){
	var img = $(".img-post").attr("src");
	$.ajax({
		method: "POST",
		url: "http://uploads.im/api",
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