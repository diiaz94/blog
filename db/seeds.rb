# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Role.create(
				[
					{name: "Admin",description: "Administra la aplicacion"}

				]
			)
Type.create(
				[
					{name: "new",description: "Tipo noticia"},
					{name: "update",description: "Tipo update"}
				]
			)
Advertising.create(
				[
					{img_url: "/photo_store/publicidad.png",link_url: "#"}

				]
			)
