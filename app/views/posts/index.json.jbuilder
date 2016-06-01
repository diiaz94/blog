json.array!(@posts) do |post|
  json.extract! post, :id, :title, :subtitle, :img_url, :description,:fecha_c,:type_id
  json.url post_url(post, format: :json)
end
