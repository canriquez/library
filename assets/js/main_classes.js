const myLibrary = [];

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

    renderBookHtmlTag(index) {
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
    };

    showAlert() {
        let label = `book:${this.name}, author:${this.author}`;
        label += `, summary:${this.summary}`;
        if (this.read) {
            label += ', yes I have read this book';
        } else {
            label += ', not read';
        }
        return label;
    };

    readTag() {
        if (this.read) {
            return '<span class="yes-read">Yes</span>';
        }
        return '<span class="no-read">No</span>';
    };

    renderBooks(bookList) {
        let htmlTags = '';
        for (let i = 0; i < bookList.length; i += 1) {
            htmlTags += bookList[i].renderBookHtmlTag(i);
        }
        return htmlTags;
    }
}



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
/* eslint-enable */

/* eslint-disable */
function removeBook(index) {
    myLibrary.splice(index, 1);
    refreshList();
}
/* eslint-enable */


saveBook(new Book('Atomic Habits', 'James Clear', true, 'Build habits and change your life', 234));
saveBook(new Book('In Search of Lost Time ', 'Marcel Proust', true, 'Swanns Way, the first part of A la recherche de temps perdu', 434));
saveBook(new Book('Ulysses ', 'James Joyce', false, 'Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.', 734));
saveBook(new Book(' Don Quixote', 'Miguel de Cervantes', false, 'Alonso Quixano, a retired country gentleman in his fifties,', 564));

document.addEventListener('DOMContentLoaded', () => {
    refreshList();
    saveButton.addEventListener("click", function () {
        processForm();
    })
});