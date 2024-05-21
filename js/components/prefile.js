export const createLog = () => {
  const boxAccount = document.createElement("div");
  boxAccount.classList.add("boxAccount");
  boxAccount.addEventListener("click", () => {
    localStorage.clear();
    location.href = location.origin;
  });

  const p = document.createElement("p");
  p.textContent = localStorage.getItem("User");

  const img = document.createElement("img");
  img.alt = "perfile"
  img.src = `https://robohash.org/${localStorage.getItem("User")}`;

  boxAccount.appendChild(p);
  boxAccount.appendChild(img);

  return boxAccount;
};

export const createNoLog = () => {
  const boxBtnLogin = document.createElement("div");
  boxBtnLogin.classList.add("boxBtnLogin");

  const a = document.createElement("a");
  a.classList.add("btnLogin");
  a.href = `${location.origin}/pages/login.html`;
  a.textContent = "Sing In";

  boxBtnLogin.appendChild(a);

  return boxBtnLogin;
};
