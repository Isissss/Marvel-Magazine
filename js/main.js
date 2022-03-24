window.addEventListener('load', init);

// class Movie {
//     constructor(id, name, cover) {
//         this.id = id;
//         this.name = name;
//         this.cover = cover;
//     }
//
// }
//Global vars
let element = document.body
let grid
let details = document.querySelector('.movie-info');
let apiUrl = 'http://localhost:63342/Magazinee/webservice/index.php';
let button
let favorites
let movieInfo
let movieCard

/**
 * Execute after document is fully loaded
 */
function init() {

    checkLightMode();
    getFavoritesFromLS();
    getMovieData(apiUrl, createMovieCards);

    let button = document.getElementById('switch');
    button.addEventListener('click', lightModeToggle);

    grid = document.querySelector('.grid');
    grid.addEventListener("click", gridClickHandler)

    let selector = document.querySelector(".filter-movies")
    selector.addEventListener("click", filterMovies)
}

function checkLightMode() {
    let lightMode = localStorage.getItem('lightMode');
    if (lightMode === "true") {
        element.classList.add("light-mode");
    }
}

function getFavoritesFromLS() {
    favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    console.log(favorites)
}

function getMovieData(url, succesHandler) {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(succesHandler)
        .catch(ajaxErrorHandler);
}

function createMovieCards(data) {

    for (let movie of data) {
        movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.dataset.id = movie.id;

        movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-name');

        let title = document.createElement('h3');
        title.innerHTML = movie.name;

        movieInfo.appendChild(title);

        button = document.createElement('button');
        button.classList.add('fav-btn')
        button.dataset.id = movie.id;

        let favorite = document.createElement("i")
        favorite.classList.add("fas", "fa-heart");

        checkIfFavorite(button.dataset.id);

        button.appendChild(favorite)
        movieInfo.appendChild(button);

        movieCard.appendChild(movieInfo);

        let image = document.createElement('img');
        image.src = movie.cover;
        image.dataset.id = movie.id;

        movieCard.appendChild(image);

        grid.appendChild(movieCard);
    }
}

function checkIfFavorite(id) {
    let index = favorites.indexOf(id);
    console.log(index);
    if (index === -1) {
        return
    }
    movieCard.classList.add("fave");
    button.classList.add("active");
    movieInfo.classList.add("active");

}

function ajaxErrorHandler(data) {
    console.log(data);
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = "Error :(";
    grid.before(error);
}

const lightModeToggle = () => {
    let lightMode = localStorage.getItem('lightMode');

    if (lightMode === "true") {
        localStorage.setItem('lightMode', "false");
        element.classList.remove("light-mode");
    } else {
        localStorage.setItem('lightMode', "true");
        element.classList.add("light-mode");
    }


}

function ShowDetails(data) {
    details.innerHTML = "";

    let title = document.createElement('h4')
    title.innerHTML = "Description"
    details.appendChild(title)

    let recipe = document.createElement("p")
    recipe.innerHTML = `${data.desc}`
    details.appendChild(recipe)

    title = document.createElement('h4')
    title.innerHTML = "Tags"
    details.appendChild(title)

    let tags = document.createElement("p")
    tags.innerHTML = `${data.tags}`
    details.appendChild(tags)
}

function gridClickHandler(e) {
    let target = e.target;

    if (target.nodeName === "BUTTON") {
        if (target.classList.contains("active")) {
            removeFavorite(target);
        } else {
            addFavorite(target)
        }
    } else if (target.nodeName === "IMG") {
        getMovieData(`${apiUrl}?id=${target.dataset.id}`, ShowDetails);

    }
}

function removeFavorite(target) {
    target.classList.remove("active");
    target.parentElement.classList.remove("active");
    target.parentElement.parentElement.classList.remove("fave");

    let index = favorites.indexOf(target.dataset.id);
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavorite(target) {
    target.classList.add("active");
    target.parentElement.classList.add("active");
    target.parentElement.parentElement.classList.add("fave");

    favorites.push(target.dataset.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function filterMovies(e) {

    const movies = document.querySelectorAll(".card");
    console.log(movies);
    movies.forEach(movie => {
        switch (e.target.value) {
            case "all":
                if (!movie.classList.contains("description")) {
                movie.style.display = "block"; }
                break;
            case "favorites":
                if (movie.classList.contains("fave") || (movie.id === "description")) {
                    movie.style.display = "block";
                } else {
                    movie.style.display = "none";
                }
        }
    });
}



