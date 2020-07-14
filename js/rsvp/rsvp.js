(function ( $ ) {

	'use strict';

	$.fn.ajaxrsvp = function( options ) {
		
		var defaults = {           
            messageWrapper: "#message",
			scrollAfterSubmit : true,			
        }
		
        var settings = $.extend( {},defaults, options );
		
		//GET FORM ID NAME
		var form_id = this.attr("id");
		
		//ON SUBMIT EVENT
		this.submit(function(event){
			
			//PREVENT DEFAULT SUBMIT
			event.preventDefault();				
			
			//GET ALL INPUT ELEMENT
			var ajax_input_element = $(this).find ( ".ajax-input" );
			/*console.log (ajax_input_item.get(0).id);*/
			
			//GET FORM ACTION URL
			var action_url = $(this).attr( 'action' );
			
			//DEFINE ARRAY VARIABLE FOR SAVE ALL INPUT ID
			var all_id = [];
			
			//DEFINE ARRAY VARIABLE FOR SAVE ALL ERR VALIDATION MESSAGE
			var all_err = [];
						
			//DEFINE OBJECT VARIABLE FOR SAVE ALL INPUT VALUE AND DATA-REQUIRED MESSAGE
			var post_data = {};			
			/*var post_data1 = { inputname: $('#inputname').val()};*/
			
						
					
			//LOOPING TO SAVE ALL INPUT VALUE, DATA-REQUIRED MESSAGE, AND ADD/REMOVE HAS-ERROR CLASS
			$.each(ajax_input_element , function(index, element){
				//GET INPUT VALUE
					var this_input_value = $(this).val();
					
					//VALIDATION, SAVE INPUT VALUE OR ERR VALUE, ADD REMOVE HAS-ERROR CLASS			
					if ( this_input_value == null  || this_input_value.length == 0 ) {
						if ($(this).attr("data-required"))
						{
            				$(this).closest("div").addClass("has-error");	
							all_err.push(element.getAttribute("data-required"));
							$(this).closest("div").find('.help-block').html("Atleast write two word please for me please please please!!");				

						}
       		 		}
					else
					{
						$(this).closest("div").removeClass("has-error");
						post_data[element.id] = this_input_value;		
						post_data[element.id + "_label"] = element.getAttribute("data-output-label");	
						$(this).closest("div").find('.help-block').html("");				

					}
			});
			
			
			//SAVE ALL ID TO POST DATA	
			post_data["all_input_id"] = all_id;
			
			//SAVE ALL ERROR REQUIRED TO POST DATA	
			post_data["all_error_required"] = all_err;
			console.log(all_err);
			if(all_err.length>=1)
			{
				return;
			}
			
			//DEBUG POST DATA	
			/*console.log ("json " + JSON.stringify(post_data));*/
			
			//DISABLE SUBMIT BUTTON
			var submit_value = $('input[type="submit"]#submitButton').val();
			$('input[type="submit"]#submitButton').prop('disabled', true);
			$('input[type="submit"]#submitButton').val('SENDING ...');
			
			//START POST ACTION
            $.post(action_url, post_data, function(response){  
			
                //DEFINE OUTPUT MESSAGE VARIABLE
				var output = "";
				
				//IF RESPONSE ERROR
				if(response.type == 'error')
				{
					output = '<div class="bg-danger">'+response.msg+'</div>';
				}
				//ELSE IF NO ERROR
				else
				{
				    output = '<div class="bg-success">'+response.msg+'</div>';
					
					//RESET INPUT VALUE
					$("#" + form_id).find("input[type='text']").val('');
					$("#" + form_id).find("input[type='email']").val('');
					$("#" + form_id).find("textarea").val('');
					$("#" + form_id).find("input[type='radio']").prop("checked", false);
					$("#" + form_id).find($('.ajax-radio .btn')).removeClass('active-icon active');
					$("#" + form_id).find("input[type='checkbox']").attr('checked', false);
					$("#" + form_id).find($('.ajax-checkbox .btn')).removeClass('active-icon active');
					$("#" + form_id).find("select").prop('selectedIndex',0);
					$("#" + form_id).find("select[multiple]").prop('selectedIndex',-1);	
							
				}				
				
				//ENABLE SUBMIT BUTTON
				$('input[type="submit"]#submitButton').prop('disabled', false);
				$('input[type="submit"]#submitButton').val(submit_value);		
					
				//OUTPUT MESSAGE
				$(settings.messageWrapper).hide().html(output).slideDown();
				
				if (settings.scrollAfterSubmit){
					$('html, body').animate({
        				scrollTop: $(settings.messageWrapper).offset().top - 200
    				}, 1000);	
				}
				
            }, 'json');
		});
		
		
		
		
		
   	 	/*return this.each(function(){
		});*/
	};

}( jQuery ));