/* exported updateRead */
/* exported saveBook */
/* exported removeBook */

const myLibrary = [];

function Book(name, author, read, summary) {
  this.name = name;
  this.author = author;
  this.summary = summary;
  this.read = read;
}

Book.prototype.updateToggleRead = function updateToggleRead() {
  this.read = !this.read;
};

Book.prototype.isValid = function isValid() {
  const valid = [];
  Object.keys(this).forEach((key) => {
    if (key !== 'read') {
      if (key === '' || key === undefined || key === null) {
        valid.push(key);
      }
    }
  });
  return valid;
};

Book.prototype.renderBookHtmlTag = function renderBookHtmlTag(index) {
  return `<div class="item-row container">
                  <div class="book-row book-row-short">${this.name}</div>
                  <div class="book-row book-row-short">${this.author}</div>
                  <div class="book-row book-row-item">${this.summary}</div>
                  <div class="book-row book-row-short">${this.readTag()}</div>
                  <div class="book-row remove-action ">
                      <button type="button" class="btn-remove btn btn-outline-dark" onclick="removeBook(${index})" data-index="${index}">Remove Book</button>
                  </div>
                  <div class="book-row read-action ">
                      <button type="button" class="btn-read btn btn-outline-dark" onclick="updateRead(${index})" data-index="${index}">${this.read ? 'Unread' : 'Read'}</button>
                  </div>
              </div>`;
};

Book.prototype.showAlert = function showAlert() {
  let label = `book:${this.name}, author:${this.author}`;
  label += `, summary:${this.summary}`;
  if (this.read) {
    label += ', yes I have read this book';
  } else {
    label += ', not read';
  }
  return label;
};


Book.prototype.readTag = function readTag() {
  if (this.read) {
    return '<span class="yes-read">Yes</span>';
  }
  return '<span class="no-read">No</span>';
};

function renderBooks(bookList) {
  let htmlTags = '';
  for (let i = 0; i < bookList.length; i += 1) {
    htmlTags += bookList[i].renderBookHtmlTag(i);
  }
  return htmlTags;
}

function refreshList() {
  const booksPlaceholder = document.getElementById('bookListRender');
  booksPlaceholder.innerHTML = renderBooks(myLibrary);
}

/* eslint-disable */
function updateRead(index) {
    const book = myLibrary[index];
    book.updateToggleRead();
    refreshList();
}
/* eslint-enable */

function clearForm() {
  document.getElementById('bookName').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookSummary').value = '';
  document.getElementById('readBook').checked = false;
}

/* eslint-disable */
function saveBook() {
    const book = new Book();
    book.name = document.getElementById('bookName').value;
    book.author = document.getElementById('bookAuthor').value;
    book.summary = document.getElementById('bookSummary').value;
    book.read = document.getElementById('readBook').checked;

    const validBook = book.isValid();
    const element = document.getElementById('warningMessage');
    if (validBook.length === 0) {
        myLibrary.push(book);
        refreshList();
        document.getElementById('warningMessage').innerHTML = '';
        element.classList.add('hide');
        element.classList.remove('show');
        clearForm();
    } else {
        element.classList.add('show');
        element.classList.remove('hide');
        document.getElementById('warningMessage').innerHTML = `Invalid entry on: ${validBook.join(', ')}`;
    }
}
/* eslint-enable */

/* eslint-disable */
function removeBook(index) {
    myLibrary.splice(index, 1);
    refreshList();
}
/* eslint-enable */

let book = new Book('Atomic Habits', 'James Clear', true, 'Build habits and change your life');
myLibrary.push(book);
book = new Book('In Search of Lost Time ', 'Marcel Proust', true, "Swann's Way, the first part of A la recherche de temps perdu");
myLibrary.push(book);
book = new Book('Ulysses ', 'James Joyce', false, 'Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.');
myLibrary.push(book);
book = new Book(' Don Quixote', 'Miguel de Cervantes', false, 'Alonso Quixano, a retired country gentleman in his fifties,');
myLibrary.push(book);

document.addEventListener('DOMContentLoaded', () => {
  refreshList();
});