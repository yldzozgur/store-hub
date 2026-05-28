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

        <Button
          variant="link"
          onClick={onHide}
          className="text-decoration-none p-0 fw-medium"
          style={{ color: "#1e8f81", fontSize: "14px" }}
        >
          Clear All
        </Button>
      </Modal.Header>

      <Modal.Body className="px-4 py-4">
        <Form>
          <Form.Group className="mb-4">
            <Form.Label
              className="fw-medium text-dark"
              style={{ fontSize: "14px" }}
            >
              Type
            </Form.Label>
            <Form.Select
              className="text-muted shadow-none"
              style={{ fontSize: "14px" }}
            >
              <option>Select Type</option>
              <option value="Receipt">Receipt</option>
              <option value="Label">Label</option>{" "}
            </Form.Select>
          </Form.Group>

          <Form.Group>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <Form.Label
                className="fw-medium text-dark mb-0"
                style={{ fontSize: "14px" }}
              >
                Status
              </Form.Label>
              <LuChevronUp size={18} className="text-dark" />
            </div>

            <div
              className="d-flex flex-column gap-2"
              style={{ fontSize: "14px" }}
            >
              <Form.Check
                type="checkbox"
                label="All"
                id="status-all"
                defaultChecked
                className="text-muted"
              />
              <Form.Check
                type="checkbox"
                label="Active"
                id="status-active"
                className="text-muted"
              />
              <Form.Check
                type="checkbox"
                label="Inactive"
                id="status-inactive"
                className="text-muted"
              />
              <Form.Check
                type="checkbox"
                label="Pending"
                id="status-pending"
                className="text-muted"
              />
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer className="border-top-0 pt-0 pb-4 px-4 d-flex gap-2 flex-nowrap">
        <Button
          variant="light"
          onClick={onHide}
          className="w-50 border bg-white fw-medium text-dark"
        >
          Cancel
        </Button>

        <Button
          className="w-50 border-0 fw-medium"
          style={{ backgroundColor: "#1e8f81" }}
        >
          Apply Filters
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModel;
