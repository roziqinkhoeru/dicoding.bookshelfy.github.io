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

// declare variable
const btnNavMenu = document.querySelector(".btn_dropdown_menu"),
  navDropdownContent = document.querySelector(".nav_dropdown_content"),
  navScreen = document.querySelector(".nav_dropdown_screen");

// call func
toggleNavMenu(btnNavMenu, navDropdownContent, navScreen);
