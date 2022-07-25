// toggle show dropdown setting card book
const toggleDropdownSetting = (btn, menu) => {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      for (let j = 0; j < menu.length; j++) {
        if (i == j) {
          menu[j].classList.toggle("show");
        } else {
          menu[j].classList.remove("show");
        }
      }
    });
  }
};
// hide dropdown setting card book when clicking a button dropdowns
const closeDropdownSetting = (btn, menu) => {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      for (let j = 0; j < menu.length; j++) {
        menu[j].classList.remove("show");
      }
    });
  }
};
// hide dropdown setting card book when clicking outside of the dropdown setting card book
const closeDropdownOutside = (btn, menu) => {
  for (let i = 0; i < btn.length; i++) {
    window.addEventListener("click", (e) => {
      // if (btn[i].contains(e.target)) {
      // } else {
      //   menu[i].classList.remove("show");
      // }
    });
  }
};

// declare a variable
const dropdownCard = document.getElementsByClassName("dropdown_setting"),
  btnSetting = document.getElementsByClassName("setting_book"),
  btnDropdownSetting = document.getElementsByClassName("btn_dropdown_setting");
// call function toggle show dropdown setting card book
toggleDropdownSetting(btnSetting, dropdownCard);
closeDropdownSetting(btnDropdownSetting, dropdownCard);
closeDropdownOutside(btnSetting, dropdownCard);
