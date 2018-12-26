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

                	// runing all results for a line .. this can be time consumuing .. if have 10 person, loop 10 times here
                        // lazy would be good here
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
                	
			     // needs to run all friends and to compare with id off all_results
    				return ""+friends_of_this_person+"";

                }

	},
	error: function(XMLHttpRequest, textStatus, errorThrown) {
	   alert(textStatus, errorThrown);
	},							    
});
