class PostsController < ApplicationController
  skip_before_action :require_login
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    if params[:type]
      if params[:type]=="news"
        @posts = Post.paginate(page: params[:page],per_page: 5).news.lasts
      else
        if params[:type]=="updates"
          @posts = Post.paginate(page: params[:page],per_page: 5).updates.lasts
        else
          @posts = Post.paginate(page: params[:page],per_page:5).lasts
        end  
      end
    else
      @posts = Post.paginate(page: params[:page],per_page: 5)
      puts "TODOS LOS POSTS"
      puts @posts.to_json
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  def search
    allPosts = Post.all
    text = params["text"].downcase
    puts "********"+text
    @posts = []
    allPosts.each do |post|
      if post.title.downcase.index(text) or            
         post.subtitle.downcase.index(text) or            
         post.description.downcase.index(text)            
        
         @posts.push(post)
      end
    end
    puts "****"+@posts.to_json
    render "index"
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :subtitle, :img_url, :description)
    end
end
