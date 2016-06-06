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
	    	search_posts(input.val());
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
	 	 	var  hashes = location.hash.split("/");

	 	 	switch(hashes[0]){
		 	 	case "#news":
	 	 			fillTab("news",hashes.length>1 ? hashes[1] : "");
		 	 	break;
		 	 	case "#updates":
	 	 			fillTab("updates",hashes.length>1 ? hashes[1] : "");
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
	template.find(".subtitle").text(firstUpper(data.subtitle));
	template.find(".fecha_c").text(data.fecha_c);
	template.find(".description").html(data.description);
	$(template.find(".post-img")).attr("src",data.img_url);
	$(template.find(".buttons .delete")).attr("href",data.url);
	$(template.find(".buttons .edit")).attr("href",data.url_edit);
	return template;
}

function fillTabTemplate(data,name,title_post){
	var template = $("#"+name+" .post-container.template");
	$.each(data,function(i,v){
		var nonInflateTemplate = template.clone();
		nonInflateTemplate.removeClass("hidden");
		nonInflateTemplate.removeClass("template");
		nonInflateTemplate.attr("id",v.slug)
		var inflateTemplate = inflateTabTemplate(nonInflateTemplate,v);
		$("#"+name).append(inflateTemplate);
	});
	template.remove();
	showTab(name,title_post);
}
function fillTab(name,title_post) {
	 $.ajax({
            type:'GET',
            url: '/posts.json',
            data:{type:name},
            beforeSend: function(){
            	$(".no-results").hide();
            	$(".tab-content:visible").hide();
            	$(".loading-container").fadeIn();
          		$("#tabs-container").addClass("state-loading");
            },
            success:function(response){
                console.log("success");
                console.log(response);
                //$("#tabs-container").removeClass("state-loading");
                if (response.length>0) {
              		fillTabTemplate(response,name,title_post)
               	}else{
               		$(".no-results").fadeIn();
               	}
            },
            error: function(data){
                console.log("error");
                console.log(data);
                alert("Ha ocurrido un error, intente de nuevo");
            },
            complete:function(){
   	            	$(".loading-container").hide();
               		$("#tabs-container").removeClass("state-loading");
            	//$("#tabs-container").removeClass("state-loading");
            }
        });
}
function showTab(name,title_post){
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

setTimeout(function(){
	if (typeof(title_post)!=undefined && $('#'+title_post).length) {
		$(document.body).animate({
    		'scrollTop':   $('#'+title_post).offset().top
		}, 1000);
	};
},500);

}
function initTabs(){
	var ws=18;
	$.each($(".tab").children(),function(i,v){
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

function getUrlImage(model){
	if(model=="post"){
		$('[name="post[description]"]').val($("div.nicEdit-main").html());
	}
	if ($("#file").val().length>0){
		var formData = new FormData(document.getElementById("file-img"));
		 $.ajax({
	            type:'POST',
	            url: $("#file-img").attr('action'),
	            data:formData,
	            cache:false,
	            contentType: false,
	            processData: false,
	            success:function(response){
	                console.log("success");
	                console.log(response);
	                var url_image = response.status_code==200 ? response.data.thumb_url:"/photo_store/default.jpg";
	                $(".form-with-img").append("<input type='text' name='"+model+"[img_url]' value='"+url_image+"'>");         	
	               	$(".form-with-img").submit();

	            },
	            error: function(data){
	                console.log("error");
	                console.log(data);
			        $(".form-with-img").append("<input type='text' name='"+model+"[img_url]' value='/photo_store/default.jpg'>");         	
					$(".form-with-img").submit();
	            }
	        });
	}else{
        $(".form-with-img").append("<input type='text' name='"+model+"[img_url]' value='/photo_store/default.jpg'>");         	
		$(".form-with-img").submit();
	}
}



function showLoader(){
	$("#tabs-container").addClass("state-loading");
}



function firstUpper(value){
	if (typeof(value)!=undefined && value.length>0) {
		return value.substring(0,1).toUpperCase()+value.substring(1).toLowerCase();
	}else{
		return value;
	}
}


function inflateSearchResult(data){
	$(".searching-result").html("");
	$.each(data,function(i,v){
		$(".searching-result").append(
			"<div class='row-result'>"+
			"<a href='#"+v.type.name+"s/"+v.slug+"'>"+
			"<p>"+
			"<span class='searching-title text-searched'>"+firstUpper(v.title)+"</span><br>"+
			"<span class='searching-subtitle text-searched'>"+firstUpper(v.subtitle)+"</span>"+
			"</p>"+
			"</a>"+
			"</div>"
			)


	});
}

function search_posts(text){

	var url_search = text.length>0 ? "/search.json":"/posts.json";

	$.ajax({
		type:'GET',
		url: url_search,
		data:{text: text},
		success:function(response){
		    console.log("success");
		    console.log(response);
		    inflateSearchResult(response);
		    marktext();
		},
		error: function(data){
		    console.log("error");
		    console.log(data);
		}
	});
}


function marktext(){

	var textsArr =$(".text-searched");
	
	$.each(textsArr,find_and_mark);
}

var find_and_mark = function (i,element){
		var text = $('#iconified').val();
		var ts=$(element).text();
		var index = find_indexes(ts);
		var result="";
		if(index!=-1){
			result = ts.substring(0,index)+"<b>"+ts.substring(index,index+text.length)+"</b>"+ts.substring(index+text.length)
			$(element).html(result);
		}
	};


function find_indexes(ts){

	var index;
	var text = $('#iconified').val();
	index=ts.indexOf(text);
	if(index!=-1){ 
		return index;
	}else{
		index=ts.indexOf(text.toUpperCase());
		if(index!=-1){
			return index;
		}else{
			index=ts.indexOf(text.toLowerCase());
			if(index!=-1){ 
				return index;
			}else{
				if(ts.length>1){
					index=ts.indexOf(text[0].toUpperCase()+text.substring(1));
					if (index!=-1) {
						return index;	
					}else{
						return -1;
					}
				}else{
					return -1;
				}
				
			}
		}

	}
}



