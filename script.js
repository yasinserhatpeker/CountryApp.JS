
document.querySelector("#btnSearch").addEventListener("click", ()=> {
  let text=document.querySelector("#txtSearch").value;
  getCountry(text);
});


function getCountry(country)
 {
    const request= new XMLHttpRequest();

request.open("GET",'https://restcountries.com/v3.1/name/'+ country);

request.send();

request.addEventListener("load",function() {
    const data=JSON.parse(this.responseText);
    console.log(typeof data);
    console.log(data);
    renderCountry(data[0]);

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

     let html=`
     <div class="card-header">
          Search Result
       </div>
       <div class="card-body">
              <div class="row">
                <div class="col-4">
                  <img src="${data.flags.png}" alt="" class="img-fluid">

                </div>
                <div class="col-8">
                    <div class="card-title">
                     ${data.name.common}
                    </div>
                    <hr>
                    <div class="row">
                      <div class="col-4">Population:</div>
                      <div class="col-8">${(data.population/1000000).toFixed(1)} Million</div>
                    </div>
                    <div class="row">
                      <div class="col-4">Language(s): </div>
                      <div class="col-8">${Object.values(data.languages)}</div>
                    </div>
                    <div class="row">
                      <div class="col-4">Capital: </div>
                      <div class="col-8">${data.capital[0]}</div>
                    </div>

                </div>
              </div>
              
       </div>
     `;

     document.querySelector("#country-details").innerHTML=html;
}




























