// initiate variable
const formAddBook = document.getElementById("formAddBook"),
  containerReadyBook = document.getElementById("containerReadyBook"),
  containerFinishedBook = document.getElementById("containerFinishedBook"),
  titleBook = document.getElementById("judul"),
  authorBook = document.getElementById("penulis"),
  yearBook = document.getElementById("tahun"),
  statusBook = document.getElementById("status");

// initiate key for session storage
const sessionReadyBookKey = "SESSION_READY_BOOK",
  sessionFinishedBookKey = "SESSION_FINISHED_BOOK";

window.addEventListener("load", () => {
  if (typeof Storage !== "undefined") {
    if (sessionStorage.getItem(sessionReadyBookKey) === null) {
      sessionStorage.setItem(sessionReadyBookKey, "");
    }
    if (sessionStorage.getItem(sessionFinishedBookKey) === null) {
      sessionStorage.setItem(sessionFinishedBookKey, "");
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }

  //inisialisasi semua nilai field pada dokumen yang menggunakan nilai dari web storage
  containerReadyBook.innerText = sessionStorage.getItem(sessionReadyBookKey);
  containerFinishedBook.innerText = localStorage.getItem(
    sessionFinishedBookKey
  );
});
