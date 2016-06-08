class PostsController < ApplicationController
  skip_before_action :require_login
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    if params[:type]
      if params[:type]=="news"
        puts "Buscando posts tipo new"
        @posts = Post.news.lasts.paginate(page: params[:page],per_page: 5)
        puts "has_more_older::"
        puts Post.news.lasts.paginate(page: params[:page],per_page: 6).size

        puts Post.news.lasts.paginate(page: params[:page],per_page: 5).to_json
        @has_more_older = Post.news.lasts.paginate(page: params[:page],per_page: 6)[5]!=nil
        puts "AQUII" +Post.news.lasts.paginate(page: params[:page],per_page: 6).last.to_json
        puts @has_more_older
      else
        if params[:type]=="updates"
          puts "Buscando posts tipo update"
          @posts = Post.updates.lasts.paginate(page: params[:page],per_page: 5);
          puts "has_more_older::"
          @has_more_older = Post.updates.lasts.paginate(page: params[:page],per_page: 6).last!=nil
          puts @has_more_older
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
