/* eslint-disable no-console */

// To run in NodeJS
// eslint-disable-next-line import/no-extraneous-dependencies
// const prompt = require("prompt-sync")();

const ITEMS = ["Rock", "Paper", "Scissors"];

const titleCase = (string) => string[0].toUpperCase() + string.slice(1).toLowerCase();

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getComputerChoice = () => ITEMS.at(getRandomInt(0, 2));

const playRound = (playerSelection, computerSelection, score = [0, 0]) => {
    const playerSelectionTitleCase = titleCase(playerSelection);
    const difference = ITEMS.indexOf(playerSelectionTitleCase) - ITEMS.indexOf(computerSelection);

    const newScore = [...score];

    switch (difference) {
        case 0:
            return { newScore, message: `It's a tie! ${playerSelectionTitleCase} ties with ${computerSelection}.` };
        case 1:
            newScore[0] += 1;
            return { newScore, message: `You win! ${playerSelectionTitleCase} beats ${computerSelection}.` };
        case -1:
            newScore[1] += 1;
            return { newScore, message: `You lost! ${playerSelectionTitleCase} is beaten by ${computerSelection}.` };
        case 2:
            newScore[1] += 1;
            return { newScore, message: `You lost! ${playerSelectionTitleCase} is beaten by ${computerSelection}.` };
        case -2:
            newScore[0] += 1;
            return { newScore, message: `You win! ${playerSelectionTitleCase} beats ${computerSelection}.` };
        default:
            return { newScore, message: `Wrong value!` };
    }
};

const gameOver = (score) => score[0] === 3 || score[1] === 3;

const buttons = document.querySelectorAll("#buttons-container > button");
const matchResultDiv = document.querySelector("#match-result");
const scoreDiv = document.querySelector("#score");
const finalScoreDiv = document.querySelector("#final-score");
const playAgainMessage = document.querySelector("#play-again-message");
const playAgainButton = document.querySelector("#play-again-message > button");
const dim = document.querySelector("#dim");

playAgainMessage.style.display = "none";
dim.style.display = "none";

const toggleButtons = () => {
    buttons.forEach((button) => {
        // eslint-disable-next-line no-param-reassign
        button.disabled = !button.disabled;
    });
};

let score = [0, 0];

playAgainButton.addEventListener("click", () => {
    playAgainMessage.style.display = "none";
    dim.style.display = "none";
    score = [0, 0];
    toggleButtons();
    matchResultDiv.innerText = "";
    scoreDiv.innerText = `Current score: You: ${score[0]}, computer: ${score[1]}.`;
});

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const playerSelection = button.value;
        const computerSelection = getComputerChoice();
        const { newScore, message } = playRound(playerSelection, computerSelection, score);
        matchResultDiv.innerText = message;
        score = newScore;
        if (!gameOver(score)) {
            scoreDiv.innerText = `Current score: You: ${score[0]}, computer: ${score[1]}.`;
        } else {
            toggleButtons();
            scoreDiv.innerText = `Current score: You: ${score[0]}, computer: ${score[1]}.`;
            dim.style.display = "block";
            playAgainMessage.style.display = "block";
            if (score[0] === 3) finalScoreDiv.innerText = "You won!";
            else finalScoreDiv.innerText = "You lost!";
        }
    });
});
