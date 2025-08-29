console.log('Game.js dosyası yüklendi!');

// Oyun durumu
let gameState = {
    teams: [],
    currentTeamIndex: 0,
    currentRound: 1,
    roundTime: 60,
    timer: null,
    timeLeft: 60,
    isGameActive: false,
    currentWordIndex: 0,
    passCount: 3,
    maxPassCount: 3
};

// Örnek kelime listesi (daha sonra genişletilebilir)
const wordList = [
    {
        word: "TELEFON",
        forbidden: ["ARAMA", "KONUŞMA", "CEP", "NUMARA", "MESAJ"]
    },
    {
        word: "BİLGİSAYAR",
        forbidden: ["KLAVYE", "FARE", "EKRAN", "İNTERNET", "OYUN"]
    },
    {
        word: "ARABA",
        forbidden: ["TEKER", "SÜRÜCÜ", "YOL", "HIZ", "MOTOR"]
    },
    {
        word: "KİTAP",
        forbidden: ["SAYFA", "OKUMA", "YAZAR", "KÜTÜPHANE", "HİKAYE"]
    },
    {
        word: "MÜZİK",
        forbidden: ["ŞARKI", "NOTA", "ÇALMAK", "SES", "RİTİM"]
    },
    {
        word: "YEMEK",
        forbidden: ["TAT", "PİŞİRMEK", "AÇLIK", "ÇATAL", "TABAK"]
    },
    {
        word: "SPOR",
        forbidden: ["OYUN", "SAHA", "TAKIM", "GALİBİYET", "ANTREMAN"]
    },
    {
        word: "DENİZ",
        forbidden: ["SU", "DALGA", "GEMİ", "BALIK", "SAHİL"]
    }
];

// Sayfa yüklendiğinde çalışacak fonksiyon
document.addEventListener('DOMContentLoaded', function() {
    // localStorage'dan oyun verilerini yükle
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
        const gameData = JSON.parse(savedGameData);
        gameState = { ...gameState, ...gameData };
    } else {
        // Eğer veri yoksa ana sayfaya yönlendir
        window.location.href = 'index.html';
        return;
    }
    
    // Skor panelini güncelle
    updateScorePanel();
    
    // İlk kelimeyi göster
    showNextWord();
    
    // Pass sayısını güncelle
    updatePassCount();
    
    // İlk arka plan rengini ayarla
    updateBackgroundColor();
    
    // Overlay'i göster
    showWordCardOverlay();
});

// Skor panelini güncelle
function updateScorePanel() {
    const teamsScoresContainer = document.getElementById('teamsScores');
    teamsScoresContainer.innerHTML = '';
    
    gameState.teams.forEach((team, index) => {
        const teamScore = document.createElement('div');
        teamScore.className = `team-score ${index === gameState.currentTeamIndex ? 'active' : ''}`;
        
        // Takım renklerini güncelle
        if (index === 0) {
            // İlk takım - mavi
            teamScore.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
        } else if (index === 1) {
            // İkinci takım - kırmızı
            teamScore.style.background = 'linear-gradient(45deg, #dc3545, #8b0000)';
        } else {
            // Diğer takımlar - varsayılan renk
            teamScore.style.background = team.color;
        }
        
        // Aktif takım için özel renk
        if (index === gameState.currentTeamIndex) {
            if (index === 0) {
                teamScore.style.background = 'linear-gradient(45deg, #007bff, #0056b3)';
            } else if (index === 1) {
                teamScore.style.background = 'linear-gradient(45deg, #dc3545, #8b0000)';
            }
        }
        
        teamScore.innerHTML = `
            <h3>${team.name}</h3>
            <div class="score">${team.score}</div>
        `;
        teamsScoresContainer.appendChild(teamScore);
    });
    
    // Mevcut takımı güncelle
    document.getElementById('currentTeam').textContent = gameState.teams[gameState.currentTeamIndex].name;
    
    // Aktif takıma göre arka plan rengini güncelle
    updateBackgroundColor();
    
    // Pass sayısını güncelle
    updatePassCount();
}

// Aktif takıma göre kelime kutusu rengini güncelle
function updateBackgroundColor() {
    const wordCard = document.querySelector('.word-card');
    const currentTeamIndex = gameState.currentTeamIndex;
    
    if (currentTeamIndex === 0) {
        // Mavi takım - mavi kelime kutusu
        wordCard.style.background = 'linear-gradient(135deg, rgba(0, 123, 255, 0.15), rgba(0, 86, 179, 0.1))';
        wordCard.style.borderColor = 'rgba(0, 123, 255, 0.3)';
    } else if (currentTeamIndex === 1) {
        // Kırmızı takım - kırmızı kelime kutusu
        wordCard.style.background = 'linear-gradient(135deg, rgba(220, 53, 69, 0.15), rgba(139, 0, 0, 0.1))';
        wordCard.style.borderColor = 'rgba(220, 53, 69, 0.3)';
    } else {
        // Diğer takımlar - varsayılan
        wordCard.style.background = 'transparent';
        wordCard.style.borderColor = 'rgba(255, 255, 255, 0.2)';
    }
}

