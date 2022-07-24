// initiate variable
const formAddBook = document.getElementById("formAddBook"),
  containerReadyBook = document.getElementById("containerReadyBook"),
  containerFinishedBook = document.getElementById("containerFinishedBook"),
  titleBook = document.getElementById("judul"),
  authorBook = document.getElementById("penulis"),
  yearBook = document.getElementById("tahun"),
  statusBook = document.getElementById("status");

// initiate key for local storage
const localReadyBookKey = "LOCAL_READY_BOOK",
  localFinishedBookKey = "LOCAL_FINISHED_BOOK";

window.addEventListener("load", () => {
  if (typeof Storage !== "undefined") {
    if (localStorage.getItem(localReadyBookKey) === null) {
      localStorage.setItem(localReadyBookKey, "");
    }
    if (localStorage.getItem(localFinishedBookKey) === null) {
      localStorage.setItem(localFinishedBookKey, "");
    }
  } else {
    alert("Browser yang Anda gunakan tidak mendukung Web Storage");
  }

  //inisialisasi semua nilai field pada dokumen yang menggunakan nilai dari web storage
  containerReadyBook.innerText = localStorage.getItem(localReadyBookKey);
  containerFinishedBook.innerText = localStorage.getItem(localFinishedBookKey);
});

// event submit
// akan disimpan
// akan ditampilkan
