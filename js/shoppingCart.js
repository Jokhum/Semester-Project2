import { getCartItems } from "./utils/getCart.js";
import { cartTotal } from "./utils/cartTotal.js";
import { api } from "./constants/api.js";
import { displayMessage } from "./components/common/displayMessage.js";

const cartItems = getCartItems();

const container = document.querySelector(".cart-container");

container.innerHTML = "";

cartItems.forEach((item) => {
  function displayImage() {
    if (item.image) {
      return `<img src="${api}${item.image}" alt="Product Image" class="cart-image general-image-style">`;
    } else if (item.imageUrl) {
      return `<img src="${item.imageUrl}" alt="Product Image" class="cart-image general-image-style">`;
    } else {
      return `<img src="/images/placeholder.png" alt="Placeholder for missing image" class="cart-image general-image-style">`;
    }
  }
  container.innerHTML += `                       
                          <article class="cart-item">
                            <a href="details.html?id=${item.id}">
                              <div class="cart-image-container">
                                ${displayImage()}
                              </div>
                              <div class="item-text-container">
                                <h2>${item.title}</h2>
                            </a>
                                <p class="shoe-price">$${item.price}</p>
                              </div>                       
                              <div class="icon-container">
                                <i class="fa fa-heart"></i>
                              <div/>
                          </article>
                        `;
});

container.innerHTML += "<div class=cart-total-container>";

cartTotal();

if (cartItems.length === 0) {
  displayMessage("error", "No products added to cart yet!", ".cart-container");
}
