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

const closeDropdownSetting = (btn, menu) => {
  for (let i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", () => {
      for (let j = 0; j < menu.length; j++) {
        menu[j].classList.remove("show");
      }
    });
  }
};

// call function toggle show dropdown setting card book
const dropdownCard = document.getElementsByClassName("dropdown_setting"),
  btnSetting = document.getElementsByClassName("setting_book"),
  btnDropdownSetting = document.getElementsByClassName("btn_dropdown_setting");

toggleDropdownSetting(btnSetting, dropdownCard);
closeDropdownSetting(btnDropdownSetting, dropdownCard);
