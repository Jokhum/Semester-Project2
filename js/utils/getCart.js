export function getCartItems() {
  const cartItems = localStorage.getItem("cart");

  if (cartItems === null) {
    return [];
  } else {
    return JSON.parse(cartItems);
  }
}
