// store the gameboard as an array inside of a Gameboard object
// players are also going to be stored in objects
// want an object to control the flow of the game itself

// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

const gameBoard= (() => {
    const gameBoardArray = []
    
})();

const Player = (name, marker) => {
    const getName = () => name
    const getMarker = () => marker;

    return {getName, getMarker}
}

const playerX = Player('fryman', 'X')