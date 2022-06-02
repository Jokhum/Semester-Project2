import { createProducts } from "../products.js";

export function searchProducts(products) {
  const search = document.querySelector(".search-input");

  search.onkeyup = function (event) {
    const searchValue = event.target.value.trim().toLowerCase();

    const filteredProducts = products.filter(function (product) {
      if (
        product.title.toLowerCase().includes(searchValue) ||
        product.description.toLowerCase().includes(searchValue)
      ) {
        return true;
      }

      if (searchValue === 0) {
        return true;
      }
    });

    createProducts(filteredProducts);
  };
}
