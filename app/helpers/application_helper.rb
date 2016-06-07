module ApplicationHelper

	$months=[
		        "Enero",
		        "Febrero",
		        "Marzo",
		        "Abril",
		        "Mayo",
		        "Junio",
		        "Julio",
		        "Agosto",
		        "Septiembre",
		        "Octubre",
		        "Noviembre",
		        "Diciembre"
		      ]

    $type_new_id = Type.where(name: "new").first.id
    $type_update_id = Type.where(name: "update").first.id

	def format_date(f)
		(f.day<10 ? "0" : "")+f.day.to_s+" de "+
		$months[f.month-1]+" "+
		f.year.to_s
	end

	def id_of_type(name)
		return Type.where(name: name).first.id
	end
end
