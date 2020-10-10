const player = "O";
const computer = "X";

let boardFull = false;
let playBoard = ["", "", "", "", "", "", "", "", ""];

const boardContainer = document.querySelector(".play-area");

const winner = document.getElementById("winner");

checkBoardComplete = () => {
  let flag = true;
  playBoard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  boardFull = flag;
};

const checkPlay = (a, b, c) => {
  return (
    playBoard[a] == playBoard[b] &&
    playBoard[b] == playBoard[c] &&
    (playBoard[a] == player || playBoard[a] == computer)
  );
};

const match = () => {
  for (i = 0; i < 9; i += 3) {
    if (checkPlay(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return playBoard[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (checkPlay(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return playBoard[i];
    }
  }
  if (checkPlay(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return playBoard[0];
  }
  if (checkPlay(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return playBoard[2];
  }
  return "";
};

const checkWinner = () => {
  let res = match()
  if (res == player) {
    winner.innerText = "Winner is player!!";
    winner.classList.add("playerWin");
    boardFull = true
  } else if (res == computer) {
    winner.innerText = "Winner is computer";
    winner.classList.add("computerWin");
    boardFull = true
  } else if (boardFull) {
    winner.innerText = "Draw!";
    winner.classList.add("draw");
  }
};

const renderBoard = () => {
  boardContainer.innerHTML = ""
  playBoard.forEach((e, i) => {
    boardContainer.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${playBoard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game = () => {
  renderBoard();
  checkBoardComplete();
  checkWinner();
}

const addPlayerMove = e => {
  if (!boardFull && playBoard[e] == "") {
    playBoard[e] = player;
    game();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!boardFull) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (playBoard[selected] != "");
    playBoard[selected] = computer;
    game();
  }
};

window.onload = () => {

    const refresh = document.getElementById('refresh');
    refresh.addEventListener('click', () => {
        window.location.reload()
    })

} 

renderBoard();
