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
};

window.onload = () => {
  generateInput();
};
