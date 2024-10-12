let idQuiz, answerA, answerB, answerC, answerD, optionA, optionB, optionC, optionD, timerLet;
let quizy = new Array();

if(localStorage.getItem("exam")){
    idQuiz = JSON.parse(localStorage.getItem("exam"));
    localStorage.removeItem("exam");
}else{
    window.location.replace("index.html");
}

if(localStorage.getItem("quizy")){
    quizy = JSON.parse(localStorage.getItem("quizy"));
    time = parseInt(quizy[idQuiz].timeout);
}

document.querySelector("#title-exam").innerHTML = quizy[idQuiz].name;
document.querySelector("#questions").innerHTML = quizy[idQuiz].questions.length+" quests";

document.querySelector("#randomOneQuest").addEventListener("click", randomOneQuest);
document.querySelector("#answerQuest").addEventListener("click", Quest);

function randomOneQuest(){
    let randomQuest = Math.floor(Math.random() * quizy[idQuiz].questions.length);

    document.querySelector("#nav-exam").remove();
    document.querySelector("#randomOneQuest").remove();
    let checkQuest = document.querySelector("#answerQuest");
    checkQuest.innerHTML = "Sprawdz pytanie";
    checkQuest.addEventListener("click", checkAnswer);

        let parent = document.querySelector("#add-container");
    
        let divAddQuestion = document.createElement("div");
            divAddQuestion.classList.add("add-question");
        
        let question = document.createElement("h2");
            question.classList.add("question");
            question.innerText = quizy[idQuiz].questions[randomQuest][0];
    
        answerA = document.createElement("p");
            answerA.classList.add("answer");
            answerA.innerText ="A: "+quizy[idQuiz].questions[randomQuest][1];
    
        answerB = document.createElement("p");
            answerB.classList.add("answer");
            answerB.innerText = "B: "+quizy[idQuiz].questions[randomQuest][2];
    
        if(quizy[idQuiz].questions[randomQuest][3] != ""){
            answerC = document.createElement("p");
            answerC.classList.add("answer");
            answerC.innerText = "C: "+quizy[idQuiz].questions[randomQuest][3];
        }
        if(quizy[idQuiz].questions[randomQuest][4] != ""){
            answerD = document.createElement("p");
            answerD.classList.add("answer");
            answerD.innerText = "D: "+quizy[idQuiz].questions[randomQuest][4];
        }
    
        let correctAnswer = document.createElement("select");
            correctAnswer.classList.add("answer");
            correctAnswer.setAttribute("name", "correct");
            correctAnswer.setAttribute("id", "correct");
            correctAnswer.setAttribute("placeholder", "Poprawna odpowiedź");
    
        optionA = document.createElement("option");
            optionA.setAttribute("value", "a");
            optionA.innerText = "a";
        optionB = document.createElement("option");
            optionB.setAttribute("value", "b");
            optionB.innerText = "b";
        if(quizy[idQuiz].questions[randomQuest][3] != ""){
            optionC = document.createElement("option");
            optionC.setAttribute("value", "c");
            optionC.innerText = "c";
        }
        if(quizy[idQuiz].questions[randomQuest][4] != ""){
            optionD = document.createElement("option");
            optionD.setAttribute("value", "d");
            optionD.innerText = "d";
        }
        parent.appendChild(divAddQuestion);
        divAddQuestion.appendChild(question);
        divAddQuestion.appendChild(answerA);
        divAddQuestion.appendChild(answerB);
        if(quizy[idQuiz].questions[randomQuest][3] != ""){
            divAddQuestion.appendChild(answerC);
        }
        if(quizy[idQuiz].questions[randomQuest][4] != ""){
            divAddQuestion.appendChild(answerD);
        }
        divAddQuestion.appendChild(correctAnswer);
        correctAnswer.appendChild(optionA);
        correctAnswer.appendChild(optionB);
        if(quizy[idQuiz].questions[randomQuest][3] != ""){
            correctAnswer.appendChild(optionC);
        }
        if(quizy[idQuiz].questions[randomQuest][4] != ""){
            correctAnswer.appendChild(optionD);
        }
        function checkAnswer(){
            let corrects;
            document.querySelector(".add-question").remove();
            document.querySelector("#add-quiz-container").remove();
            if(correctAnswer.value == quizy[idQuiz].questions[randomQuest][5]){
                corrects = 1;
            }

            if(corrects > 0){
                let i = document.createElement("i");
                    i.classList.add("great");
                    i.classList.add("fa-solid");
                    i.classList.add("fa-check");
                
                let p = document.createElement("p");
                    p.innerText = "Odpowiedz poprawna";
                    document.querySelector("#add-container").appendChild(i);
                    document.querySelector("#add-container").appendChild(p);
            }
        }
    }

