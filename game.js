var buttonColours =["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

var gamePattern = [];
var userClickedPattern = [];


$(document).keypress(function(event){
    
    if(!started){
        nextSequence();
        started = true;
    }
});

function nextSequence(){

    userClickedPattern =[];
    var randomNumber = Math.floor(Math.random() * 4);
    var RandomChosenColor = buttonColours[randomNumber];
    gamePattern.push(RandomChosenColor);

    level++;
    $("#level-title").text("Level " + level);

    $("#" + RandomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(RandomChosenColor);
}


function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      var sound = "wrong";
      $("#level-title").text("Game Over, Press Any Key to Restart ");

      $("body").addClass("game-over");
      setTimeout(function(){
          $("body").removeClass("game-over");
      }, 200);

      playSound(sound);

      startOver();

    }

}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);    
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}