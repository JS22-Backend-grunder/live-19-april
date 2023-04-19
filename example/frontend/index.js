const usernameElem = document.querySelector('#username');
const emailElem = document.querySelector('#email');
const password = document.querySelector('#password');
const createButtonElem = document.querySelector('#create-button');

const loginUsername = document.querySelector('#login-username');
const loginPassword = document.querySelector('#login-password');
const loginButton = document.querySelector('#login-button');

async function createAccount(accountInformation) {
    const response = await fetch('http://localhost:8000/api/user/signup', {
        method: 'POST',
        body: JSON.stringify(accountInformation),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
}

function saveToken(token) {
    sessionStorage.setItem('token', token);
}

async function login(loginInformation) {
    const response = await fetch('http://localhost:8000/api/user/login', {
        method: 'POST',
        body: JSON.stringify(loginInformation),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
        saveToken(data.token);
        window.location.href = 'http://localhost:8000/loggedin.html';
    }
}

createButtonElem.addEventListener('click', () => {
    let accountInformation = {
        username: usernameElem.value,
        email: emailElem.value,
        password: password.value
    }

    createAccount(accountInformation);
});

loginButton.addEventListener('click', () => {
    let loginInformation = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    login(loginInformation);
});