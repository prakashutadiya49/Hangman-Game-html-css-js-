const btncon = document.querySelector(".btn-con");
const hintg = document.querySelector(".hint span");
const left_box_img = document.querySelector(".left-box img");
const letter_con = document.querySelector(".letter-con");
const incorrect_guess = document.querySelector(".incorrect-guess span");
const contant = document.querySelector(".contant");
const game_modal = document.querySelector(".game-modal");
const contantimg = document.querySelector(".contant img");
const contanth2 = document.querySelector(".contant h2");
const contantp = document.querySelector(".contant p");
const reset = document.getElementById("btn");

let currentword;
let wrongchoose;
let maxwrongchoose = 6;
let countletter;

const resetf = () => {
  wrongchoose = 0;
  countletter = [];
  left_box_img.src = `hangman-game-images/hangman-${wrongchoose}.svg`;
  incorrect_guess.innerText = `${wrongchoose}/${maxwrongchoose}`;
  letter_con.innerHTML = currentword
    .split("")
    .map(() => `<li class="letter"></li>`)
    .join("");
  game_modal.classList.remove("show");
};

const getRandomWord = () => {
  const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];

  currentword = word;
  console.log(word);
  hintg.innerText = hint;
  resetf();

  const checkletter = (button, clickedletter) => {
    if (currentword.includes(clickedletter)) {
      console.log(clickedletter, "it is exist in word");
      [...currentword].forEach((letter, index) => {
        if (letter === clickedletter) {
          countletter.push(letter);
          letter_con.querySelectorAll(".letter")[index].innerText = letter;
          letter_con.querySelectorAll(".letter")[index].classList.add("show2");
        }
      });
    } else {
      console.log(clickedletter, "is not exist in word");
      wrongchoose++;
      left_box_img.src = `hangman-game-images/hangman-${wrongchoose}.svg`;
    }

    incorrect_guess.innerText = `${wrongchoose}/${maxwrongchoose}`;
    if (wrongchoose === maxwrongchoose) return gameover(false);
    if (countletter.length == currentword.length) return gameover(true);
  };

  const gameover = (isvictory) => {
    setTimeout(() => {
      const modal = `${isvictory ? "The word is" : "The correct word was"}`;
      contantimg.src = `hangman-game-images/${
        isvictory ? "victory" : "lost"
      }.gif`;
      contanth2.innerText = `${isvictory ? "You win!" : "Game over!"}`;
      contantp.innerHTML = `${modal}: ${currentword}`;
      game_modal.classList.add("show");
    }, 300);
  };

  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    btncon.appendChild(button);
    button.addEventListener("click", (e) => {
      checkletter(e.target, String.fromCharCode(i));
    });
  }

  reset.addEventListener("click", () => {
    resetf();
  });
};

getRandomWord();
