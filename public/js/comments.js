const TOKEN = "AsrielDreamur_122498";

let allComments = "";

function setComments(comments){
    let container = document.querySelector('#comments');

    comments.forEach(comment =>{
        container.innerHTML += `<div class="commentContainer" id="${comment.id}">
                                    <div class="card cardSizeL mx-3">
                                        <div class="card-body">
                                            <h4>Game: ${comment.gameName}</h4>
                                            <h4>Game ID: ${comment.gameId}</h4>
                                            <h5>${comment.userName}:</h5>
                                            <p>${comment.comment}</p>
                                            <button type="button" class="btn btn-success">Approve</button>
                                            <div class="separator"></div>
                                            <button type="button" class="btn btn-danger">Reject</button>
                                        </div>
                                    </div>
                                </div>`
    });

    if(comments.length === 0){
        container.innerHTML = `<h1>No comments left!</h1>`;
    }
    else{
        allComments = comments;
        removeComment();
    }
}

function updateComments(id) {
    let url = '/comment/'+id;
    let settings = {
        method : 'DELETE',
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
            console.log("Comment Removed!")
        })
        .catch( err => {
            console.log(err.message);
        });
}

function addCommentsList(game, comment) {
    game.comments.push(comment);

    let url = '/game';
    let settings = {
        method : 'PATCH',
        headers : {
            Authorization : `Bearer ${TOKEN}`,
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(game)
    };

    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            console.log("Game comments updated!")
        })
        .catch( err => {
            console.log(err.message);
        });
}

function fetchGame(id, comment){
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
            addCommentsList(responseJSON, comment);
        })
        .catch( err => {
            alert(err.message);
        });
}

function removeComment() {
    let btns = document.querySelectorAll('.btn');

    btns.forEach(btn =>{
        btn.addEventListener('click', event =>{
            let markId = btn.parentElement.parentElement.parentElement.id;

            let markToRemove = "";

            allComments.forEach(mark =>{
                if(markId === mark.id) markToRemove = mark;
            });

            let index = allComments.indexOf(markToRemove);

            allComments.splice(index, 1);

            if(btn.innerHTML === "Approve"){
                let comment = {
                    userName: markToRemove.userName,
                    text: markToRemove.comment
                };

                fetchGame(markToRemove.gameId, comment);
            }

            btn.parentElement.parentElement.parentElement.parentElement.removeChild(btn.parentElement.parentElement.parentElement);

            if(allComments.length === 0){
                let container = document.querySelector('#comments');
                container.innerHTML = `<h1>No comments left!</h1>`;
            }

            updateComments(markToRemove.id);
        });
    });
}

function fetchComments(){
    let url = '/comments';
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
            setComments(responseJSON);
        })
        .catch( err => {
            alert(err.message);
        });
}

function init() {
    fetchComments();
}

init();