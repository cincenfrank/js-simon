let numbersList = [];
let firstRow;
/**
 * @type {HTMLElement}
 */
let secondRow;
let thirdRow;
let firstTitle;
let duration;
let timeoutId;
function onDomLoaded() {
  const newGameBtn = document.getElementById("new-game");

  newGameBtn.addEventListener("click", () => {
    generateSimonNumbersHTML();
    generateReadyButton();
  });

  //   setTimeout(() => {
  //     let userSaid = prompt(
  //       "Insert the numbers previously said by Simon. You can separate different numbers with commas. We will consider only the first 5 numbers"
  //     );
  //     if (userSaid) {
  //       let userSaidArray = userSaid
  //         .split(",", 5)
  //         .reduce((accumulator, currentValue) => {
  //           const intValue = parseInt(currentValue);
  //           if (!accumulator.includes(intValue)) {
  //             accumulator.push(intValue);
  //           }
  //           return accumulator;
  //         }, []);
  //       let correctArray = checkScore(userSaidArray, numbersList);
  //       let message = `You scored ${correctArray.length}/${numbersList.length}`;
  //       if (correctArray.length > 0) {
  //         message = `${message}
  // You remembered the following numbers:
  // ${correctArray.toString()}`;
  //       }
  //       alert(message);
  //     }
  //     // .map((element) => parseInt(element));
  //   }, 30000);
  // console.log("Timer Started");
}

/**
 *
 * @param {[number]} numbersList
 * @param {HTMLElement} htmlElement
 */
function generateSimonNumbersHTML() {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
  numbersList = generateNumbersList();
  firstRow = document.getElementById("first-row");
  secondRow = document.getElementById("second-row");
  thirdRow = document.getElementById("third-row");
  secondRow.innerHTML = "";
  thirdRow.innerHTML = "";
  firstTitle = document.getElementById("first-title");

  let htmlText = "";
  for (let i = 0; i < numbersList.length; i++) {
    const number = numbersList[i];
    htmlText += `<div class="col">
                    <div class="card p-5 align-items-center fs-2 shadow">
                        ${number}
                    </div>
                </div>`;
  }
  firstRow.innerHTML = htmlText;
  firstTitle.innerHTML = "Simon said:";
}

function generateReadyButton() {
  const col = document.createElement("div");
  col.classList.add("col", "text-center");
  const btn = document.createElement("div");
  btn.innerText = "I'm Ready!";
  btn.classList.add("btn", "btn-info");
  btn.addEventListener("click", startCountdown);
  col.appendChild(btn);
  thirdRow.innerHTML = "";
  thirdRow.appendChild(col);
}

function startCountdown() {
  console.log("start countdown");
  thirdRow.innerHTML = "";
  let htmlText = "";
  for (let i = 0; i < numbersList.length; i++) {
    const number = numbersList[i];
    htmlText += `<div class="col">
                    <div class="card p-5 align-items-center fs-2 shadow">
                        ???
                    </div>
                </div>`;
  }
  firstRow.innerHTML = htmlText;
  firstTitle.innerHTML = "What did Simon say??";

  const col = document.createElement("div");
  col.classList.add("col", "text-center");
  const count = document.createElement("div");
  count.innerText = "30";
  count.classList.add("fs-1");
  count.addEventListener("click", startCountdown);
  col.appendChild(count);
  secondRow.appendChild(col);
  duration = 30;
  setTimeout(() => {
    timeoutFunc(count);
  }, 1000);
}

function showUserInput() {
  let htmlText = "";
  for (let i = 0; i < numbersList.length; i++) {
    htmlText += `<div class="col">
    <div class="card p-5 align-items-center fs-2 shadow">
        <input type="number" class=" w-100 text-center">
    </div>
</div>`;
  }
  secondRow.innerHTML = htmlText;
  const col = document.createElement("div");
  col.classList.add("col", "text-center");
  const btn = document.createElement("div");
  btn.innerText = "confirm numbers";
  btn.classList.add("btn", "btn-info");
  btn.addEventListener("click", onInputConfirmed);
  col.appendChild(btn);
  thirdRow.innerHTML = "";
  thirdRow.appendChild(col);
}

function onInputConfirmed(params) {
  console.log("input confirmed");
  // generateSimonNumbersHTML(numbersList);
  thirdRow.innerHTML = "";
  let inputsList = document.querySelectorAll("input");
  let userNumbers = [];
  for (let i = 0; i < inputsList.length; i++) {
    const elementValue = parseInt(inputsList.item(i).value);

    if (!userNumbers.includes(elementValue)) {
      userNumbers.push(elementValue);
    }
  }
  let scoreResult = checkScore(userNumbers, numbersList);
  let message = `You scored ${scoreResult.length}/${numbersList.length}`;
  if (scoreResult.length > 0) {
    message = `${message}
  You remembered the following numbers:
  ${scoreResult.toString()}`;
  }
  // secondRow.innerHTML = "";
  thirdRow.innerHTML = `<h2 class="text-center">${message}</h2>`;
}

function timeoutFunc(count) {
  duration--;
  count.textContent = duration.toString();
  if (duration <= 0) {
    console.log("timer end");
    showUserInput();
  } else {
    setTimeout(() => {
      timeoutFunc(count);
    }, 1000);
  }
}

/**
 * Check input arrays values and returns an array only composed by matching values
 * @param {[number]} userSaidArray
 * @param {[number]} numbersArray
 * @returns {[number]}
 */
function checkScore(userSaidArray, numbersArray) {
  // let correctNumbersArray = [];
  // for (let i = 0; i < userSaidArray.length; i++) {
  //   const element = userSaidArray[i];
  //   if (numbersArray.includes(element)) {
  //     correctNumbersArray.push(element);
  //   }
  // }
  let correctNumbersArray = numbersArray.reduce((accumulator, value) => {
    if (userSaidArray.includes(value)) {
      accumulator.push(value);
    }
    return accumulator;
  }, []);
  return correctNumbersArray;
}

/**
 * Generates an array of random integer
 * @param {number} arraySize length of the array to be returned
 * @param {number} min minimum value (inclusive)
 * @param {number} max maximum value (exclusive)
 * @returns {[number]}
 */
function generateNumbersList(arraySize = 5, min = 0, max = 1000) {
  const newList = [];
  while (newList.length < arraySize) {
    const randomNumber = getRandomInt(min, max);
    if (!newList.includes(randomNumber)) {
      newList.push(randomNumber);
    }
  }
  return newList;
}

/**
 * Generates a random integer between given numbers.
 * @param {number} min minimum value (inclusive)
 * @param {number} max maximum value (exclusive)
 * @returns {number}
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
window.addEventListener("load", onDomLoaded);
