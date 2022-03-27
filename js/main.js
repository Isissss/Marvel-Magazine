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
let grid
let details
let favorites
let movieInfo
let button
let movieCard
let random
let mybutton
let apikey = "c196ca2fae8666873c3683d32b8d6cf4"
let apiUrl = 'http://localhost:63342/Magazinee/webservice/index.php';
/**
 * Execute after document is fully loaded
 */
function init() {
    checkLightMode();
    getMovieData(apiUrl, createMovieCards);

    favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    let lightswitch = document.getElementById('switch');
    lightswitch.addEventListener('click', lightModeToggle);

    details = document.querySelector('.movie-info');

    grid = document.querySelector('.grid');
    // // grid.addEventListener("click", gridClickHandler)

    mybutton = document.getElementById("myBtn");


    window.addEventListener("scroll", e => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
    })

    grid.addEventListener("click", e => {
        let target = e.target;

        if (target.nodeName === "BUTTON") {
            if (target.classList.contains("active")) {
                removeFavorite(target);
            } else {
                addFavorite(target)
            }
        } else if (target.nodeName === "IMG" && (target.id !== 'infopic')) {
            getMovieData(`${apiUrl}?id=${target.dataset.id}&append_to_response=images`, ShowDetails);
            movieName = target.parentNode.querySelector(".movie-name > h3");
        }
    })

    let selector = document.querySelector(".filter-movies")
    selector.addEventListener("click", filterMovies)

    mybutton.addEventListener("click", e => {
        document.body.scrollTop = 0;
    })
}

function checkLightMode() {
    if (localStorage.getItem('lightMode') === "true") {
        document.querySelector("body").classList.add("light-mode");
    }
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
        button.appendChild(favorite);

        checkIfFavorite(button.dataset.id);

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

    if (index === -1) {
        return;
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
        document.body.classList.remove("light-mode");
    } else {
        localStorage.setItem('lightMode', "true");
        document.body.classList.add("light-mode");
    }
}

function ShowDetails(data) {
    details.innerHTML = "";

    let title = document.createElement('h4')
    title.innerHTML = "Description"
    details.appendChild(title)

    let desc = document.createElement("p")
    desc.innerHTML = `${data.desc}`
    details.appendChild(desc)

    let title2 = document.createElement('h4')
    title2.innerHTML = "Tags"
    details.appendChild(title2)

    let tags = document.createElement("p")
    tags.innerHTML = data.tags.join(", ")
    details.appendChild(tags)

    getMovieData(`https://api.themoviedb.org/3/movie/${data.mdbID}?api_key=${apikey}&append_to_response=images&include_image_language=en,null`, getRating)

}

function getRating (data) {
    let year = new Date(data.release_date);
    year = year.getFullYear();

    let infoheader = document.querySelector('#movie-name');
    infoheader.innerHTML = " "

    let paragraph = document.createElement("h3");
    paragraph.innerHTML = `${movieName.innerHTML} (${year}) `

    let rating = document.createElement('span');
    rating.innerHTML = data.vote_average;

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
    infoheader.appendChild(paragraph);
    infoheader.appendChild(rating);

    random = ( Math.floor(Math.random() * (data.images.backdrops.length)));

    let img = document.createElement("img");
    img.id = "infopic";
    img.src = `https://www.themoviedb.org/t/p/original/${data.images.backdrops[random].file_path}`
    details.appendChild(img)


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



