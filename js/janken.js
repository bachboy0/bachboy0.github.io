const hand = ["グー", "チョキ", "パー"];
const jField = document.querySelector(".jankenField");
const results = document.querySelector(".results");
let counter = {
  rounds: 10,
  win: 0,
  lose: 0,
  drew: 0,
};

hand.forEach((value, index) => {
  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "janken";
  radio.value = value;
  radio.id = `hand${index}`;

  const label = document.createElement("label");
  label.htmlFor = `hand${index}`;
  label.textContent = value;

  jField.appendChild(radio);
  jField.appendChild(label);
  jField.appendChild(document.createElement("br"));
});

const jSubmit = document.querySelector(".jankenSubmit");
const jankenButton = document.createElement("input");
jankenButton.type = "submit";
jankenButton.value = "じゃんけんぽん！";
jSubmit.appendChild(jankenButton);

function checking() {
  const systemHand = Math.floor(Math.random() * 3);
  const selectedRadio = document.querySelector("input[name='janken']:checked");
  const counterInfo = document.createElement("p");

  if (counter.rounds > 0) {
    if (selectedRadio) {
      const userHand = hand.indexOf(selectedRadio.value);
      const resultLabel = document.createElement("p");
      resultLabel.textContent = `あなたは、${selectedRadio.value}を出しました`;
      results.appendChild(resultLabel);
      if (systemHand === userHand) {
        const drew = document.createElement("p");
        drew.textContent = `引き分けです。コンピューターは${hand[systemHand]}を出しました。`;
        results.appendChild(drew);
        counter.drew++;
      } else if (systemHand - userHand === 1 || systemHand - userHand === -2) {
        const win = document.createElement("p");
        win.textContent = `勝ちました！コンピューターは${hand[systemHand]}を出しました。`;
        results.appendChild(win);
        counter.win++;
      } else {
        const lose = document.createElement("p");
        lose.textContent = `負けました・・・コンピューターは${hand[systemHand]}を出しました。`;
        results.appendChild(lose);
        counter.lose++;
      }
    } else {
      console.log("No hand selected");
    }
    counterInfo.textContent = `あと${counter.rounds - 1}回`;
    results.appendChild(counterInfo);
  } else {
    const shouritsu = counter.win/10;
    counterInfo.textContent = `勝ち：${counter.win}回\n引き分け：${counter.drew}回\n負け：${counter.lose}回\n勝率：${shouritsu*100}%`
    results.appendChild(counterInfo);
    setGameOver();
  }
  counter.rounds--;


}

jankenButton.addEventListener("click", checking);

function setGameOver() {
  document
    .querySelectorAll("input[name='janken']")
    .forEach((radio) => (radio.disabled = true));
  jankenButton.disabled = true;
  const resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.append(resetButton);
  resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    counter.rounds = 10;
    results.innerHTML = "";
    document.querySelector("button").remove();
    jankenButton.disabled = false;
  document
    .querySelectorAll("input[name='janken']")
    .forEach((radio) => (radio.disabled = false));
}
