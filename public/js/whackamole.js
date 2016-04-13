(function(){
"use strict"
$(document).ready(function(){
	var hole;
	var counter; // keeps track of user score.
	var interval1; //for first interval in flashDogs
	var interval2;	//for second interval in flashDogs
	var countdown;
	var timer;
	var highscore = 0;
	var woof = new Audio('/audio/woof1.mp3');
	var bark = new Audio('/audio/bark.wav');
	var whistle = new Audio('/audio/whistle.wav');


	//get random hole.  Holes are numbered 1 - 9.
	function randomize (){
		hole = Math.floor(Math.random()* 9)+1;
	}
	
	//add Weenie to random hole. 
	function addWeenie (){
		$("#"+ hole).addClass("add_weenie");
	}

	//removes the weenie dog from the selected hole. 
	function removeWeenie(){
		$("#"+ hole).removeClass("add_weenie");
	}

	//Start game button
	$('#start').click(function(event){
		timer = 30;
		//activates game area for user click. 
		$("#area").on("click", userPlay);
		countdown = setInterval(updateTimer, 1000);
		flashDogs();
		$('#scoreKeeper').html(counter);
	})

	//Quit game button
	$('#quit').click(function(event){
    	removeWeenie();
		stopPlay();
		$("#area").off("click", userPlay);
	})

	//Countdown timer.
    function updateTimer()
    {	
        if (timer == 0) {
        	stopPlay();
			$('#timer').html(timer);
			$("#area").off("click", userPlay);
			whistle.play();
			if (counter > highscore){
				$('#high_score').html(counter);
				//shows video for high score. 
				$("#dogModal").modal("show");
			}
        } else if (timer > 0) {
            $('#timer').html(timer);
        }
        timer--;
    }
	
	//Handles the game play using intervals. 
	function flashDogs (){
		var delay = 700;
		counter = 0;
		interval1 = setInterval(function(event){
			removeWeenie();
		},delay);

		interval2 = setInterval(function(event){
			randomize();
			addWeenie();
		},delay*1.5);
	}

	//Compares user clicks with randomly selected hole. 
	function userPlay(){
		var target = $(event.target).attr('id');
		if (target == hole){
			bark.play();
			counter++;
			console.log(counter);
			tallyScore();
		} else {
			woof.play();	
		}
	}

	//To clear out the intervals running. 
	function stopPlay () {
		removeWeenie();
    	clearInterval(interval1);
    	clearInterval(interval2);
    	clearInterval(countdown);
	}

	//Keeps track of your current streak.
	function tallyScore(){
		$('#scoreKeeper').html(counter);
	}


	
});


})();