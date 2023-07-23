const apiUrl = 'https://api.github.com/search/users';
const userSelect = document.getElementById('userSelect');
const searchInput = document.getElementById('username-input');

searchInput.addEventListener('input', debounce(handleInput, 300));
userSelect.addEventListener('change', handleSelectChange);

async function handleInput() {
    const searchWord = searchInput.value.trim();
    if (searchWord === '') {
    userSelect.innerHTML = '';
    return;
    }

    const response = await fetch(`${apiUrl}?q=${searchWord}`);
    const data = await response.json();

    if (data.items) {
    const usernames = data.items.slice(0, 5).map(item => item.login);
    displayUsernames(usernames);
    } else {
    userSelect.innerHTML = '<option value="">No results found.</option>';
    }
}

function displayUsernames(usernames) {
    userSelect.innerHTML = '';
    usernames.forEach(username => {
    const option = document.createElement('option');
    option.value = username;
    option.textContent = username;
    userSelect.appendChild(option);
    });
}

function handleSelectChange() {
    searchInput.value = userSelect.value;
}

// Debounce function to reduce API requests while typing
function debounce(callback, delay) {
    let timer;
    return function() {
    clearTimeout(timer);
    timer = setTimeout(callback, delay);
    };
}