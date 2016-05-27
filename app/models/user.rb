class User < ActiveRecord::Base
  authenticates_with_sorcery!

validates :username, :presence => {:message => "El campo de nombre de usuario no puede estar vacío"}
validates :username, :uniqueness => {:message => "Ya existe un usuario con este nombre de usuario"}
validates :password, length: {:if => :password_required?, minimum: 8 , message:"El campo contraseña debe contener al menos 8 dígitos"}
validates :password, :presence =>  { :if => :password_required?, :message => "El campo contraseña no puede estar vacío"}
validates :password, :confirmation =>  { :if => :password_required?, :message => "Las contraseñas no coinciden"}
validates :password_confirmation, :presence =>  { :if => :password_required?, :message => "El campo confirmar contraseña no puede estar vacío"}


  def password_required?
    new_record?
  end
end
