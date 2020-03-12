//Array of all questions in the quiz
var questionsArray = ["How many primitive data types are in Javascript?", //0
                      "What does HTML stand for?", //1
                      "What is HTML used for?", //2
                      "What does CSS stand for?", //3
                      "What is CSS used for?", //4
                      "What is Javascript used for?", //5
                      "When was HTML created?", //6
                      "When was CSS created?", //7
                      "When was Javascript created?", //8
                      "What is 2 + 2?", //9
                      "Which company developed Javascript?", //10
                      "What are global variables in Javascript?", //11
                      "What does console.log() do?", //12
                      "What is a Javascript function?", //13
                      "What does Math.random() return in Javascript?", //14
                      "What does a for loop do?", //15
                      "What does a while loop do?", //16
                      "How do you add numbers together in Javascript?", //17 
                      "How do you subtract numbers in Javascript?", //18
                      "How do you multiply and divide numbers in Javascript?", //19
                     ];

//Array of objects of all answers in the quiz
var answersArray = [
                   {correctAnswer: "6", otherAnswer1: "5", otherAnswer2: "4", otherAnswer3: "None of the above"}, //0
                   {correctAnswer: "Hypertext Markup Language", otherAnswer1: "Hypertext Markdown Language", otherAnswer2: "Hypertext Marker Language", otherAnswer3: "Hairy Tom Made Lasagna"}, //1
                   {correctAnswer: "Used to display documents in a web broswer", otherAnswer1: "Used to show cooking tutorials", otherAnswer2: "Used to write an essay", otherAnswer3: "Used to find out the meaning of life"}, //2
                   {correctAnswer: "Cascading Style Sheets", otherAnswer1: "Case Style Sheets", otherAnswer2: "Cascading Signature Sheets", otherAnswer3: "Case Signature Sheets"}, //3
                   {correctAnswer: "Used to design the look and feel of an HTML document", otherAnswer1: "Used to design the look and feel of a Javascript file", otherAnswer2: "Used to design arts and crafts using 3D models", otherAnswer3: "Used to design gifs"}, //4
                   {correctAnswer: "Used to create responsive, interactive elements for web pages", otherAnswer1: "Used to cure world hunger", otherAnswer2: "Used to make you hate coding", otherAnswer3: "Used only to do math operations"}, //5
                   {correctAnswer: "1990", otherAnswer1: "1991", otherAnswer2: "1989", otherAnswer3: "1992"}, //6
                   {correctAnswer: "1996", otherAnswer1: "1995", otherAnswer2: "1994", otherAnswer3: "1997"}, //7
                   {correctAnswer: "1995",otherAnswer1: "1994", otherAnswer2: "1996", otherAnswer3: "1993"}, //8
                   {correctAnswer: "All of the above", otherAnswer1: "22", otherAnswer2: "4", otherAnswer3: "fish"}, //9
                   {correctAnswer: "Netscape", otherAnswer1: "Skynet", otherAnswer2: "Microsoft", otherAnswer3: "Apple"}, //10
                   {correctAnswer: "Gloabl variables are available throughout the whole program, they have no scope", otherAnswer1: "Global variables are only available outside of functions", otherAnswer2: "Global variables are only used inside of functions", otherAnswer3: "Global variables can't be modified once they've been declared and are used only in functions"}, //11
                   {correctAnswer: "It prints out the value specified in the parenthesis to the console", otherAnswer1: "It prints out the value in the parentheses to an html element", otherAnswer2: "It logs the value in the parentheses as a secret value that no one can see", otherAnswer3: "Permanently sets the variable to the value in the parentheses"}, //12
                   {correctAnswer: "A function is a JavaScript procedure—a set of statements that performs a task or calculates a value.", otherAnswer1: "A function is a Javascript procedure that only runs if you have a comment code above it", otherAnswer2: "A function is a Javascript procedure that allows you to argue with your computer till it works", otherAnswer3: "A function is a Javascript procedure that does absolutely nothing because the Javascript developers are cruel human beings"}, //13
                   {correctAnswer: "A decimal number between 0 and 1", otherAnswer1: "A random integer value", otherAnswer2: "A random decimal value (no parameters)", otherAnswer3: "An integer between 0 and 100"}, //14
                   {correctAnswer: "It loops through a block of code a specified amount of times", otherAnswer1: "It loops forever", otherAnswer2: "It can only loop a maximum of 100 times", otherAnswer3: "It can only loop if used in a function"}, //15
                   {correctAnswer: "It loops through a block of code as long as a specific condition is met", otherAnswer1: "It loops forever", otherAnswer2: "It's the exact same thing as a for loop", otherAnswer3: "It loops only for a specified amount of times"}, //16
                   {correctAnswer: "+", otherAnswer1: "Plus", otherAnswer2: "plus", otherAnswer3: "add"}, //17
                   {correctAnswer: "-", otherAnswer1: "Minus", otherAnswer2: "minus", otherAnswer3: "subtract"}, //18
                   {correctAnswer: "* , /", otherAnswer1: "x , ÷", otherAnswer2: "Multiply , Divide", otherAnswer3: "multiply , divide"}, //19
                   ];

