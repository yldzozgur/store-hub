import React from "react";
import { Table, Button } from "react-bootstrap";
import { LuFileText, LuTag, LuFilter, LuPlus } from "react-icons/lu";

const mockData = [
  {
    id: 1,
    name: "Default Receipt",
    type: "Receipt",
    size: "3-inch (80mm)",
    status: "Active",
    devices: 4,
    modified: "12/11/2025 12:09 pm",
  },
  {
    id: 2,
    name: "Minimal Receipt",
    type: "Receipt",
    size: "2-inch (58mm)",
    status: "Active",
    devices: 2,
    modified: "12/01/2025 11:14 am",
  },
  {
    id: 3,
    name: "Detailed Receipt",
    type: "Receipt",
    size: "3-inch (80mm)",
    status: "Inactive",
    devices: 0,
    modified: "11/07/2025 09:22 am",
  },
  {
    id: 4,
    name: "Product Label - Small",
    type: "Label",
    size: "40 x 30 mm",
    status: "Active",
    devices: 1,
    modified: "11/06/2025 04:21 pm",
  },
  {
    id: 5,
    name: "Product Label - Medium",
    type: "Label",
    size: "50 x 30 mm",
    status: "Active",
    devices: 3,
    modified: "11/06/2025 03:20 pm",
  },
  {
    id: 6,
    name: "Product Label - Large",
    type: "Label",
    size: "60 x 40 mm",
    status: "Inactive",
    devices: 0,
    modified: "11/06/2025 02:18 pm",
  },
];
const TemplateList = () => {
  const [activeTab, setActiveTab] = React.useState("All");

  const filteredData = mockData.filter((item) => {
    if (activeTab === "All") return true;
    if (activeTab === "Receipts" && item.type === "Receipt") return true;
    if (activeTab === "Labels" && item.type === "Label") return true;
    return false;
  });

  return (
    <div className="bg-white rounded border p-3">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex gap-2">
          <Button
            variant={activeTab === "All" ? "dark" : "light"}
            onClick={() => setActiveTab("All")}
            className={
              activeTab !== "All"
                ? "text-muted border-0 bg-transparent fw-medium"
                : "border-0 fw-medium"
            }
          >
            All Templates
          </Button>
          <Button
            variant={activeTab === "Labels" ? "dark" : "light"}
            className={
              activeTab !== "Labels"
                ? "text-muted border-0 bg-transparent fw-medium"
                : "border-0 fw-medium"
            }
            onClick={() => setActiveTab("Labels")}
          >
            Labels
          </Button>
        </div>
        <div className="d-flex gap-2">
          <Button
            variant="light"
            className="border d-flex align-items-center gap-2 fw-medium text-muted bg-white"
          >
            <LuFilter size={16} /> Filter By
          </Button>
          <Button
            style={{ backgroundColor: "#1e8f81", border: "none" }}
            className="d-flex align-items-center gap-2 fw-medium"
          >
            <LuPlus size={16} /> Add Template
          </Button>
        </div>
      </div>

      <Table responsive hover className="align-middle mb-0">
        <thead className="table-light text-muted" style={{ fontSize: "13px" }}>
          <tr>
            <th className="fw-medium">Template Name</th>
            <th className="fw-medium">Type</th>
            <th className="fw-medium">Size</th>
            <th className="fw-medium">Status</th>
            <th className="fw-medium">Devices</th>
            <th className="fw-medium">Last Modified</th>
          </tr>
        </thead>
        <tbody style={{ fontSize: "14px" }}>
          {filteredData.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
                    {item.type === "Receipt" ? (
                      <LuFileText size={16} />
                    ) : (
                      <LuTag size={16} />
                    )}
                  </div>
                  <span className="fw-medium text-dark">{item.name}</span>
                </div>
              </td>
              <td>{item.type}</td>
              <td>{item.size}</td>
              <td>
                <div
                  className="d-inline-flex align-items-center gap-2 border rounded px-2 py-1"
                  style={{ fontSize: "12px" }}
                >
                  <span
                    className="rounded-circle"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        item.status === "Active" ? "#198754" : "#adb5bd",
                    }}
                  />
                  <span
                    className={
                      item.status === "Active"
                        ? "text-success fw-medium"
                        : "text-muted fw-medium"
                    }
                  >
                    {item.status}
                  </span>
                </div>
              </td>
              <td className="fw-medium text dark">{item.devices}</td>
              <td className="text-muted">{item.modified}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default TemplateList;
