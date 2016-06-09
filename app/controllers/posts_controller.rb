class PostsController < ApplicationController
  skip_before_action :require_login
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    if params[:type]
      if params[:type]=="news"
        puts "Buscando posts tipo update"
        @posts = Post.news.lasts.paginate(page: params[:page],per_page: 6)
        @has_more_older = @posts[5]!=nil
        @posts = @posts.limit(5)
      else
        if params[:type]=="updates"
          puts "Buscando posts tipo update"
          @posts = Post.updates.lasts.paginate(page: params[:page],per_page: 6)
          @has_more_older = @posts[5]!=nil
          @posts = @posts.limit(5)
        else
          puts "TODOS LOS TIPOS DE POSTS"
          @posts = Post.lasts.paginate(page: params[:page],per_page:5)
        end  
      end
    else
      if params[:count]
        puts "CANTIDAD ESPECIFICA DE POSTS"
        @posts = Post.lasts.limit(params[:count]);
      else
        @posts = Post.lasts.paginate(page: params[:page],per_page:5)
        puts "TODOS LOS TIPOS DE POSTS"
      end
    end
      puts " TAM DE POSTS::"+ @posts.size.to_s
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    all_posts = @post.type.name=="new" ? Post.news.lasts : Post.updates.lasts
    puts "ALL_POSTS ***"
    puts all_posts.to_json
    puts "ALL_POSTS ***"
    index = all_posts.index(@post)
    puts index.to_s
    @older = index<all_posts.size ? all_posts[index+1] : nil
    @recent = index>0 ? all_posts[index-1] : nil

  end

  def search
    allPosts = params[:type] == "news" ? Post.news : (params[:type]=="updates" ? Post.updates : Post.all)
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
      @post = Post.friendly.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :subtitle, :img_url, :description)
    end
end
