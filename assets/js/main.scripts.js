// load DOM Content
document.addEventListener("DOMContentLoaded", function () {
  const formAddBook = document.getElementById("formAddBook");
  formAddBook.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("berhasil");
    addBook();
  });
});

// declare variable
const bookData = [];
const RENDER_EVENT = "render-book";

// generate ID
const geneateId = () => {
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

  const idBook = geneateId();
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

// render book
document.addEventListener(RENDER_EVENT, () => {
  console.log(bookData);
});
