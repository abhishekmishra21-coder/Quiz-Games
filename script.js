const questions = [
  {
    question: "How many century is done by Virat Kohli .",
    answers: [
      { text: "79", correct: false },
      { text: "80", correct: false},
      { text: "82", correct: true },
      { text: "78", correct: false },
    ],
  },
  {
    question: "Who won the USA election .",
    answers: [
      { text: "Kamala Haris", correct: false },
      { text: "Jill Stein", correct: false },
      { text: "Donald Trump", correct: true },
      { text: "Rishi Sunak", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world .",
    answers: [
      { text: "kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antartica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world .",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "which date India won the t20 World cup .",
    answers: [
      { text: "30 june", correct: false },
      { text: "28 june", correct: false },
      { text: "29 june", correct: true },
      { text: "31 june", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "next";
  showQuestion();
}

function showQuestion() {
  resetstate();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}
function resetstate() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const iscorrect = selectBtn.dataset.correct === "true";
  if (iscorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showscore() {
  resetstate();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showscore();
  }
}
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
