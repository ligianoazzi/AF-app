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

                	// runing all results for a line .. this can be time consumuing .. if have 10 person, loop 10 times here
                        // lazy would be good here
    				$.each(all_results, function (key, value) {
    					
    					var cada = value.friends.split(',');
    					var registro = person_line;

    				
    					$.each(cada, function (key, value_2) {

	    					value_2 = value_2.replace(']', "");
	    					value_2 = value_2.replace('[', ""); 

                            // DO NOT COMPARE ... order by
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



                             // GET THE DISTANCE BETWEEN THE CITY OF THE PERSON OF THE LOOP AND THE DISTANCE BETWEEN THIS CITY AND THE CITY OF THE PERSON OF THE LOOP 2
                             // ADD NUM ARRAY NAME, CITY, DISTANCE
                             // AFTER ORDER BY DISTANCE and suggest some quantity



    					});

    				}); // each all results
       
			     // needs to run all friends and to compare with id off all_results
			     
    				return ""+friends_of_this_person+"";




                }
            

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
	   alert(textStatus, errorThrown);
	},							    
});
