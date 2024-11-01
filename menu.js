document.addEventListener('DOMContentLoaded', () => {
const wordLists = {
    list10: [ // New list of words with short definitions
            { english: "completing", spanish: "completando", definition: "finishing a task" },
            { english: "risen", spanish: "elevado", definition: "gone up or increased" },
            { english: "excelled", spanish: "destacado", definition: "performed very well" },
            { english: "families", spanish: "familias", definition: "groups of related individuals" },
            { english: "donating", spanish: "donando", definition: "giving as a gift" }
        ],
    list9: [ // New list with short definitions
        { english: "partner", spanish: "compañero", definition: "a person who shares in an activity" },
        { english: "explore", spanish: "explorar", definition: "to travel for discovery" },
        { english: "fabric", spanish: "tela", definition: "material made by weaving fibers" },
        { english: "welcome", spanish: "bienvenido", definition: "a friendly greeting" },
        { english: "arctic", spanish: "ártico", definition: "related to the North Pole" },
        { english: "textiles", spanish: "textiles", definition: "woven fabrics" }
        ],
    list8: [ // New word list with short definitions
        { english: "solo", spanish: "solo", definition: "done alone" },
        { english: "camel", spanish: "camello", definition: "a desert animal" },
        { english: "solid", spanish: "sólido", definition: "firm and stable" },
        { english: "season", spanish: "estación", definition: "time of the year" },
        { english: "habit", spanish: "hábito", definition: "a regular practice" },
        { english: "cocoa", spanish: "cacao", definition: "a bean used to make chocolate" }
        ],
    list7: [  // New word list with short sentences for beginners
        { english: "menu", spanish: "menú", definition: "A list of food in a restaurant.", sentence: "The menu has many options." },
        { english: "offer", spanish: "oferta", definition: "To give or provide something.", sentence: "He made an offer to help." },
        { english: "talent", spanish: "talento", definition: "A natural ability to do something well.", sentence: "She has a talent for singing." },
        { english: "gospel", spanish: "evangelio", definition: "A message or teaching of faith.", sentence: "They sang a gospel song in church." },
        { english: "body", spanish: "cuerpo", definition: "The physical structure of a person or animal.", sentence: "He exercises to keep his body healthy." }
    ],

    list6: [  // Previous word list
        { english: "sparrow", spanish: "gorrión", definition: "a small bird" },
        { english: "cherish", spanish: "apreciar", definition: "to value or care for deeply" },
        { english: "cherry", spanish: "cereza", definition: "a small, round, red fruit" },
        { english: "aware", spanish: "consciente", definition: "having knowledge or awareness" },
        { english: "armor", spanish: "armadura", definition: "protective covering worn in battle" },
        { english: "narrate", spanish: "narrar", definition: "to tell a story" }
    ],
    
    list5: [
        { english: 'Jewel', spanish: 'joya', definition: 'an ornament of precious metal; gem)' },
        { english: 'Loyal', spanish: 'leal', definition: 'faithful)' },
        { english: 'Pronounce', spanish: 'pronunciar', definition: 'to declare)' },
        { english: 'Purpose', spanish: 'propósito', definition: 'The result one hopes for in doing or making something; goal)' },
        { english: 'Murmur', spanish: 'murmurar', definition: 'a low, soft, continuing sound)' },
        { english: 'Virtue', spanish: 'virtud', definition: 'excellence in discerning right from wrong and choosing to do right)' },
        { english: 'Herbal', spanish: 'herbal', definition: 'made of herbs)' }
    ],
    
    list4: [
        { english: 'Jewel', spanish: 'joya', definition: 'She wore a beautiful jewel around her neck. (Ella llevaba una hermosa joya en su cuello.)' },
        { english: 'Loyal', spanish: 'leal', definition: 'My dog is very loyal and always stays by my side. (Mi perro es muy leal y siempre está a mi lado.)' },
        { english: 'Chowder', spanish: 'sopa espesa', definition: 'I had a delicious chowder for lunch today. (Hoy almorcé una deliciosa sopa espesa.)' },
        { english: 'Awesome', spanish: 'impresionante', definition: 'The view from the mountain was absolutely awesome. (La vista desde la montaña era absolutamente impresionante.)' },
        { english: 'Destroy', spanish: 'destruir', definition: 'The storm will destroy the crops if it doesn’t stop. (La tormenta destruirá los cultivos si no se detiene.)' },
        { english: 'Awkward', spanish: 'incómodo', definition: 'The silence during the meeting was really awkward. (El silencio durante la reunión fue realmente incómodo.)' }
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
