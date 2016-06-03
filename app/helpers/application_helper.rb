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
	def format_date(f)
		(f.day<10 ? "0" : "")+f.day.to_s+" de "+
		$months[f.month-1]+" "+
		f.year.to_s
	end
end
