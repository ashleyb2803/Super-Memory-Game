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
  let numBad;
  let ignoreClicks; 




  /*----- cached element references -----*/
  const msgEl = document.querySelector('h3');
  



  /*----- event listeners -----*/
  document.querySelector('main').addEventListener('click', handleChoice);
  
  



  /*----- functions -----*/
  init();


  function init() {
    cards = getShuffledCards();
    firstCard = null;
    numBad = 0;
    ignoreClicks = false;
    render();
  }


  function render() {
    cards.forEach(function(card, index) {
      const imgEl = document.getElementById(index);
      const src = (card.matched || card === firstCard) ? card.img : CARD_BACK;
      imgEl.src = src;
    });
    msgEl.innerHTML = `Number of bad attempts: ${numBad}`;
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
    firstCard = card; // store first selected card
    render(); // update display immediately to show the first card
    return;
  }

  // prevent clicking the same card twice or clicking already matched cards
  if (card === firstCard || card.matched) 
    return;

  ignoreClicks = true; // prevent more clicks until processing is done
  render(); // update display immediately to show the second card

  if (card.img === firstCard.img) {
    // Cards match
    card.matched = true;
    firstCard.matched = true;
    firstCard = null; // reset firstCard after a match
    ignoreClicks = false; // allow clicks again
    render(); // update the display to show matched cards
  } else {
    // cards dont match
    numBad++;
    setTimeout(() => {
      firstCard = null; // reset firstCard after a mismatch
      render(); // hide unmatched cards after a delay
      ignoreClicks = false; // allow clicks again
    }, 1000);
  }
}






    
 







//const = define card values
//variables = would be used to store the shuffled cards, selected cards, and matched cards
//cache = remember this reference to the DOM element
//event listeners = listen for clicks on the cards
//functions = init function to set up the game, shuffle the cards, and handle card selection


// Add audio?