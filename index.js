var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var initial = false;

$(document).keypress(function() {
    if(!initial) {
        
        $("#level-title").text("Level " + level);
        nextSequence();

        initial = true;
    }
});

$(".btn").on("click", function(event) {
    
    var userChosenColour = $(this).attr("id");
    
    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } 
    else {
        console.log("wrong");
        $('body').addClass("game-over");

        setTimeout(function() {
            $('body').removeClass("game-over");
        }, 300);

        $('#level-title').text("Game Over, Press Any Key to Restart");

        startOver();

    }

}


function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    var curButton = '#' + randomChosenColour;
    $(curButton).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function  playSound(name) {
    var buttonPath = "sounds/" + name + ".mp3";

    var buttonSound = new Audio(buttonPath);
    buttonSound.play();
}

function animatePress(currColor) {

    var curButton = '#' + currColor;
    $(curButton).addClass("pressed");

    setTimeout(function() {
        $(curButton).removeClass("pressed");
    }, 100);
}

function startOver() {

    level = 0;
    gamePattern = [];
    initial = false;

}