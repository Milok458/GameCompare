const TOKEN = "AsrielDreamur_122498";

function regularQuery(url, settings){
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response;
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            alert("Action Successful!");
        })
        .catch( err => {
            alert(err.message);
        });
}

function deleteGame(id) {
    let url = '/game/'+id;
    let settings = {
        method : 'DELETE',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    };

    regularQuery(url, settings);
}

function updateGame(body) {
    let url = '/game';
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    };

    regularQuery(url, settings);
}

function createNewGame(body) {
    let url = '/game';
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    };

    regularQuery(url, settings);
}

function patchGame(body){
    let title =  document.querySelector("#titleEdit").value;
    let year =  document.querySelector("#yearEdit").value;
    let price =  document.querySelector("#priceEdit").value;
    let genre =  document.querySelector("#genreEdit").value;
    let category =  document.querySelector("#categoryEdit").value;
    let studio =  document.querySelector("#studioEdit").value;
    let mcr =  document.querySelector("#mcrEdit").value;
    let gsr =  document.querySelector("#gsrEdit").value;
    let grr =  document.querySelector("#grrEdit").value;
    let amzn =  document.querySelector("#amznEdit").value;
    let boxArt =  document.querySelector("#boxArtEdit").value;
    let desc =  document.querySelector("#descEdit").value;

    if(title !== ""){
        body.title = title;
    }

    if(studio !== ""){
        body.studio = studio;
    }

    if(genre !== ""){
        body.genre = genre;
    }

    if(category !== ""){
        body.category = category;
    }

    if(amzn !== ""){
        body.url = amzn;
    }

    if(boxArt !== ""){
        body.image = boxArt;
    }

    if(desc !== ""){
        body.description = desc;
    }

    if(mcr !== ""){
        if(Number(mcr)){
            if(Number(mcr) > 10 || Number(mcr) < 0){
                alert("Metacritic Rating must be between 0 and 10 inclusive! This value will not be updated!");
            }
            else{
                body.metacriticRating = Number(mcr);
            }
        }
        else{
            alert("Metacritic Rating must be numeric! This value will not be updated!");
        }
    }

    if(grr !== ""){
        if(Number(grr)){
            if(Number(grr) > 10 || Number(grr) < 0){
                alert("GamesRadar Rating must be between 0 and 10 inclusive! This value will not be updated!");
            }
            else{
                body.metacriticRating = Number(grr);
            }
        }
        else{
            alert("GamesRadar Rating must be numeric! This value will not be updated!");
        }
    }

    if(gsr !== ""){
        if(Number(gsr)){
            if(Number(gsr) > 10 || Number(gsr) < 0){
                alert("GameSpot Rating must be between 0 and 10 inclusive! This value will not be updated!");
            }
            else{
                body.metacriticRating = Number(gsr);
            }
        }
        else{
            alert("GameSpot Rating must be numeric! This value will not be updated!");
        }
    }

    if(year !== ""){
        if(Number(year)){
            body.year = Number(year);
        }
        else{
            alert("Year must be numeric! This value will not be updated!");
        }
    }

    if(price !== ""){
        if(Number(price)){
            body.price = Number(price);
        }
        else{
            alert("Price must be numeric! This value will not be updated!");
        }
    }

    body.averageRating = (body.metacriticRating + body.gameStopRating + body.gamesRadarRating)/3;

    updateGame(body);
}

function editListener(){
    let form = document.querySelector("#edit");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let id = document.querySelector("#idEdit").value;

        if(id !== ""){
            let url = '/games/'+id;
            let settings = {
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${TOKEN}`
                }
            };

            fetch( url, settings )
                .then( response => {
                    if( response.ok ){
                        return response.json();
                    }
                    throw new Error( response.statusText );
                })
                .then( responseJSON => {
                    form.reset();
                    patchGame(responseJSON);
                })
                .catch( err => {
                    alert("Error! Game ID not found!");
                });
        }
        else{
            alert("Error! Game ID can't be empty!");
        }
    });
}

function createListener(){
    let form = document.querySelector("#create");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let title =  document.querySelector("#titleNew").value;
        let year =  document.querySelector("#yearNew").value;
        let price =  document.querySelector("#priceNew").value;
        let genre =  document.querySelector("#genreNew").value;
        let category =  document.querySelector("#categoryNew").value;
        let studio =  document.querySelector("#studioNew").value;
        let mcr =  document.querySelector("#mcrNew").value;
        let gsr =  document.querySelector("#gsrNew").value;
        let grr =  document.querySelector("#grrNew").value;
        let amzn =  document.querySelector("#amznNew").value;
        let boxArt =  document.querySelector("#boxArtNew").value;
        let desc =  document.querySelector("#descNew").value;

        if(title === "" || year === "" || price === "" || genre === "" || category === "" || studio === ""
            || mcr === "" || gsr === "" || grr === "" || amzn === "" || boxArt === "" || desc === ""){
            alert("A field was left empty! Try again!");
        }
        else{
            if(Number(mcr) && Number(gsr) && Number(grr) && Number(year) && Number(price)){
                if(Number(mcr) > 10 || Number(gsr) > 10 || Number(grr) > 10 ||
                    Number(mcr) < 0 || Number(gsr) < 0 || Number(grr) < 0){
                    alert("Ratings must be between 0 and 10 inclusive!");
                }
                else{
                    let body = {
                        title: title,
                        year: Number(year),
                        price: Number(price),
                        genre: genre,
                        category: category,
                        studio: studio,
                        metacriticRating: Number(mcr),
                        gameStopRating: Number(gsr),
                        gamesRadarRating: Number(grr),
                        url: amzn,
                        image: boxArt,
                        description: desc
                    };

                    form.reset();

                    createNewGame(body);
                }
            }
            else{
                alert("Year, ratings and price must be numeric values!");
            }
        }
    });
}

function deleteListener(){
    let form = document.querySelector("#delete");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let id = document.querySelector("#idDel");

        if(id.value === ""){
            alert("Id is empty! Try again!");
        }
        else{
            form.reset();
            deleteGame(id.value);
        }
    });
}

function init() {
    deleteListener();
    createListener();
    editListener();
}

init();