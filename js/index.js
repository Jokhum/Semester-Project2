import { displayMessage } from "./components/common/displayMessage.js";
import { url } from "./constants/api.js";
import { api } from "./constants/api.js";

const heroBanner = "http://localhost:8082/home";
const featuredShoe = document.querySelector(".featured");

async function getBanner() {
  try {
    const response = await fetch(heroBanner);
    const json = await response.json();

    const heroContainer = document.querySelector(".hero-container");

    heroContainer.innerHTML = "";
    heroContainer.innerHTML += `                         
                                  <img src="${api}${json.hero_banner.url}" alt="${json.hero_banner_alt_text}" class="hero-image">                          
                                `;
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".hero-container");
  }
}

getBanner();

async function getShoes() {
  try {
    const response = await fetch(url);
    const json = await response.json();

    featuredShoe.innerHTML = "";

    createHtml(json);
  } catch (error) {
    displayMessage("error", error, ".featured");
    console.log(error);
  }
}

getShoes();

function createHtml(product) {
  product.forEach(function (shoe) {
    function displayImage() {
      if (shoe.image) {
        return `<img src="${api}${shoe.image.url}" class="featured-img general-image-style" alt="Featured Image"></img>`;
      }
      if (shoe.image_url) {
        return `<img src="${shoe.image_url}" class="featured-img general-image-style" alt="Featured Image"></img>`;
      } else if (!shoe.image) {
        return `<img src="/images/placeholder.png" class="featured-img general-image-style" alt="Placeholder for missing image"></img>`;
      }
    }

    if (shoe.featured) {
      featuredShoe.innerHTML += ` <h2 class="shoe-title">${shoe.title}</h2>                                                                                                  
                                  <article class="featured-container">
                                    <a href="details.html?id=${shoe.id}" class="products">                                         
                                      <div class="featured-img-container products">
                                        ${displayImage()}
                                      </div>
                                     </a>
                                    <div class="shoe-text-container">
                                      <p>${shoe.description}</p>
                                      <p class="shoe-price">$${shoe.price}</p>
                                    </div>
                                  </article>                       
                                `;
    }
  });
}
