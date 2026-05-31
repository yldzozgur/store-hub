import React from "react";
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
import Sidebar from "../components/sidebar/Sidebar";
import Topbar from "../components/topbar/Topbar";

const DashboardLayout = ({ children, activePage, setActivePage }) => {
  // showMobileMenu: mobil menünün açık/kapalı durumunu tutan state
  // false = kapalı, true = açık
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  return (
    // fluid → sayfanın tam genişliğini kullan, kenardan boşluk bırakma
    <Container fluid>
      {/* Row → içindeki sütunları yan yana dizer */}
      <Row>
        {/* ── SOL SÜTUN: SIDEBAR ── */}
        <Col
          xs={4} // küçük ekranda 12'nin 4'ü kadar yer kapla
          md={3} // orta ve büyük ekranda 12'nin 3'ü kadar yer kapla
          className="
            d-none        // varsayılan olarak GİZLE (mobilde sidebar yok)
            d-md-block    // orta ekran ve üstünde GÖSTER
            bg-light      // açık gri arka plan
            vh-100        // ekranın tam yüksekliği kadar uzasın
            sticky-top    // sayfa kaydırılınca sidebar yerinde kalsın
            p-0           // iç boşluk (padding) sıfır
            border-end    // sağ kenara ince çizgi
          "
        >
          {/* activePage ve setActivePage → hangi menü maddesi seçili, prop olarak gönderiyoruz */}
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </Col>

        {/* ── SAĞ SÜTUN: ANA İÇERİK ── */}
        <Col
          xs={12} // küçük ekranda tam genişlik (sidebar yok zaten)
          md={9} // orta ve büyük ekranda 12'nin 9'u
          className="p-0" // iç boşluk sıfır
        >
          <Topbar
            // activePage'e göre başlık metnini dinamik olarak belirliyoruz
            // Ternary operatör: koşul ? doğruysa : yanlışsa
            title={
              activePage === "dashboard"
                ? "Dashboard"
                : "Receipt & Label Design"
            }
            // Mobilde hamburger butona tıklanınca showMobileMenu'yu true yap → menü açılır
            onMenuClick={() => setShowMobileMenu(true)}
          />

          {/* p-4 → dört bir yandan padding; children = bu layout'a sarılan sayfa */}
          <div className="p-4">{children}</div>
        </Col>
      </Row>

      {/* ── MOBİL MENÜ (OFFCANVAS) ── */}
      {/* Offcanvas → ekranın kenarından kayan panel; mobilde sidebar yerine kullanılır */}
      <Offcanvas
        show={showMobileMenu} // true ise panel açık, false ise kapalı
        onHide={() => setShowMobileMenu(false)} // panel kapanınca state'i false yap
        responsive="md" // md ve üstü ekranlarda otomatik gizlenir
      >
        <Offcanvas.Header
          closeButton // sağ üste X butonu ekler
          className="border-bottom bg-light"
        >
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body className="p-0 bg-light">
          {/* Mobil menüde de aynı Sidebar bileşenini kullanıyoruz */}
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default DashboardLayout;
