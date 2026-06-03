import React, { useState } from "react";
// Kendi yazdığımız genel CSS dosyasını yüklüyoruz (sıfırlama ve font ayarları için).
import "./App.css";

// Bootstrap'in hazır CSS'ini yüklüyoruz; grid, butonlar, renkler vs. buradan gelir.
import "bootstrap/dist/css/bootstrap.min.css";
// Sayfa düzenini (sidebar + topbar + içerik) sağlayan bileşeni içeri alıyoruz.
import DashboardLayout from "./layouts/DashboardLayout";
// Şu anda gösterilecek sayfa: Receipt & Label Design.
import ReceiptLabelDesign from "./pages/ReceiptLabelDesign";
import EmptyState from "./components/common/EmptyState";
// Uygulamanın kök bileşeni; tarayıcıda görünen her şeyin başlangıç noktasıdır.
function App() {
  const [activePage, setActivePage] = useState("dashboard");
  return (
    // Fragment (<>) JSX'te birden çok kardeş elementi tek bir parent olmadan döndürmemizi sağlar.
    <>
      {/* DashboardLayout sayfa iskeletini kurar; içerideki children'ı sağ alana yerleştirir. */}
      <DashboardLayout activePage={activePage} setActivePage={setActivePage}>
        {/* DashboardLayout'un içine "children" olarak gönderilen aktif sayfa. */}

        {/* {activePage === "dashboard" ? <EmptyState /> : <ReceiptLabelDesign />} */}
        <ReceiptLabelDesign />
      </DashboardLayout>
    </>
  );
}

// App bileşenini dışa açıyoruz ki main.jsx kullanabilsin.
export default App;
