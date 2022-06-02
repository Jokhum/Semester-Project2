import { api } from "../constants/api";

export function createProducts(createdProducts) {
  const productsContainer = document.querySelector(".products-container");
  productsContainer.innerHTML = "";

  createdProducts.forEach(function (product) {
    productsContainer.innerHTML += `
                                      <a href="details.html?id=${product.id}"class="products">
                                        <h2 class="shoe-title">${product.title}</h2>
                                        <img src="${api}${product.image.url}" alt="Product Image" class="product-image">
                                        <p>$${product.price}</p>
                                      </a>`;
  });
}
