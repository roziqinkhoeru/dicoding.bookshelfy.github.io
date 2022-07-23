// declare variable
const bookData = [];
(RENDER_EVENT = "render-book"),
  (formAddBook = document.getElementById("formAddBook")),
  (containerReadyBook = document.getElementById("containerReadyBook")),
  (containerFinishedBook = document.getElementById("containerFinishedBook")),
  (titleBook = document.getElementById("judul")),
  (authorBook = document.getElementById("penulis")),
  (yearBook = document.getElementById("tahun")),
  (statusBook = document.getElementById("status"));

//inisialiasi key untuk session storage
const sessionReadyBookKey = "SESSION_READY_BOOK",
  sessionFinishedBookKey = "SESSION_FINISHED_BOOK";

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

// method make bookshelf
const makeBookshelf = (bookObject) => {
  const cardBook = document.createElement("div"),
    cardBookBody = document.createElement("div"),
    cardBookBodyContent = document.createElement("div"),
    titleBook = document.createElement("p"),
    authorBook = document.createElement("p"),
    yearBook = document.createElement("p"),
    buttonBook = document.createElement("div"),
    btnDone = document.createElement("button"),
    settingBook = document.createElement("div"),
    dotThreeIcon = document.createElement("i"),
    dropdownSetting = document.createElement("div"),
    btnDelete = document.createElement("button"),
    trashIcon = document.createElement("i"),
    btnDeleteValue = document.createElement("span"),
    btnSwitch = document.createElement("button"),
    switchIcon = document.createElement("i"),
    btnSwitchValue = document.createElement("span"),
    statusBook = document.createElement("div"),
    statusBookText = document.createElement("p"),
    statusIcon = document.createElement("i"),
    statusBookValue = document.createElement("span");

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

// method addBook
const addBook = () => {
  const titleBookVal = titleBook.value;
  const authorBookVal = authorBook.value;
  const yearBookVal = yearBook.value;
  const statusBookVal = statusBook.value;

  const idBook = generateId();
  const book = generateBookObject(
    idBook,
    titleBookVal,
    authorBookVal,
    yearBookVal,
    statusBookVal
  );

  bookData.push(book);

  document.dispatchEvent(new Event(RENDER_EVENT));
};

// load DOM Content
document.addEventListener("DOMContentLoaded", function () {
  formAddBook.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Selamat! Buku berhasil ditambahkan");
    addBook();
  });
});

// render book
document.addEventListener(RENDER_EVENT, () => {
  containerReadyBook.innerHTML = "";
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
