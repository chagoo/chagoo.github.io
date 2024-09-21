document.addEventListener('DOMContentLoaded', () => {
    const wordLists = {

        list1:[
            { english: 'define', spanish: 'definir', definition: 'To explain the meaning of a word or concept' },
            { english: 'neighbor', spanish: 'vecino', definition: 'A person living near or next to another' },
            { english: 'numeral', spanish: 'número', definition: 'A symbol or figure representing a number' },
            { english: 'poster', spanish: 'cartel', definition: 'A large printed picture or notice displayed in a public place' },
            { english: 'costume', spanish: 'disfraz', definition: 'A set of clothes worn in order to look like someone else' },
            { english: 'explain', spanish: 'explicar', definition: 'To make something clear or easy to understand' },
            { english: 'approach', spanish: 'acercarse', definition: 'To come near or nearer to something or someone' },
            { english: 'desire', spanish: 'deseo', definition: 'A strong feeling of wanting to have something' },
            { english: 'bracelet', spanish: 'pulsera', definition: 'An ornamental band, hoop, or chain worn on the wrist or arm' },
            { english: 'pursue', spanish: 'perseguir', definition: 'To follow someone or something to catch or achieve it' },
            { english: 'trombone', spanish: 'trombón', definition: 'A large brass wind instrument' },
            { english: 'survive', spanish: 'sobrevivir', definition: 'To continue to live or exist' },
            { english: 'refrain', spanish: 'abstenerse', definition: 'To stop oneself from doing something' },
            { english: 'rotate', spanish: 'rotar', definition: 'To turn or cause something to turn in a circle' },
            { english: 'reduce', spanish: 'reducir', definition: 'To make smaller or less in amount, degree, or size' },
            { english: 'recite', spanish: 'recitar', definition: 'To repeat aloud a passage from memory' },
            { english: 'clothe', spanish: 'vestir', definition: 'To put clothes on oneself or someone else' },
            { english: 'perfume', spanish: 'perfume', definition: 'A fragrant liquid typically made from essential oils' },
            { english: 'divine', spanish: 'divino', definition: 'Of or like God or a god' },
            { english: 'maintain', spanish: 'mantener', definition: 'To keep something in good condition' },
            { english: 'attach', spanish: 'adjuntar', definition: 'To fasten or join one thing to another' },
            { english: 'success', spanish: 'éxito', definition: 'The accomplishment of an aim or purpose' },
            { english: 'deliver', spanish: 'entregar', definition: 'To bring and hand over a letter, parcel, or ordered goods' },
            { english: 'proverb', spanish: 'proverbio', definition: 'A short saying in general use, stating a general truth or piece of advice' },
            { english: 'result', spanish: 'resultado', definition: 'A consequence, effect, or outcome of something' }
        ],
        
        list2: [
            { english: 'pattern', spanish: 'patrón', definition: 'A repeated decorative design' },
            { english: 'cleanse', spanish: 'limpiar', definition: 'To make something thoroughly clean' },
            { english: 'publish', spanish: 'publicar', definition: 'To prepare and issue a written or printed work for public distribution' },
            { english: 'proverb', spanish: 'proverbio', definition: 'A short saying that expresses a general truth or piece of advice' },
            { english: 'spinach', spanish: 'espinaca', definition: 'A leafy green vegetable that is rich in nutrients' },
            { english: 'beyond', spanish: 'más allá de', definition: 'At or to a point farther than something' },
            { english: 'insect', spanish: 'insecto', definition: 'A small arthropod animal with six legs and, typically, wings' },
            { english: 'attach', spanish: 'adjuntar', definition: 'To fasten or join something to another' },
            { english: 'result', spanish: 'resultado', definition: 'The outcome or consequence of an action or event' },
            { english: 'volume', spanish: 'volumen', definition: 'The amount of space something occupies or the amount of sound' },
            { english: 'exist', spanish: 'existir', definition: 'To have actual being or reality' },
            { english: 'canvas', spanish: 'lienzo', definition: 'A strong, heavy cloth used for painting or other artistic work' },
            { english: 'event', spanish: 'evento', definition: 'A significant occurrence or happening' },
            { english: 'modern', spanish: 'moderno', definition: 'Relating to the present or recent times' },
            { english: 'method', spanish: 'método', definition: 'A particular way of doing something' },
            { english: 'fragment', spanish: 'fragmento', definition: 'A small part broken off or separated from something' },
            { english: 'success', spanish: 'éxito', definition: 'The accomplishment of an aim or purpose' },
            { english: 'adopt', spanish: 'adoptar', definition: 'To legally take another\'s child and bring it up as one\'s own' },
            { english: 'relax', spanish: 'relajarse', definition: 'To become less tense or anxious' },
            { english: 'custom', spanish: 'costumbre', definition: 'A traditional and widely accepted practice or behavior' },
            { english: 'deliver', spanish: 'entregar', definition: 'To bring and hand over something to the intended recipient' },
            { english: 'expand', spanish: 'expandir', definition: 'To become larger or more extensive' },
            { english: 'convince', spanish: 'convencer', definition: 'To cause someone to believe firmly in the truth of something' },
            { english: 'camera', spanish: 'cámara', definition: 'A device for recording images or video' },
            { english: 'shepherd', spanish: 'pastor', definition: 'A person who tends and rears sheep' },        
        ]

    };

    // Get references to elements
    const wordListSelect = document.getElementById('word-list-select');
    const studyWordsButton = document.getElementById('study-words');
    const wordListModal = document.getElementById('word-list-modal');
    const closeModal = document.querySelector('.close');
    const wordListContainer = document.getElementById('word-list');
    const startGameButton = document.getElementById('start-game');
    const startChallenge3Button = document.getElementById('start-challenge3'); // New button for Challenge 3

    // Event listener to display selected word list in the modal
    studyWordsButton.onclick = () => {
        const selectedList = wordListSelect.value;
        displayWords(wordLists[selectedList]);
        wordListModal.style.display = 'block';
    };

    // Close modal when clicking "x"
    closeModal.onclick = () => {
        wordListModal.style.display = 'none';
    };

    // Close modal when clicking outside the modal content
    window.onclick = (event) => {
        if (event.target === wordListModal) {
            wordListModal.style.display = 'none';
        }
    };

    // Function to display words in the modal
    function displayWords(words) {
        wordListContainer.innerHTML = ''; // Clear previous list
        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<strong>${word.english}</strong> (${word.spanish}): ${word.definition}`;
            wordListContainer.appendChild(listItem);
        });
    }

    // Event listener to start the game (store selected list in localStorage)
    startGameButton.onclick = () => {
        const selectedList = wordListSelect.value;
        localStorage.setItem('selectedWordList', JSON.stringify(wordLists[selectedList]));
        window.location.href = 'challenge1.html'; // Redirect to the game page
    };

    // Event listener for Challenge 3
    startChallenge3Button.onclick = () => {
        const selectedList = wordListSelect.value;
        localStorage.setItem('selectedWordList', JSON.stringify(wordLists[selectedList]));
        window.location.href = 'challenge3.html'; // Redirect to Challenge 3
    };
});