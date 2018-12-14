$.ajax({
    url : "http://127.0.0.1:8000/api/person",
    method : 'GET',
    contentType: "application/json; charset=utf-8",


	success: function(data) {

            var items = [];
                var options = '';
                build_html = '';
                build_html += "<div class='line head' align='left'> ID </div>";
                build_html += "<div class='line head' align='left'> NAME </div>";
                build_html += "<div class='line head' align='left'> CITY </div>";                
                build_html += "<div class='line head' align='left'> FRIENDS </div>";                                

                $.each(data, function (key, val) {

                	var all_results = data;

                    build_html += "<div class='line' align='left'> "+val.id+"</div>";
                    build_html += "<div class='line' align='left'> "+val.name+"</div>";
                    build_html += "<div class='line' align='left'> "+val.city+"</div>";

					var friends_line = verify_friends(all_results, val.id);

                    build_html += "<div class='line' align='left'> "+friends_line+"</div>";



                });                 
                

                $("#receive-result").html(build_html);    



                function verify_friends(all_results, id_line){

                    var friends_of_this_person = "";

                	// rodando todos os resultados para uma linha .. isto pode ser pesado .. se eu tenho 10 pessoas, roda 10x aqui
                    // lazy load seria bom aqui
    				$.each(all_results, function (key, value) {
    					
    					var cada = value.friends.split(',');
    					var registro = value.name;

    				
    					$.each(cada, function (key, value_2) {

	    					value_2 = value_2.replace(']', "");
	    					value_2 = value_2.replace('[', ""); 


	    					if ( value_2 == id_line ) {

								friends_of_this_person += '<span class="beside_registers">'+registro+'</span>';

	    					}

    					});

    				});
                	
                    // preciso percorrer todos os friends e comparar com o id do all_results
    				return ""+friends_of_this_person+"";

                }

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
	   alert(textStatus, errorThrown);
	},							    
});