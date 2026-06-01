import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
            <p className="text-muted small mb-4">
              Design your custom receipt layout
            </p>

            <p className="text-muted">/* Form elemanları buraya gelecek */</p>
          </div>
        </Col>

        {/* ORTA SÜTUN: Önizleme / Tuval (12 birimin 6'sını kaplar) */}
        <Col md={6}>
          <div className="bg-light border rounded p-3 h-100 d-flex flex-column align-items-center">
            <h6 className="fw-bold mb-3 align-self-start">Preview</h6>

            <p className="text-muted mt-5">
              /* Fiş önizlemesi buraya gelecek */
            </p>
          </div>
        </Col>

        {/* SAĞ SÜTUN: Ayarlar (12 birimin 3'ünü kaplar) */}
        <Col md={3}>
          <div className="bg-white border rounded p-3 h-100">
            <h6 className="fw-bold mb-1">Properties</h6>
            <p className="text-muted small mb-4">Manage element properties</p>

            <p className="text-muted">/* Ayarlar buraya gelecek */</p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTemplate;
