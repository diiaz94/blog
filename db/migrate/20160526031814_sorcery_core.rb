class SorceryCore < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username,            :null => false
      t.string :crypted_password
      t.string :salt
      t.belongs_to :role, index: true

      t.timestamps
    end

    add_index :users, :username, unique: true
  end
end