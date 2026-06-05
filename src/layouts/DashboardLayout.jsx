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
          xs="auto"
          className="d-none d-md-block bg-light vh-100 sticky-top p-0 border-end"
        >
          {/* activePage ve setActivePage → hangi menü maddesi seçili, prop olarak gönderiyoruz */}
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </Col>
        {/* ── SAĞ SÜTUN: ANA İÇERİK ── */}
        <Col className="p-0 flex-grow-1" style={{ minWidth: 0 }}>
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
        className="d-md-none" // orta ekran ve üstünde GİZLE (sadece mobilde göster)
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
