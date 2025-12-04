const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const containers = [
  document.querySelector(".question-container"),
  document.querySelector(".result-container"),
  document.querySelector(".result-container2"),
  document.querySelector(".result-container3")
];

let currentIndex = 0;
let escapeDistance = 100;
let maxClicks = 5;
let clickCount = 0;
let canRunAwayGlobal = true;

function showContainer(index) {
  containers.forEach((c, i) => {
    c.style.display = i === index ? "block" : "none";
  });
  setupCurrentContainer();
}

// เริ่มต้น
showContainer(currentIndex);

// นับคลิกเมาส์ซ้ายเพื่อหยุดหนี
document.addEventListener("mousedown", (e) => {
  if (e.button === 0) {
    clickCount++;
    if (clickCount >= maxClicks) canRunAwayGlobal = false;
  }
});

function setupCurrentContainer() {
  const container = containers[currentIndex];
  const yesBtn = container.querySelector(".js-yes-btn");
  const noBtn = container.querySelector(".js-no-btn");

  if (!yesBtn) return;

  // parent ต้อง relative
  container.style.position = "relative";
  yesBtn.style.position = "absolute";

  function moveButtonFast(btn) {
    const screenWidth = container.clientWidth;
    const screenHeight = container.clientHeight;
    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;
    const padding = 20;

    const newX = Math.random() * (screenWidth - btnWidth - padding * 2) + padding;
    const newY = Math.random() * (screenHeight - btnHeight - padding * 2) + padding;

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }

  function mouseMoveHandler(e) {
    if (!canRunAwayGlobal) return;
    const rect = yesBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = Math.abs(mouseX - (rect.left + rect.width / 2));
    const distY = Math.abs(mouseY - (rect.top + rect.height / 2));

    if (distX < escapeDistance && distY < escapeDistance) moveButtonFast(yesBtn);
  }

  container.addEventListener("mousemove", mouseMoveHandler);

  yesBtn.addEventListener("mousedown", () => { canRunAwayGlobal = false; });

  yesBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex < containers.length) showContainer(currentIndex);
  });

  if (noBtn) {
    noBtn.addEventListener("click", () => {
      noBtn.style.display = "none";
      // ถ้าต้องการไปหน้าถัดไปเมื่อกด No
      currentIndex++;
      if (currentIndex < containers.length) showContainer(currentIndex);
    });
  }
}


