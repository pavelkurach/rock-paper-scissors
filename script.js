/* eslint-disable no-console */

// To run in NodeJS
// eslint-disable-next-line import/no-extraneous-dependencies
const prompt = require("prompt-sync")();

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

let score = [0, 0];

for (let i = 0; i < 5; i += 1) {
    const playerSelection = prompt();
    const computerSelection = getComputerChoice();
    const { newScore, message } = playRound(playerSelection, computerSelection, score);
    score = newScore;
    console.log(message);
}

console.log(`Final score: You: ${score[0]}, computer: ${score[1]}`);
