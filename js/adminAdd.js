import { changeTitle } from "./utils/adminTitle.js";
import { displayMessage } from "./components/common/displayMessage.js";
import { getToken } from "./utils/storage.js";
import { url } from "./constants/api.js";

changeTitle();

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured-check");
const image = document.querySelector("#image");
const message = document.querySelector(".form-error-container");

form.addEventListener("submit", submitProduct);

function submitProduct(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value.trim();

  if (titleValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0) {
    return displayMessage("error", "Please fill out all the required inputs.", ".form-error-container");
  }

  addProduct(titleValue, priceValue, descriptionValue, featuredValue, imageValue);
}

async function addProduct(title, price, description, featured, image) {
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product successfully added!", ".form-error-container");
      form.reset();
    }

    if (json.error) {
      displayMessage("error", json.message, ".form-error-container");
    }
  } catch {
    console.log(error);
    displayMessage("error", json.message, ".form-error-container");
  }
}
