const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { question: "Who wrote 'To Kill a Mockingbird'?", options: ["Harper Lee", "J.K. Rowling", "Ernest Hemingway", "Mark Twain"], answer: "Harper Lee" },
    { question: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: "Pacific Ocean" }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    nextButton.disabled = true;
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";
    
    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(option, button);
        optionsElement.appendChild(button);
    });
}

function selectAnswer(option, button) {
    selectedAnswer = option;
    
    // تعطيل جميع الأزرار بعد الاختيار
    const buttons = document.querySelectorAll(".options button");
    buttons.forEach(btn => {
        btn.disabled = true;  // تعطيل الأزرار
        if (btn.textContent === option) {
            btn.style.backgroundColor = "#360061";  // تغيير اللون للإجابة المختارة
        } else {
            btn.style.backgroundColor = "#ccc";  // تغيير اللون للأزرار الأخرى
        }
    });

    nextButton.disabled = false;
}

nextButton.addEventListener("click", () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
        score++;
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    questionElement.textContent = "Quiz Completed!";
    optionsElement.innerHTML = "";
    nextButton.style.display = "none";
    scoreElement.textContent = `Your Score: ${score} / ${questions.length}`;
}

loadQuestion();
