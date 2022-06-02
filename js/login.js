import { displayMessage } from "./components/common/displayMessage.js";
import { api } from "./constants/api.js";
import { saveToken, saveUser } from "./utils/storage.js";

const form = document.querySelector(".defaultForm");
const email = document.querySelector("#email");
const formError = document.querySelector(".form-error-container");
const password = document.querySelector("#password");

form.addEventListener("submit", validateForm);

function validateForm(event) {
  event.preventDefault();

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  formError.innerHTML = "";

  let errors = [];

  if (!validateEmail(emailValue)) {
    errors.push("Invalid Email Address: Not a valid email address.");
  }

  if (passwordValue.length <= 3) {
    errors.push("Invalid password: Needs to be longer than 3 characters.");
  }

  if (errors.length > 0) {
    return displayMessage("error", errors.join("<br>"), ".form-error-container");
  }
  doLogin(emailValue, passwordValue);
}

async function doLogin(email, password) {
  const url = api + "/auth/local";
  const data = JSON.stringify({ identifier: email, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.user) {
      displayMessage("success", "Login successful!", ".form-error-container");

      window.location = "/";

      saveToken(json.jwt);
      saveUser(json.user);
    }

    if (json.error) {
      displayMessage("error", json.data[0].messages[0].message, ".form-error-container");
    }
  } catch (error) {
    console.log(error);
  }
}

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const adressMatch = regEx.test(email);
  return adressMatch;
}
