document.addEventListener('DOMContentLoaded', () => {
    const wordLists = {

        list4: [
            { english: 'Jewel', spanish: 'joya', definition: 'She wore a beautiful jewel around her neck. (Ella llevaba una hermosa joya en su cuello.)' },
            { english: 'Loyal', spanish: 'leal', definition: 'My dog is very loyal and always stays by my side. (Mi perro es muy leal y siempre está a mi lado.)' },
            { english: 'Chowder', spanish: 'sopa espesa', definition: 'I had a delicious chowder for lunch today. (Hoy almorcé una deliciosa sopa espesa.)' },
            { english: 'Awesome', spanish: 'impresionante', definition: 'The view from the mountain was absolutely awesome. (La vista desde la montaña era absolutamente impresionante.)' },
            { english: 'Cocoon', spanish: 'capullo', definition: 'The butterfly emerged from its cocoon after a week. (La mariposa salió de su capullo después de una semana.)' },
            { english: 'Hoist', spanish: 'izar', definition: 'They used a crane to hoist the heavy materials. (Usaron una grúa para izar los materiales pesados.)' },
            { english: 'Applaud', spanish: 'aplaudir', definition: 'The audience began to applaud after the performance. (La audiencia comenzó a aplaudir después de la actuación.)' },
            { english: 'Rejoice', spanish: 'regocijarse', definition: 'We all rejoice when we hear good news. (Todos nos regocijamos cuando escuchamos buenas noticias.)' },
            { english: 'Pronounce', spanish: 'pronunciar', definition: 'Can you help me pronounce this word correctly? (¿Puedes ayudarme a pronunciar esta palabra correctamente?)' },
            { english: 'Saucer', spanish: 'platillo', definition: 'She placed the cup on the saucer. (Ella puso la taza sobre el platillo.)' },
            { english: 'Soothe', spanish: 'calmar', definition: 'This music will soothe your mind after a long day. (Esta música calmará tu mente después de un largo día.)' },
            { english: 'Coupon', spanish: 'cupón', definition: 'I used a coupon to get a discount on my purchase. (Usé un cupón para obtener un descuento en mi compra.)' },
            { english: 'Caution', spanish: 'precaución', definition: 'Please drive with caution on the icy roads. (Por favor, maneja con precaución en las carreteras heladas.)' },
            { english: 'Bassoon', spanish: 'fagot', definition: 'He plays the bassoon in the orchestra. (Él toca el fagot en la orquesta.)' },
            { english: 'Auction', spanish: 'subasta', definition: 'The painting was sold at an auction for a high price. (La pintura se vendió en una subasta por un alto precio.)' },
            { english: 'Voyage', spanish: 'viaje', definition: 'They embarked on a long voyage across the ocean. (Embarcaron en un largo viaje por el océano.)' },
            { english: 'Cougar', spanish: 'puma', definition: 'We saw a cougar in the forest during our hike. (Vimos un puma en el bosque durante nuestra caminata.)' },
            { english: 'Steward', spanish: 'auxiliar de vuelo', definition: 'The steward served drinks during the flight. (El auxiliar de vuelo sirvió bebidas durante el vuelo.)' },
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