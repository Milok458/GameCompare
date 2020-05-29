const TOKEN = "AsrielDreamur_122498";

function regularQuery(url, settings){
    fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }
            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            localStorage.setItem("activeUser", responseJSON.userName);
            localStorage.setItem("isAdmin", responseJSON.isAdmin);
            document.location = 'search.html';
        })
        .catch( err => {
            alert(err.message);
        });
}

function createNewUser(body) {
    let url = '/user';
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

function createListener(){
    let form = document.querySelector(".card");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let username =  document.querySelector("#usr");
        let pwd =  document.querySelector("#pwd");
        let pwd2 =  document.querySelector("#pwd2");
        let firstName =  document.querySelector("#firstName");
        let lastName =  document.querySelector("#lastName");

        if(username.value === "" || pwd.value === "" || pwd2.value === "" || firstName.value === ""
            || lastName.value === ""){
            alert("A field was left empty! Try again!");
        }
        else{
            if(pwd.value === pwd2.value){
                let body = {
                    userName: username.value,
                    password: pwd.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    isAdmin: false
                };

                createNewUser(body);
            }
            else{
                alert("Passwords don't match! Try again!");
            }
        }
    });
}

function login() {
    let btn = document.querySelector("#log-in");

    btn.addEventListener('click', event=>{
        document.location = 'index.html';
    });
}

function init() {
    createListener();
    login();
}

init();