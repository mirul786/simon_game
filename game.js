var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];


var started = false;

var level = 0;

$(".click_me").click(function () {

  if(!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }

})

$(".btns").on("click", function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour)
  // console.log(userChosenColour)
  // console.log(userClickedPattern)
  playSound(userChosenColour)
  animatePress(userChosenColour)

  checkAnswer(userClickedPattern.length-1)
});

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#game-over-title").css("opacity", "100%")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}



function nextSequence() {

  userClickedPattern = [];

    // when the next sequence is called :-

    level++

    $("#level-title").text("Level " + level);

    $("#game-over-title").css("opacity", 0,)

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour)
    console.log(gamePattern)

    //console.log(randomChosenColour)

    // console.log(randomNumber)
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
     
    playSound(randomChosenColour)

    
} 

function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3")
    audio.play();
  
}

function animatePress(currentColour) {

  var activeButton = document.querySelector("." +currentColour);

  activeButton.classList.add("pressed");

  setTimeout(function() {
      activeButton.classList.remove("pressed");
  }, 100);
  
}



function startOver() {

    level = 0;

    gamePattern = [];

    started = false;
  
}