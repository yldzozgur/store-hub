import React from "react";
import { Table, Button } from "react-bootstrap";
import { LuFileText, LuTag, LuFilter, LuPlus } from "react-icons/lu";

// Bu dosyada "şimdilik" gerçek veriyi temsil etmesi için örnek bir liste kullanıyoruz.
// Daha sonra bu liste yerine API'den gelen veri kullanılabilir.
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

// TemplateList isminde bir React component oluşturuyoruz.
// Component, ekranda gösterilecek UI parçalarını üretir.
const TemplateList = () => {
  // activeTab: Kullanıcının hangi sekmede olduğunu tutar.
  // Başlangıçta her şeyi gösterelim diye "All" seçili.
  const [activeTab, setActiveTab] = React.useState("All");

  // activeTab değerine göre mockData içini filtreliyoruz.
  // Sonuç: filteredData, ekranda gösterilecek satırların listesi olur.
  const filteredData = mockData.filter((item) => {
    // "All" seçiliyse hiçbir filtre uygulama, her şeyi göster.
    if (activeTab === "All") return true;

    // Sadece Receipt tipi seçildiyse, item.type "Receipt" ise göster.
    if (activeTab === "Receipts" && item.type === "Receipt") return true;

    // Sadece Label tipi seçildiyse, item.type "Label" ise göster.
    if (activeTab === "Labels" && item.type === "Label") return true;

    // Diğer durumlarda gösterme.
    return false;
  });

  // Component'in JSX çıktısı: ekranda görünen HTML benzeri yapı.
  return (
    // Bu div, tabloyu ve üstteki butonları kapsayan ana kap.
    // className'ler Bootstrap tarzı görünüm sağlar.
    <div className="bg-white rounded border p-3">
      {/* Üst kısım: sol tarafta sekme butonları, sağ tarafta aksiyon butonları */}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {/* Sol taraf: All / Labels gibi sekmeler */}
        <div className="d-flex gap-2">
          {/* All Templates butonu */}
          <Button
            // activeTab "All" ise koyu tema, değilse açık tema.
            variant={activeTab === "All" ? "dark" : "light"}
            // Tıklanınca activeTab'i güncelliyoruz.
            onClick={() => setActiveTab("All")}
            // className ile renk ve yazı stilini ince ayarlıyoruz.
            className={
              activeTab !== "All"
                ? "text-muted border-0 bg-transparent fw-medium"
                : "border-0 fw-medium"
            }
          >
            {/* Butonun görünen yazısı */}
            All Templates
          </Button>
          <Button
            variant={activeTab === "Receipts" ? "dark" : "light"}
            onClick={() => setActiveTab("Receipts")}
            className={
              activeTab !== "Receipts"
                ? "text-muted border-0 bg-transparent fw-medium"
                : "border-0 fw-medium"
            }
          >
            Receipts
          </Button>
          {/* Labels butonu */}
          <Button
            variant={activeTab === "Labels" ? "dark" : "light"}
            // Aktif değilse renkler yumuşatılıyor.
            className={
              activeTab !== "Labels"
                ? "text-muted border-0 bg-transparent fw-medium"
                : "border-0 fw-medium"
            }
            // Tıklanınca Labels'a geç.
            onClick={() => setActiveTab("Labels")}
          >
            Labels
          </Button>
        </div>

        {/* Sağ taraf: Filter ve Add Template butonları */}
        <div className="d-flex gap-2">
          {/* Filter By butonu (şu an sadece görsel; ileride modal açabilir) */}
          <Button
            variant="light"
            className="border d-flex align-items-center gap-2 fw-medium text-muted bg-white"
          >
            {/* Filtre ikon */}
            <LuFilter size={16} /> Filter By
          </Button>

          {/* Add Template butonu */}
          <Button
            // inline style ile yeşil renk veriyoruz.
            style={{ backgroundColor: "#1e8f81", border: "none" }}
            // Flex düzen + boşluklar
            className="d-flex align-items-center gap-2 fw-medium"
          >
            {/* Artı ikon */}
            <LuPlus size={16} /> Add Template
          </Button>
        </div>
      </div>

      {/* Tablo: responsive olduğu için ekran küçülünce taşma azaltır */}
      <Table responsive hover className="align-middle mb-0">
        {/* Tablonun başlığı */}
        <thead className="table-light text-muted" style={{ fontSize: "13px" }}>
          <tr>
            {/* Sütun başlıkları */}
            <th className="fw-medium">Template Name</th>
            <th className="fw-medium">Type</th>
            <th className="fw-medium">Size</th>
            <th className="fw-medium">Status</th>
            <th className="fw-medium">Devices Using</th>
            <th className="fw-medium">Last Modified</th>
          </tr>
        </thead>

        {/* Tablo gövdesi: satırlar burada listelenir */}
        <tbody style={{ fontSize: "14px" }}>
          {/* filteredData içindeki her elemanı tablo satırı olarak basıyoruz */}
          {filteredData.map((item) => (
            // key React'in listeyi verimli güncellemesi için kullanılır.
            <tr key={item.id}>
              {/* Template Name sütunu */}
              <td>
                {/* Bu hücre içinde ikon + isim yan yana */}
                <div className="d-flex align-items-center gap-2">
                  {/* İkonun kutusu */}
                  <div className="bg-light rounded p-2 d-flex align-items-center justify-content-center">
                    {/* item.type'e göre farklı ikon gösteriyoruz.
                        - Receipt ise dosya ikonunu
                        - değilse (Label ise) tag ikonunu */}
                    {item.type === "Receipt" ? (
                      <LuFileText size={16} />
                    ) : (
                      <LuTag size={16} />
                    )}
                  </div>

                  {/* Şablonun adı */}
                  <span className="fw-medium text-dark">{item.name}</span>
                </div>
              </td>

              {/* Type sütunu */}
              <td>{item.type}</td>

              {/* Size sütunu */}
              <td>{item.size}</td>

              {/* Status sütunu */}
              <td>
                {/* Status için küçük bir etiket tarzı kutu */}
                <div
                  className="d-inline-flex align-items-center gap-2 border rounded px-2 py-1"
                  style={{ fontSize: "12px" }}
                >
                  {/* Soldaki renkli nokta: Active ise yeşil, değilse gri */}
                  <span
                    className="rounded-circle"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor:
                        item.status === "Active" ? "#198754" : "#adb5bd",
                    }}
                  />

                  {/* Status yazısı: Active ise green text, değilse muted */}
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

              {/* Devices Using sütunu */}
              <td className="fw-medium text-dark">{item.devices}</td>

              {/* Last Modified sütunu */}
              <td className="text-muted">{item.modified}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

// Bu component'i dışarıdan kullanabilmek için export ediyoruz.
export default TemplateList;
