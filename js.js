// https://jsonplaceholder.typicode.com/users
let users = document.querySelector(".users");
let searchInput = document.querySelector("input");
let searchBtn = document.querySelector(".search-btn");
let searchAllCountries = document.querySelector(".all-btn");
let up = document.querySelector(".up");
up.addEventListener("click", () => {
  window.scroll(0, 0);
});

let allCountries;

getCountries();
function getCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((user) => user.json())
    .then((res) => {
      console.log(res);
      allCountries = res;
      res.map((el) => {
        let userImg = document.createElement("img");
        let countrieName = document.createElement("h3");
        let countriePopulation = document.createElement("span");
        let countrieArea = document.createElement("span");
        let div = document.createElement("div");
        userImg.src = el.flags.png;
        countrieName.innerText = el.name.common;
        countriePopulation.innerText = `population: ${el.population}`;
        countrieArea.innerText = `area: ${el.area} km²`;
        div.append(userImg);
        div.append(countrieName);
        div.append(countriePopulation);
        div.append(countrieArea);
        users.append(div);
      });
    });
}

function getSearchCountries() {
  fetch(`https://restcountries.com/v3.1/name/${searchInput.value}`)
    .then((user) => user.json())
    .then((res) => {
      console.log(res);
      res.map((el) => {
        let userImg = document.createElement("img");
        let countrieName = document.createElement("h3");
        let countriePopulation = document.createElement("span");
        let countrieArea = document.createElement("span");
        let div = document.createElement("div");
        userImg.src = el.flags.png;
        countrieName.innerText = el.name.common;
        countriePopulation.innerText = `population: ${el.population}`;
        countrieArea.innerText = `area: ${el.area} km²`;
        div.append(userImg);
        div.append(countrieName);
        div.append(countriePopulation);
        div.append(countrieArea);
        users.append(div);
      });
    });
  searchInput.value = "";
}
searchAllCountries.addEventListener("click", () => {
  users.innerHTML = "";
  getCountries();
});
searchBtn.addEventListener("click", () => {
  users.innerHTML = "";
  getSearchCountries();
});

searchInput.addEventListener("input", (e) => {
  getFilterCountry(e);
});

function getFilterCountry(e) {
  users.innerHTML = "";
  let a = e.target.value.toUpperCase();
  if (a === "") {
    getCountries();
  }
  //   console.log(a);
  fetch(`https://restcountries.com/v3.1/name/${a}`)
    .then((user) => user.json())
    .then((res) => {
      res = res.filter((el) => el.name.common.toUpperCase().startsWith(a));
      res.map((el) => {
        let userImg = document.createElement("img");
        let countrieName = document.createElement("h3");
        let countriePopulation = document.createElement("span");
        let countrieArea = document.createElement("span");
        let div = document.createElement("div");
        userImg.src = el.flags.png;
        countrieName.innerText = el.name.common;
        countriePopulation.innerText = `population: ${el.population}`;
        countrieArea.innerText = `area: ${el.area} km²`;
        div.append(userImg);
        div.append(countrieName);
        div.append(countriePopulation);
        div.append(countrieArea);
        users.append(div);
      });
    })
    .catch((error) => {
      console.error("Ошибка" + error);
    });
}
const searchBox = document.querySelector(".search");
function getScroll() {
  let scrolled = window.scrollY;
  console.log(scrolled);
  if (scrolled > 600) {
    searchBox.style.position = "fixed";
    searchBox.style.transition = "3s ease";
  }
  if (scrolled < 600) {
    searchBox.style.position = "";
    searchBox.style.transition = "3s ease";
  }
}
window.addEventListener("scroll", getScroll);

// let a = [1, 2, 3, 5, 10];
// let b = a.filter((el) => {
//   return el > 2;
// });
// console.log(b);
// console.log(
//   a.filter((el) => {
//     return el > 5;
//   })
// );
