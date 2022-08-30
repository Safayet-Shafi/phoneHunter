const loadPhone = async(name,dataLimit)=>{
     url=`https://openapi.programming-hero.com/api/phones?search=${name}`

     const res= await fetch(url)
     const phones = await res.json()
     displayPhone(phones.data,dataLimit)
    //  console.log(phones.data,dataLimit)
 }

const displayPhone=(phones,dataLimit)=>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent=``;
    const showMore = document.getElementById('show-all')
    if(dataLimit && phones.length>10){
        // display 10 phones
        phones=phones.slice(0,10)
        
        showMore.classList.remove('d-none')
    }
    else{
        showMore.classList.add('d-none')
    }
    
    
    
    
    // display none text
    const noneMsg =document.getElementById('display-none-div')
    if(phones.length === 0){
        
        noneMsg.classList.remove('d-none')
    }
    else{
        noneMsg.classList.add('d-none')
        phones.forEach(phone=>{
            //  console.log(phone)
            const phoneDiv = document.createElement('div')
            phoneDiv.classList.add('col')
            phoneDiv.innerHTML=`
            <div class="p-5 border border-primary card ">
                <img src="${phone.image}" class="card-img-top img-thumbnail" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.slug}</p>
                    <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show details</button>
                </div>
                   
          </div>`
          phoneContainer.appendChild(phoneDiv);
        })
    }
    // phones.forEach(phone=>{
    //     //  console.log(phone)
    //     const phoneDiv = document.createElement('div')
    //     phoneDiv.classList.add('col')
    //     phoneDiv.innerHTML=`
    //     <div class="p-5 border border-primary card ">
    //         <img src="${phone.image}" class="card-img-top img-thumbnail" alt="...">
    //         <div class="card-body">
    //         <h5 class="card-title">${phone.phone_name}</h5>
    //         <p class="card-text">${phone.slug}</p>
    //         </div>
    //   </div>`
    //   phoneContainer.appendChild(phoneDiv);
    // })
    //loader stop
    toggleSpinner(false)
}




// search by phone name
document.getElementById('btn-search').addEventListener('click',function(){
    //loader start
   processSearch(10);
});
document.getElementById('display-all-btn').addEventListener('click',function(){
    //loader start
   processSearch();
   
});

// search by key enter
document.getElementById('search-field').addEventListener('keypress',function(e){
    // console.log(e.key)
    if(e.key == 'Enter'){
        processSearch(10);
    }
})




//loader activation function 



const toggleSpinner =(isLoading)=>{
    const spinnerField = document.getElementById('loader')
    if(isLoading){
        spinnerField.classList.remove('d-none')
    }
    else{
        spinnerField.classList.add('d-none')
    }
}

const loadDetails=async(id)=>{
    url=`https://openapi.programming-hero.com/api/phone/${id}`

    const res= await fetch(url)
    const data =await res.json()
    displayDetails(data.data)
}

const displayDetails=(phone)=>{
    const modalPart= document.getElementById('modal-part')
    console.log(phone)
    modalPart.innerHTML=`
    <div class="modal-header">
        <h5 class="modal-title" id="phoneDetailModalLabel">${phone.name}</h5>
        
  </div>
  <div class="modal-body">
        <div class="card" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${phone.releaseDate}</h5>
            <h2>Features</h2>
            <p class="card-text">${phone.mainFeatures.storage}</p><br>
            <p class="card-text">${phone.mainFeatures.displaySize}</p><br>

            
        </div>
</div>
    
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
   
  </div>`
}

