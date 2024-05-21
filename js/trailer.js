import { getMovie } from "../data/data.js";
import { createLog, createNoLog } from "./components/prefile.js";
const account = document.getElementById("account");
const section = document.getElementById("frontPage");
const boxVideo = document.getElementById("boxVideo");
const id = new URLSearchParams(location.search).get("id"); //http://localhost:5500?id=123

const movie = await getMovie();
const filter = movie.filter((e) => e.id == id);

function dateAndSpan() {
  const i = document.createElement("i");
  i.classList.add("fa-regular", "fa-calendar-days");

  const h3 = document.createElement("h3");
  h3.textContent = filter[0].year;

  const divDate = document.createElement("div");
  divDate.classList.add("divDate");
  divDate.appendChild(i);
  divDate.appendChild(h3);

  return divDate;
}

function getMoreInf() {
  const divMoreInf = document.createElement("div");
  divMoreInf.classList.add("infSecond");

  const h4Director = document.createElement("h2");
  h4Director.innerHTML = `Director: <span style="font-weight: lighter;">${filter[0].director}</span>`;

  const h4Actors = document.createElement("h2");
  h4Actors.innerHTML = `Actors: <span style="font-weight: lighter;">${filter[0].actors
    .map((e) => {
      return e.name;
    })
    .join(",")}</span>`;

  divMoreInf.appendChild(h4Director);
  divMoreInf.appendChild(h4Actors);
  divMoreInf.appendChild(dateAndSpan());

  return divMoreInf;
}

function getDevelop() {
  const div = document.createElement("div");
  div.classList.add("develop");

  const h1 = document.createElement("h1");
  h1.classList.add("frontP");
  h1.textContent = filter[0].title;

  const p = document.createElement("p");
  p.classList.add("sinopsis");
  p.textContent = filter[0].review;

  div.appendChild(h1);
  div.appendChild(p);
  div.appendChild(getMoreInf());

  return div;
}

function createImage() {
  const img = document.createElement("img");
  img.alt = "filmCover";
  img.classList.add("frontImg");
  img.src = filter[0].img;

  return img;
}

section.appendChild(createImage());
section.appendChild(getDevelop());

function createIframe() {
  const iframe = document.createElement("iframe");
  iframe.title = "trailer";
  iframe.src = filter[0].trailer;
  iframe.setAttribute("allowfullscreen", "");
  iframe.classList.add("iframeTrailer");

  return iframe;
}

boxVideo.appendChild(createIframe());

if (localStorage.getItem("User")) {
  account.appendChild(createLog());
} else {
  account.appendChild(createNoLog());
}
