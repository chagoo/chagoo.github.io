document.addEventListener('DOMContentLoaded', () => {
    let words = [];
    let currentWord = null;

    const spanishWordElem = document.getElementById('spanish-word');
    const guessInput = document.getElementById('guess-input');
    const feedback = document.getElementById('feedback');
    const submitButton = document.getElementById('submit-guess');
    const resetButton = document.getElementById('reset-game');

    // Fetch word list from JSON file
    fetch('words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            words = data;
            loadNewWord();
        })
        .catch(error => {
            console.error('Error loading word list:', error);
            // Display error message to the user
            spanishWordElem.innerText = 'Error loading words. Please try again later.';
            feedback.innerText = 'We encountered a problem loading the word list.';
            feedback.style.color = 'red';
            // Optionally, disable the submit button if no words are available
            submitButton.disabled = true;
        });

    // Load a new word
    function loadNewWord() {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            spanishWordElem.innerText = currentWord.spanish;
            feedback.innerText = '';
            guessInput.value = '';
            submitButton.disabled = false;  // Re-enable the button in case it was disabled
        }
    }

    // Handle the guess
    submitButton.addEventListener('click', () => {
        const userGuess = guessInput.value.trim().toLowerCase();
        if (userGuess === currentWord.english.toLowerCase()) {
            feedback.innerText = 'Correct! Well done!';
            feedback.style.color = 'green';
        } else {
            feedback.innerText = `Incorrect. The correct word is: ${currentWord.english}`;
            feedback.style.color = 'red';
        }
    });

    // Reset the game
    resetButton.addEventListener('click', loadNewWord);
});
