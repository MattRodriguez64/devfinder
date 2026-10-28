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

    let tempLocation = null;
    if(data.location == null) {
        tempLocation = "Not available...";
    } else {
        tempLocation = `${data.location}`;
    }
    document.getElementsByClassName("link-location")[0].innerHTML = tempLocation;

    let tempTwitter = null;
    if(data.twitter_username == null) {
        tempTwitter = "Not available...";
    } else {
        tempTwitter = `${data.twitter_username}`;
    }
    document.getElementsByClassName("link-twitter")[0].innerHTML = tempTwitter;

    let tempBlog = null;
    if(data.blog == null) {
        tempBlog = "Not available...";
    } else {
        tempBlog = `${data.blog}`;
    }
    document.getElementsByClassName("link-blog")[0].innerHTML = tempBlog;

    let tempCompany = null;
    if(data.company == null) {
        tempCompany = "Not available...";
    } else {
        tempCompany = `${data.company}`;
    }
    document.getElementsByClassName("link-company")[0].innerHTML = tempCompany;

    document.getElementsByClassName("profile-img")[0].src = `${data.avatar_url}`;
}

let lightButton = document.getElementById("light-button");
let currentThemeIndex = 0;

async function changeTheme() {
    if(currentThemeIndex == 0) {
        currentThemeIndex = 1;
        setLight();
    } else {
        currentThemeIndex = 0;
        setDark();
    }
}

function setLight() {
    document.querySelector('h1').style.color = "#000000";
    document.getElementsByClassName("profile-data-name")[0].style.color = "#000000";
    document.getElementsByClassName("main-container")[0].style.backgroundColor = "#F2F2F2";
    document.getElementsByClassName("main-card-search-bar")[0].style.backgroundColor = "#FFFFFF";
    document.getElementsByClassName("main-card-data-fetched-container")[0].style.backgroundColor = "#FFFFFF";
    document.getElementById("name-to-search").style.backgroundColor = "#FFFFFF";
    document.getElementsByClassName("profile-data-git-container")[0].style.backgroundColor = "#B8E6FE";
    let allLinks = document.querySelectorAll(".link-container");
    allLinks.forEach((link) => {
        link.style.color = "#000000";
    });

    document.getElementsByClassName("profile-data-git-container")[0].style.color = "#000000";
}

function setDark() {
    document.querySelector('h1').style.color = "#FFFFFF";
    document.getElementsByClassName("profile-data-name")[0].style.color = "#FFFFFF";
    document.getElementsByClassName("main-container")[0].style.backgroundColor = "#141D2F";
    document.getElementsByClassName("main-card-search-bar")[0].style.backgroundColor = "#1E2A47";
    document.getElementsByClassName("main-card-data-fetched-container")[0].style.backgroundColor = "#1E2A47";
    document.getElementById("name-to-search").style.backgroundColor = "#1E2A47";
    document.getElementsByClassName("profile-data-git-container")[0].style.backgroundColor = "#0b012e";
    let allLinks = document.querySelectorAll(".link-container");
    allLinks.forEach((link) => {
        link.style.color = "#FFFFFF";
    });

    document.getElementsByClassName("profile-data-git-container")[0].style.color = "#FFFFFF";
}

lightButton.addEventListener("click", (event) => {
    changeTheme();
});