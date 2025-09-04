function scrollContainer(containerId, direction) {
  const container = document.getElementById(containerId);
  if (!container) return; // biar aman kalau id tidak ketemu

  const scrollAmount = 320; // ukuran geser per klik
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// pemanggilan contoh
function scrollPortfolio(direction) {
  scrollContainer("portfolioContainer", direction);
}

function scrollExperience(direction) {
  scrollContainer("experienceContainer", direction);
}


// JavaScript untuk toggle hamburger menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Tutup menu ketika mengklik link
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
  });
});


// JavaScript untuk Experience Card Popup
document.addEventListener('DOMContentLoaded', function() {
    // Select semua tombol see more
    const seeMoreButtons = document.querySelectorAll('.see-more-btn');
    
    // Create popup element
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    popupOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        padding: 20px;
    `;
    
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';
    popupContent.style.cssText = `
        background-color: #191D28;
        border-radius: 1rem;
        padding: 2rem;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    `;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'popup-close-btn';
    closeButton.textContent = 'Close';
    closeButton.style.cssText = `
        background: #EAB308;
        color: black;
        border: none;
        padding: 10px 20px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        margin-top: 20px;
        display: block;
        margin-left: auto;
        margin-right: auto;
        transition: all 0.3s ease;
    `;
    
    closeButton.addEventListener('mouseenter', function() {
        this.style.background = '#fbbf24';
        this.style.transform = 'translateY(-2px)';
    });
    
    closeButton.addEventListener('mouseleave', function() {
        this.style.background = '#EAB308';
        this.style.transform = 'translateY(0)';
    });
    
    // Append elements
    popupContent.appendChild(closeButton);
    popupOverlay.appendChild(popupContent);
    document.body.appendChild(popupOverlay);
    
    // Function untuk menampilkan popup
    function showPopup(card) {
        const date = card.querySelector('.exp-date').textContent;
        const title = card.querySelector('.exp-title').textContent;
        const company = card.querySelector('.exp-company').innerHTML;
        const desc = card.querySelector('.exp-desc').textContent;
        
        popupContent.innerHTML = `
            <div class="popup-card">
                <h4 class="exp-date">${date}</h4>
                <h3 class="exp-title">${title}</h3>
                <p class="exp-company">${company}</p>
                <p class="exp-desc-full">${desc}</p>
            </div>
            <button class="popup-close-btn">Close</button>
        `;
        
        // Add styles untuk konten popup
        const style = document.createElement('style');
        style.textContent = `
            .popup-card {
                color: #D1D5DB;
            }
            
            .popup-card .exp-date {
                font-size: 0.9rem;
                color: #9CA3AF;
                margin-bottom: 0.5rem;
            }
            
            .popup-card .exp-title {
                font-size: 1.4rem;
                font-weight: bold;
                margin: 0.5rem 0;
                color: #EAB308;
            }
            
            .popup-card .exp-company {
                font-size: 1.1rem;
                color: white;
                margin-bottom: 1.5rem;
            }
            
            .popup-card .exp-type {
                font-size: 0.9rem;
                color: #22D3EE;
            }
            
            .popup-card .exp-desc-full {
                font-size: 1rem;
                color: #D1D5DB;
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .popup-close-btn {
                background: #EAB308;
                color: black;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                display: block;
                margin: 0 auto;
                transition: all 0.3s ease;
            }
            
            .popup-close-btn:hover {
                background: #fbbf24;
                transform: translateY(-2px);
            }
        `;
        
        document.head.appendChild(style);
        
        // Tambahkan event listener untuk close button
        const newCloseButton = popupContent.querySelector('.popup-close-btn');
        newCloseButton.addEventListener('click', closePopup);
        
        // Tampilkan popup
        popupOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    // Function untuk menutup popup
    function closePopup() {
        popupOverlay.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling again
    }
    
    // Tambahkan event listener untuk setiap tombol
    seeMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.exp-card');
            showPopup(card);
        });
    });
    
    // Close popup ketika klik di luar konten
    popupOverlay.addEventListener('click', function(e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });
    
    // Close popup dengan ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popupOverlay.style.display === 'flex') {
            closePopup();
        }
    });
});