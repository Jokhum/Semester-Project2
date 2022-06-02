export function cartTotal() {
  const totalContainer = document.querySelector(".cart-total-container");

  let cartItemRows = document.querySelector(".cart-container");

  let itemRows = cartItemRows.getElementsByClassName("cart-item");

  let total = 0;

  for (var i = 0; i < itemRows.length; i++) {
    let cartRow = itemRows[i];

    let priceItem = cartRow.getElementsByClassName("shoe-price")[0];

    let price = parseFloat(priceItem.innerText.replace("$", ""));

    total = total + price;
  }

  totalContainer.innerHTML += `
                                  <div class="price-total">
                                      <h3>Total cost:</h3>
                                      <p class="shoe-price total-sum">$${total}</p>
                                  </div>`;
}