// Overlay'i gizle
function hideWordCardOverlay() {
    const overlay = document.getElementById('wordCardOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    }
}

// Overlay'i göster
function showWordCardOverlay() {
    const overlay = document.getElementById('wordCardOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
    }
}

// Sonraki kelimeyi göster
function showNextWord() {
    if (gameState.currentWordIndex >= wordList.length) {
        // Kelime listesi bittiyse başa dön
        gameState.currentWordIndex = 0;
    }
    
    const currentWord = wordList[gameState.currentWordIndex];
    
    document.getElementById('mainWord').textContent = currentWord.word;
    
    // Yasak kelimeleri güncelle
    currentWord.forbidden.forEach((word, index) => {
        const forbiddenElement = document.getElementById(`forbidden${index + 1}`);
        if (forbiddenElement) {
            forbiddenElement.textContent = word;
        }
    });
    
    gameState.currentWordIndex++;
}

// Timer'ı başlat/duraklat
function toggleTimer() {
    if (gameState.isGameActive) {
        pauseTimer();
    } else {
        startTimer();
    }
}

// Timer'ı başlat
function startTimer() {
    if (gameState.timeLeft <= 0) {
        gameState.timeLeft = gameState.roundTime;
    }
    
    gameState.isGameActive = true;
    
    // Overlay'i gizle
    hideWordCardOverlay();
    
    // Timer'ı başlat
    gameState.timer = setInterval(() => {
        gameState.timeLeft--;
        document.getElementById('timer').textContent = gameState.timeLeft;
        
        if (gameState.timeLeft <= 0) {
            endRound();
        }
    }, 1000);
    
    // Timer'ı güncelle
    document.getElementById('timer').textContent = gameState.timeLeft;
    
    // Buton ikonunu güncelle
    document.getElementById('timerToggleBtn').innerHTML = '<i class="fas fa-pause"></i>';
}

// Timer'ı duraklat
function pauseTimer() {
    clearInterval(gameState.timer);
    gameState.isGameActive = false;
    
    // Overlay'i göster
    showWordCardOverlay();
    
    // Buton ikonunu güncelle
    document.getElementById('timerToggleBtn').innerHTML = '<i class="fas fa-play"></i>';
}

// Timer'ı sıfırla
function resetTimer() {
    clearInterval(gameState.timer);
    gameState.isGameActive = false;
    gameState.timeLeft = gameState.roundTime;
    
    // Overlay'i göster
    showWordCardOverlay();
    
    document.getElementById('timer').textContent = gameState.timeLeft;
    document.getElementById('timerToggleBtn').innerHTML = '<i class="fas fa-play"></i>';
}

// Oyunu başlat/duraklat (eski fonksiyon - geriye uyumluluk için)
function toggleGame() {
    toggleTimer();
}

// Turu başlat (eski fonksiyon - geriye uyumluluk için)
function startRound() {
    startTimer();
}

// Turu bitir
function endRound() {
    clearInterval(gameState.timer);
    gameState.isGameActive = false;
    
    // Sonraki takıma geç
    gameState.currentTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
    
    // Pass sayısını sıfırla
    gameState.passCount = gameState.maxPassCount;
    
    // Skor panelini güncelle
    updateScorePanel();
    
    // Yeni kelime göster
    showNextWord();
    
    // Timer'ı sıfırla
    gameState.timeLeft = gameState.roundTime;
    document.getElementById('timer').textContent = gameState.roundTime;
    document.getElementById('timerToggleBtn').innerHTML = '<i class="fas fa-play"></i>';
    
    // Arka plan rengini güncelle
    updateBackgroundColor();
}

// Doğru cevap
function correctAnswer() {
    if (!gameState.isGameActive) {
        startTimer();
    }
    
    gameState.teams[gameState.currentTeamIndex].score += 1;
    updateScorePanel();
    showNextWord();
}

// Pass sayısını güncelle
function updatePassCount() {
    document.getElementById('passCount').textContent = `${gameState.passCount}/${gameState.maxPassCount}`;
}

// Pass
function passAnswer() {
    if (!gameState.isGameActive) {
        startTimer();
    }
    
    if (gameState.passCount > 0) {
        gameState.passCount--;
        updatePassCount();
        showNextWord();
    } else {
        // Pass hakkı kalmadı, uyarı ver
        alert('Pass hakkınız kalmadı!');
    }
}

// Faul
function foulAnswer() {
    if (!gameState.isGameActive) {
        startTimer();
    }
    
    gameState.teams[gameState.currentTeamIndex].score -= 1;
    updateScorePanel();
    showNextWord();
}

// Sonraki tur
function nextRound() {
    if (gameState.isGameActive) {
        endRound();
    } else {
        showNextWord();
    }
}

// Oyunu bitir
function endGame() {
    clearInterval(gameState.timer);
    
    // Kazanan takımı bul
    let winner = gameState.teams[0];
    gameState.teams.forEach(team => {
        if (team.score > winner.score) {
            winner = team;
        }
    });
    
    // Sonuç ekranını göster
    const result = confirm(`Oyun bitti!\n\nKazanan: ${winner.name} (${winner.score} puan)\n\nYeni oyun başlatmak ister misiniz?`);
    
    if (result) {
        // localStorage'ı temizle
        localStorage.removeItem('gameData');
        window.location.href = 'index.html';
    }
}

// Klavye kısayolları
document.addEventListener('keydown', function(event) {
    switch(event.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
            correctAnswer();
            break;
        case 'ArrowDown':
        case 's':
        case 'S':
            passAnswer();
            break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
        case 'ArrowRight':
        case 'd':
        case 'D':
            foulAnswer();
            break;
                    case ' ':
                event.preventDefault();
                toggleTimer();
                break;
    }
});

// Mobil dokunma olayları için
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(event) {
    touchStartY = event.touches[0].clientY;
});

