import { getToken } from "./utils/storage.js";
import { url } from "./constants/api.js";
import deleteButton from "./components/admin/deleteButton.js";
import { displayMessage } from "./components/common/displayMessage.js";

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const newUrl = url + id;

const form = document.querySelector("form");
const title = document.querySelector("#title");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const featured = document.querySelector("#featured-check");
const image = document.querySelector("#image");
const idInput = document.querySelector("#id");
const message = document.querySelector(".form-error-container");
const loader = document.querySelector(".loader-text");

(async function () {
  try {
    const response = await fetch(newUrl);
    const details = await response.json();

    title.value = details.title;
    price.value = details.price;
    description.value = details.description;
    featured.checked = details.featured;
    image.value = details.image_url;
    idInput.value = details.id;
    document.title = `Edit product information for ${title.value}`;
    deleteButton(details.id);
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".form-error-container");
  } finally {
    loader.style.display = "none";
    form.style.display = "flex";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const titleValue = title.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const featuredValue = featured.checked;
  const imageValue = image.value.trim();
  const idValue = idInput.value;

  if (titleValue.length === 0 || isNaN(priceValue) || priceValue.length === 0 || descriptionValue.length === 0) {
    return displayMessage("error", "Please fill out all the required inputs.", ".form-error-container");
  }

  updateProduct(titleValue, priceValue, descriptionValue, featuredValue, imageValue, idValue);
}

async function updateProduct(title, price, description, featured, image, id) {
  const data = JSON.stringify({
    title: title,
    price: price,
    description: description,
    featured: featured,
    image_url: image,
    id: id,
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(newUrl, options);
    const json = await response.json();

    if (json.updated_at) {
      displayMessage("success", "Product succesfully edited!", ".form-error-container");
    }
    if (json.error) {
      displayMessage("error", json.message, ".form-error-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".form-error-container");
  }
}
