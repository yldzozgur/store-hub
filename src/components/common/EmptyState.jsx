import React from "react";

import { Button } from "react-bootstrap";
import { LuPrinter } from "react-icons/lu";
const EmptyState = () => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center"
      style={{ minHeight: "60vh", marginTop: "40px" }}
    >
      <div
        className="rounded-circle d-flex align-items-center justify-content-center mb-4"
        style={{ width: "140px", height: "140px", backgroundColor: "#f8f9fa" }}
      >
        <div
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: "70px",
            height: "70px",
            backgroundColor: "#0f172a",
            color: "#fff",
          }}
        >
          <LuPrinter size={32} />
        </div>
      </div>
      <h4 className="fw-bold mt-2" style={{ color: "#1e293b" }}>
        Start Designing Receipt or Label{" "}
      </h4>
      <p className="text-muted mb-4">
        Let's Start Designing Your Receipt or Label
      </p>
      <Button
        className="px-4 py-2 border-0 fw-medium"
        style={{ backgroundColor: "#1e8f81", borderRadius: "8px" }}
      >
        + Add Your First Template
      </Button>
    </div>
  );
};

export default EmptyState;
