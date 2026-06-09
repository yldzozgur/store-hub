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
const AddTemplate = ({ onBack, onSave, initialData }) => {
  const [template, setTemplate] = useState(initialData?.type || "Receipts");
  const [paperSize, setPaperSize] = useState(
    initialData?.size || "3-inch (80mm)",
  );
  const [elements, setElements] = useState(initialData?.designData || []);
  const [selectedId, setSelectedId] = useState(null);

  // ÖNİZLEME MODU STATE'İ
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const selectedElement = elements.find((el) => el.id === selectedId);

  // KLAVYEDEN SİLME İŞLEMİ
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Delete" || e.key === "Backspace") {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
          return;
        setElements((prev) => prev.filter((el) => el.id !== selectedId));
        setSelectedId(null);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);

  function updateSelectedElement(field, value) {
    setElements((prev) =>
      prev.map((el) => (el.id === selectedId ? { ...el, [field]: value } : el)),
    );
  }

  // --- ELEMAN EKLEME FONKSİYONLARI ---
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
      col1: "Item Name",
      col2: "$0.00",
      col1Align: "left",
      col2Align: "right",
      isBold: false,
    };
    setElements((prev) => [...prev, newElement]);
  }

  function add3ColumnElement() {
    const newElement = {
      id: Date.now(),
      type: "3-column",
      col1: "1x",
      col2: "Item Name",
      col3: "$0.00",
      col1Align: "left",
      col2Align: "center",
      col3Align: "right",
      isBold: false,
    };
    setElements((prev) => [...prev, newElement]);
  }

  // KAYDETME FONKSİYONU
  function handleSaveTemplate() {
    if (elements.length === 0) {
      alert(
        "Please make sure that you already have added at least one element to the preview board before saving this screen",
      );
      return;
    }
    const finalTemplateData = {
      templateType: template,
      paperSize: paperSize,
      designElements: elements,
      createdAt: new Date().toLocaleString(),
    };
    if (onSave) {
      onSave(finalTemplateData);
      console.log(
        "Here are the details of the saving screen:",
        finalTemplateData,
      );
      alert("Changes saved successfully!");
    }

    onBack();
  }

  return (
    <Container fluid className="p-0">
      {/* ÜST BÖLÜM (HEADER) */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center gap-3">
          <Button variant="link" className="text-dark p-0" onClick={onBack}>
            <LuArrowLeft size={24} />
          </Button>
          <h4 className="mb-0 fw-bold">
            {initialData ? "Edit Template" : "Add New Template"}
          </h4>
        </div>
        <div>
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

      <Row>
        {/* SOL SÜTUN: Araç Kutusu (Önizleme Modunda Gizlenir) */}
        {!isPreviewMode && (
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
                  <option>Label</option>
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
                  onClick={add3ColumnElement}
                >
                  <LuColumns2 size={16} /> 3 Column
                </Button>
              </div>

              <p className="fw-medium small mb-2">Variables</p>
              <div className="d-flex flex-column gap-2">
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
        )}

        {/* ORTA SÜTUN: Önizleme / Tuval */}
        <Col md={isPreviewMode ? 12 : 6}>
          <div className="bg-light border rounded p-3 h-100 d-flex flex-column align-items-center">
            <div className="w-100 d-flex justify-content-between align-items-center mb-3">
              <h6 className="fw-bold mb-0">Preview</h6>
              {isPreviewMode && (
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => setIsPreviewMode(false)}
                >
                  Back to Edit Mode
                </Button>
              )}
            </div>

            {/* FİŞ KAĞIDI */}
            <div
              className="bg-white shadow-sm p-4 mt-2"
              style={{
                width: paperSize === "3-inch (80mm)" ? "340px" : "250px",
                transition: "width 0.3s ease", // Dinamik kağıt boyutu geçişi
                minHeight: "500px",
                fontFamily: "'Courier New', Courier, monospace",
                margin: "0 auto",
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
                      className={`mb-2 p-1 rounded d-flex justify-content-${
                        el.align === "center"
                          ? "center"
                          : el.align === "right"
                            ? "end"
                            : "start"
                      } ${selectedId === el.id ? "border border-primary" : ""}`}
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
                      className={`mb-2 p-1 rounded d-flex w-100 ${selectedId === el.id ? "border border-primary" : ""}`}
                      style={{
                        cursor: "pointer",
                        fontWeight: el.isBold ? "bold" : "normal",
                      }}
                    >
                      <div className="w-50" style={{ textAlign: el.col1Align }}>
                        {el.col1}
                      </div>
                      <div className="w-50" style={{ textAlign: el.col2Align }}>
                        {el.col2}
                      </div>
                    </div>
                  );
                }

                if (el.type === "3-column") {
                  return (
                    <div
                      key={el.id}
                      onClick={() => setSelectedId(el.id)} // BUG FIX: selectedId(el.id) yerine setSelectedId yapıldı
                      className={`mb-2 p-1 rounded d-flex w-100 ${selectedId === el.id ? "border border-primary" : ""}`}
                      style={{
                        cursor: "pointer",
                        fontWeight: el.isBold ? "bold" : "normal",
                      }}
                    >
                      <div style={{ width: "33.33%", textAlign: el.col1Align }}>
                        {el.col1}
                      </div>
                      <div style={{ width: "33.33%", textAlign: el.col2Align }}>
                        {el.col2}
                      </div>
                      <div style={{ width: "33.33%", textAlign: el.col3Align }}>
                        {el.col3}
                      </div>
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
            </div>
          </div>
        </Col>

        {/* SAĞ SÜTUN: Özellikler (Önizleme Modunda Gizlenir) */}
        {!isPreviewMode && (
          <Col md={3}>
            <div className="bg-white border rounded p-3 h-100 d-flex flex-column">
              <h6 className="fw-bold mb-1">Properties</h6>
              <p className="text-muted small mb-4">Manage element properties</p>

              {/* DİNAMİK AYARLAR KISMI */}
              <div
                className="flex-grow-1"
                style={{ overflowY: "auto", overflowX: "hidden" }}
              >
                {!selectedElement ? (
                  <div className="text-center text-muted mt-5 px-2">
                    <p className="small">Choose any item for editing</p>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {/* TEXT */}
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
                            <Button
                              variant={
                                selectedElement?.isBold ? "dark" : "light"
                              }
                              size="sm"
                              className="w-50 fw-medium"
                              onClick={() =>
                                updateSelectedElement(
                                  "isBold",
                                  !selectedElement?.isBold,
                                )
                              }
                            >
                              B Bold
                            </Button>
                            <Button
                              variant={
                                selectedElement?.isItalic ? "dark" : "light"
                              }
                              size="sm"
                              className="w-50 fw-medium"
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
                            <Button
                              size="sm"
                              variant={
                                selectedElement?.textAlign === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="flex-fill"
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

                    {/* IMAGE (Eksikti, eklendi) */}
                    {selectedElement.type === "image" && (
                      <>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-medium small mb-1">
                            Image URL *
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.url ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("url", e.target.value)
                            }
                            className="shadow-none text-muted"
                          />
                        </Form.Group>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-medium small mb-1">
                            Width *
                          </Form.Label>
                          <Form.Select
                            size="sm"
                            className="shadow-none text-muted"
                            value={selectedElement.width ?? "100%"}
                            onChange={(e) =>
                              updateSelectedElement("width", e.target.value)
                            }
                          >
                            <option value="100%">Full Width (100%)</option>
                            <option value="75%">Large (75%)</option>
                            <option value="50%">Medium (50%)</option>
                            <option value="25%">Small (25%)</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-5">
                          <Form.Label className="fw-medium small mb-1">
                            Alignment *
                          </Form.Label>
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="flex-fill"
                              onClick={() =>
                                updateSelectedElement("align", "left")
                              }
                            >
                              <LuAlignLeft size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.align === "center"
                                  ? "dark"
                                  : "light"
                              }
                              className="flex-fill"
                              onClick={() =>
                                updateSelectedElement("align", "center")
                              }
                            >
                              <LuAlignCenter size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="flex-fill"
                              onClick={() =>
                                updateSelectedElement("align", "right")
                              }
                            >
                              <LuAlignRight size={16} />
                            </Button>
                          </div>
                        </Form.Group>
                      </>
                    )}

                    {/* BARCODE (Eksikti, eklendi) */}
                    {selectedElement.type === "barcode" && (
                      <>
                        <Form.Group className="mb-4">
                          <Form.Label className="fw-medium small mb-1">
                            Barcode Value *
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.content ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("content", e.target.value)
                            }
                            className="shadow-none text-muted"
                          />
                        </Form.Group>
                        <Form.Group className="mb-5">
                          <Form.Label className="fw-medium small mb-1">
                            Height *
                          </Form.Label>
                          <Form.Select
                            size="sm"
                            className="shadow-none text-muted"
                            value={selectedElement.height ?? "50px"}
                            onChange={(e) =>
                              updateSelectedElement("height", e.target.value)
                            }
                          >
                            <option value="30px">Short (30px)</option>
                            <option value="50px">Normal (50px)</option>
                            <option value="80px">Tall (80px)</option>
                          </Form.Select>
                        </Form.Group>
                      </>
                    )}

                    {/* DIVIDER */}
                    {selectedElement.type === "divider" && (
                      <div className="text-center text-muted my-4">
                        <p className="small">
                          No adjustible properties for divider.
                        </p>
                      </div>
                    )}

                    {/* 2-COLUMN */}
                    {selectedElement.type === "2-column" && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium small mb-1">
                            Left Column
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.col1 ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("col1", e.target.value)
                            }
                            className="mb-2"
                          />
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col1Align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col1Align", "left")
                              }
                            >
                              <LuAlignLeft size={16} /> Left
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col1Align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col1Align", "right")
                              }
                            >
                              <LuAlignRight size={16} /> Right
                            </Button>
                          </div>
                        </Form.Group>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium small mb-1">
                            Right Column
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.col2 ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("col2", e.target.value)
                            }
                            className="mb-2"
                          />
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col2Align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col2Align", "left")
                              }
                            >
                              <LuAlignLeft size={16} /> Left
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col2Align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col2Align", "right")
                              }
                            >
                              <LuAlignRight size={16} /> Right
                            </Button>
                          </div>
                        </Form.Group>
                      </>
                    )}

                    {/* 3-COLUMN */}
                    {selectedElement.type === "3-column" && (
                      <>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium small mb-1">
                            Left Column (Sol)
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.col1 ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("col1", e.target.value)
                            }
                            className="mb-2"
                          />
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col1Align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col1Align", "left")
                              }
                            >
                              <LuAlignLeft size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col1Align === "center"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col1Align", "center")
                              }
                            >
                              <LuAlignCenter size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col1Align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col1Align", "right")
                              }
                            >
                              <LuAlignRight size={16} />
                            </Button>
                          </div>
                        </Form.Group>
                        <hr
                          className="my-3 text-muted"
                          style={{ opacity: 0.2 }}
                        />
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium small mb-1">
                            Center Column (Orta)
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.col2 ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("col2", e.target.value)
                            }
                            className="mb-2"
                          />
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col2Align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col2Align", "left")
                              }
                            >
                              <LuAlignLeft size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col2Align === "center"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col2Align", "center")
                              }
                            >
                              <LuAlignCenter size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col2Align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col2Align", "right")
                              }
                            >
                              <LuAlignRight size={16} />
                            </Button>
                          </div>
                        </Form.Group>
                        <hr
                          className="my-3 text-muted"
                          style={{ opacity: 0.2 }}
                        />
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-medium small mb-1">
                            Right Column (Sağ)
                          </Form.Label>
                          <Form.Control
                            size="sm"
                            type="text"
                            value={selectedElement.col3 ?? ""}
                            onChange={(e) =>
                              updateSelectedElement("col3", e.target.value)
                            }
                            className="mb-2"
                          />
                          <div className="d-flex gap-2">
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col3Align === "left"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col3Align", "left")
                              }
                            >
                              <LuAlignLeft size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col3Align === "center"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col3Align", "center")
                              }
                            >
                              <LuAlignCenter size={16} />
                            </Button>
                            <Button
                              size="sm"
                              variant={
                                selectedElement.col3Align === "right"
                                  ? "dark"
                                  : "light"
                              }
                              className="w-50"
                              onClick={() =>
                                updateSelectedElement("col3Align", "right")
                              }
                            >
                              <LuAlignRight size={16} />
                            </Button>
                          </div>
                        </Form.Group>
                      </>
                    )}

                    {/* SİLME BUTONU (Sadece eleman seçiliyken) */}
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-3 mb-2 fw-medium"
                      onClick={() => {
                        setElements((prev) =>
                          prev.filter((el) => el.id !== selectedId),
                        );
                        setSelectedId(null); // BUG FIX: Başına set eklendi!
                      }}
                    >
                      Delete Selected Element
                    </Button>
                  </div>
                )}
              </div>

              {/* 2. KISIM: SABİT ALT BUTONLAR (Her zaman görünür) */}
              <div className="mt-auto pt-3 border-top d-flex flex-column gap-2">
                <Button
                  style={{ backgroundColor: "#1e8f81", border: "none" }}
                  className="d-flex justify-content-center align-items-center gap-2 fw-medium py-2"
                  onClick={handleSaveTemplate}
                >
                  <LuSave size={16} /> Save Template
                </Button>
                <Button
                  variant="light"
                  className="border d-flex justify-content-center align-items-center gap-2 fw-medium bg-white text-dark py-2"
                  onClick={() => setIsPreviewMode(true)}
                >
                  <LuEye size={16} /> Preview Template
                </Button>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default AddTemplate;
