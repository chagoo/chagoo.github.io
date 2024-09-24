document.addEventListener('DOMContentLoaded', () => {
    let currentIndex = 0;
    let words = []; // This will hold the fetched word list

    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const wordCounter = document.getElementById('word-counter'); 
    const checkBtn = document.getElementById('check-answer');
    const helpBtn = document.getElementById('help-button'); // Ensure this button exists in HTML
    const feedback = document.getElementById('feedback'); // For giving feedback

    // Function to update the word counter
    function updateWordCounter() {
        wordCounter.innerText = `(${currentIndex + 1}/${words.length})`;
    }

    // Function to play the pronunciation using Web Speech API
    function playPronunciation(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US'; 
        speechSynthesis.speak(utterance);
    }

    // Function to create an incomplete word by replacing random characters with '_'
    function createIncompleteWord(word) {
        return word.split('').map(char => (Math.random() > 0.5 ? '_' : char)).join('');
    }

    // Function to create word cards and add them to the carousel
    function createWordCards() {
        words.forEach((word, index) => {
            const card = document.createElement('div');
            card.classList.add('word-card');
            if (index === 0) {
                card.classList.add('active');
            }

            const incompleteWord = createIncompleteWord(word.english); // Generate incomplete word

            card.innerHTML = `
                <div class="word-large">${incompleteWord}</div>
                <div class="word-small">${word.spanish}</div>
                <input type="text" class="word-input" placeholder="Complete the word">
                <button class="play-sound">🔊 Play Sound</button>
                <div class="complete-word" style="display: none;">${word.english}</div> <!-- Hidden complete word -->
            `;

            // Event listener to play sound on button click
            card.querySelector('.play-sound').addEventListener('click', () => {
                playPronunciation(word.english);
            });

            carousel.appendChild(card);
        });

        const cards = document.querySelectorAll('.word-card');

        // Function to show the card at a given index
        function showCard(index) {
            cards.forEach((card, idx) => {
                if (idx === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            updateWordCounter(); // Update the counter whenever a card is shown
            feedback.innerText = ''; // Clear feedback on changing card
        }

        // Event listeners for carousel navigation
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - 1; // Loop back to the last card
            }
            showCard(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0; // Loop back to the first card
            }
            showCard(currentIndex);
        });

        // Function to check the user's input
        checkBtn.addEventListener('click', () => {
            const currentCard = cards[currentIndex];
            const userInput = currentCard.querySelector('.word-input').value.trim().toLowerCase();
            const correctAnswer = words[currentIndex].english.toLowerCase();

            if (userInput === correctAnswer) {
                feedback.innerText = 'Correct! Great job!';
                feedback.style.color = 'green';
            } else {
                feedback.innerText = 'Incorrect. Try again!';
                feedback.style.color = 'red';
            }
        });

        // Help button functionality
        helpBtn.addEventListener('click', () => {
            const currentCard = cards[currentIndex];
            const completeWordDiv = currentCard.querySelector('.complete-word'); // Select the complete word div
            completeWordDiv.style.display = 'block'; // Display the complete word
        });

        // Initialize the counter
        updateWordCounter();
    }

    // Fetch word list from JSON file
    fetch('words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Words loaded:', data); // Check if words are loaded
            words = data;
            createWordCards(); // Create word cards after the data is loaded
        })
        .catch(error => console.error('Error loading word list:', error));
});
