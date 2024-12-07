
function shiftImage() {
  const image = document.getElementById("horse-image");
  
  // Get the current left position, or default to 0 if not set
  let currentLeft = parseInt(window.getComputedStyle(image).left, 10) || 0;
  
  // Increment the left position by 100px
  currentLeft += 250;

  // Apply the new position
  image.style.left = currentLeft + "px";
}

/*
const questionAudioElement = document.getElementById("question-audio");  // Image element for displaying questions
const scoreDisplay = document.getElementById("score");
//const questionAudioElement = new Audio(); // Create an audio element for playback
const choices = document.querySelectorAll('.choice'); // Assumes buttons with .choice class
let score = 0;
*/

// Example questions with images
const questions = [
 
  {
    questionAudio: "audio/elephant.mp3", // Audio path for the question
    answers: [
      { image: "images/giraffe.jpeg", correct: false },
      { image: "images/elephant.jpeg", correct: true },
      { image: "images/lion.jpeg", correct: false },
      { image: "images/tiger.jpeg", correct: false }
    ]
  },
  {
    questionAudio: "audio/lion.mp3", // Audio path for the question
    answers: [
      { image: "images/lion.jpeg", correct: true },
      { image: "images/monkey.jpeg", correct: false },
      { image: "images/elephant.jpeg", correct: false },
      { image: "images/tiger.jpeg", correct: false }
    ]
  },
  {
    questionAudio: "audio/monkey.mp3", // Audio path for the question
    answers: [
      { image: "images/elephant.jpeg", correct: false },
      { image: "images/zebra.jpeg", correct: false },
      { image: "images/lion.jpeg", correct: false },
      { image: "images/monkey.jpeg", correct: true }
    ]
  },
  {
    questionAudio: "audio/giraffe.mp3", // Audio path for the question
    answers: [
      { image: "images/lion.jpeg", correct: false },
      { image: "images/tiger.jpeg", correct: false },
      { image: "images/giraffe.jpeg", correct: true },
      { image: "images/monkey.jpeg", correct: false }
    ]
  }

];

const questionImage = document.getElementById("question-image");  // Image element for displaying questions
const questionAudioElement = document.getElementById("question-audio"); // Audio element for playing questions
const scoreDisplay = document.getElementById("score"); // Score display element
const choices = document.querySelectorAll('.choice-img'); // Buttons with the class `.choice`
const correctAudioElement = document.getElementById("correct-audio"); // Audio element for playing questions
const wrongAudioElement = document.getElementById("wrong-audio"); // Audio element for playing questions

questionImage.style.display = "none";
let score = 0;
let currentQuestionIndex = 0;

// Display the next question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];

  // Set and play the audio for the current question
  
  questionAudioElement.src = currentQuestion.questionAudio;
  questionAudioElement.play();

  // Set images and data attributes for the answer choices
  choices.forEach((choice, index) => {
    const answer = currentQuestion.answers[index];
    choice.style.backgroundImage = `url(${answer.image})`; // Set image as button background
    choice.dataset.answer = answer.correct; // Store whether the choice is correct
  });
}

// Add event listeners to buttons
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

    currentQuestionIndex++;

    // Disable choices during the 1-second delay
    disableChoices(true);

    // Wait 1 second before showing the next question or ending the game
    setTimeout(() => {
      if (currentQuestionIndex < questions.length) {
        displayQuestion();
      } else {
        // End the game
        questionImage.style.display = "block";
        questionImage.style.alignContent = "center";
        questionImage.src = "images/win.jpg"; // Show a win image
        questionImage.alt = "Game over! Well done!"; // Game over message
        document.querySelector(".choices").style.display = "none"; // Hide choices
        questionAudioElement.style.display = "none"; // Hide audio element
      }

      // Re-enable choices for the next question
      disableChoices(false);
    }, 1500); // 1000 milliseconds = 1 second
  });
});

// Function to enable or disable answer choices
function disableChoices(disabled) {
  choices.forEach(choice => {
    choice.disabled = disabled;
  });
}

// Initialize the first question
displayQuestion();

