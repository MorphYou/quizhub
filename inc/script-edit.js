
let idQuizEdit;
let quizy = new Array();
let questionsTemp = new Array();
let categories = new Array();

if(localStorage.getItem("editQuiz")){
    idQuizEdit = JSON.parse(localStorage.getItem("editQuiz"));
    localStorage.removeItem("editQuiz");
}else{
    window.location.replace("index.html");
}

if(localStorage.getItem("quizy")){
    quizy = JSON.parse(localStorage.getItem("quizy"));
}

if(localStorage.getItem("categories")){
    categories = JSON.parse(localStorage.getItem("categories"));
}

let parent = document.querySelector("#add-container");

document.querySelector("#next-question p").addEventListener("click", addQuestionInputs);
document.querySelector("#add-quiz-btn").addEventListener("click", addQuiz);

document.querySelector("#name").value = quizy[idQuizEdit].name;
document.querySelector("#author").value = quizy[idQuizEdit].author;
document.querySelector("#category").value = quizy[idQuizEdit].category;
document.querySelector("#timeout").value = quizy[idQuizEdit].timeout;


quizy[idQuizEdit].questions.forEach(quest => {
    let divAddQuestion = document.createElement("div");
        divAddQuestion.classList.add("add-question");
    
    let question = document.createElement("textarea");
        question.classList.add("question");
        question.setAttribute("name", "question");
        question.setAttribute("id", "question");
        question.setAttribute("placeholder", "Treść pytania");
        question.innerText = quest[0];

    let answerA = document.createElement("textarea");
        answerA.classList.add("answer");
        answerA.setAttribute("name", "a");
        answerA.setAttribute("id", "a");
        answerA.setAttribute("placeholder", "Odpowiedź a");
        answerA.innerText = quest[1];

    let answerB = document.createElement("textarea");
        answerB.classList.add("answer");
        answerB.setAttribute("name", "b");
        answerB.setAttribute("id", "b");
        answerB.setAttribute("placeholder", "Odpowiedź b");
        answerB.innerText = quest[2];

    let answerC = document.createElement("textarea");
        answerC.classList.add("answer");
        answerC.setAttribute("name", "c");
        answerC.setAttribute("id", "c");
        answerC.setAttribute("placeholder", "Odpowiedź c, pozostaw puste jeśli nie ma więcej odpowiedzi");
        answerC.innerText = quest[3];

    let answerD = document.createElement("textarea");
        answerD.classList.add("answer");
        answerD.setAttribute("name", "d");
        answerD.setAttribute("id", "d");
        answerD.setAttribute("placeholder", "Odpowiedź d, pozostaw puste jeśli nie ma więcej odpowiedzi");
        answerD.innerText = quest[4];

    let correctAnswer = document.createElement("select");
        correctAnswer.classList.add("answer");
        correctAnswer.setAttribute("name", "correct");
        correctAnswer.setAttribute("id", "correct");
        correctAnswer.setAttribute("placeholder", "Poprawna odpowiedź");
        correctAnswer.value = quest[5];

    let optionA = document.createElement("option");
        optionA.setAttribute("value", "a");
        optionA.innerText = "a";
    let optionB = document.createElement("option");
        optionB.setAttribute("value", "b");
        optionB.innerText = "b";
    let optionC = document.createElement("option");
        optionC.setAttribute("value", "c");
        optionC.innerText = "c";
    let optionD = document.createElement("option");
        optionD.setAttribute("value", "d");
        optionD.innerText = "d";

    parent.appendChild(divAddQuestion);
    divAddQuestion.appendChild(question);
    divAddQuestion.appendChild(answerA);
    divAddQuestion.appendChild(answerB);
    divAddQuestion.appendChild(answerC);
    divAddQuestion.appendChild(answerD);
    divAddQuestion.appendChild(correctAnswer);
    divAddQuestion.appendChild(correctAnswer);
        correctAnswer.appendChild(optionA);
        correctAnswer.appendChild(optionB);
        correctAnswer.appendChild(optionC);
        correctAnswer.appendChild(optionD);

    questionsTemp[questionsTemp.length] = divAddQuestion;
});

