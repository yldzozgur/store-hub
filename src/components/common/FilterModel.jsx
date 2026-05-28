import React from "react";
import { Modal, Button, Form, Bagel } from "react-bootstrap";
import { LuChevronUp } from "react-icons/lu";

const FilterModel = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered size="sm">
      <Modal.Header className="border-bottom-0 pb-0 pt-4 px-4">
        <div className="d-flex align-items-center gap-2">
          <h5 className="mb-0 fw-bold">Filters</h5>
          <Badge
            bg="transparent"
            className="rounded-circle d-flex align-items-center justify-content-center 
                    "
            style={{
              width: "24px",
              height: "24px",
              backgroundColor: "#1e8f81",
            }}
          >
            1
          </Badge>
        </div>
      </Modal.Header>
    </Modal>
  );
};

export default FilterModel;
