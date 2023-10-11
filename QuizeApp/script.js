const questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            {text: "Object-Oriented", correct: false},
            {text: "Object-Based", correct: false},
            {text: "Procedural", correct: true},
            {text: "None of the above", correct: false},
        ]
    },

    {
        question: "Which of the following keywords is used to define a variable in Javascript?",
        answers: [
            {text: "Var", correct: true},
            {text: "Let", correct: false},
            {text: "Both", correct: false},
            {text: "None of the above", correct: false},
        ]  
    },

    {
        question: "Which of the following methods is used to access HTML elements using Javascript?",
        answers: [
            {text: "getElementById", correct: false},
            {text: "getElementByClassName", correct: false},
            {text: "Both", correct: false},
            {text: "None of the above", correct: true},
        ]  
    },

    {
        question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
        answers: [
            {text: "Throws an error", correct: false},
            {text: "Ignores the statement", correct: true},
            {text: "Gives a warning", correct: false},
            {text: "None of the above", correct: false},
        ]  
    },
];

const question = document.querySelector('#question');
const answer_button = document.querySelector('#answer-button');
const next_button = document.querySelector('#next-button');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0; 
    next_button.innerHTML = 'Next';
    showQuiz();
}

function showQuiz(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    console.log(currentQuestion);
    let questionNo = currentQuestionIndex+1;
    console.log(questionNo);

    question.innerHTML = questionNo + '. '+ currentQuestion.question;

    currentQuestion.answers.forEach(answer=>{  
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answer_button.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    next_button.style.display = "none";
    while(answer_button.firstChild){
        answer_button.removeChild(answer_button.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect"); 
    }
    Array.from(answer_button.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    next_button.style.display = "block";
}

function showScore(){
    resetState();
    question.innerHTML = `You scored ${score} out of ${questions.length}!`;
    next_button.innerHTML = 'Play Again';
    next_button.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuiz();
    }else{
        showScore();
    }
}

next_button.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz() 
    }
})
startQuiz()