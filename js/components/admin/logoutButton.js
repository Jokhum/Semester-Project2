import { logoutUser } from "../../utils/storage.js";

export default function logoutButton() {
  const button = document.querySelector("#logoutAdmin");

  if (button) {
    button.onclick = function () {
      logoutUser();
      location.reload();
    };
  }
}
