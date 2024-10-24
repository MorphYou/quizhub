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
    time = parseInt(idQuiz.timeout);
}

document.querySelector("#title-exam").innerHTML = idQuiz.name;
document.querySelector("#questions").innerHTML = idQuiz.questions.length+" quests";

document.querySelector("#randomOneQuest").addEventListener("click", randomOneQuest);
document.querySelector("#answerQuest").addEventListener("click", Quest);

function randomOneQuest(){
    let divC, divD;
    let randomQuest = Math.floor(Math.random() * idQuiz.questions.length);

    document.querySelector("#answerQuest").removeEventListener("click", Quest);

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
            question.innerText = idQuiz.questions[randomQuest][0];
    
        let divA = document.createElement("div");
        divA.classList.add("answerDiv");
        divA.setAttribute("id", "diva");
        let inputA = document.createElement("input");
        inputA.setAttribute("type", "checkbox");
        inputA.setAttribute("id", "aC");
        inputA.setAttribute("name", "aC");
        inputA.setAttribute("value", "a");
        let answerA = document.createElement("p");
            answerA.classList.add("answer");
            answerA.setAttribute("id", "a");
            answerA.innerText ="A: "+idQuiz.questions[randomQuest][1];
    
        let divB = document.createElement("div");
        divB.classList.add("answerDiv");
        divB.setAttribute("id", "divb");
        let inputB = document.createElement("input");
        inputB.setAttribute("type", "checkbox");
        inputB.setAttribute("id", "bC");
        inputB.setAttribute("name", "bC");
        inputB.setAttribute("value", "b");
        let answerB = document.createElement("p");
            answerB.classList.add("answer");
            answerB.setAttribute("id", "b");
            answerB.innerText ="B: "+idQuiz.questions[randomQuest][2];

        parent.appendChild(divAddQuestion);
        divAddQuestion.appendChild(question)
        divAddQuestion.appendChild(divA);
        divA.appendChild(inputA);
        divA.appendChild(answerA);
        divAddQuestion.appendChild(divB);
        divB.appendChild(inputB);
        divB.appendChild(answerB);

        if(idQuiz.questions[randomQuest][3] !== null){
            divC = document.createElement("div");
            divC.classList.add("answerDiv");
            divC.setAttribute("id", "divc");
            let inputC = document.createElement("input");
            inputC.setAttribute("type", "checkbox");
            inputC.setAttribute("id", "cC");
            inputC.setAttribute("name", "cC");
            inputC.setAttribute("value", "c");
            let answerC = document.createElement("p");
                answerC.classList.add("answer");
                answerC.setAttribute("id", "c");
                answerC.innerText ="C: "+idQuiz.questions[randomQuest][3];
                divAddQuestion.appendChild(divC);
            divC.appendChild(inputC);
            divC.appendChild(answerC);
        }
    
        if(idQuiz.questions[randomQuest][4] !== null){
            divD = document.createElement("div");
            divD.classList.add("answerDiv");
            divD.setAttribute("id", "divd");
            let inputD = document.createElement("input");
            inputD.setAttribute("type", "checkbox");
            inputD.setAttribute("id", "dC");
            inputD.setAttribute("name", "dC");
            inputD.setAttribute("value", "d");
            let answerD = document.createElement("p");
                answerD.classList.add("answer");
                answerD.setAttribute("id", "d");
                answerD.innerText ="D: "+idQuiz.questions[randomQuest][4];
                divAddQuestion.appendChild(divD);
            divD.appendChild(inputD);
            divD.appendChild(answerD);
        }

        function checkAnswer(){
            let corrects = 0, goResult = true;
            if((document.querySelector("#aC") !== null && document.querySelector("#aC").checked) || (document.querySelector("#bC") !== null && document.querySelector("#bC").checked) || (document.querySelector("#cC") !== null && document.querySelector("#cC").checked) || (document.querySelector("#dC") !== null && document.querySelector("#dC").checked)){
                if(document.querySelector("#aC").value == idQuiz.questions[randomQuest][5][0]){
                    corrects++;
                }else if(document.querySelector("#aC").checked){
                    corrects = -100;
                }
                if(document.querySelector("#bC").value == idQuiz.questions[randomQuest][5][1]){
                    corrects++;
                }else if(document.querySelector("#bC").checked){
                    corrects = -100;
                }
                if(idQuiz.questions[randomQuest][5][2] !== null){
                    if(document.querySelector("#cC").value == idQuiz.questions[randomQuest][5][2]){
                        corrects++;
                    }else if(document.querySelector("#cC").checked){
                        corrects = -100;
                    }
                }
                if(idQuiz.questions[randomQuest][5][3] !== null){
                    if(document.querySelector("#dC").value == idQuiz.questions[randomQuest][5][3]){
                        corrects++;
                    }else if(document.querySelector("#dC").checked){
                        corrects = -100;
                    }
                }
            }else{
                alert("Zaznacz prawidłowe odpowiedzi!");
                goResult = false;
            }

            if(goResult){
                result();
            }

            function result(){
                document.querySelector(".add-question").remove();
                document.querySelector("#add-quiz-container").remove();
    
                if(corrects > 0){
                    let i = document.createElement("i");
                        i.classList.add("great");
                        i.classList.add("fa-solid");
                        i.classList.add("fa-check");
                    
                    let p = document.createElement("p");
                        p.innerText = "Odpowiedz poprawna.";
                        document.querySelector("#add-container").appendChild(i);
                        document.querySelector("#add-container").appendChild(p);
                }else{
                    let i = document.createElement("i");
                        i.classList.add("bad");
                        i.classList.add("fa-solid");
                        i.classList.add("fa-x");
                    
                    let p = document.createElement("p");
                        p.innerText = "Odpowiedz nie poprawna.";
                        document.querySelector("#add-container").appendChild(i);
                        document.querySelector("#add-container").appendChild(p);
                }
            }
        }
    }

