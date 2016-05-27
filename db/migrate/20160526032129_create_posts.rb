class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :subtitle
      t.string :img_url
      t.text :description
      t.string :slug
      t.belongs_to :type
      t.timestamps null: false
    end
    add_index :posts, :title, unique: true

  end
end
