  /*----- constants -----*/
  // Each of the "card" objects will be copied twice,
  // then shuffled and used for the board's cards
  const SOURCE_CARDS = [
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142254-1024x691.stranger-things-dustin-lp.52019.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142255-1024x691.stranger-things-lucas-lp.52019.jpg.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142253-1024x691.stranger-things-will-lp.52019.jpg.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142253-1024x691.stranger-things-mike-lp.52019.jpg.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142252-1024x691.stranger-things-eleven-lp.52019.jpg.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_692x1024-190520142255-1024x691.stranger-things-joyce-lp.52019.jpg.jpg?fit=around%7C776:1149&output-quality=90&crop=776:1149;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142256-1024x691.stranger-things-steve-lp.52019.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false},
    {img: 'https://akns-images.eonline.com/eol_images/Entire_Site/2019420/rs_691x1024-190520142254-1024x691.stranger-things-billy-lp.52019.jpg?fit=around%7C776:1150&output-quality=90&crop=776:1150;center,top', matched: false}
  ];
  const CARD_BACK = 'https://pyramidinternational.com/cdn/shop/files/wdc101200_9e23987a-8bb7-4ca6-bf64-c25aaa4f4db7_540x.jpg?v=1738716526'; 
  
  // Source Cards is the array that contains the card objects, 
  // each with an image URL and a matched property.
  // Card Back is the URL for the image that will be shown on the back of the cards.



  /*----- app's state (variables) -----*/
  let cards; 
  let firstCard; 
  let secondCard
  let numBad;
  let ignoreClicks; 

  // cards holds the shuffled cards, 
  // firstCard and secondCard are used to store the currently selected cards,
  // numBad counts the number of bad attempts
  // ignoreClicks is to prevent further clicks while processing a match or mismatch.


  /*----- cached element references -----*/
  const msgEl = document.querySelector('h3');
  const playAgainBtn = document.getElementById('play-again-btn');

  // playAgainBtn is the button that allows the player to restart the game.
  // h3 is the element in the DOM that displays messages to the player.


  /*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  playAgainBtn.addEventListener('click', init); 
  
  // Adds a click event listener to the main element 'game board'


  /*----- functions -----*/
    init();

  // Initializes the game by shuffling the cards, 
  // resetting the selected cards and bad attempts,

    function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    playAgainBtn.style.display = 'none';
    render();
  }

    // Updates the game boardby iterating over the cards array 
    // and setting the image source for each card element.
    // Updatres 'h3' element with the current number of bad attempts.
    function render() {
    cards.forEach(function(card, index) {
      const imgEl = document.getElementById(index);
      const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
      imgEl.src = src;
    });
      msgEl.innerHTML = `Number of bad attempts: ${numBad}`;
    

      if (isWinner()) {
      msgEl.innerHTML = `Congratulations! You matched all cards with ${numBad} bad attempts.`;
      playAgainBtn.style.display = 'block'; 
      }
    }
  
    function isWinner() {
    return cards.every(card => card.matched); // Returns true if all cards are matched
    }
  
  // This function creates a shuffled deck of cards by duplicating each card in SOURCE_CARDS,
  // then shuffling them using a random index to pick cards from a temporary array.
    function getShuffledCards() {
    let tempCards = [];
    let cards = [];
    for (let card of SOURCE_CARDS) {
    tempCards.push({...card}, {...card});
    }
    while (tempCards.length) {
    let rndIdx = Math.floor(Math.random() * tempCards.length);
    let card = tempCards.splice(rndIdx, 1)[0];
    cards.push(card);
    }
    return cards;
    }


// This function handles the card selection logic.
// If no card is selected, it sets the firstCard.
// If a second card is selected, it checks if the cards match.
// If they match, it marks them as matched and resets the selected cards.
// If they don't match, it increments the bad attempt counter 
// and resets the selected cards after a delay.
// ignoreClicks is used to prevent further clicks while processing a match or mismatch.

  function handleChoice(event) {
  const cardIdx = parseInt(event.target.id);
  if (isNaN(cardIdx) || ignoreClicks) return;

  const card = cards[cardIdx];
  if (!firstCard) {
    firstCard = card; 
    render(); 
    return;
  }

  if (card === firstCard || card.matched) return;
  if (firstCard && !secondCard) {
  secondCard = card; 
  ignoreClicks = true; 
  render(); 
  }
  
  if (firstCard && secondCard) {
  if (firstCard.img === secondCard.img) {
    firstCard.matched = true;
    secondCard.matched = true;
    firstCard = null;
    secondCard = null; 
    ignoreClicks = false; 
    render(); 
  } else {
    
    numBad++;
    setTimeout(() => {
      firstCard = null;
      secondCard = null; 
      render(); 
      ignoreClicks = false; 
    }, 1000);
  }}
}



//const = define card values
//variables = would be used to store the shuffled cards, selected cards, and matched cards
//cache = remember this reference to the DOM element
//event listeners = listen for clicks on the cards
//functions = init function to set up the game, shuffle the cards, and handle card selection
