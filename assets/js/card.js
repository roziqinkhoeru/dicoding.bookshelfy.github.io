// toggle show dropdown setting card book
const dropdownCard = document.querySelector("#dropdownSetting");
const btnSetting = document.querySelector("#btnSetting");

btnSetting.addEventListener("click", () => {
  dropdownCard.classList.toggle("show");
});
