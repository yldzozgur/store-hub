import "./Sidebar.css";
import { Nav, Image, Button, Modal, Form } from "react-bootstrap";
import { useState } from "react";

// Asset imports (logo + ikonlar)
import logo from "../../assets/logo1.png";
import dashboardIcon from "../../assets/dashboardIcon.svg";
import chevron from "../../assets/chevron.svg";

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

  const handleSupportSubmit = () => {
    // Burada destek talebini işleyebiliriz (örneğin, API'ye göndermek)
    alert(
      "Support request sent!\\nMethod: " +
        supportMethod +
        "\\nContact: " +
        supportContact +
        "\\nMessage: " +
        supportMessage,
    );
    setShowSupportModal(false);
    setSupportMethod("email");
    setSupportContact("");
    setSupportMessage("");
  };
  return (
    // pt-3       → üstten padding
    // minHeight  → sidebar her zaman ekran yüksekliği kadar uzasın
    <div
      className="pt-3"
      style={{ backgroundColor: "#f8f9fa", height: "100vh" }}
    >
      <div className="px-3 mb-4 d-flex flex-column" style={{ height: "100%" }}>
        {/* ── LOGO ── */}
        {/* fluid → görseli responsive yap, maxWidth → çok büyük olmasın */}
        <h2
          className="mb-4 text-center"
          style={{ fontSize: 36, color: "#333" }}
        >
          Receipt Studio
        </h2>

        {/* ── MAĞAZA SEÇİCİ KUTU ── */}
        {/* border → çerçeve, rounded → köşe yuvarlat */}
        {/* d-flex justify-content-between → sol ve sağ içerikleri iki uca dağıt */}
        <div className="border rounded p-2 mx-2 mb-3 d-flex align-items-center justify-content-between gap-2">
          {/* Sol taraf: avatar + isim + lokasyon */}
          <div className="d-flex align-items-center gap-2">
            {/* Yuvarlak avatar: mağazanın baş harfleri */}
            {/* rounded-circle → tam yuvarlak, bg-secondary-subtle → açık gri arka plan */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle fw-bold"
              style={{ width: 36, height: 36, fontSize: 13 }}
            >
              IF
            </div>

            <div>
              {/* d-block → strong kendi satırını alsın */}
              <strong className="d-block" style={{ fontSize: 14 }}>
                International Food
              </strong>
              {/* text-muted → silik gri renk */}
              <small className="text-muted" style={{ fontSize: 12 }}>
                Location: Cedar Park
              </small>
            </div>
          </div>

          {/* Sağ taraf: açılır menü oku */}
          <Image src={chevron} alt="chevron" width={14} height={14} />
        </div>

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
                      ? "example@mail.com"
                      : "+90 5XX XXX XXXX"
                  }
                  value={supportContact}
                  onChange={(e) => setSupportContact(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your message here..."
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
