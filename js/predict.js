const apiUrl = 'https://api.github.com/search/users';
const searchInput = document.getElementById('username-input');
const datalist = document.getElementById("options");

searchInput.addEventListener('input', debounce(handleInput, 400));

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

    if (usernames.length === 0) {
        datalist.innerHTML = '<option value="">No results found.</option>';
    } else if (usernames.length === 1) {
        searchInput.value = usernames[0];
        datalist.innerHTML = '';
    } else {
        displayUsernames(usernames);
    }
    } else {
    datalist.innerHTML = '<option value="">No results found.</option>';
    }
}

function displayUsernames(usernames) {
    datalist.innerHTML = '';
    usernames.forEach(username => {
    const option = document.createElement('option');
    option.value = username;
    datalist.appendChild(option);
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