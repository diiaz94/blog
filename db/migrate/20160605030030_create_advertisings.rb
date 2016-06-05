class CreateAdvertisings < ActiveRecord::Migration
  def change
    create_table :advertisings do |t|
      t.string :img_url
      t.string :link_url

      t.timestamps null: false
    end
  end
end
