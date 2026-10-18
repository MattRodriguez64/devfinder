let nameInput = null;
let searchButton = document.getElementById("search-button");

function getNameInput() {
    nameInput = document.getElementById("name-to-search");
    return nameInput.value;
}

async function getData() {
    const nameToSearch = getNameInput();
    const url = "https://api.github.com/users/".concat("", nameToSearch);
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        updateData(result);
        console.log(result);
    } catch (error) {
        console.error(error.message);
    }
}

searchButton.addEventListener("click", (event) => {
    getData();
});

function updateData(data) {
    document.getElementsByClassName("profile-data-name")[0].innerHTML = `${data.name}`;
    document.getElementsByClassName("profile-data-id")[0].innerHTML = `@${data.login}`;
    if(data.bio == null) {
        console.log("AA");
    }
    document.getElementsByClassName("profile-data-bio")[0].innerHTML = `${data.bio}`;
}