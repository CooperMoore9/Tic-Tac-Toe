// store the gameboard as an array inside of a Gameboard object
// players are also going to be stored in objects
// want an object to control the flow of the game itself

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// correlate buttons on html to javascript buttons, when you click the buttons add it into the array where the button is

// Possible solution to GameState; Every time a button is clicked, check the text context of the board, check which class it has then add it to the array at the class of the html element

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

    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    let playerTurn = ''
    let currentPlayerMarker = ''
    let botTurn = ''
    let turnCounter = 0

    return {
      gameBoardArray, 
      playerTurn, 
      currentPlayerMarker, 
      botTurn, 
      turnCounter,
      WINNING_MOVES
    }    
})();

function winnah() {
  for (let i = 0; i < gameBoard.WINNING_MOVES.length; i++){
    let winnerCounter = 0
    let variable = gameBoard.WINNING_MOVES[i]
    console.log(variable)
    for (let j = 0; j < variable.length; j++){
      console.log(variable[j])
      if(gameBoard.gameBoardArray[variable[j]] === "X"){
        winnerCounter += 1;
        if(winnerCounter === 3){
          console.log('winnah')
        }
      }else{
        winnerCounter = 0
      }
    }
  }
}


const Game = () => {

  const boardButtons = document.querySelectorAll('.boardButton');
  
  for (btn of boardButtons) {
      btn.addEventListener('click', function() {
        if(playerTurn == 'player1'){
          currentPlayerMarker = 'X'
          botTurn = 'player2'
        }else if(playerTurn == 'player2'){
          currentPlayerMarker = 'O'
          botTurn = 'player1'
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
        gameBoard.turnCounter += 1
        if(gameBoard.turnCounter < 9){
        BotChoice()
        }
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
      gameBoard.gameBoardArray[botSpot] = 'O';
      boardButtons[botSpot].textContent = 'O';
      gameBoard.turnCounter += 1
    }else {
      let botSpot = Math.floor(Math.random()*9);
      botLoop(botSpot);
      
    }
    console.log(gameBoard.gameBoardArray)
  }
}

const PlayerSelect = () => {
  const playerOneButton = document.getElementById('playerOne')
  const playerTwoButton = document.getElementById('playerTwo')
  
  playerOneButton.addEventListener('click', () => {
    document.getElementById('playerOne').disabled = true;
    document.getElementById('playerTwo').disabled = true;
    playerTurn = 'player1'
    Game()
    GameState();
  })

  playerTwoButton.addEventListener('click', () => {
    document.getElementById('playerOne').disabled = true;
    document.getElementById('playerTwo').disabled = true;
    playerTurn = 'player2'
    Game()
    GameState();
  })
}

PlayerSelect();
