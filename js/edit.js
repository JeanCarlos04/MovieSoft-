import {
  getMovie,
  postMovie,
  patchMovie,
  deleteMovie,
  getVideo,
} from "../data/data.js";
import { createLog, createNoLog } from "./components/prefile.js";
const account = document.getElementById("account");
const preView = document.getElementById("preView");
const trailer = document.getElementById("trailer");
const form = document.getElementById("form");
const id = new URLSearchParams(location.search).get("id");

const movie = await getMovie();
const filter = movie.filter((e) => e.id == id);

const iframe = document.createElement("iframe");
const img = document.createElement("img");
const p = document.createElement("p");

if (filter.length > 0) {
  /* Mostrar video*/
  iframe.title = "trailer";
  iframe.src = filter[0].trailer;
  iframe.classList.add("video");
  iframe.setAttribute("allowfullscreen", "");
  trailer.appendChild(iframe);

  /* Mostrar img */
  img.alt = "filmCover";
  img.src = filter[0].img;
  img.classList.add("imgPreView");

  /* Rellenar p */
  p.textContent = filter[0].title;

  preView.appendChild(img);
  preView.appendChild(p);
}

/* Add value input */
function copyData() {
  form[0].value = filter[0].title;
  form[1].value = filter[0].year;
  form[2].value = filter[0].director;
  form[3].value = filter[0].actors
    .map((e) => {
      return e.name;
    })
    .join(",");
  form[4].value = filter[0].review;
  form[5].value = filter[0].img;
  form[6].value = filter[0].trailer;
}

function getBody() {
  const actors = form[3].value.split(",").map((name, id) => ({ id, name }));

  const body = {
    title: form[0].value,
    year: form[1].value,
    director: form[2].value,
    actors,
    review: form[4].value,
    img: form[5].value,
    trailer: getVideo(form[6].value),
  };

  return body;
}

function addInfArticle() {
  iframe.title = "trailer";
  iframe.src = getVideo(form[6].value);
  iframe.classList.add("video");
  trailer.appendChild(iframe);

  img.src = form[5].value;
  img.classList.add("imgPreView");

  p.textContent = form[0].value;
  preView.appendChild(img);
  preView.appendChild(p);
}

if (id) {
  copyData();
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addInfArticle();
    patchMovie(id, getBody());
  });
} else {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    addInfArticle();
    postMovie(getBody());
  });
}

/*Delete*/
const btnDelete = document.getElementById("btnDelete");
btnDelete.addEventListener("click", () => {
  deleteMovie(id);
  setTimeout(() => {
    location.href = location.origin;
  }, 1000);
});

if (localStorage.getItem("User")) {
  account.appendChild(createLog());
} else {
  account.appendChild(createNoLog());
}
