// BOOK constructor



function Book(title,author,isbn){
this.title=title;
this.author=author;
this.isbn=isbn;

}



// UI Constructor

function UI(){


}
// deleteBOOK
UI.prototype.deleteBook=function(target){

if(target.className==="delete"){
   target.parentElement.parentElement.remove();
    
}

}
UI.prototype.clearAlert=function(){
    if(document.querySelector(".alert")!=null){

        document.querySelector(".alert").remove();
    }
    

}
// Add book to list
UI.prototype.addBookToList=function(book){
const list=document.getElementById("book-list");


// Create Element tr

const row=document.createElement("tr");


// insert cols

row.innerHTML=`
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.isbn}</td>
<td><a href="#" class="delete">X</a></td>`
console.log(row);

list.appendChild(row);




// 1st way of removing the book
// anchor tag removal function
// const remove=document.querySelector(".delete");
// console.log(`remove is ${remove.target}`)
// remove.addEventListener("click",function(e){
//     const ui=new UI();
//     e.target.parentElement.parentElement.remove();
//     ui.clearAlert();
//     ui.showAlert("Book was removed","error");
// });


console.log(book);

}



UI.prototype.showAlert=function(message,className){

    // create div
    const div=document.createElement("div");
    // addclass
    div.className=`alert ${className}`;
    div.appendChild(document.createTextNode(message));
    // adding text to the element
    const ui=new UI();

    // get a parent
// so now i am targeting the parent of the div that i am inserting in
// which is the container and also targeting the form
// as i want to insert the div before the form and the container
    const container=document.querySelector(".container");
    const form=document.querySelector("#book-form");

// Clearing up alerts before displaying one
    ui.clearAlert();

    // InsertAlert
    container.insertBefore(div,form);
    // insertBefore takes 1st parameter for what to insert
    // 2nd pareamter for waht to insert before
    
    setTimeout(ui.clearAlert,3000);
    // so i have made a function to check if any alerts were displayed and clear them out before displaying other alerts 
    // and i did use it here to clear the alert without adding other alert instead of rewriting the same code  over and over
}





// this is clearing the input values after submitting it
UI.prototype.clearFields=function(){
    document.getElementById("title").value=" "
    document.getElementById("author").value=" "
    document.getElementById("isbn").value=" "
}


// Global eventlisetners
document.getElementById("book-form").addEventListener("submit",function(e){


    // getfromValue


const title=document.getElementById("title").value;
const author=document.getElementById("author").value;
const isbn=document.getElementById("isbn").value;
// seems everything is being capturejust fine

// book info
const book=new Book(title,author,isbn);

// UIOBJECT

const ui=new UI();
console.log(ui);
// validate input


if(title===" "||author===" "||isbn===" "){

// Eror alert

ui.showAlert("Please fill in all fields","error");
}
else{
// add book to list
ui.addBookToList(book);
// passing it to the ui prototype
// adding the books object values into the UI
// addition alert
ui.showAlert("Book was added","success");

// clearfield
ui.clearFields();
}


// clearing input valeus
// console.log(book);
e.preventDefault();

});

// 2nd way of removing the book
// event delegation

// evvent listner for delete
document.getElementById("book-list").addEventListener("click",function(e){

// ui object
const ui=new UI();

ui.deleteBook(e.target);

// removefrom localStorage
Store.deleteBook(e.target.parentElement.previousElementSibiling.textContent);


ui.showAlert("Book was deleted","error");
e.preventDefault();
})