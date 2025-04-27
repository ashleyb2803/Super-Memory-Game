/*----- constants -----*/
// Each of the "card" objects will be copied twice,
// then shuffled and used for the board's cards
const SOURCE_CARDS = [
    {img: 'https://i.imgur.com/ZXPKaiN.jpg', matched: false},
    {img: 'https://i.imgur.com/XMEsZBX.jpg', matched: false},
    {img: 'https://i.imgur.com/6jX1bMT.jpg', matched: false},
    {img: 'https://i.imgur.com/yKdqsBv.jpg', matched: false},
    {img: 'https://i.imgur.com/1BV3HLr.jpg', matched: false},
    {img: 'https://i.imgur.com/QYmN6Hp.jpg', matched: false},
    {img: 'https://i.imgur.com/D5pWE05.jpg', matched: false},
    {img: 'https://i.imgur.com/Ss4Xo3x.jpg', matched: false}
  ];
  const CARD_BACK = 'https://i.imgur.com/WoEmI2M.jpg'; 
  
  /*----- app's state (variables) -----*/
  let cards; // Array of 16 shuffled card objects
  let firstCard; // The first card selected by the user
  
  /*----- cached element references -----*/
  
  
  /*----- event listeners -----*/
  
  
  /*----- functions -----*/
  init();

    // Initialize the game state and render the initial board
  function init() {
    
  }
  
  // Initialize all state, then call render()
    
 







//const = define card values
//variables = would be used to store the shuffled cards, selected cards, and matched cards
//cache = remember this reference to the DOM element
//event listeners = listen for clicks on the cards
//functions = init function to set up the game, shuffle the cards, and handle card selection