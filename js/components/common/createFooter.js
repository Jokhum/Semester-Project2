export default function createFooter() {
  const container = document.querySelector(".footer-container");

  container.innerHTML = `
                        <div class="footer-icons">
                            <a href="#"><i class="fab fa-facebook-f"></i></a>
                            <a href="#"><i class="fab fa-instagram"></i></a>
                            <a href="#"><i class="fab fa-twitter"></i></a>
                        </div>
                            <p class="footer-text">Copyright ©PW</p> 
                            `;
}
