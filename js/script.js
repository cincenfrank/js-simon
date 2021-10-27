let numbersList = [];

function onDomLoaded() {
  numbersList = generateNumbersList();
  alert(
    `Simon says what he says and today Simon says:    

${numbersList.toString()}

When you are ready, click OK. I will wait 30 seconds and ask you to repeat the all the numbers said by Simon.`
  );
  setTimeout(() => {
    let userSaid = prompt(
      "Insert the numbers previously said by Simon. You can separate different numbers with commas. We will consider only the first 5 numbers"
    );
    if (userSaid) {
      let userSaidArray = userSaid
        .split(",", 5)
        .reduce((accumulator, currentValue) => {
          const intValue = parseInt(currentValue);
          if (!accumulator.includes(intValue)) {
            accumulator.push(intValue);
          }
          return accumulator;
        }, []);
      let correctArray = checkScore(userSaidArray, numbersList);
      let message = `You scored ${correctArray.length}/${numbersList.length}`;
      if (correctArray.length > 0) {
        message = `${message}
You remembered the following numbers:
${correctArray.toString()}`;
      }
      alert(message);
    }
    // .map((element) => parseInt(element));
  }, 30000);
  console.log("Timer Started");
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
