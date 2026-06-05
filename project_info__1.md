# 🎯 AddTemplate.jsx — Adım Adım Geliştirme Rehberi

Projeyi detaylıca inceledim. Şu an `AddTemplate.jsx` dosyasındasın. Hemen öğretmen modunda başlayalım — **ben anlatacağım, sen kodlayacaksın.**

---

## 📋 Mevcut Durum (Neler Çalışıyor, Neler Çalışmıyor)

✅ **Çalışanlar:**
- Receipts / Labels sekmeleri
- Paper Size dropdown'ı
- Text butonu → yeni element ekliyor
- Divider butonu → kesik çizgi ekliyor
- Önizlemede tıklama → mavi çerçeve (seçim)

❌ **Bug:** Content input'u değiştirince önizleme güncellenmiyor!

---

## 🐛 ADIM 0 — Bug Fix (ZORUNLU, 2 dakika)

### Öğretmen Açıklaması:

Şu anki kodunda `updateSelectedElement` diye bir fonksiyonun var. Bu fonksiyon **doğru yazılmış**:

```jsx
function updateSelectedElement(newContent) {
  setElements((prev) =>
    prev.map((el) =>
      el.id === selectedId ? { ...el, content: newContent } : el,
    ),
  );
}
```

**Peki neden çalışmıyor?** React'ta state güncellemeleri bazen `useState`'in closure (kapsam) sorunu yüzünden gecikebilir. Ama senin kodunda bu sorun yok gibi.

**Asıl kontrol etmen gereken:** Input elementinin bağlantısı.

### Yapman Gereken:

1. `AddTemplate.jsx` dosyasını aç, **satır 214-219** arasını bul:

```jsx
<Form.Control
  size="sm"
  type="text"
  value={selectedElement?.content ?? ""}
  onChange={(e) => updateSelectedElement(e.target.value)}
  disabled={!selectedElement}
  ...
/>
```

2. Bu kodu **şöyle değiştir** (console.log ekleyerek test edelim):

```jsx
<Form.Control
  size="sm"
  type="text"
  value={selectedElement?.content ?? ""}
  onChange={(e) => {
    console.log("Yeni değer:", e.target.value);
    console.log("Seçili ID:", selectedId);
    updateSelectedElement(e.target.value);
  }}
  disabled={!selectedElement}
  ...
/>
```

3. **Kaydet** ve tarayıcıya git (`npm run dev` çalışıyor olmalı).

4. Bir Text elementi ekle, ona tıkla (seç), sonra Content input'una bir şey yaz.

5. **F12** Console'u aç. Ne görüyorsun?

6. Console'da `Yeni değer: ...` ve `Seçili ID: ...` yazılarını görüyor musun?

---

### Bana Geri Bildirim Ver:

- Console'da hata var mı?
- `Yeni değer` yazdığında değer değişiyor mu?
- `Seçili ID` doğru mu (seçtiğin elementin ID'si ile aynı mı)?

**Bunları bana söyle, sonraki adıma geçelim!** Eğer `Seçili ID` `null` görünüyorsa sorun `setSelectedId` ile ilgili demektir. Eğer değerler doğru ama önizleme güncellenmiyorsa başka bir yere bakarız.

---

Hazırsan test et ve bana sonucu söyle! 🚀