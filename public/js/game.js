const TOKEN = "AsrielDreamur_122498";

let user = "";
let thisGame = "";

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

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log("Update Successful!");
        })
        .catch( err => {
            console.log(err.message);
        });
}

function fetchGame(){
    let currGame = localStorage.getItem("activeGame");

    let url = '/games/'+currGame;
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
            setInfo(responseJSON);
            fetchUser();
        })
        .catch( err => {
            alert(err.message);
        });
}

function fetchUser(){
    let currUser = localStorage.getItem("activeUser");

    let url = '/users/'+currUser;
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
            user = responseJSON;
            checkForMark();
            checkForLike();
        })
        .catch( err => {
            alert(err.message);
        });
}

function updateBookmarks(body) {
    let url = '/user';
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    };

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response;
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log("user updated!");
        })
        .catch( err => {
            console.log(err.message);
        });
}

function updatePoints() {
    let pop = document.querySelector('.pop');

    let points = 0;

    thisGame.points.forEach(point =>{
       points += point.val;
    });

    pop.innerHTML = 'Game Compare Points: '+points;
}

function setInfo(game) {

    let title = document.querySelector('.pageTitle');

    title.innerHTML += game.title;

    let gameTitle = document.querySelector('.title');

    gameTitle.innerHTML += game.title;

    let year = document.querySelector('.year');

    year.innerHTML += game.year;

    let studio = document.querySelector('.studio');

    studio.innerHTML += game.studio;

    let price = document.querySelector('.price');

    price.innerHTML += game.price;

    let genre = document.querySelector('.genre');

    genre.innerHTML += game.genre;

    let category = document.querySelector('.category');

    category.innerHTML += game.category;

    let mcr = document.querySelector('.mcr');

    mcr.innerHTML += game.metacriticRating.toFixed(1) + '/10';

    let gsr = document.querySelector('.gsr');

    gsr.innerHTML += game.gameStopRating.toFixed(1) + '/10';

    let grr = document.querySelector('.grr');

    grr.innerHTML += game.gamesRadarRating.toFixed(1) + '/10';

    let ar = document.querySelector('.ar');

    ar.innerHTML += game.averageRating.toFixed(1) + '/10';

    let amazonLink = document.querySelector('.amazonLink');

    amazonLink.href = game.url;

    let boxArt = document.querySelector('.boxArt');

    boxArt.src = game.image;

    let desc = document.querySelector('.desc');

    desc.innerHTML = game.description;

    let comments = document.querySelector('#comments');

    game.comments.forEach(comment =>{
       comments.innerHTML += `<div class="commentContainer">
                                    <div class="card cardSizeL mx-3">
                                        <div class="card-body">
                                            <h5>${comment.userName}:</h5>
                                            <p>${comment.text}</p>
                                        </div>
                                    </div>
                                </div>`
    });

    thisGame = game;

    updatePoints();
}

function disableButton(btn) {
    btn.classList.remove("btn-info");
    btn.classList.add("btn-success");
    btn.innerHTML = "Bookmarked!";
    btn.disabled = true;
}

function bookmarkListener() {
    let btn = document.querySelector('#bookmark');

    btn.addEventListener('click', event =>{
       disableButton(btn);

       let gameToAdd = {
           id: thisGame.id,
           title: thisGame.title,
           image: thisGame.image
       };

       user.bookmarks.push(gameToAdd);

       updateBookmarks(user);
    });
}

function checkForMark() {
    user.bookmarks.forEach(bookmark =>{
       if(bookmark.id === thisGame.id){
           let btn = document.querySelector('#bookmark');
           disableButton(btn);
       }
    });
}

function checkForLike() {
    let like = document.querySelector('.fa-thumbs-up');
    let dislike = document.querySelector('.fa-thumbs-down');
    thisGame.points.forEach(point =>{
        if(point.user === user.userName){
            if(point.val === 1){
                like.style.color = "green";
            }
            else{
                dislike.style.color = "red";
            }
        }
    });
}

function updatePoint(val) {
    thisGame.points.forEach(point =>{
        if(point.user === user.userName) point.val = val;
    });

    updatePoints();
    updateGame(thisGame);
}

function addPoint(val){
    let point = {
        val: val,
        user: user.userName
    };

    thisGame.points.push(point);

    updatePoints();
    updateGame(thisGame);
}

function createNewComment(body) {
    let url = '/comment';
    let settings = {
        method : 'POST',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    };

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response;
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            alert("Comment has been submitted for review!");
        })
        .catch( err => {
            alert(err.message);
        });
}

function removePoint() {
    let index = -1;
    thisGame.points.forEach(point =>{
        if(point.user === user.userName) index = thisGame.points.indexOf(point);
    });
    thisGame.points.splice(index, 1);

    updatePoints();
    updateGame(thisGame);
}

function likeListener() {
    let like = document.querySelector('.fa-thumbs-up');
    let dislike = document.querySelector('.fa-thumbs-down');

    like.addEventListener('click', event =>{
        if(dislike.style.color === "red"){
            dislike.style.color = "gray";
            like.style.color = "green";
            updatePoint(1);
        }
        else{
            if(like.style.color === "green"){
                like.style.color = "gray";
                removePoint();
            }
            else{
                like.style.color = "green";

                addPoint(1);
            }
        }
    });

    dislike.addEventListener('click', event =>{
        if(like.style.color === "green"){
            like.style.color = "gray";
            dislike.style.color = "red";
            updatePoint(-1);
        }
        else{
            if(dislike.style.color === "red"){
                dislike.style.color = "gray";
                removePoint();
            }
            else{
                dislike.style.color = "red";

                addPoint(-1);
            }
        }
    });
}

function commentListener() {
    let comment = document.querySelector('.comm');

    comment.addEventListener('submit', event=>{
        event.preventDefault();

        let text = document.querySelector('#comment');

        if(text.value !== ""){
            let body = {
                userName: user.userName,
                gameId: thisGame.id,
                comment: text.value,
                gameName: thisGame.title
            };

            text.value = "";

            createNewComment(body);
        }
        else{
            alert("Your comment can't be empty! Try again!");
        }
    });
}

function init() {
    fetchGame();
    bookmarkListener();
    likeListener();
    commentListener();
}

init();