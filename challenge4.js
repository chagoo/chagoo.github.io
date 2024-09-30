document.addEventListener('DOMContentLoaded', () => {
    let words = [];
    let currentWord = null;

    const spanishWordElem = document.getElementById('spanish-word');
    const feedback = document.getElementById('feedback');
    const submitButton = document.getElementById('submit-guess');
    const resetButton = document.getElementById('reset-game');

    // Fetch word list from JSON file
    fetch('words.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            words = data;
            loadNewWord();
        })
        .catch(error => {
            console.error('Error loading word list:', error);
            // Display error message to the user
            spanishWordElem.innerText = 'Error loading words. Please try again later.';
            feedback.innerText = 'We encountered a problem loading the word list.';
            feedback.style.color = 'red';
            submitButton.disabled = true;  // Disable submit button
        });

    // Load a new word
    function loadNewWord() {
        if (words.length > 0) {
            const randomIndex = Math.floor(Math.random() * words.length);
            currentWord = words[randomIndex];
            spanishWordElem.innerText = currentWord.spanish;
            feedback.innerText = '';
            submitButton.disabled = false;  // Re-enable the button in case it was disabled
        }
    }

    // Function to recognize user's pronunciation using Web Speech API
    function recognizeSpeech(callback) {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';
        recognition.interimResults = false; // Only return final results
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
            // Change button color to red when waiting for pronunciation
            submitButton.style.backgroundColor = 'red';
        };

        recognition.onresult = function(event) {
            const userSpokenWord = event.results[0][0].transcript.toLowerCase();
            callback(userSpokenWord);
        };

        recognition.onerror = function(event) {
            console.error('Error recognizing speech:', event.error);
            feedback.innerText = 'Error recognizing speech. Please try again.';
            feedback.style.color = 'red';
            // Change button color back to green after error
            submitButton.style.backgroundColor = 'green';
        };

        recognition.onend = function() {
            // Change button color back to green after speech is processed
            submitButton.style.backgroundColor = 'green';
        };

        recognition.start(); // Start the speech recognition
    }

    // Handle the speech input (pronunciation) when user clicks submit
    submitButton.addEventListener('click', () => {
        recognizeSpeech((userSpokenWord) => {
            if (userSpokenWord === currentWord.english.toLowerCase()) {
                feedback.innerText = 'Correct pronunciation! Well done!';
                feedback.style.color = 'green';
            } else {
                feedback.innerText = `Incorrect pronunciation. You said: "${userSpokenWord}". The correct word is: ${currentWord.english}`;
                feedback.style.color = 'red';
            }
        });
    });

    // Reset the game and load a new word
    resetButton.addEventListener('click', loadNewWord);
});
