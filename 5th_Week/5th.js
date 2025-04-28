// Pristup elementima
const form = document.querySelector('form');
const username_input = document.getElementById('username');
const password_input = document.getElementById('password');
const error_message = document.getElementById('error-message');
const messageDiv = document.getElementById('message');

if (!localStorage.getItem('users')) {
    const users = [
        { username: "admin", password: "admin123" },
        { username: "user", password: "userpass" }
    ];
    localStorage.setItem('users', JSON.stringify(users));
}

// 2. Funkcija za provjeru grešaka
function getLoginFormErrors(username, password) {
    let errors = [];

    if (username === '' || username == null) {
        errors.push('Username is required');
        error_message.style.color = 'red';
    }
    if (password === '' || password == null) {
        errors.push('Password is required');
        error_message.style.color = 'red';
    }

    return errors;
}

// 3. Funkcija za login provjeru
function login(username, password) {
    const users = JSON.parse(localStorage.getItem('users'));

    const userFound = users.find(user => user.username === username && user.password === password);

    if (userFound) {
        messageDiv.style.color = 'green';
        messageDiv.innerText = `Welcome, ${username}!`;
        error_message.innerText = '';
    } else {
        messageDiv.innerText = '';
        error_message.style.color = 'red';
        error_message.innerText = 'Wrong username and/or password.';
    }
}

// 4. Povezivanje forme s funkcijom
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = username_input.value.trim();
    const password = password_input.value.trim();
    
    let errors = getLoginFormErrors(username, password);

    if (errors.length > 0) {
        error_message.innerText = errors.join('. ');
    } else {
        login(username, password);
    }
});