const TOKEN = "AsrielDreamur_122498";

let allGames = [];
let yearOptions = "";
let studioOptions = "";
let categoryOptions = "";
let genreOptions = "";

function addToResults(res) {
    let results = document.querySelector( '.gamesContainer' );

    results.innerHTML = "";
    res.forEach(game => {
        results.innerHTML += `<div class="card gameCard mx-2" id="${game.id}">
                                    <div class="card-body flexCard">
                                        <h5>${game.title}</h5>
                                        <img src="${game.image}" alt="Box Art" width="100" height="162">
                                    </div>
                                </div>`;
    });

    if(results.innerHTML === ""){
        results.innerHTML = `<h1>No games found!</h1>`;
    }
    else{
        gameListener();
    }
}

function genOptions() {
    let years = [];
    let studios = [];
    let categories = [];
    let genres = [];

    allGames.forEach(game =>{
        if(!years.includes(game.year)){
            years.push(game.year);
        }
        if(!studios.includes(game.studio)){
            studios.push(game.studio);
        }
        if(!categories.includes(game.category)){
            categories.push(game.category);
        }
        if(!genres.includes(game.genre)){
            genres.push(game.genre);
        }
    });

    years.forEach(val =>{
        yearOptions+=`<option value="${val}">${val}</option>`;
    });

    studios.forEach(val =>{
        studioOptions+=`<option value="${val}">${val}</option>`;
    });

    categories.forEach(val =>{
        categoryOptions+=`<option value="${val}">${val}</option>`;
    });

    genres.forEach(val =>{
        genreOptions+=`<option value="${val}">${val}</option>`;
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

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            allGames = responseJSON;
            genOptions();
            selectSearch();
        })
        .catch( err => {
            alert(err.message);
            genOptions();
            selectSearch();
        });
}

function subForm() {
    let form = document.querySelector(".card");
    let search = document.querySelector("#searchTypes");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let results = [];
        let parameter = document.querySelector("#srch").value;

        switch (search.value) {
            case 'title':
                allGames.forEach(game => {
                    if (game.title.includes(parameter)) results.push(game)
                });
                break;
            case 'year':
                allGames.forEach(game => {
                    if (game.year === Number(parameter)) results.push(game)
                });
                break;
            case 'studio':
                allGames.forEach(game => {
                    if (game.studio === parameter) results.push(game)
                });
                break;
            case 'price':
                allGames.forEach(game => {
                    if (game.price >= Number(parameter) && game.price < Number(parameter) + 20) results.push(game)
                });
                break;
            case 'rating':
                allGames.forEach(game => {
                    if (game.averageRating >= Number(parameter) && game.averageRating < Number(parameter) + 2) results.push(game)
                });
                break;
            case 'popularity':
                results = allGames;
                results.sort(function (a, b) {
                    let sumA = 0;
                    let sumB = 0;
                    a.points.forEach(point=>{
                       sumA += point.val;
                    });
                    b.points.forEach(point=>{
                        sumB += point.val;
                    });
                    return sumA - sumB;
                });
                if(parameter === "descending"){
                    results.reverse();
                }
                break;
            case 'category':
                allGames.forEach(game => {
                    if (game.category === parameter) results.push(game)
                });
                break;
            case 'genre':
                allGames.forEach(game => {
                    if (game.genre === parameter) results.push(game)
                });
                break;
            case 'keyword':
                allGames.forEach(game => {
                    if (game.description.includes(parameter)) results.push(game)
                });
                break;
            default:
                break;
        }

        addToResults(results);
    });
}

function selectSearch() {
    let search = document.querySelector("#searchTypes");

    let options = document.querySelector("#options");

    search.addEventListener('change', (event) => {
        switch (search.value) {
            case 'default':
                options.innerHTML = ``;
                break;
            case 'title':
                options.innerHTML = `<label>Type title full or partial title to search:</label>
                        <input type="text" class="form-control" id="srch"/>`;
                break;
            case 'year':
                options.innerHTML = `<label>Year:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Year</option> `+ yearOptions +`
                        </select>`;
                break;
            case 'studio':
                options.innerHTML = `<label>Studio:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Studio</option>`+ studioOptions +`
                        </select>`;
                break;
            case 'price':
                options.innerHTML = `<label>Price:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Price Range</option>
                            <option value="0">$0-$19.99</option>
                            <option value="20">$20-$39.99</option>
                            <option value="40">$40-$59.99</option>
                            <option value="60">$60+</option>
                        </select>`;
                break;
            case 'rating':
                options.innerHTML = `<label>Rating:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Rating Score Range</option>
                            <option value="0">0-1.9</option>
                            <option value="2">2-3.9</option>
                            <option value="4">4-5.9</option>
                            <option value="6">6-7.9</option>
                            <option value="8">8-9.9</option>
                            <option value="10">10</option>
                        </select>`;
                break;
            case 'popularity':
                options.innerHTML = `<label>Popularity:</label>
                        <select id="srch" class="form-control">
                            <option value="ascending" selected>Ascending</option>
                            <option value="descending">Descending</option>
                        </select>`;
                break;
            case 'category':
                options.innerHTML = `<label>Category:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Category</option>`+ categoryOptions +`
                        </select>`;
                break;
            case 'genre':
                options.innerHTML = `<label>Genre:</label>
                        <select id="srch" class="form-control">
                            <option value="default" selected>Select a Genre</option>`+ genreOptions +`
                        </select>`;
                break;
            case 'keyword':
                options.innerHTML = `<label>Type keyword to search in description:</label>
                        <input type="text" class="form-control" id="srch"/>`;
                break;
            default:
                break;
        }
    });
}

function gameListener() {
    let gameList = document.querySelectorAll('.gameCard');

    gameList.forEach(game=>{
        game.addEventListener('click', event=>{
            localStorage.setItem("activeGame", game.id);
            document.location = 'game.html';
        });
    })
}


function init() {
    fetchGames();
    subForm();
}

init();