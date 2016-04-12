(function(){
"use strict"
$(document).ready(function(){
	var hole;
	var counter = 0; // keeps track of user score.
	var interval1; //for first interval in gamePlay
	var interval2;	//for second interval in gamePlay
	var timer = 30;
	var highscores = [];

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

	//Start game button
	$('#start').click(function(event){
		var countdown = setInterval(updateTimer, 1000);
		counter = 0;
		gamePlay();
	})

	//Quit game button
	$('#quit').click(function(event){
    	removeWeenie();
		stopPlay();
	})

    function updateTimer()
    {
        if (timer == 0) {
        	stopPlay();
			$('#timer').html(timer);
        } else if (timer > 0) {
            $('#timer').html(timer);
        }
        timer--;
    }
	
	//Handles the game play using intervals. 
	function gamePlay (){
		var delay = 1000;
		interval1 = setInterval(function(event){
			removeWeenie();
		},delay);
		interval2 = setInterval(function(event){
			randomize();
			addWeenie();
			console.log(timer);
			delay = delay - 100;
		},delay*1.5);
		//Listens for user clicks and counts and adds score. 
		$('#area').click(function(event){
			var target = $(event.target).attr('id');
			if (target == hole){
				counter++;
				tallyScore(counter);
			}
		});
	}

	//To clear out the intervals running. 
	function stopPlay () {
		removeWeenie();
    	clearInterval(interval1);
    	clearInterval(interval2);
	}

	//Keeps track of your current streak.
	function tallyScore(){
		$('#scoreKeeper').html(counter);
	}

	
});


})();