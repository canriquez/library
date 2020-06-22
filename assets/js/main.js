const myLibrary = [];

function Book(name, author, read, summary, pages) {
    this.name = name;
    this.author = author;
    this.summary = summary;
    this.read = read;
    this.pages = pages;
}

Book.prototype.updateToggleRead = function updateToggleRead() {
    this.read = !this.read;
};

Book.prototype.isValid = function isValid() {
    const valid = [];
    Object.keys(this).forEach((key) => {
        console.log('current key;' + key)
        if (key !== 'read') {
            if (this[key] === '' || this[key] === undefined || this[key] === null) {
                valid.push(key + ":cannot be empty");
            };
        }
    });
    if (isNaN(this['pages'])) {
        console.log('pages is not a number');
        valid.push(key + ":must be a number");
    };
    return valid;
};

Book.prototype.renderBookHtmlTag = function renderBookHtmlTag(index) {
    return `<div class="item-row container">
                  <div class="book-row book-row-short">${this.name}</div>
                  <div class="book-row book-row-short">${this.author}</div>
                  <div class="book-row book-row-short">${this.pages}</div>
                  <div class="book-row book-row-item">${this.summary}</div>
                  <div class="book-row book-row-short">${this.readTag()}</div>
                  <div class="book-row remove-action ">
                      <button type="button" class="btn-remove btn btn-outline-dark" data-index="${index}">Remove Book</button>
                  </div>
                  <div class="book-row read-action ">
                      <button type="button" class="btn-read btn btn-outline-dark" data-index="${index}">${this.read ? 'Unread' : 'Read'}</button>
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
    setTimeout(addListeners(), 300);
}

function updateRead(index) {
    const book = myLibrary[index];
    book.updateToggleRead();
    refreshList();
}

function clearForm() {
    document.getElementById('bookName').value = '';
    document.getElementById('bookAuthor').value = '';
    document.getElementById('bookSummary').value = '';
    document.getElementById('readBook').checked = false;
    document.getElementById('numberPages').value = '';
}


function saveBook(book) {
    myLibrary.push(book);
    return
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

function removeBook(index) {
    myLibrary.splice(index, 1);
    refreshList();
}


saveBook(new Book('Atomic Habits', 'James Clear', true, 'Build habits and change your life', 234));
saveBook(new Book('In Search of Lost Time ', 'Marcel Proust', true, 'Swanns Way, the first part of A la recherche de temps perdu', 434));
saveBook(new Book('Ulysses ', 'James Joyce', false, 'Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.', 734));
saveBook(new Book(' Don Quixote', 'Miguel de Cervantes', false, 'Alonso Quixano, a retired country gentleman in his fifties,', 564));

document.addEventListener('DOMContentLoaded', () => {
    refreshList();
    saveButton.addEventListener("click", function() {
        processForm();
    })
});

function addListeners() {
    var elements = document.getElementsByClassName("btn-remove");
    var readButtons = document.getElementsByClassName("btn-read");
    var myFunction = function() {
        var attribute = this.getAttribute("data-index");
        removeBook(attribute);
    };
    var updateFunction = function() {
        var attribute = this.getAttribute("data-index");
        updateRead(attribute);
    };

    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('click', myFunction, false);
    }
    for (var i = 0; i < readButtons.length; i++) {
        readButtons[i].addEventListener('click', updateFunction, false);
    }
}