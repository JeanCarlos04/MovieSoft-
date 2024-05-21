import { getMovie, searchMovie } from "../data/data.js";
import { createLog, createNoLog } from "./components/prefile.js";
const account = document.getElementById("account");
const inputSearch = document.getElementById("inputSearch");
const movies = document.getElementById("movies");
const boxBtnAdd = document.getElementById("boxBtnAdd");
const movie = await getMovie();

const createArticleLog = (id, title, img) => {
  const article = document.createElement("article");
  const divForBtn = document.createElement("div");

  const divContent = document.createElement("div");
  divContent.classList.add("cardForAdmin");

  const btnView = document.createElement("a");
  btnView.classList.add("btnOfCard");
  btnView.textContent = "View";
  btnView.href = location.origin + `/pages/trailer.html?id=${id}`;

  const btnConfigure = document.createElement("a");
  btnConfigure.classList.add("btnOfCard");
  btnConfigure.textContent = "Configure";
  btnConfigure.href = `./pages/edit.html?id=${id}`;

  const imgPort = document.createElement("img");
  imgPort.classList.add("card");
  imgPort.alt = "filmCover";
  imgPort.src = img;

  const p = document.createElement("p");
  p.classList.add("cardTitle");
  p.textContent = title;

  article.addEventListener("mouseenter", () => {
    divForBtn.appendChild(btnView);
    divForBtn.appendChild(btnConfigure);
    divContent.appendChild(divForBtn);
  });

  article.addEventListener("mouseleave", () => {
    divContent.appendChild(divForBtn);
    divContent.removeChild(divForBtn);
  });

  divContent.appendChild(imgPort);
  article.appendChild(divContent);
  article.appendChild(p);

  return article;
};

const createArticleNoLog = (id, title, img) => {
  const article = document.createElement("article");
  article.addEventListener("click", () => {
    location.href = `/pages/trailer.html?id=${id}`;
  });

  const imgPort = document.createElement("img");
  imgPort.classList.add("card");
  imgPort.alt = "filmCover";
  imgPort.src = img;

  const p = document.createElement("p");
  p.classList.add("cardTitle");
  p.textContent = title;

  article.appendChild(imgPort);
  article.appendChild(p);

  return article;
};

const createBtnAdd = () => {
  const btnAdd = document.createElement("button");
  btnAdd.classList.add("btnAdd");
  btnAdd.textContent = "+";
  btnAdd.addEventListener("click", () => {
    location.href = location.origin + "/pages/edit.html";
  });

  return btnAdd;
};

const organizeSearch = (article) => {
  if (localStorage.getItem("User")) {
    account.appendChild(createLog());
    boxBtnAdd.appendChild(createBtnAdd());
    return article.map((e) =>
      movies.appendChild(createArticleLog(e.id, e.title, e.img))
    );
  }
  account.appendChild(createNoLog());
  return article.map((e) =>
    movies.appendChild(createArticleNoLog(e.id, e.title, e.img))
  );
};

inputSearch.addEventListener("keyup", async (e) => {
  const findMovie = await searchMovie(inputSearch.value);
  if(e.keyCode == 13){
    account.innerHTML = null;
    boxBtnAdd.innerHTML = null;
    movies.innerHTML = null;
    findMovie.length > 0 ? organizeSearch(findMovie) : organizeSearch(movie);
  }
});

organizeSearch(movie);
