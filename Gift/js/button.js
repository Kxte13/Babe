const questionContainer = document.querySelector(".question-container");
const resultContainer = document.querySelector(".result-container");
const gifResult = document.querySelector(".gif-result");
const heartLoader = document.querySelector(".cssload-main");
const yesBtn = document.querySelector(".js-yes-btn");
const noBtn = document.querySelector(".js-no-btn");

const clickCounterDisplay = document.createElement("div");
clickCounterDisplay.style.position = "fixed";
clickCounterDisplay.style.top = "60px";
clickCounterDisplay.style.right = "25px";
clickCounterDisplay.style.padding = "8px 12px";
clickCounterDisplay.style.backgroundColor = "rgba(0,0,0,0.7)";
clickCounterDisplay.style.color = "#fff";
clickCounterDisplay.style.fontSize = "16px";
clickCounterDisplay.style.borderRadius = "5px";
clickCounterDisplay.style.zIndex = "1000";
clickCounterDisplay.textContent = "Clicks: 0";
document.body.appendChild(clickCounterDisplay);

let escapeDistance = 60;
let canRunAway = true;

if (yesBtn && noBtn) {
  let clickCount = 0;
  const maxClicks = 5;

  document.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
      clickCount++;
      clickCounterDisplay.textContent = `Clicks: ${clickCount}`;
      if (clickCount >= maxClicks) {
        canRunAway = false;
      }
    }
  });

  function setResponsivePosition() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const spacing = screenWidth * 0.02;

    const btnWidth = yesBtn.offsetWidth;
    const btnHeight = yesBtn.offsetHeight;
    const totalWidth = btnWidth + noBtn.offsetWidth + spacing;

    const startX = (screenWidth - totalWidth) / 2;
    const centerY = (screenHeight - btnHeight) / 2;

    yesBtn.style.position = "absolute";
    noBtn.style.position = "absolute";

    yesBtn.style.left = `${startX}px`;
    yesBtn.style.top = `${centerY}px`;

    noBtn.style.left = `${startX + btnWidth + spacing}px`;
    noBtn.style.top = `${centerY}px`;
  }

  setResponsivePosition();
  window.addEventListener("resize", setResponsivePosition);

  function moveButtonFast(btn) {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // ขนาดพื้นที่ปลอดภัย (ตีกรอบตรงกลาง 60%)
    const safeWidth = screenWidth * 0.55;
    const safeHeight = screenHeight * 0.8;

    // ตำแหน่งเริ่มของสี่เหลี่ยมตรงกลาง
    const offsetX = (screenWidth - safeWidth) / 2;
    const offsetY = (screenHeight - safeHeight) / 2;

    const btnWidth = btn.offsetWidth;
    const btnHeight = btn.offsetHeight;

    // สุ่มเฉพาะภายในกรอบกลาง
    const newX = offsetX + Math.random() * (safeWidth - btnWidth);
    const newY = offsetY + Math.random() * (safeHeight - btnHeight);

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;
  }

  document.addEventListener("mousemove", (e) => {
    if (!canRunAway) return;

    const rect = yesBtn.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const distX = Math.abs(mouseX - (rect.left + rect.width / 2));
    const distY = Math.abs(mouseY - (rect.top + rect.height / 2));

    if (distX < escapeDistance && distY < escapeDistance) {
      moveButtonFast(yesBtn);
    }
  });

  yesBtn.addEventListener("mousedown", () => {
    canRunAway = false;
  });

  yesBtn.addEventListener("click", () => {
    questionContainer.style.display = "none";
    heartLoader.style.display = "inherit";
    setTimeout(() => {
      heartLoader.style.display = "none";
      resultContainer.style.display = "inherit";
      gifResult.play();
    }, 3000);

    const nextPage = yesBtn.dataset.next;
    if (nextPage) window.location.href = nextPage;
  });

  noBtn.addEventListener("click", () => {
    noBtn.style.display = "none";
  });
}
