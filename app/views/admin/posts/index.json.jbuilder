json.array!(@posts) do |post|
  json.extract! post, :id, :title, :subtitle, :img_url, :description
  json.url admin_post_url(post, format: :json)
  json.url admin_edit_post_url(post, format: :json)
end
