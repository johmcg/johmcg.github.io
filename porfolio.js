fetch('https://api.github.com/users/johmcg/starred')
    .then(response => response.json())
    .then(data => {
        let htmlString = "";
        for (const items in data) {
            let name = data[items].name;
            let webAddress = "https://github.com/johmcg/" + data[items].name;
            let desc = data[items].description;
            let image = `https://raw.githubusercontent.com/johmcg/${name}/main/img/screenshot.png`;

            if (image === null){
                htmlString += `<div class="col-12 pb-5"> 
                  <div class=""> 
                    <div class="card">
                      <img src="..." class="card-img-top" alt="..."> 
                      <div class="card-body"> 
                        <h5 class="card-title">${name}</h5> 
                        <p class="card-text">${desc}</p> 
                      </div> 
                      <ul class="list-group list-group-flush"> 
                        <li class="list-group-item"> 
                          <a class="list-group-item" href="${webAddress}">${webAddress}</a>
                        </li> 
                      </ul>
                    </div> 
                  </div> 
                </div>`;

            } else{
                htmlString += `<div class="col-12 pb-5"> 
                  <div class=""> 
                    <div class="card" style="">
                      <img src="${image}" class="card-img-top" alt="..."> 
                      <div class="card-body"> 
                        <h5 class="card-title">${name}</h5> 
                        <p class="card-text">${desc}</p> 
                      </div> 
                      <ul class="list-group list-group-flush"> 
                        <li class="list-group-item"> 
                          <a class="list-group-item" href="${webAddress}">${webAddress}</a>
                        </li> 
                      </ul>
                    </div> 
                  </div> 
                </div>`;

            }


        }

            $(document).ready(function(){
                    $("#myCards").html(htmlString);
                                        });
          })
    .catch(error => console.error(error));

