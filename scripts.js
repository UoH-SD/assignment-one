const cards = document.querySelectorAll('.memory-card');//cards is a list of all elements called memory-card

let hasFlippedCard = false;     //is first or second card flipped flag
let lockBoard = false;          //to stop over flipping
let firstCard, secondCard;      //for putting data about which card is flipped


function flipCard(){            //called when card flipped
    if (lockBoard) return;      //wont let card be flipped when timout running
    if (this === firstCard) return; //this will stop same card being clicked twice-will need to reset after each turn
    this.classList.add('flip'); //adds flip so card will

    if (!hasFlippedCard){       //first click
        hasFlippedCard=true;
        firstCard=this;

        return;
    }                     
    
    //second click - will only execute if hasFlippedCard===true
    hasFlippedCard=false;
    secondCard=this;
    
    checkForMatch();        //check if there is a match        
    
}

function checkForMatch(){   //do both cards match
                            //if so remove listener so card cannot be clicked
                            //if not - delay then flip cards back
                            //firstCard.dataset.framework is how we retrieve data about card
                            
                          
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? dissableCards() : unflipCards();      //match : not match
}

function dissableCards(){
    firstCard.removeEventListener('click',flipCard);//need to stop lilstening to these cards
    secondCard.removeEventListener('click',flipCard);//have to remove event and function called
}

function unflipCards(){
    lockBoard=true;                 //stops flipping while timeout going
    setTimeout(()=>{                        //  -so we can see card before flipped back
                                            //not a match - reset cards by removing flip
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();               
        }, 1500);
}

function resetBoard(){              //this allows us to choose the same first card as last attempt
    hasFlippedCard=false, lockBoard=false;
    firstCard=null, secondCard=null;
}

(function shuffle() {      //shuffle cards
    cards.forEach(card => {                             //cycle through each card
        let randomPos = Math.floor(Math.random() *12);  //assign random number between 0 and 11
        card.style.order = randomPos;                    //assign to cards order property
        console.log(randomPos);
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));


