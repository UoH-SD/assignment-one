const cards = document.querySelectorAll('.memory-card');
//cards is a list of all elements called memory-card

let hasFlippedCard=false;       //to store state of card
let firstCard, secondCard;      //to store flipped card


function flipCard(){
    this.classList.toggle('flip'); // adds or removes name flip to class

    if (!hasFlippedCard){        //first flip

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
    setTimeout(()=>{        //timer so we have time to see second card
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
    }, 1500);
}

cards.forEach(card => card.addEventListener('click', flipCard)); 
//loop through cards list and add event listener to each card, activates the flipCard  function