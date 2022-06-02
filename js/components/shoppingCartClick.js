import { getCartItems } from "../utils/getCart.js";

export function handleClick(event) {
  event.target.classList.toggle("fa");
  event.target.classList.toggle("far");

  const id = event.target.dataset.id;
  const title = event.target.dataset.title;
  const price = event.target.dataset.price;
  const image = event.target.dataset.image;
  const imageUrl = event.target.dataset.imageurl;

  const currentCartItems = getCartItems();

  const dupeItem = currentCartItems.find(function (item) {
    return item.id === id;
  });

  if (!dupeItem) {
    const item = { id, title, price, image, imageUrl };

    currentCartItems.push(item);

    saveCart(currentCartItems);
  } else {
    const newItems = currentCartItems.filter((item) => item.id !== id);

    saveCart(newItems);
  }
}

function saveCart(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}
