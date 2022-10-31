const cards = document.querySelectorAll('.memory-card');
//cards is a list of all elements called memory-card

let hasFlippedCard=false;       //to store state of card
let firstCard, secondCard;      //to store flipped card
let lockBoard = false;          // stop flipping when cards turning back


function flipCard(){
    if (lockBoard) return;          //will not run function if board locked
    if (this === firstCard) return; //to stop first card being clicked twice
    this.classList.toggle('flip');  // adds or removes name flip to class

    if (!hasFlippedCard){           //first flip

        hasFlippedCard=true;    
        firstCard=this;
        return;
    }   

    //second click - will only execute if hasFlippedCard===true
    hasFlippedCard=false;
    secondCard=this;
   
    //do cards match?
    checkForMatch();

}

function checkForMatch(){   //do both cards match
                            //if so remove listener so card cannot be clicked
                            //if not - delay then flip cards back
                            //firstCard.dataset.name is how we retrieve data about card

    let isMatch = firstCard.dataset.name === secondCard.dataset.name; 

    isMatch ? dissableCards() : unFlipCards();  //turnary operator
    console.log(isMatch)
}

function dissableCards(){   //to remove event listener
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
}

function unFlipCards(){     //to unflip the cards if not match - remove flip class
    lockBoard=true;         //to stop overflipping
    setTimeout(()=>{        //timer so we have time to see second card
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard(){
    hasFlippedCard = false, lockBoard = false;  //reset so cards can be picked on first card
    firstCard=null,secondCard=null;
}

(function shuffle() {      //shuffle cards
    cards.forEach(card => {                             //cycle through each card
        let randomPos = Math.floor(Math.random() *12);  //assign random number between 0 and 11
        card.style.order = randomPos;                    //assign to cards order property
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard)); 
//loop through cards list and add event listener to each card, activates the flipCard  function