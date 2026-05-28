// React kütüphanesini içeri alıyoruz; JSX kullanmak için gerekli.
import React from "react";
// Bootstrap'in hazır grid bileşenleri: Container = dış kapsayıcı, Row = yatay satır, Col = sütun.
import { Container, Row, Col, Offcanvas } from "react-bootstrap";
// Sol taraftaki menü bileşeni.
import Sidebar from "../components/sidebar/Sidebar";
// Üstteki başlık + bildirim + kullanıcı barı.
import Topbar from "../components/topbar/Topbar";

// children prop'u, bu layout'un içine sarılan başka bileşenleri temsil eder (örn. sayfa içerikleri).
const DashboardLayout = ({ children, activePage, setActivePage }) => {
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  return (
    // fluid Container ekranın tam genişliğini kullanır (sabit max-width yok).
    <Container fluid>
      {/* Sayfayı yatay bir satıra alıyoruz; içine sütunlar yerleşecek. */}
      <Row>
        {/* Sol sütun: küçük ekranda 12'de 4, orta ekran ve üstünde 12'de 3 genişliğinde. */}
        <Col
          xs={4}
          md={3}
          // bg-light: açık arka plan, vh-100: tam ekran yüksekliği, sticky-top: kaydırınca yapışkan kalır, p-0: padding yok, border-end: sağ kenarlık.
          className="d-none d-md-block bg-light vh-100 sticky-top p-0 border-end"
        >
          {/* Sol menü bileşenini bu sütuna yerleştiriyoruz. */}
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </Col>
        {/* Sağ sütun: ana içerik alanı; küçükte 8, orta ve üstünde 9 genişliğinde. */}
        <Col xs={12} md={9} className="p-0">
          {/* Üst bar; başlığı prop ile dışarıdan veriyoruz, böylece sayfaya göre değişebilir. */}
          <Topbar
            title={
              activePage === "dashboard"
                ? "Dashboard"
                : "Receipt & Label Design"
            }
            onMenuClick={() => setShowMobileMenu(true)}
          />
          {/* p-4: dört bir yandan padding; children burada sayfanın asıl içeriğini gösterir. */}
          <div className="p-4">{children}</div>
        </Col>
      </Row>
      <Offcanvas
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        responsive="md"
      >
        <Offcanvas.Header closeButton className="border-bottom bg-light">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0 bg-light">
          <Sidebar activePage={activePage} setActivePage={setActivePage} />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

// Bu bileşeni dışa açıyoruz ki App.jsx içeri alabilsin.
export default DashboardLayout;
