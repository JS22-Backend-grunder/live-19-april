const logoutButton = document.querySelector('#logout-button');
const emailElem = document.querySelector('#email');
const removeButton = document.querySelector('#remove-button');

async function getAccountInformation() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:8000/api/user/account', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const data = await response.json();
    console.log(data);

    if (data.success) {
        emailElem.innerHTML = `E-post: ${data.email}`;
    } else {
        window.location.href = 'http://localhost:8000/index.html';
    }
}



getAccountInformation();