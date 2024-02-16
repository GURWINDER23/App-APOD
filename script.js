const dateForm = document.getElementById("dateForm");
const dateInput = document.getElementById("dateInput");
const apodContainer = document.getElementById("apodContainer");
const favoritesContainer = document.getElementById("favoritesContainer");


/*dateForm.addEventListener("submit", async (e)  => {
  console.log("hii it working");
  "date":"2022-03-27",
  "explanation":"why would the surface of titan",
  "hdurl":"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwallpapers.com%2Fimages%2Fhd%2Fdeep-space-hd-dt4vnn5p2qn8urx2.jpg&tbnid=hJ0wdsJspXHS9M&vet=12ahUKEwjpoYi_m66EAxVlAWIAHTR8BcsQMygBegQIARB3..i&imgrefurl=https%3A%2F%2Fwallpapers.com%2Fdeep-space-hd&docid=11j-jDxiXmZK0M&w=1920&h=1080&q=hd%20space%20wallpapers&ved=2ahUKEwjpoYi_m66EAxVlAWIAHTR8BcsQMygBegQIARB3";

  //const date = dateInput.value;
  //const apodData = await fetchApod(date);
  //displayApod(apodData);
});
*/


dateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const date = dateInput.value;
  const apodData = await fetchApod(date);
  displayApod(apodData);
});

document.addEventListener("DOMContentLoaded", () => {
  const favorites = getFavoritesFromLocalStorage();
  displayFavorites(favorites);
});

apodContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("apodImg")) {
    const hdUrl = e.target.dataset.hdurl;
    window.open(hdUrl);
  }
  if (e.target.classList.contains("favBtn")) {
    const apodItem = e.target.closest(".apodItem");
    const apodData = {
      title: apodItem.querySelector("h2").textContent,
      date: apodItem.querySelector(".date").textContent,
      explanation: apodItem.querySelector(".explanation").textContent,
      url: apodItem.querySelector(".apodImg").src,
      hdurl: apodItem.querySelector(".apodImg").dataset.hdurl,
    };
    addToFavorites(apodData);
  }
});

favoritesContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("favoriteImg")) {
    const hdUrl = e.target.dataset.hdurl;
    window.open(hdUrl);
  }
  if (e.target.classList.contains("deleteBtn")) {
    const favoriteItem = e.target.closest(".favoriteItem");
    const url = favoriteItem.querySelector(".favoriteImg").src;
    removeFromFavorites(url);
  }
});

async function fetchApod(date) {
  const apiKey = "jZXfKoN5w5icLe7jqtsHToovRdg9KM6w1FnA9OoL";
  const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function displayApod(apodData) {
  const apodItem = document.createElement("div");
  apodItem.classList.add("apodItem");
  apodItem.innerHTML = `
  <div class="main-container">
        <h2 class="title">${apodData.title}</h2>
        <p class="date">${apodData.date}</p>
        <img class="apodImg" src="${apodData.url}" data-hdurl="${apodData.hdurl}" alt="${apodData.title}">
        <p class="explanation">${apodData.explanation}</p>
        <button class="favBtn">Add to Favorites</button>
        </div>
    `;
  apodContainer.innerHTML = "";
  apodContainer.appendChild(apodItem);
}

function getFavoritesFromLocalStorage() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function displayFavorites(favorites) {
  favoritesContainer.innerHTML = "";
  favorites.forEach((apodData) => {
    const favoriteItem = document.createElement("div");
    favoriteItem.classList.add("favoriteItem");
    favoriteItem.innerHTML = `
        <img class="favoriteImg" src="${apodData.url}" data-hdurl="${apodData.hdurl}" alt="${apodData.title}" width="100px" height="100px">
        <div class="content">
            <h3>${apodData.title}</h3>
            <p>Date: ${apodData.date}</p>
            <button class="deleteBtn">Delete</button>
            </div>
        `;
    favoritesContainer.appendChild(favoriteItem);
  });
}

function addToFavorites(apodData) {
  const favorites = getFavoritesFromLocalStorage();
  favorites.push(apodData);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  displayFavorites(favorites);
}

function removeFromFavorites(url) {
  const favorites = getFavoritesFromLocalStorage();
  const updatedFavorites = favorites.filter((apodData) => apodData.url !== url);
  localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  displayFavorites(updatedFavorites);
}
