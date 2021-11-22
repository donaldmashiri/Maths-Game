var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click start/reset
document.getElementById("startreset").onclick = function (){
    //     if we are playing
    if(playing == true){
        location.reload(); // reload page
    }else{
        // change mode to playing
        playing = true;
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;

        // show countdown box
        show("timeremaining");
        timeremaining = 20;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;

        //hide game over
        hide("gameOver");

        // change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

    //    start countdown
        startCountdown();

    //    generate a new Q&A
        generateQA();
    }
}

//functions

// start Counter
function startCountdown(){
    action = setInterval(function (){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){ //gameover
            stopCountdown();
            show("gameOver");
            document.getElementById("gameOver").innerHTML = "" +
                "<p>Game Over</p> <p>Your score is " + score + "</p>";

                hide("timeremaining");
                hide("correct");
                hide("wrong");
                playing = false;
                document.getElementById("startreset").innerHTML = "Start Game";
        }
        },1000);
}


// Stop Counter
function stopCountdown(){
    clearInterval(action);
}

//hide an elements
function hide(Id){
    document.getElementById(Id).style.display = "none";
}

//show an element
function show(Id){
    document.getElementById(Id).style.display = "block";
}


//generate question and multiple answers
function  generateQA() {
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "X" + y;
    var correctPosition = 1 + Math.round(3*Math.random());

    document.getElementById("box"+correctPosition).
        innerHTML = correctAnswer; //fill one box with correct answer

//    fill other boxes with wrong answers

    var answers = [correctPosition]

    for(i=1; i<5; i++){
        if(i != correctPosition){
        //    generate wrong answer
            var wrongAnswer;

           do{
               wrongAnswer = (1 + Math.round(9*Math.random()))*
                   (1 + Math.round(9*Math.random())); // a wrong answer
           } while(answers.indexOf(wrongAnswer)>-1)
            // (wrongAnswer == correctAnswer)

            document.getElementById("box"+i).innerHTML = wrongAnswer;
           answers.push(wrongAnswer)
        }
    }
}

// Clicking on an answer box

for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function (){
//    check if we are playing
        if(playing == true){
            if(this.innerHTML == correctAnswer){ //  correct answer
                // increase score by 1
                score++;

                document.getElementById("scorevalue").innerHTML = score;
                //        hide wrong box and show correct
                hide("wrong");
                show("correct");
                setTimeout(function (){
                    hide("correct");
                }, 1000);

                generateQA()

            }else{
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function (){
                    hide("wrong");
                }, 1000);
            }
        }
    }

}




//     if we are playing
//         reload page
//     if we are not playing
//           set score to zero
//          show countdown box
//           reduce time by1sec in loops
//                 time left?
//                     yes->continue
//                         no->gameover
//              change button to reset
//                generate a new Q&A


//if we click on answer box
//  if we are playing
//         correct
//          yes
//             increase score by 1
//             show correctbox for 1 sec
//                 generate new question
//          no
//              show try again box