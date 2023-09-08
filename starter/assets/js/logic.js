// variable to keep track of quiz state 
let currentQuestionIndex = 0;
let time = questions. length * 15;
let timerID;


// HTML elements;
let questionsELemnt = document.getElementById("questions");
let timeElement = document.getElementById("time");
let choicesElement = document.getElementById("choices")
let submitbutton = document.getElementById("submit");
let startButton = document.getElementById("start");
let initialElement = document.getElementById("initials");
let feedBackELement = document.querySelector(".feedback");


let sfxRight = new Audio("assets/sfx/correct.wav");
let sfxWrong = new Audio("assets/sfx/incorrect.wav");

function questionClick(){
    if(this.value !== questions[currentQuestionIndex].answer) {
       time -= 15;
    
       if(time < 0) {
           time = 0;
       }
    
       timeElement.textContent = time;

      console.log("test")
       sfxWrong.play();
       feedBackELement.textContent = "Wrong"
      } else {
        console.log("test")
       sfxRight.play();
       feedBackELement.textContent = "Correct!";
      }

      console.log(feedBackELement)
      feedBackELement.setAttribute("class", "feedback");
    
      setTimeout(function(){
        feedBackELement.setAttribute("class", "feedback hide")
       }, 1000);

     currentQuestionIndex++;
    
     if(currentQuestionIndex === questions.length) {
      quizEnd()
     } else {
      getQuestion();
     }
}


function getQuestion(){
    let currentQuestion = questions[currentQuestionIndex];

    let titleElement = document.getElementById("question-title");

    titleElement.textContent = currentQuestion.title;

    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, index ) {
        let choiceButton = document.createElement("button");

        choiceButton.setAttribute("class", "choice");
        choiceButton.setAttribute("value", choice);

        choiceButton.textContent = `${index + 1}. ${choice}`

        choiceButton.addEventListener("click", questionClick);

        choicesElement.append(choiceButton);

    })
}


function quizEnd(){
    clearInterval( timerID);

    let endScreenElement = document.getElementById("end-screen");
    endScreenElement.removeAttribute("class");


    let finalScoreElement = document.getElementById("final-score");
    finalScoreElement.textContent = time;

    questionsELemnt.setAttribute("class", "hide");

}

function clockTrick() {
    time--;
    timeElement.textContent = time;

    if(time <= 0){
        quizEnd();
    }
}

function startQuiz(){
    let startScreenElement = document.getElementById("start-screen");
    startScreenElement.setAttribute("class", "hide");


    questionsELemnt.removeAttribute("class");


    timerID = setInterval(clockTrick, 1000)

    timeElement.textContent = time;

    getQuestion();


}


function saveHighScore(){
    console.log(initials);

    if(initials !== ""){
        let saveHighScores = JSON.parse(localStorage.getItem("highscores")) || [];
        let newScore = {
            score: time,
            initials: initials
        }
           
        saveHighScores.push(newScore);
        localStorage.setItem("highscore", JSON.stringify(saveHighScores));

        window.location.href = "highscores.html";
    
    
    }

}


function checkForEnter(event){
    if(event.key === "Enter"){
        saveHighScore();
    }

}


startButton.addEventListener("click", startQuiz); 

submitbutton.addEventListener("click", saveHighScore);

initialElement.addEventListener("keyup", checkForEnter);