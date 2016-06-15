class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :require_login 


	require "rubygems"
	require "net/https"
	require "uri"
	require "json"

	def getCurrentTime
	  begin
	    puts "Begin******"

	    uri = URI.parse("http://api.timezonedb.com/?zone=America/Dominica&format=json&key=ZKLS5YG2UNIH")
	    http = Net::HTTP.new(uri.host, uri.port)
	    request = Net::HTTP::Get.new(uri.request_uri)
	 
	    res = http.request(request)
	    response = JSON.parse(res.body)

	    if(response["status"] and response["status"]=="OK" and response["timestamp"])
	    	puts "OK webservice de tiempo****"
	     	puts DateTime.strptime(response["timestamp"].to_s,'%s').to_formatted_s(:db).to_s 
	     
	     	return DateTime.strptime(response["timestamp"].to_s,'%s').to_formatted_s(:db) 

	    else
	    	puts "Error en respuesta webservice::"
	    return  nil
	    end
	  rescue
	  	puts "Exception en webservice::"
	    return nil
	  end  
	end

  private
	def not_authenticated
	  redirect_to login_path, alert: "Debes iniciar sesión primero"
	end
end
