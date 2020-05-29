const TOKEN = "AsrielDreamur_122498";

function addToResults(url, settings) {
    let results = document.querySelector( '.gamesContainer' );

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            results.innerHTML = "";
            responseJSON.forEach(game =>{
                results.innerHTML += `<div class="card gameCard mx-2">
                                            <div class="card-body flexCard">
                                                <h5>${game.title}</h5>
                                                <h6>ID: ${game.id}</h6>
                                            </div>
                                        </div>`;
            });
        })
        .catch( err => {
            alert(err.message);
        });
}

function fetchGames(){

    let url = '/games';
    let settings = {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${TOKEN}`
        }
    };

    addToResults(url, settings);
}

function init() {
    fetchGames();
}

init();