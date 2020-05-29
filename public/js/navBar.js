function adminListener() {
    let isAdmin = localStorage.getItem("isAdmin");

    if(isAdmin === "false"){
        let games = document.querySelector('#nav-games');
        let edit = document.querySelector('#nav-edit');
        let comments = document.querySelector('#nav-comm');

        games.style.display = "none";
        edit.style.display = "none";
        comments.style.display = "none";
    }
}

function init() {
    adminListener();
}

init();