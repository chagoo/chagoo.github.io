function createIncompleteWord(word) {
    return word.split('').map(char => (Math.random() > 0.5 ? '_' : char)).join('');
}

if (typeof module !== 'undefined') {
    module.exports = { createIncompleteWord };
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (window.Scoreboard) {
            Scoreboard.load();
        }

        const carousel = document.getElementById('carousel');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        const wordCounter = document.getElementById('word-counter');
        const checkBtn = document.getElementById('check-answer');
        const helpBtn = document.getElementById('help-btn');
        const feedback = document.getElementById('feedback');

        if (window.WordUtils) {
            WordUtils.fetchWords().then(words => {
                WordUtils.createCarousel({
                    words,
                    carouselElement: carousel,
                    prevBtn,
                    nextBtn,
                    wordCounter,
                    cardCreator: (word) => {
                        const card = document.createElement('div');
                        const incompleteWord = createIncompleteWord(word.english);
                        card.innerHTML = `
                            <div class="word-large">${incompleteWord}</div>
                            <div class="word-small">${word.spanish}</div>
                            <input type="text" class="word-input" placeholder="Complete the word">
                            <button class="play-sound">🔊 Play Sound</button>
                            <div class="complete-word" style="display: none;">${word.english}</div>
                        `;
                        card.querySelector('.play-sound').addEventListener('click', () => {
                            WordUtils.playPronunciation(word.english);
                        });
                        return card;
                    }
                });

                const cards = document.querySelectorAll('.word-card');

                checkBtn.addEventListener('click', () => {
                    const currentIndex = WordUtils.currentIndex || 0;
                    const currentCard = cards[currentIndex];
                    const userInput = currentCard.querySelector('.word-input').value.trim().toLowerCase();
                    const correctAnswer = words[currentIndex].english.toLowerCase();

                    if (userInput === correctAnswer) {
                        feedback.innerText = 'Correct! Great job!';
                        feedback.style.color = 'green';
                        if (window.Scoreboard) {
                            Scoreboard.addScore('challenge2', 1);
                        }
                    } else {
                        feedback.innerText = 'Incorrect. Try again!';
                        feedback.style.color = 'red';
                    }
                });

                helpBtn.addEventListener('click', () => {
                    const currentIndex = WordUtils.currentIndex || 0;
                    const currentCard = cards[currentIndex];
                    const completeWordDiv = currentCard.querySelector('.complete-word');
                    completeWordDiv.style.display = 'block';
                });
            }).catch(err => console.error('Error loading word list:', err));
        }
    });
}
