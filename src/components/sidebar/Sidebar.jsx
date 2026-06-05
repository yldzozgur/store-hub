import "./Sidebar.css";
import { Nav, Image, Button, Modal, Form, Dropdown } from "react-bootstrap";
import { useState } from "react";
import React from "react";
import Toast from "react-bootstrap/Toast";

// Asset imports (logo + ikonlar)
import dashboardIcon from "../../assets/dashboardIcon.svg";

// ─────────────────────────────────────────
// Menü verisi: bileşenin dışında tanımlandı
// çünkü hiç değişmiyor, sabit veri.
// Her section'ın bir title'ı ve items dizisi var.
// Her item'ın: id, label ve icon'u var.
// ─────────────────────────────────────────
const menuSections = [
  {
    title: "OVERVIEW",
    items: [
      {
        id: "dashboard",
        label: "Dashboard",
        icon: dashboardIcon,
      },
    ],
  },
];

// ─────────────────────────────────────────
// Sidebar bileşeni
// activePage   → şu an hangi sayfa açık (App.jsx'ten geliyor)
// setActivePage → tıklanınca aktif sayfayı değiştiren fonksiyon (App.jsx'ten geliyor)
// ─────────────────────────────────────────
const Sidebar = ({ activePage, setActivePage }) => {
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportMethod, setSupportMethod] = useState("email");
  const [supportContact, setSupportContact] = useState("");
  const [supportMessage, setSupportMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const stores = [
    { initials: "IF", name: "International Food", location: "Cedar Park" },
    { initials: "GS", name: "Grocery Store", location: "Austin" },
    { initials: "BS", name: "Bakery Shop", location: "Round Rock" },
  ];
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [storeDropdownOpen, setStoreDropdownOpen] = useState(false);

  const handleSupportSubmit = () => {
    // Hataları temizle
    const errors = { email: false, phone: false, message: false };

    // Email/Telefon kontrolü
    if (supportMethod === "email" && !isValidEmail(supportContact)) {
      errors.email = true;
    }

    if (supportMethod === "phone" && !isValidPhone(supportContact)) {
      errors.phone = true;
    }

    // Mesaj boş mu?
    if (!supportMessage || supportMessage.trim() === "") {
      errors.message = true;
    }

    // Hata varsa göster ve çık
    if (errors.email || errors.phone || errors.message) {
      setFormErrors(errors);
      alert("Please fill out all fields correctly before submitting.");
      return;
    }

    // Hata yoksa gönder
    setShowToast(true);
    setShowSupportModal(false);
    setSupportMethod("email");
    setSupportContact("");
    setSupportMessage("");
    setFormErrors({ email: false, phone: false, message: false });
  };
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const isValidPhone = (phone) => {
    const phoneRegex = /^(\+1|0)\d{10}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };
  const [formErrors, setFormErrors] = useState({
    email: false,
    phone: false,
    message: false,
  });
  const validateContact = () => {
    if (supportMethod === "email") {
      setFormErrors((prev) => ({
        ...prev,
        email: !isValidEmail(supportContact),
        phone: false,
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        phone: !isValidPhone(supportContact),
        email: false,
      }));
    }
  };
  const validateMessage = () => {
    setFormErrors((prev) => ({
      ...prev,
      message: !supportMessage.trim(),
    }));
  };
  return (
    // pt-3       → üstten padding
    // minHeight  → sidebar her zaman ekran yüksekliği kadar uzasın
    <div
      className="pt-3 sidebar-container"
      style={{
        backgroundColor: "#f8f9fa",
        position: "relative",
        height: "100vh",
      }}
    >
      <div className="px-3 mb-4 d-flex flex-column" style={{ height: "100%" }}>
        {/* ── LOGO ── */}
        {/* fluid → görseli responsive yap, maxWidth → çok büyük olmasın */}
        <h2
          className="mb-4 text-center"
          style={{ fontSize: 22, color: "#333", whiteSpace: "nowrap" }}
        >
          Receipt Studio
        </h2>
        {/* ────────────────────────────────────────────────────────────────────────── */}
        {/* DROPDOWN: Mağaza Seçici */}
        {/* ────────────────────────────────────────────────────────────────────────── */}

        {/* 
  Dropdown: React-Bootstrap bileşeni
  - Açılır menüleri yönetir (açık/kapalı state)
  - show={storeDropdownOpen}: dropdown açık mı kontrol et
  - onToggle: kullanıcı tıkladığında state'i güncelle
  - className="mx-2 mb-3": soldan/sağdan 2px, alttan 3px margin (sidebar içinde hizalar)
*/}
        <Dropdown
          className="mx-2 mb-3 store-dropdown-wrapper"
          show={storeDropdownOpen}
          onToggle={(isOpen) => setStoreDropdownOpen(isOpen)}
        >
          {/* 
    Dropdown.Toggle: tıklanınca dropdown menüyü açan "başlık" kısmı
    - as="div": varsayılan <button> yerine <div> kullan (özel tasarım için)
    - className="store-dropdown-toggle": CSS'den stil al
    - border rounded p-2: Bootstrap - çerçeve, yuvarlak köşe, iç boşluk
    - d-flex align-items-center justify-content-between gap-2:
      * d-flex: esnek kutu (flex container)
      * align-items-center: dikey merkezle (avatar + metni ortala)
      * justify-content-between: solda avatar+metin, sağda ok ikonu
      * gap-2: aralarına 2 birim boşluk
    - style={{ cursor: "pointer" }}: fare tıklanabilir imleç göster
  */}
          <Dropdown.Toggle
            as="div"
            className="store-dropdown-toggle border rounded p-2 d-flex align-items-center justify-content-between gap-2"
            style={{ cursor: "pointer" }}
          >
            {/* Sol taraf: avatar daire + mağaza adı ve lokasyon */}
            {/* d-flex: yan yana hizala (avatar sol, metni sağ) */}
            {/* gap-2: aralarına 2 birim boşluk */}
            <div className="d-flex align-items-center gap-2">
              {/* 
        Avatar: mağazanın kısaltması (IF, GS, BS)
        - rounded-circle: tam yuvarlak şekil (width=height ve border-radius=50%)
        - bg-secondary-subtle: Bootstrap'in açık gri arka planı
        - fw-bold: kalın yazı (harfleri daha prominent yap)
        - d-flex + align-items-center + justify-content-center:
          * metin tam merkeze yerleştir (yatay ve dikey)
        - width/height 36px: avatar boyutu
        - fontSize 13: yazı boyutu
      */}
              <div
                className="store-initials d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle fw-bold"
                style={{ width: 36, height: 36, fontSize: 13 }}
              >
                {/* Seçili mağazanın kısaltmasını göster (örn: "IF" International Food için) */}
                {selectedStore.initials}
              </div>

              {/* Sağ taraf: mağaza adı + lokasyon */}
              <div>
                {/* 
          Mağaza adı
          - strong: kalın yazı (başlık gibi) 
          - d-block: kendi satırını al (alt alta dizilme için)
          - fontSize 14: biraz büyük başlık boyu
        */}
                <strong className="d-block" style={{ fontSize: 14 }}>
                  {selectedStore.name}
                </strong>

                {/* 
          Lokasyon: koşullu göster
          - {selectedStore.location && ...}: eğer lokasyon varsa göster
          - text-muted: Bootstrap'in gri rengi ("secondary info" hissini verir)
          - fontSize 12: küçük, "yan bilgi" boyutu
        */}
                {selectedStore.location && (
                  <small className="text-muted" style={{ fontSize: 12 }}>
                    Location: {selectedStore.location}
                  </small>
                )}
              </div>
            </div>

            {/* 
      Sağ taraf: Ok ikonu (chevron)
      - dropdown açıksa aşağı bakması için CSS'de transform eklenebilir
      - width="14" height="14": küçük boyut (toggle'ın sağında hoş görünmesi için)
    */}
          </Dropdown.Toggle>

          {/* 
    Dropdown.Menu: tıklanınca açılan liste
    - p-0: padding'i sıfırla (tüm boşluklar CSS'ten gelecek = kontroll sahibi)
    - className="store-dropdown-menu": CSS stilini uygula
  */}
          <Dropdown.Menu className="p-0 store-dropdown-menu">
            {/* 
      Header: "All Stores" başlığı
      - Koyu arka plan ve beyaz yazı: "başlık bölümü" görseli
      - className="store-dropdown-header": CSS'den stil al
    */}
            <Dropdown.Header className="store-dropdown-header">
              All Stores
            </Dropdown.Header>

            {/* 
      Mağaza listesi
      - stores.slice(1): ilk mağazayı (zaten seçili olan) atla, kalanını listele
      - .map((store) => ...): dizideki her mağaza için bir öğe yap
      - key={store.id}: React'e unique ID ver (verimli güncellemeler için)
    */}
            {stores.map((store) => (
              <>
                {/* 
          Her mağaza seçeneği
          - Dropdown.Item: React-Bootstrap'in liste öğesi
          - className="store-dropdown-item": CSS'den hover/padding stili al
          - onClick: tıklandığında:
            * setSelectedStore(store): bu mağazayı seçili yap
            * setStoreDropdownOpen(false): dropdown'ı kapat (seçim yapıldı)
          - key={store.id}: React'e unique kimlik
        */}
                <Dropdown.Item
                  key={store.id}
                  className="store-dropdown-item"
                  onClick={() => {
                    setSelectedStore(store);
                    setStoreDropdownOpen(false);
                  }}
                >
                  {/* Avatar + mağaza adı/lokasyon: aynı yapı Dropdown.Toggle'daki gibi */}
                  <div className="d-flex align-items-center gap-2">
                    <div
                      className="d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle fw-bold"
                      style={{ width: 36, height: 36, fontSize: 13 }}
                    >
                      {store.initials}
                    </div>
                    <div>
                      <strong className="d-block">{store.name}</strong>
                      {store.location && (
                        <small className="text-muted">{store.location}</small>
                      )}
                    </div>
                  </div>
                </Dropdown.Item>
              </>
            ))}

            {/* 
      Divider: çizgi
      - Mağaza listesi ile "Add Store" butonunu ayırır
      - Dropdown.Divider: Bootstrap'in divider bileşeni
    */}
            <Dropdown.Divider />

            {/* 
      "Add Store" butonu
      - Yeşil renk + "+" ikonu: pozitif aksiyon (ekleme/expansion hissini verir)
      - className="add-store-item": CSS'den özel stil al
      - onClick: TODO - yeni mağaza ekleme modalı açmak için yapılacak
    */}
            <Dropdown.Item
              className="d-flex align-items-center gap-2 add-store-item"
              onClick={() => {}}
            >
              {/* 
        Yeşil yazı
        - color: "#198754": Bootstrap'in yeşil rengi (success color)
        - fontWeight: 600: kalın (dikkat çek)
      */}
              <span style={{ color: "#198754", fontWeight: 600 }}>
                + Add Store
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {/* ── MENÜ LİSTESİ ── */}
        {/* flex-column → Nav maddeleri yan yana değil alt alta dizilsin */}
        <Nav className="flex-column px-2">
          {/* menuSections dizisini döngüye alıyoruz */}
          {/* Her section için önce başlık, sonra o section'ın item'larını basıyoruz */}
          {menuSections.map((section) => (
            // key → React'in listeyi verimli güncellemesi için zorunlu, unique olmalı
            <div key={section.title}>
              {/* Grup başlığı: OVERVIEW, STORE MANAGEMENT, SETTINGS */}
              {/* text-uppercase → büyük harf, text-muted → gri, sidebar-section-title → CSS'ten */}
              <span className="text-uppercase text-muted fw-semibold sidebar-section-title">
                {section.title}
              </span>

              {/* O grubun item'larını döngüye alıyoruz */}
              {section.items.map((item) => (
                <Nav.Link
                  key={item.id}
                  href={`#${item.id}`}
                  // Tıklanınca App.jsx'teki activePage state'ini güncelle
                  onClick={() => setActivePage(item.id)}
                  // activePage bu item'ın id'sine eşitse "active" class'ı ekle
                  // "active" class'ı Sidebar.css'te koyu arka plan + kırmızı alt çizgi veriyor
                  className={`d-flex align-items-center gap-2 sidebar-link ${
                    activePage === item.id ? "active" : ""
                  }`}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                  />
                  {item.label}
                </Nav.Link>
              ))}
            </div>
          ))}
        </Nav>

        {/* ── YARDIM KARTI ── */}
        {/* bg-secondary-subtle → açık gri arka plan, mt-4 → üstten boşluk */}
        <div className="bg-secondary-subtle p-3 mb-4 mt-auto rounded ">
          <h6>Need Help?</h6>
          <p className="small">Feel free to connect</p>
          {/* w-100 → buton sütunun tam genişliğini kaplasın */}
          <Button
            variant="dark"
            className="w-100"
            onClick={() => setShowSupportModal(true)}
          >
            Get Support
          </Button>

          {/* Destek modalı */}
          <Modal
            show={showSupportModal}
            onHide={() => setShowSupportModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Contact Support</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Contact method</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Email"
                    type="radio"
                    name="supportMethod"
                    id="support-email"
                    checked={supportMethod === "email"}
                    onChange={() => setSupportMethod("email")}
                  />
                  <Form.Check
                    inline
                    label="Phone"
                    type="radio"
                    name="supportMethod"
                    id="support-phone"
                    checked={supportMethod === "phone"}
                    onChange={() => setSupportMethod("phone")}
                  />
                </div>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  {supportMethod === "email" ? "Email address" : "Phone number"}
                </Form.Label>
                <Form.Control
                  type={supportMethod === "email" ? "email" : "tel"}
                  placeholder={
                    supportMethod === "email"
                      ? "Enter your email"
                      : "Enter your phone number"
                  }
                  value={supportContact}
                  onChange={(e) => setSupportContact(e.target.value)}
                  onBlur={() => validateContact()}
                  style={{
                    borderColor:
                      (supportMethod === "email" && formErrors.email) ||
                      (supportMethod === "phone" && formErrors.phone)
                        ? "red"
                        : "",
                    borderWidth:
                      (supportMethod === "email" && formErrors.email) ||
                      (supportMethod === "phone" && formErrors.phone)
                        ? "2px"
                        : "1px",
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message *</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here..."
                  onBlur={() => validateMessage()}
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowSupportModal(false)}
              >
                Close
              </Button>
              <Button variant="dark" onClick={handleSupportSubmit}>
                Send Message
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Bildirim Alert */}
          <Toast
            onClose={() => setShowToast(false)}
            show={showToast}
            delay={3000}
            autohide
            className="fw-bold text-white border "
            style={{
              borderRadius: 15,
              position: "fixed",
              backgroundColor: "purple",
              zIndex: 9999,
              bottom: 20,
              right: 20,
              minWidth: "250px",
            }}
          >
            <Toast.Header className="justify-content-center w-100">
              <strong className="fw-bold mx-auto">Support Request Sent</strong>
            </Toast.Header>
            <Toast.Body>
              Your support request has been submitted successfully!
            </Toast.Body>
          </Toast>
          {/* Bildirim Alert */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
