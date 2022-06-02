import { url } from "../../constants/api.js";
import { getToken } from "../../utils/storage.js";

export default function deleteButton(id) {
  const button = document.querySelector("#delete");

  button.onclick = async function () {
    const doDelete = confirm("Are you sure you want to delete this product?");

    if (doDelete) {
      const newUrl = url + id;

      const token = getToken();
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(newUrl, options);
        const json = await response.json();

        location.href = "/products.html";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
