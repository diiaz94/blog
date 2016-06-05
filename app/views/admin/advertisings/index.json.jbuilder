json.array!(@advertisings) do |advertising|
  json.extract! advertising, :id, :img_url, :link_url
  json.url advertising_url(advertising, format: :json)
end
