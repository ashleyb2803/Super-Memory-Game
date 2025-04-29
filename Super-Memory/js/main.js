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
  
  /*----- app's state (variables) -----*/
  let cards; 
  let firstCard; 
  let secondCard
  let numBad;
  let ignoreClicks; 




  /*----- cached element references -----*/
  const msgEl = document.querySelector('h3');
  const playAgainBtn = document.getElementById('play-again-btn');



  /*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  playAgainBtn.addEventListener('click', init); 
  



  /*----- functions -----*/
  init();


  function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    playAgainBtn.style.display = 'none';
    render();
  }


  function render() {
    cards.forEach(function(card, index) {
      const imgEl = document.getElementById(index);
      const src = (card.matched || card === firstCard || card === secondCard) ? card.img : CARD_BACK;
      imgEl.src = src;
    });
    msgEl.innerHTML = `Number of bad attempts: ${numBad}`;
  
    // Check if all cards are matched
    if (isWinner()) {
      msgEl.innerHTML = `Congratulations! You matched all cards with ${numBad} bad attempts.`;
      playAgainBtn.style.display = 'block'; // Show the "Play Again" button
    }
  }
  
  function isWinner() {
    return cards.every(card => card.matched); // Returns true if all cards are matched
  }
  

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
  console.log('second card selected');
  secondCard = card; 
  ignoreClicks = true; 
  render(); 
 }
 if (firstCard && secondCard) {
  if (firstCard.img === secondCard.img) {
    // Cards match
    firstCard.matched = true;
    secondCard.matched = true;
    firstCard = null;
    secondCard = null; // Reset both cards after a match
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






// render to dilpay second card immediately after selection
// UNMATCHED -Display -time; const

//set setTimeout
//first card
//temp card matched = false




    
 







//const = define card values
//variables = would be used to store the shuffled cards, selected cards, and matched cards
//cache = remember this reference to the DOM element
//event listeners = listen for clicks on the cards
//functions = init function to set up the game, shuffle the cards, and handle card selection
