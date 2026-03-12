const wordBank = ['soft', 'cone', 'melt', 'cool', 'cake', 'milk', 'mint', 'cold', 'dish', 'bean'];

let randomWord;
let guessedLetter = [];
let attempts = 0;

document.addEventListener("DOMContentLoaded", function () {
    startGame();

    document.getElementById("guessButton").addEventListener("click", submitGuess);
    document.getElementById("guessedInput").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            submitGuess();
        }
    });
});

const guessInput = document.getElementById("guessInput");
/* keeps letters only A-Z & forces uppercase */ 
guessInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
});

function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex]
    guessedLetter = [];
    attempts = 0;

    displayWord(); 
    console.log(randomWord)

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: ";
    document.getElementById("wrongLettersDisplay").textContent = "Wrong Letters: ";
    document.getElementById("message").textContent = "";
}

function displayWord() {
    let display = "";
    for (let i = 0; i < randomWord.length; i++) {
        let letter = randomWord.charAt(i);

        if(guessedLetter.includes(letter)) {
            display += letter + " ";
        } else {
            display += "_ ";
        }
    }

    document.getElementById("wordDisplay").textContent = display;
}

function guessLetter(letter) {

    if (!guessedLetter.includes(letter)) {
        guessedLetter.push(letter);
    }

    if (!randomWord.includes(letter)) {
        attempts++;
        document.getElementById("message").textContent = "Wrong!";
    } else {
        document.getElementById("message").textContent = "Correct!";
    }

    displayWord();

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: " + guessedLetter.join(" ");
    document.getElementById("wrongLettersDisplay").textContent = "Guesses Left: " + (4 - attempts);

}

function guessButton() {
    var guessInput = document.getElementById('guessInput');
    var userGuess = guessInput.value;
    guessInput.value = '';
    guessInput.focus();
}




