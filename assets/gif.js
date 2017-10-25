$(document).ready(function(){

	var topics = ["Darjeeling Limited", "The Royal Tenenbaums", "Rushmore", "The Life Aquatic with Steve Zissou ", "Grand Budapest Hotel", "Fantastic Mr.Fox", "Moonrise Kingdom"];

	function initialButtons() {

	$("#button").empty();



		for (var i = 0; i < topics.length; i++) {

			var button = $("<button>");
			button.addClass("btn btn-primary click");
			button.attr("data-name", topics[i]);
			button.text(topics[i]);
			$("#button").append(button);

		
		};

	};

		$("#form").submit(function(event) {
			event.preventDefault();
			var selection = $("#input").val().trim()

			if (selection === "") {
				alert("I saved Latin. What did YOU ever do?(Type something here)")
			}

			else {
			topics.push(selection)
			console.log(topics)

			initialButtons();

		}
		});


		function displayGif() {

	        var gif = $(this).attr("data-name");
	        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=lEE9ixtvQADuyaDtEW3pRzc1ycGKV8Vd&limit=10";

	        $.ajax({
	          url: queryURL,
	          method: "GET"
	        }).done(function(response) {

	        	 console.log(response)

	        	for (var i = 0; i < response.data.length; i++) {

	        		var image = $("<img>")
	        		image.addClass("col-md-6")
	        		image.attr("src", response.data[i].images.fixed_height_still.url)
	        		image.attr("data-still", response.data[i].images.fixed_height_still.url)
	        		image.attr("data-animate", response.data[i].images.fixed_height.url)
	        		image.attr("style", "width:300px; height:300px")
	        		image.attr("data-state", "still")
	        		image.attr("class", "giffy")

	        		var rating = $("<inline>")
	        		rating.html("Rating: <strong>" + response.data[i].rating + "</strong>")

	        		

		        		
	        			$('#gifs').prepend(rating).prepend(image);


	        		}

	$(".giffy").on("click", function() {
	        		 
	        		 var state = $(this).attr("data-state");


	        		 if (state === "still") {



	        $(this).attr("src", $(this).attr("data-animate"))
	        $(this).attr("data-state", "animate")


	       }

	       if (state === "animate") {

	        $(this).attr("src", $(this).attr("data-still"))
	        $(this).attr("data-state", "still")


	       } 
	   });

		                })

	          initialButtons();


	        };
	      


	$(document).on("click", ".click", displayGif);

		initialButtons();

	});