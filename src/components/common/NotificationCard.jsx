import React from "react";
import {
  LuHardDrive,
  LuBattery,
  LuBarcode,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";
const NotificationCard = ({ type, title, subtitle, onClose }) => {
  const config = {
    success: { color: "#1e8f81", icon: <LuHardDrive size={20} /> },
    warning: { color: "#f59e0b", icon: <LuBattery size={20} /> },
    info: { color: "#3b82f6", icon: <LuBarcode size={20} /> },
    error: { color: "#ef4444", icon: <LuTriangleAlert size={20} /> },
  };
  const currentConfig = config[type] || config.info;

  return (
    <div
      className="d-flex align-items-start justify-content-between p-2 rounded bg-white flex-grow-1"
      style={{
        border: `1px solid ${currentConfig.color}40`, // Kenarlık rengi (sonundaki 40 saydamlık katar)
        borderLeft: `4px solid ${currentConfig.color}`, // Sol taraftaki kalın vurgu çizgisi
        minWidth: "220px",
      }}
    >
      <div className="d-flex align-items-center gap-2">
        <div style={{ color: currentConfig.color }}>{currentConfig.icon}</div>
        <div style={{ fontSize: "12px", lineHeight: "1.2" }}>
          <strong
            style={{
              color: currentConfig.color,
              display: "block",
              marginBottom: "2px",
            }}
          >
            {title}
          </strong>
          <span className="text-muted">{subtitle}</span>
        </div>
      </div>
      <button
        onClick={onClose}
        className="btn btn-sm border-0 p-0 ms-2"
        style={{ color: currentConfig.color }}
      >
        <LuX size={16} />
      </button>
    </div>
  );
};

export default NotificationCard;
