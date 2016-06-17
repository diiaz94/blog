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
var lastHeight;
$( document ).ready(function() {

	$('#iconified').on('keyup', function() {
	    var input = $(this);
	    if(input.val().length === 0) {
	        input.addClass('empty');
	    } else {
	        input.removeClass('empty');
	    }
	    	//search_posts(input.val());
	});

	$(".btn-search").on('click',function(){
		navigate("search/"+$(".input-search").val());
	});
	$(".input-search").on('keypress',function(e) {
  		if(e.which == 13) {
			navigate("search/"+$(".input-search").val());
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
	var textSearched="";
	treatNavigation();
	
	lastHeight = $(".posts-container").height()
	checkForChanges();

});
	function checkForChanges()
	{
		var $element = $(".posts-container");
	    if ($element.height() != lastHeight ){	
	    	if (($(".box-searching > div").height()+$(".link-network").height()+$(".link-advertising").height())<$(".posts-container").height()) {
				$(".box-searching").height($(".posts-container").height()-$(".link-network").height()-$(".link-advertising").height()-15);
	    	
		    }else{
		    	$(".box-searching").height($(".box-searching > div").height())
		    }
	    }

	    setTimeout(checkForChanges, 500);
	}
	navigate = function (hash){
		location.hash = hash; //#hash
	}
	processNavigate =function() {
	 	 	var  hashes = location.hash.split("/");
	 	 	if (hashes.length==1) {
	 	 		navigate(hashes[0]+"/page/1");
	 	 		return;
	 	 	};
	 	 	var page = hashes.length>2 && hashes[1]=="page" ? parseInt(hashes[2]) : 1 
	 	 	switch(hashes[0]){
		 	 	case "#news":
			 	 	if (hashes.length>1){
			 	 		if (hashes[1]=="page") {
				 	 		$(".tbl-news").attr("href",location.hash);
				 	 		$(".content-tab-news").attr("id",location.hash.split("#")[1])
		 	 				fillTab("news",page);
			 	 		}else{
			 	 			findPost(hashes[1]);
			 	 		}
			 	 	}

		 	 	break;
		 	 	case "#updates":
		 	 		if (hashes.length>1){
			 	 		if (hashes[1]=="page") {
				 	 		$(".tbl-updates").attr("href",location.hash);
			 		 		$(".content-tab-updates").attr("id",location.hash.split("#")[1])
		 	 				fillTab("updates",page)
			 	 		}else{
			 	 			findPost(hashes[1]);
			 	 		}
			 	 	}
		 	 	break;
		 	 	case "#search":
			 	 	if (hashes.length>1) {
			 	 		search_posts(hashes[1]);
			 	 		textSearched = hashes[1];
	 	 			}else{

		 	 		}
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
	$(template.find(".title")).attr("href","#"+data.type.name+"s/"+data.slug);
	template.find(".subtitle").text(firstUpper(data.subtitle));
	template.find(".fecha_c").text(data.fecha_c);
	template.find(".description").html(data.description);
	$(template.find(".post-img")).attr("src",data.img_url);
	$(template.find(".buttons .delete")).attr("href",data.url);
	$(template.find(".buttons .edit")).attr("href",data.url_edit);
	return template;
}

function fillTabTemplate(data,name){
	var template = $(".post-container.template");
	//debugger
	$(".content-tab-"+name).html("");
	$.each(data,function(i,v){
		var nonInflateTemplate = template.clone();
		nonInflateTemplate.removeClass("hidden");
		nonInflateTemplate.removeClass("template");
		nonInflateTemplate.attr("id",v.slug)
		var inflateTemplate = inflateTabTemplate(nonInflateTemplate,v);
		$(".content-tab-"+name).append(inflateTemplate);
	});
	//template.remove();
	showTab(name);
}

function updateButtonsPaginate(page,has_more){
var hidden_all_buttons = page==1 && (has_more!=null && !has_more);
var hidden_left_button = (has_more!=null && !has_more);
var hidden_right_button = page==1

$(".buttons-paginate").addClass(hidden_all_buttons? "hidden" : "");
$(".buttons-paginate").removeClass(!hidden_all_buttons? "hidden" : "");

$(".buttons-paginate .paginate-previus").addClass(hidden_left_button? "hidden" : "");
$(".buttons-paginate .paginate-previus").removeClass(!hidden_left_button? "hidden" : "");
$(".buttons-paginate .paginate-previus a").attr("href",!hidden_left_button? location.href.replace(page,page+1) : "");
var text = $(".buttons-paginate .paginate-previus a").text();
$(".buttons-paginate .paginate-previus a").text(text.replace(text.substring(2),"Entradas más antiguas"));

$(".buttons-paginate .paginate-nexts").addClass(hidden_right_button? "hidden" : "");
$(".buttons-paginate .paginate-nexts").removeClass(!hidden_right_button? "hidden" : "");
$(".buttons-paginate .paginate-nexts a").attr("href",!hidden_right_button? location.href.replace(page,page-1) : "");
var text = $(".buttons-paginate .paginate-nexts a").text();
$(".buttons-paginate .paginate-nexts a").text(text.replace(text.substring(0,text.length-2),"Entradas más recientes"));


}


function fillTab(name,page) {
	 $.ajax({
            type:'GET',
            url: '/posts.json',
            data:{type:name,page:page},
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
                if (response.posts.length>0) {
              		fillTabTemplate(response.posts,name);
           			updateButtonsPaginate(page,response.has_more_older);
               	}else{
              		fillTabTemplate([],name);
           			updateButtonsPaginate(page,false);
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
function showTab(name){
	$.each($("#tabs-container").children(),function(i,v){
		if (typeof($(v).attr("id"))!= "undefined" && $(v).attr("id").indexOf(name)!=-1) {
			$(v).fadeIn();
		}else{
			$(v).fadeOut();
		}
			
	});
	$.each($(".tab").children(),function(i,v){
		if ($($(v).find("a")).attr("href").indexOf("#"+name)!=-1) {
			$(v).addClass("active");
		}else{
			$(v).removeClass("active");
		}
			
	});

setTimeout(function(){
	if (typeof(title_post)!="undefined" && $('#'+title_post).length) {
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
		 		beforeSend: function( xhr ) {
				$("#modal-loader").modal({backdrop: 'static', keyboard: false}); 
				},
		        type:'POST',
	            url: $("#file-img").attr('action'),
	            data:formData,
	            cache:false,
	            contentType: false,
	            processData: false,
	            success:function(response){
	                console.log("success");
	                console.log(response);
	                var url_image = response.status_code==200 ? response.data.thumb_url:"/photo_store/default.png";
	                $(".form-with-img").append("<input type='text' name='"+model+"[img_url]' value='"+url_image+"'>");         	
	               	$(".form-with-img").submit();

	            },
	            error: function(data){
	                console.log("error");
	                console.log(data);
			        $(".form-with-img").append("<input type='hidden' name='"+model+"[img_url]' value='/photo_store/default.png'>");         	
					$(".form-with-img").submit();
	            },
	            complete:function(){
	            	$("#modal-loader").modal("hide");
	            }
	        });
	}else{
		if ($("#containerImage").attr("src")=="/photo_store/default.png") {
        	$(".form-with-img").append("<input type='hidden' name='"+model+"[img_url]' value='/photo_store/default.png'>");         	
		}
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
			"<span class='searching-title'>"+v.title+"</span><br>"+
			"<span class='searching-subtitle'>"+v.subtitle+"</span>"+
			"</p>"+
			"</a>"+
			"</div>"
			)


	});
}
function initSearchResult(){
	$.ajax({
		type:'GET',
		url: "/posts.json",
		data:{count: 7},
		success:function(response){
		    console.log("success");
		    console.log(response);
		    inflateSearchResult(response.posts);
		},
		error: function(data){
		    console.log("error");
		    console.log(data);
		}
	});
}
function search_posts(text){

	var url_search = text.length>0 ? "/search.json":"/posts.json";
	var type = $(".tbl-news").closest(".active").length ? "news" : "updates";
	$.ajax({
		type:'GET',
		url: url_search,
		data:{text: text,type:type},
	    beforeSend: function(){
        	$(".no-results").hide();
        	$(".tab-content:visible").hide();
        	$(".loading-container").fadeIn();
      		$("#tabs-container").addClass("state-loading");
        },
		success:function(response){
		    console.log("success");
		    console.log(response);
            if (response.posts.length>0) {
   		    	fillTabTemplate(response.posts,type);
   		    	marktext();
          	}else{
           		$(".no-results").fadeIn();
           	}   		    

   		    $(".buttons-paginate").addClass("hidden");
		    //inflateSearchResult(response);
		    //marktext();
		},
		error: function(data){
		    console.log("error");
		    console.log(data);
		},
		complete:function(){
        	$(".loading-container").hide();
	   		$("#tabs-container").removeClass("state-loading");
			//$("#tabs-container").removeClass("state-loading");
        }
	});
}


function marktext(){

	var textsArr =$(".text-searched");
	
	$.each(textsArr,find_and_mark);
}

var find_and_mark = function (i,element){
		var text = textSearched
		var ts=$(element).text();
		var index = find_indexes(ts);
		var result="";
		if(index!=-1){
			result = ts.substring(0,index)+"<b class='marked'>"+ts.substring(index,index+text.length)+"</b>"+ts.substring(index+text.length)
			$(element).html(result);
		}
	};


function find_indexes(ts){

	var index;
	var text = textSearched;
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




function findPost(title_post){
	$.ajax({
		type:'GET',
		url: "/posts/"+title_post+".json",
		success:function(response){
		    console.log("success");
		    console.log(response);
		    fillTabTemplate([response.post],response.post.type.name+"s");
		    $(".buttons-paginate").addClass("hidden");
		    $(".buttons-paginate .paginate-previus").addClass("hidden");
		    $(".buttons-paginate .paginate-nexts").addClass("hidden");
		    if (typeof(response.previus)!="undefined") {
		    	$(".buttons-paginate").removeClass("hidden");
		    	$(".buttons-paginate .paginate-previus").removeClass("hidden");
				$(".buttons-paginate .paginate-previus a").attr("href",location.href.replace(location.hash,"#"+response.post.type.name+"s/"+response.previus.slug));
				var text = $(".buttons-paginate .paginate-previus a").text();
				$(".buttons-paginate .paginate-previus a").text(text.replace(text.substring(2),response.previus.title));
		    }
		    if (typeof(response.next)!="undefined") {
		    	$(".buttons-paginate").removeClass("hidden");
		    	$(".buttons-paginate .paginate-nexts").removeClass("hidden");
				$(".buttons-paginate .paginate-nexts a").attr("href",location.href.replace(location.hash,"#"+response.post.type.name+"s/"+response.next.slug));
				var text = $(".buttons-paginate .paginate-nexts a").text();
				$(".buttons-paginate .paginate-nexts a").text(text.replace(text.substring(0,text.length-2),response.next.title));

		    }
		    //marktext();
		},
		error: function(data){
		    console.log("error");
		    console.log(data);
		},
		complete:function(){
			
		}
	});
}

