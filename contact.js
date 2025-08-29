// İletişim sayfası için JavaScript fonksiyonları

// Sayfa yüklendiğinde form event listener'ını ekle
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

// Form gönderme işlemi
function handleFormSubmit(event) {
    // Form validasyonu
    if (!validateForm()) {
        event.preventDefault();
        return;
    }
    
    // Localhost'ta form gönderimini engelle, sadece test mesajı göster
    event.preventDefault();
    
    // Başarı mesajı göster
    showMessage('Test: Mesajınız başarıyla gönderildi! (Gerçek gönderim için Netlify\'a deploy edin)', 'success');
    
    // Formu temizle
    setTimeout(() => {
        clearForm();
    }, 1000);
}

// Mesaj göster
function showMessage(message, type = 'info') {
    // Mevcut mesaj varsa kaldır
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Yeni mesaj oluştur
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Mesajı sayfaya ekle
    document.body.appendChild(messageDiv);
    
    // 5 saniye sonra otomatik kaldır
    setTimeout(() => {
        if (messageDiv.parentElement) {
            messageDiv.remove();
        }
    }, 5000);
}

// Formu temizle
function clearForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.reset();
    }
}

// Form validasyonu
function validateForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const wordCard = document.getElementById('wordCard').value.trim();
    
    if (!fullName) {
        showMessage('Lütfen adınızı ve soyadınızı girin.', 'error');
        return false;
    }
    
    if (!email) {
        showMessage('Lütfen e-posta adresinizi girin.', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
        return false;
    }
    
    if (!wordCard) {
        showMessage('Lütfen kelime kartı alanını doldurun.', 'error');
        return false;
    }
    
    return true;
}

// E-posta formatı kontrolü
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
