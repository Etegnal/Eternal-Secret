// Ayarlar sayfası için JavaScript fonksiyonları

// Sayfa yüklendiğinde mevcut ayarları yükle
document.addEventListener('DOMContentLoaded', function() {
    loadSettings();
});

// Dil değiştirme fonksiyonu
function changeLanguage(language) {
    // Tüm dil butonlarından active sınıfını kaldır
    document.querySelectorAll('.setting-btn[id^="lang-"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Seçilen dil butonuna active sınıfını ekle
    document.getElementById(`lang-${language}`).classList.add('active');
    
    // Dil değişikliğini localStorage'a kaydet
    const savedSettings = localStorage.getItem('gameSettings');
    let settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.language = language;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    
    // Sayfadaki metinleri güncelle
    updatePageLanguage();
    
    console.log('Dil değiştirildi:', language);
}

// Tema değiştirme fonksiyonu
function changeTheme(theme) {
    // Tüm tema butonlarından active sınıfını kaldır
    document.querySelectorAll('.setting-btn[id^="theme-"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Seçilen tema butonuna active sınıfını ekle
    document.getElementById(`theme-${theme}`).classList.add('active');
    
    // Tema değişikliğini localStorage'a kaydet
    const savedSettings = localStorage.getItem('gameSettings');
    let settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.theme = theme;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    
    // Tema değişikliğini uygula
    applyTheme(theme);
    
    console.log('Tema değiştirildi:', theme);
}

// Temayı uygula
function applyTheme(theme) {
    const body = document.body;
    
    if (theme === 'light') {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
    } else {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
    }
}

// Ayarları kaydet
function saveSettings() {
    const activeLanguage = document.querySelector('.setting-btn[id^="lang-"].active');
    const activeTheme = document.querySelector('.setting-btn[id^="theme-"].active');
    
    const settings = {
        language: activeLanguage ? activeLanguage.id.replace('lang-', '') : 'tr',
        theme: activeTheme ? activeTheme.id.replace('theme-', '') : 'light'
    };
    
    // Ayarları localStorage'a kaydet
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    
    console.log('Ayarlar kaydedildi:', settings);
}

// Mevcut ayarları yükle
function loadSettings() {
    const savedSettings = localStorage.getItem('gameSettings');
    
    if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Dil ayarını yükle
        if (settings.language) {
            // Buton durumunu güncelle
            document.querySelectorAll('.setting-btn[id^="lang-"]').forEach(btn => {
                btn.classList.remove('active');
            });
            const langBtn = document.getElementById(`lang-${settings.language}`);
            if (langBtn) langBtn.classList.add('active');
        }
        
        // Tema ayarını yükle
        if (settings.theme) {
            // Buton durumunu güncelle
            document.querySelectorAll('.setting-btn[id^="theme-"]').forEach(btn => {
                btn.classList.remove('active');
            });
            const themeBtn = document.getElementById(`theme-${settings.theme}`);
            if (themeBtn) themeBtn.classList.add('active');
            
            // Temayı uygula
            applyTheme(settings.theme);
        }
    }
}

// Mesaj gösterme fonksiyonu
function showMessage(message, type = 'info') {
    // Basit bir mesaj gösterme sistemi
    alert(message);
}
