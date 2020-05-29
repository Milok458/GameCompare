const TOKEN = "AsrielDreamur_122498";

let user = "";

function updateUser() {
    let url = '/user';
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(user)
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
            setInfo();
        })
        .catch( err => {
            alert(err.message);
        });
}

function setInfo() {
    let name = document.querySelector('.name');
    name.innerHTML = user.firstName + user.lastName;

    let username = document.querySelector('.username');
    username.innerHTML += user.userName;

    let bookmarks = document.querySelector('.bookmarks');
    bookmarks.innerHTML += user.bookmarks.length;

    let bookmarkContainer = document.querySelector('.gamesContainer');
    bookmarkContainer.innerHTML = "";

    if(user.bookmarks.length !== 0){
        user.bookmarks.forEach(bookmark =>{
            bookmarkContainer.innerHTML += `<div class="card gameCard mx-2" id="${bookmark.id}">
                                            <div class="card-body flexCard">
                                                <h5 class="title">${bookmark.title}</h5>
                                                <img src="${bookmark.image}" alt="Box Art" class="boxArt" width="100" height="162">
                                                <button type="button" class="btn btn-danger remove">Remove Bookmark</button>
                                            </div>
                                        </div>`;
        });
        removeListener();
        moveListener();
    }
    else{
        bookmarkContainer.innerHTML = `<h2>You have no bookmarks!</h2>`;
    }
}

function move(target){
    localStorage.setItem("activeGame", target.parentElement.parentElement.id);
    document.location = 'game.html';
}

function moveListener() {
    let titles = document.querySelectorAll('.title');
    let images = document.querySelectorAll('.boxArt');

    titles.forEach(title =>{
        title.addEventListener('click', event=>{
            move(title);
        });
    });

    images.forEach(image =>{
        image.addEventListener('click', event=>{
            move(image);
        });
    });
}

function removeListener() {
    let btns = document.querySelectorAll('.remove');

    btns.forEach(btn =>{
        btn.addEventListener('click', event =>{
            let markId = btn.parentElement.parentElement.id;

            let markToRemove = "";

            user.bookmarks.forEach(mark =>{
                if(markId === mark.id) markToRemove = mark;
            });

            let index = user.bookmarks.indexOf(markToRemove);

            user.bookmarks.splice(index, 1);

            let bookmarks = document.querySelector('.bookmarks');
            bookmarks.innerHTML = "Number of Bookmarks: "+user.bookmarks.length;

            btn.parentElement.parentElement.parentElement.removeChild(btn.parentElement.parentElement);

            updateUser();
        });
    });
}

function init() {
    fetchUser();
}

init();