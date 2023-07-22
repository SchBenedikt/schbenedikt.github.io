const apiUrl = 'https://api.github.com/search/users';
const userList = document.getElementById('userList');
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', debounce(handleInput, 300));

async function handleInput() {
    const searchWord = searchInput.value.trim();
    if (searchWord === '') {
    userList.innerHTML = '';
    return;
    }

    const response = await fetch(`${apiUrl}?q=${searchWord}`);
    const data = await response.json();

    if (data.items) {
    const usernames = data.items.slice(0, 5).map(item => item.login);
    displayUsernames(usernames);
    } else {
    userList.innerHTML = 'No results found.';
    }
}

function displayUsernames(usernames) {
    userList.innerHTML = '';
    usernames.forEach(username => {
    const li = document.createElement('li');
    li.textContent = username;
    userList.appendChild(li);
    });
}

// Debounce function to reduce API requests while typing
function debounce(callback, delay) {
    let timer;
    return function() {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
    };
}