//Listen for when the user starts the quiz
var startButton = document.getElementById("start").addEventListener("click",start);

//Global Variables
var welcomeMessage = document.getElementById("welcome");
var questionContainer = document.getElementById("container");
var quizTime = document.getElementById("quizTime");
var scoreView = document.getElementById("scoreView");
var userName = document.getElementById("name");
var viewScores = document.getElementById("view");
var body = document.getElementById("body");
var stats = document.getElementById("stats");
var time = 0;
var interval;
var score = 0;
var easterEggCheck = false;
var dumbassCounter = 0;
var randomQuestionNum;
var container2;
var name;
var counter = localStorage.getItem("counterValue");

//Listen for when the user wants to view high scores list
var viewScoresButton = document.getElementById("view").addEventListener("click",showHighScores);

//Alter score for easter egg
document.addEventListener("keydown",function(event){
 if(event.keyCode == 32 && easterEggCheck == false && userName.value != ""){
     score = Infinity;
     time = 0;
     easterEggCheck = true;
     scoreView.textContent = "Score: " + score;
     tick(); 
 }
});

//Check for answer selection
function handleInput(){

    //Select all created buttons
    var answers = document.getElementsByClassName("response");

    //Add event listeners to all answer buttons
    for(var v = 0; v < answers.length; v++){
        answers[v].addEventListener("click",function(){

            //Right answer input handle
            if(this.innerHTML == answersArray[randomQuestionNum].correctAnswer){
                time = time + 6;
                quizTime.textContent = "Time: " + time;
                score++;
                scoreView.textContent = "Score: " + score;
                container2.style.display = "none";
                questionsArray.splice(randomQuestionNum,1);
                answersArray.splice(randomQuestionNum,1);
                generateQuestion();
            }

            //Wrong answer input handle
            else{
                time = time - 3;
                if(time <= 0){
                    quizTime.textContent = "Time: 0";
                }
                else{
                    quizTime.textContent = "Time: " + time;
                }
                container2.style.display = "none";
                questionsArray.splice(randomQuestionNum,1);
                answersArray.splice(randomQuestionNum,1);
                generateQuestion();
            }

        });
    }
}


//Stuff to do once they click start quiz
function start(){

    //Check if they can't read directions
    if(userName.value == ""){
        if(dumbassCounter >= 1){
            window.open("https://media1.tenor.com/images/cf05aca79a828279ea8ef98d1ff97669/tenor.gif?itemid=8612783");  
        }
        else{
            dumbassCounter++;
        }
    }

    //Otherwise start quiz
    else{
        welcomeMessage.style.display = "none";
        viewScores.style.display = "none";
        scoreView.style.float = "left";
        time = 20;
        quizTime.textContent = "Time: " + time;
        name = userName.value;
        interval = setInterval(tick,1000);
        generateQuestion();
    }
}

//Call this everytime to generate question
function generateQuestion(){

    //Create container for question and answers
    container2 = document.createElement("div");
    container2.style.display = "block";

    //Pick a random question from the array
    randomQuestionNum = Math.round(Math.random() * questionsArray.length - 1);
    if(randomQuestionNum < 0){
        randomQuestionNum++;
    }

    //Display random question
    var displayQuestion = document.createElement("h1");
    displayQuestion.style.display = "block";
    displayQuestion.style.color = "red";
    displayQuestion.style.marginTop = "0px";
    displayQuestion.style.marginBottom = "20px";
    displayQuestion.setAttribute("id","questionText");
    displayQuestion.innerHTML = questionsArray[randomQuestionNum];
    container2.appendChild(displayQuestion);

    //Get answers associated with random question
    var loopObject = Object.values(answersArray[randomQuestionNum]);
    var available = loopObject.length;

    //Display all answers randomly 
    for(var i = 0; i < available; i++){
        var randomAnswerNum = Math.round(Math.random() * loopObject.length - 1);
        if(randomAnswerNum < 0){
            randomAnswerNum++;
        }
        var displayAnswers = document.createElement("button");
        displayAnswers.style.display = "block";
        displayAnswers.style.marginBottom = "10px";
        displayAnswers.style.border = "none";
        displayAnswers.style.padding = "5px";
        displayAnswers.style.marginLeft = "auto";
        displayAnswers.style.marginRight = "auto";
        displayAnswers.style.backgroundColor = "#02FF36";
        displayAnswers.style.fontWeight = "bold";
        displayAnswers.setAttribute("class","response")
        displayAnswers.innerHTML = loopObject[randomAnswerNum];
        loopObject.splice(randomAnswerNum,1);
        container2.appendChild(displayAnswers);
    }

    //Display question and answers
    questionContainer.appendChild(container2);

    //Check for correct answer
    handleInput();
}

