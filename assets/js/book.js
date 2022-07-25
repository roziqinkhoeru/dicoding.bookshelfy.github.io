// initiate variable
const books = [];
const RENDER_EVENT = "render-bookshelf",
  // SAVED_EVENT = "saved-bookshelf",
  STORAGE_KEY = "BOOKSHELF_APPS";
const formAddBook = document.getElementById("formAddBook"),
  containerReadyBook = document.getElementById("containerReadyBook"),
  containerFinishedBook = document.getElementById("containerFinishedBook"),
  titleBook = document.getElementById("judul"),
  authorBook = document.getElementById("penulis"),
  yearBook = document.getElementById("tahun"),
  statusBook = document.getElementById("status");

// check storage exist
const isStorageExist = () => {
  if (typeof Storage === "undefined") {
    alert(
      "Maaf, browser Anda tidak menudukung localStorage. Harap gunakan browser lain🙏"
    );
  } else {
    return true;
  }
};

// generate id
function generateId() {
  return +new Date();
}

// generate book object
function generateBookObject(id, title, author, year, isFinished) {
  return {
    id,
    title,
    author,
    year,
    isFinished,
  };
}

// find book using id
function findBook(idBook) {
  for (bookItem of books) {
    if (bookItem.id === idBook) {
      return bookItem;
    }
  }
  return null;
}

// find book index
function findBookIndex(idBook) {
  for (i in books) {
    if (books[i].id === idBook) {
      return i;
    }
  }
  return -1;
}

// method reset form add book
const resetFormAddBook = () => {
  titleBook.value = "";
  authorBook.value = "";
  yearBook.value = "";
  statusBook.value = "";
};

// method make bookshelf
const makeBookshelf = (bookObject) => {
  // object destructive
  const { id, title, author, year, isFinished } = bookObject;

  // create an element
  const cardBook = document.createElement("div"),
    cardBookBody = document.createElement("div"),
    cardBookBodyContent = document.createElement("div"),
    titleBook = document.createElement("p"),
    authorBook = document.createElement("p"),
    yearBook = document.createElement("p"),
    settingBook = document.createElement("div"),
    dotThreeIcon = document.createElement("i"),
    dropdownSetting = document.createElement("div"),
    btnDelete = document.createElement("button"),
    trashIcon = document.createElement("i"),
    btnDeleteValue = document.createElement("span");

  // add class to element
  cardBook.classList.add("card_book");
  cardBookBody.classList.add("card_book_body");
  cardBookBodyContent.classList.add("card_book_body_content");
  titleBook.classList.add("title_book");
  authorBook.classList.add("author_book");
  yearBook.classList.add("year_book");
  settingBook.classList.add("setting_book");
  dotThreeIcon.classList.add("fa-solid", "fa-ellipsis-vertical");
  dropdownSetting.classList.add("dropdown_setting");
  btnDelete.classList.add("btn", "btn_delete", "btn_dropdown_setting");
  trashIcon.classList.add("fa-solid", "fa-trash-can");

  // add content to element
  titleBook.innerText = title;
  authorBook.innerText = author;
  yearBook.innerText = year;
  btnDeleteValue.innerText = "Hapus";

  // create a component
  cardBookBodyContent.append(titleBook, authorBook, yearBook);
  settingBook.append(dotThreeIcon);
  btnDelete.append(trashIcon, btnDeleteValue);

  if (isFinished) {
    // create an element
    const btnSwitch = document.createElement("button"),
      switchIcon = document.createElement("i"),
      btnSwitchValue = document.createElement("span"),
      statusBook = document.createElement("div"),
      statusBookText = document.createElement("p"),
      statusIcon = document.createElement("i"),
      statusBookValue = document.createElement("span");

    // add class to element
    btnSwitch.classList.add("btn", "btn_switch", "btn_dropdown_setting");
    switchIcon.classList.add("fa-solid", "fa-shuffle");
    statusBook.classList.add("status_book");
    statusIcon.classList.add("fa-solid", "fa-check-double");

    // add content to element
    btnSwitchValue.innerText = "Belum selesai";
    statusBookValue.innerText = "Selesai";

    // create component
    statusBook.appendChild(statusBookText).append(statusIcon, statusBookValue);
    btnSwitch.append(switchIcon, btnSwitchValue);
    cardBookBody.append(cardBookBodyContent, statusBook);
    dropdownSetting.append(btnSwitch, btnDelete);

    // move to ready event
    btnSwitch.addEventListener("click", () => {
      undoBookFromFinished(id);
    });
  } else {
    // cretae an element
    const buttonBook = document.createElement("div"),
      btnDone = document.createElement("button");
    // add class to element
    buttonBook.classList.add("button_book");
    btnDone.classList.add("btn", "btn_submit");
    // add content to element
    btnDone.innerText = "Selesai";
    // create a component
    buttonBook.append(btnDone);
    cardBookBody.append(cardBookBodyContent, buttonBook);
    dropdownSetting.append(btnDelete);

    // move to finished event
    btnDone.addEventListener("click", () => {
      addBookToFinished(id);
    });
  }

  cardBook.setAttribute("id", `book-${id}`);
  cardBook.append(cardBookBody, settingBook, dropdownSetting);

  // show dropdown setting card book
  toggleDropdownSetting(settingBook, dropdownSetting);
  // hide dropdown setting
  closeDropdownOutside(settingBook, dropdownSetting);
  // event delete
  btnDelete.addEventListener("click", () => {
    deleteBook(id);
  });

  return cardBook;
};

