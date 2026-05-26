// Lucide ikon kütüphanesinden zil ve aşağı-ok ikonlarını içeri alıyoruz.
import { LuRefreshCw, LuChevronDown } from "react-icons/lu";

// title prop'unu dışarıdan alıyoruz; başlık metni böylece dinamik olur.
const Topbar = ({ title, user, onRefresh }) => {
  const currentUser = user || {
    name: "Hasan Asad Mahdavi",
    role: "Store Manager",
    initials: "HA", // Avatar içindeki baş harfler
  };
  return (
    // d-flex: flexbox, align-items-center: dikeyde ortala, justify-content-between: iki ucu uçlara yasla, px-4 py-3: iç boşluk, border-bottom: alt çizgi, bg-white: beyaz arka plan.
    <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom bg-white">
      {/* mb-0: alt margin sıfır, fw-semibold: yarı kalın font; ekrana sayfanın başlığını basar. */}
      <h4 className="mb-0 fw-semibold">{title}</h4>
      {/* Sağ taraf: bildirim butonu + kullanıcı bilgisi; gap-3 ile aralarına boşluk koyuyoruz. */}
      <div className="d-flex align-items-center gap-3">
        {/* Yuvarlak bildirim butonu; position-relative kırmızı noktayı konumlandırmak için lazım. */}
        <button
          onClick={onRefresh}
          className="btn btn-light rounded-circle d-flex align-items-center justify-content-center position-relative"
          // Butonu sabit 40x40 boyutunda yapıyoruz.
          style={{ width: 40, height: 40 }}
        >
          {/* Zil ikonu; size=18 ile boyutunu ayarlıyoruz. */}
          <LuRefreshCw size={18} />
          {/* Sağ üst köşede kırmızı bildirim noktası; position-absolute ile parent'a göre konumlanır. */}
          <span
            className="position-absolute bg-danger rounded-circle"
            style={{ width: 8, height: 8, top: 6, right: 6 }}
          />
        </button>
        {/* Kullanıcı bilgisi: avatar + isim + ünvan + ok ikonu. */}
        <div className="d-flex align-items-center gap-2">
          {/* Yuvarlak avatar; içinde kullanıcının baş harfleri (JD = John Doe). */}
          <div
            className="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center fw-bold"
            style={{ width: 40, height: 40 }}
          >
            {currentUser.initials}
          </div>
          {/* İsim ve ünvanı yan yana değil üst üste göstermek için ayrı bir div. */}
          <div>
            {/* d-block: blok eleman gibi davransın, font 14px. */}
            <strong className="d-block" style={{ fontSize: 14 }}>
              {currentUser.name}
            </strong>
            {/* text-muted: silik gri renk; alt başlık gibi durur. */}
            <small className="text-muted">{currentUser.role}</small>
          </div>
          {/* Profil menüsünün açılabileceğini gösteren küçük aşağı-ok. */}
          <LuChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

// Bileşeni dışa açıyoruz; DashboardLayout içeri alacak.
export default Topbar;
