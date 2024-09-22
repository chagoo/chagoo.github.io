document.addEventListener('DOMContentLoaded', () => {
    // Use the predefined word list instead of fetching from localStorage
    const words = [
        { english: 'jewel', spanish: 'joya' },
        { english: 'loyal', spanish: 'leal' },
        { english: 'chowder', spanish: 'sopa espesa' },
        { english: 'awesome', spanish: 'increíble' },
        { english: 'cocoon', spanish: 'capullo' },
        { english: 'hoist', spanish: 'izar' },
        { english: 'applaud', spanish: 'aplaudir' },
        { english: 'rejoice', spanish: 'regocijarse' },
        { english: 'pronounce', spanish: 'pronunciar' },
        { english: 'saucer', spanish: 'platillo' },
        { english: 'soothe', spanish: 'calmar' },
        { english: 'coupon', spanish: 'cupón' },
        { english: 'caution', spanish: 'precaución' },
        { english: 'bassoon', spanish: 'fagot' },
        { english: 'auction', spanish: 'subasta' },
        { english: 'voyage', spanish: 'viaje' },
        { english: 'cougar', spanish: 'puma' },
        { english: 'steward', spanish: 'mayordomo' },
        { english: 'destroy', spanish: 'destruir' },
        { english: 'awkward', spanish: 'incómodo' }
    ];

    const wordDisplay = document.getElementById('word-display');
    const translationInput = document.getElementById('translation-input');
    const timerElement = document.getElementById('timer');
    const feedback = document.getElementById('feedback');
    const scoreElement = document.getElementById('score');
    const livesElement = document.getElementById('lives');
    const resetButton = document.getElementById('reset-game');
    const startButton = document.getElementById('start-game');
    const nextWordButton = document.getElementById('next-word');
    const listInfo = document.getElementById('list-info');
    const returnButton = document.getElementById('return-to-menu');

    let currentWord = null;
    let score = 0;
    let lives = 3;
    let timeLeft = 10;
    let timerInterval = null;
    let gameRunning = false;
    let errors = 0;

    // Display the list name and number of words (hardcoded list)
    const listName = "Challenge 3 Word List"; // Hardcoded list name for Challenge 3
    listInfo.innerHTML = `List: <strong>${listName}</strong> - Number of words: <strong>${words.length}</strong>`;

    function startGame() {
        if (gameRunning) return; // Prevent starting game again if already running
        gameRunning = true;
        score = 0;
        lives = 3;
        errors = 0;
        updateUI();
        loadNextWord();
        startTimer();
    }

    function resetGame() {
        clearInterval(timerInterval); // Stop any existing timers
        gameRunning = false;
        score = 0;
        lives = 3;
        timeLeft = 10;
        errors = 0;
        currentWord = null;
        translationInput.value = '';
        feedback.innerText = '';
        updateUI();
    }

    function loadNextWord() {
        if (words.length === 0) {
            feedback.innerText = 'No more words to translate!';
            clearInterval(timerInterval);
            return;
        }

        const randomIndex = Math.floor(Math.random() * words.length);
        currentWord = words[randomIndex];
        wordDisplay.innerText = currentWord.spanish; // Display the word in Spanish
        translationInput.value = '';
        timeLeft = 10; // Reset the timer
    }

    function startTimer() {
        timerElement.innerText = `Time: ${timeLeft}`;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerElement.innerText = `Time: ${timeLeft}`;

            if (timeLeft <= 0) {
                loseLife();
            }
        }, 1000);
    }

    function loseLife() {
        lives--;
        livesElement.innerText = `Lives: ${lives}`;
        feedback.innerText = `Out of time! The correct translation was: ${currentWord.english}`; // Show correct English translation
        errors++;

        if (lives <= 0) {
            feedback.innerText = 'Game over! You ran out of lives.';
            clearInterval(timerInterval);
            gameRunning = false;
        } else {
            loadNextWord();
        }
    }

    function checkTranslation() {
        const userTranslation = translationInput.value.trim().toLowerCase();

        if (userTranslation === currentWord.english.toLowerCase()) {
            feedback.innerText = 'Correct!';
            score++;
            updateUI();
            loadNextWord();
        } else {
            feedback.innerText = 'Incorrect. Try again!';
        }
    }

    function skipWord() {
        feedback.innerText = `Skipped! The correct translation was: ${currentWord.english}`;
        errors++;
        loadNextWord();
        updateUI();
    }

    function updateUI() {
        scoreElement.innerText = `Score: ${score}`;
        livesElement.innerText = `Lives: ${lives}`;
        timerElement.innerText = `Time: ${timeLeft}`;
    }

    // Handle checking answers with Enter key
    translationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            clearInterval(timerInterval); // Stop the timer once an answer is submitted
            checkTranslation();
        }
    });

    // Handle Reset Game
    resetButton.addEventListener('click', resetGame);

    // Start the game when the Start button is clicked
    startButton.addEventListener('click', startGame);

    // Handle skipping the current word
    nextWordButton.addEventListener('click', skipWord);

    // Handle returning to the menu
    returnButton.addEventListener('click', () => {
        window.location.href = 'menu.html'; // Redirect to the index page
    });
});
