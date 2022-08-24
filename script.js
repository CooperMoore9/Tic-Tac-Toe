// store the gameboard as an array inside of a Gameboard object
// players are also going to be stored in objects
// want an object to control the flow of the game itself

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// correlate buttons on html to javascript buttons, when you click the buttons add it into the array where the button is

const gameBoard = (() => {
    const gameBoardArray = ['', '', '', '', '', '', '', '', '']

    return {gameBoardArray}    
})();

const Player = (name, marker) => {
    const getName = () => name
    const getMarker = () => marker;

    return {getName, getMarker}
}

const Game = () => {

  const boardButtons = document.querySelectorAll('.boardButton');
  let playerTurn = 'player1'
  
  for (btn of boardButtons) {
      btn.addEventListener('click', function() {
        if(playerTurn == 'player1'){
          this.textContent = 'X'
          playerTurn = 'player2'
        }else{
          this.textContent = 'O'
          playerTurn = 'player1'
        }
      });
    }
}

// const PlayerSelect = () => {
//   const playerButtons = document.getElementsByClassName('.playerOne')
  
//   playerButtons.addEventListener('click', function() {
//     console.log('playerOne')
//   })

// }

console.log(typeof(gameBoard))
console.log(gameBoard.gameBoardArray)
// PlayerSelect();
Game();