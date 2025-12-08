// window.addEventListener("DOMContentLoaded", () => {
const lastDate = new Date(2025, 10, 17, 0, 0, 0);

function updateTime() {
  const now = new Date();
  let diffMs = now - lastDate;

  if (diffMs < 0) {
    document.getElementById("time").textContent = "Not yet started";
    return;
  }

  let totalSeconds = Math.floor(diffMs / 1000);

  const days = Math.floor(totalSeconds / (24 * 3600));
  totalSeconds %= 24 * 3600;

  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  document.getElementById("time").innerHTML =
    `<span class="num days">${days}</span><span class="label">天</span> ` +
    `<span class="num hours">${hours}</span><span class="label">小時</span> ` +
    `<span class="num minutes">${minutes}</span><span class="label">分鐘</span> ` +
    `<span class="num seconds">${seconds}</span><span class="label">秒鐘</span>`;
}

updateTime(); // เรียกครั้งแรก
setInterval(updateTime, 1000); // อัปเดตทุกวินาที

let timer = null;
let hideTimeout = null;

const toggleBtn = document.getElementById("toggleBtn");
const configBox = document.getElementById("configBox");

// เริ่มเคาท์ดาวน์
function startCountdown(savedDate) {
  if (timer) clearInterval(timer);

  timer = setInterval(() => {
    const now = new Date().getTime();
    const target = new Date(savedDate).getTime();
    const diff = target - now;

    if (diff <= 0) {
      document.getElementById("countdownText").textContent = "該到了！✨";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("countdownText").innerHTML =
      `<span class="date days">${days}</span><span class="label">天</span> ` +
      `<span class="date hours">${hours}</span><span class="label">小時</span> ` +
      `<span class="date minutes">${minutes}</span><span class="label">分鐘</span>`;
  }, 1000);
}

// เปิดกล่อง
function showConfig() {
  if (hideTimeout) clearTimeout(hideTimeout);
  configBox.style.display = "block";
}

// ซ่อนกล่องถ้าเมาส์ไม่อยู่บนปุ่มหรือกล่อง
function scheduleHideConfig() {
  hideTimeout = setTimeout(() => {
    const isHoveringBtn = toggleBtn.matches(":hover");
    const isHoveringBox = configBox.matches(":hover");

    if (!isHoveringBtn && !isHoveringBox) {
      configBox.style.display = "none";
    }
  }, 100); // หน่วง 100ms ให้เลื่อนเมาส์จากปุ่มไปกล่องได้
}

// ปุ่มเปิดกล่อง
toggleBtn.addEventListener("click", showConfig);

// ตรวจสอบ hover เมาส์ออก
toggleBtn.addEventListener("mouseleave", scheduleHideConfig);
configBox.addEventListener("mouseleave", scheduleHideConfig);

// บันทึกการตั้งค่า
document.getElementById("setBtn").addEventListener("click", () => {
  const selected = document.getElementById("datePicker").value;
  const title = document.getElementById("titleInput").value.trim();

  if (!selected) {
    alert("請選擇日期 📅");
    return;
  }

  if (!title) {
    alert("請輸入倒數計時名稱 ⏳📝");
    return;
  }

  localStorage.setItem("countdown_date", selected);
  localStorage.setItem("countdown_title", title);

  document.getElementById("titleDisplay").textContent = title;
  startCountdown(selected);

  configBox.style.display = "none";
});

// รีเซ็ตค่า
document.getElementById("resetBtn").addEventListener("click", () => {
  if (timer) clearInterval(timer);

  localStorage.removeItem("countdown_date");
  localStorage.removeItem("countdown_title");

  document.getElementById("titleDisplay").textContent = "倒數計時名稱 ⏳✨";
  document.getElementById("countdownText").textContent = "--:--:--";
  document.getElementById("titleInput").value = "";
  document.getElementById("datePicker").value = "";
});

// โหลดค่าเดิมจาก localStorage
window.onload = () => {
  const savedDate = localStorage.getItem("countdown_date");
  const savedTitle = localStorage.getItem("countdown_title");

  if (savedTitle) {
    document.getElementById("titleDisplay").textContent = savedTitle;
    document.getElementById("titleInput").value = savedTitle;
  }

  if (savedDate) {
    document.getElementById("datePicker").value = savedDate;
    startCountdown(savedDate);
  }
};
// });
