document.addEventListener('DOMContentLoaded', () => {
    if (window.Scoreboard) {
        Scoreboard.load();
        const achievementsDiv = document.getElementById('achievements');
        const scores = Scoreboard.getAllScores();
        achievementsDiv.innerHTML = '<h2>Achievements</h2>';
        const list = document.createElement('ul');
        Object.keys(scores).forEach(key => {
            const li = document.createElement('li');
            li.innerText = `${key}: ${scores[key]} points`;
            list.appendChild(li);
        });
        achievementsDiv.appendChild(list);
    }

    let wordLists = {};

    // Fetch the lists from JSON and populate the select options
    fetch('menu_wordlists.json')
        .then(resp => resp.json())
        .then(data => {
            wordLists = data;
            wordListSelect.innerHTML = '';
            Object.keys(wordLists).forEach(key => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = key;
                wordListSelect.appendChild(option);
            });
        })
        .catch(err => console.error('Error loading word lists:', err));



    // Get references to elements
    const wordListSelect = document.getElementById('word-list-select');
    const studyWordsButton = document.getElementById('study-words');
    const wordListModal = document.getElementById('word-list-modal');
    const closeModal = document.querySelector('.close');
    const wordListContainer = document.getElementById('word-list');
    const startGameButton = document.getElementById('start-game');
    // Link for Challenge 3
    const challenge3Link = document.getElementById('challenge3-link');

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
    challenge3Link.onclick = () => {
        const selectedList = wordListSelect.value;
        localStorage.setItem('selectedWordList', JSON.stringify(wordLists[selectedList]));
        window.location.href = 'challenge3.html'; // Redirect to Challenge 3
    };
});
