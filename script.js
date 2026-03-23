const wordBank = ['soft', 'cone', 'melt', 'cool', 'cake', 'milk', 'mint', 'cold', 'dish', 'bean'];

let randomWord;
let guessedLetter = [];
let wrongLetters = [];
let attempts = 0;
let maxAttempts = 0;
let gameStarted = false;

document.addEventListener("DOMContentLoaded", function () {
    guessInput = document.getElementById("guessInput");
    startGame();

    document.getElementById("guessButton").addEventListener("click", submitGuess);
    document.getElementById("guessInput").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            submitGuess();
        }
    });
    /* keeps letters only A-Z & forces uppercase */
    guessInput.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
    });

    document.querySelector(" .easy").addEventListener("click", () => setDifficulty(4));
    document.querySelector(" .med").addEventListener("click", () => setDifficulty(3));
    document.querySelector(" .hard").addEventListener("click", () => setDifficulty(2));
});

function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex].toUpperCase();
    guessedLetter = [];
    wrongLetters = [];
    attempts = 0;

    displayWord();

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: ";
    document.getElementById("wrongLettersDisplay").textContent = "Wrong Letters: ";
    document.getElementById("message").textContent = "";

    document.getElementById("healthImage").src = "ice0.png";
}

function displayWord() {
    let display = "";
    for (let i = 0; i < randomWord.length; i++) {
        let letter = randomWord.charAt(i);

        if (guessedLetter.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("wordDisplay").textContent = display; }


function submitGuess() {
    if (!gameStarted) {
        document.getElementById("message").textContent = "Need to select a difficulty";
        return;
    }

    let letter = guessInput.value.toUpperCase();
    if (!letter) return;
    guessInput.value = "";
    guessLetter(letter);
}


function guessLetter(letter) {

    if (guessedLetter.includes(letter)) {
        document.getElementById("message").textContent = "Already guessed";
        return;
    }

    guessedLetter.push(letter);

    if (randomWord.includes(letter)) {
        document.getElementById("message").textContent = "Correct!";
    } else {
        attempts++;
        wrongLetters.push(letter);
        document.getElementById("message").textContent = "Wrong!";
        updateHealthImage();
    }

    displayWord();

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: " + guessedLetter.join(" ");
    document.getElementById("wrongLettersDisplay").textContent = "Wrong Letters: " + wrongLetters.join(" ");
    document.getElementById("wrongGuessDisplay").textContent = "Guesses Left: " + (maxAttempts - attempts);

    if (!document.getElementById("wordDisplay").textContent.includes("_")) {
        document.getElementById("message").textContent = "You win!";
        gameStarted = false;
        toggleDifficultyButtons(false);
        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }

    if (attempts >= maxAttempts) {
        endGame(false);
        document.getElementById("message").textContent = "You lose! The word was: " + randomWord;

        gameStarted = false;
        toggleDifficultyButtons(false);
        document.getElementById("guessInput").disabled = true;
        document.getElementById("guessButton").disabled = true;
    }

    if (checkWin()) {
        endGame(true);
    }

}

function updateHealthImage() {
    let healthImage = document.getElementById("healthImage");
    healthImage.src = "ice" + attempts + ".png"
}

function setDifficulty(value) {
    maxAttempts = value;
    gameStarted = true;
    document.getElementById("guessInput").disabled = false;
    document.getElementById("guessButton").disabled = false;
    toggleDifficultyButtons(true);
    startGame();
}
function toggleDifficultyButtons(disabled) {
    document.querySelector(".easy").disabled = disabled
    document.querySelector(".med").disabled = disabled
    document.querySelector(".hard").disabled = disabled
}

function checkWin() {
    for (let letter of randomWord) {
        if (!guessedLetter.includes(letter)) {
            return false;
        }
    }
    return true;
}

function endGame(won) {
    const message = document.getElementById("message");
    if (won) {
        message.textContent = "You win!";
        message.style.color = "green";
    } else {
        message.textContent = "You lose! The word was: " + randomWord;
        message.style.color = "red";
    }

    gameStarted = false;
    document.getElementById("guessInput").disabled = true;
    document.getElementById("guessButton").disabled = true;
    toggleDifficultyButtons(false);
}