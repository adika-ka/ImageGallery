const API_KEY = "ev5wXJ5Um-ccLE_fzUqO6Xpp_boCaJhDA-plKGxzLGA";
const cardList = document.querySelectorAll(".card");
const input = document.querySelector("#search");
const searchBtn = document.querySelector(".btn-after");
const gallery = document.getElementById("image-gallery");

document.addEventListener("DOMContentLoaded", function () {
  async function fetchImages() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos?client_id=${API_KEY}`
      );
      const data = await response.json();
      data.forEach((image, index) => {
        if (index < cardList.length) {
          const img = `<img class="image-gallery__img" src="${image.urls.small}" alt="${image.alt_description}" />`;
          const currentCard = cardList[index];
          currentCard.innerHTML = img;
        }
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  fetchImages();
});

let inputValue = "";

searchBtn.addEventListener("click", () => {
  inputValue = input.value;
  searchImg(inputValue);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    inputValue = input.value;
    searchImg(inputValue);
  }
});

async function searchImg(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

function displayImages(images) {
  gallery.innerHTML = "";
  images.forEach((image) => {
    const img = `<img class="image-gallery__img" src="${image.urls.small}" alt="${image.alt_description}" />`;
    const liElement = document.createElement("li");
    liElement.className = "card";
    liElement.innerHTML = img;
    gallery.appendChild(liElement);
  });
}
