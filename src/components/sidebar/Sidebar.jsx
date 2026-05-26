// Sidebar'a özel CSS dosyasını yüklüyoruz (link rengi, aktif durum stili vs).
import "./Sidebar.css";
// Bootstrap'ten menü (Nav), görsel (Image) ve buton (Button) bileşenleri.
import { Nav, Image, Button } from "react-bootstrap";
// Logo ve menü ikonlarını içeri alıyoruz; Vite bunları otomatik bundler ile çözer.
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
// useState: bileşen içinde değişen veri tutmak için kullandığımız React hook'u.
import { useState } from "react";

// Menü gruplarını veri olarak tanımlıyoruz; aşağıda map ile dönüp tek tek basacağız.
const menuSections = [
  {
    // Grup başlığı: küçük gri yazı.
    title: "OVERVIEW",
    // O grubun altındaki menü maddeleri.
    items: [{ id: "dashboard", label: "Dashboard", icon: dashboardIcon }],
  },
  {
    title: "STORE MANAGEMENT",
    items: [
      // Her madde: tıklamada kullanılacak id, ekranda görünen label, ve sol başındaki ikon.
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
      {
        id: "instore-location",
        label: "In-Store Location",
        icon: instoreIcon,
      },
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

// Sol menü bileşenini tanımlıyoruz.
const Sidebar = () => {
  // Hangi menü maddesinin "aktif" olduğunu hatırlayan state; başlangıçta dashboard seçili.
  const [activeLink, setActiveLink] = useState("dashboard");

  return (
    // pt-3: üstten padding 3; arka plan rengi ve en az tam ekran yüksekliği inline style ile veriliyor.
    <div
      className="pt-3"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* px-3: sağ-sol padding, mb-4: alt margin; iç içerik için bir sarmalayıcı. */}
      <div className="px-3 mb-4">
        {/* Logoyu basıyoruz; fluid responsive boyutlandırır, maxWidth 140px ile küçültüyoruz. */}
        <Image
          src={logo}
          alt="Ameza Solutions"
          fluid
          className="mb-3"
          style={{ maxWidth: 140 }}
        />

        {/* Mağaza seçici kutu: çerçeveli, yuvarlatılmış, iki ucu uçlara dayalı. */}
        <div className="border rounded p-2 mx-2 mb-3 d-flex align-items-center justify-content-between gap-2">
          {/* Sol parça: avatar + mağaza adı + lokasyon. */}
          <div className="d-flex align-items-center gap-2">
            {/* Mağazanın baş harflerinden oluşan yuvarlak rozet (NM = Nazar Market). */}
            <div
              className="d-flex align-items-center justify-content-center rounded-circle bg-secondary-subtle fw-bold"
              style={{ width: 36, height: 36, fontSize: 13 }}
            >
              NM
            </div>
            <div>
              {/* Mağaza adı; kalın ve blok eleman. */}
              <strong className="d-block" style={{ fontSize: 14 }}>
                Nazar Market
              </strong>
              {/* Lokasyon bilgisi; küçük ve silik. */}
              <small className="text-muted" style={{ fontSize: 12 }}>
                Location: Downtown
              </small>
            </div>
          </div>
          {/* Mağaza seçim açılır menüsünü işaret eden küçük chevron ikonu. */}
          <Image src={chevron} alt="chevron" width={14} height={14} />
        </div>

        {/* Menü Nav'i; flex-column ile maddeler alt alta dizilir. */}
        <Nav className="flex-column px-2">
          {/* Her bir menü grubunu (OVERVIEW, STORE MANAGEMENT, SETTINGS) sırayla basıyoruz. */}
          {menuSections.map((section) => (
            // React her listelenen elementte unique bir key bekler; başlık unique olduğu için onu kullandık.
            <div key={section.title}>
              {/* Grup başlığı: büyük harfli, gri, harf aralığı geniş; CSS class'ından gelir. */}
              <span className="text-uppercase text-muted fw-semibold sidebar-section-title ">
                {section.title}
              </span>
              {/* Gruba ait her menü maddesini sırayla basıyoruz. */}
              {section.items.map((item) => (
                <Nav.Link
                  // Listede her madde için unique key; burada item.id kullanıyoruz.
                  key={item.id}
                  // href: tıklayınca url'e # eklenir (ileride router ile değiştirilebilir).
                  href={`#${item.id}`}
                  // Tıklandığında o maddenin id'sini state'e yazıp "aktif" hale getiriyoruz.
                  onClick={() => setActiveLink(item.id)}
                  // Eğer bu madde aktifse "active" class'ı eklenir; CSS koyu arka plan + kırmızı alt çizgi verir.
                  className={`d-flex align-items-center gap-2 sidebar-link ${
                    activeLink === item.id ? "active" : ""
                  }`}
                >
                  {/* Maddenin sol başındaki ikon. */}
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                  />
                  {/* Maddenin metin etiketi. */}
                  {item.label}
                </Nav.Link>
              ))}
            </div>
          ))}
        </Nav>

        {/* En altta küçük bir "yardım" kartı: arka plan, padding, üstten boşluk, yuvarlatılmış köşeler. */}
        <div className="bg-secondary-subtle p-3 mt-4 rounded">
          {/* Kart başlığı. */}
          <h6>Need Help?</h6>
          {/* Açıklama metni; small class'ı font boyutunu küçültür. */}
          <p className="small">Feel free to connect </p>
          {/* Koyu renkli, sütun genişliğini tam dolduran destek butonu. */}
          <Button variant="dark" className="w-100">
            Get Support
          </Button>
        </div>
      </div>
    </div>
  );
};

// Bileşeni dışa açıyoruz; DashboardLayout içeri alacak.
export default Sidebar;