function Quest(){
    let answers = Array();

    timerLet = setInterval(timer, 1000);
    document.querySelector("#nav-exam").remove();
    document.querySelector("#randomOneQuest").remove();
    let checkQuest = document.querySelector("#answerQuest");
    checkQuest.innerHTML = "Sprawdz quiz";
    checkQuest.addEventListener("click", checkAnswer);

    let parent = document.querySelector("#add-container");

    let divTimer = document.createElement("div");
    let pTimer = document.createElement("p");
    pTimer.innerText = time;

    parent.appendChild(divTimer);
    divTimer.appendChild(pTimer);

    let lQuests = 1;

    quizy[idQuiz].questions.forEach(quest => {
        let parent = document.querySelector("#add-container");
    
        let divAddQuestion = document.createElement("div");
            divAddQuestion.classList.add("add-question");
        
        let question = document.createElement("h2");
            question.classList.add("question");
            question.innerText = "#"+lQuests+": "+quest[0];
    
        answerA = document.createElement("p");
            answerA.classList.add("answer");
            answerA.innerText ="A: "+quest[1];
    
        answerB = document.createElement("p");
            answerB.classList.add("answer");
            answerB.innerText = "B: "+quest[2];
    
        if(quest[3] != ""){
            answerC = document.createElement("p");
            answerC.classList.add("answer");
            answerC.innerText = "C: "+quest[3];
        }
        if(quest[4] != ""){
            answerD = document.createElement("p");
            answerD.classList.add("answer");
            answerD.innerText = "D: "+quest[4];
        }
    
        let correctAnswer = document.createElement("select");
            correctAnswer.classList.add("answer");
            correctAnswer.setAttribute("name", "correct");
            correctAnswer.setAttribute("id", "correct");
            correctAnswer.setAttribute("placeholder", "Poprawna odpowiedź");
            answers.push(correctAnswer);
    
        optionA = document.createElement("option");
            optionA.setAttribute("value", "a");
            optionA.innerText = "a";
        optionB = document.createElement("option");
            optionB.setAttribute("value", "b");
            optionB.innerText = "b";
        if(quest[3] != ""){
            optionC = document.createElement("option");
            optionC.setAttribute("value", "c");
            optionC.innerText = "c";
        }
        if(quest[4] != ""){
            optionD = document.createElement("option");
            optionD.setAttribute("value", "d");
            optionD.innerText = "d";
        }
        parent.appendChild(divAddQuestion);
        divAddQuestion.appendChild(question);
        divAddQuestion.appendChild(answerA);
        divAddQuestion.appendChild(answerB);
        if(quest[3] != ""){
            divAddQuestion.appendChild(answerC);
        }
        if(quest[4] != ""){
            divAddQuestion.appendChild(answerD);
        }
        divAddQuestion.appendChild(correctAnswer);
        correctAnswer.appendChild(optionA);
        correctAnswer.appendChild(optionB);
        if(quest[3] != ""){
            correctAnswer.appendChild(optionC);
        }
        if(quest[4] != ""){
            correctAnswer.appendChild(optionD);
        }
        lQuests++;
    });

    function checkAnswer(){
        clearInterval(timerLet);
        let corrects = 0;
        document.querySelector("#add-container").remove();
        document.querySelector("#add-quiz-container").remove();

        let lTemp = 0;
        quizy[idQuiz].questions.forEach(quest => {
            if(quest[5] == answers[lTemp].value){
                corrects++;
            }
            lTemp++;
        });
        
        let end = document.createElement("p");
            end.innerText = "Czas: "+parseInt(quizy[idQuiz].timeout - time)+"s odpowiedzi: "+corrects+"/"+quizy[idQuiz].questions.length;
            
            document.querySelector("#buttons").appendChild(end);
    }

    function timer(){
        if(time > 0){
            time = time-1;
            pTimer.innerText = time;
        }else{
            clearInterval(timerLet);
            document.querySelector("#add-container").remove();
            document.querySelector("#buttons").remove();
            let end = document.createElement("p");
            end.innerText = "Czas minął!";
            document.querySelector("main").appendChild(end);
        }
    }
}

