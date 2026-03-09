const wordBank = ['soft', 'cone', 'melt', 'cool', 'cake', 'milk', 'mint', 'cold', 'dish', 'bean'];

let currentWord;
let guessedLetter = [];
let attempts = 0;

document.addEventListener("DOMContentLoaded", function () {

    startGame();
});

function startGame() {
    const randomIndex = Math.floor(Math.random() * wordBank.length);
    randomWord = wordBank[randomIndex]
    guessedLetter = [];
    attempts = 0;
    console.log("currentWord")
}

function displayWord() {
    let display = "";
    for (let i = 0; i < wordBank.length, i++) {
        let letter = word.charAt(i);
    }
}




