/*----- constants -----*/
    const CARDS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const numberOfCards = CARDS.length * 2;

  /*----- state variables -----*/
    let shuffledCards = [];
    let selectedCards = [];
    let matchedCards = [];




  /*----- cached elements  -----*/

    const gameBoard = document.getElementById('game-board');



  /*----- event listeners -----*/

  gameBoard.addEventListener('click', handleCardClick);




  /*----- functions -----*/
    
  // This intializes the game
    function init() {
    shuffledCards = shuffle(CARDS.concat(CARDS));
    selectedCards = [];
    matchedCards = [];
    render();
}

// this shuffles the cards
    function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

    
 







//const = define card values
//variables = would be used to store the shuffled cards, selected cards, and matched cards
//cache = remember this reference to the DOM element
//event listeners = listen for clicks on the cards
//functions = init function to set up the game, shuffle the cards, and handle card selection