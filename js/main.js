window.addEventListener('load', init);

//Global vars
let grid
let details
let favorites
let button
let movieName
let movies = {}
let detailModal;
let modalHeader;
let detailModalContent;
let detailModalCloseButton;
let overlay;
let apiKey = "c196ca2fae8666873c3683d32b8d6cf4"
let apiUrl = 'http://localhost:63342/Magazinee/webservice/index.php';

/**
 * Execute after document is fully loaded
 */
function init() {
    checkLightMode();
    getMovieData(apiUrl, createMovieCards);

    favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    document.getElementById('switch').addEventListener('click', lightModeToggle);

    grid = document.querySelector('.grid');
    grid.addEventListener("click", gridClickhandler)

    let topbtn = document.getElementById("topBtn")
    topbtn.addEventListener("click", goTop);

    window.addEventListener("scroll", e => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            topbtn.style.display = "block";
        } else {
            topbtn.style.display = "none";
        }
    })

    document.querySelector(".filter-movies").addEventListener("click", filterMovies)

    detailModal = document.getElementById('movie-detail');
    detailModalContent = detailModal.querySelector('.modal-content');

    detailModalCloseButton = detailModal.querySelector('.modal-close');
    detailModalCloseButton.addEventListener('click', closeModal);

    overlay = document.querySelector('.modal-bg')
    overlay.addEventListener("click", closeModal)
}

function checkLightMode() {
    if (localStorage.getItem('lightMode') === "true") {
        document.querySelector("body").classList.add("light-mode");
    }
}

function goTop(e) {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
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

function gridClickhandler(e) {
    let target = e.target;
    if (target.nodeName !== "BUTTON") {
        return;
    }

    if (target.classList.contains("fav-btn")) {
        let favorite = (target.classList.contains("active")) ? removeFavorite(target) : addFavorite(target);
    } else if (target.classList.contains("details")) {
        getMovieData(`${apiUrl}?id=${target.dataset.id}&append_to_response=images`, ShowDetails);
        movieName = movies[target.dataset.id]['name'];
    }
}

function createMovieCards(data) {
    for (let movie of data) {
        let movieCard = document.createElement('div');
        movieCard.classList.add('card');

        let movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-name');

        let title = document.createElement('h3');
        title.innerHTML = movie.name;
        movieInfo.appendChild(title);

        button = document.createElement('button');
        button.classList.add('fav-btn')
        button.dataset.id = movie.id;

        let favorite = document.createElement("i")
        favorite.classList.add("fas", "fa-heart");
        button.appendChild(favorite);

        if (checkIfFavorite(button.dataset.id)) {
            movieCard.classList.add("fave");
            button.classList.add("active");
            movieInfo.classList.add("active");
        }

        movieInfo.appendChild(button);
        movieCard.appendChild(movieInfo);

        let image = document.createElement('img');
        image.src = movie.cover;

        movieCard.appendChild(image);

        let info = document.createElement("button")
        info.innerHTML = "View details"
        info.classList.add("details");
        info.dataset.id = movie.id;

        movieCard.appendChild(info);

        grid.appendChild(movieCard);

        movies[movie.id] = movie
    }
}

let checkIfFavorite = id => {
    if (favorites.indexOf(id) !== -1) {
        return 'true'
    }
}


let lightModeToggle = e => {
    let lightMode = localStorage.getItem('lightMode');

    if (lightMode === "true") {
        localStorage.setItem('lightMode', "false");
        document.body.classList.remove("light-mode");
    } else {
        localStorage.setItem('lightMode', "true");
        document.body.classList.add("light-mode");
    }
}

function ShowDetails(data) {
    detailModalContent.innerHTML = "";

    let h3 = document.createElement("h1");
    h3.innerHTML = `${movieName} (${data.year}) `
    detailModalContent.appendChild(h3);


    let title = document.createElement('h4')
    title.innerHTML = "Description"
    detailModalContent.appendChild(title)

    let desc = document.createElement("p")
    desc.innerHTML = `${data.desc}`
    detailModalContent.appendChild(desc)

    let title2 = document.createElement('h4')
    title2.innerHTML = "Tags"
    detailModalContent.appendChild(title2)

    let tags = document.createElement("p")
    tags.innerHTML = data.tags.join(", ")
    detailModalContent.appendChild(tags)

    getMovieData(`https://api.themoviedb.org/3/movie/${data.mdbID}?api_key=${apiKey}&append_to_response=images&include_image_language=en,null`, getRating)
}

function getRating(data) {
    let random = (Math.floor(Math.random() * (data.images.backdrops.length)));

    let img = document.createElement("img");
    img.id = "infopic";
    img.src = `https://www.themoviedb.org/t/p/original/${data.images.backdrops[random].file_path}`
    detailModalContent.appendChild(img);

    let rating = document.createElement('span');
    rating.innerHTML = `&#9733 ${data.vote_average}`;

    switch (true) {
        case (data.vote_average > 7.4):
            rating.classList.add("green");
            break;
        case (data.vote_average > 5.5):
            rating.classList.add("orange");
            break;
        default:
            rating.classList.add("red");
            break;
    }
    detailModalContent.appendChild(rating);

    detailModal.classList.add('open');
}

function removeFavorite(target) {
    target.classList.remove("active");
    target.parentNode.classList.remove("active");
    target.parentNode.parentElement.classList.remove("fave");

    let index = favorites.indexOf(target.dataset.id);
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function addFavorite(target) {
    target.classList.add("active");
    target.parentNode.classList.add("active");
    target.parentNode.parentElement.classList.add("fave");

    favorites.push(target.dataset.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function filterMovies(e) {
    const movies = document.querySelectorAll(".card");

    movies.forEach(movie => {
        switch (e.target.value) {
            case "all":
                movie.style.display = "block";
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

let closeModal = (e) => {
    detailModal.classList.remove('open')
}


function ajaxErrorHandler(data) {
    grid.before.innerHTML = "";

    console.log(data);
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = "Error, check console!";
    grid.before(error);
}
