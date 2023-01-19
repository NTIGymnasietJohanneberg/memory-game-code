//1: Flip card

const cards = document.querySelectorAll('.memory-card');

//2: Variabler för matchade kort
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;


function flipCard() {
    // Returnerar true/false
    if (lockBoard) return;
    //Hindrar att vi clickar samma kort
    if (this === firstCard) return;

    //this.classList.toggle('flip');
    //2: Vi ändrar toggle till add
    this.classList.add('flip');
    //2: Nu kan vi hålla reda på om vi har vänt kort
   if (!hasFlippedCard) {
        hasFlippedCard = true;
       firstCard = this;
       return;
   }
    secondCard = this;
    
    //Nu behövs inte denna variabel här heller
    //hasFlippedCard = false;
     //3: Vi kallar funktionen här
    checkForMatch();
    increment();
}

//3: Vi checkar om korten matchar här
function checkForMatch() {
 /*    if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //Om dom matchar så anropar vi en funktion som "fryser" korten   
         disableCards();
         return;
       }
    //Annars så flipas korten tillbaka
    unflipCards(); */
    
    //3.2 Ett elegantare sätt att skriva denna kod är med en 
    // Ternary-operator. Då ser samma kod ovan ut som såhär.
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
     isMatch ? disableCards() : unflipCards();

}


//4: För att inte kunna flipa korten(när de matchar) tar vi bort 
// eventlistenerna med denna funktion 
  
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}
     
//5: Om inte korten matchar så vänder dom tillbaka automatiskt
// för nya försök
function unflipCards() {
    //6: Stänger bordet
    lockBoard = true;
       setTimeout(() => {
         firstCard.classList.remove('flip');
           secondCard.classList.remove('flip');
           //ResetBoard ersätter denna variabel
           //lockBoard = false;
           resetBoard();
       }, 800);
}
     
/**
 *7: Vi måste återställa våra variabler efter varje runda.
 * Det gör vi med hjälp av denna funktion. 
 * es6 destructing assigement operater används här
 * Den kallar vi på i disableCards() och i unFlipCards()
 */
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}
  
//Våran kortblandarefunktion 
//För att den ska köras med en gång, så gör vi den till en
//immediatly invoked function https://developer.mozilla.org/en-US/docs/Glossary/IIFE


//Denna måste anropas med shuffle();
/* function shuffle() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
} */
  //Denna anropar sig själv. 
(function shuffle() {
       cards.forEach(card => {
         let ramdomPos = Math.floor(Math.random() * 12);
         card.style.order = ramdomPos;
       });
     })();
    
     /**
 * Håller reda på antaler knapptryckningar
 */
let count = 1;
function increment() {
    document.querySelector("#counter").innerHTML =
    "Du har vänt kort <br />" + count + " gånger";
    count ++;
}//End increment();


cards.forEach(card => card.addEventListener('click', flipCard));
/*1.2:  I vår css .memory-game lägger vi till perspective: 1000px;
*   Detta för att få lite 3D-känsla
*   För att behålla detta i child .memory-card så lägger vi till följande
*   transform-style: preserve-3d; och transition: transform .5s;
*   Fast nu ser vi samma kort (fast spegelvänt) så vi måste lägga till följande
*   i klasserna .front-face,.back-face med detta backface-visibility: hidden;
*   För att se våra kort så måste vi lägga till följande regel
*   .front-face {transform: rotateY(180deg);}
*/

/*2: Nästa steg är att matcha korten. Se ovan märkt 2
*
*  2.2 När vi vill lägga till mer info till ett html-element så kan vi 
*   använda oss av data-attribut. Syntax är data-* där * kan vara vilket
*   ord som helst. I vårt fall kallar vi det data-framework.
*   Där vi har kort lägger vi in respektive:
*   data-framework="react"
*   data-framework="angular"
*   data-framework="ember"
*   data-framework="vue"
*   data-framework="backbone"
*   data-framework="aurelia"
*/
/**6: Nu vill vi se till att vi inte kan vända innan matchning har gjorts
 * Vi lägger till en variabel som är let lockBoard = false;
 * När spelaren har vänt andra kortet så sätts denna till true tills validering
 * av match har gjorts. Sedan sätts den åter tyill false.
 * 
 */

/**
 * För att blanda (shuffle) våra kor så kan vi använda oss av flex-items
 * property som heter order (är defult 0). Vi har 12 kort i spelet så vi 
 * kan iterera igenom dom och sätta en slumpmässig order-nummer på dom.
 * Vips, nu har vi blandat om korten efter varje omgång.
 */