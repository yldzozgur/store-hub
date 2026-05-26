# Store-Hub — React Öğrenme Rehberi

Bu repo küçük bir React + Vite + Bootstrap projesidir. Hedef: ekran görüntüsündeki **Receipt & Label Design** sayfasını adım adım inşa ederken React'in temel kavramlarını öğrenmek.

---

## 1. Dosyaları İnceleme Sırası (Önce Bu Sıraya Göre Oku)

Yukarıdan aşağı sırayla aç, kafanda akışı kur. Her dosyaya satır satır yorum eklendi — okurken yorumları takip et.

| Sıra | Dosya | Neden Önce Bu? | Odaklanılacak Kavram |
|------|-------|----------------|----------------------|
| 1 | `index.html` | Tarayıcının ilk açtığı dosya. `<div id="root">` React'in bağlandığı noktadır. | HTML giriş noktası |
| 2 | `src/main.jsx` | React uygulamasını `root` div'ine bağlar. | `createRoot`, `StrictMode` |
| 3 | `src/App.jsx` | Tüm uygulamanın kökü. Layout + sayfa burada birleşir. | Bileşen kompozisyonu, `children` |
| 4 | `src/App.css` | Global reset + font. | CSS basics |
| 5 | `src/layouts/DashboardLayout.jsx` | Sol sidebar + sağ içerik iskeleti. Tüm sayfalar bunun içine girer. | `props.children`, Bootstrap grid (`Container/Row/Col`) |
| 6 | `src/components/topbar/Topbar.jsx` | Üst bar; `title` prop'unu dışarıdan alır. | Props, koşulsuz JSX |
| 7 | `src/components/sidebar/Sidebar.jsx` | Sol menü; state ile aktif maddeyi tutar, dizi map'leyerek menüyü üretir. | `useState`, `map`, koşullu className, asset import |
| 8 | `src/components/sidebar/Sidebar.css` | Sidebar görsel stilleri (hover, active, ikon rengi). | CSS selector'lar, `!important`, CSS filter |
| 9 | `src/pages/ReceiptLabelDesign.jsx` | Aktif sayfa — **bizim büyüteceğimiz yer burası**. | Sayfa kompozisyonu |
| 10 | `src/components/common/EmptyState.jsx` | Şu an boş placeholder; tasarımdaki büyük "Start Designing" kartı buraya işlenecek. | Yeniden kullanılabilir bileşen yazımı |

### Geri Dönüş (İkinci Tur)
İlk turdan sonra şu sıraya göre **tekrar geri dön ve değiştirmeye başla**:

1. `EmptyState.jsx` → tasarımdaki "Start Designing Receipt or Label" kartını yaz.
2. `ReceiptLabelDesign.jsx` → üstteki 4 bildirim şeridini (yeşil/sarı/mavi/kırmızı) ekle.
3. `Sidebar.jsx` → "International Food / Cedar Park" mağaza bilgisini güncelle.
4. `Topbar.jsx` → "Hasan Asad Mahdavi / Store Manager" kullanıcı bilgisini güncelle, zil yerine refresh ikonu koy.

---

## 2. Tasarımı Parçalara Ayırma (Ekran Görüntüsündeki Sayfa)

Görseli **küçük React bileşenlerine** bölüyoruz. Her birini ayrı dosya olarak ele alacağız:

```
ReceiptLabelDesign (sayfa)
│
├── NotificationStrip (üstteki bildirim şeritleri konteyneri)
│   └── NotificationCard  (tekrar eden kart — 4 adet, prop'larla farklılaşıyor)
│       props: { type: 'success'|'warning'|'info'|'danger', title, subtitle, onClose }
│
└── EmptyState (orta alandaki büyük kart)
    ├── IconCircle      (yuvarlak printer ikonu)
    ├── Title           ("Start Designing Receipt or Label")
    ├── Subtitle        ("Let's Start Designing Your Receipt or Label")
    └── PrimaryButton   ("+ Add Your First Template")
```

---

## 3. Adım Adım Yol Haritası (Bu Sırayla İlerleyeceğiz)

