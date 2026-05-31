import "./Sidebar.css";
import { Nav, Image, Button } from "react-bootstrap";
import { useState } from "react";

// Asset imports (logo + ikonlar)
import logo from "../../assets/logo1.png";
import dashboardIcon from "../../assets/dashboardIcon.svg";
import employeeIcon from "../../assets/employeeIcon.svg";
import inventoryIcon from "../../assets/inventoryIcon.svg";
import deviceIcon from "../../assets/deviceIcon.svg";
import reportsIcon from "../../assets/reportsIcon.svg";
import categoryIcon from "../../assets/categoryIcon.svg";
import taxIcon from "../../assets/taxIcon.svg";
import instoreIcon from "../../assets/instoreIcon.svg";
import storeIcon from "../../assets/storeIcon.svg";
import logsIcon from "../../assets/logsIcon.svg";
import receiptIcon from "../../assets/receiptIcon.svg";
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
    items: [{ id: "dashboard", label: "Dashboard", icon: dashboardIcon }],
  },
  {
    title: "STORE MANAGEMENT",
    items: [
      { id: "employee", label: "Employee Management", icon: employeeIcon },
      { id: "inventory", label: "Inventory", icon: inventoryIcon },
      { id: "device", label: "Device Management", icon: deviceIcon },
      { id: "reports", label: "Reports", icon: reportsIcon },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { id: "category", label: "Category", icon: categoryIcon },
      { id: "tax", label: "Tax", icon: taxIcon },
      { id: "instore-location", label: "In-Store Location", icon: instoreIcon },
      { id: "store-details", label: "Store Details", icon: storeIcon },
      { id: "logs", label: "Logs", icon: logsIcon },
      {
        id: "receipt-label",
        label: "Receipt & Label Design",
        icon: receiptIcon,
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
  return (
    // pt-3       → üstten padding
    // minHeight  → sidebar her zaman ekran yüksekliği kadar uzasın
    <div
      className="pt-3"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <div className="px-3 mb-4">
        {/* ── LOGO ── */}
        {/* fluid → görseli responsive yap, maxWidth → çok büyük olmasın */}
        <Image
          src={logo}
          alt="Ozgur YILDIZ"
          fluid
          className="mb-3"
          style={{ maxWidth: 140 }}
        />

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
        <div className="bg-secondary-subtle p-3 mt-4 rounded">
          <h6>Need Help?</h6>
          <p className="small">Feel free to connect</p>
          {/* w-100 → buton sütunun tam genişliğini kaplasın */}
          <Button variant="dark" className="w-100">
            Get Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
