$(document).ready(function() {
    // Word array
    let words;
    const exercises = ["Running","Weightlifting","Yoga","Swimming","Cycling","Jumping jacks","Squats","Push-ups","Plank","Pilates"];
    const diseases = ["Obesity", "Type 2 Diabetes", "Hypertension", "Cardiovascular disease", "Metabolic syndrome", "Depression", "Anxiety", "Osteoporosis", "Sleep apnea", "Chronic back pain"];
    const healthy_foods = ["Broccoli", "Salmon", "Quinoa", "Blueberries", "Avocado", "Kale", "Greek yogurt", "Almonds", "Oatmeal", "Spinach"];
    // Variables for the game state
    let selectedWord, wordLength, correctGuesses, displayedWord, incorrectGuesses,selectedTopic;

    // Function to start a new game
    const start_game = function() {
        if($('#hangmanTopics').val().toLowerCase() ==="exercises"){
            words = exercises.slice();
        }else if($('#hangmanTopics').val().toLowerCase()==="diseases"){
            words=diseases.slice();
        }else{
            words=healthy_foods.slice();
        }
        // Reset game state
        selectedWord = words[Math.floor(Math.random() * words.length)];
        wordLength = selectedWord.length;
        correctGuesses = 0;
        incorrectGuesses = 0;
        displayedWord = [];
        $('#wordDisplay').empty();
        $('#resultMessage').text('');
        $('#letters').show();
        $('#hangmanImage').attr('src', 'images/hangman0.jpg');

        // Display blanks for each letter in the word
        for (let i = 0; i < wordLength; i++) {
            displayedWord.push('_');
            $('#wordDisplay').append('<span>_</span>');
        }
    }

    // Handle letter submission
    $('#submitGuess').click(function() {
        let guess = $('#guess').val().toLowerCase();
        $('#guess').val('');
        if (guess.length !== 1 || !/[a-z]/.test(guess)) {
            alert('Please enter a single letter.');
            return;
        }
        let correctGuess = false;
        for (let i = 0; i < wordLength; i++) {
            if (selectedWord[i] === guess) {
                correctGuess = true;
                displayedWord[i] = guess;
                correctGuesses++;
            }
        }
        if (correctGuess) {
            $('#wordDisplay').empty();
            for (let i = 0; i < wordLength; i++) {
                $('#wordDisplay').append('<span>' + displayedWord[i] + '</span>');
            }
            if (correctGuesses === wordLength) {
                $('#resultMessage').text('Congratulations! You correctly guessed the word: ' + selectedWord);
                $('#letters').hide();
            }
        } else {
            incorrectGuesses++;
            $('#hangmanImage').attr('src', 'images/hangman' + incorrectGuesses + '.jpg');
            $('#resultMessage').text('Sorry, the letter ' + guess + ' is not in the word. Try again.');
            if (incorrectGuesses >= 6) {
                $('#resultMessage').text('Sorry, you reached the maximum number of incorrect guesses. The word was: ' + selectedWord);
                $('#letters').hide();
            }
        }
    });

    // Handle game reset
    $('#resetButton').click(start_game);

    // Start the first game
    start_game();
});
