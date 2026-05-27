import React, { useState } from "react";
import TemplateList from "../components/common/TemplateList";
import NotificationCard from "../components/common/NotificationCard";

const ReceiptLabelDesign = () => {
  // 1. Ekran görüntüsündeki 4 bildirimi veri (state) olarak tanımlıyoruz.
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "New GateWays Added",
      subtitle: "0011245672289 - 10:32am",
    },
    {
      id: 2,
      type: "warning",
      title: "Low battery level detected",
      subtitle: "for tag 0011245672289",
    },
    {
      id: 3,
      type: "info",
      title: "New Product Added",
      subtitle: "0011245672289 at 10:32 on 01/11/2025",
    },
    {
      id: 4,
      type: "error", // NotificationCard'da danger yerine error yazmıştın, onunla eşleşmeli
      title: "Connection Lost",
      subtitle: "for tag 0011245672289",
    },
  ]);

  // 2. Çarpı (X) butonuna tıklandığında çalışacak silme fonksiyonu
  const handleClose = (idToRemove) => {
    setNotifications((prev) => prev.filter((n) => n.id !== idToRemove));
  };

  return (
    <div>
      {/* 3. Bildirimleri yan yana dizmek için map kullanıyoruz */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        {notifications.map((notification) => (
          <NotificationCard
            key={notification.id}
            type={notification.type}
            title={notification.title}
            subtitle={notification.subtitle}
            onClose={() => handleClose(notification.id)}
          />
        ))}
      </div>

      <TemplateList />
    </div>
  );
};

export default ReceiptLabelDesign;
