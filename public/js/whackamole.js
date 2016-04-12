(function(){
"use strict"
$(document).ready(function(){
	var hole;
	var counter = 0;
	var interval1;
	var interval2;

	//get random hole.  Holes are numbered 1 - 9.
	function randomize (){
		hole = Math.floor(Math.random()* 9)+1;
		console.log(hole);
	}
	
	//add Weenie to random hole. 
	function addWeenie (){
		$("#"+ hole).addClass("add_weenie");
		console.log("add dog");
	}

	//removes the weenie dog from the selected hole. 
	function removeWeenie(){
		$("#"+ hole).removeClass("add_weenie");
		console.log("remove dog");
	}


	$('#start').click(function(event){
		counter = 0;
		gamePlay();
	})
	
	function gamePlay (){
		interval1 = setInterval(function(event){
			removeWeenie();
		},2000);
		interval2 = setInterval(function(event){
			randomize();
			addWeenie();
		},3000);
		$('#area').click(function(event){
			var target = $(event.target).attr('id');
			if (target == hole){
				counter++;
				tallyScore(counter);
			}
			console.log(counter);
		});
	}

	function stopPlay () {
    	clearInterval(interval1);
    	clearInterval(interval2);
	}

	$('#quit').click(function(event){
    	removeWeenie();
		stopPlay();
	})
	

	//Keeps track of your current streak.
	function tallyScore(){
		$('#scoreKeeper').html(counter);
	}

	
});


})();