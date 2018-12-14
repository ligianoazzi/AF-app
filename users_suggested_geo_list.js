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
                build_html += "<div class='line head' align='left'> FRIENDS SUGGESTED </div>";                                

                $.each(data, function (key, val) {

                	var all_results = data;

                    build_html += "<div class='line' align='left'> "+val.id+"</div>";
                    build_html += "<div class='line' align='left'> "+val.name+"</div>";
                    build_html += "<div class='line' align='left'> "+val.city+"</div>";

					var friends_line = verify_friends(all_results, val);

                    build_html += "<div class='line' align='left'> "+friends_line+"</div>";



                });                 
                

                $("#receive-result").html(build_html);    



                function verify_friends(all_results, person_line){

                    var friends_of_this_person = "";

                	// rodando todos os resultados para uma linha .. isto pode ser pesado .. se eu tenho 10 pessoas, roda 10x aqui
                    // lazy load seria bom aqui
    				$.each(all_results, function (key, value) {
    					
    					var cada = value.friends.split(',');
    					var registro = person_line;

    				
    					$.each(cada, function (key, value_2) {

	    					value_2 = value_2.replace(']', "");
	    					value_2 = value_2.replace('[', ""); 

                            // NAO COMPARAR ... ORDENAR
                                    var dados_acumula_2;
                                   $.ajax({
                                        url : "http://localhost:9000/vendor/google_maps/get_distance.php?origins="+value.city+"&destinations="+registro.city,
                                      
                                        method : 'GET',
                                        dataType: "html",
                                        contentType: "application/json; charset=utf-8",
                                            success: function(data) {
                                                
                                                var obj = JSON.parse(data);

                                                $.each(obj['rows'], function(i, item) {

                                                    $.each(item, function(i2, item2) {

                                                      $.each(item2, function(i3, item3) {

                                                        //console.log(item3.distance.text);                                                         
                                                     
                                                        var acumula = []; // acumula e depois ordena
                                                        acumula[0] = registro.name;
                                                        acumula[1] = registro.city;
                                                        acumula[2] = item3.distance.text;;

                                                        console.log(acumula[0] +" - "+acumula[1] +" - "+value.name+" "+value.city +" distance:"+acumula[2]);

                                                    
                                                      });

                                                    });

                                                });


                                            }

                                        }); 



                            // PEGAR A DISTANCIA ENTRE A CIDADE DA PESSOA DO LOOP E A DISTANCIA ENTRE ESTA CIDADE E A CIDADE DA PESSOA DO LOOP 2
                            // ADICIONAR NUM ARRAY NOME, CIDADE, DISTANCIA
                            // DEPOIS ORDENAR POR DISTANCIA e sugerir alguma quantidade 



    					}); // each cada

    				}); // each all results
                	
                    // preciso percorrer todos os friends e comparar com o id do all_results
    				return ""+friends_of_this_person+"";




                }
            

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
	   alert(textStatus, errorThrown);
	},							    
});