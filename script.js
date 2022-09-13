const gameBoard = (() => {

  const WINNING_MOVES = 
    [[0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]];

    let gameBoardArray = ['', '', '', '', '', '', '', '', ''];
    let playerTurn = '';
    let currentPlayerMarker = '';
    let botTurn = '';
    let turnCounter = 0;
    let botMarker = '';
    let winner = '';
    let lastMarkerPlaced = '';

    return {
      gameBoardArray, 
      playerTurn, 
      currentPlayerMarker, 
      botTurn, 
      turnCounter,
      WINNING_MOVES,
      botMarker,
      winner,
      lastMarkerPlaced
    }    
})();

function winnah() {
  for (let i = 0; i < gameBoard.WINNING_MOVES.length; i++){
    let winnerCounter = 0;
    let winningMoveArrays = gameBoard.WINNING_MOVES[i]
    let currentMarker = gameBoard.lastMarkerPlaced
    for (let j = 0; j < winningMoveArrays.length; j++){
      if(gameBoard.gameBoardArray[winningMoveArrays[j]] === currentMarker){
        winnerCounter += 1;
      }
      if(winnerCounter === 3){
        if(currentMarker === 'X'){
          gameBoard.winner = 'Player 1'
          reset()
          return
        }else if(currentMarker === 'O'){
          gameBoard.winner = 'Player 2'
          reset()
          return
        }
      }
    }
  }
  if(gameBoard.turnCounter >= 9 && gameBoard.winner === ''){
    console.log('Tie')
    gameBoard.winner = 'Tie'
    reset()
    return
  }
}

function reset() {

  const boardButtons = document.querySelectorAll('.boardButton');
  const winnerDisplay = document.getElementById('winnerDisplay')
  const resetButton = document.getElementById('resetButton')
  const winnerText = document.getElementById('winnerText')
  const p1ScoreDisplay = document.getElementById('p1Score')
  const p2ScoreDisplay = document.getElementById('p2Score')
  let p1Score = parseInt(p1ScoreDisplay.textContent)
  let p2Score = parseInt(p2ScoreDisplay.textContent)

  winnerDisplay.style.display = 'flex'

  if(gameBoard.winner === 'Player 1' || gameBoard.winner === 'Player 2'){
    winnerText.textContent = `${gameBoard.winner}` + ` wins`;
  }else {
    winnerText.textContent = 'TIE'
  }
  for (btn of boardButtons) {
    btn.disabled = true;
  }
    if(gameBoard.winner === 'Player 1'){
      p1Score += 1
      p1ScoreDisplay.textContent = p1Score
    }else if(gameBoard.winner === 'Player 2'){
      p2Score += 1
      p2ScoreDisplay.textContent = p2Score
  }

  resetButton.addEventListener('click', () => {
    winnerDisplay.style.display = 'none'
    gameBoard.gameBoardArray = ['', '', '', '', '', '', '', '', ''];
    gameBoard.gameBoardArray.forEach(element => {
    });
    for (btn of boardButtons) {
      btn.disabled = false;
      btn.textContent = '';
    }
      
      gameBoard.turnCounter = 0;
      gameBoard.winner = '';
      Game();
      GameState();
      if(playerTurn === 'player2'){
        BotChoice();
      }
      
  })
}


const Game = () => {

  const boardButtons = document.querySelectorAll('.boardButton');

  for (btn of boardButtons) {
    btn.addEventListener('click', function() {
      if(playerTurn === 'player1'){
        currentPlayerMarker = 'X';
        botMarker = 'O';
        botTurn = 'player2';
      }else if(playerTurn === 'player2'){
        currentPlayerMarker = 'O';
        botMarker = 'X';
        botTurn = 'player1';
      }
    });
  }
}

const GameState = () => {
  const boardButtons = document.querySelectorAll('.boardButton');
  for (btn of boardButtons) {
    btn.addEventListener('click', function() {
      if(gameBoard.gameBoardArray[this.id] === ''){
        let markerPosition = parseInt(this.id);
        gameBoard.gameBoardArray[markerPosition] = currentPlayerMarker;
        this.textContent = currentPlayerMarker;
        gameBoard.turnCounter += 1;
        winnah();
        if(gameBoard.turnCounter < 9 && gameBoard.winner === ''){
          BotChoice();
        }
        gameBoard.lastMarkerPlaced = currentPlayerMarker;
      }
    });
  }
}

const BotChoice = () => {
  const boardButtons = document.querySelectorAll('.boardButton');
  botSpot = Math.floor(Math.random()*9);

  botLoop(botSpot)
  
  function botLoop(botSpot){
    if(gameBoard.gameBoardArray[botSpot] === ''){
      gameBoard.gameBoardArray[botSpot] = botMarker;
      boardButtons[botSpot].textContent = botMarker;
      gameBoard.lastMarkerPlaced = botMarker;
      gameBoard.turnCounter += 1
      winnah();
    }else {
      let botSpot = Math.floor(Math.random()*9);
      botLoop(botSpot);
      
    }
  }
}

const PlayerSelect = () => {

  const playerOneButton = document.getElementById('playerOne')
  const playerTwoButton = document.getElementById('playerTwo')
  
  playerOneButton.addEventListener('click', () => {
    document.getElementById('playerOne').disabled = true;
    document.getElementById('playerTwo').disabled = true;
    playerTurn = 'player1';
    Game();
    GameState();
  })

  playerTwoButton.addEventListener('click', () => {
    document.getElementById('playerOne').disabled = true;
    document.getElementById('playerTwo').disabled = true;
    playerTurn = 'player2';
    botMarker = 'X'
    Game();
    GameState();
    BotChoice();
  })
}

PlayerSelect();