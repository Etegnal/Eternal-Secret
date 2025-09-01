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

// Genişletilmiş kelime listesi - Daha zorlu yasaklı kelimeler
const wordList = [
    // Teknoloji Kategorisi
    {
        word: "TELEFON",
        forbidden: ["ARAMA", "KONUŞMA", "CEP", "NUMARA", "MESAJ"]
    },
    {
        word: "BİLGİSAYAR",
        forbidden: ["KLAVYE", "FARE", "EKRAN", "İNTERNET", "OYUN"]
    },
    {
        word: "AKILLI TELEFON",
        forbidden: ["UYGULAMA", "DOKUNMATİK", "KAMERA", "ŞARJ", "EKRAN"]
    },
    {
        word: "LAPTOP",
        forbidden: ["TAŞINABİLİR", "BATARYA", "KLAVYE", "EKRAN", "ÇANTA"]
    },
    {
        word: "TABLET",
        forbidden: ["DOKUNMATİK", "EKRAN", "TAŞINABİLİR", "OYUN", "İNTERNET"]
    },
    {
        word: "WİFİ",
        forbidden: ["İNTERNET", "BAĞLANTI", "ŞİFRE", "SİNYAL", "KABLOSUZ"]
    },
    {
        word: "BLUETOOTH",
        forbidden: ["KABLOSUZ", "BAĞLANTI", "KULAKLIK", "HOPARLÖR", "SİNYAL"]
    },
    {
        word: "SOSYAL MEDYA",
        forbidden: ["FACEBOOK", "İNSTAGRAM", "TWİTTER", "PAYLAŞIM", "TAKİPÇİ"]
    },
    
    // Ulaşım Kategorisi
    {
        word: "ARABA",
        forbidden: ["TEKER", "SÜRÜCÜ", "YOL", "HIZ", "MOTOR"]
    },
    {
        word: "UÇAK",
        forbidden: ["GÖKYÜZÜ", "PİLOT", "YOLCU", "HAVALİMANI", "KANAT"]
    },
    {
        word: "TREN",
        forbidden: ["RAY", "VAKON", "İSTASYON", "YOLCU", "LOKOMOTİF"]
    },
    {
        word: "GEMİ",
        forbidden: ["DENİZ", "KAPTAN", "YOLCU", "LİMAN", "GÜVERTE"]
    },
    {
        word: "MOTOSİKLET",
        forbidden: ["TEKER", "SÜRÜCÜ", "HELMET", "HIZ", "MOTOR"]
    },
    {
        word: "BİSİKLET",
        forbidden: ["PEDAL", "TEKER", "SÜRÜCÜ", "YOL", "FREN"]
    },
    {
        word: "HELİKOPTER",
        forbidden: ["PERVANE", "PİLOT", "GÖKYÜZÜ", "KALKMA", "İNME"]
    },
    
    // Eğitim Kategorisi
    {
        word: "KİTAP",
        forbidden: ["SAYFA", "OKUMA", "YAZAR", "KÜTÜPHANE", "HİKAYE"]
    },
    {
        word: "OKUL",
        forbidden: ["ÖĞRENCİ", "ÖĞRETMEN", "SINIF", "DERS", "EĞİTİM"]
    },
    {
        word: "ÜNİVERSİTE",
        forbidden: ["ÖĞRENCİ", "PROFESÖR", "FAKÜLTE", "DERS", "EĞİTİM"]
    },
    {
        word: "KALEM",
        forbidden: ["YAZMA", "KAĞIT", "ÇİZME", "SİLGİ", "KURŞUN"]
    },
    {
        word: "DEĞERLENDİRME",
        forbidden: ["SINAV", "NOT", "PUAN", "BAŞARI", "ÖLÇME"]
    },
    {
        word: "ÖDEV",
        forbidden: ["ÇALIŞMA", "KAĞIT", "YAZMA", "TESLİM", "NOT"]
    },
    
    // Sanat ve Eğlence Kategorisi
    {
        word: "MÜZİK",
        forbidden: ["ŞARKI", "NOTA", "ÇALMAK", "SES", "RİTİM"]
    },
    {
        word: "FİLM",
        forbidden: ["OYUNCU", "SENARYO", "KAMERA", "SİNEMA", "SAHNE"]
    },
    {
        word: "RESİM",
        forbidden: ["BOYA", "FIRÇA", "KANVAS", "ÇİZME", "SANAT"]
    },
    {
        word: "TİYATRO",
        forbidden: ["OYUNCU", "SAHNE", "PERDE", "SEYİRCİ", "GÖSTERİ"]
    },
    {
        word: "KONSER",
        forbidden: ["MÜZİK", "ŞARKI", "SAHNE", "SEYİRCİ", "HOPARLÖR"]
    },
    {
        word: "DANS",
        forbidden: ["HAREKET", "MÜZİK", "RİTİM", "KOREOGRAFİ", "ADIM"]
    },
    {
        word: "FOTOĞRAF",
        forbidden: ["KAMERA", "ÇEKME", "RESİM", "AN", "HAFIZA"]
    },
    
    // Spor Kategorisi
    {
        word: "SPOR",
        forbidden: ["OYUN", "SAHA", "TAKIM", "GALİBİYET", "ANTREMAN"]
    },
    {
        word: "FUTBOL",
        forbidden: ["TOP", "GOL", "SAHA", "TAKIM", "MAÇ"]
    },
    {
        word: "BASKETBOL",
        forbidden: ["TOP", "POT", "SAHA", "TAKIM", "MAÇ"]
    },
    {
        word: "TENİS",
        forbidden: ["RAKET", "TOP", "SAHA", "OYUN", "MAÇ"]
    },
    {
        word: "YÜZME",
        forbidden: ["HAVUZ", "SU", "STİL", "NEFES", "YARIŞ"]
    },
    {
        word: "KOŞU",
        forbidden: ["HIZ", "YOL", "NEFES", "ADIM", "YARIŞ"]
    },
    {
        word: "FİTNESS",
        forbidden: ["SPOR", "EGZERSİZ", "KAS", "ANTREMAN", "SALON"]
    },
    
    // Yemek Kategorisi
    {
        word: "YEMEK",
        forbidden: ["TAT", "PİŞİRMEK", "AÇLIK", "ÇATAL", "TABAK"]
    },
    {
        word: "PİZZA",
        forbidden: ["HAMUR", "PEYNİR", "SOS", "FIRIN", "DİLİM"]
    },
    {
        word: "HAMBURGER",
        forbidden: ["ET", "EKMEK", "SOS", "PATATES", "RESTORAN"]
    },
    {
        word: "SALATA",
        forbidden: ["SEBZE", "YEŞİL", "SAĞLIK", "ÇATAL", "TABAK"]
    },
    {
        word: "ÇORBA",
        forbidden: ["SICAK", "KAŞIK", "KASE", "SIVI", "İÇMEK"]
    },
    {
        word: "TATLI",
        forbidden: ["ŞEKER", "TAT", "ÇİKOLATA", "PASTA", "DONDURMA"]
    },
    {
        word: "KAHVE",
        forbidden: ["SICAK", "İÇMEK", "FİNCAN", "KAFEİN", "KAHVALTI"]
    },
    
    // Doğa Kategorisi
    {
        word: "DENİZ",
        forbidden: ["SU", "DALGA", "GEMİ", "BALIK", "SAHİL"]
    },
    {
        word: "ORMAN",
        forbidden: ["AĞAÇ", "YEŞİL", "DOĞA", "YOL", "HAYVAN"]
    },
    {
        word: "DAĞ",
        forbidden: ["YÜKSEK", "TEPE", "TIRMANMA", "KAR", "DOĞA"]
    },
    {
        word: "NEHİR",
        forbidden: ["SU", "AKMA", "KÖPRÜ", "BALIK", "DOĞA"]
    },
    {
        word: "GÖL",
        forbidden: ["SU", "DOĞA", "BALIK", "SAHİL", "YÜZME"]
    },
    {
        word: "ÇÖL",
        forbidden: ["KUM", "SICAK", "ÇÖL", "DEVE", "VAHA"]
    },
    {
        word: "ADALAR",
        forbidden: ["DENİZ", "ADA", "SAHİL", "TATİL", "GEMİ"]
    },
    
    // Meslek Kategorisi
    {
        word: "DOKTOR",
        forbidden: ["HASTANE", "HASTA", "İLAÇ", "MUAYENE", "SAĞLIK"]
    },
    {
        word: "ÖĞRETMEN",
        forbidden: ["OKUL", "ÖĞRENCİ", "DERS", "SINIF", "EĞİTİM"]
    },
    {
        word: "MÜHENDİS",
        forbidden: ["PROJE", "TEKNİK", "TASARIM", "İNŞAAT", "HESAP"]
    },
    {
        word: "AVUKAT",
        forbidden: ["MAHKEME", "HUKUK", "DAVA", "ADALET", "KANUN"]
    },
    {
        word: "POLİS",
        forbidden: ["GÜVENLİK", "SUÇ", "ARABA", "UNİFORMA", "SİLAH"]
    },
    {
        word: "İTFAİYECİ",
        forbidden: ["YANGIN", "SU", "ARABA", "KURTARMA", "UNİFORMA"]
    },
    {
        word: "PİLOT",
        forbidden: ["UÇAK", "GÖKYÜZÜ", "KOKPİT", "UÇUŞ", "HAVALİMANI"]
    },
    
    // Ev ve Yaşam Kategorisi
    {
        word: "EV",
        forbidden: ["ODA", "KAPI", "PENCERE", "AİLE", "YAŞAM"]
    },
    {
        word: "MUTFAK",
        forbidden: ["YEMEK", "OCAK", "BUZDOLABI", "PİŞİRMEK", "TABAK"]
    },
    {
        word: "YATAK ODASI",
        forbidden: ["YATAK", "UYUMAK", "ODA", "DİNLENME", "YASTIK"]
    },
    {
        word: "BANYO",
        forbidden: ["DUŞ", "SU", "TEMİZLİK", "HAVLU", "DİŞ"]
    },
    {
        word: "SALON",
        forbidden: ["KOLTUK", "TELEVİZYON", "OTURMA", "AİLE", "ODA"]
    },
    {
        word: "BALKON",
        forbidden: ["PENCERE", "DIŞARI", "ÇİÇEK", "HAVA", "MANZARA"]
    },
    
    // Teknoloji Detayları
    {
        word: "İNTERNET",
        forbidden: ["BAĞLANTI", "SİTE", "ARAMA", "İNDİRME", "ONLİNE"]
    },
    {
        word: "ELEKTRONİK",
        forbidden: ["CİHAZ", "TEKNOLOJİ", "ELEKTRİK", "PİL", "ŞARJ"]
    },
    {
        word: "YAZILIM",
        forbidden: ["PROGRAM", "KOD", "BİLGİSAYAR", "GELİŞTİRME", "UYGULAMA"]
    },
    {
        word: "VERİTABANI",
        forbidden: ["BİLGİ", "KAYIT", "SİSTEM", "VERİ", "TABLO"]
    },
    {
        word: "GÜVENLİK",
        forbidden: ["KORUMA", "ŞİFRE", "GÜVEN", "TEHLİKE", "SİSTEM"]
    },
    
    // Zorlu Kategoriler
    {
        word: "FELSEFE",
        forbidden: ["DÜŞÜNCE", "SORU", "MANTIK", "BİLGİ", "AKIL"]
    },
    {
        word: "PSİKOLOJİ",
        forbidden: ["AKIL", "RUH", "DÜŞÜNCE", "DAVRANIŞ", "İNSAN"]
    },
    {
        word: "EKONOMİ",
        forbidden: ["PARA", "TİCARET", "PAZAR", "ÜRETİM", "TÜKETİM"]
    },
    {
        word: "SİYASET",
        forbidden: ["PARTİ", "SEÇİM", "HÜKÜMET", "DEMOKRASİ", "LİDER"]
    },
    {
        word: "BİLİM",
        forbidden: ["ARAŞTIRMA", "DENEY", "TEORİ", "BİLGİ", "KEŞİF"]
    },
    {
        word: "TARİH",
        forbidden: ["GEÇMİŞ", "OLAY", "YIL", "SAVAŞ", "İMPARATOR"]
    },
    {
        word: "COĞRAFYA",
        forbidden: ["DÜNYA", "ÜLKE", "ŞEHİR", "HARİTA", "DOĞA"]
    },
    {
        word: "MATEMATİK",
        forbidden: ["SAYI", "HESAP", "FORMÜL", "PROBLEM", "SONUÇ"]
    },
    {
        word: "FİZİK",
        forbidden: ["ENERJİ", "HAREKET", "KUVVET", "DENEY", "KANUN"]
    },
    {
        word: "KİMYA",
        forbidden: ["MADDE", "ELEMENT", "REAKSİYON", "DENEY", "MOL"]
    },
    {
        word: "BİYOLOJİ",
        forbidden: ["CANLI", "HÜCRE", "ORGAN", "HAYAT", "TÜR"]
    },
    
    // Günlük Yaşam Zorlukları
    {
        word: "STRES",
        forbidden: ["GERGİNLİK", "KAYGI", "BASKI", "RAHATSIZLIK", "SORUN"]
    },
    {
        word: "MOTİVASYON",
        forbidden: ["İSTEK", "ENERJİ", "HEVES", "AMAÇ", "GÜÇ"]
    },
    {
        word: "KARAR",
        forbidden: ["SEÇİM", "DÜŞÜNCE", "KARARLILIK", "SONUÇ", "AKIL"]
    },
    {
        word: "SORUMLULUK",
        forbidden: ["GÖREV", "YÜKÜMLÜLÜK", "SORUN", "İŞ", "DİKKAT"]
    },
    {
        word: "YARATICILIK",
        forbidden: ["HAYAL", "FİKİR", "SANAT", "YENİLİK", "DÜŞÜNCE"]
    },
    {
        word: "LİDERLİK",
        forbidden: ["YÖNETİM", "LİDER", "TAKIM", "KARAR", "SORUMLULUK"]
    },
    {
        word: "İLETİŞİM",
        forbidden: ["KONUŞMA", "MESAJ", "BAĞLANTI", "ANLATMA", "DİNLEME"]
    },
    {
        word: "İŞBİRLİĞİ",
        forbidden: ["TAKIM", "BİRLİK", "ÇALIŞMA", "YARDIM", "ORTAKLIK"]
    },
    
    // Soyut Kavramlar
    {
        word: "SEVGİ",
        forbidden: ["DUYGU", "KALP", "AŞK", "HİSSETME", "İLİŞKİ"]
    },
    {
        word: "MUTLULUK",
        forbidden: ["SEVİNÇ", "GÜLÜMSEME", "POZİTİF", "DUYGU", "HİS"]
    },
    {
        word: "ÜZGÜNLÜK",
        forbidden: ["ACİ", "GÖZYAŞI", "NEGATİF", "DUYGU", "HİS"]
    },
    {
        word: "KORKU",
        forbidden: ["TEHLİKE", "ENDİŞE", "KAYGI", "DUYGU", "HİS"]
    },
    {
        word: "ÖFKE",
        forbidden: ["SİNİR", "KIZGINLIK", "DUYGU", "HİS", "REAKSİYON"]
    },
    {
        word: "UMUT",
        forbidden: ["BEKLENTİ", "GELECEK", "POZİTİF", "DUYGU", "HİS"]
    },
    {
        word: "GÜVEN",
        forbidden: ["İNANÇ", "GÜVENLİK", "DUYGU", "HİS", "İLİŞKİ"]
    },
    {
        word: "KIBIR",
        forbidden: ["GURUR", "KENDİNİ", "BEĞENME", "DUYGU", "HİS"]
    },
    
    // Zorlu Aktiviteler
    {
        word: "YOLCULUK",
        forbidden: ["SEYAHAT", "YOL", "GİTMEK", "ULAŞIM", "MACERA"]
    },
    {
        word: "MACERA",
        forbidden: ["KEŞİF", "YOLCULUK", "DENEYİM", "HEYECAN", "BİLİNMEYEN"]
    },
    {
        word: "KEŞİF",
        forbidden: ["BULMA", "ARAŞTIRMA", "YENİ", "MACERA", "BİLİNMEYEN"]
    },
    {
        word: "YARATMA",
        forbidden: ["YAPMA", "ÜRETME", "OLUŞTURMA", "YENİ", "FİKİR"]
    },
    {
        word: "ÖĞRENME",
        forbidden: ["BİLGİ", "EĞİTİM", "ANLAMA", "ÇALIŞMA", "GELİŞME"]
    },
    {
        word: "ÖĞRETME",
        forbidden: ["EĞİTİM", "ANLATMA", "BİLGİ", "ÖĞRENCİ", "DERS"]
    },
    {
        word: "YÖNETME",
        forbidden: ["LİDERLİK", "KONTROL", "YÖNETİM", "KARAR", "SORUMLULUK"]
    },
    {
        word: "ÇÖZME",
        forbidden: ["PROBLEM", "SORUN", "BULMA", "ANLAMA", "SONUÇ"]
    },
    
    // Karmaşık Kavramlar
    {
        word: "SİSTEM",
        forbidden: ["DÜZEN", "YAPI", "KURALLAR", "ORGANİZASYON", "BÜTÜN"]
    },
    {
        word: "PROJE",
        forbidden: ["PLAN", "ÇALIŞMA", "HEDEF", "SONUÇ", "YÖNETİM"]
    },
    {
        word: "STRATEJİ",
        forbidden: ["PLAN", "YÖNTEM", "HEDEF", "KARAR", "YAKLAŞIM"]
    },
    {
        word: "POLİTİKA",
        forbidden: ["SİYASET", "KARAR", "YÖNETİM", "HEDEF", "YAKLAŞIM"]
    },
    {
        word: "TEKNOLOJİ",
        forbidden: ["BİLİM", "İCAT", "YENİLİK", "GELİŞME", "CİHAZ"]
    },
    {
        word: "İNOVASYON",
        forbidden: ["YENİLİK", "GELİŞME", "İCAT", "FİKİR", "YARATICILIK"]
    },
    {
        word: "GELİŞİM",
        forbidden: ["BÜYÜME", "İLERLEME", "GELİŞME", "DEĞİŞİM", "İYİLEŞME"]
    },
    {
        word: "DEĞİŞİM",
        forbidden: ["FARKLILIK", "YENİ", "DÖNÜŞÜM", "GELİŞİM", "FARK"]
    },
    
    // Daha Fazla Günlük Yaşam
    {
        word: "ALIŞVERİŞ",
        forbidden: ["MARKET", "PARA", "ÜRÜN", "SEPET", "ÖDEME"]
    },
    {
        word: "BANKACILIK",
        forbidden: ["PARA", "HESAP", "KREDİ", "BANKA", "İŞLEM"]
    },
    {
        word: "SİGORTA",
        forbidden: ["GÜVENLİK", "POLİÇE", "KORUMA", "RİSK", "ÖDEME"]
    },
    {
        word: "VERGİ",
        forbidden: ["PARA", "DEVLET", "ÖDEME", "BEYAN", "HESAP"]
    },
    {
        word: "KİRA",
        forbidden: ["EV", "PARA", "ÖDEME", "KONUT", "SAHİP"]
    },
    {
        word: "FATURA",
        forbidden: ["ÖDEME", "PARA", "HESAP", "TUTAR", "TARİH"]
    },
    
    // Sağlık ve Vücut
    {
        word: "SAĞLIK",
        forbidden: ["HASTALIK", "DOKTOR", "İLAÇ", "MUAYENE", "TEDAVİ"]
    },
    {
        word: "DİYET",
        forbidden: ["KİLO", "YEMEK", "SAĞLIK", "ZAYIFLAMA", "BESLENME"]
    },
    {
        word: "SPOR SALONU",
        forbidden: ["EGZERSİZ", "KAS", "ANTREMAN", "FİTNESS", "SALON"]
    },
    {
        word: "MASAJ",
        forbidden: ["RAHATLAMA", "KAS", "TERAPİ", "DOKUNMA", "GEVŞEME"]
    },
    {
        word: "YOGA",
        forbidden: ["EGZERSİZ", "NEFES", "POZİSYON", "MEDITASYON", "ESNEME"]
    },
    {
        word: "UYKU",
        forbidden: ["YATAK", "DİNLENME", "RÜYA", "GECE", "UYUMAK"]
    },
    {
        word: "STRES",
        forbidden: ["GERGİNLİK", "KAYGI", "BASKI", "RAHATSIZLIK", "SORUN"]
    },
    
    // Hobi ve Eğlence
    {
        word: "HOBİ",
        forbidden: ["İLGİ", "ZEVK", "UĞRAŞ", "BOŞ ZAMAN", "AKTİVİTE"]
    },
    {
        word: "KOLEKSİYON",
        forbidden: ["TOPLAMA", "EŞYA", "PARÇA", "SAKLAMA", "İLGİ"]
    },
    {
        word: "PUZZLE",
        forbidden: ["PARÇA", "BİRLEŞTİRME", "OYUN", "ZORLUK", "ÇÖZME"]
    },
    {
        word: "SATRANÇ",
        forbidden: ["TAŞ", "OYUN", "HAMLE", "STRATEJİ", "ZİHİN"]
    },
    {
        word: "KELİME OYUNU",
        forbidden: ["HARF", "KELİME", "BULMA", "OYUN", "ZORLUK"]
    },
    {
        word: "BULMACA",
        forbidden: ["SORU", "CEVAP", "ZORLUK", "ÇÖZME", "AKIL"]
    },
    {
        word: "KAHVEHANE",
        forbidden: ["KAHVE", "OTURMA", "SOHBET", "OYUN", "MEKAN"]
    },
    
    // Seyahat ve Turizm
    {
        word: "TATİL",
        forbidden: ["SEYAHAT", "DİNLENME", "YOLCULUK", "OTEL", "GÜNEŞ"]
    },
    {
        word: "OTEL",
        forbidden: ["KONAKLAMA", "ODA", "TATİL", "HİZMET", "KALMA"]
    },
    {
        word: "PANSİYON",
        forbidden: ["KONAKLAMA", "ODA", "KALMA", "TATİL", "HİZMET"]
    },
    {
        word: "KAMP",
        forbidden: ["ÇADIR", "DOĞA", "KONAKLAMA", "ATEŞ", "AÇIK HAVA"]
    },
    {
        word: "TUR",
        forbidden: ["SEYAHAT", "REHBER", "GEZİ", "YOLCULUK", "GRUP"]
    },
    {
        word: "MÜZE",
        forbidden: ["TARİH", "ESER", "GEZİ", "BİLGİ", "SERGİ"]
    },
    {
        word: "TARİHİ YER",
        forbidden: ["GEÇMİŞ", "ESER", "TARİH", "GEZİ", "MİRAS"]
    },
    
    // İş ve Kariyer
    {
        word: "OFİS",
        forbidden: ["İŞ", "ÇALIŞMA", "MASA", "BİLGİSAYAR", "TOPLANTI"]
    },
    {
        word: "TOPLANTI",
        forbidden: ["GÖRÜŞME", "KONUŞMA", "KARAR", "OFİS", "İŞ"]
    },
    {
        word: "SUNUM",
        forbidden: ["ANLATMA", "SLAYT", "KONUŞMA", "TOPLANTI", "PROJE"]
    },
    {
        word: "RAPOR",
        forbidden: ["YAZMA", "BİLGİ", "KAĞIT", "İŞ", "SONUÇ"]
    },
    {
        word: "MÜLAKAT",
        forbidden: ["GÖRÜŞME", "SORU", "İŞ", "KARİYER", "SUNUM"]
    },
    {
        word: "MAAŞ",
        forbidden: ["PARA", "ÖDEME", "İŞ", "MESAI", "ÜCRET"]
    },
    {
        word: "İZİN",
        forbidden: ["TATİL", "DİNLENME", "İŞ", "MESAI", "BOŞ ZAMAN"]
    },
    
    // İletişim ve Medya
    {
        word: "TELEVİZYON",
        forbidden: ["EKRAN", "PROGRAM", "KANAL", "İZLEME", "HABER"]
    },
    {
        word: "RADYO",
        forbidden: ["SES", "MÜZİK", "PROGRAM", "YAYIN", "DİNLEME"]
    },
    {
        word: "GAZETE",
        forbidden: ["HABER", "KAĞIT", "OKUMA", "BİLGİ", "GÜNLÜK"]
    },
    {
        word: "DERGİ",
        forbidden: ["DÖNEMLİK", "KAĞIT", "KONU", "OKUMA", "BİLGİ"]
    },
    {
        word: "KİTAPÇI",
        forbidden: ["KİTAP", "SATIŞ", "MAĞAZA", "OKUMA", "YAYIN"]
    },
    {
        word: "KÜTÜPHANE",
        forbidden: ["KİTAP", "OKUMA", "ARAŞTIRMA", "SESSİZLİK", "BİLGİ"]
    },
    {
        word: "ARŞİV",
        forbidden: ["BELGE", "SAKLAMA", "GEÇMİŞ", "BİLGİ", "KAYIT"]
    },
    
    // Ev Aletleri ve Teknoloji
    {
        word: "BUZDOLABI",
        forbidden: ["SOĞUTMA", "YEMEK", "MUTFAK", "ELEKTRİK", "SAKLAMA"]
    },
    {
        word: "ÇAMAŞIR MAKİNESİ",
        forbidden: ["YIKAMA", "ÇAMAŞIR", "TEMİZLİK", "ELEKTRİK", "MAKİNE"]
    },
    {
        word: "BULAŞIK MAKİNESİ",
        forbidden: ["YIKAMA", "BULAŞIK", "TEMİZLİK", "MUTFAK", "MAKİNE"]
    },
    {
        word: "ÜTÜ",
        forbidden: ["KIRIŞIK", "ÇAMAŞIR", "ISITMA", "ELEKTRİK", "DÜZLEŞTİRME"]
    },
    {
        word: "VACUUM CLEANER",
        forbidden: ["TEMİZLİK", "TOZ", "ELEKTRİK", "EMİŞ", "MAKİNE"]
    },
    {
        word: "MİKRODALGA",
        forbidden: ["ISITMA", "YEMEK", "ELEKTRİK", "HIZLI", "FIRIN"]
    },
    {
        word: "FIRIN",
        forbidden: ["PİŞİRME", "YEMEK", "ISITMA", "MUTFAK", "SICAK"]
    },
    
    // Mobilya ve Dekorasyon
    {
        word: "KOLTUK",
        forbidden: ["OTURMA", "EV", "RAHAT", "MOBİLYA", "SALON"]
    },
    {
        word: "MASA",
        forbidden: ["ÜST", "OTURMA", "YEMEK", "ÇALIŞMA", "MOBİLYA"]
    },
    {
        word: "DOLAP",
        forbidden: ["SAKLAMA", "EŞYA", "MOBİLYA", "KAPAK", "RAFLAR"]
    },
    {
        word: "AYNA",
        forbidden: ["YANSIMA", "GÖRÜNTÜ", "DUVAR", "DEKORASYON", "BAKMA"]
    },
    {
        word: "PERDE",
        forbidden: ["PENCERE", "KAPATMA", "DEKORASYON", "KUMAŞ", "GÜNEŞ"]
    },
    {
        word: "HALI",
        forbidden: ["YER", "DÖŞEME", "DEKORASYON", "KUMAŞ", "ZEMİN"]
    },
    {
        word: "LAMBA",
        forbidden: ["IŞIK", "AYDINLATMA", "ELEKTRİK", "DEKORASYON", "AMPUL"]
    },
    
    // Giyim ve Moda
    {
        word: "ELBİSE",
        forbidden: ["GİYİM", "KADIN", "KUMAŞ", "MODA", "GÜZEL"]
    },
    {
        word: "GÖMLEK",
        forbidden: ["GİYİM", "ERKEK", "KUMAŞ", "CEKET", "RESMİ"]
    },
    {
        word: "PANTOLON",
        forbidden: ["GİYİM", "BACAK", "KUMAŞ", "CEKET", "GÜNLÜK"]
    },
    {
        word: "AYAKKABI",
        forbidden: ["AYAK", "GİYİM", "YÜRÜME", "TABAN", "MODA"]
    },
    {
        word: "ÇANTA",
        forbidden: ["TAŞIMA", "EŞYA", "GİYİM", "MODA", "KULLANIM"]
    },
    {
        word: "TAKVİM",
        forbidden: ["ZAMAN", "GÜN", "AY", "YIL", "TARİH"]
    },
    {
        word: "SAAT",
        forbidden: ["ZAMAN", "SAAT", "DİJİTAL", "KOL", "DUVAR"]
    },
    
    // Duygular ve İlişkiler
    {
        word: "ARKADAŞLIK",
        forbidden: ["İLİŞKİ", "ARKADAŞ", "SOHBET", "BİRLİK", "SEVGİ"]
    },
    {
        word: "AİLE",
        forbidden: ["EV", "BİRLİK", "SEVGİ", "İLİŞKİ", "YAKIN"]
    },
    {
        word: "EVLİLİK",
        forbidden: ["AŞK", "İLİŞKİ", "DÜĞÜN", "BİRLİK", "AİLE"]
    },
    {
        word: "ROMANTİK",
        forbidden: ["AŞK", "SEVGİ", "İLİŞKİ", "DUYGU", "GÜZEL"]
    },
    {
        word: "FLÖRT",
        forbidden: ["AŞK", "İLİŞKİ", "ROMANTİK", "TANIŞMA", "SEVGİ"]
    },
    {
        word: "AŞK",
        forbidden: ["SEVGİ", "DUYGU", "İLİŞKİ", "KALP", "ROMANTİK"]
    },
    {
        word: "KALP",
        forbidden: ["AŞK", "SEVGİ", "DUYGU", "ORGAN", "HİS"]
    },
    
    // Zorlu Soyut Kavramlar
    {
        word: "ADALET",
        forbidden: ["HUKUK", "HAK", "KANUN", "MAHKEME", "DOĞRULUK"]
    },
    {
        word: "ÖZGÜRLÜK",
        forbidden: ["BAĞIMSIZLIK", "SERBEST", "HAK", "KISITLAMA", "ÖZGÜR"]
    },
    {
        word: "DEMOKRASİ",
        forbidden: ["SEÇİM", "HALK", "YÖNETİM", "OY", "ÖZGÜRLÜK"]
    },
    {
        word: "İNSAN HAKLARI",
        forbidden: ["HAK", "ADALET", "ÖZGÜRLÜK", "KANUN", "İNSAN"]
    },
    {
        word: "EŞİTLİK",
        forbidden: ["ADALET", "HAK", "FARK", "AŞAĞI", "YUKARI"]
    },
    {
        word: "HOŞGÖRÜ",
        forbidden: ["KABUL", "ANLAYIŞ", "TOLERANS", "DÜŞÜNCE", "FARK"]
    },
    {
        word: "SABIR",
        forbidden: ["BEKLEME", "ZAMAN", "SİNİR", "KONTROL", "DİKKAT"]
    },
    
    // Bilim ve Teknoloji Detayları
    {
        word: "ROBOT",
        forbidden: ["MAKİNE", "OTOMATİK", "TEKNOLOJİ", "PROGRAM", "HAREKET"]
    },
    {
        word: "YAPAY ZEKA",
        forbidden: ["BİLGİSAYAR", "AKIL", "PROGRAM", "ÖĞRENME", "TEKNOLOJİ"]
    },
    {
        word: "SİBER GÜVENLİK",
        forbidden: ["İNTERNET", "GÜVENLİK", "HACKER", "KORUMA", "VERİ"]
    },
    {
        word: "BULUT",
        forbidden: ["İNTERNET", "VERİ", "SAKLAMA", "ONLİNE", "TEKNOLOJİ"]
    },
    {
        word: "ALGORİTMA",
        forbidden: ["PROGRAM", "MANTIK", "SIRALAMA", "BİLGİSAYAR", "KOD"]
    },
    {
        word: "KODLAMA",
        forbidden: ["PROGRAM", "YAZILIM", "BİLGİSAYAR", "KOD", "GELİŞTİRME"]
    },
    {
        word: "VERİ",
        forbidden: ["BİLGİ", "SAKLAMA", "İŞLEME", "ANALİZ", "KAYIT"]
    },
    
    // Çevre ve Sürdürülebilirlik
    {
        word: "ÇEVRE",
        forbidden: ["DOĞA", "KİRLİLİK", "TEMİZLİK", "KORUMA", "YEŞİL"]
    },
    {
        word: "GERİ DÖNÜŞÜM",
        forbidden: ["ÇEVRE", "ATIK", "TEMİZLİK", "YENİDEN", "KULLANIM"]
    },
    {
        word: "YENİLENEBİLİR ENERJİ",
        forbidden: ["GÜNEŞ", "RÜZGAR", "ÇEVRE", "ENERJİ", "TEMİZ"]
    },
    {
        word: "KÜRESEL ISINMA",
        forbidden: ["SICAKLIK", "ÇEVRE", "İKLİM", "DEĞİŞİM", "DÜNYA"]
    },
    {
        word: "ORGANİK",
        forbidden: ["DOĞAL", "ÇEVRE", "SAĞLIK", "TARIM", "KİMYASAL"]
    },
    {
        word: "SIFIR ATIK",
        forbidden: ["ÇEVRE", "ATIK", "TEMİZLİK", "GERİ DÖNÜŞÜM", "KULLANIM"]
    },
    {
        word: "YEŞİL ENERJİ",
        forbidden: ["ÇEVRE", "ENERJİ", "TEMİZ", "YENİLENEBİLİR", "DOĞAL"]
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
    
    // Mobil cihazlarda tur sonu ekranını göster
    if (window.innerWidth <= 768) {
        showRoundEndScreen();
    } else {
        // Desktop'ta direkt sonraki takıma geç
        nextTeam();
    }
}

// Sonraki takıma geç (desktop için)
function nextTeam() {
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

// Sadece space tuşu ile timer kontrolü (skor değiştirme kaldırıldı)
document.addEventListener('keydown', function(event) {
    if (event.key === ' ') {
        event.preventDefault();
        toggleTimer();
    }
});

// Mobil dokunma olayları kaldırıldı - sadece buton tıklaması ile skor değişir

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

// Tur sonu ekranını göster (mobil için)
function showRoundEndScreen() {
    const roundEndScreen = document.getElementById('roundEndScreen');
    const roundEndScores = document.getElementById('roundEndScores');
    
    if (!roundEndScreen || !roundEndScores) return;
    
    // Skorları temizle
    roundEndScores.innerHTML = '';
    
    // Her takımın skorunu ekle
    gameState.teams.forEach((team, index) => {
        const scoreElement = document.createElement('div');
        scoreElement.className = `round-end-score team-${getTeamColor(index)}`;
        scoreElement.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 0.3rem;">${team.name}</div>
            <div style="font-size: 1.5rem; font-weight: 800;">${team.score}</div>
        `;
        roundEndScores.appendChild(scoreElement);
    });
    
    // Ekranı göster
    roundEndScreen.style.display = 'flex';
}

// Tur sonu ekranını gizle
function hideRoundEndScreen() {
    const roundEndScreen = document.getElementById('roundEndScreen');
    if (roundEndScreen) {
        roundEndScreen.style.display = 'none';
    }
}

// Takım rengini al
function getTeamColor(index) {
    const colors = ['blue', 'red', 'purple', 'green'];
    return colors[index] || 'blue';
}
// Diğer takıma başla
function startNextTeam() {
    // Tur sonu ekranını gizle
    hideRoundEndScreen();
    
    // Sonraki takıma geç
    gameState.currentTeamIndex = (gameState.currentTeamIndex + 1) % gameState.teams.length;
    
    // Eğer tüm takımlar oynadıysa, yeni tura geç
    if (gameState.currentTeamIndex === 0) {
        gameState.currentRound++;
    }
    
    // Pass sayısını sıfırla
    gameState.passCount = gameState.maxPassCount;
    
    // Süreyi sıfırla
    gameState.timeLeft = gameState.roundTime;
    
    // Skor panelini güncelle
    updateScorePanel();
    
    // Pass sayısını güncelle
    updatePassCount();
    
    // Yeni kelimeyi göster
    showNextWord();
    
    // Arka plan rengini güncelle
    updateBackgroundColor();
    
    // Timer'ı durdur
    stopTimer();
    
    // Oyun durumunu kaydet
    saveGameState();
}

