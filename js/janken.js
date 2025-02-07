// 손 선언, 주먹은 0, 가위는 1, 보자기는 2
const hand = ["✊️", "✌️", "🖐️"];
// 손 버튼 영역 jankenfield 선언
const jField = document.querySelector(".jankenField");
// 결과 영역 results 선언
const results = document.querySelector(".results");
// 카운터 정보 표시하는 p 영역 선언
const counterInfo = document.createElement("p");
// 유저의 손 정보를 표시하는 p 요소 생성
const userHandLabel = document.createElement("p");
// 승패 정보를 표시하는 p 요소 생성
const resultLabel = document.createElement("p");

// 카운터 오브젝트로 일괄 선언; 게임 횟수, 승리 횟수, 패배 횟수, 무승부 횟수 선언
let counter = {
  rounds: 10, // 총 게임 횟수
  win: 0,     // 승리 횟수
  lose: 0,    // 패배 횟수
  drew: 0     // 무승부 횟수
};

// 손의 수 만큼의, 각 손이 들어가는 버튼 생성
hand.forEach((value, index) => {
  // button 요소 생성
  const createButton = document.createElement("button");
  // 생성한 버튼의 name attribute를 janken으로 설정
  createButton.name = "janken";
  // value를 button에 넣을 텍스트로 설정
  createButton.textContent = value;
  // 각 손에 해당하는 버튼의 id attribute를 hand0, hand1...의 형태로 설정
  createButton.id = `hand${index}`;
  // 새로 커스텀 attribute인 dataset-selected에 false를 설정(string)
  createButton.dataset.selected = "false";

  // 버튼 클릭 이벤트 리스너 추가
  createButton.addEventListener("click", () => {
    // 모든 버튼의 dataset-selected 속성을 false로 설정
    jField.childNodes.forEach((button) => (button.dataset.selected = "false"));
    // 클릭된 버튼의 dataset-selected 속성을 true로 설정
    createButton.dataset.selected = "true";
  });
  // 생성한 버튼을 jField에 추가
  jField.appendChild(createButton);
});

// jankenSubmit 영역을 선택
const jSubmit = document.querySelector(".jankenSubmit");
// 제출 버튼 생성
const submitInput = document.createElement("input");
// 제출 버튼의 타입을 submit으로 설정
submitInput.type = "submit";
// 제출 버튼의 텍스트를 설정
submitInput.value = "じゃんけんぽん！";
// 제출 버튼을 jSubmit 영역에 추가
jSubmit.appendChild(submitInput);

// 게임 결과를 체크하는 함수
function checking() {
  // 시스템의 손을 무작위로 선택 (0: 주먹, 1: 가위, 2: 보)
  const systemHand = Math.floor(Math.random() * 3);
  // 선택된 버튼을 찾음
  const selectedButton = document.querySelector(
    "button[name='janken'][data-selected='true']"
  );

  // 게임 라운드가 남아있는지 확인
  if (counter.rounds > 1) {
    // 유저가 손을 선택했는지 확인
    if (selectedButton) {
      // 유저의 손을 인덱스로 변환
      const userHand = hand.indexOf(selectedButton.textContent);
      // 유저의 손 정보를 표시
      userHandLabel.textContent = `あなたは、${selectedButton.textContent}を出しました`;
      // 결과 영역에 유저의 손 정보를 추가
      results.appendChild(userHandLabel);

      // 시스템의 손과 유저의 손을 비교하여 결과를 결정
      if (systemHand !== userHand) {
        // 유저가 이겼을 때의 조건을 boolean형인 isUserWin으로 설정
        const isUserWin = (systemHand - userHand === 1) || (systemHand - userHand === -2);
        if (isUserWin) {
          // 유저가 이긴 경우
          resultLabel.textContent = `勝ちました！コンピューターは${hand[systemHand]}を出しました。`;
          //승리 카운터에 1 추가
        counter.win++;
        } else {
          // 유저가 진 경우
          resultLabel.textContent = `負けました・・・コンピューターは${hand[systemHand]}を出しました。`;
          //패배 카운터에 1 추가
        counter.lose++;
        }
      } else {
        // 무승부인 경우
        resultLabel.textContent = `引き分けです。コンピューターは${hand[systemHand]}を出しました。`;
        //무승부 카운터에 1 추가
        counter.drew++;
      }

      // 결과 영역에 승패 정보를 추가
      results.appendChild(resultLabel);
      // 남은 게임 횟수를 업데이트
      counterInfo.textContent = `あと${counter.rounds - 1}回`;
      // 남은 게임 횟수를 표시하는 p 요소를 생성
      results.appendChild(counterInfo);
      // 게임 라운드를 감소
      counter.rounds--;
    } else {
      // 유저가 손을 선택하지 않은 경우 경고 메시지 표시
      alert("手を選んでください");
    }
  } else {
    // 모든 라운드가 끝난 경우 승률을 계산
    const winningRate = counter.win / 10;
    // counterInfo 영역 내부의 p 요소의 내용을 저장
    counterInfo.textContent = `勝ち：${counter.win}回\n
      引き分け：${counter.drew}回\n
      負け：${counter.lose}回\n
      勝率：${winningRate * 100}%`;
    //게임 종료를 설정하는 함수 호출
    setGameOver();
  }
}

// 제출 버튼 클릭 이벤트 리스너 추가
submitInput.addEventListener("click", checking);

// 게임 종료를 설정하는 함수
function setGameOver() {
  // 모든 janken 버튼을 비활성화
  document
    .querySelectorAll("button[name='janken']")
    .forEach((button) => (button.disabled = true));
  // 제출 버튼을 비활성화
  submitInput.disabled = true;
  // 리셋 버튼 생성
  const resetButton = document.createElement("button");
  // 리셋 버튼을 results영역 내부에 추가
  results.appendChild(resetButton);
  // 리셋 버튼의 내용을 저장
  resetButton.textContent = "Start new game";
  
  resetButton.id = "reset";
  // 리셋 버튼 클릭 이벤트 리스너 추가
  resetButton.addEventListener("click", resetGame);
}

// 게임을 리셋하는 함수
function resetGame() {
  // 카운터 초기화
  counter = {
    rounds: 10, // 총 게임 횟수
    win: 0,     // 승리 횟수
    lose: 0,    // 패배 횟수
    drew: 0     // 무승부 횟수
  };
  // 결과 영역 초기화
  results.innerHTML = "";
  // 모든 janken 버튼을 활성화
  document
    .querySelectorAll("button[name='janken']")
    .forEach((button) => (button.disabled = false));
  // 제출 버튼을 활성화
  submitInput.disabled = false;
}