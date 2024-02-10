function login() {
    // Getting user input
    let userEmail = document.getElementById('userEmail').value
    let password = document.getElementById('password').value

    // Checking:
    console.log(userEmail)
    console.log(password)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
    "username": userEmail,
    "password": password
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("http://localhost:3000/api/v1/auth/login", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}