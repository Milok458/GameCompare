const TOKEN = "AsrielDreamur_122498";

let reCheckPassword = "";

function fetchUser(username){

    let url = '/users/'+username;
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
            console.log(responseJSON);
            if(reCheckPassword === responseJSON.password){
                localStorage.setItem("activeUser", responseJSON.userName);
                localStorage.setItem("isAdmin", responseJSON.isAdmin);
                document.location = 'search.html';
            }
            else{
                alert("Invalid credentials! Try again!");
            }
        })
        .catch( err => {
            alert("Invalid credentials! Try again!");
        });
}

function formSubmit() {
    let form = document.querySelector(".card");

    form.addEventListener('submit', event=>{
        event.preventDefault();

        let username = document.querySelector("#usr").value;
        reCheckPassword = document.querySelector("#pwd").value;

        fetchUser(username);
    });
}

function register() {
    let btn = document.querySelector("#register");

    btn.addEventListener('click', event=>{
        document.location = 'register.html';
    });
}

function init() {
    formSubmit();
    register();
}

init();