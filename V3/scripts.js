const cards = document.querySelectorAll('.memory-card');
//cards is a list of all elements called memory-card

function flipCard(){
    console.log("card pressed ", this);
    this.classList.toggle('flip'); // adds or removes name flip to class
}

cards.forEach(card => card.addEventListener('click', flipCard)); 
//loop through cards list and add event listener to each card, activates the flipCard  function