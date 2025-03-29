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

function cardContainerGnerator(arr, needsIndex,index) {
  let arrayOfCards = [];
  let cardContainerDOM = document.createElement("div");
  cardContainerDOM.classList.add("cardsContainer");
  if(needsIndex){
    let indexDiv=document.createElement("div")
    let indexDivPara=document.createElement("p")
    indexDivPara.innerHTML=index

    indexDiv.appendChild(indexDivPara)
    indexDiv.classList.add("indexBody")
 
  
   
    arrayOfCards.push(indexDiv)
  }
 
  

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

function selectSort(arr) {
  let logArray=[]

  for (let i = 0; i < arr.length - 1; i++) { 
    let minIndex = i;                        
                
    for (let j = i + 1; j < arr.length; j++) {
   
      if ( arr[minIndex].value > arr[j].value ) {
        minIndex = j;                      
      }
    }
        i !== 2
    if (i !== minIndex) {
      let temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
      logArray=[...logArray,[...arr]]
      // [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
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
  let sortedArrayLog=selectSort(cardsArray,false)
  if(sortedArrayLog.length===0){
    errorBox.innerHTML=""
    errorBox.style.display="block"
    errorBox.innerHTML="ya estan acomodados"
    return
  }
   errorBox.style.display="none"

   console.log(sortedArrayLog)
   console.log(cardsArray)


  let arrays=[] 
  for(let i=0;i<sortedArrayLog.length ;i++){
    arrays.push(cardContainerGnerator(sortedArrayLog[i],true,i))

  }
  // for(let row of sortedArrayLog){
  // }
  sortCardsContainerDOM.append(...arrays)

})


