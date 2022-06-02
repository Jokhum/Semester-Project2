export function smallMenu() {
  const nav = document.querySelector("ul");
  const burgerIcon = document.querySelector(".fas");

  nav.classList.toggle("show");
  burgerIcon.classList.toggle("fa-bars");
  burgerIcon.classList.toggle("fa-angle-double-up");
}
