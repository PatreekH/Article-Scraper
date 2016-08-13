$(document).ready(function(){

	var num = 0;

	var counter = 0;
	var comments = [];

	var url = window.location.origin;

	$.ajax({url: url + '/article', method: 'GET'}).done(function(response){
		update(response);
/*		$(".articleTitle").html(response.title);
		$(".articles").html(response.article);
		for (i = 0; i < response.comments.length; i++){
			num++;
			$(".comments").append("<div>" + num + ". " + response.comments[i] + "</div>");
		}
		$('#submitComment').attr('data-id', response._id);
		comments = response.comments;
		console.log(response);*/
	});

	function update(response){
		comments = response.comments;
		$(".articleTitle").html(response.title);
		$(".articles").html(response.article);
		for (i = 0; i < response.comments.length; i++){
			num++;
			$(".comments").append("<div>" + num + ". " + response.comments[i] + "</div>");
		}
		$('#submitComment').attr('data-id', response._id)
		console.log(response);
	}

	/*$('.start').on('click', function(){*/
	/*});*/

	$('#submitComment').on('click', function(){
		var comment = $('#commentInput').val();
		var thisId = $(this).attr('data-id');
		comments.push(comment);
		$.ajax({

			method: 'POST',

			url: '/newcomment',

			data: {
				comment: comments,
				counter: counter,
				id: thisId
			},
			success: function(response){
				//create one function that makes an API call to get current article
				num = 0;
				for (i = 0; i < response.comments.length; i++){
					num++;
					$(".comments").html("<div>" + num + ". " + response.comments[i] + "</div>" + "<br>");
				}

				console.log(response)
			}

		});
		return false;
	});

	$('.next').on('click', function(){
		counter++;
		$.ajax({

			method: 'POST',

			url: '/article',

			data: {
				counter: counter
			},
			success: function(response){

				/*apiCall(response);*/
				/*comments = [];*/
				comments = response.comments;
				$('#submitComment').attr('data-id', response._id);
				$(".comments").html(response.comments);
				$(".articleTitle").html(response.title);
				$(".articles").html(response.article);
				console.log(response);
			}

		});
	});

	$('.back').on('click', function(){
		if (counter < 0){
			counter = 0;
		} else {
			counter--;
		}
		$.ajax({

			method: 'POST',

			url: url + '/article',

			data: {
				counter: counter
			},
			success: function(response){
				comments = response.comments;
				$('#submitComment').attr('data-id', response._id);
				$(".comments").html(response.comments);
				$(".articleTitle").html(response.title);
				$(".articles").html(response.article);
				console.log(response);
			}

		});
	});

});