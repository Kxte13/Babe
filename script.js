
    // เวอร์ชันง่าย ไม่ต้องมี server — เช็ครหัสใน client
const form = document.getElementById('pwForm');
const msg = document.getElementById('msg');
const popup = document.getElementById('popup');
const popupClose = document.getElementById('popupClose');
const pwInput = document.getElementById('pw');
const showHint = document.getElementById('showHint');
const hintText = document.getElementById('hint');

    function closePopup() {
      popup.style.display = 'none';
      pwInput.focus();
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (pwInput.value === '12') {
        localStorage.setItem('authenticated', 'true');
        window.location.href = 'page1.html';
        } else {
        popup.style.display = 'flex';
        pwInput.value = '';
        }
        });
        
        
        popupClose.addEventListener('click', closePopup);
        
        
        document.addEventListener('keydown', (e) => {
        if (popup.style.display === 'flex' && e.key === 'Enter') {
        e.preventDefault();
        closePopup();
        }
        });
        
        
        // แสดง hint เมื่อ hover ปุ่ม
        showHint.addEventListener('mouseenter', () => {
        hintText.style.display = 'block';
        });
        showHint.addEventListener('mouseleave', () => {
        hintText.style.display = 'none';
        });
