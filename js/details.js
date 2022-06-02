import { handleClick } from "./components/shoppingCartClick.js";
import { getCartItems } from "./utils/getCart.js";
import { loadUserName } from "./utils/storage.js";
import { url } from "./constants/api.js";
import { api } from "./constants/api.js";

const productContainer = document.querySelector(".product-container");

const queryString = document.location.search;

const params = new URLSearchParams(queryString);

const id = params.get("id");

const newUrl = url + id;

async function getProduct() {
  try {
    const response = await fetch(newUrl);
    const json = await response.json();

    createHtml(json);
  } catch (error) {
    console.log(error);
    productContainer.innerHTML = "<h2>Something went wrong...</h2>";
  }
}

getProduct();

function createHtml(details) {
  const formatDate = new Date(details.published_at).toLocaleString("en-GB", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const username = loadUserName();

  const cartItems = getCartItems();

  let cartIcon = "far";

  const itemExists = cartItems.find(function (item) {
    return parseInt(item.id) === details.id;
  });

  if (itemExists) {
    cartIcon = "fa";
  }

  function displayImage() {
    if (details.image) {
      return `<img src="${api}${details.image.url}" alt="Product Image" class="product-image general-image-style"></img>`;
    } else if (details.image_url) {
      return `<img src="${details.image_url}" alt="Product Image" class="product-image general-image-style"></img>`;
    } else {
      return `<img src="/images/placeholder.png" alt="Placeholder for missing product image" class="product-image general-image-style"></img>`;
    }
  }

  function imageData() {
    if (details.image) {
      return `<i class="${cartIcon} fa-heart" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-image="${details.image.url}"></i>`;
    } else if (details.image_url) {
      return `<i class="${cartIcon} fa-heart" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}" data-imageUrl="${details.image_url}"></i>`;
    } else {
      return `<i class="${cartIcon} fa-heart" data-id="${details.id}" data-title="${details.title}" data-price="${details.price}"></i>`;
    }
  }

  document.title = `Product page for ${details.title}`;

  productContainer.innerHTML = `                        
                                <div class="details-image">
                                  ${displayImage()}
                                </div>
                                <h2>${details.title}</h2>                               
                                <p class="details-release">Product released: ${formatDate}.</p>                                          
                                <p>${details.description}</p>                                                      
                                <p class="shoe-price">$${details.price}</p>                          
                                <a class="cart-container">
                                  ${imageData()}
                                </a>
                                <div class="admin-container"></div>
                                `;

  const addToCart = document.querySelector(".cart-container");
  addToCart.addEventListener("click", handleClick);

  if (username) {
    const container = document.querySelector(".admin-container");
    container.innerHTML = `<button type="submit" id="edit-button">Edit Product</button>`;
    const editButton = document.querySelector("#edit-button");

    editButton.addEventListener("click", doEdit);
  }
  function doEdit() {
    window.location.href = `/adminEdit.html?id=${details.id}`;
  }
}
