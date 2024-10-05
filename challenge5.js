document.addEventListener('DOMContentLoaded', () => { 
    let shuffledCards = [];
    let firstCard = null;
    let secondCard = null;
    let attempts = 0;

    const gameBoard = document.getElementById('game-board');
    const attemptsCount = document.getElementById('attempts-count');
    const restartButton = document.getElementById('restart-game');

    // Function to fetch and use words from words.json
    function fetchWords() {
        fetch('words.json')
            .then(response => response.json())
            .then(words => {
                setupBoard(words);
            })
            .catch(error => console.error('Error fetching words:', error));
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createCard(word, language, pair) {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerText = word;
        card.dataset.language = language;
        card.dataset.pair = pair;
        card.addEventListener('click', flipCard);
        return card;
    }

    function setupBoard(words) {
        gameBoard.innerHTML = '';
        shuffledCards = [];

        words.forEach(word => {
            shuffledCards.push({ language: 'english', word: word.english, pair: word.spanish });
            shuffledCards.push({ language: 'spanish', word: word.spanish, pair: word.english });
        });

        shuffle(shuffledCards);

        shuffledCards.forEach(cardData => {
            const card = createCard(cardData.word, cardData.language, cardData.pair);
            gameBoard.appendChild(card);
        });

        attempts = 0;
        updateAttempts();
    }

    function flipCard() {
        if (firstCard && secondCard) return;

        this.classList.add('flipped');

        if (!firstCard) {
            firstCard = this;
        } else if (this !== firstCard) {
            secondCard = this;
            checkForMatch();
        }
    }

    function checkForMatch() {
        if (
            (firstCard.dataset.language === 'english' && secondCard.dataset.language === 'spanish') ||
            (firstCard.dataset.language === 'spanish' && secondCard.dataset.language === 'english')
        ) {
            if (firstCard.dataset.pair === secondCard.innerText || secondCard.dataset.pair === firstCard.innerText) {
                // Apply explosion effect on both cards when matched
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                
                // Remove the cards from the board after the animation
                setTimeout(() => {
                    firstCard.remove();
                    secondCard.remove();
                    resetCards();
                }, 1000);
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    resetCards();
                }, 1000);
            }
        } else {
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

    // Fetch the words and set up the game board when the page loads
    restartButton.addEventListener('click', fetchWords);
    fetchWords();
});
