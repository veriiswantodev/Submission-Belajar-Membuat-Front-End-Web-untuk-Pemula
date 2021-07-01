const STORAGE_KEY = "BOOKSHELF_APPS";

let books = [];

function storageExist(){
  if(typeof(Storage) === undefined){
    alert("Browser tidak mendukung local storage!");
    return false;
  }
  
    return true;
}

function saveData(){
  const parsData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsData);
  document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage(){
  const serializeData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializeData);
  
  if(data !== null)
    books = data;
    
  document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataStorage(){
  if(storageExist())
    saveData();
}

function composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted){
  return{
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted
  }
}

function findBook(bookID){
  for (book of books) {
    if(book.id === bookID)
      return book;
  }
  
  return null;
}

function findBookIndex(bookID) {
  let index = 0
  for (book of books) {
    if(book.id === bookID)
      return index;

    index++;
  }

  return -1;
}

function refreshData(){
  const bookunCompleted = document.getElementById(UNCOMPLETED_BOOK_ID);
  const bookCompleted = document.getElementById(COMPLETED_BOOK_ID);
  
  for(book of books){
    const newBook = makeBook(book.bookTitle, book.bookAuthor, book.bookYear, book.isCompleted);
    newBook[BOOK_ID] = book.id;
    
    if(book.isCompleted){
      bookCompleted.append(newBook);
    }else{
      bookunCompleted.append(newBook);
    }
  }
}