document.addEventListener('touchend', function(event) {
    touchEndY = event.changedTouches[0].clientY;
    const diffY = touchStartY - touchEndY;
    
    if (Math.abs(diffY) > 50) { // Minimum kaydırma mesafesi
        if (diffY > 0) {
            // Yukarı kaydırma - Doğru
            correctAnswer();
        } else {
            // Aşağı kaydırma - Pass
            passAnswer();
        }
    }
});

// Settings menüsünü aç/kapat
function toggleSettingsMenu() {
    console.log('toggleSettingsMenu fonksiyonu çağrıldı');
    const menu = document.getElementById('settingsMenu');
    console.log('Menu element:', menu);
    
    if (menu) {
        const wasVisible = menu.classList.contains('show');
        menu.classList.toggle('show');
        const isVisible = menu.classList.contains('show');
        console.log('Menu durumu:', wasVisible ? 'gizli' : 'görünür', '->', isVisible ? 'görünür' : 'gizli');
        console.log('Menu display style:', menu.style.display);
        console.log('Menu classList:', menu.classList.toString());
    } else {
        console.error('Settings menu elementi bulunamadı!');
    }
}

// Sayfa yüklendiğinde event listener'ları ekle
document.addEventListener('DOMContentLoaded', function() {
    // Settings butonuna tıklama event listener'ı
    const settingsBtn = document.getElementById('settingsBtn');
    console.log('Settings button element:', settingsBtn);
    
    if (settingsBtn) {
        settingsBtn.addEventListener('click', function(event) {
            console.log('Settings butonuna tıklandı!');
            event.stopPropagation();
            toggleSettingsMenu();
        });
        console.log('Event listener eklendi');
    } else {
        console.error('Settings button bulunamadı!');
    }
    
    // Sayfa dışına tıklandığında menüyü kapat
    document.addEventListener('click', function(event) {
        const dropdown = document.querySelector('.settings-dropdown');
        const menu = document.getElementById('settingsMenu');
        
        if (dropdown && menu && !dropdown.contains(event.target) && menu.classList.contains('show')) {
            menu.classList.remove('show');
        }
    });
});

// Game sayfası için dil değiştirme
function changeGameLanguage(language) {
    // Tüm dil butonlarından active sınıfını kaldır
    document.querySelectorAll('.menu-btn[id^="game-lang-"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Seçilen dil butonuna active sınıfını ekle
    document.getElementById(`game-lang-${language}`).classList.add('active');
    
    // Dil değişikliğini localStorage'a kaydet
    const savedSettings = localStorage.getItem('gameSettings');
    let settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.language = language;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    
    // Sayfadaki metinleri güncelle
    updatePageLanguage();
    
    // Settings menüsünü kapat
    const menu = document.getElementById('settingsMenu');
    if (menu) {
        menu.classList.remove('show');
    }
    
    console.log('Dil değiştirildi:', language);
}

// Game sayfası için tema değiştirme
function changeGameTheme(theme) {
    // Tüm tema butonlarından active sınıfını kaldır
    document.querySelectorAll('.menu-btn[id^="game-theme-"]').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Seçilen tema butonuna active sınıfını ekle
    document.getElementById(`game-theme-${theme}`).classList.add('active');
    
    // Tema değişikliğini localStorage'a kaydet
    const savedSettings = localStorage.getItem('gameSettings');
    let settings = savedSettings ? JSON.parse(savedSettings) : {};
    settings.theme = theme;
    localStorage.setItem('gameSettings', JSON.stringify(settings));
    
    // Tema değişikliğini uygula
    applyTheme(theme);
    
    // Settings menüsünü kapat
    const menu = document.getElementById('settingsMenu');
    if (menu) {
        menu.classList.remove('show');
    }
    
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
