class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {


    addBookToList(book) {
        const list = document.getElementById("book-list");
        // Create Element tr

        console.log.apply(`Passed books is ${book}`);

        const row = document.createElement("tr");
        // insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>`
        list.appendChild(row);

    }

    showAlert(message, className) {
        const div = document.createElement("div");
        // addclass
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        // adding text to the element
        const ui = new UI();
        const container = document.querySelector(".container");
        const form = document.querySelector("#book-form");
        ui.clearAlert();
        // InsertAlert
        container.insertBefore(div, form);
        setTimeout(ui.clearAlert, 3000);
    }
    deleteBook(target) {
        if (target.className === "delete") {
            const ui = new UI();
            if(confirm("Are you sure?")){
                target.parentElement.parentElement.remove();
                ui.showAlert("Book was deleted", "error");
            }
           

        }
    }
    clearFields() {
        document.getElementById("title").value = " "
        document.getElementById("author").value = " "
        document.getElementById("isbn").value = " "
    }
    clearAlert() {
        if (document.querySelector(".alert") != null) {

            document.querySelector(".alert").remove();
        }
    }
}
// Local Storage class
class Store {



    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = [];
        }
        else {
            books = JSON.parse(localStorage.getItem("books"));
        }
        return books;
    }
    static displayBooks() {
        const books = Store.getBooks();
        const body=document.body;
        // setTimeout(function(){


        // },3000);

            body.classList.add("anime");

            books.forEach(function (book) {

            const ui = new UI;

            ui.addBookToList(book);
        })

    }
    static addBook(book) {

        const books = Store.getBooks();

        books.push(book)

        localStorage.setItem("books", JSON.stringify(books))

    }

    static removeBook(isbn) {
        const books = Store.getBooks();
        console.log(`isbn is ${isbn}`)

        books.forEach(function (book, index) {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));

    }
}
// DOM LOAD EVENT
document.addEventListener("DOMContentLoaded", Store.displayBooks);
document.getElementById("book-form").addEventListener("submit", function (e) {


    // getfromValue


    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    // seems everything is being capturejust fine

    // book info
    const book = new Book(title, author, isbn);

    // UIOBJECT

    const ui = new UI();
    // validate input


    if (title === " " || author === " " || isbn === " ") {

        // Eror alert

        ui.showAlert("Please fill in all fields", "error");
    }
    else {
        // add book to list
        ui.addBookToList(book);
        console.log(`passed book object is ${book}`)



        // passing it to the ui prototype
        // adding the books object values into the UI
        // addition alert
        ui.showAlert("Book was added", "success");

        // clearfield
        ui.clearFields();

        // addtoLocalstorgage
        // const store=new Store();
        // mno need for that since its static method
        Store.addBook(book);
    }


    // clearing input valeus
    // console.log(book);
    e.preventDefault();

});

// 2nd way of removing the book
// event delegation

// evvent listner for delete
document.getElementById("book-list").addEventListener("click", function (e) {

    // ui object
    const ui = new UI();
    ui.deleteBook(e.target);

    console.log(`e target shit is ${e.target}`)
    // this.removefrom localStorage
    console.log(`isbn el awl is ${e.target.parentElement.previousElementSibling.textContent}`);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    e.preventDefault();
})
