const words = [
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
 
];

document.addEventListener('DOMContentLoaded', () => {
    const wordContainer = document.getElementById('word-container');
    const translationContainer = document.getElementById('translation-container');
    const feedback = document.getElementById('feedback');
    const definitionContainer = document.getElementById('definition-container');
    const scoreElement = document.getElementById('score');

    let selectedWord = null;
    let selectedTranslation = null;
    let score = 0;
    let correctMatches = [];
    let currentStage = 1;
    const halfIndex = Math.ceil(words.length / 2);

    function loadWords(stage) {
        wordContainer.innerHTML = '';
        translationContainer.innerHTML = '';
        definitionContainer.innerText = '';
        feedback.innerText = '';

        const wordsToDisplay = stage === 1 
            ? words.slice(0, halfIndex) 
            : words.slice(halfIndex);

        const shuffledWords = [...wordsToDisplay].sort(() => 0.5 - Math.random());
        const shuffledTranslations = [...wordsToDisplay].sort(() => 0.5 - Math.random());

        shuffledWords.forEach((wordObj, index) => {
            const wordDiv = document.createElement('div');
            wordDiv.innerText = wordObj.english;
            wordDiv.classList.add('word');
            wordDiv.setAttribute('data-index', index);
            wordDiv.onclick = () => selectWord(wordObj.english, wordDiv);
            wordContainer.appendChild(wordDiv);
        });

        shuffledTranslations.forEach((wordObj, index) => {
            const transDiv = document.createElement('div');
            transDiv.innerText = wordObj.spanish;
            transDiv.classList.add('translation');
            transDiv.setAttribute('data-index', index);
            transDiv.onclick = () => selectTranslation(wordObj.spanish, transDiv);
            translationContainer.appendChild(transDiv);
        });
    }

    function selectWord(word, element) {
        selectedWord = word;
        highlightSelection(element, 'word');
    }

    function selectTranslation(translation, element) {
        selectedTranslation = translation;
        highlightSelection(element, 'translation');
    }

    function highlightSelection(element, type) {
        const elements = document.querySelectorAll(`.${type}`);
        elements.forEach(el => el.classList.remove('selected'));
        element.classList.add('selected');
    }

    document.getElementById('check-answer').onclick = () => {
        if (selectedWord && selectedTranslation) {
            const correct = words.find(wordObj => wordObj.english === selectedWord && wordObj.spanish === selectedTranslation);
            if (correct) {
                feedback.innerText = 'Correct!';
                definitionContainer.innerText = correct.definition;
                incrementScore();
                markCorrectMatch();
            } else {
                feedback.innerText = 'Wrong, try again!';
                definitionContainer.innerText = '';
            }
        } else {
            feedback.innerText = 'Please select both a word and a translation.';
            definitionContainer.innerText = '';
        }
    };

    function incrementScore() {
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }

    function markCorrectMatch() {
        const selectedWordDiv = document.querySelector('.word.selected');
        const selectedTranslationDiv = document.querySelector('.translation.selected');
        
        selectedWordDiv.classList.add('correct');
        selectedTranslationDiv.classList.add('correct');
        
        selectedWordDiv.onclick = null;
        selectedTranslationDiv.onclick = null;
        
        correctMatches.push({ word: selectedWord, translation: selectedTranslation });
        
        selectedWord = null;
        selectedTranslation = null;
        
        if (correctMatches.length === halfIndex) {
            if (currentStage === 1) {
                feedback.innerText = 'Great job! You completed the first challenge. Get ready for the champion game!';
                currentStage = 2;
                loadWords(2);
                correctMatches = [];
            } else {
                feedback.innerText = 'Congratulations! You matched all the words!';
            }
        }
    }

    document.getElementById('reset-game').onclick = () => {
        score = 0;
        correctMatches = [];
        scoreElement.innerText = `Score: ${score}`;
        currentStage = 1;
        loadWords(currentStage);
    };

    // Initial call to load words for stage 1
    loadWords(currentStage);
});
