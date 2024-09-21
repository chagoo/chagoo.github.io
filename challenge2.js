
document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the selected word list from localStorage
    const words = JSON.parse(localStorage.getItem('selectedWordList')) || [];

    const incompleteWordsContainer = document.getElementById('incomplete-words-container');
    const challengeFeedback = document.getElementById('challenge-feedback');
    const backToChallenge1Button = document.getElementById('back-to-challenge1');
    const goToChallenge2Button = document.getElementById('go-to-challenge2');
    const resetGameButton = document.getElementById('reset-game');
    const scoreElement = document.getElementById('score');

    const halfIndex = Math.ceil(words.length / 2);
    let currentStage = 1;
    let incompleteWords = [];
    let correctAnswers = {};
    let score = 0;

    // Function to load words for a given stage
    function loadWords(stage) {
        incompleteWordsContainer.innerHTML = '';
        challengeFeedback.innerText = '';

        const wordsToDisplay = stage === 1 
            ? words.slice(0, halfIndex) 
            : words.slice(halfIndex);

        // Generate incomplete words and store correct answers
        incompleteWords = wordsToDisplay.map(wordObj => {
            const incomplete = wordObj.english.split('').map((char, idx) => 
                Math.random() > 0.5 ? '_' : char // Make about half the letters hidden
            ).join('');
            correctAnswers[incomplete] = wordObj.english;
            return { incomplete, original: wordObj.english };
        });

        // Display incomplete words with input fields for the user
        incompleteWords.forEach(wordObj => {
            const wordDiv = document.createElement('div');
            wordDiv.innerHTML = `
                <label>${wordObj.incomplete}</label>
                <input type="text" class="challenge-input" data-original="${wordObj.original}" placeholder="Complete the word">
            `;
            incompleteWordsContainer.appendChild(wordDiv);
        });

        // Show or hide buttons based on the current stage
        goToChallenge2Button.style.display = stage === 1 ? 'block' : 'none';
    }

    // Function to check the user's answers
    function checkAnswers() {
        const inputs = document.querySelectorAll('.challenge-input');
        let allCorrect = true;

        inputs.forEach(input => {
            const userAnswer = input.value.trim();
            const originalWord = input.dataset.original;

            if (userAnswer === originalWord) {
                input.style.backgroundColor = '#d4edda'; // Correct
            } else {
                input.style.backgroundColor = '#f8d7da'; // Incorrect
                allCorrect = false;
            }
        });

        // Update feedback based on the correctness of the answers
        if (allCorrect) {
            if (currentStage === 1) {
                challengeFeedback.innerText = 'Great job! You completed the first part. Click below to start the second part.';
                score += halfIndex; // Add score for completing the first part
                updateScore();
            } else {
                challengeFeedback.innerText = 'Congratulations! You completed both challenges!';
                score += words.length - halfIndex; // Add score for completing the second part
                updateScore();
            }
        } else {
            challengeFeedback.innerText = 'Some answers are incorrect. Try again!';
        }
    }

    // Function to update the score on the screen
    function updateScore() {
        scoreElement.innerText = `Score: ${score}`;
    }

    // Function to reset the game
    function resetGame() {
        score = 0;
        currentStage = 1;
        updateScore();
        loadWords(currentStage);
    }

    // Set up event listeners for the buttons
    document.getElementById('check-challenge-answer').onclick = checkAnswers;

    backToChallenge1Button.onclick = () => {
        window.location.href = 'index.html'; // Navigate back to the menu or challenge 1
    };

    goToChallenge2Button.onclick = () => {
        currentStage = 2;
        loadWords(currentStage);
    };

    resetGameButton.onclick = resetGame;

    // Initial call to load words for the first stage
    loadWords(currentStage);
});
