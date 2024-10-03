document.addEventListener('DOMContentLoaded', () => {
    // The 'words' array will now come from the external words.js file
    let shuffledCards = [];
    let firstCard = null;
    let secondCard = null;
    let attempts = 0;

    const gameBoard = document.getElementById('game-board');
    const attemptsCount = document.getElementById('attempts-count');
    const restartButton = document.getElementById('restart-game');

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(word, language, pair) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = word; // Show the word (English or Spanish)
        card.dataset.language = language; // Store the language (English or Spanish)
        card.dataset.pair = pair; // Store the corresponding translation
        card.addEventListener('click', flipCard);
        return card;
    }

    function setupBoard() {
        gameBoard.innerHTML = ''; // Clear the board
        shuffledCards = [];

        // Add both English and Spanish versions of each word from the external 'words' array
        words.forEach(word => {
            shuffledCards.push({ language: 'english', word: word.english, pair: word.spanish });
            shuffledCards.push({ language: 'spanish', word: word.spanish, pair: word.english });
        });

        shuffle(shuffledCards); // Shuffle the cards

        // Create and append card elements to the game board
        shuffledCards.forEach(cardData => {
            const card = createCard(cardData.word, cardData.language, cardData.pair);
            gameBoard.appendChild(card);
        });

        attempts = 0;
        updateAttempts();
    }

    function flipCard() {
        // Ignore click if two cards are already flipped
        if (firstCard && secondCard) return;

        // Add 'flipped' class to this card
        this.classList.add('flipped');

        // If it's the first card, store it
        if (!firstCard) {
            firstCard = this;
        } else if (this !== firstCard) {
            // If it's the second card, store it and check for match
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        // Ensure one card is in English and the other is in Spanish
        if (
            (firstCard.dataset.language === 'english' && secondCard.dataset.language === 'spanish') ||
            (firstCard.dataset.language === 'spanish' && secondCard.dataset.language === 'english')
        ) {
            // Check if the word on one card matches the translation (pair) on the other
            if (firstCard.dataset.pair === secondCard.innerText || secondCard.dataset.pair === firstCard.innerText) {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                resetCards();
            } else {
                // No match: Flip the cards back after 1 second
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    resetCards();
                }, 1000);
            }
        } else {
            // Not a valid English-Spanish pair: Flip back immediately
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetCards();
            }, 1000);
        }
        attempts++;
        updateAttempts();
    }

    function resetCards() {
        firstCard = null;
        secondCard = null;
    }

    function updateAttempts() {
        attemptsCount.innerText = attempts;
    }

    // Set up the game board when the page loads
    restartButton.addEventListener('click', setupBoard);
    setupBoard();
});
