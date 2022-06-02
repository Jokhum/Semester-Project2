import createMenu from "./components/common/createMenu.js";
import createFooter from "./components/common/createFooter.js";
import { smallMenu } from "./components/common/burgerMenu.js";

createMenu();
createFooter();

const hamburger = document.querySelector("#burger-menu");

hamburger.addEventListener("click", smallMenu);