function addQuestionInputs(){
    let parent = document.querySelector("#add-container");

    let divAddQuestion = document.createElement("div");
        divAddQuestion.classList.add("add-question");
    
    let question = document.createElement("textarea");
        question.classList.add("question");
        question.setAttribute("name", "question");
        question.setAttribute("id", "question");
        question.setAttribute("placeholder", "Treść pytania");

    let answerA = document.createElement("textarea");
        answerA.classList.add("answer");
        answerA.setAttribute("name", "a");
        answerA.setAttribute("id", "a");
        answerA.setAttribute("placeholder", "Odpowiedź a");

    let answerB = document.createElement("textarea");
        answerB.classList.add("answer");
        answerB.setAttribute("name", "b");
        answerB.setAttribute("id", "b");
        answerB.setAttribute("placeholder", "Odpowiedź b");

    let answerC = document.createElement("textarea");
        answerC.classList.add("answer");
        answerC.setAttribute("name", "c");
        answerC.setAttribute("id", "c");
        answerC.setAttribute("placeholder", "Odpowiedź c, pozostaw puste jeśli nie ma więcej odpowiedzi");

    let answerD = document.createElement("textarea");
        answerD.classList.add("answer");
        answerD.setAttribute("name", "d");
        answerD.setAttribute("id", "d");
        answerD.setAttribute("placeholder", "Odpowiedź d, pozostaw puste jeśli nie ma więcej odpowiedzi");

    let correctAnswer = document.createElement("input");
        correctAnswer.classList.add("answer");
        correctAnswer.setAttribute("name", "correct");
        correctAnswer.setAttribute("id", "correct");
        correctAnswer.setAttribute("list", "corrects");
        correctAnswer.setAttribute("placeholder", "Poprawna odpowiedź");

    let dataListCorrect = document.createElement("datalist");
        dataListCorrect.setAttribute("id", "corrects");

    let optionA = document.createElement("option");
        optionA.setAttribute("value", "a");
    let optionB = document.createElement("option");
        optionB.setAttribute("value", "b");
    let optionC = document.createElement("option");
        optionC.setAttribute("value", "c");
    let optionD = document.createElement("option");
        optionD.setAttribute("value", "d");

    parent.appendChild(divAddQuestion);
    divAddQuestion.appendChild(question);
    divAddQuestion.appendChild(answerA);
    divAddQuestion.appendChild(answerB);
    divAddQuestion.appendChild(answerC);
    divAddQuestion.appendChild(answerD);
    divAddQuestion.appendChild(correctAnswer);
    divAddQuestion.appendChild(dataListCorrect);
    dataListCorrect.appendChild(optionA);
    dataListCorrect.appendChild(optionB);
    dataListCorrect.appendChild(optionC);
    dataListCorrect.appendChild(optionD);

    questionsTemp[questionsTemp.length] = divAddQuestion;
}

function addQuiz(){
    let title = document.querySelector("#name");
    let author = document.querySelector("#author");
    let category = document.querySelector("#category");
    let timeout = document.querySelector("#timeout");
    if(title.value !== '' && author.value !== '' && category.value !== '' && (timeout.value !== '' || timeout.value >= 0)){
        let questTemp = [];

        let i = 0;
        questionsTemp.forEach(element => {
            if(element.children.question.value !== '' && element.children.a.value !== '' && element.children.b.value !== ''){
                questTemp[i] = [];
                questTemp[i][0] = element.children.question.value;
                questTemp[i][1] = element.children.a.value;
                questTemp[i][2] = element.children.b.value;
                questTemp[i][3] = element.children.c.value;
                questTemp[i][4] = element.children.d.value;
                questTemp[i][5] = element.children.correct.value;
        
                i++;   
            }
        });
        quizy[idQuizEdit] = new Quiz(title.value, category.value, timeout.value, Date.parse(new Date()), author.value, questTemp);
        localStorage.setItem("quizy", JSON.stringify(quizy));
        window.location.replace("index.html");
    }else{
        alert("Uzupełnij wszsytkie wymagane pola");
    }
}

function loadCategoryList(){
    categories.forEach(element => {
        let option = document.createElement("option");
        option.setAttribute("value", element);
        document.querySelector("#categories").appendChild(option);
    });
}

//Klasy

class Quiz{
    constructor(name, category, timeout, date, author, questions){
        this.name = name;
        this.category = category;
        this.timeout = timeout;
        this.date = date;
        this.author = author;
        this.questions = questions;
    }
}

loadCategoryList()