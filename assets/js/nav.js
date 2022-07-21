// active and remove menu
const navLink = document.querySelectorAll(".header_nav_item");

function linkActive() {
  navLink.forEach((n) => n.classList.remove("active"));
  this.classList.add("active");
}

navLink.forEach((n) => n.addEventListener("click", linkActive));

// toggle navigation menu dropdown
const toggleNavMenu = (btn, menu, screens) => {
  btn.addEventListener("click", () => {
    menu.classList.toggle("active");
    screens.classList.toggle("active");
    screens.style.pointerEvents = "all";
    document.querySelector("html").style.overflow = "hidden";
    document.querySelector("html").style.height = "100%";
  });

  screens.addEventListener("click", () => {
    screens.classList.remove("active");
    screens.style.pointerEvents = "none";
    menu.classList.remove("active");
    document.querySelector("html").style.overflow = "auto";
    document.querySelector("html").style.height = "auto";
  });
};

// hide nav menu dropdown when clicking nav dropdown item
const closeNavMenu = (btn, menu, screens) => {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      menu.classList.remove("active");
      screens.classList.remove("active");
      screens.style.pointerEvents = "none";
      document.querySelector("html").style.overflow = "auto";
      document.querySelector("html").style.height = "auto";
    });
  }
};

// declare variable
const btnNavMenu = document.querySelector(".btn_dropdown_menu"),
  navDropdownContent = document.querySelector(".nav_dropdown_content"),
  navScreen = document.querySelector(".nav_dropdown_screen"),
  navDropdownItem = document.querySelectorAll(".nav_dropdown_item");

// call func
toggleNavMenu(btnNavMenu, navDropdownContent, navScreen);
closeNavMenu(navDropdownItem, navDropdownContent, navScreen);
