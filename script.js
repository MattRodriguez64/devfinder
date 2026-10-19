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
    let tempBio = null;
    if(data.bio == null) {
        tempBio = "This profile has no bio...";
    } else {
        tempBio = `${data.bio}`;
    }
    document.getElementsByClassName("profile-data-bio")[0].innerHTML = tempBio;
    document.getElementsByClassName("profile-data-joined")[0].innerHTML = `${data.created_at}`;

    document.getElementsByClassName("repos-value")[0].innerHTML = `${data.public_repos}`;
    document.getElementsByClassName("followers-value")[0].innerHTML = `${data.followers}`;
    document.getElementsByClassName("following-value")[0].innerHTML = `${data.following}`;

    document.getElementsByClassName("link-location")[0].innerHTML = `${data.location}`;
    document.getElementsByClassName("link-twitter")[0].innerHTML = `${data.twitter_username}`;
    document.getElementsByClassName("link-blog")[0].innerHTML = `${data.blog}`;
    document.getElementsByClassName("link-company")[0].innerHTML = `${data.company}`;

    document.getElementsByClassName("profile-img")[0].src = `${data.avatar_url}`;
}