import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import {
  LuArrowLeft,
  LuType,
  LuImage,
  LuBarcode,
  LuMinus,
  LuColumns2,
  LuAlignLeft,
  LuAlignCenter,
  LuAlignRight,
  LuSave,
  LuEye,
} from "react-icons/lu";

// onBack prop'u, geri butonuna basıldığında bir önceki sayfaya dönmemizi sağlayacak.
const AddTemplate = ({ onBack }) => {
  const [template, setTemplate] = useState("Receipts");
  const [paperSize, setPaperSize] = useState("3-inch (80mm)");
  const [elements, setElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const selectedElement = elements.find((el) => el.id === selectedId);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
          return;
        }
        setElements((prev) => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedId]);

  function updateSelectedElement(field, value) {
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, [field]: value } : el)),
    );
  }
  function addTextElement() {
    const newElement = {
      id: Date.now(),
      type: "text",
      content: "new text",
      fontSize: "16px",
      isBold: false,
      isItalic: false,
      textAlign: "center",
    };
    setElements((prev) => [...prev, newElement]);
  }

  function addDividerElement() {
    const newElement = {
      id: Date.now(),
      type: "divider",
      content: "",
    };
    setElements((prev) => [...prev, newElement]);
  }

  function addImageElement() {
    const newElement = {
      id: Date.now(),
      type: "image",
      url: "https://placehold.co/150x150/e2e8f0/475569?text=Logo",
      width: "100%",
      align: "center",
    };
    setElements((prev) => [...prev, newElement]);
  }

  function addBarcodeElement() {
    const newElement = {
      id: Date.now(),
      type: "barcode",
      content: "123456789012",
      height: "50px",
    };
    setElements((prev) => [...prev, newElement]);
  }

  function add2ColumnElement() {
    const newElement = {
      id: Date.now(),
      type: "2-column",
      col1: "Item Name", // 1. Kolonun metni
      col2: "$0.00", // 2. Kolonun metni
      col1Align: "left", // 1. Kolon sola yaslı
      col2Align: "right", // 2. Kolon sağa yaslı
      isBold: false, // Yazılar kalın mı?
    };
    setElements((prev) => [...prev, newElement]);
  }

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
          <Button
            variant={template === "Receipts" ? "dark" : "light"}
            className={`me-2 fw-medium ${template !== "Receipts" ? "border bg-white" : ""}`}
            onClick={() => setTemplate("Receipts")}
          >
            Receipts
          </Button>
          <Button
            variant={template === "Labels" ? "dark" : "light"}
            className={`fw-medium ${template !== "Labels" ? "border bg-white" : ""}`}
            onClick={() => setTemplate("Labels")}
          >
            Labels
          </Button>
        </div>
      </div>

      {/* --- 3 SÜTUNLU ANA GRID YAPISI --- */}
      <Row>
        {/* SOL SÜTUN: Araç Kutusu (12 birimin 3'ünü kaplar) */}
        {/* SOL SÜTUN: Araç Kutusu (12 birimin 3'ünü kaplar) */}
        <Col md={3}>
          <div className="bg-white border rounded p-3 h-100">
            <h6 className="fw-bold mb-1">Receipt Designer</h6>
            <p className="text-muted small mb-4">
              Design your custom receipt layout
            </p>

            <Form.Group className="mb-3">
              <Form.Label className="fw-medium small mb-1">
                Template *
              </Form.Label>
              <Form.Select size="sm" className="shadow-none text-muted">
                <option>Default Receipt</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-medium small mb-1">
                Paper Size *
              </Form.Label>
              <Form.Select
                size="sm"
                className="shadow-none text-muted"
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value)}
              >
                <option value="3-inch (80mm)">3-inch (80mm)</option>
                <option value="2-inch (58mm)">2-inch (58mm)</option>
              </Form.Select>
            </Form.Group>

            <p className="fw-medium small mb-2">Add Elements</p>
            {/* d-grid: İçeriği ızgara yapar. 1fr 1fr: Eşit 2 sütuna böler. */}
            <div
              className="d-grid gap-2 mb-4"
              style={{ gridTemplateColumns: "1fr 1fr" }}
            >
              <Button
                variant="light"
                size="sm"
                className="border d-flex justify-content-center align-items-center gap-2 text-dark bg-white"
                onClick={addTextElement}
              >
                <LuType size={16} /> Text
              </Button>
              <Button
                variant="light"
                size="sm"
                className="border d-flex justify-content-center align-items-center gap-2 text-dark bg-white"
                onClick={addImageElement}
              >
                <LuImage size={16} /> Image
              </Button>
              <Button
                variant="light"
                size="sm"
                className="border d-flex justify-content-center align-items-center gap-2 text-dark bg-white"
                onClick={addBarcodeElement}
              >
                <LuBarcode size={16} /> Barcode
              </Button>
              <Button
                variant="light"
                size="sm"
                className="border d-flex justify-content-center align-items-center gap-2 text-dark bg-white"
                onClick={addDividerElement}
              >
                <LuMinus size={16} /> Divider
              </Button>
            </div>

            <p className="fw-medium small mb-2">Layout Elements</p>
            {/* flex-column: Butonları alt alta dizer */}
            <div className="d-flex flex-column gap-2 mb-4">
              <Button
                variant="light"
                size="sm"
                className="border d-flex justify-content-center align-items-center gap-2 text-dark bg-white"
                onClick={add2ColumnElement}
              >
                <LuColumns2 size={16} /> 2 Column
              </Button>
              <Button
                variant="dark"
                size="sm"
                className="d-flex justify-content-center align-items-center gap-2"
              >
                <LuColumns2 size={16} /> 3 Column
              </Button>
            </div>

            <p className="fw-medium small mb-2">Variables</p>
            <div className="d-flex flex-column gap-2">
              {/* React Zekası: Tek tek 6 tane buton yazmak yerine, bir DİZİ (Array) yapıp .map() ile hepsini tek seferde basıyoruz! */}
              {[
                "{Store_Name}",
                "{Store_Location}",
                "{Store_Phone}",
                "{Date}",
                "{Time}",
                "{Transaction_ID}",
              ].map((variable) => (
                <Button
                  key={variable}
                  variant="light"
                  size="sm"
                  className="border bg-white text-muted"
                  disabled={!selectedElement}
                  onClick={() =>
                    updateSelectedElement(
                      "content",
                      (selectedElement?.content ?? "") + variable,
                    )
                  }
                >
                  {variable}
                </Button>
              ))}
            </div>
          </div>
        </Col>
        {/* ORTA SÜTUN: Önizleme / Tuval (12 birimin 6'sını kaplar) */}
        <Col md={6}>
          <div className="bg-light border rounded p-3 h-100 d-flex flex-column align-items-center">
            <h6 className="fw-bold mb-3 align-self-start">Preview</h6>

            {/* FİŞ KAĞIDI (Burası asıl fişimiz) */}
            <div
              className="bg-white shadow-sm p-4 mt-2"
              style={{
                width: "340px",
                minHeight: "500px",
                fontFamily: "'Courier New', Courier, monospace", // Fiş (daktilo) fontu
              }}
            >
              {elements.map((el) => {
                if (el.type === "divider") {
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`my-2 rounded ${selectedId === el.id ? "border border-primary p-1" : ""}`}
                      style={{ cursor: "pointer" }}
                    >
                      <hr
                        style={{
                          borderStyle: "dashed",
                          opacity: 0.5,
                          margin: 0,
                        }}
                      />
                    </div>
                  );
                }

                if (el.type === "image") {
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`mb-2 p-1 rounded d-flex justify-content-
                    ${
                      el.align === "center"
                        ? "center"
                        : el.align === "right"
                          ? "end"
                          : "start"
                    } 
                    ${selectedId === el.id ? "border border-primary" : ""}`}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={el.url}
                        alt="Uploaded"
                        style={{ width: el.width, maxWidth: "100%" }}
                      />
                    </div>
                  );
                }

                if (el.type === "barcode") {
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`mb-2 p-1 rounded text-center ${selectedId === el.id ? "border border-primary" : ""}`}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Şimdilik barkodu temsil eden sahte bir CSS deseni gösteriyoruz */}
                      <div
                        style={{
                          margin: "0 auto",
                          width: "90%",
                          height: el.height,
                          background:
                            "repeating-linear-gradient(90deg, #000, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 5px, #fff 5px, #fff 8px)",
                        }}
                      ></div>
                      <small className="d-block mt-1 fw-bold">
                        {el.content}
                      </small>
                    </div>
                  );
                }

                if (el.type === "2-column") {
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)}
                      className={`mb-2 p-1 rounded d-flex justify-content-between ${
                        selectedId === el.id ? "border border-primary" : ""
                      }`}
                      style={{
                        cursor: "pointer",
                        fontWeight: el.isBold ? "bold" : "normal",
                      }}
                    >
                      <span style={{ textAlign: el.col1Align }}>{el.col1}</span>
                      <span style={{ textAlign: el.col2Align }}>{el.col2}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={el.id}
                    className={`mb-2 p-1 rounded ${selectedId === el.id ? "border border-primary" : ""}`}
                    style={{
                      cursor: "pointer",
                      fontSize: el.fontSize ?? "16px",
                      fontWeight: el.isBold ? "bold" : "normal",
                      fontStyle: el.isItalic ? "italic" : "normal",
                      textAlign: el.textAlign ?? "center",
                    }}
                    onClick={() => setSelectedId(el.id)}
                  >
                    {el.content}
                  </div>
                );
              })}
              {/* 1. Fiş Başlığı (Çerçeve İçinde) */}
            </div>
          </div>
        </Col>

        {/* SAĞ SÜTUN: Ayarlar (12 birimin 3'ünü kaplar) */}
        {/* SAĞ SÜTUN: Ayarlar (12 birimin 3'ünü kaplar) */}
        <Col md={3}>
          {/* flex-column: içindeki her şeyi alt alta koyar. h-100 ile boyu %100 olur */}
          <div className="bg-white border rounded p-3 h-100 d-flex flex-column">
            <h6 className="fw-bold mb-1">Properties</h6>
            <p className="text-muted small mb-4">Manage element properties</p>

            {!selectedElement ? (
              <div className="text-center text-muted my-auto px-2">
                <p className="small">Choose any item for editing</p>
              </div>
            ) : (
              <div className="d-flex flex-column gap-3">
                {selectedElement.type === "text" && (
                  <>
                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small mb-1">
                        Content *
                      </Form.Label>
                      <Form.Control
                        size="sm"
                        type="text"
                        value={selectedElement?.content ?? ""}
                        onChange={(e) =>
                          updateSelectedElement("content", e.target.value)
                        }
                        disabled={!selectedElement}
                        placeholder={
                          selectedElement
                            ? "Edit content"
                            : "Select an element to edit"
                        }
                        className="shadow-none text-muted mb-1"
                      />
                      <Form.Text
                        className="text-muted"
                        style={{ fontSize: "11px" }}
                      >
                        Use variables :<br />
                        {"{Store_Name}"}, {"{Date}"}, {"{Time}"}, {"{Item}"}{" "}
                        etc.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small mb-1">
                        Font Size *
                      </Form.Label>
                      <Form.Select
                        size="sm"
                        className="shadow-none text-muted"
                        value={selectedElement?.fontSize ?? "16px"}
                        onChange={(e) =>
                          updateSelectedElement("fontSize", e.target.value)
                        }
                        disabled={!selectedElement}
                      >
                        <option value="20px">20px</option>
                        <option value="16px">16px</option>
                        <option value="14px">14px</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="fw-medium small mb-1">
                        Style *
                      </Form.Label>
                      <div className="d-flex gap-2">
                        {/* w-50: Her buton satırın %50'sini kaplar */}
                        <Button
                          variant={selectedElement?.isBold ? "dark" : "light"}
                          size="sm"
                          className="w-50 fw-medium"
                          onClick={() =>
                            updateSelectedElement(
                              "isBold",
                              !selectedElement?.isBold,
                            )
                          }
                          disabled={!selectedElement}
                        >
                          B Bold
                        </Button>
                        <Button
                          variant={selectedElement?.isItalic ? "dark" : "light"}
                          size="sm"
                          className="w-50 fw-medium "
                          disabled={!selectedElement}
                          onClick={() =>
                            updateSelectedElement(
                              "isItalic",
                              !selectedElement?.isItalic,
                            )
                          }
                        >
                          <span className="fst-italic">I</span> Italic
                        </Button>
                      </div>
                    </Form.Group>

                    <Form.Group className="mb-5">
                      <Form.Label className="fw-medium small mb-1">
                        Alignment *
                      </Form.Label>
                      <div className="d-flex gap-2">
                        {/* flex-fill: Alanı eşit paylaşmak için butonların şişmesini sağlar */}
                        <Button
                          size="sm"
                          variant={
                            selectedElement?.textAlign === "left"
                              ? "dark"
                              : "light"
                          }
                          className="flex-fill"
                          disabled={!selectedElement}
                          onClick={() =>
                            updateSelectedElement("textAlign", "left")
                          }
                        >
                          <LuAlignLeft size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            selectedElement?.textAlign === "center"
                              ? "dark"
                              : "light"
                          }
                          className="flex-fill"
                          disabled={!selectedElement}
                          onClick={() =>
                            updateSelectedElement("textAlign", "center")
                          }
                        >
                          <LuAlignCenter size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant={
                            selectedElement?.textAlign === "right"
                              ? "dark"
                              : "light"
                          }
                          className="flex-fill"
                          disabled={!selectedElement}
                          onClick={() =>
                            updateSelectedElement("textAlign", "right")
                          }
                        >
                          <LuAlignRight size={16} />
                        </Button>
                      </div>
                    </Form.Group>
                  </>
                )}
                {selectedElement.type === "divider" && (
                  <div className="text-center text-muted my-4">
                    <p className="small">
                      No adjustible properties for divider.
                    </p>
                  </div>
                )}

                {selectedElement.type === "2-column" && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium small mb-1">
                        Left Column
                      </Form.Label>
                      <Form.Control
                        size="m"
                        type="text"
                        value={selectedElement.col1 ?? ""}
                        onChange={(e) =>
                          updateSelectedElement("col1", e.target.value)
                        }
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-medium small mb-1">
                        Right Column
                      </Form.Label>
                      <Form.Control
                        size="m"
                        type="text"
                        value={selectedElement.col2 ?? ""}
                        onChange={(e) =>
                          updateSelectedElement("col2", e.target.value)
                        }
                      />
                    </Form.Group>
                  </>
                )}

                {/* mt-auto (Margin-Top Auto): Bu çok önemlidir. Kendisinden üstte ne kadar boşluk varsa hepsini ittirerek bu grubu EN ALTA yapıştırır! */}
                <div className="mt-auto d-flex flex-column gap-2">
                  <Button
                    style={{ backgroundColor: "#1e8f81", border: "none" }}
                    className="d-flex justify-content-center align-items-center gap-2 fw-medium py-2"
                  >
                    <LuSave size={16} /> Save Template
                  </Button>
                  <Button
                    variant="light"
                    className="border d-flex justify-content-center align-items-center gap-2 fw-medium bg-white text-dark py-2"
                  >
                    <LuEye size={16} /> Preview Template
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTemplate;
