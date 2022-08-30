const processSearch = (dataLimit)=>{
    toggleSpinner(true)
    const searchField = document.getElementById('search-field')
    const searchText= searchField.value 
    
    loadPhone(searchText,dataLimit)
    // searchField.value=``;
}