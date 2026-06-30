console.log("SXF script loaded");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");

const screenTitle = document.getElementById("screenTitle");
const screenDescription = document.getElementById("screenDescription");
const questionArea = document.getElementById("questionArea");
const questionLabel = document.getElementById("questionLabel");
const answerInput = document.getElementById("answerInput");

const questions = [
  {
    key: "businessName",
    question: "What is the name of your business?",
    placeholder: "Example: SXF Digital"
  },
  {
    key: "businessDescription",
    question: "Describe your business as if you were explaining it to a friend.",
    placeholder: "Example: We create professional websites for small businesses."
  },
  {
    key: "idealCustomer",
    question: "Who is your ideal customer?",
    placeholder: "Example: Small business owners in Lima who need a professional website."
  },
  {
    key: "mainGoal",
    question: "What is the main goal of this website?",
    placeholder: "Example: Get more appointments, generate leads, sell products..."
  }
];

let currentQuestionIndex = 0;
const answers = {};

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  questionLabel.textContent = currentQuestion.question;
  answerInput.placeholder = currentQuestion.placeholder;
  answerInput.value = "";
  answerInput.focus();

  screenDescription.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

startButton.addEventListener("click", function () {
  screenTitle.textContent = "Business Identity";

  questionArea.classList.remove("hidden");
  startButton.classList.add("hidden");
  nextButton.classList.remove("hidden");

  showQuestion();
});

nextButton.addEventListener("click", function () {
  const answer = answerInput.value.trim();

  if (answer === "") {
    alert("Please answer the question before continuing.");
    return;
  }

  const currentQuestion = questions[currentQuestionIndex];
  answers[currentQuestion.key] = answer;

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    finishInterview();
  }
});

function finishInterview() {
  questionArea.classList.add("hidden");
  nextButton.classList.add("hidden");

  screenTitle.textContent = "Discovery Complete";
  screenDescription.innerHTML = `
    Great. We now have the first basic profile for this business.
    <br><br>
    <strong>Business:</strong> ${answers.businessName}<br>
    <strong>Description:</strong> ${answers.businessDescription}<br>
    <strong>Ideal Customer:</strong> ${answers.idealCustomer}<br>
    <strong>Main Website Goal:</strong> ${answers.mainGoal}
  `;

  console.log("Discovery answers:", answers);
}