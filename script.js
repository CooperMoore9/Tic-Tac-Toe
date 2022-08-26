// store the gameboard as an array inside of a Gameboard object
// players are also going to be stored in objects
// want an object to control the flow of the game itself

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// correlate buttons on html to javascript buttons, when you click the buttons add it into the array where the button is

// Possible solution to GameState; Every time a button is clicked, check the text context of the board, check which class it has then add it to the array at the class of the html element

const gameBoard = (() => {
    let gameBoardArray = ['', '', '', '', '', '', '', '', '']
    let playerTurn = ''
    let currentPlayerMarker = ''
    let botTurn = ''

    return {gameBoardArray, playerTurn, currentPlayerMarker, botTurn}    
})();

const Game = () => {

  const boardButtons = document.querySelectorAll('.boardButton');
  
  for (btn of boardButtons) {
      btn.addEventListener('click', function() {
        if(playerTurn == 'player1'){
          currentPlayerMarker = 'X'
          this.textContent = 'X'
          botTurn = 'player2'
        }else if(playerTurn == 'player2'){
          currentPlayerMarker = 'O'
          this.textContent = 'O'
          botTurn = 'player1'
        }
      });
    }
}

const GameState = () => {
  const boardButtons = document.querySelectorAll('.boardButton');
  for (btn of boardButtons) {
    btn.addEventListener('click', function() {
      let markerPosition = parseInt(this.id)
      gameBoard.gameBoardArray.splice(markerPosition, 1, currentPlayerMarker)
      console.log(gameBoard.gameBoardArray)
      
    });
  }
}

const botChoice = () => {

}

const PlayerSelect = () => {
  const playerOneButton = document.getElementById('playerOne')
  const playerTwoButton = document.getElementById('playerTwo')
  
  playerOneButton.addEventListener('click', () => {
    playerTurn = 'player1'
    Game()
    GameState();
  })

  playerTwoButton.addEventListener('click', () => {
    playerTurn = 'player2'
    Game()
    GameState();
  })

}

// console.log(typeof(gameBoard))
// console.log(gameBoard.gameBoardArray)
PlayerSelect();
