// 손 선언, 주먹은 0, 가위는 1, 보자기는 2
const hand = ["✊️", "✌️", "🖐️"];
// 손 버튼 영역 jankenfield 선언
const jField = document.querySelector(".jankenField");
// 결과 영역 results 선언
const results = document.querySelector(".results");
// 카운터 정보 표시하는 p 영역 선언
const counterInfo = document.createElement("p");
// 유저의 손 정보룰 표시하는 p 영역 선언
const userHandLabel = document.createElement("p");
// 승패 정보 표시하는 p 영역 선언
const resultLabel = document.createElement("p");

//카운터 오브젝트로 일괄 선언; 게임 횟수, 승리 횟수, 패배 횟수, 무승부 횟수 선언
let counter = {
  rounds: 10,
  win: 0,
  lose: 0,
  drew: 0,
};

//손의 수 만큼의, 각 손이 들어가는 버튼 생성
hand.forEach((value, index) => {
  const createButton = document.createElement("button");
  createButton.name = "janken";
  createButton.textContent = value;
  createButton.id = `hand${index}`;
  createButton.dataset.selected = "false"; // Use data-selected attribute

  createButton.addEventListener("click", () => {
    const handButtons = jField.childNodes;
    handButtons.forEach((button) => button.dataset.selected = "false");
    createButton.dataset.selected = "true";
  });
  jField.appendChild(createButton);
});

const jSubmit = document.querySelector(".jankenSubmit");
const jankenButton = document.createElement("input");
jankenButton.type = "submit";
jankenButton.value = "じゃんけんぽん！";
jSubmit.appendChild(jankenButton);

function checking() {
  const systemHand = Math.floor(Math.random() * 3);
  const selectedButton = document.querySelector(
    "button[name='janken'][data-selected='true']"
  );
  if (counter.rounds > 0) {
    if (selectedButton) {
      const userHand = hand.indexOf(selectedButton.textContent);
      userHandLabel.textContent = `あなたは、${selectedButton.textContent}を出しました`;
      results.appendChild(userHandLabel);
      if (systemHand === userHand) {
        resultLabel.textContent = `引き分けです。コンピューターは${hand[systemHand]}を出しました。`;
        counter.drew++;
        console.log("drew");
      } else if (systemHand - userHand === 1 || systemHand - userHand === -2) {
        resultLabel.textContent = `勝ちました！コンピューターは${hand[systemHand]}を出しました。`;
        counter.win++;
        console.log("win");
      } else {
        resultLabel.textContent = `負けました・・・コンピューターは${hand[systemHand]}を出しました。`;
        counter.lose++;
        console.log("lose");
      }
      results.appendChild(resultLabel);
      counterInfo.textContent = `あと${counter.rounds - 1}回`;
      results.appendChild(counterInfo);
      counter.rounds--;
    } else if (!selectedButton) {
      alert("手を選んでください");
    }
  } else {
    const shouritsu = counter.win / 10;
    counterInfo.textContent = `勝ち：${counter.win}回\n
      引き分け：${counter.drew}回\n
      負け：${counter.lose}回\n
      勝率：${shouritsu * 100}%`;
    setGameOver();
  }
}

jankenButton.addEventListener("click", checking);

function setGameOver() {
  document
    .querySelectorAll("button[name='janken']")
    .forEach((button) => (button.disabled = true));
  jankenButton.disabled = true;
  const resetButton = document.createElement("button");
  results.appendChild(resetButton);
  resetButton.textContent = "Start new game";
  resetButton.id = "reset";
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
  counter.rounds = 10;
  results.innerHTML = "";
  const resetButton = document.getElementById("reset");
  if (resetButton) {
    resetButton.remove();
  }
  jankenButton.disabled = false;
  document
    .querySelectorAll("button[name='janken']")
    .forEach((b) => (b.disabled = false));
}
