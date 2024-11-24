//Name this loginScript.js

function userCheck(event) {
    event.preventDefault
    const username = document.getElementById('username').value; //gets the username
    const password = document.getElementById('password').value; //gets the psas

 if (username === 'admin' && password === '1234') { //if the username and password are these, you can enter
        window.location.assign('Website.html'); 
        alert("Welcome!")
 } else {
    alert("Invalid information.");
    return;
 }

}