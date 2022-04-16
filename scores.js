const displayHighScore=()=>{
    let highscores=JSON.parse(window.localStorage.getItem("highscores"))||[];
    highscores.sort(function(first, second){
        return second.score-first.score;
    });
    highscores.forEach(function(score){
    let litag=document.createElement("li");
    litag.textContent=score.initials+" "+score.score;
    let orderedoltag=document.getElementById("highscores");
    orderedoltag.appendChild(litag);


    });

}
const clearScore=()=>{
    window.localStorage.removeItem("highscores");
    window.location.reload();
}
document.getElementById("clear").onclick=clearScore;
displayHighScore();
