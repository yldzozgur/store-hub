import React, { useState } from "react";
import TemplateList from "../components/common/TemplateList";
import NotificationCard from "../components/common/NotificationCard";
import AddTemplate from "./AddTemplate";

// Başlangıçta tabloda görünsün diye sahte verimizi buraya aldık
const initialMockData = [
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
];

const ReceiptLabelDesign = () => {
  const [isAdding, setIsAdding] = useState(false);

  // 1. Şablonlarımızı tutacağımız ANA STATE (Veri Deposu)
  const [templates, setTemplates] = useState(initialMockData);

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
      type: "error",
      title: "Connection Lost",
      subtitle: "for tag 0011245672289",
    },
  ]);

  const handleClose = (idToRemove) => {
    setNotifications((prev) => prev.filter((n) => n.id !== idToRemove));
  };

  // 2. AddTemplate'den gelen yeni tasarımı listeye ekleyen fonksiyon
  const handleSaveTemplate = (newTemplateData) => {
    // Yeni şablona tablo için gerekli formatı veriyoruz
    const newTemplate = {
      id: Date.now(), // Benzersiz ID
      name: "Custom " + newTemplateData.templateType, // İsim
      type: newTemplateData.templateType, // Receipt veya Label
      size: newTemplateData.paperSize, // Kağıt boyutu
      status: "Active",
      devices: 0,
      modified: newTemplateData.createdAt,

      // Gerçek tasarım verisini de içinde saklıyoruz ki Edit yaparken kullanabilelim!
      designData: newTemplateData.designElements,
    };

    // Yeni şablonu listenin en başına ekle
    setTemplates((prev) => [newTemplate, ...prev]);
    setIsAdding(false); // Ekleme ekranını kapat
  };

  // EĞER EKLEME MODUNDAYSAK ADD TEMPLATE SAYFASINI GÖSTER
  if (isAdding) {
    return (
      <AddTemplate
        onBack={() => setIsAdding(false)}
        onSave={handleSaveTemplate} // <-- Kaydetme fonksiyonunu prop olarak gönderdik!
      />
    );
  }

  // EKLEME MODUNDA DEĞİLSEK TABLOYU GÖSTER
  return (
    <div>
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

      {/* Tabloya verilerimizi gönderiyoruz */}
      <TemplateList
        templates={templates} // <-- Veri deposunu tabloya gönderdik
        onAdd={() => setIsAdding(true)}
      />
    </div>
  );
};

export default ReceiptLabelDesign;
