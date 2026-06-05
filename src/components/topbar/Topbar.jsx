import React from "react";
// Lucide ikon kütüphanesinden zil ve aşağı-ok ikonlarını içeri alıyoruz.
import { LuRefreshCw, LuChevronDown, LuMenu } from "react-icons/lu";
import { Button } from "react-bootstrap";
import "./Topbar.css"; // Topbar'a özel stiller için CSS dosyası
// title prop'unu dışarıdan alıyoruz; başlık metni böylece dinamik olur.
const Topbar = ({ title, user, onRefresh, onMenuClick }) => {
  const currentUser = user || {
    name: "Hasan Asad Mahdavi",
    role: "Store Manager",
    initials: "HA", // Avatar içindeki baş harfler
  };

  const [showNotifications, setShowNotifications] = React.useState(false);
  const [showProfileMenu, setShowProfileMenu] = React.useState(false);
  const notifications = [
    {
      id: 1,
      title: "POS service degraded",
      subtitle: "Test Store POS service unreachable for ...",
    },
    {
      id: 2,
      title: "POS service degraded",
      subtitle: "Test Store POS service unreachable for ...",
    },
    {
      id: 3,
      title: "Alert #1 [critical]",
      subtitle: "Demo alert 1 for tenant 25 - type POS_S...",
    },
  ];
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      // Eğer tıklanan yer dropdown kartlarının dışındaysa kapat
      if (!e.target.closest(".topbar-dropdown")) {
        setShowNotifications(false);
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Component unmount olunca listener'ı temizle
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    // d-flex: flexbox, align-items-center: dikeyde ortala, justify-content-between: iki ucu uçlara yasla, px-4 py-3: iç boşluk, border-bottom: alt çizgi, bg-white: beyaz arka plan.
    <div
      className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white"
      style={{ overflow: "visible" }}
    >
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onMenuClick}
          className="btn btn-light d-md-none p-1 me-2"
        >
          <LuMenu size={20} />
        </button>
        <h4 className="mb-0 fw-semibold">{title}</h4>
      </div>
      <div
        className="d-flex align-items-center gap-3"
        style={{ overflow: "visible" }}
      >
        <div className="position-relative topbar-dropdown">
          {/* Yuvarlak bildirim butonu; position-relative kırmızı noktayı konumlandırmak için lazım. */}
          <button
            onClick={() => {
              setShowNotifications((v) => !v);
              setShowProfileMenu(false);
            }}
            className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
            // Butonu sabit 40x40 boyutunda yapıyoruz.
            style={{ width: 40, height: 40 }}
          >
            {/* Zil ikonu; size=18 ile boyutunu ayarlıyoruz. */}
            <LuRefreshCw size={18} />
            {/* Sağ üst köşede kırmızı bildirim noktası; position-absolute ile parent'a göre konumlanır. */}
            <span
              className="position-absolute bg-danger rounded-circle"
              style={{ width: 8, height: 8, top: 6, right: 6 }}
            />
          </button>
          {showNotifications && (
            <div
              className="position-absolute"
              style={{
                top: "48px",
                right: 0,
                width: 320,
                height: "auto",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                zIndex: 1000,
                overflow: "visible",
              }}
            >
              <div className="p-3 border-bottom">
                <strong>Notifications</strong>
                <span className="text-muted small ms-2">50 unread</span>
              </div>
              <div
                className="p-3"
                style={{
                  borderBottom: "1px solid #ccc",
                  backgroundColor: "#fff",
                }}
              >
                {notifications.map((note) => (
                  <div
                    key={note.id}
                    className="d-flex gap-2 mb-3 topbar-menu-item"
                  >
                    <div
                      className="rounded-circle bg-danger-subtle"
                      style={{ width: 32, height: 32 }}
                    />
                    <div>
                      <strong style={{ fontSize: 13 }}>{note.title}</strong>
                      <div className="text-muted small">{note.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-top px-3 py-2 topbar-menu-item">
                <a href="#" className="text-decoration-none">
                  View all notifications
                </a>
              </div>
            </div>
          )}
        </div>{" "}
        <div
          className="position-relative topbar-dropdown"
          style={{ overflow: "visible", position: "relative" }}
        >
          {/* Kullanıcı bilgisi: avatar + isim + ünvan + ok ikonu. */}
          <Button
            onClick={() => {
              setShowProfileMenu((v) => !v);
              setShowNotifications(false);
            }}
            className="btn btn-transparent d-flex align-items-center gap-2"
            style={{ border: "none", background: "transparent" }}
          >
            <div className="d-flex align-items-center gap-2">
              {/* Yuvarlak avatar; içinde kullanıcının baş harfleri (JD = John Doe). */}
              <div
                className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center fw-bold"
                style={{
                  width: 40,
                  height: 40,
                  fontSize: 14,
                  color: "#fff",
                  backgroundColor: "#6c757d",
                }}
              >
                {currentUser.initials}
              </div>
              {/* İsim ve ünvanı yan yana değil üst üste göstermek için ayrı bir div. */}
              <div style={{ color: "#333", textAlign: "left" }}>
                <strong
                  className="d-block"
                  style={{ fontSize: 14, color: "#212529" }}
                >
                  {currentUser.name}
                </strong>
                <small style={{ color: "#6c757d" }}>{currentUser.role}</small>
              </div>
              {/* Profil menüsünün açılabileceğini gösteren küçük aşağı-ok. */}
              <LuChevronDown size={16} style={{ color: "#333" }} />
            </div>
          </Button>
          {showProfileMenu && (
            // Profil panelini sadece showProfileMenu true iken göster
            <div
              className="position-absolute"
              style={{
                top: "56px", // butonun altından başlasın
                right: 0, // butonun sağ hizasına dayansın
                width: 220,
                left: "auto",
                height: "auto",
                maxHeight: "none",
                backgroundColor: "#fff",
                border: "1px solid #ddd",
                borderRadius: 16,
                boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                zIndex: 999,
                overflow: "hidden",
              }}
            >
              {/* Panel başlık alanı */}
              <div
                className="p-3 border-bottom"
                style={{ borderBottom: "1px solid #ccc" }}
              >
                <div className="d-flex align-items-center gap-2">
                  <div
                    className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center fw-bold"
                    style={{
                      width: 36,
                      height: 36,
                      fontSize: 13,
                      color: "#fff",
                      backgroundColor: "#6c757d",
                    }}
                  >
                    {currentUser.initials}
                  </div>
                  <div style={{ color: "#333", textAlign: "left" }}>
                    <strong
                      className="d-block"
                      style={{ fontSize: 14, color: "#212529" }}
                    >
                      {currentUser.name}
                    </strong>
                    <small style={{ color: "#6c757d" }}>
                      {currentUser.role}
                    </small>
                  </div>
                </div>
              </div>

              {/* Menü seçenekleri */}
              <button
                className="topbar-menu-item w-100 text-start px-3 py-2 border-0"
                style={{ borderTop: "1px solid #f1f1f1" }}
              >
                Profile
              </button>
              <button className="topbar-menu-item w-100 text-start px-3 py-2 border-0">
                Settings
              </button>
              <button className="topbar-menu-item w-100 text-start px-3 py-2 border-0">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Bileşeni dışa açıyoruz; DashboardLayout içeri alacak.
export default Topbar;
