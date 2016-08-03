$(document).ready(function(){

	var counter = 0;
	var comments = [];

	var url = window.location.origin;

	$.ajax({url: url + '/article', method: 'GET'}).done(function(response){
		$(".articleTitle").html(response.title);
		$(".articles").html(response.article);
		$(".comments").html(response.comments)
		console.log(response);
	});

	$('#submitComment').on('click', function(){
		var comment = $('#commentInput').val();
		var thisId = $(this).attr('data-id');
		comments.push(comment);
		$.ajax({

			method: 'POST',

			url: url + '/newcomment',

			data: {
				comment: comments,
				counter: counter,
				id: thisId
			},
			success: function(response){
				$(".comments").html(response.comments);
			}

		});
		return false;
	});

	$('.next').on('click', function(){
		counter++;
		$.ajax({

			method: 'POST',

			url: url + '/article',

			data: {
				counter: counter
			},
			success: function(response){
				$(".articleTitle").html(response.title);
				$(".articles").html(response.article);
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
				$(".articleTitle").html(response.title);
				$(".articles").html(response.article);
			}

		});
	});

});