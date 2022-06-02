import { url } from "./constants/api.js";
import { api } from "./constants/api.js";
import { searchProducts } from "./components/searchProducts.js";
import { displayMessage } from "./components/common/displayMessage.js";

async function getProducts() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    const productsContainer = document.querySelector(".products-container");

    productsContainer.innerHTML = "";

    createProducts(json);
    searchProducts(json);
  } catch (error) {
    displayMessage("error", error, ".products-container");
    console.log(error);
  }
}

export function createProducts(createdProducts) {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";

  createdProducts.forEach(function (product) {
    productsContainer.innerHTML += `                              
                                    <article class="products">
                                      <a href="details.html?id=${product.id}">
                                        <h2 class="shoe-title">${product.title}</h2>
                                        <div class="shoe-image-container">
                                          ${displayImage()}
                                        </div>
                                      </a>   
                                        <p class="shoe-price">$${product.price}</p>                                                                     
                                    </article>`;

    function displayImage() {
      if (product.image) {
        return `<img src="${api}${product.image.url}" alt="Product Image" class="product-image general-image-style"></img>`;
      } else if (product.image_url) {
        return `<img src="${product.image_url}" alt="Product Image" class="product-image general-image-style"></img>`;
      } else {
        return `<img src="/images/placeholder.png" alt="Placeholder for missing product image" class="product-image general-image-style"></img>`;
      }
    }
  });

  if (createdProducts.length === 0) {
    displayMessage("error", "No Products Available..", ".products-container");
  }
}

getProducts();