function Quest(){
    document.querySelector("#answerQuest").removeEventListener("click", Quest);
    let answers = Array();
    if(time != 0){
        timerLet = setInterval(timer, 1000);
    }
    document.querySelector("#nav-exam").remove();
    document.querySelector("#randomOneQuest").remove();
    let checkQuest = document.querySelector("#answerQuest");
    checkQuest.innerHTML = "Sprawdz quiz";
    checkQuest.addEventListener("click", checkAnswer);

    let parent = document.querySelector("#add-container");

    let divTimer = document.createElement("div");
    let pTimer = document.createElement("p");
    if(time == 0){
        pTimer.innerText = "Brak ograniczenia czasowego.";
    }else{
        pTimer.innerText = time;
    }
    

    parent.appendChild(divTimer);
    divTimer.appendChild(pTimer);

    let lQuests = 1;

    idQuiz.questions.forEach(quest => {
        let parent = document.querySelector("#add-container");
    
        let divAddQuestion = document.createElement("div");
            divAddQuestion.classList.add("add-question");

    let question = document.createElement("h2");
        question.classList.add("question");
        question.innerText = "#"+lQuests+": "+quest[0];

    let divA = document.createElement("div");
    divA.classList.add("answerDiv");
    divA.setAttribute("id", "diva");
    let inputA = document.createElement("input");
    inputA.setAttribute("type", "checkbox");
    inputA.setAttribute("id", "aC");
    inputA.setAttribute("name", "aC");
    inputA.setAttribute("value", "a");
    let answerA = document.createElement("p");
        answerA.classList.add("answer");
        answerA.setAttribute("id", "a");
        answerA.innerText ="A: "+quest[1];

    let divB = document.createElement("div");
    divB.classList.add("answerDiv");
    divB.setAttribute("id", "divb");
    let inputB = document.createElement("input");
    inputB.setAttribute("type", "checkbox");
    inputB.setAttribute("id", "bC");
    inputB.setAttribute("name", "bC");
    inputB.setAttribute("value", "b");
    let answerB = document.createElement("p");
        answerB.classList.add("answer");
        answerB.setAttribute("id", "b");
        answerB.innerText ="B: "+quest[2];

    parent.appendChild(divAddQuestion);
    divAddQuestion.appendChild(question)
    divAddQuestion.appendChild(divA);
    divA.appendChild(inputA);
    divA.appendChild(answerA);
    divAddQuestion.appendChild(divB);
    divB.appendChild(inputB);
    divB.appendChild(answerB);

    if(quest[3] !== null){
        divC = document.createElement("div");
        divC.classList.add("answerDiv");
        divC.setAttribute("id", "divc");
        let inputC = document.createElement("input");
        inputC.setAttribute("type", "checkbox");
        inputC.setAttribute("id", "cC");
        inputC.setAttribute("name", "cC");
        inputC.setAttribute("value", "c");
        let answerC = document.createElement("p");
            answerC.classList.add("answer");
            answerC.setAttribute("id", "c");
            answerC.innerText ="C: "+quest[3];
            divAddQuestion.appendChild(divC);
        divC.appendChild(inputC);
        divC.appendChild(answerC);
    }

    if(quest[4] !== null){
        divD = document.createElement("div");
        divD.classList.add("answerDiv");
        divD.setAttribute("id", "divd");
        let inputD = document.createElement("input");
        inputD.setAttribute("type", "checkbox");
        inputD.setAttribute("id", "dC");
        inputD.setAttribute("name", "dC");
        inputD.setAttribute("value", "d");
        let answerD = document.createElement("p");
            answerD.classList.add("answer");
            answerD.setAttribute("id", "d");
            answerD.innerText ="D: "+quest[4];
            divAddQuestion.appendChild(divD);
        divD.appendChild(inputD);
        divD.appendChild(answerD);
    }
    answers.push(divAddQuestion);
        lQuests++;
    });

    function checkAnswer(){
        let corrects = 0, lTemp = 0, goResult = true;
        idQuiz.questions.forEach(quest => {
            if((answers[lTemp].children.diva.children.aC.checked) || (answers[lTemp].children.divb.children.bC.checked) || (answers[lTemp].children.divc.children.cC.checked) || (answers[lTemp].children.divd.children.dC.checked)){
                if(answers[lTemp].children.diva.children.aC.value == quest[5][0] && answers[lTemp].children.diva.children.aC.checked){
                    corrects++;
                }else if(answers[lTemp].children.diva.children.aC.checked){
                    corrects--;
                }
                if(answers[lTemp].children.divb.children.bC.value == quest[5][1] && answers[lTemp].children.divb.children.bC.checked){
                    corrects++;
                }else if(answers[lTemp].children.divb.children.bC.checked){
                    corrects--;
                }
                if(quest[5][2] !== null){
                    if(answers[lTemp].children.divc.children.cC.value == quest[5][2] && answers[lTemp].children.divc.children.cC.checked){
                        corrects++;
                    }else if(answers[lTemp].children.divc.children.cC.checked){
                        corrects--;
                    }
                }
                if(quest[5][3] !== null){
                    if(answers[lTemp].children.divd.children.dC.value == quest[5][3] && answers[lTemp].children.divd.children.dC.checked){
                        corrects++;
                    }else if(answers[lTemp].children.divd.children.dC.checked){
                        corrects--;
                    }
                }
            }else{
                alert("Zaznacz prawidłowe odpowiedzi!");
                goResult = false;
            }
            lTemp++;
        });

        if(goResult){
            result();
        }

        function result(){
            let end = document.createElement("p");
            let odp = 0;
            idQuiz.questions.forEach(questt => {
                for (let index = 0; index < 3; index++) {
                    if(questt[5][index] !== null){
                        odp++;
                    } 
                }
            })
            if(idQuiz.timeout != 0){
                end.innerText = "Czas: "+parseInt(idQuiz.timeout - time)+"s odpowiedzi: "+corrects+"/"+odp;
            }else{
                end.innerText = "Odpowiedzi: "+corrects+"/"+odp;
            }
    
            clearInterval(timerLet);
            document.querySelector("#add-container").remove();
            document.querySelector("#add-quiz-container").remove();
            document.querySelector("#buttons").appendChild(end);
        }
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

