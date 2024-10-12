localStorage.removeItem("editQuiz");

//Zmienne
let quizy = new Array();
let categories = new Array();
let categoryTemp = "Wszystkie";
let orderQuizTemp = true;

if(localStorage.getItem("quizy")){
    quizy = JSON.parse(localStorage.getItem("quizy"));
}
if(localStorage.getItem("categories")){
     categories = JSON.parse(localStorage.getItem("categories"));
 
 }

//funkcje

function updateQuizList(category){
     if(quizy.length > 0){

          let parent = document.querySelector("main");

          if(!document.querySelector("#quiz-container-nav")){
               let divQuizContainerNav = document.createElement("div");
               divQuizContainerNav.setAttribute("id", "quiz-container-nav");
     
               let divNavItemsContainer = document.createElement("div");
               divNavItemsContainer.setAttribute("id", "nav-items-container");
     
               parent.appendChild(divQuizContainerNav);
               divQuizContainerNav.appendChild(divNavItemsContainer);
     
               categories.unshift("Wszystkie");

               categories.forEach(category => {
                    let divNavItem = document.createElement("div");
                    divNavItem.classList.add("nav-item");
                    divNavItem.addEventListener("click", changeQuizList);
     
                    let pNavItem = document.createElement("p");
                    pNavItem.innerText = category;
     
                    divNavItemsContainer.appendChild(divNavItem);
                    divNavItem.appendChild(pNavItem);
               });
          }

          if(document.querySelector("#quiz-container")){
               document.querySelector("#quiz-container").remove();
          }
          let divQuizContainer = document.createElement("div");
          divQuizContainer.setAttribute("id", "quiz-container")

          parent.appendChild(divQuizContainer);

          let quizyTemp = new Array();

          if(category == "Wszystkie"){
               quizyTemp = quizy;
          }else{
               quizy.forEach(quiz => {
                    if(quiz.category == category){
                         quizyTemp.push(quiz);
                    }
               })  
          }

          if(orderQuizTemp){
               quizyTemp.sort((a, b) => a.name.localeCompare(b.name));
          }else{
               quizyTemp.sort((a, b) => b.name.localeCompare(a.name));
          }
          

          quizyTemp.forEach(quiz => {
               let divQuiz = document.createElement("div");
               divQuiz.classList.add("quiz");

               let divNavQuiz = document.createElement("div");
               divNavQuiz.classList.add("nav-quiz");

               let divId = document.createElement("div");

               let divIdP = document.createElement("p");
               divIdP.innerText = "#"+quizy.indexOf(quiz);

               let divAction = document.createElement("div");
               
               //edit delete
               let divActionP1 = document.createElement("i");
               divActionP1.classList.add("fa-solid");
               divActionP1.classList.add("fa-pen-to-square");
               divActionP1.addEventListener("click", editQuiz);

               let divActionP2 = document.createElement("i");
               divActionP2.classList.add("fa-solid");
               divActionP2.classList.add("fa-trash-can");
               divActionP2.addEventListener("click", deleteQuiz);

               let divDate = document.createElement("div");
               divDate.classList.add("date");

               let divDateP = document.createElement("p");
               let quizDate = new Date(quiz.date);
               divDateP.innerText = ((quizDate.getDate() < 10) ? '0' : '')+""+quizDate.getDate()+"-"+((parseInt((quizDate.getMonth())+1) < 10) ? '0' : '')+""+parseInt((quizDate.getMonth())+1)+"-"+quizDate.getFullYear();

               let divTitle = document.createElement("div");
               divTitle.classList.add("title");

               let divTitleH3 = document.createElement("h3");
               divTitleH3.innerText = quiz.name;

               let divCategory = document.createElement("div");
               divCategory.classList.add("category");

               let divCategoryP1 = document.createElement("p");
               divCategoryP1.innerText = "Kategoria";

               let divCategoryP2 = document.createElement("p");
               divCategoryP2.innerText = quiz.category;

               let divTimeout = document.createElement("div");
               divTimeout.classList.add("timeout");

               let divTmieoutP1 = document.createElement("p");
               divTmieoutP1.innerText = "Czas";

               let divTmieoutP2 = document.createElement("p");
               divTmieoutP2.innerText = (quiz.timeout == 0) ? "Brak ogran." : quiz.timeout+"s";

               let divQuestions = document.createElement("div");
               divQuestions.classList.add("questions");

               let divQuestionsP1 = document.createElement("p");
               divQuestionsP1.innerText = "Ilośc pytań";

               let divQuestionsP2 = document.createElement("p");
               divQuestionsP2.innerText = quiz.questions.length;

               let divAuthor = document.createElement("div");
               divAuthor.classList.add("author");

               let divAuthorP1 = document.createElement("p");
               divAuthorP1.innerText = "autor";

               let divAuthorP2 = document.createElement("p");
               divAuthorP2.innerText = quiz.author;

               let check = document.createElement("p");
               check.innerText = "Spróbuj";
               check.classList.add("check");
               check.addEventListener("click", exam);

               divQuizContainer.appendChild(divQuiz);
               divQuiz.appendChild(divNavQuiz);
               divNavQuiz.appendChild(divId);
               divId.appendChild(divIdP);
               divNavQuiz.appendChild(divAction);
               divAction.appendChild(divActionP1);
               divAction.appendChild(divActionP2);
               divQuiz.appendChild(divDate);
               divDate.appendChild(divDateP);
               divQuiz.appendChild(divTitle);
               divTitle.appendChild(divTitleH3);
               divQuiz.appendChild(divCategory);
               divCategory.appendChild(divCategoryP1);
               divCategory.appendChild(divCategoryP2);
               divQuiz.appendChild(divTimeout);
               divTimeout.appendChild(divTmieoutP1);
               divTimeout.appendChild(divTmieoutP2);
               divQuiz.appendChild(divQuestions);
               divQuestions.appendChild(divQuestionsP1);
               divQuestions.appendChild(divQuestionsP2);

               divQuiz.appendChild(divAuthor);
               divAuthor.appendChild(divAuthorP1);
               divAuthor.appendChild(divAuthorP2);
               divQuiz.appendChild(check);

               function deleteQuiz(){
                    quizy.splice(quizy.indexOf(quiz), 1);
                    localStorage.setItem("quizy", JSON.stringify(quizy));
                    updateQuizList(categoryTemp);
               }

               function editQuiz(){
                    localStorage.setItem("editQuiz", JSON.stringify(quizy.indexOf(quiz)));
                    console.log(quizy.indexOf(quiz));
                    window.location.replace("edit-quiz.html");
               }

               function exam(){
                    localStorage.setItem("exam", JSON.stringify(quizy.indexOf(quiz)));
                    window.location.replace("exam.html");
               }
          });
     }else{
          if(document.querySelector("#quiz-container-nav")){
               document.querySelector("#quiz-container-nav").remove();
          }
          if(document.querySelector("#quiz-container")){
               document.querySelector("#quiz-container").remove();
          }


          let parent = document.querySelector("main");

          let divQuizContainer = document.createElement("div");
          divQuizContainer.setAttribute("id", "quiz-container")

          let divNone = document.createElement("div");
          divNone.setAttribute("id", "none-quiz");

          let divNoneH1 = document.createElement("h1");
          divNoneH1.innerText = "Brak Quizów";

          parent.appendChild(divQuizContainer);
          divQuizContainer.appendChild(divNone);
          divNone.appendChild(divNoneH1);
     }
}

function changeQuizList(e){
     if(categoryTemp == e.target.innerText){
          if(orderQuizTemp){
               orderQuizTemp = false;
          }else{
               orderQuizTemp = true;
          }
     }
     updateQuizList(e.target.innerText);
     categoryTemp = e.target.innerText;
}

updateQuizList(categoryTemp);


//Tworzenie testow !
//Usuwanie testow!
//Edycja testow!
//katalog z testami podzial na kategorie sortowanie!
//Rozwiazywanie testow!
//losowanie 1 pytania z testu!