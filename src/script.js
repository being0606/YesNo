let score = 0;
let resetClicked = false;

document.getElementById("startButton").addEventListener("click", function () {
  this.style.display = "none";
  const catImage = document.getElementById("catImage");
  const resetButton = document.getElementById("resetButton");
  catImage.style.display = "block";
  resetButton.style.display = "block";
  moveElementToRandomPosition(catImage, true);
  moveElementToRandomPosition(resetButton, false);
});

document.getElementById("catImage").addEventListener("click", function () {
  score++;
  document.getElementById("scoreBoard").innerText = `점수: ${score}`;
  playMeowSound();
  updateCatAppearance(score);
  moveElementToRandomPosition(this, true);
});

document.getElementById("resetButton").addEventListener("click", function () {
  if (!resetClicked) {
    resetClicked = true;
    this.innerText = "응 아니야";
    this.disabled = true;
  } else {
    score++;
    document.getElementById("scoreBoard").innerText = `점수: ${score}`;
    playMeowSound();
    moveElementToRandomPosition(this, false);
    moveElementToRandomPosition(document.getElementById("catImage"), true);
    updateButtonAppearance(score);
  }
});

function moveElementToRandomPosition(element, isCat) {
  const container = document.querySelector(".container");
  const maxX = container.clientWidth - element.clientWidth;
  const maxY = container.clientHeight - element.clientHeight;
  let randomX = Math.random() * maxX;
  let randomY = Math.random() * maxY;

  // Ensure a minimum movement of 200px
  const currentX = parseFloat(element.style.left || 0);
  const currentY = parseFloat(element.style.top || 0);
  const deltaX = randomX - currentX;
  const deltaY = randomY - currentY;

  if (Math.abs(deltaX) < 200) {
    randomX = currentX + (deltaX > 0 ? 200 : -200);
  }
  if (Math.abs(deltaY) < 200) {
    randomY = currentY + (deltaY > 0 ? 200 : -200);
  }

  element.style.left = `${Math.min(maxX, Math.max(0, randomX))}px`;
  element.style.top = `${Math.min(maxY, Math.max(0, randomY))}px`;

  // Adjust speed non-linearly: fast initially, slower as score increases
  const speedFactor = isCat
    ? Math.max(0.1, 1 - score * 0.03)
    : Math.max(0.1, 0.5 - score * 0.01);
  element.style.transitionDuration = `${speedFactor}s`;
}

function updateCatAppearance(score) {
  const catImage = document.getElementById("catImage");
  const maxBrightness = 3; // 최대 밝기 배율
  const brightness = 1 + (score / 30) * (maxBrightness - 1); // 1 ~ maxBrightness 사이로 설정
  const newSize = 100 + score * 5; // 고양이 크기 증가
  catImage.style.filter = `brightness(${brightness})`;
  catImage.style.width = `${newSize}px`;
  catImage.style.height = `${newSize}px`;
}

function updateButtonAppearance(score) {
  const button = document.getElementById("resetButton");
  const newSize = 100 - score * 2; // 버튼 크기 감소
  button.style.width = `${newSize}px`;
  button.style.height = `${newSize}px`;
  button.style.padding = "15px 30px"; // 패딩 고정
}

function playMeowSound() {
  const meowSound = document.getElementById("meowSound");
  const playbackRate = 1 + score / 30; // 점수가 올라갈수록 사운드 속도 증가
  meowSound.playbackRate = playbackRate;
  meowSound.play();
}
