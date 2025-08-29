// Takım sayısına göre input alanlarını güncelle
function updateTeamInputs() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const teamInputsContainer = document.getElementById('teamInputs');
    
    teamInputsContainer.innerHTML = '';
    
    for (let i = 1; i <= teamCount; i++) {
        const teamInput = document.createElement('div');
        teamInput.className = 'team-input';
        teamInput.innerHTML = `
            <label>Takım ${i}:</label>
            <input type="text" id="team${i}" placeholder="Takım adı girin" value="Takım ${i}">
        `;
        teamInputsContainer.appendChild(teamInput);
    }
}

// Oyunu başlat
function startGame() {
    const teamCount = parseInt(document.getElementById('teamCount').value);
    const roundTime = parseInt(document.getElementById('roundTime').value);
    
    // Takım bilgilerini topla
    const teams = [];
    for (let i = 1; i <= teamCount; i++) {
        const teamName = document.getElementById(`team${i}`).value || `Takım ${i}`;
        teams.push({
            name: teamName,
            score: 0,
            color: getTeamColor(i)
        });
    }
    
    // Oyun verilerini localStorage'a kaydet
    const gameData = {
        teams: teams,
        roundTime: roundTime,
        currentTeamIndex: 0,
        currentRound: 1,
        timeLeft: roundTime,
        isGameActive: false,
        currentWordIndex: 0,
        passCount: 3,
        maxPassCount: 3
    };
    
    localStorage.setItem('gameData', JSON.stringify(gameData));
    
    // Oyun sayfasına yönlendir
    window.location.href = 'game.html';
}

// Takım rengi al
function getTeamColor(teamIndex) {
    const colors = [
        'linear-gradient(45deg, #007bff, #0056b3)', // Mavi
        'linear-gradient(45deg, #dc3545, #8b0000)', // Kırmızı
        'linear-gradient(45deg, #f093fb, #f5576c)', // Pembe
        'linear-gradient(45deg, #4facfe, #00f2fe)'  // Açık mavi
    ];
    return colors[(teamIndex - 1) % colors.length];
}

// Sayfa yüklendiğinde takım input'larını güncelle
document.addEventListener('DOMContentLoaded', function() {
    updateTeamInputs();
});
