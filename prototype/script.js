console.log("SXF script loaded");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const screenTitle = document.getElementById("screenTitle");
const screenDescription = document.getElementById("screenDescription");
const questionArea = document.getElementById("questionArea");
const questionLabel = document.getElementById("questionLabel");
const answerInput = document.getElementById("answerInput");

const progressContainer = document.getElementById("progressContainer");
const progressBar = document.getElementById("progressBar");

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

  const progressPercent = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = progressPercent + "%";
}

function startInterview() {
  currentQuestionIndex = 0;

  for (const key in answers) {
    delete answers[key];
  }

  screenTitle.textContent = "Business Identity";

  questionArea.classList.remove("hidden");
  startButton.classList.add("hidden");
  nextButton.classList.remove("hidden");
  restartButton.classList.add("hidden");
  progressContainer.classList.remove("hidden");

  showQuestion();
}

function handleNextQuestion() {
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
}
function finishInterview() {
  questionArea.classList.add("hidden");
  nextButton.classList.add("hidden");
  restartButton.classList.remove("hidden");

  screenTitle.textContent = "SXF Discovery Report";

  screenDescription.innerHTML = `
    <div class="report">
      <p class="report-intro">
        Great. We now have the first basic business profile for this website project.
      </p>

      <div class="report-item">
        <span>Business Name</span>
        <strong>${answers.businessName}</strong>
      </div>

      <div class="report-item">
        <span>Business Description</span>
        <strong>${answers.businessDescription}</strong>
      </div>

      <div class="report-item">
        <span>Ideal Customer</span>
        <strong>${answers.idealCustomer}</strong>
      </div>

      <div class="report-item">
        <span>Main Website Goal</span>
        <strong>${answers.mainGoal}</strong>
      </div>
    </div>
  `;

  progressBar.style.width = "100%";

  console.log("Discovery answers:", answers);
}
function restartInterview() {
  currentQuestionIndex = 0;

  for (const key in answers) {
    delete answers[key];
  }

  screenTitle.textContent = "SXF Discovery Engine";
  screenDescription.textContent =
    "Let’s understand your business before building your website.";

  questionArea.classList.add("hidden");
  nextButton.classList.add("hidden");
  restartButton.classList.add("hidden");
  startButton.classList.remove("hidden");

  progressBar.style.width = "0%";
  progressContainer.classList.add("hidden");

  answerInput.value = "";
}

startButton.addEventListener("click", startInterview);
nextButton.addEventListener("click", handleNextQuestion);
restartButton.addEventListener("click", restartInterview);