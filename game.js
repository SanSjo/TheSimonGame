var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keydown(function() {
    if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence(); 
    started = true;
    }
  
})

$(".btn").on("click", function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

})

function nextSequence() {
    userClickedPattern =[];
    level++

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var buttonColor = "#" + randomChosenColor
 
    $(buttonColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    var buttonSound = "/sounds/" + randomChosenColor + ".mp3";
    
    document.querySelector(buttonColor).addEventListener("click", function() {
        playSound(randomChosenColor, buttonSound);
       
    })
}

function playSound(id, sound) {
    switch (id) {
        case "green":
            var green = new Audio(sound);
            green.play()
            break;
        case "red":
            var red = new Audio(sound);
                red.play()
            break;
        case "yellow":
            var yellow = new Audio(sound);
                yellow.play()
            break;
        case "blue":
            var blue = new Audio(sound);
                blue.play()
            break;
    
        default:
            break;
         
    }

}

function animatePress(currentColor) {
    var color = "#"+currentColor
    $(color).addClass("pressed");
    setTimeout(() => {
        $(color).removeClass("pressed");
    },50)

}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       if(gamePattern.length === userClickedPattern.length) {
        setTimeout(() => {
            nextSequence(); 
        },1000)
        
      }
    } 
     else {
            var wrong = new Audio("/sounds/wrong.mp3");
            wrong.play();
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");

            setTimeout(() => {
                $("body").removeClass("game-over");
            }, 200)
            startOver()
            
    }

    function startOver() {
        level= 0;
        gamePattern= []
        started= false
    }
   
   
}

