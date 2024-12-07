const checkButton = document.getElementById("check-button");
const resultMessage = document.getElementById("result-message");
const optionsContainer = document.getElementById("options-container");
const correctAudioElement = document.getElementById("correct-audio"); // Audio element for playing questions
const wrongAudioElement = document.getElementById("wrong-audio"); // Audio element for playing questions

/*the lion is the king of the jungle
the elephant is huge
the gorilla is very strong
the tigers are fierce*/
const questions = [
  {
    sentence: "The <div class='drop-zone' id='fruit-drop'></div> is the king of the jungle.",
    correctAnswer: "lion",
    options: ["lion", "elephant", "gorilla", "tigers"]
  },
  {
    sentence: "The <div class='drop-zone' id='fruit-drop'></div> is huge.",
    correctAnswer: "elephant",
    options: ["lion", "elephant", "gorilla", "tigers"]
  },
  {
    sentence: "The <div class='drop-zone' id='fruit-drop'></div> is very strong.",
    correctAnswer: "gorilla",
    options: ["lion", "elephant", "gorilla", "tigers"]
  },
  {
    sentence: "The <div class='drop-zone' id='fruit-drop'></div> are fierce.",
    correctAnswer: "tigers",
    options: ["lion", "elephant", "gorilla", "tigers"]
  }
];

let currentQuestionIndex = 0; // Track current question
let selectedAnswer = ""; // Store the selected answer

// Function to load a question
function loadQuestion(index) {
  const question = questions[index];
  document.getElementById("question-text").innerHTML = question.sentence; // Set new question sentence

  // Clear and add new options
  optionsContainer.innerHTML = ""; // Clear old options
  question.options.forEach(option => {
    const optionButton = document.createElement("button");
    optionButton.classList.add("option-button");
    optionButton.dataset.word = option;
    optionButton.textContent = option;
    optionsContainer.appendChild(optionButton);

    // Add click event to select an answer
    optionButton.addEventListener("click", () => {
      selectedAnswer = option;
      // Highlight selected option
      document.querySelectorAll(".option-button").forEach(btn => {
        btn.style.backgroundColor = ""; // Reset all options
      });
      optionButton.style.backgroundColor = "lightgreen"; // Highlight selected

      // Fill the blank in the sentence with the selected word
      document.getElementById("fruit-drop").innerHTML = selectedAnswer;

    });
  });

  resultMessage.textContent = ""; // Clear result message
}

// Check the answer when user clicks the check button
checkButton.addEventListener("click", () => {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.correctAnswer) {
    resultMessage.textContent = `Correct! The ${currentQuestion.correctAnswer} is ${currentQuestionIndex === 0 ? 'red and juicy' : currentQuestionIndex === 1 ? 'yellow and sweet' : currentQuestionIndex === 2 ? 'small and purple' : 'red and sour'}.`;
    resultMessage.style.color = "green";
    correctAudioElement.play();
    // Move to the next question
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion(currentQuestionIndex); // Load next question
    } else {
      resultMessage.textContent = "You have completed all the questions!";
      resultMessage.style.color = "blue";
    }
  } else {
    resultMessage.textContent = "Try again!";
    resultMessage.style.color = "red";
    wrongAudioElement.play();
  }
});

// Initial question load
loadQuestion(currentQuestionIndex);