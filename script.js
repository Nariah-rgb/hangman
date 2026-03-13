const wordBank = ['soft', 'cone', 'melt', 'cool', 'cake', 'milk', 'mint', 'cold', 'dish', 'bean'];

let randomWord;
let guessedLetter = [];
let attempts = 0;

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
});

function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex].toUpperCase();
    guessedLetter = [];
    attempts = 0;

    displayWord();
    console.log(randomWord)

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: ";
    document.getElementById("wrongLettersDisplay").textContent = "Wrong Letters: ";
    document.getElementById("message").textContent = "";

    document.getElementById("healthImage").src = "ice.png";
    console.log(randomWord)
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

    document.getElementById("wordDisplay").textContent = display;
}

function submitGuess() {
    let letter = guessInput.value.toUpperCase();
    if (!letter) return;
    guessInput.value = "";
    guessLetter(letter);
    console.log("Button clicked");
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
        document.getElementById("message").textContent = "Wrong!";
        updateHealthImage();
    }

    displayWord();

    document.getElementById("guessedLettersDisplay").textContent = "Guessed Letters: " + guessedLetter.join(" ");
    document.getElementById("wrongLettersDisplay").textContent = "Guesses Left: " + (4 - attempts);

}

function updateHealthImage() {
    let healthImage = document.getElementById("healthImage");
    healthImage.src = "ice" + attempts + ".jpg"
}

