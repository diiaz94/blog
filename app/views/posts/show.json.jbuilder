json.set! :post do
	  json.extract! @post, :id, :title, :subtitle, :img_url, :description,:fecha_c,:type ,:slug
	  json.url admin_post_url(@post)
	  json.url_edit edit_admin_post_url(@post)
end
json.set! :previus do
	if @older!=nil
	  json.extract! @older, :id, :title, :subtitle, :img_url, :description,:fecha_c,:type ,:slug
	  json.url admin_post_url(@older)
	  json.url_edit edit_admin_post_url(@older)
	end
end
json.set! :next do
	if @recent!=nil
	  json.extract! @recent, :id, :title, :subtitle, :img_url, :description,:fecha_c,:type ,:slug
	  json.url admin_post_url(@recent)
	  json.url_edit edit_admin_post_url(@recent)
	 end 
end
