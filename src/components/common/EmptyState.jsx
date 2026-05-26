// React kütüphanesini içeri alıyoruz; JSX kullanmak için gerekli.
import React from "react";

// Boş bir liste/sayfa durumunda kullanıcıya gösterilecek "boş durum" bileşeni.
// Şu an sadece placeholder; tasarımdaki büyük "Start Designing Receipt or Label" alanı buraya gelecek.
const EmptyState = () => {
  // Şimdilik sadece "EmptyState" yazısını basıyor; ileride ikon + başlık + buton ekleyeceğiz.
  return <div>EmptyState</div>;
};

// Bileşeni dışa açıyoruz; ReceiptLabelDesign sayfası içeri alacak.
export default EmptyState;
