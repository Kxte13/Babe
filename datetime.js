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

document.addEventListener("DOMContentLoaded", function () {
  let mode = "clock"; // ค่าเริ่มต้นคือโหมดเวลา
  let intervalClock = null;
  let intervalCount = null;

  const startDate = new Date(2025, 10, 17, 0, 0, 0);

  function set(sel, value) {
    document.querySelectorAll(sel).forEach((e) => (e.textContent = value));
  }

  // -------------------------------
  // ฟังก์ชันเวลาแบบปกติ
  // -------------------------------
  function startClock() {
    clearInterval(intervalCount);

    intervalClock = setInterval(() => {
      const now = new Date();

      set(".year span", now.getFullYear());
      set(".month span", now.toLocaleString("zh-TW", { month: "long" }));
      set(".month2 span", now.toLocaleString("zh-TW", { month: "long" }));
      set(".date span", now.getDate());
      set(".date2 span", now.getDate());
      set(".day span", now.toLocaleString("zh-TW", { weekday: "long" }));
      set(".day2 span", now.toLocaleString("zh-TW", { weekday: "long" }));

      set(".hour span", String(now.getHours()).padStart(2, "0"));
      set(".minute span", String(now.getMinutes()).padStart(2, "0"));
      set(".second span", String(now.getSeconds()).padStart(2, "0"));
    }, 1000);
  }

  // -------------------------------
  // ฟังก์ชัน Count
  // -------------------------------
  function startCount() {
    clearInterval(intervalClock);

    intervalCount = setInterval(() => {
      const now = new Date();
      let diff = Math.floor((now - startDate) / 1000);

      if (diff < 0) diff = 0;

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      // ตั้งค่าตามที่ต้องการให้แสดงแบบในรูป
      set(".year span", "寶寶 愛你喲");
      set(".month span", "愛你💗");
      set(".day span", "天");

      set(".date span", days);
      set(".hour span", hours);
      set(".minute span", minutes);
      set(".second span", seconds);
      set(".date2 span", "分鐘");
      set(".month2 span", "秒");
      set(".day2 span", "小時");
    }, 1000);
  }

  // -------------------------------
  // ปุ่มสลับโหมด
  // -------------------------------
  document.getElementById("btnClock").onclick = () => {
    mode = "clock";
    startClock();
  };

  document.getElementById("btnCount").onclick = () => {
    mode = "count";
    startCount();
  };

  // เริ่มต้นเป็นโหมดเวลา
  startClock();
});
