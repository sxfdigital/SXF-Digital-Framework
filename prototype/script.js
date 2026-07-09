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

  screenDescription.textContent = "";

  const report = document.createElement("div");
  report.className = "report";

  const reportIntro = document.createElement("p");
  reportIntro.className = "report-intro";
  reportIntro.textContent =
    "Great. We now have the first basic business profile for this website project.";

  report.appendChild(reportIntro);

  const reportItems = [
    {
      label: "Business Name",
      answer: answers.businessName
    },
    {
      label: "Business Description",
      answer: answers.businessDescription
    },
    {
      label: "Ideal Customer",
      answer: answers.idealCustomer
    },
    {
      label: "Main Website Goal",
      answer: answers.mainGoal
    }
  ];

  reportItems.forEach((item) => {
    const reportItem = document.createElement("div");
    reportItem.className = "report-item";

    const label = document.createElement("span");
    label.textContent = item.label;

    const answer = document.createElement("strong");
    answer.textContent = item.answer;

    reportItem.appendChild(label);
    reportItem.appendChild(answer);
    report.appendChild(reportItem);
  });

  screenDescription.appendChild(report);

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
