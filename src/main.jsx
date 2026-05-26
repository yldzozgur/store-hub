// React'in geliştirme modunda hataları yakalamak için kullandığı sarmalayıcı (wrapper) bileşeni içeri alıyoruz.
import { StrictMode } from 'react'
// React 19 ile gelen yeni render API'sini içeri alıyoruz; uygulamayı DOM'a bağlamak için kullanılır.
import { createRoot } from 'react-dom/client'

// Kendi yazdığımız ana uygulama bileşenini içeri alıyoruz (App.jsx dosyasından).
import App from './App.jsx'

// index.html dosyasındaki id'si "root" olan div'i seçip React kökünü orada başlatıyoruz; ardından App'i ekrana basıyoruz.
createRoot(document.getElementById('root')).render(
  // StrictMode geliştirme sırasında potansiyel sorunları (eski API kullanımı, yan etkiler) konsolda uyarır.
  <StrictMode>
    {/* Tüm uygulamamızı temsil eden App bileşenini buraya yerleştiriyoruz. */}
    <App />
  </StrictMode>,
)
