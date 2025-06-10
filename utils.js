const WordUtils = {
    fetchWords(url = 'words.json') {
        return fetch(url).then(resp => {
            if (!resp.ok) {
                throw new Error('Network response was not ok');
            }
            return resp.json();
        });
    },

    playPronunciation(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    },

    playSpelling(text) {
        const spelledText = text.split('').join(' ');
        const utterance = new SpeechSynthesisUtterance(spelledText);
        utterance.lang = 'en-US';
        utterance.rate = 0.7;
        speechSynthesis.speak(utterance);
    },

    currentIndex: 0,

    createCarousel({ words, carouselElement, prevBtn, nextBtn, wordCounter, cardCreator }) {
        const cards = words.map((word, index) => {
            const card = cardCreator(word, index);
            card.classList.add('word-card');
            if (index === 0) {
                card.classList.add('active');
            }
            carouselElement.appendChild(card);
            return card;
        });

        this.currentIndex = 0;

        const showCard = (index) => {
            cards.forEach((card, idx) => {
                if (idx === index) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });
            if (wordCounter) {
                wordCounter.innerText = `(${index + 1}/${cards.length})`;
            }
        };

        prevBtn.addEventListener('click', () => {
            if (this.currentIndex > 0) {
                this.currentIndex--;
            } else {
                this.currentIndex = cards.length - 1;
            }
            showCard(this.currentIndex);
        });

        nextBtn.addEventListener('click', () => {
            if (this.currentIndex < cards.length - 1) {
                this.currentIndex++;
            } else {
                this.currentIndex = 0;
            }
            showCard(this.currentIndex);
        });

        showCard(this.currentIndex);
    }
};

if (typeof window !== 'undefined') {
    window.WordUtils = WordUtils;
}

if (typeof module !== 'undefined') {
    module.exports = WordUtils;
}
