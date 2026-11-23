# formullab

YKS (TYT ve AYT) kimya sınavlarına hazırlanan öğrenciler için geliştirilmiş etkileşimli bileşik formülü çalışma, iyon çaprazlama ve test platformu.

## Özellikler

- **Özelleştirilebilir Test Modu:** Kaynak (`Tüm Havuz`, `Favori`, `Yanlışlarım`, `Kritik`), sınav kapsamı (`TYT`, `AYT`), soru tipi (`Karma`, `Formül → Ad`, `Ad → Formül`), soru sayısı (`10 / 15 / 20`) ve konu filtreleriyle çalışma.
- **81 Bileşiklik YKS Sözlüğü:** Türkçe karakter ve alt indis destekli anlık arama, `TYT / AYT / ÖSYM Kritik` etiketleri, bağ türü ve sınav notu detayları.
- **İyon / Kök Çaprazlama Laboratuvarı:** Katyon ve anyon/kök seçerek çaprazlama sonucunu canlı inceleme ve çoktan seçmeli pratik modu.
- **YKS Kimya Adlandırma Rehberi:** İyonik bileşikler (Stock sistemi), kovalent bileşikler (Latince önekler), yaygın adlar ve organik fonksiyonel gruplar için açılır/kapanır hızlı kartlar.
- **Odak Fonu & PWA Desteği:** Döngüde çalabilen çalışma müziği, tıklama sesleri ve çevrimdışı çalışabilen kurulabilir PWA yapısı.

## Kurulum ve Çalıştırma

```bash
npm install
npm run dev
```

Üretim derlemesi için:

```bash
npm run build
```

## Ortam Değişkenleri

Google AdSense reklamlarını etkinleştirmek için `.env.example` dosyasındaki değişkenleri kullanabilirsiniz:

- `VITE_ADSENSE_CLIENT_ID`
- `VITE_ADSENSE_BANNER_SLOT`
- `VITE_ADSENSE_DAILY_SLOT`
