
function shiftImage() {
  const image = document.getElementById("horse-image");
  
  // Get the current left position, or default to 0 if not set
  let currentLeft = parseInt(window.getComputedStyle(image).left, 10) || 0;
  
  // Increment the left position by 100px
  currentLeft += 170;

  // Apply the new position
  image.style.left = currentLeft + "px";
}


const choices = document.querySelectorAll(".choice");
const questionImage = document.getElementById("question-image");  // Image element for displaying questions
const scoreDisplay = document.getElementById("score");
const correctAudioElement = document.getElementById("correct-audio"); // Audio element for playing questions
const wrongAudioElement = document.getElementById("wrong-audio"); // Audio element for playing questions

let score = 0;

// Example questions with images
const questions = [
  {
    questionImage: "images/apple.jpg", // Image path instead of text
    answers: [
      { text: "Apple", correct: true },
      { text: "Banana", correct: false },
      { text: "Orange", correct: false },
      { text: "Grapes", correct: false }
    ]
  },
  {
    questionImage: "images/orange.jpg", // Another image for the next question
    answers: [
      { text: "Banana", correct: false },
      { text: "Orange", correct: true },
      { text: "Grapes", correct: false },
      { text: "Apple", correct: false }
    ]
  },
  {
    questionImage: "images/grapes.jpg", // Image path instead of text
    answers: [
      { text: "Apple", correct: false },
      { text: "Banana", correct: false },
      { text: "Orange", correct: false },
      { text: "Grapes", correct: true }
    ]
  },
  {
    questionImage: "images/cherry.jpg", // Another image for the next question
    answers: [
      { text: "Banana", correct: false },
      { text: "Orange", correct: false },
      { text: "cherry", correct: true },
      { text: "Apple", correct: false }
    ]
  },
  {
    questionImage: "images/pinapple.jpg", // Image path instead of text
    answers: [
      { text: "Pineapple", correct: true },
      { text: "Banana", correct: false },
      { text: "Orange", correct: false },
      { text: "Grapes", correct: false }
    ]
  },
  {
    questionImage: "images/strewberry.jpg", // Image path instead of text
    answers: [
      { text: "Strewberry", correct: true },
      { text: "Banana", correct: false },
      { text: "Orange", correct: false },
      { text: "Grapes", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;

// Display the next question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Display the image for the current question
  questionImage.src = currentQuestion.questionImage;  // Set the image source

  choices.forEach((choice, index) => {
    choice.textContent = currentQuestion.answers[index].text;
    choice.dataset.answer = currentQuestion.answers[index].correct;
  });
}

// Check answer and update score
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    const isCorrect = e.target.dataset.answer === "true";

    if (isCorrect) {
      // Move the horse to the left
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      shiftImage();
      correctAudioElement.play();
    } else {
      wrongAudioElement.play();
    }

    // Increment the question index
    currentQuestionIndex++;

    // Disable choices while waiting for the timer
    disableChoices(true);

    // Set a 1-second delay before showing the next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } 
      else {
        // End the game
        questionImage.src = "images/win.jpg";  // Show a win image
        questionImage.alt = "Game over! Well done!";  // Game over message
        document.querySelector(".choices").style.display = "none";  // Hide choices
      }

      // Re-enable choices for the next question
      disableChoices(false);
    }, 1000); // 1000 milliseconds = 1 second
  });
});

// Function to enable or disable answer choices
function disableChoices(disabled) {
  choices.forEach(choice => {
    choice.disabled = disabled;
  });
}


// Initialize game
displayQuestion();
