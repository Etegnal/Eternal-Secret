# Netlify Forms Kurulum Rehberi

## 1. GitHub Repository Hazırlama
1. Tüm dosyaları GitHub'a yükleyin
2. Repository'yi public yapın

## 2. Netlify'da Site Oluşturma
1. [Netlify.com](https://netlify.com) adresine gidin
2. "Sign up" ile hesap oluşturun (GitHub ile giriş yapabilirsiniz)
3. "New site from Git" butonuna tıklayın
4. GitHub'ı seçin ve repository'nizi seçin
5. "Deploy site" butonuna tıklayın

## 3. Form Ayarları
1. Netlify dashboard'da sitenize gidin
2. "Forms" sekmesine tıklayın
3. "contact" formunu göreceksiniz (otomatik oluşur)
4. "Settings" butonuna tıklayın

## 4. E-posta Bildirimleri
1. "Form notifications" bölümünde "Add notification" tıklayın
2. "Email notification" seçin
3. E-posta adresinizi girin: `erenaoyunda@gmail.com`
4. "Save" butonuna tıklayın

## 5. Spam Koruması
1. "Spam filtering" bölümünde "Enable spam filtering" aktif olmalı
2. Honeypot field otomatik olarak eklenmiş durumda

## 6. Test Etme
1. Sitenizi ziyaret edin
2. Contact formunu doldurun ve gönderin
3. E-posta adresinize bildirim gelip gelmediğini kontrol edin
4. Netlify dashboard'da "Forms" sekmesinde gönderilen mesajları görün

## 7. Localhost Test
- Localhost'ta form gönderimi çalışmaz
- Sadece validasyon ve test mesajları görünür
- Gerçek e-posta gönderimi için Netlify'a deploy gerekli

## Önemli Notlar
- **Ücretsiz**: Netlify Forms ücretsizdir
- **Otomatik**: Form otomatik olarak algılanır
- **Spam Koruması**: Honeypot field ile spam koruması
- **E-posta Bildirimleri**: Anında e-posta bildirimleri
- **Dashboard**: Tüm mesajları dashboard'da görme

## Avantajları
- ✅ **GitHub Pages uyumlu**
- ✅ **Tamamen ücretsiz**
- ✅ **Otomatik kurulum**
- ✅ **Spam koruması**
- ✅ **E-posta bildirimleri**
- ✅ **Dashboard yönetimi**
- ✅ **CSV export**

## Form Alanları
- **fullName**: Ad Soyad
- **email**: E-posta adresi
- **wordCard**: Kelime kartı
- **message**: Ek mesaj (opsiyonel)

## Sorun Giderme
- **Form görünmüyor**: `data-netlify="true"` attribute'unu kontrol edin
- **E-posta gelmiyor**: Netlify dashboard'da e-posta ayarlarını kontrol edin
- **Spam filtresi**: Honeypot field'ın gizli olduğundan emin olun

## Örnek E-posta İçeriği
```
Yeni bir form gönderimi alındı!

Ad Soyad: [fullName]
E-posta: [email]
Kelime Kartı: [wordCard]
Mesaj: [message]

---
Bu mesaj Netlify Forms tarafından gönderilmiştir.
```