//Deals with end condition of quiz
function tick(){
    if(time <= 0 || questionsArray.length <= 0){
        clearInterval(interval);
        counter = localStorage.getItem("counterValue");
        counter++;
        localStorage.setItem("name" + counter,name);
        localStorage.setItem("score" + counter,score);
        localStorage.setItem("counterValue",counter);
        showHighScores();
        //Show return to main menu or restart quiz button 
    }
    else{
        time--;
        quizTime.textContent = "Time: " + time;
    }
}

//Show highscores list
function showHighScores(){

    //Clear entire screen whenever we enter this list
    questionContainer.style.display = "none";

    //Create container for highscores list
    var highScoresListContainer = document.createElement("div");
    highScoresListContainer.style.width = "60%";
    highScoresListContainer.style.marginLeft = "auto";
    highScoresListContainer.style.marginRight = "auto";
    highScoresListContainer.style.marginTop = "20px";
    highScoresListContainer.style.marginBottom = "0px";
    highScoresListContainer.style.textAlign = "center";
    highScoresListContainer.setAttribute("id","hSLC");
    
    //Create header element
    var highScoreHeader = document.createElement("h1");
    highScoreHeader.style.color = "red";
    highScoreHeader.innerHTML = "High Scores:";
    highScoresListContainer.appendChild(highScoreHeader);
    body.appendChild(highScoresListContainer);
    
    //Display local storage information
    var anotherCounter = 1;
    var scoresArray = [];
    var namesArray = [];
    var sortedArray = [];

    //Loop through local storage and isolate elements
    while(anotherCounter <= counter){
        for(var ls in localStorage){
            var scoreElement = "score" + anotherCounter;
            var nameElement = "name" + anotherCounter;
            if(scoreElement == ls){
            scoresArray.push(localStorage[ls]);
            }
            if(nameElement == ls){
            namesArray.push(localStorage[ls]);
            }
        }
        anotherCounter++;
    }

    //Push isolated elements to single array to be sorted together
    for(var j = 0; j < scoresArray.length; j++){
        sortedArray.push({"name": namesArray[j],"score": scoresArray[j]});
    }

    //Sort the combined array making sure to keep the correct name with the score
    sortedArray.sort(function(a,b){
        return ((a.score > b.score) ? -1 : ((a.score == b.score) ? 0 : 1));
    });

    //Update the old arrays to be used to display in leaderboards
    for(var k = 0; k < sortedArray.length; k++){
        namesArray[k] = sortedArray[k].name;
        scoresArray[k] = sortedArray[k].score;
    }
    
    //Display all leaderboard information
    for(var s = 0; s < scoresArray.length; s++){
        var storageInfo = document.createElement("p");
        storageInfo.style.display = "block";
        storageInfo.style.color = "#02FF36";
        storageInfo.style.marginBottom = "0px";
        storageInfo.style.marginTop = "10px";
        storageInfo.innerHTML = "User: " + namesArray[s] + ", Your score is: " + scoresArray[s];
        highScoresListContainer.appendChild(storageInfo); 
    }
    


    //Display button to restart quiz
    var restartQuizBut = document.createElement("button");
    restartQuizBut.setAttribute("id","restartBut");
    restartQuizBut.style.display = "block";
    restartQuizBut.style.marginTop = "20px";
    restartQuizBut.style.marginLeft = "auto";
    restartQuizBut.style.marginRight = "auto";
    restartQuizBut.style.border = "none";
    restartQuizBut.style.padding = "5px";
    restartQuizBut.style.backgroundColor = "#FF02CB";
    restartQuizBut.style.color = "black";
    restartQuizBut.style.fontWeight = "bold";
    restartQuizBut.innerHTML = "Restart Quiz";
    highScoresListContainer.appendChild(restartQuizBut);
    
    //Listen for restart quiz
    var newReBut = document.getElementById("restartBut").addEventListener("click",restartQuiz);

    //Display button to clear local storage
    var clearLeaderBoards = document.createElement("button");
    clearLeaderBoards.setAttribute("id","clearLead");
    clearLeaderBoards.style.display = "block";
    clearLeaderBoards.style.marginTop = "20px";
    clearLeaderBoards.style.marginLeft = "auto";
    clearLeaderBoards.style.marginRight = "auto";
    clearLeaderBoards.style.border = "none";
    clearLeaderBoards.style.padding = "5px";
    clearLeaderBoards.style.backgroundColor = "#FF02CB";
    clearLeaderBoards.style.color = "black";
    clearLeaderBoards.style.fontWeight = "bold";
    clearLeaderBoards.innerHTML = "Clear leaderboards";
    highScoresListContainer.appendChild(clearLeaderBoards);
    
    //Listen for clear local storage
    var newCLSBut = document.getElementById("clearLead").addEventListener("click",function(){
        localStorage.clear();
    });
}


//Reset the quiz to main menu
function restartQuiz(){
    location.reload();
}


