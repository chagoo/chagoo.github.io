document.addEventListener('DOMContentLoaded', () => {
    if (window.Scoreboard) {
        Scoreboard.load();
    }

    const carousel = document.getElementById('carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const wordCounter = document.getElementById('word-counter');

    // Load words and create the carousel
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
                    card.innerHTML = `
                        <div class="word-large">${word.english}</div>
                        <div class="word-small">${word.spanish}</div>
                        <button class="play-sound">🔊 Play Sound</button>
                        <button class="spell-word">🔡 Spell Word</button>
                    `;

                    card.querySelector('.play-sound').addEventListener('click', () => {
                        WordUtils.playPronunciation(word.english);
                    });

                    card.querySelector('.spell-word').addEventListener('click', () => {
                        WordUtils.playSpelling(word.english);
                    });
                    return card;
                }
            });
        }).catch(err => console.error('Error loading word list:', err));
    }
});
