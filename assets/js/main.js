let myLibrary = [];

function Book(name, author, read, summary) {
    this.name = name;
    this.author = author;
    this.summary = summary;
    this.read = read;
}

Book.prototype.addBookToLibrary = function () {

};

function renderBooks(book_list) {
    let html_tags = '';
    for (let i = 0; i < book_list.length; i++) {
        html_tags += book_list[i].renderBookHtmlTag();
    }
    return html_tags;
}


Book.prototype.renderBookHtmlTag = function () {
    return `<li>
          <div class="card">
            <div class="card-content">
              <div class="content book-row">
                <div class="name">${this.name}</div>
                <div class="description">${this.author}</div>
                <div class="description">${this.summary}</div>
                <div class="description">${this.readTag()}</div>
              </div>
            </div>
          </div>
        </li>`;
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



document.addEventListener("DOMContentLoaded", function () {
    var booksPlaceholder = document.getElementById('bookListRender');
    booksPlaceholder.innerHTML = renderBooks(myLibrary);
});