### Adım 1 — `EmptyState`'i tasarıma uydur
**Öğrenecekler:** JSX yapısı, Bootstrap utility class'ları, inline style vs className, react-icons kullanımı.

- `EmptyState.jsx` içine yuvarlak ikon + başlık + alt başlık + buton yerleştir.
- `react-icons/lu`'dan `LuPrinter` ikonu kullan.
- Buton için Bootstrap `Button variant="success"` veya custom renk.

### Adım 2 — `NotificationCard` bileşeni oluştur
**Öğrenecekler:** Props, koşullu render, yeniden kullanılabilir bileşen tasarımı.

- `src/components/common/NotificationCard.jsx` oluştur.
- `type` prop'una göre renk (`success`, `warning`, `info`, `danger`) değişsin.
- `onClose` callback prop'u ile X butonu çalışsın.

### Adım 3 — Bildirimleri state'te tut
**Öğrenecekler:** `useState` ile dizi yönetimi, `filter` ile öğe silme, `key` prop'unun önemi.

- `ReceiptLabelDesign.jsx` içinde `const [notifications, setNotifications] = useState([...])`.
- `map` ile NotificationCard'ları bas.
- X'e tıklayınca `setNotifications(prev => prev.filter(n => n.id !== id))`.

### Adım 4 — Sidebar verisini güncelle ve "active" durumunu Receipt'e taşı
**Öğrenecekler:** Başlangıç state'inin nereden geldiği, prop drilling vs lifting state.

- `useState("dashboard")` yerine `useState("receipt-label")` yap → tasarımdaki gibi Receipt seçili gelsin.

### Adım 5 — Topbar'daki kullanıcı + refresh ikonu
**Öğrenecekler:** Bileşeni props ile esnetmek.

- `Topbar`'a `user` ve `onRefresh` prop'ları ekle.
- Zil yerine `LuRefreshCw` ikonu.

### Adım 6 — Responsive davranışlar
**Öğrenecekler:** Bootstrap breakpoint'leri (`d-none d-md-block` vs).

- Mobilde sidebar gizlensin, hamburger menü ile açılsın (ileri seviye — opsiyonel).

---

## 4. Sıkça Karşılaşacağın React Kavramları (Kısa Sözlük)

| Kavram | Ne İşe Yarar | Bu Projede Nerede? |
|--------|--------------|---------------------|
| `Component` | Yeniden kullanılabilir UI parçası (fonksiyon) | Sidebar, Topbar, EmptyState |
| `JSX` | JS içinde HTML yazma sözdizimi | Tüm `.jsx` dosyaları |
| `props` | Bileşene dışarıdan veri verme | `Topbar title=...`, `EmptyState`'e gelecek props |
| `children` | Bileşenin içine sarılan JSX | `DashboardLayout` içindeki `{children}` |
| `useState` | Değişen veriyi hatırlatma | `Sidebar`'daki `activeLink` |
| `map` | Diziden JSX listesi üretme | `menuSections.map(...)` |
| `key` | React'in liste optimizasyonu için unique tanımlayıcı | `key={item.id}` |
| Olay handler'ı | Tıklama/değişim cevabı | `onClick={() => setActiveLink(item.id)}` |
| `import` | Başka dosyadan bileşen/asset alma | Her dosyanın tepesi |
| `export default` | Bileşeni dışa açma | Her bileşenin sonu |

---

## 5. Komutlar (Hızlı Referans)

```bash
npm run dev      # Geliştirme sunucusunu başlatır (genelde http://localhost:5173)
npm run build    # Üretim build'i alır → dist/ klasörü
npm run lint     # ESLint ile kod denetimi
npm run preview  # Build'i lokalde serve eder
```

---

## 6. Sıradaki Hareket

1. Önce yukarıdaki **1. tablodaki sırayla** dosyaları aç, yorumları oku. Bu ~30 dakika sürer.
2. Sonra bana **"Adım 1'e başlayalım"** de — birlikte `EmptyState.jsx`'i tasarıma uyduracağız.
3. Her adımda ben sana bir parça açıklayacağım, sen yazacaksın; takıldığın yerde duracağız.

Hedef: bir hafta sonunda bu sayfayı sıfırdan kendin yazabiliyor olmak.
