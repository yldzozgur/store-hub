// React kütüphanesini içeri alıyoruz; JSX kullanmak için gerekli.
import React from "react";
// Henüz şablon yokken gösterilecek boş durum bileşeni.
import EmptyState from "../components/common/EmptyState";
import NotificationCard from "../components/common/NotificationCard";

// Receipt & Label Design sayfasının ana bileşeni; DashboardLayout'un sağ tarafında render edilir.
const ReceiptLabelDesign = () => {
  return (
    // Sayfanın en dış sarmalayıcı div'i; ileride üstte bildirim şeritleri buraya eklenecek.
    <div>
      {/* Sayfa başlığı; ileride Topbar'daki başlıkla çakışmaması için kaldırılabilir. */}
      <NotificationCard />
      {/* Henüz şablon yokken büyük "Start Designing..." kartını gösterecek bileşen. */}
      <EmptyState />
    </div>
  );
};

// Bileşeni dışa açıyoruz; App.jsx içeri alıyor.
export default ReceiptLabelDesign;
