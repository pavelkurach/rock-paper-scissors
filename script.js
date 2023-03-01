const prompt = require("prompt-sync")();
const ITEMS = ["Rock", "Paper", "Scissors"]

titleCase = string => string[0].toUpperCase() + string.slice(1).toLowerCase();
  
getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

getComputerChoice = () => ITEMS.at(getRandomInt(0, 2))

playRound = (playerSelection, computerSelection, score=[0, 0]) => {
    playerSelection = titleCase(playerSelection);
    const difference = ITEMS.indexOf(playerSelection)
                        - ITEMS.indexOf(computerSelection);
    switch (difference) {
        case 0:
            return `It's a tie! ${playerSelection} ties with ${computerSelection}.`;
        case 1:
            score[0]++;
            return `You win! ${playerSelection} beats ${computerSelection}.`;
        case -1:
            score[1]++;
            return `You lost! ${playerSelection} is beaten by ${computerSelection}.`;
        case 2:
            score[1]++;
            return `You lost! ${playerSelection} is beaten by ${computerSelection}.`;
        case -2:
            score[0]++;
            return `You win! ${playerSelection} beats ${computerSelection}.`;
    }
}


let score = [0, 0];


for (let i = 0; i < 5; i++) {
    const playerSelection = prompt();
    const computerSelection = getComputerChoice();
    console.log(playRound(playerSelection, computerSelection, score));
 }

 console.log(score); 