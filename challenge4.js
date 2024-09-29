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
        .then(response => response.json())
        .then(data => {
            words = data;
            loadNewWord();
        })
        .catch(error => console.error('Error loading word list:', error));

    // Load a new word
    function loadNewWord() {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            spanishWordElem.innerText = currentWord.spanish;
            feedback.innerText = '';
            guessInput.value = '';
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
