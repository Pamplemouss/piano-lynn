var octaveNumbers = 5;
var questionsMax;
var correctAnswers = 0;
var wrongAnswers = 0;
var startTime;
var notationDo = [["Do"], ["Do♯", "Re♭"], ["Re"], ["Re♯", "Mi♭"], ["Mi"], ["Fa"], ["Fa♯", "Sol♭"], ["Sol"], ["Sol♯", "La♭"], ["La"], ["La♯", "Si♭"], ["Si"]];
var notationC = [["C"], ["C♯", "D♭"], ["D"], ["D♯", "E♭"], ["E"], ["F"], ["F♯", "G♭"], ["G"], ["G♯", "A♭"], ["A"], ["A♯", "B♭"], ["B"]];
var failedThisQuestion = false;


$(document).ready(function() {
    initialize();
});


function initialize() {
  $("body").attr("data-theme", Cookies.get("theme"));

  if (Cookies.get("notation")) {
    if (Cookies.get("notation") == "Do") {
      $(".form-switch input").prop("checked", true);
      changeNotation($(".form-switch input").prop("checked"));
      $(".form-switch > div").eq(0).removeClass("selected");
      $(".form-switch > div").eq(1).addClass("selected");
    }
    else if (Cookies.get("notation") == "C") {
      $(".form-switch input").prop("checked", false);
      changeNotation($(".form-switch input").prop("checked"));
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

  $(".nbButton").on("click", function() {
    changeNbQuestions(this);
  });

  questionsMax = $(".nbButton.activated").attr("nbQuestions");

  createPiano();
  updateScore();
}



function startTest() {
  failedThisQuestion = false;
  correctAnswers = 0;
  wrongAnswers = 0;
  updateScore();

  $("#startTestButton").addClass("disabled");
  $("#startTestButton").unbind();

  $("#testControl").removeClass("focusPanel");
  $("#answersControl").addClass("focusPanel");
  $("#noteToFind").html("Trouver <span></span>");

  $("#personalizedNb input").prop("disabled", true);
  $(".nbButton").addClass("disabled");
  $(".nbButton").unbind();

  $(".key").on("click", function() {
    checkAnswer(this);
  });

  startTime = new Date();
  startQuestion();
}



function finishTest() {
  endTime = new Date();

  $(".key").removeClass("wrong");
  $("#noteToFind").html("-<span></span>")


  $("#startTestButton").removeClass("disabled");
  $("#startTestButton").on("click",function() {
    startTest();
  })

  $("#testControl").addClass("focusPanel");
  $("#answersControl").removeClass("focusPanel");

  $(".nbButton").removeClass("disabled");
  $("#personalizedNb input").prop("disabled", false);
  $(".nbButton").on("click", function() {
    changeNbQuestions(this);
  });

  $(".key").unbind();

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
  $(".key").removeClass("wrong");

  var notes;
  if (Cookies.get("notation") == "Do")
    notes = notationDo;
  else if (Cookies.get("notation") == "C")
    notes = notationC;

  var randomNoteValue = Math.floor(Math.random() * 12);
  var note = notes[randomNoteValue];
  var noteName = note[Math.floor(Math.random()*note.length)];

  $("#noteToFind span").html(noteName);
  $("#noteToFind").attr("noteValue", randomNoteValue+1);
}



function checkAnswer(origin) {
  if ($(origin).attr("noteValue") == $("#noteToFind").attr("noteValue")) {
    if (!failedThisQuestion) {
      correctAnswers++;
    }

    shineCorrect(origin);
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

function closePopup() {
  $("#blackVeil").addClass("hidden");
  $("#popup").addClass("hidden");
}



function savePopup() {
  $.ajax({
    type: "POST",
    url: '/saveResults',
    data: {
      exercise: 2,
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



function changeNbQuestions(origin) {
  if ($(origin).attr("id") == "personalizedNb") {
    $(origin).attr("nbQuestions", $(origin).find("input").val())
  }

  $(".nbButton").removeClass("activated");
  $(origin).addClass("activated");
  questionsMax = $(origin).attr("nbQuestions");
}



function shineCorrect(target) {
  $(target).addClass("shineCorrect");
  setTimeout(function() {
    $(target).addClass("mangrove");
    setTimeout(function() {
      $(target).removeClass("shineCorrect");
      $(target).removeClass("mangrove");
    }, 290);
  }, 10);
}
