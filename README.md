# Tabu Oyunu Web Sitesi

Modern ve responsive tasarımlı Tabu oyunu web uygulaması. Mobil ve desktop cihazlarda mükemmel çalışır.

## Özellikler

### 🎮 Oyun Özellikleri
- **2-4 takım** desteği
- **Özelleştirilebilir tur süresi** (30-120 saniye)
- **Dinamik skor takibi** - her takımın rengi farklı
- **Otomatik timer** ve tur geçişleri
- **Kelime kartları** - ana kelime + 5 yasak kelime

### 🎯 Kontroller
- **Doğru**: Yeşil buton (+1 puan)
- **Pass**: Sarı buton (puan değişmez)
- **Faul**: Kırmızı buton (-1 puan)

### ⌨️ Klavye Kısayolları
- **W / ↑**: Doğru
- **S / ↓**: Pass  
- **A/D / ←/→**: Faul
- **Space**: Tur başlat/bitir

### 📱 Mobil Özellikler
- **Dokunmatik kaydırma** desteği
- **Responsive tasarım** - tüm ekran boyutları
- **Mobil optimizasyonu**

## Kullanım

### Başlangıç
1. `index.html` dosyasını web tarayıcısında açın
2. "OYNA" butonuna tıklayın

### Takım Kurulumu
1. Takım sayısını seçin (2-4)
2. Her takım için isim girin
3. Tur süresini ayarlayın
4. "Oyunu Başlat" butonuna tıklayın

### Oyun Akışı
1. **Kelime kartı** ekranın ortasında görünür
2. **Ana kelime** büyük yazı ile gösterilir
3. **5 yasak kelime** altında listelenir
4. **Timer** üstte geri sayım yapar
5. **Skor paneli** tüm takımların puanlarını gösterir

### Kontroller
- **Doğru buton**: Takım kelimeyi doğru tahmin etti
- **Pass buton**: Kelimeyi geçmek istiyor
- **Faul buton**: Yasak kelime kullanıldı
- **Sonraki Tur**: Manuel tur geçişi
- **Oyunu Bitir**: Oyunu sonlandır

## Teknik Detaylar

### Dosya Yapısı
```
├── index.html      # Ana HTML dosyası
├── styles.css      # CSS stilleri
├── script.js       # JavaScript mantığı
└── README.md       # Bu dosya
```

### Teknolojiler
- **HTML5**: Yapı
- **CSS3**: Stil ve animasyonlar
- **JavaScript**: Oyun mantığı
- **Google Fonts**: Poppins font ailesi

### Responsive Breakpoint'ler
- **Desktop**: 768px+
- **Tablet**: 768px altı
- **Mobile**: 480px altı

## Geliştirme

### Kelime Ekleme
`script.js` dosyasındaki `wordList` dizisine yeni kelimeler ekleyebilirsiniz:

```javascript
{
    word: "YENİ_KELİME",
    forbidden: ["YASAK1", "YASAK2", "YASAK3", "YASAK4", "YASAK5"]
}
```

### Özelleştirme
- **Renkler**: CSS'teki gradient değerlerini değiştirin
- **Font**: Google Fonts'tan yeni font seçin
- **Animasyonlar**: CSS transition değerlerini ayarlayın

## Tarayıcı Desteği
- ✅ Chrome (önerilen)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## Lisans
Bu proje açık kaynak kodludur ve eğitim amaçlı kullanılabilir.

---

**Eternal Secret** tarafından geliştirilmiştir. 🎮
