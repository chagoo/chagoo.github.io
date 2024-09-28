document.addEventListener('DOMContentLoaded', () => {
    const wordLists = {

        list5: [
            { english: 'Furnish', spanish: 'amueblar', definition: 'They plan to furnish the house with modern furniture. (Planean amueblar la casa con muebles modernos.)' },
            { english: 'Cashier', spanish: 'cajero', definition: 'The cashier handed me the receipt after I paid. (El cajero me entregó el recibo después de pagar.)' },
            { english: 'Purpose', spanish: 'propósito', definition: 'Her purpose in life is to help others. (Su propósito en la vida es ayudar a los demás.)' },
            { english: 'Alert', spanish: 'alerta', definition: 'The police issued an alert for the missing person. (La policía emitió una alerta por la persona desaparecida.)' },
            { english: 'Volunteer', spanish: 'voluntario', definition: 'I decided to volunteer at the animal shelter. (Decidí ser voluntario en el refugio de animales.)' },
            { english: 'Frontier', spanish: 'frontera', definition: 'They crossed the frontier between the two countries. (Cruzaron la frontera entre los dos países.)' }
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
