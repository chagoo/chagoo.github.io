document.addEventListener('DOMContentLoaded', () => {
    let words = [];
    let shuffledCards = [];
    let flippedCards = [];
    let matchesFound = 0;

    const gameBoard = document.getElementById('game-board');
    const feedback = document.getElementById('feedback');
    const resetBtn = document.getElementById('reset-game');

    // Fetch the word list
    fetch('words.json')
        .then(response => response.json())
        .then(data => {
            words = data;
            initializeGame();
        })
        .catch(error => {
            console.error('Error loading word list:', error);
            feedback.innerText = 'Error loading words. Please try again later.';
        });

    function initializeGame() {
        resetGame();
        shuffledCards = shuffleCards(words);
        createCards(shuffledCards);
    }

    function shuffleCards(words) {
        // Create an array of pairs of English and Spanish words
        const wordPairs = words.flatMap(word => [
            { text: word.english, type: 'english' },
            { text: word.spanish, type: 'spanish' }
        ]);
        // Shuffle the cards
        return wordPairs.sort(() => 0.5 - Math.random());
    }

    function createCards(cards) {
        gameBoard.innerHTML = ''; // Clear previous cards
        cards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.text = card.text;
            cardElement.dataset.type = card.type;
            cardElement.dataset.index = index;
            cardElement.addEventListener('click', handleCardFlip);
            gameBoard.appendChild(cardElement);
        });
    }

    function handleCardFlip(event) {
        const cardElement = event.target;
        const index = cardElement.dataset.index;

        // Prevent flipping more than two cards or the same card twice
        if (flippedCards.length === 2 || cardElement.classList.contains('flip')) {
            return;
        }

        cardElement.classList.add('flip');
        cardElement.innerText = cardElement.dataset.text;
        flippedCards.push(cardElement);

        // Check for a match if two cards are flipped
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (
            (card1.dataset.type === 'english' && card2.dataset.type === 'spanish' && card1.dataset.text.toLowerCase() === findWord(card2.dataset.text, 'english')) ||
            (card1.dataset.type === 'spanish' && card2.dataset.type === 'english' && card2.dataset.text.toLowerCase() === findWord(card1.dataset.text, 'spanish'))
        ) {
            // It's a match!
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchesFound++;
            flippedCards = [];

            // Check if the game is won
            if (matchesFound === words.length) {
                feedback.innerText = 'Congratulations! You matched all the words!';
            }
        } else {
            // Not a match, flip the cards back after a brief delay
            setTimeout(() => {
                card1.classList.remove('flip');
                card2.classList.remove('flip');
                card1.innerText = '';
                card2.innerText = '';
                flippedCards = [];
            }, 1000);
        }
    }

    function findWord(text, type) {
        const word = words.find(word => word[type].toLowerCase() === text.toLowerCase());
        return word ? word[type === 'english' ? 'spanish' : 'english'] : '';
    }

    function resetGame() {
        matchesFound = 0;
        flippedCards = [];
        feedback.innerText = '';
        initializeGame();
    }

    // Reset game button
    resetBtn.addEventListener('click', resetGame);
});
