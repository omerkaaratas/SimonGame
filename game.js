var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];


var started = false;

var level = 0;


//Keypress Function 
$(document).keypress(function() {
  if (!started) {

    $('#level-title').text('Level ' + level);

    nextSequence();

    started = true;

  }
});

// Click the enter key button 
$(document).ready(function() {
  $("#myButton").click(function() {
    var event = $.Event('keypress');
    event.which = 13;
    $("#myInput").trigger(event);
  });
});



//Click button function//
$('.btn').click(function() {

  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1)

});

// Answer Check Functions

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {

    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }
}

//Game Pattern - Sequence
function nextSequence() {

  userClickedPattern = [];

  level++;

  $('#level-title').text('Level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

//Button Sound//
function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();
}


//Button Animation//
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
