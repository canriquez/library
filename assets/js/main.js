let myLibrary = [];

function Book() {
}

Book.prototype.addBookToLibrary = function (name, author, read, summary) {
    this.name = name;
    this.author = author;
    this.summary = summary;
    this.read = read;
    let label = "book:" + this.name + ", author:" + this.author;
    label += ", summary:" + this.summary;
    if (this.read) {
        label += ", yes I have read this book";
    } else {
        label += ", not read";
    }
};