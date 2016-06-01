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

	treatNavigation();
});

	navigate = function (hash){
		location.hash = hash; //#hash
	}
	processNavigate =function() {
	 	 	var  hash = location.hash;
	 	 	switch(hash){
		 	 	case "#news":
		 	 		fillTab("news")
		 	 	break;
		 	 	case "#updates":
		 	 		fillTab("updates")
		 	 	break;
		 	 	default:
		 	 		break;	
	 	 	
	 	 	}
	 	 }
	treatNavigation = function () {
		$(window).bind("hashchange",processNavigate);
	 };

function inflateTabTemplate(template,data){

	template.find(".title").text(data.title);
	template.find(".subtitle").text(data.subtitle);
	template.find(".fecha_c").text(data.fecha_c);
	template.find(".description").text(data.description);
	$(template.find(".post-img")).attr("src",data.img_url);

	return template;
}

function fillTabTemplate(data,name){
	var template = $("#"+name+" .post-container.template");
	$.each(data,function(i,v){
		var nonInflateTemplate = template.clone();
		nonInflateTemplate.removeClass("hidden");
		nonInflateTemplate.removeClass("template");
		var inflateTemplate = inflateTabTemplate(nonInflateTemplate,v);
		$("#"+name).append(inflateTemplate);
	});
	template.remove();
	showTab(name);
}
function fillTab(name) {
	debugger
	 $.ajax({
            type:'GET',
            url: '/posts.json',
            data:{type:name},
            success:function(response){
                console.log("success");
                console.log(response);
               	fillTabTemplate(response,name);
            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
}
function showTab(name){
	$.each($("#tabs-container").children(),function(i,v){
		if ($(v).attr("id")===name) {
			$(v).fadeIn();
		}else{
			$(v).fadeOut();
		}
			
	});
	$.each($(".tab").children(),function(i,v){
		if ($($(v).find("a")).attr("href")==="#"+name) {
			$(v).addClass("active");
		}else{
			$(v).removeClass("active");
		}
			
	});

}
function initTabs(){
	var ws=18;
	$.each($(".tab").children(),function(i,v){
		debugger
		if (i>0) {
			$($(".tab").children()[i]).css("left",ws+"px");
		};
			ws += $(v).width();
	});
	if (window.location.hash) {
		processNavigate();
	}else{
		navigate("news")
	}
}

function getUrlImage(){
	debugger
	var formData = new FormData(document.getElementById("form-post-img"));
	 $.ajax({
            type:'POST',
            url: $("#form-post-img").attr('action'),
            data:formData,
            cache:false,
            contentType: false,
            processData: false,
            success:function(response){
                console.log("success");
                console.log(response);
                var url_image = response.status_code==200 ? response.data.thumb_url:"/photo_store/default.jpg";
                $("#new_post").append("<input type='text' name='post[img_url]' value='"+url_image+"'>");         	
               	$("#new_post").submit();

            },
            error: function(data){
                console.log("error");
                console.log(data);
            }
        });
}



