import { renderCards } from "./ui.js";

//*data'ya her yerde erişebilmek için global değişken tanımlandı
let data;

//* Menü verilerini json dosyasından çeken fonksiyon
async function fetchMenu() {
  // * api'dan verileri al
  const res = await fetch("db.json");
  //* json verisini js formatına çevir
  data = await res.json();
}

//* Syafanın yüklenme olayını izle
window.addEventListener("DOMContentLoaded", () => {
  //*verileri çeken fonksiyonu çalıştır
  fetchMenu()
    //*fonksiyon başarılı olduğunda kartları ekrana basan fonksiyonu çalıştırır
    .then(() => renderCards(data.menu));
});
//*Buttons alanındaki imputları çağır
const inputs = document.querySelectorAll("#buttons input");

//*input dizisini dön :
inputs.forEach((input) => {
  //*inputların chane eventini dinle
  input.addEventListener("change", () => {
    //*seçilen kategori
    const selected = input.id;
    //*eğer hepsi seçiliyse bütün datayı ekrana bas
    if (selected === "all") {
      renderCards(data.menu);
      //*eğer hepsi seçili değilse menu elemanlarından seçilen kategriyi ekrana bas
    } else {
      //*menü elemanlarından seçilen kategoriye ait olanları filtrele
      const filtered = data.menu.filter((i) => i.category === selected);
      //*filtrelenen datayı ekrana bas

      renderCards(filtered);
    }
  });
});
