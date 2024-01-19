//Setting Game Name

let gameName = "Guess The Word";
document.title = gameName;
document.querySelector("h1").innerHTML = gameName;
document.querySelector(
  "footer"
).innerHTML = `${gameName} Game Created By Zero Web Shcool`;

//Setting Game Options
let numbersOfTries = 6;
let numbersOfLetters = 6;
let currentTry = 1;

//Mange Words
let wordToGuess = "";
const words = [
  "Create",
  "Update",
  "Delete",
  "Master",
  "Branch",
  "Mainly",
  "Elzero",
  "School",
];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let messageArea = document.querySelector(".message");
const generateInput = () => {
  const inputContainer = document.querySelector(".inputs");
  //create main tryDiv
  for (let i = 1; i <= numbersOfTries; i++) {
    const tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span> `;

    if (i !== 1) tryDiv.classList.add("disabled-inputs");
    //create input
    for (j = 1; j <= numbersOfLetters; j++) {
      const input = document.createElement("input");
      input.type = "text";
      //   input.classList.add(`${j}`);
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputContainer.appendChild(tryDiv);
  }

  //Focus On First  Inputs In First Try Element
  inputContainer.children[0].children[1].focus();

  //Disable All Inputs Except First One
  const inputsInDisbaledDiv = document.querySelectorAll(
    ".disabled-inputs input"
  );
  inputsInDisbaledDiv.forEach((input) => (input.disabled = true));

  //add Event Listener To Input
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input, index) => {
    //Convert Input To UpperCase

    input.addEventListener("input", function () {
      this.value = this.value.toUpperCase();
      //console.log(index);
      const nextInput = inputs[index + 1];
      if (nextInput) nextInput.focus();
    });

    input.addEventListener("keydown", function (event) {
      console.log(event);
      const currentIndex = Array.from(inputs).indexOf(event.target); // or this

      //   console.log(currentIndex);

      if (event.key === "ArrowRight") {
        const nextInput = currentIndex + 1;
        if (nextInput < inputs.length) inputs[nextInput].focus();
      }

      if (event.key === "ArrowLeft") {
        const prevInput = currentIndex - 1;
        if (prevInput >= 0) inputs[prevInput].focus();
      }
    });
  });
};

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handleGuesses);
console.log(wordToGuess);

function handleGuesses() {
  let successGeuss = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    const inputField = document.querySelector(
      `#guess-${currentTry}-letter-${i}`
    );
    const letter = inputField.value.toLowerCase();
    const actualLetter = wordToGuess[i - 1];

    //Game Logic
    if (actualLetter === letter) {
      //Letter Is Correct And In Place
      inputField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      //Letter Is Correct And Not In Place
      inputField.classList.add("not-in-place");
      successGeuss = false;
    } else {
      inputField.classList.add("no");
      successGeuss = false;
    }
  }

  //Check if user win or lose
  if (successGeuss) {
    messageArea.innerHTML = `You Win The World Is <span> ${wordToGuess}</span>`;
    //Add Disabled Class On All Try Div
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => {
      tryDiv.classList.add("disabled-inputs");
    });
    guessButton.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-inputs");
    const cuurentTryInputs = document.querySelectorAll(
      `.try-${currentTry} input`
    );
    cuurentTryInputs.forEach((input) => {
      input.disabled = true;
    });

    currentTry++;

    const nextTryInputs = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInputs.forEach((input) => {
      input.disabled = false;
    });

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-inputs");
      el.children[1].focus();
    } else {
      // Disable Guess Button
      guessButton.disabled = true;
      messageArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

window.onload = () => {
  generateInput();
};
