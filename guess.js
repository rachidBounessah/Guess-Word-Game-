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

window.onload = () => {
  generateInput();
};
