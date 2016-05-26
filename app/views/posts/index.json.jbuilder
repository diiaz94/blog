json.array!(@posts) do |post|
  json.extract! post, :id, :title, :subtitle, :img_url, :description
  json.url post_url(post, format: :json)
end
