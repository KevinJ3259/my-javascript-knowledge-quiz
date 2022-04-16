let currentQuestionIndex = 0;
let time = questions.length * 15;
let timerId;

let questionsEl = document.getElementById("questions");
let timerEl = document.getElementById("time");
let choicesEl = document.getElementById("choices");
let submitBtn = document.getElementById("submit");
let initialsEl = document.getElementById("initials");
let feedbackEl = document.getElementById("feedback");
let startBtn = document.getElementById("start");

const startQuiz=()=>{
  
  let startScreenEl = document.getElementById("start-screen");
  startScreenEl.setAttribute("class", "hide");
 
  questionsEl.removeAttribute("class");
  
  timerId = setInterval(clockTick, 1000);
  
  timerEl.textContent = time;
  getQuestions();
}

// function Kevin () {

// }
// const Kevin = ()=>{

// }
const getQuestions=()=>{

    let currentQuestion=questions[currentQuestionIndex];
    let titleEl=document.getElementById("questions-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {

        let choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + ". " + choice;
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
      });
}
const questionClick=()=>{
    if (this.value !== questions[currentQuestionIndex].answer) {

        time -= 15;
        if (time < 0) {
          time = 0;
        }
        timerEl.textContent = time;
        feedbackEl.textContent = " You got it wrong sucker!";
      } else {
        feedbackEl.textContent = "I'll let you have this one!";
      }
      feedbackEl.setAttribute("class", "feedback");
      setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
      }, 1000);
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        getQuestions();
      } 
}
const quizEnd=()=>{
  clearInterval(timerId);
  let endScreenEl=document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  let finalScoreEl=document.getElementById("final-score");
  finalScoreEl.textContent=time;
  questionsEl.setAttribute("class", "hide");
}
const clockTick=()=>{
  time--;
  timerEl.textContent=time;
  if(time <=0){
    quizEnd();
  }
}
const saveHighScore=()=>{
  let initials=initialsEl.value.trim();
  if(initials!==""){
    let highscores=JSON.parse(window.localStorage.getItem("highscores"))||[];
    let newScore={
      score:time, initials:initials
    };
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href="highscore.html";
  }
}
const checkForEnter=(e)=>{
  if(e.key==="Enter"){
    saveHighScore();
  }
}
submitBtn.onclick=saveHighScore;
startBtn.onclick=startQuiz;
initialsEl.onkeyup=checkForEnter;
