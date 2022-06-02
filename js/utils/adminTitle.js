import { loadUserName } from "./storage.js";

export function changeTitle() {
  const userName = loadUserName();
  const title = document.querySelector(".logged-admin");

  title.innerHTML = `Welcome ${userName}.`;
}

changeTitle();
