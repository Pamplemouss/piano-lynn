var octaveNumbers = 5;
var questionsMax = 20;
var correctAnswers = 0;
var wrongAnswers = 0;
var startTime;
var endTime;
var notationDo = ["Do", "Do♯/Re♭", "Re", "Re♯/Mi♭", "Mi", "Fa", "Fa♯/Sol♭", "Sol", "Sol♯/La♭", "La", "La♯/Si♭", "Si"];
var notationC = ["C", "C♯/D♭", "D", "D♯/E♭", "E", "F", "F♯/G♭", "G", "G♯/A♭", "A", "A♯/B♭", "B"];
var failedThisQuestion = false;


$(document).ready(function() {
    initialize();
});


function initialize() {
  $("body").attr("data-theme", Cookies.get("theme"));

  if (Cookies.get("notation")) {
    if (Cookies.get("notation") == "Do") {
      $(".form-switch input").prop("checked", true);
      $(".form-switch > div").eq(0).removeClass("selected");
      $(".form-switch > div").eq(1).addClass("selected");
    }
    else if (Cookies.get("notation") == "C") {
      $(".form-switch input").prop("checked", false);
      $(".form-switch > div").eq(1).removeClass("selected");
      $(".form-switch > div").eq(0).addClass("selected");
    }
  }

  $("#startTestButton").on("click",function() {
    startTest();
  })

  $(".form-switch input").change(function() {
    changeNotation(this.checked);
  });

  createPiano();
  randomizeAnswersOrder();
  updateScore();
}



function startTest() {
  failedThisQuestion = false;
  correctAnswers = 0;
  wrongAnswers = 0;
  updateScore();

  $("#answersControl .answerButton").removeClass("disabled");
  $("#startTestButton").addClass("disabled");
  $("#startTestButton").unbind();

  $("#answersControl .answerButton").on("click", function() {
    checkAnswer(this);
  });

  startTime = new Date();
  startQuestion();
}



function finishTest() {
  endTime = new Date();

  $(".key").removeClass("toFind");
  $(".answerButton").removeClass("wrong");
  $(".answerButton").addClass("disabled");
  $("#startTestButton").removeClass("disabled");
  $("#startTestButton").on("click",function() {
    startTest();
  })

  $("#answersControl .answerButton").unbind();

  var totalTime = (endTime - startTime) / 1000;
  var averageTime = Math.round((totalTime / questionsMax) * 100) / 100;
  totalTime = Math.round(totalTime);

  $("#popup #totalTime").html(totalTime);
  $("#popup #averageTime").html(averageTime);
  $("#blackVeil").removeClass("hidden");
  $("#popup").removeClass("hidden");
}



function createPiano() {
  let root = document.documentElement;
  var whiteNotes = ['["Do","Si♯"]', '["Re"]', '["Mi","Fa♭"]', '["Fa","Mi♯"]', '["Sol"]', '["La"]', '["Si","Do♭"]'];
  var blackNotes = ['', '["Do♯","Re♭"]', '["Re♯","Mi♭"]', '', '["Fa♯","Sol♭"]', '["Sol♯","La♭"]', '["La♯","Si♭"]'];

  for (var i = 0 ; i < octaveNumbers ; i++) {
    $("#piano").append("<div class='octave'></div>");

    //white keys
    for (var j = 0 ; j < 7 ; j++) {
      var noteValue = 0;
      switch(j) {
        case 0:
          noteValue = 1;
          break;
        case 1:
          noteValue = 3;
          break;
        case 2:
          noteValue = 5;
          break;
        case 3:
          noteValue = 6;
          break;
        case 4:
          noteValue = 8;
          break;
        case 5:
          noteValue = 10;
          break;
        case 6:
          noteValue = 12;
          break;
      }
      $(".octave").last().append("<div class='white key' noteValue='" + noteValue + "' data-note='" + whiteNotes[j] + "'></div>");
    }

    //black keys
    for (var j = 1 ; j < 7 ; j++) {
      if (j == 3)
        j = 4;

        var noteValue = 0;
        switch(j) {
          case 1:
            noteValue = 2;
            break;
          case 2:
            noteValue = 4;
            break;
          case 4:
            noteValue = 7;
            break;
          case 5:
            noteValue = 9;
            break;
          case 6:
            noteValue = 11;
            break;
        }

      $(".octave").last().append("<div class='black key' noteValue='" + noteValue + "' data-note='" + blackNotes[j] + "' style='--place: " + j + "'></div>");
    }
  }

  //define width of white keys proportional of screen width
  var whiteWidth = $("body").width() * 0.9 / (octaveNumbers * 7) - (75 / (octaveNumbers * 7)) + "px";
  root.style.setProperty("--whiteWidth", whiteWidth);
}



function startQuestion() {
  failedThisQuestion = false;
  $(".key").removeClass("toFind");
  $(".answerButton").removeClass("wrong");

  var randomOctave = Math.floor(Math.random() * octaveNumbers);
  var randomKey = Math.floor(Math.random() * 12);
  var keyToFind = $(".octave").eq(randomOctave).children().eq(randomKey);
  var noteNames = keyToFind.data("note");
  var answer = noteNames[Math.floor(Math.random()*noteNames.length)];

  keyToFind.addClass("toFind");
}



function checkAnswer(origin) {
  if ($(origin).attr("noteValue") == $(".toFind").attr("noteValue")) {
    if (!failedThisQuestion)
      correctAnswers++;

    updateScore();

    if ((correctAnswers + wrongAnswers) >= questionsMax) {
      finishTest();
    }
    else {
      startQuestion();
    }
  }
  else {
    if (!failedThisQuestion) {
      wrongAnswers++;
      failedThisQuestion = true;
      updateScore();
    }

    $(origin).addClass("wrong");
  }
}



function updateScore() {
  $("#totalCorrect").html(correctAnswers);
  $("#totalQuestions").html(correctAnswers + wrongAnswers);
}



function randomizeAnswersOrder() {
  $(function () {
    var parent = $("#toRandomize");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }

    for (var i = 0 ; i < 6 ; i++) {
      $("#answersControl .row").eq(0).append($("#toRandomize").children().eq(i).clone());
    }
    for (var i = 6 ; i < 12 ; i++) {
      $("#answersControl .row").eq(1).append($("#toRandomize").children().eq(i).clone());
    }
  });
}



function closePopup() {
  $("#blackVeil").addClass("hidden");
  $("#popup").addClass("hidden");
}



function savePopup() {
  $.ajax({
    type: "POST",
    url: '/saveResults',
    data: {
      averageTime: $("#popup #averageTime").html()
    },
    success: function() {
      closePopup();
    }
  });
}



function changeNotation(checked) {
  var notationToUse;

  if (checked) {
    Cookies.set('notation', "Do", { expires: 30 });
    notationToUse = notationDo;
  }
  else {
    Cookies.set('notation', "C", { expires: 30 });
    notationToUse = notationC;
  }

  $(".form-switch > div").toggleClass("selected");
  $(".answerButton").each(function(index) {
    let noteValue = $(this).attr("noteValue");
    $(this).html(notationToUse[noteValue-1])
  });
}



function toggleLight() {
  var theme;

  if ($("body").attr("data-theme") == "light")
    theme = "dark";
  else if ($("body").attr("data-theme") == "dark")
    theme = "light";

  $("body").attr("data-theme", theme);
  Cookies.set('theme', theme, { expires: 30 })
}
