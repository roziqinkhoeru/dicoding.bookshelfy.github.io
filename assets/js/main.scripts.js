// load DOM Content
document.addEventListener("DOMContentLoaded", function () {
  const formAddBook = document.getElementById("formAddBook");
  formAddBook.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Selamat! Buku berhasil ditambahkan");
    addBook();
  });
});

// declare variable
const bookData = [];
const RENDER_EVENT = "render-book";

// generate ID
const generateId = () => {
  return +new Date();
};

// generate object book
const generateBookObject = (id, title, author, year, status) => {
  return {
    id,
    title,
    author,
    year,
    status,
  };
};

// method addBook
const addBook = () => {
  const titleBook = document.getElementById("judul").value;
  const authorBook = document.getElementById("penulis").value;
  const yearBook = document.getElementById("tahun").value;
  const statusBook = document.getElementById("status").value;

  const idBook = generateId();
  const book = generateBookObject(
    idBook,
    titleBook,
    authorBook,
    yearBook,
    statusBook
  );

  bookData.push(book);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

// method make bookshelf
const makeBookshelf = (bookObject) => {
  const cardBook = document.createElement("div");
  const cardBookBody = document.createElement("div");
  const cardBookBodyContent = document.createElement("div");
  const titleBook = document.createElement("p");
  const authorBook = document.createElement("p");
  const yearBook = document.createElement("p");
  const buttonBook = document.createElement("div");
  const btnDone = document.createElement("button");
  const settingBook = document.createElement("div");
  const dotThreeIcon = document.createElement("i");
  const dropdownSetting = document.createElement("div");
  const btnDelete = document.createElement("button");
  const trashIcon = document.createElement("i");
  const btnDeleteValue = document.createElement("span");
  const btnSwitch = document.createElement("button");
  const switchIcon = document.createElement("i");
  const btnSwitchValue = document.createElement("span");
  const statusBook = document.createElement("div");
  const statusBookText = document.createElement("p");
  const statusIcon = document.createElement("i");
  const statusBookValue = document.createElement("span");

  cardBook.classList.add("card_book");
  cardBookBody.classList.add("card_book_body");
  cardBookBodyContent.classList.add("card_book_body_content");
  titleBook.classList.add("title_book");
  authorBook.classList.add("author_book");
  yearBook.classList.add("year_book");
  buttonBook.classList.add("button_book");
  btnDone.classList.add("btn", "btn_submit");
  settingBook.classList.add("setting_book");
  dotThreeIcon.classList.add("fa-solid", "fa-ellipsis-vertical");
  dropdownSetting.classList.add("dropdown_setting");
  btnDelete.classList.add("btn", "btn_delete", "btn_dropdown_setting");
  trashIcon.classList.add("fa-solid", "fa-trash-can");
  btnSwitch.classList.add("btn", "btn_switch", "btn_dropdown_setting");
  switchIcon.classList.add("fa-solid", "fa-shuffle");
  statusBook.classList.add("status_book");
  statusIcon.classList.add("fa-solid", "fa-check-double");

  titleBook.innerText = bookObject.title;
  authorBook.innerText = bookObject.author;
  yearBook.innerText = bookObject.year;
  btnDone.innerText = "Selesai";
  btnDeleteValue.innerText = "Hapus";
  btnSwitchValue.innerText = "Belum selesai";
  statusBookValue.innerText = "Selesai";

  cardBookBodyContent.append(titleBook, authorBook, yearBook);
  buttonBook.append(btnDone);
  statusBook.appendChild(statusBookText).append(statusIcon, statusBookValue);
  settingBook.append(dotThreeIcon);
  btnDelete.append(trashIcon, btnDeleteValue);
  btnSwitch.append(switchIcon, btnSwitchValue);
  if (bookObject.status === "belum") {
    cardBookBody.append(cardBookBodyContent, buttonBook);
    dropdownSetting.append(btnDelete);
  } else {
    cardBookBody.append(cardBookBodyContent, statusBook);
    dropdownSetting.append(btnSwitch, btnDelete);
  }

  cardBook.setAttribute("id", `book-${bookObject.id}`);
  cardBook.append(cardBookBody, settingBook, dropdownSetting);

  return cardBook;
};

// render book
document.addEventListener(RENDER_EVENT, () => {
  const containerReadyBook = document.getElementById("containerReadyBook");
  containerReadyBook.innerHTML = "";

  const containerFinishedBook = document.getElementById(
    "containerFinishedBook"
  );
  containerFinishedBook.innerHTML = "";

  for (const bookList of bookData) {
    const bookElement = makeBookshelf(bookList);
    if (bookList.status === "belum") {
      containerReadyBook.appendChild(bookElement);
    } else {
      containerFinishedBook.appendChild(bookElement);
    }
  }
});
