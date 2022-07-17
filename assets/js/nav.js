// active and remove menu
const navLink = document.querySelectorAll(".header_nav_item");

function linkActive() {
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
}

navLink.forEach((n) => n.addEventListener("click", linkActive));
