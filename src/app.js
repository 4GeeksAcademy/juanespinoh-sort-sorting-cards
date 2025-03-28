import "bootstrap";
import "./style.css";

const cardInputDOM = document.querySelector("#cardInput");
const drawButtonDOM = document.querySelector("#drawButton");
const sortButtonDOM = document.querySelector("#sortButton");
const originalCardsContainerDOM = document.querySelector(
  "#originalCardsContainer"
);
const sortCardsContainerDOM = document.querySelector(
  "#sortCardsContainer"
);
const errorBox=document.querySelector("#errorBox")

const numbersArray = [
  { value: 2, renderIcon: "2" },
  { value: 3, renderIcon: "3" },
  { value: 4, renderIcon: "4" },
  { value: 5, renderIcon: "5" },
  { value: 6, renderIcon: "6" },
  { value: 7, renderIcon: "7" },
  { value: 8, renderIcon: "8" },
  { value: 9, renderIcon: "9" },
  { value: 10, renderIcon: "10" },
  { value: 11, renderIcon: "J" },
  { value: 12, renderIcon: "Q" },
  { value: 13, renderIcon: "K" },
  { value: 14, renderIcon: "A" },
];
const suitsArray = [
  { suitIcon: "♠", color: "black", class: "spade" },
  { suitIcon: "♦", color: "red", class: "diamond" },
  { suitIcon: "♥", color: "red", class: "heart" },
  { suitIcon: "♣", color: "black", class: "club" },
];

function randomArrayItem(arr) {
  let result = arr[Math.floor(Math.random() * arr.length)];
  return result;
}

function randomCard(numbersArray, suits) {
  let randomNumberItem = randomArrayItem(numbersArray);
  let randomSuitsItem = randomArrayItem(suits);

  return { ...randomNumberItem, ...randomSuitsItem };
}

function randomCardArrayCreator(value) {
  let resultArray = [];
  for (let i = 0; i < value; i++) {
    let card = randomCard(numbersArray, suitsArray);

    resultArray.push(card);
  }

  return resultArray;
}

function cardContainerGnerator(arr) {
  let cardContainerDOM = document.createElement("div");
  cardContainerDOM.classList.add("cardsContainer");

  let arrayOfCards = [];

  for (let cardValues of arr) {
    let cardBody = document.createElement("div");
    let upper = document.createElement("div");
    let center = document.createElement("div");
    let down = document.createElement("div");

    upper.innerHTML = cardValues.suitIcon;
    upper.classList.add("upper");
    upper.style.color = cardValues.color;

    down.innerHTML = cardValues.suitIcon;
    down.style.color = cardValues.color;
    down.classList.add("down");

    center.innerHTML = cardValues.renderIcon;

    cardBody.classList.add("cardBody");
    cardBody.append(upper, center, down);

    arrayOfCards.push(cardBody);
  }

  cardContainerDOM.append(...arrayOfCards);

  return cardContainerDOM;
}

function bubbleSort(arr) {
  let logArray=[]
 
  let wall = arr.length - 1;

  for (let i = 0; i < wall; wall--) {

    for (let x = 0; x < wall; x++) {
    

      if (arr[x].value > arr[x + 1].value) {
        let aux = arr[x]
        arr[x] = arr[x + 1]
        arr[x + 1] = aux;
        logArray=[...logArray,[...arr]]
      }
    }

   
  }
  return logArray
}

let cardsArray=[]
const limitDraw=10

drawButtonDOM.addEventListener("click", () => {
  let value=cardInputDOM.value
  if(value > limitDraw){
    errorBox.innerHTML=""
    errorBox.style.display="block"
    errorBox.innerHTML="maximo 10 carta"
    return
  }
  errorBox.style.display="none"

  cardsArray=randomCardArrayCreator(value)

  let cardConatiner= cardContainerGnerator(cardsArray)
  originalCardsContainerDOM.innerHTML=""
  originalCardsContainerDOM.appendChild(cardConatiner)

  sortCardsContainerDOM.innerHTML=""
});

sortButtonDOM.addEventListener("click",()=>{
  let sortedArrayLog=bubbleSort(cardsArray)
  if(sortedArrayLog.length===0){
    errorBox.innerHTML=""
    errorBox.style.display="block"
    errorBox.innerHTML="ya estan acomodados"
    return
  }
   errorBox.style.display="none"

  let arrays=[] 
  for(let row of sortedArrayLog){
    arrays.push(cardContainerGnerator(row))
  }
  sortCardsContainerDOM.append(...arrays)

})


