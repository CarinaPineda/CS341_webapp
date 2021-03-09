/* Carina Pineda 
March 8 2021*/


/* Making the $(document).ready(function))
External Citation: https://stackoverflow.com/questions/12093192/how-to-create-a-jquery-f
unction-a-new-jquery-method-or-plugin*/
$(document).ready(function(){
    //call function
    $('#OrderButton').click(areyouvegan);
	$("a").click(monthClicked);
	
});
function monthClicked(){
	/* External Citation: how to replace a buttons text with its list item
	https://stackoverflow.com/questions/42685968/how-to-replace-a-buttons
	-text-with-a-list-item-text-using-jquery */
	$(".dropbtn:first-child").html($(this).text());

	//get my data array from the json file 
	$.post("/orders", {month:$(this).text()}, function(data,status){
		var i=0;
		//loops through my data array 
		while(i<3){
			var liID = "list" + i;
			var quantity = data[i].quantity;
			var topping = data[i].topping;
			
			//converts/parses data to the li 
			converted = JSON.stringify(quantity + " " + topping);
			parse = JSON.parse(converted);
			document.getElementById(liID).innerHTML = parse;
			i++;
		}
	});
}
function areyouvegan(){

	//storing the id's in variables 
	var textAreaContents = $("#Notes").val();
	var dropDownQuantity = $("#quantity option:selected").text();
	var dropDownToppings = $('input[name="Flavor"]:checked').val();

		//checking if the word vegan will appear in the notes textbox area 
	  if ( $('#Notes').val().indexOf("Vegan") > -1 || $('#Notes').val().indexOf("vegan") > -1 
	  || $('#Notes').val().indexOf("VEGAN") > -1) {
         alert("The Cheesecake contains dairy!","Vegan?");
     } else {
		//if vegan is not in the box then we will hide the toppings, notes, button, and label
		$("#toppingTable").hide();
		$("#Notes").hide(); 
		$("#OrderButton").hide();
		$('label').hide();
		
		//do another post request 
		$.post("/neworder", {quantity: dropDownQuantity,toppings: dropDownToppings,notes: textAreaContents}, function(data,status){

			//replace my empty labels with its variables and the thank you message 
			$("#ThankyouMessage").replaceWith("<h3> Thank you! Your order has been placed.<br> Order Details: </h3>");
			$("#OrderQuantity").replaceWith("Quantity: 3" + dropDownQuantity + "<br>");
			$("#OrderTopping").replaceWith("Toppings: " + dropDownToppings + "<br>");
			$("#OrderNotes").replaceWith("Notes:<br>" + textAreaContents);
	

		});
	


	
		
	
	}
}


