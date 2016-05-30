class WelcomeController < ApplicationController
	skip_before_action :require_login,  except: [:admin]

	def index
    if current_user
      if current_user.admin?
        redirect_to admin_path        
      end
    end
	end
  def admin
    render "index", layout: "layout_admin"
  end
  def admin_user
  	@user = User.new
    if !@notUsers
      render "register_user", layout: "layout_login"
    else
      redirect_to root_path
    end
  end

  def create_admin_user
  	@user = User.new(user_params)
   
      roles=Role.where(name: "Admin")
    if roles.length>0
    	@user.role_id =  roles[0].id
    	if @user.save
    	 	 redirect_to login_path
        else
        	render "register_user", layout: "layout_login"
        return
        end
    else
    	redirect_to(:back,alert: "Lo sentimos, no se ha podido crear el usuario Administrador.")
    	#render "register_user", layout: "blank", alert: "Lo sentimos, no se ha podido crear el usuario Administrador."
        return
    end
 

  end


  	private
    
	  # Never trust parameters from the scary internet, only allow the white list through.
	def user_params
	  params.require(:user).permit(:username, :password, :password_confirmation)
	end
end
