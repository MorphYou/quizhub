//Zmienne
let quizy = new Array();
let categories = [
    "Filmy",
    "Geografia",
    "Historia",
    "Jedzenie",
    "J.angielski",
    "J.polski",
    "Kultura",
    "Literatura",
    "Medycyna",
    "Muzyka",
    "Nauka",
    "Polityka",
    "Przyroda",
    "Psychologia",
    "Sport",
    "Technologia",
    "Zabawne",
    "Zagadki",
    "Zwierzęta"
];
let questionsTemp = new Array();

if(localStorage.getItem("quizy")){
    quizy = JSON.parse(localStorage.getItem("quizy"));

}


document.querySelector("#next-question p").addEventListener("click", addQuestionInputs);
document.querySelector("#add-quiz-btn").addEventListener("click", addQuiz);

//Funckje

function addQuestionInputs(){
    let parent = document.querySelector("#add-container");

    let divAddQuestion = document.createElement("div");
        divAddQuestion.classList.add("add-question");
    
    let question = document.createElement("textarea");
        question.classList.add("question");
        question.setAttribute("name", "question");
        question.setAttribute("id", "question");
        question.setAttribute("placeholder", "Treść pytania");

    let divA = document.createElement("div");
    divA.classList.add("inputDiv");
    divA.setAttribute("id", "diva");
    let inputA = document.createElement("input");
    inputA.setAttribute("type", "checkbox");
    inputA.setAttribute("id", "aC");
    inputA.setAttribute("name", "aC");
    inputA.setAttribute("value", "a");
    let answerA = document.createElement("textarea");
        answerA.classList.add("answer");
        answerA.setAttribute("name", "a");
        answerA.setAttribute("id", "a");
        answerA.setAttribute("placeholder", "Odpowiedź a");

    let divB = document.createElement("div");
    divB.classList.add("inputDiv");
    divB.setAttribute("id", "divb");
    let inputB = document.createElement("input");
    inputB.setAttribute("type", "checkbox");
    inputB.setAttribute("id", "bC");
    inputB.setAttribute("name", "bC");
    inputB.setAttribute("value", "b");
    let answerB = document.createElement("textarea");
        answerB.classList.add("answer");
        answerB.setAttribute("name", "b");
        answerB.setAttribute("id", "b");
        answerB.setAttribute("placeholder", "Odpowiedź b");

    let divC = document.createElement("div");
    divC.classList.add("inputDiv");
    divC.setAttribute("id", "divc");
    let inputC = document.createElement("input");
    inputC.setAttribute("type", "checkbox");
    inputC.setAttribute("id", "cC");
    inputC.setAttribute("name", "cC");
    inputC.setAttribute("value", "c");
    let answerC = document.createElement("textarea");
        answerC.classList.add("answer");
        answerC.setAttribute("name", "c");
        answerC.setAttribute("id", "c");
        answerC.setAttribute("placeholder", "Odpowiedź c, pozostaw puste jeśli nie ma więcej odpowiedzi");

    let divD = document.createElement("div");
    divD.classList.add("inputDiv");
    divD.setAttribute("id", "divd");
    let inputD = document.createElement("input");
    inputD.setAttribute("type", "checkbox");
    inputD.setAttribute("id", "dC");
    inputD.setAttribute("name", "dC");
    inputD.setAttribute("value", "d");
    let answerD = document.createElement("textarea");
        answerD.classList.add("answer");
        answerD.setAttribute("name", "d");
        answerD.setAttribute("id", "d");
        answerD.setAttribute("placeholder", "Odpowiedź d, pozostaw puste jeśli nie ma więcej odpowiedzi");

    parent.appendChild(divAddQuestion);
    divAddQuestion.appendChild(question)
    divAddQuestion.appendChild(divA);
    divA.appendChild(inputA);
    divA.appendChild(answerA);
    divAddQuestion.appendChild(divB);
    divB.appendChild(inputB);
    divB.appendChild(answerB);
    divAddQuestion.appendChild(divC);
    divC.appendChild(inputC);
    divC.appendChild(answerC);
    divAddQuestion.appendChild(divD);
    divD.appendChild(inputD);
    divD.appendChild(answerD);

    questionsTemp[questionsTemp.length] = divAddQuestion;
}

function loadCategoryList(){
    categories.forEach(element => {
        let option = document.createElement("option");
        option.setAttribute("value", element);
        option.innerText = element;
        document.querySelector("#category").appendChild(option);
    });
}

function addQuiz(){
    let title = document.querySelector("#name");
    let author = document.querySelector("#author");
    let category = document.querySelector("#category");
    let timeout = document.querySelector("#timeout");
    if(title.value !== '' && author.value !== '' && category.value !== '' && (timeout.value !== '' || timeout.value >= 0)){
        let questTemp = [];

        let i = 0;
        let add = "";
        questionsTemp.forEach(element => {
            if(element.children.question.value !== '' && element.children.diva.children.a.value !== '' && element.children.divb.children.b.value !== ''){
                if(element.children.diva.children.aC.checked || element.children.divb.children.bC.checked || element.children.divc.children.cC.checked || element.children.divd.children.dC.checked){
                    questTemp[i] = [];
                    questTemp[i][0] = element.children.question.value;
                    questTemp[i][1] = element.children.diva.children.a.value;
                    questTemp[i][2] = element.children.divb.children.b.value;
                    if(element.children.divc.children.c.value == ''){
                        questTemp[i][3] = null;
                    }else{
                        questTemp[i][3] = element.children.divc.children.c.value;
                    }
                    if(element.children.divd.children.d.value == ''){
                        questTemp[i][4] = null;
                    }else{
                        questTemp[i][4] = element.children.divd.children.d.value;;
                    }
                    questTemp[i][5] = new Array();
                    if(element.children.diva.children.aC.checked){
                        questTemp[i][5][0] = (element.children.diva.children.aC.value);
                    }else{
                        questTemp[i][5][0] = null;
                    }
                    if(element.children.divb.children.bC.checked){
                        questTemp[i][5][1] = (element.children.divb.children.bC.value);
                    }else{
                        questTemp[i][5][1] = null;
                    }
                    if(element.children.divc.children.cC.checked){
                        questTemp[i][5][2] = (element.children.divc.children.cC.value);
                    }else{
                        questTemp[i][5][2] = null;
                    }
                    if(element.children.divd.children.dC.checked){
                        questTemp[i][5][3] = (element.children.divd.children.dC.value);
                    }else{
                        questTemp[i][5][3] = null;
                    }
            
                    i++;
                }else{
                    add = "Zaznacz poprawne odpowiedzi!";
                }
            }else{
                add = "Uzupełnij wymagane pola quizu!";
            }
        });
        if(add == ""){
            quizy[quizy.length] = new Quiz(title.value, category.value, timeout.value, Date.parse(new Date()), author.value, questTemp);
            localStorage.setItem("quizy", JSON.stringify(quizy));
            window.location.replace("index.html");
        }else{
            alert(add);
        }
    }else{
        alert("Uzupełnij wymagane pola quizu!");
    }
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

addQuestionInputs();
loadCategoryList();

//[["Jaka jest druga litera alfabetu?","a","b","c","d","b"],[]]