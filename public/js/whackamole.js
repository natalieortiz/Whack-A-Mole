(function(){
"use strict"
$(document).ready(function(){
	var hole;	//hole that is randomly selected. 
	var score; // keeps track of user score.
	var interval1; //for first interval in flashDogs
	var interval2;	//for second interval in flashDogs
	var countdown; //countdown variable for timer. 
	var timer;	//timer interval for each game.
	var highscore = 0; //High score initializes at zero. 
	var woof = new Audio('/audio/woof1.mp3');
	var bark = new Audio('/audio/bark.wav');
	var whistle = new Audio('/audio/whistle.wav');


	//Get random hole.  Holes are numbered 1 - 9.
	function randomize (){
		hole = Math.floor(Math.random()* 9)+1;
	}
	
	//Add Weenie image to random hole. 
	function addWeenie (){
		$("#"+ hole).addClass("add_weenie");
	}

	//Removes the weenie dog from the selected hole. 
	function removeWeenie(){
		$("#"+ hole).removeClass("add_weenie");
	}

	//Start game button
	$('#start').click(function(event){
		init();
	})

	//Quit game button
	$('#quit').click(function(event){
    	removeWeenie();
		stopPlay();
		$("#area").off("click", userPlay);
	})

	//Initializes game. Resets values and turns "on" game event listener. 
	function init (){
		timer = 30;
		//activates game area for user click. 
		$("#area").on("click", userPlay);
		//starts Timer countdown. 
		countdown = setInterval(updateTimer, 1000);
		flashDogs();
		$('#scoreKeeper').html(score);	
	}


	//Countdown timer.
    function updateTimer()
    {	
    	//Checks timer.  
        if (timer == 0) {
        	//When time runs out, quit game. 
        	stopPlay();
			$('#timer').html(timer);
			$("#area").off("click", userPlay);
			whistle.play();
			//Checking for new high score. 
			if (score > highscore){
				$('#high_score').html(score);
				//Shows video for high score. 
				$("#dogModal").modal("show");
			}
			//As time is running, do this: 
        } else if (timer > 0) {
            $('#timer').html(timer);
        }
        timer--;
    }
	
	//Flashes the images of dogs in the holes.  
	function flashDogs (){
		var delay = 700;
		score = 0;
		interval1 = setInterval(function(event){
			removeWeenie();
		}, delay);

		interval2 = setInterval(function(event){
			randomize();
			addWeenie();
		}, delay*1.5);
	}

	//Compares user clicks with randomly selected hole. 
	function userPlay(){
		var target = $(event.target).attr('id');
		if (target == hole){
			bark.play();
			score++;
			tallyScore();
		} else {
			woof.play();	
		}
	}

	//To clear out the intervals running during . 
	function stopPlay () {
		removeWeenie();
    	clearInterval(interval1);
    	clearInterval(interval2);
    	clearInterval(countdown);
	}

	//Keeps track of your current streak.
	function tallyScore(){
		$('#scoreKeeper').html(score);
	}


	
});


})();