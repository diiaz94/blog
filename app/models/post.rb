class Post < ActiveRecord::Base


 	extend FriendlyId
	friendly_id :cedula, use: :slugged

  FOTOS = File.join Rails.root, 'public','photo_store'

  after_save :guardar_foto


  def photo=(file_data)
     puts "FILE DATASIZE********"+file_data.size.to_s
    if !file_data.blank?
      @file_data = file_data
      @extension = file_data.original_filename.split('.').last.downcase
    end
  end

  def photo_filename
  	File.join FOTOS, "#{cedula}.jpg"
  end
  
  def photo_path
  	"/photo_store/#{cedula}.jpg"
  end
  
  def has_photo?
  	File.exists? photo_filename
  end

  def ruta_photo
  	if has_photo?
  		self.photo_path
  	else
  		"/photo_store/default.jpg"
  	end
  end
  
  private
  def guardar_foto
    if @file_data
      
      FileUtils.mkdir_p FOTOS
      File.open(photo_filename, 'wb') do |f|
        f.write(@file_data.read)
      end
      @file_data = nil
    end
  end
end