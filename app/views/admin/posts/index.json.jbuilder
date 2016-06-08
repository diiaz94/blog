json.set! :posts do
	json.array!(@posts) do |post|
	  json.extract! post, :id, :title, :subtitle, :img_url, :description,:fecha_c,:type ,:slug
	  json.url admin_post_url(post)
	  json.url_edit edit_admin_post_url(post)
	end
end

json.has_more_older @has_more_older
