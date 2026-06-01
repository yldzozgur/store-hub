import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { LuArrowLeft } from "react-icons/lu";

// onBack prop'u, geri butonuna basıldığında bir önceki sayfaya dönmemizi sağlayacak.
const AddTemplate = ({ onBack }) => {
  return (
    // Container fluid ile ekranın tamamını yatayda kullanıyoruz.
    <Container fluid className="p-0">
      {/* --- ÜST BÖLÜM (HEADER) --- */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          {/* Geri Butonu */}
          <Button variant="link" className="text-dark p-0" onClick={onBack}>
            <LuArrowLeft size={24} />
          </Button>
          <h4 className="mb-0 fw-bold">Add New Template</h4>
        </div>

        <div>
          {/* Sağ üstteki butonlar (Şu an sadece görsel) */}
          <Button variant="dark" className="me-2 fw-medium">
            Receipts
          </Button>
          <Button variant="light" className="border fw-medium bg-white">
            Labels
          </Button>
        </div>
      </div>

      {/* --- 3 SÜTUNLU ANA GRID YAPISI --- */}
      <Row>
        {/* SOL SÜTUN: Araç Kutusu (12 birimin 3'ünü kaplar) */}
        <Col md={3}>
          <div className="bg-white border rounded p-3 h-100">
            <h6 className="fw-bold mb-1">Receipt Designer</h6>
            <Form.Group className="mb-3">
              <Form.Label className="fw-medium small">Template *</Form.Label>
              <Form.Select size="m">
                <option>Default Receipt</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label className="fw-medium small">Paper Size *</Form.Label>
              <Form.Select size="sm">
                <option>3-inch (80mm)</option>
                <option>2-inch (58mm)</option>
              </Form.Select>
            </Form.Group>

            <p className="fw-medium small mb-2">Add Elements</p>
            <div
              className="d-grid gap-2 mb-4"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              <Button variant="light" size="sm" className="border">
                Text
              </Button>{" "}
              <Button variant="light" size="sm" className="border">
                Image
              </Button>{" "}
              <Button variant="light" size="sm" className="border">
                Barcode
              </Button>{" "}
              <Button variant="light" size="sm" className="border">
                Divider
              </Button>
            </div>
            <p className="fw-medium small mb-2">Layout Elements</p>
            <div className="d-flex flex-column gap-2 mb-4">
              <Button variant="light" size="sm" className="border">
                2 Column
              </Button>
              <Button variant="dark" size="sm">
                3 Column
              </Button>
            </div>

            <p className="fw-medium small mb-2">Variables</p>
            <div className="d-flex flex-column gap-2">
              <Button variant="light" size="sm" className="border">
                {"{Store_Name}"}
              </Button>
              <Button variant="light" size="sm" className="border">
                {"{Store_Location}"}
              </Button>
              <Button variant="light" size="sm" className="border">
                {"{Date}"}
              </Button>
              <Button variant="light" size="sm" className="border">
                {"{Item}"}
              </Button>
              <Button variant="light" size="sm" className="border">
                {"{Quantity}"}
              </Button>
              <Button variant="light" size="sm" className="border">
                {"{Total}"}
              </Button>
            </div>
          </div>
        </Col>

        {/* ORTA SÜTUN: Önizleme / Tuval (12 birimin 6'sını kaplar) */}
        <Col md={6}>
          <div className="bg-light border rounded p-3 h-100 d-flex flex-column align-items-center">
            <h6 className="fw-bold mb-3 align-self-start">Preview</h6>

            <div
              className="bg-white border rounded p-3 mt-2"
              style={{ width: "260px", minHeight: "400px", fontSize: "12px" }}
            >
              <h6 className="text-center fw-bold border-bottom pb-2">
                International Foods
              </h6>
              <p
                className="text-center text-muted"
                style={{ fontSize: "11px" }}
              >
                Cedar Park
                <br />
                851 S Bell Blvd
                <br />
                (512) 215 8579
              </p>
            </div>
          </div>
        </Col>

        {/* SAĞ SÜTUN: Ayarlar (12 birimin 3'ünü kaplar) */}
        <Col md={3}>
          <div className="bg-white border rounded p-3 h-100">
            <h6 className="fw-bold mb-1">Properties</h6>
            <p className="text-muted small mb-4">Manage element properties</p>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium small">Content *</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                defaultValue="International Food"
                placeholder="Enter content"
              />
              <Form.Text className="text-muted" style={{ fontSize: "11px" }}>
                Use variables like {"{Store_Name}"},{"{Date}"}
              </Form.Text>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTemplate;