// method save book data
function saveData() {
  if (isStorageExist()) {
    const bookParsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, bookParsed);

    // document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

// method add book
const addBook = () => {
  const titleBookVal = titleBook.value;
  const authorBookVal = authorBook.value;
  const yearBookVal = yearBook.value;
  let statusBookVal = null;
  if (statusBook.value === "selesai") {
    statusBookVal = true;
  } else {
    statusBookVal = false;
  }

  const idBook = generateId();
  const bookItem = generateBookObject(
    idBook,
    titleBookVal,
    authorBookVal,
    yearBookVal,
    statusBookVal
  );

  books.push(bookItem);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

// method delete book
function deleteBook(idBook) {
  const bookTarget = findBookIndex(idBook);
  if (bookTarget === -1) return;
  const proceed = confirm(
    `Apakah Anda yakin ingin menghapus buku ${books[bookTarget].title} secara permanen?`
  );
  if (proceed) {
    books.splice(bookTarget, 1);
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// add book to finished book
const addBookToFinished = (idBook) => {
  const bookTarget = findBook(idBook);
  if (bookTarget == null) return;

  bookTarget.isFinished = true;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
};

// add book to ready book
function undoBookFromFinished(idBook) {
  const bookTarget = findBook(idBook);
  if (bookTarget == null) return;
  const proceed = confirm(
    `Apakah Anda yakin ingin mengubah status buku ${bookTarget.title} menjadi "Belum selesai dibaca"?`
  );
  if (proceed) {
    bookTarget.isFinished = false;
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// load data form storage
const loadDataFromStorage = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      books.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
};

// event load awal
document.addEventListener("DOMContentLoaded", () => {
  // event submit
  formAddBook.addEventListener("submit", (eve) => {
    eve.preventDefault();
    addBook();
    resetFormAddBook();
  });

  // load data awal
  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// event render
document.addEventListener(RENDER_EVENT, () => {
  // clearing list item
  containerReadyBook.innerHTML = "";
  containerFinishedBook.innerHTML = "";

  for (bookItem of books) {
    const bookElement = makeBookshelf(bookItem);
    if (bookItem.isFinished) {
      containerFinishedBook.append(bookElement);
    } else {
      containerReadyBook.append(bookElement);
    }
  }
});

// event when save a changes
// document.addEventListener(SAVED_EVENT, () => {
// });

// ===== behaviour card =====
// toggle show dropdown setting card book
const toggleDropdownSetting = (btn, menu) => {
  btn.addEventListener("click", () => {
    menu.classList.toggle("show");
  });
};
// hide dropdown setting card book when clicking outside of the dropdown setting card book
const closeDropdownOutside = (btn, menu) => {
  window.addEventListener("click", (e) => {
    if (btn.contains(e.target)) {
    } else {
      menu.classList.remove("show");
    }
  });
};
