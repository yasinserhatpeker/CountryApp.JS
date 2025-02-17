
document.querySelector("#btnSearch").addEventListener("click",()=> {
    text=document.querySelector("#txtSearch").values;
    getCountry(text);

})

function getCountry(country)
 {
    const request= new XMLHttpRequest();

request.open("GET",'https://restcountries.com/v3.1/name/'+ country);

request.send();

request.addEventListener("load",function() {
    const data=JSON.parse(this.responseText);
    console.log(typeof data);
    console.log(data);
    setCountry(data);

    const countries=data[0].borders.toString();

    //load neighbors

    const req= new XMLHttpRequest();
    req.open("GET",'https://restcountries.com/v3.1/alpha?codes='+countries);
    req.send();

    req.addEventListener("load",function(){
        const data=JSON.parse(this.responseText);
        setCountry(data);
    });
});
 }    


function renderCountry(data) {
    for(let country of data) {

  
    const html=`
       <div class="col-3"> 
          <div class="card h-100">
          <img src="${country.flags.png}" class="card-img-top">
          
           <div class="card-body">
             <h5 class="card-title">${country.name.common}</h5>
           </div>
           <ul class="list-group list-group-flush"> 
            <li class="list-group-item">Population: ${(country.population/1000000).toFixed(1)}</li>
            <li class="list-group-item">Capital:${country.capital[0]}</li>
            <li class="list-group-item">Language:${Object.values(country.languages)}</li>
           
           </ul>
           </div>
    
       </div> 
    `;
     
    document.querySelector(".container .row").insertAdjacentHTML("beforeend",html);
}
}

displayCountry("türkiye");

























