const UNCOMPLETED_BOOK_ID = "incompleteBookshelfList";
const COMPLETED_BOOK_ID = "completeBookshelfList";
const BOOK_ID = "bookID";
const searchList = document.querySelector("#searchBookTitle");

searchList.addEventListener("keyup", searchBook);

function makeBook(textTitle, textAuthor, textYear, isCompleted){
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = textTitle;
  
  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = textAuthor;
  
  const bookYear = document.createElement("small");
  bookYear.innerText = textYear;
  
  const textContainer = document.createElement("div");
  textContainer.classList.add("book-item", "bg-light", "rounded-3", "p-1", "m-3");
  textContainer.append(bookTitle, bookAuthor, bookYear);
  
  if(isCompleted){
    textContainer.append(
      unreadButon(),
      deleteButton()
      );
  }else{
    textContainer.append(
      readButton(),
      deleteButton()
      );
  }
  
  return textContainer;
}

function addBook(){
  const uncompletedBook = document.getElementById(UNCOMPLETED_BOOK_ID);
  const completedBook = document.getElementById(COMPLETED_BOOK_ID);
  
  const inputTitle = document.getElementById("inputBookTitle").value;
  const inputAuthor = document.getElementById("inputBookAuthor").value;
  const inputYear = document.getElementById("inputBookYear").value;
  const bookIsCompleted = document.getElementById("inputBookIsComplete");
  
  // mengecek apakah checkbox "sudah dibaca" di centang atau tidak
  if(bookIsCompleted.checked === true){
    const book = makeBook(inputTitle, inputAuthor, inputYear, true);
    
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, true)
    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);
    
    completedBook.append(book);
    updateDataStorage();
  }else{
    const book = makeBook(inputTitle, inputAuthor, inputYear, false);
    
    const bookObject = composeBookObject(inputTitle, inputAuthor, inputYear, false)
    book[BOOK_ID] = bookObject.id;
    books.push(bookObject);
    
    uncompletedBook.append(book);
    updateDataStorage();
  }
}

function createButton(buttonTypeClass, text, eventListener){
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.innerText = text;
  button.addEventListener("click", function(event){
    eventListener(event);
  });
  
  return button;
}

function addBookToCompleted(bookElement){
  const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
  
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelector("p").innerText;
  const bookYear = bookElement.querySelector("small").innerText;
  
  const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = true;
  newBook[BOOK_ID] = book.id;
  bookCompleted.append(newBook);
  bookElement.remove();
  
  updateDataStorage();
}

function undoToUncompleted(bookElement){
  const bookunCompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  
  const bookTitle = bookElement.querySelector("h3").innerText;
  const bookAuthor = bookElement.querySelector("p").innerText;
  const bookYear = bookElement.querySelector("small").innerText;
  
  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const book = findBook(bookElement[BOOK_ID]);
  book.isCompleted = false;
  newBook[BOOK_ID] = book.id;
  bookunCompleted.append(newBook);
  bookElement.remove();
  
  updateDataStorage();
}

function deleteBook(bookElement){
  const bookPost = findBookIndex(bookElement[BOOK_ID]);
  
  books.splice(bookPost, 1); 
  bookElement.remove();
  
  updateDataStorage();
}

function readButton(){
  return createButton("green", "selesai dibaca", function(event){
    addBookToCompleted(event.target.parentElement);
  });
}

function unreadButon(){
  return createButton("blue", "belum selesai", function(event){
    undoToUncompleted(event.target.parentElement);
  });
}

function deleteButton(){
  return createButton("red", "Hapus", function(event){
    deleteBook(event.target.parentElement);
  });
}

//custom search filter

function searchBook(e){
  
  const search = e.target.value.toLowerCase();
  const listBook = document.querySelectorAll(".book-item");
  
  listBook.forEach((bookItem) => {
    const bookList = bookItem.firstChild.textContent.toLowerCase();
    
    if(bookList.indexOf(search) != -1 ){
      bookItem.setAttribute("style", "display: block;");
    }else{
      bookItem.setAttribute("style", "display: none !important;");
    }
  });
}