document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const wordCounter = document.getElementById('word-counter');
    let currentIndex = 0;
    let words = []; // This will hold the fetched word list

    // Function to update the word counter
    function updateWordCounter() {
        wordCounter.innerText = `(${currentIndex + 1}/${words.length})`;
    }

    // Function to play pronunciation using Web Speech API
    function playPronunciation(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }

    // Function to play spelling using Web Speech API
    function playSpelling(text) {
        const spelledText = text.split('').join(' '); // Split the word into letters with spaces
        const utterance = new SpeechSynthesisUtterance(spelledText);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }

    // Function to create word cards and add them to the carousel
    function createWordCards() {
        words.forEach((word, index) => {
            const card = document.createElement('div');
            card.classList.add('word-card');
            if (index === 0) {
                card.classList.add('active');
            }

            card.innerHTML = `
                <div class="word-large">${word.english}</div>
                <div class="word-small">${word.spanish}</div>
                <button class="play-sound">🔊 Play Sound</button>
                <button class="spell-word">🔡 Spell Word</button>
            `;

            // Event listener to play pronunciation on button click
            card.querySelector('.play-sound').addEventListener('click', () => {
                playPronunciation(word.english);
            });

            // Event listener to play spelling on button click
            card.querySelector('.spell-word').addEventListener('click', () => {
                playSpelling(word.english);
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
            updateWordCounter();
        }

        // Event listeners for carousel navigation
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
            } else {
                currentIndex = cards.length - 1;
            }
            showCard(currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
            } else {
                currentIndex = 0;
            }
            showCard(currentIndex);
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
            createWordCards();
        })
        .catch(error => console.error('Error loading word list:', error));
});
