import { loadUserName } from "../../utils/storage.js";
import logoutButton from "../admin/logoutButton.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = loadUserName();

  let authLink = `<a href="/login.html" class="${pathname === "/login.html" ? "active" : ""}">Login</a>`;

  if (username) {
    authLink = `<a href="/adminAdd.html" class="${pathname === "/adminAdd.html" ? "active" : ""}">Add Products</a>             
                <li>
                  <button id="logoutAdmin">Logout</button>
                </li>`;
  }

  const container = document.querySelector(".nav-container");

  container.innerHTML = ` <nav class="menu">
                            <a href="/">
                              <div class="logo-container">
                                <img src="images/logo2.png" class="logo">
                              </div>
                            </a>
                            <div class="hamburger-container">
                              <i class="fas fa-bars" id="burger-menu"></i>
                            </div>
                            <ul>
                              <li>
                                <a href="/" class="${pathname === "/" ? "active" : ""}">Home</a>
                              </li>
                              <li>
                                <a href="products.html" class="${pathname === "/products.html" ? "active" : ""}">Products</a>
                              </li>
                              <li>
                                <a href="/shopping-cart.html" class="${pathname === "/shopping-cart.html" ? "active" : ""}">Cart</a>                              
                            </li>     
                              <li>
                                ${authLink}
                              </li>                        
                            </ul>                           
                          </nav>`;
  logoutButton();
}
