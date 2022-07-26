// initiate variable
const books = [];
const RENDER_EVENT = "render-bookshelf",
  // SAVED_EVENT = "saved-bookshelf",
  STORAGE_KEY = "BOOKSHELF_APPS";
const formAddBook = document.getElementById("formAddBook"),
  formNavSearch = document.getElementById("formNavSearch"),
  formDropdownSearch = document.getElementById("formDropdownSearch"),
  containerReadyBook = document.getElementById("containerReadyBook"),
  containerFinishedBook = document.getElementById("containerFinishedBook"),
  titleBook = document.getElementById("judul"),
  authorBook = document.getElementById("penulis"),
  yearBook = document.getElementById("tahun"),
  statusBook = document.getElementById("status"),
  navSearch = document.getElementById("search"),
  dropdownSearch = document.getElementById("searchDropdown"),
  btnReset = document.querySelector(".btn_reset");
let isConfirmForm = false;
let searchVal = "";

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
function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
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
  removeErrorAll();
};

// method make bookshelf
const makeBookshelf = (bookObject) => {
  // object destructive
  const { id, title, author, year, isComplete } = bookObject;

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

  if (isComplete) {
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

  bookTarget.isComplete = true;

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
    bookTarget.isComplete = false;
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
  // validate title
  titleBook.addEventListener("input", () => {
    const errorContainer = document.querySelector("#judul+.error_container");
    errorContainer.innerHTML = "";
    if (isEmptyForm(titleBook)) {
      errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Judul tidak boleh kosong</p>`;
      titleBook.classList.add("error");
    } else {
      titleBook.classList.remove("error");
    }
  });
  // validate author
  authorBook.addEventListener("input", () => {
    const errorContainer = document.querySelector("#penulis+.error_container");
    errorContainer.innerHTML = "";
    if (isEmptyForm(authorBook)) {
      errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Penulis tidak boleh kosong</p>`;
      authorBook.classList.add("error");
    } else {
      if (!isOnlyChar(authorBook)) {
        errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Penulis hanya dapat berisi huruf</p>`;
        authorBook.classList.add("error");
      } else {
        authorBook.classList.remove("error");
      }
    }
  });
  // validate year
  yearBook.addEventListener("input", () => {
    const errorContainer = document.querySelector("#tahun+.error_container");
    errorContainer.innerHTML = "";
    if (isEmptyForm(yearBook)) {
      errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Tahun tidak boleh kosong</p>`;
      yearBook.classList.add("error");
    } else {
      if (!isOnlyNumber(yearBook)) {
        errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Tahun hanya dapat berisi angka</p>`;
        yearBook.classList.add("error");
      } else {
        yearBook.classList.remove("error");
      }
    }
  });
  // validate status
  statusBook.addEventListener("click", () => {
    const errorContainer = document.querySelector("#status+.error_container");
    errorContainer.innerHTML = "";
    if (isEmptyForm(statusBook)) {
      errorContainer.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Pilih status baca Anda</p>`;
      statusBook.classList.add("error");
    } else {
      statusBook.classList.remove("error");
    }
  });
  // event reset
  btnReset.addEventListener("click", () => {
    resetFormAddBook();
  });
  // event submit
  formAddBook.addEventListener("submit", (eve) => {
    eve.preventDefault();
    // validate
    if (validateFormAll()) {
      isConfirmForm = true;
    } else {
      isConfirmForm = false;
    }
    //do
    if (isConfirmForm) {
      addBook();
      resetFormAddBook();
    }
  });

  // event search
  formNavSearch.addEventListener("submit", (eve) => {
    eve.preventDefault();
    dropdownSearch.value = "";
    searchVal = navSearch.value;

    document.dispatchEvent(new Event(RENDER_EVENT));
  });
  // event serach dropdown
  formDropdownSearch.addEventListener("submit", (eve) => {
    eve.preventDefault();
    navSearch.value = "";
    searchVal = dropdownSearch.value;
    hideMenu();

    document.dispatchEvent(new Event(RENDER_EVENT));
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

  // search with render
  books
    .filter((bookItem) =>
      bookItem.title.toLowerCase().includes(searchVal.toLowerCase())
    )
    .map((bookItem) => {
      const bookElement = makeBookshelf(bookItem);
      if (bookItem.isComplete) {
        containerFinishedBook.append(bookElement);
      } else {
        containerReadyBook.append(bookElement);
      }
    });
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

// validate
const isEmptyForm = (field) => {
  if (field.value === "") {
    return true;
  } else {
    return false;
  }
};

const isOnlyChar = (field) => {
  if (!/^[a-zA-Z\s]*$/.test(field.value)) {
    return false;
  } else {
    return true;
  }
};

const isOnlyNumber = (field) => {
  if (!/^[0-9]*$/g.test(field.value)) {
    return false;
  } else {
    return true;
  }
};

const validateFormAll = () => {
  const errorTitle = document.querySelector("#judul+.error_container");
  const errorAuthor = document.querySelector("#penulis+.error_container");
  const errorYear = document.querySelector("#tahun+.error_container");
  const errorStatus = document.querySelector("#status+.error_container");
  errorTitle.innerHTML = "";
  errorAuthor.innerHTML = "";
  errorYear.innerHTML = "";
  errorStatus.innerHTML = "";
  // titlebook
  if (isEmptyForm(titleBook)) {
    errorTitle.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Judul tidak boleh kosong</p>`;
    titleBook.classList.add("error");
  } else {
    titleBook.classList.remove("error");
  }
  // authorbook
  if (isEmptyForm(authorBook)) {
    errorAuthor.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Penulis tidak boleh kosong</p>`;
    authorBook.classList.add("error");
  } else {
    if (!isOnlyChar(authorBook)) {
      errorAuthor.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Penulis hanya dapat berisi huruf</p>`;
      authorBook.classList.add("error");
    } else {
      authorBook.classList.remove("error");
    }
  }
  // yearbook
  if (isEmptyForm(yearBook)) {
    errorYear.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Tahun tidak boleh kosong</p>`;
    yearBook.classList.add("error");
  } else {
    if (!isOnlyNumber(yearBook)) {
      errorYear.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Tahun hanya dapat berisi angka</p>`;
      yearBook.classList.add("error");
    } else {
      yearBook.classList.remove("error");
    }
  }
  // statusbook
  if (isEmptyForm(statusBook)) {
    errorStatus.innerHTML = `<i class='fa-solid fa-circle-exclamation'></i><p>Pilih status baca Anda</p>`;
    statusBook.classList.add("error");
  } else {
    statusBook.classList.remove("error");
  }
  // return
  if (
    !isEmptyForm(titleBook) &&
    !isEmptyForm(authorBook) &&
    isOnlyChar(authorBook) &&
    !isEmptyForm(yearBook) &&
    isOnlyNumber(yearBook) &&
    !isEmptyForm(statusBook)
  ) {
    return true;
  } else {
    return false;
  }
};

const removeErrorAll = () => {
  const errorTitle = document.querySelector("#judul+.error_container");
  const errorAuthor = document.querySelector("#penulis+.error_container");
  const errorYear = document.querySelector("#tahun+.error_container");
  const errorStatus = document.querySelector("#status+.error_container");
  errorTitle.innerHTML = "";
  errorAuthor.innerHTML = "";
  errorYear.innerHTML = "";
  errorStatus.innerHTML = "";

  titleBook.classList.remove("error");
  authorBook.classList.remove("error");
  yearBook.classList.remove("error");
  statusBook.classList.remove("error");

  isConfirmForm = false;
};

// hide dropdown menu mobile
const hideMenu = () => {
  const navDropdownContent = document.querySelector(".nav_dropdown_content"),
    navScreen = document.querySelector(".nav_dropdown_screen");

  navDropdownContent.classList.remove("active");
  navScreen.classList.remove("active");
  navScreen.style.pointerEvents = "none";
  document.querySelector("html").style.overflow = "auto";
  document.querySelector("html").style.height = "auto";
};
