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

  titleBook.innerHTML = bookObject.title;
  authorBook.innerHTML = bookObject.author;
  yearBook.innerHTML = bookObject.year;
  btnDone.innerHTML = "Selesai";
  btnDeleteValue.innerHTML = "Hapus";

  cardBookBodyContent.append(titleBook, authorBook, yearBook);
  buttonBook.append(btnDone);
  cardBookBody.append(cardBookBodyContent, buttonBook);
  settingBook.append(dotThreeIcon);
  dropdownSetting.appendChild(btnDelete).append(trashIcon, btnDeleteValue);

  cardBook.setAttribute("id", `book-${bookObject.id}`);
  cardBook.append(cardBookBody, settingBook, dropdownSetting);

  return cardBook;
};

// render book
document.addEventListener(RENDER_EVENT, () => {
  const containerReadyBook = document.getElementById("containerReadyBook");
  containerReadyBook.innerHTML = "";

  for (const bookList of bookData) {
    const bookElement = makeBookshelf(bookList);
    containerReadyBook.append(bookElement);
  }
});
