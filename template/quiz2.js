(function(){
	// This is where you will write your function for the programming challenge
	// Do not commit console.log statements
	// Use ajax to reach the api endpoint
	// Whether or not you use jQuery, you still have to fix the jQuery errors. Removing jQuery is not fixing the problem.

	$mouseover = $('.mouse-over');
	$click     = $('.click');
	$sub       = $('.submit');
	$aj		   = $('.ajax-data');

	//mouse-over function now working
	$mouseover.mouseover(function() {
		$this = $(this);
		$(this).html('Scrooge McDuck!');
		$(this).height($(this).height() + 50);
	});
	
	//moved the click callback function here for my own readability
	//click function now working
	function clicked() {
		$click.html('Peace Out!');
		$click.fadeOut(1000);
		return false;
	}	
	$click.on("click", clicked);

	//submit function now working
	$sub.on("submit", function(e) {
		e.preventDefault();
		if ($(this).find('input [type="text"]').val() !== '') {
			$(this).find('input').each(function() {
				$(this).fadeOut('slow');
			});
			$(this).append('<h2>Congratulations! You\'ve entered some text!</h2>');
		}
	});

	//timeout function now working
	$(document).on("ready", function() {
		setTimeout(function() {
			$(".timeout").fadeOut('slow');
		}, 1000);
	});
	
	function setCookie(cname, cvalue) {
		document.cookie = cname + "=" + cvalue;
	}
	
	function getCookie(cname) {
		var nm = cname + "=";
		return document.cookie.substring(nm.length, document.cookie.length);
	}
	
	if(document.cookie.length > 0) {
		$(".output").append("<h2>" + getCookie("output") + "</h2>");
	}
	else {
		$(".output").empty();
	}
	
	var outString;
	$aj.on("submit", function(e) {
		e.preventDefault();
		
		$.ajax({
			url: 'http://www.mattbowytz.com/simple_api.json?data=quizData',
			dataType: 'json',
			success: function(data) {
				//clear the output area of any previous data
				$(".output").empty();
				$("#save_btn").remove();
				//change the button to Change It
				$(".ajax").val("Change It");
				
				//get a random number between 0 and number of items in the data array
				//and display the string
				var index = Math.floor(Math.random() * data.data.length);
				outString = data.data[index];
				$(".output").append("<h2>" + data.data[index] + "</h2>");
				
				//add the keep it button
				$(".ajax-form").append('<input id="save_btn" type="submit" value="Keep It" />');
				$("#save_btn").click(function(ev) {
					ev.preventDefault();
					setCookie("output", outString);
				});				
			}
		});
	});
	


})(jQuery);