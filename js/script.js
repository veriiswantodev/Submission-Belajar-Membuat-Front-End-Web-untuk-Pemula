document.addEventListener("DOMContentLoaded", function(){
  const submitForm = document.getElementById("inputBook");
  
  submitForm.addEventListener("submit", function(event){
    event.preventDefault();
    addBook();
  });
  
  if(storageExist()){
    loadDataFromStorage();
  }

});

document.addEventListener('ondataloaded', () => {
  refreshData();
});

