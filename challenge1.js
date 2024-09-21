document.addEventListener('DOMContentLoaded', () => {
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
    

    let currentIndex = 0;
    const totalWords = words.length;

    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const wordCounter = document.getElementById('word-counter'); // Get counter element

    // Function to update the word counter
    function updateWordCounter() {
        wordCounter.innerText = `(${currentIndex + 1}/${totalWords})`;
    }

    // Create the word cards and add them to the carousel
    words.forEach((word, index) => {
        const card = document.createElement('div');
        card.classList.add('word-card');
        if (index === 0) {
            card.classList.add('active');
        }
        
        card.innerHTML = `
            <div class="word-large">${word.english}</div>
            <div class="word-small">${word.spanish}</div>
        `;
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

    // Initialize the counter when the page loads
    updateWordCounter();
});
