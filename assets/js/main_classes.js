const myLibrary = [];
// Using classes for book objects
class Book {
  constructor(name, author, read, summary, pages) { // constructor
    this.name = name;
    this.author = author;
    this.summary = summary;
    this.read = read;
    this.pages = pages;
  }

  updateToggleRead() {
    this.read = !this.read;
  }

  isValid() {
    const valid = [];
    Object.keys(this).forEach((key) => {
      if (key !== 'read') {
        if (this[key] === '' || this[key] === undefined || this[key] === null) {
          valid.push(`${key}:cannot be empty`);
        }
      }
    });
    return valid;
  }

  renderBookHtmlTag(index) {
    if (index.null) { return; }
    return `<tr>
        <td>${this.name}</td>
        <td>${this.author}</td>
        <td>${this.pages}</td>
        <td>${this.summary}</td>
        <td>${this.readTag()}</td>
        <td>
            <button type="button" class="btn-remove btn btn-outline-dark" onclick="removeBook(${index})" data-index="${index}">
            <img src="./assets/img/delete_book.svg" alt="Delete Book">
            </button>
        </td>
        <td><button type="button" class="btn-read btn btn-outline-dark" onclick="updateRead(${index})" data-index="${index}">
        ${this.read ? '<img src="./assets/img/no_read.svg" alt="not read">' : '<img src="./assets/img/yes_read.svg" alt="read">'}
        </button>
        </td>
    </tr>`;
  }

  showAlert() {
    let label = `book:${this.name}, author:${this.author}`;
    label += `, summary:${this.summary}`;
    if (this.read) {
      label += ', yes I have read this book';
    } else {
      label += ', not read';
    }
    return label;
  }

  readTag() {
    if (this.read) {
      return '<span class="yes-read">Yes</span>';
    }
    return '<span class="no-read">No</span>';
  }
}


/* Firebase configuration */

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8rw5MIWcelq1HM9JxJDG_wXCT3Zch_DU',
  authDomain: 'js-library-e02ea.firebaseapp.com',
  databaseURL: 'https://js-library-e02ea.firebaseio.com',
  projectId: 'js-library-e02ea',
  storageBucket: 'js-library-e02ea.appspot.com',
  messagingSenderId: '1039637934443',
  appId: '1:1039637934443:web:78ce3c64c6952302529c2e',
  measurementId: 'G-B89FBJ4YB7',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

/* Saving data into firebase real time  database */
const database = firebase.database();
loadBooksFromDatabase(database);


function renderBooks(bookList) {
  let htmlTags = '';
  for (let i = 0; i < bookList.length; i += 1) {
    if (bookList[i]) {
      htmlTags += bookList[i].renderBookHtmlTag(i);
    }
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

  updateDbBook(book, index).then(
    refreshList()
  );
}
/* eslint-enable */

function clearForm() {
  document.getElementById('bookName').value = '';
  document.getElementById('bookAuthor').value = '';
  document.getElementById('bookSummary').value = '';
  document.getElementById('readBook').checked = false;
}

/* eslint-disable */

function saveBook(book) {
  myLibrary.push(book);
  let index = myLibrary.length - 1
  writeDbBook(book, index)
}

function processForm() {
  const book = new Book();
  book.name = document.getElementById('bookName').value;
  book.author = document.getElementById('bookAuthor').value;
  book.summary = document.getElementById('bookSummary').value;
  book.pages = document.getElementById('numberPages').value;
  book.read = document.getElementById('readBook').checked;
  const validBook = book.isValid();
  const element = document.getElementById('warningMessage');
  if (validBook.length === 0) {
    saveBook(book);
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
  deleteDbBook(index).then(
    refreshList()
  );
}
/* eslint-enable */


function writeUserData(userId, name, email, imageUrl) {
  firebase.database().ref(`users/${userId}`).set({
    username: name,
    email,
    profile_picture: imageUrl,
  });
}

function writeDbBook(book, id) {
  database.ref(`books/${id}`).set({
    name: book.name,
    author: book.author,
    summary: book.summary,
    pages: book.pages,
    read: book.read,
  });
}

function deleteDbBook(id) {
  const update = {};
  update[`books/${id}`] = null;
  return firebase.database().ref().update(update);
}

function updateDbBook(book, id) {
  const bookData = {
    name: book.name,
    author: book.author,
    summary: book.summary,
    pages: book.pages,
    read: book.read,
  };
  const update = {};
  update[`books/${id}`] = bookData;
  return firebase.database().ref().update(update);
}

function storeLibraryInDb(library) {
  for (let i = 0; i < library.length; i += 1) {
    writeDbBook(library[i], i);
  }
}


function loadBooksFromDatabase(database) {
  firebase.database().ref('/books').once('value').then((snapshot) => {
    const booksObject = (snapshot.val());
    console.log(booksObject)
    for (const key in booksObject) {
      const data = booksObject[key];
      myLibrary[key] = new Book(data.name, data.author, data.read, data.summary, data.pages);
    }
    refreshList();
    console.log(myLibrary);
    // ...
  });
}


document.addEventListener('DOMContentLoaded', () => {
  //  writeUserData(01, 'Carlos', 'canriquez@yoyo.com', 'https://mypicture.com');

  document.getElementById('saveButton').addEventListener('click', () => {
    processForm();
  });
});