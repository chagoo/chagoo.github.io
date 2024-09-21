document.addEventListener('DOMContentLoaded', () => {
    const words = ['awesome'];
    let selectedWord;
    let guessedLetters = [];
    let lives = 6;
    
    const wordDisplay = document.getElementById('word-display');
    const livesCount = document.getElementById('lives-count');
    const message = document.getElementById('message');
    const lettersContainer = document.getElementById('letters');
    const hangmanImage = document.getElementById('hangman-stage');

    // Initialize game
    function initializeGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        guessedLetters = [];
        lives = 6;
        message.textContent = '';
        livesCount.textContent = lives;
        hangmanImage.src = `images/hangman0.png`;
        displayWord();
        setupAlphabet();
    }

    // Display word with blanks
    function displayWord() {
        let display = selectedWord.split('').map(letter => 
            guessedLetters.includes(letter) ? letter : '_'
        ).join(' ');
        wordDisplay.textContent = display;
        
        if (!display.includes('_')) {
            message.textContent = 'You Win!';
            disableButtons();
        }
    }

    // Setup alphabet buttons
    function setupAlphabet() {
        lettersContainer.innerHTML = '';
        for (let i = 65; i <= 90; i++) {  // A to Z
            let letter = String.fromCharCode(i);
            let button = document.createElement('button');
            button.textContent = letter;
            button.onclick = () => guessLetter(letter);
            lettersContainer.appendChild(button);
        }
    }

    // Handle letter guesses
    function guessLetter(letter) {
        guessedLetters.push(letter);
        document.querySelector(`button:contains(${letter})`).disabled = true;

        if (selectedWord.includes(letter)) {
            displayWord();
        } else {
            lives--;
            livesCount.textContent = lives;
            hangmanImage.src = `images/hangman${6 - lives}.png`;
            
            if (lives === 0) {
                message.textContent = `Game Over! The word was ${selectedWord}.`;
                disableButtons();
            }
        }
    }

    // Disable all buttons
    function disableButtons() {
        const buttons = lettersContainer.querySelectorAll('button');
        buttons.forEach(button => button.disabled = true);
    }

    // Reset the game
    document.getElementById('reset-button').onclick = initializeGame;

    // Start game for the first time
    initializeGame();
});
