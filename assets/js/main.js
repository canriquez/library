let myLibrary = [];

function Book(name, author, read, summary, index) {
    this.name = name;
    this.author = author;
    this.summary = summary;
    this.read = read;
}

Book.prototype.addBookToLibrary = function () {

};

Book.prototype.updateToggleRead = function () {
    this.read = !this.read;
}

function updateRead(index) {
    let book = myLibrary[index];
    book.updateToggleRead();
    refreshList();
}

function renderBooks(book_list) {
    let html_tags = '';
    for (let i = 0; i < book_list.length; i++) {
        html_tags += book_list[i].renderBookHtmlTag(i);
    }
    return html_tags;
}

function saveBook() {
    let book = new Book();
    book.name = document.getElementById("bookName").value;
    book.author = document.getElementById("bookAuthor").value;
    book.summary = document.getElementById("bookSummary").value;
    book.read = document.getElementById("readBook").checked;

    let validBook = book.isValid();
    var element = document.getElementById("warningMessage");
    if (validBook.length == 0) {
        myLibrary.push(book);
        refreshList();
        document.getElementById("warningMessage").innerHTML = "";
        element.classList.add("hide");
        element.classList.remove("show");
        clearForm();
    } else {

        element.classList.add("show");
        element.classList.remove("hide");
        document.getElementById("warningMessage").innerHTML = `Invalid entry on: ${validBook.join(", ")}`;
    }
}

function clearForm() {
    document.getElementById("bookName").value = "";
    document.getElementById("bookAuthor").value = "";
    document.getElementById("bookSummary").value = "";
    document.getElementById("readBook").checked = false;
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    refreshList();
}

Book.prototype.isValid = function () {
    let valid = [];
    for (let key in this) {
        if (key != "read")
            if (this[key] == '' || this[key] == undefined || this[key] == null) {
                valid.push(key);
            }
    }
    return valid;
}

Book.prototype.renderBookHtmlTag = function (index) {
    return `<div class="item-row container">
                    <div class="book-row book-row-short">${this.name}</div>
                    <div class="book-row book-row-short">${this.author}</div>
                    <div class="book-row book-row-item">${this.summary}</div>
                    <div class="book-row book-row-short">${this.readTag()}</div>
                    <div class="book-row remove-action ">
                        <button type="button" class="btn-remove btn btn-outline-dark" onclick="removeBook(${index})" data-index="${index}">Remove Book</button>
                    </div>
                    <div class="book-row read-action ">
                        <button type="button" class="btn-read btn btn-outline-dark" onclick="updateRead(${index})" data-index="${index}">${this.read ? "Unread" : "Read"}</button>
                    </div>
                </div>`;
}

Book.prototype.showAlert = function () {
    console.log("here: " + this.name)
    let label = "book:" + this.name + ", author:" + this.author;
    label += ", summary:" + this.summary;
    if (this.read) {
        label += ", yes I have read this book";
    } else {
        label += ", not read";
    }
    return label
}


Book.prototype.readTag = function () {
    if (this.read) {
        return '<span class="yes-read">Yes</span>'
    } else {
        return '<span class="no-read">No</span>'
    }
};

let book = new Book("Atomic Habits", "James Clear", true, "Build habits and change your life");
myLibrary.push(book);
book = new Book("In Search of Lost Time ", "Marcel Proust", true, "Swann's Way, the first part of A la recherche de temps perdu");
myLibrary.push(book);
book = new Book("Ulysses ", "James Joyce", false, "Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904.");
myLibrary.push(book);
book = new Book(" Don Quixote", "Miguel de Cervantes", false, "Alonso Quixano, a retired country gentleman in his fifties,");
myLibrary.push(book);

function refreshList() {
    var booksPlaceholder = document.getElementById('bookListRender');
    booksPlaceholder.innerHTML = renderBooks(myLibrary);
}

document.addEventListener("DOMContentLoaded", function () {
    refreshList();
});