import { validUser, postUser } from "../data/data.js";

function getKeyCode() {
  return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}
localStorage.setItem("keyCxde", getKeyCode());

/* Dash */
const dashLogin = document.getElementById("dashLogin");
const dashSingup = document.getElementById("dashSingUp");
const cap = document.getElementById("cap");

dashLogin.addEventListener("click", () => {
  cap.style.left = "0%";
});

dashSingup.addEventListener("click", () => {
  cap.style.left = "calc(100% - calc(100vw - 30rem))";
});

/* Login */
const formLogin = document.getElementById("formLogin");
const userLogin = document.getElementById("userLogin");
const passwordLogin = document.getElementById("passwordLogin");

formLogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (await validUser(userLogin.value, passwordLogin.value)) {
    localStorage.setItem("User", userLogin.value);
    location.href = location.origin;
  } else {
    userLogin.classList.add("invalid");
    passwordLogin.classList.add("invalid");

    setTimeout(() => {
      userLogin.classList.remove("invalid");
      passwordLogin.classList.remove("invalid");
    }, 4000);
  }
});

/* Register */
const formSingUp = document.getElementById("formSignUp");
const userSingUp = document.getElementById("userSingUp");
const passwordSingUp = document.getElementById("passwordSingUp");
const rePasswordSingUp = document.getElementById("rePasswordSingUp");
const keyCode = document.getElementById("keyCode");

formSingUp.addEventListener("submit", async (e) => {
  e.preventDefault();
  const check = passwordSingUp.value === rePasswordSingUp.value;
  const chexk = localStorage.getItem("keyCxde") == keyCode.value;

  if (check && chexk) {
    await postUser({ username: userSingUp.value, password: passwordSingUp.value });
    cap.style.left = "0%";  
    userSingUp.value = null;
    passwordSingUp.value = null;
    rePasswordSingUp.value = null;
    keyCode.value = null;
  } else {
    passwordSingUp.classList.add("invalid");
    rePasswordSingUp.classList.add("invalid");
    keyCode.classList.add("invalid");

    setTimeout(() => {
      passwordSingUp.classList.remove("invalid");
      rePasswordSingUp.classList.remove("invalid");
      keyCode.classList.remove("invalid");
    }, 4000);
  }
  localStorage.clear();
  localStorage.setItem("keyCxde", getKeyCode());
});
