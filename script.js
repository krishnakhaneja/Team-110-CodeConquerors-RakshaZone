function showPopup(message, type = 'error') {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.className = `alert ${type}`;
    document.body.appendChild(popup);
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => popup.remove(), 300);
    }, 3000);
  
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#2ECC71' : '#E63946'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 1000;
            opacity: 1;
            transition: opacity 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
    `;
    document.head.appendChild(style);
  }
  
  const slider = document.getElementById('tipsSlider');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const cardWidth = 280 + 16;
  let currentPosition = 0;
  
  nextBtn.addEventListener('click', () => {
    const maxPosition = -(slider.children.length - 1) * cardWidth;
    if (currentPosition > maxPosition) {
        currentPosition -= cardWidth;
        slider.style.transform = `translateX(${currentPosition}px)`;
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (currentPosition < 0) {
        currentPosition += cardWidth;
        slider.style.transform = `translateX(${currentPosition}px)`;
    }
  });
  
  document.querySelectorAll('.tutorial-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const videoUrl = link.dataset.video;
        showPopup(`Opening video tutorial: ${videoUrl}`, 'success');
    });
  });
  
  document.getElementById('helplineSearch').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const helplines = document.querySelectorAll('.helpline-item');
    helplines.forEach(item => {
        const region = item.dataset.region.toLowerCase();
        const text = item.textContent.toLowerCase();
        item.style.display = (region.includes(searchTerm) || text.includes(searchTerm)) ? 'block' : 'none';
    });
  });
  
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    showPopup('Message Sent Successfully!', 'success');
    this.reset();
  });
  
  document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    this.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
  });
  
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerHTML = '<i class="fas fa-sun"></i>';
  }
  
  document.getElementById('panicBtn').addEventListener('click', function() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const location = `Lat: ${latitude}, Lon: ${longitude}`;
            const message = `Panic Alert! My location: ${location} - Immediate help needed!`;
            const smsLink = `sms:+1234567890?body=${encodeURIComponent(message)}`;
            window.location.href = smsLink;
            showPopup('Panic Alert Sent with Location!', 'success');
        },
        () => showPopup('Location access denied. Enable it in settings.')
    );
  });
  
  document.getElementById('liveLocationBtn').addEventListener('click', function() {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            showPopup(`Live Location Shared: Lat ${latitude}, Lon ${longitude}`, 'success');
        },
        () => showPopup('Location access denied.')
    );
  });
