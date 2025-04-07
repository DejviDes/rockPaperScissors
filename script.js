let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    draws: 0
}

let resultElement = document.querySelector('.result');
let chosenStatusElement = document.querySelector('.chosenStatus');
let scoreElement = document.querySelector('.score');

scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;


function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    let result = '';

    if (playerChoice === computerChoice) {
        score.draws++;
        result = "It's draw!";
    } else if (playerChoice === 'rock' && computerChoice === 'scissors' ||
               playerChoice === 'paper' && computerChoice === 'rock' ||
               playerChoice === 'scissors' && computerChoice === 'paper') {
        score.wins++;
        result = 'You win!';
    } else {
        score.losses++;
        result = 'You lose!';
    }

    localStorage.setItem('score', JSON.stringify(score));

    resultElement.innerHTML = result;
    chosenStatusElement.innerHTML = `You <img width="40px" src="images/${playerChoice}-emoji.png" alt=""> <img width="40px" src="images/${computerChoice}-emoji.png" alt=""> Computer`;
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
}

function  getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.draws = 0;
    localStorage.setItem('score', JSON.stringify(score));
    resultElement.innerHTML = "";
    chosenStatusElement.innerHTML = "";
    scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Draws: ${score.draws}`;
}

let autoPlayStatus = false;
let intervalId;

let autoplayButton = document.querySelector('.autoplayBtn');

function autoPlay() {
    autoPlayStatus = !autoPlayStatus;
    console.log(autoPlayStatus);
    if (autoPlayStatus) {
        autoplayButton.innerHTML = "Stop Autoplay";
        intervalId = setInterval(() => {
            const choices = ['rock', 'paper', 'scissors'];
            const randomIndex = Math.floor(Math.random() * choices.length);
            playGame(choices[randomIndex]);
        }, 1500);
    } else {
        autoplayButton.innerHTML = "Start Autoplay";
        clearInterval(intervalId);
    }
}