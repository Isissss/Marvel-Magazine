window.addEventListener('load', init);

//Global vars
let grid
let details
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let button
let movies = {}
let detailModal;
let randomQuote;
let detailModalContent;
let movieinfo;
let detailModalCloseButton;
let overlay;
let topbtn;
let apiKey = "c196ca2fae8666873c3683d32b8d6cf4"
let apiUrl = 'http://localhost/Magazine/Magazinee/webservice/index.php';

/**
 * Execute after document is fully loaded
 */
function init() {

    //Light mode
    checkLightMode();
    document.getElementById('lightmode').addEventListener('click', lightModeToggle);

    //Set quote interval for 15seconds and execute it once on load
    randomQuote = document.getElementById("quote")
    setInterval(getQuote, 15000)
    getQuote();

    //Create the cards
    AjaxCall(apiUrl, createMovieCards);

    grid = document.querySelector('.grid');
    grid.addEventListener("click", gridClickhandler)

    document.querySelector(".filter-movies").addEventListener("click", filterMovies)

    //Modal content
    detailModal = document.getElementById('movie-detail');
    detailModalContent = detailModal.querySelector('.modal-content');

    detailModalCloseButton = detailModal.querySelector('.modal-close');
    detailModalCloseButton.addEventListener('click', closeModal);

    overlay = document.querySelector('.modal-bg')
    overlay.addEventListener("click", closeModal)
}

function AjaxCall(url, succesHandler) {
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
        (target.parentElement.parentElement.classList.contains("fave")) ? removeFavorite(target) : addFavorite(target);
    } else if (target.classList.contains("details")) {
        movieinfo = movies[target.dataset.id];
        AjaxCall(`${apiUrl}?id=${target.dataset.id}`, ShowDetails);
    }
}

let getQuote = () => {
    AjaxCall('https://randommarvelquoteapi.herokuapp.com/', showQuote)
}

let showQuote = data => {
    if (data === undefined) {
        return;
    }
    randomQuote.innerHTML = " ";

    let span = document.createElement("span");
    span.innerHTML = `"${data.quote}"`;

    randomQuote.appendChild(span);
}

function createMovieCards(data) {
    data.forEach(movie => {
        let movieCard = document.createElement('div');
        movieCard.classList.add('card');
        movieCard.dataset.id = movie.movieid;

        if ((favorites.indexOf(movie.movieid) !== -1)) {
            movieCard.classList.toggle("fave");
        }

        // Create header of card
        let movieHeader = document.createElement('div');
        movieHeader.classList.add('movie-name');

        let title = document.createElement('h3');
        title.innerHTML = ` ${movie.name}`;
        movieHeader.appendChild(title);

        button = document.createElement('button');
        button.classList.add('fav-btn');
        button.dataset.id = movie.movieid;

        let favorite = document.createElement("i")
        favorite.classList.add("fas", "fa-heart");
        button.appendChild(favorite);

        movieHeader.appendChild(button);
        movieCard.appendChild(movieHeader);

        // Movie cover
        let image = document.createElement('img');
        image.src = movie.cover;

        movieCard.appendChild(image);

        //Create details button
        let infodiv = document.createElement("div");
        infodiv.classList.add('detailOverlay');

        let info = document.createElement("button");
        info.innerHTML = "View details";
        info.classList.add("details");
        info.dataset.id = movie.movieid;

        infodiv.appendChild(info);
        movieCard.appendChild(infodiv);

        movies[movie.movieid] = movie;
        grid.appendChild(movieCard);

        // Add movie info to object to use later
        movies[movie.movieid] = movie
    })

}

let checkLightMode = () => {
    if (localStorage.getItem('lightMode') === "true") {
        document.querySelector("body").classList.add("light-mode");
    }
}

let lightModeToggle = e => {
    document.body.classList.toggle("light-mode");
    localStorage.getItem('lightMode') === "true"
        ? localStorage.setItem('lightMode', "false")
        : localStorage.setItem('lightMode', "true");
}

function ShowDetails(data) {
    detailModalContent.innerHTML = "";

    let h1 = document.createElement("h1");
    h1.innerHTML = `${movieinfo['name']} (${movieinfo['years']})`;
    h1.id = 'detailheader';
    detailModalContent.appendChild(h1);

    let title = document.createElement("h4");
    title.innerHTML = "Description";
    detailModalContent.appendChild(title);

    let desc = document.createElement("p");
    desc.innerHTML = `${movieinfo['description']}`;
    detailModalContent.appendChild(desc);

    title = document.createElement("h4");
    title.innerHTML = "Tags";
    detailModalContent.appendChild(title);

    let tags = document.createElement("p");
    let movietags = [];
    data.forEach(data => {
        movietags.push(data.tagname);
    })

    tags.innerHTML = movietags.join(', ');

    detailModalContent.appendChild(tags);

    // Get rating via moviedb
    AjaxCall(`https://api.themoviedb.org/3/movie/${movieinfo['mdbID']}?api_key=${apiKey}&append_to_response=images&include_image_language=en,null`, getMoviedbInfo)

}

function getMoviedbInfo(data) {
    //Random num based on the amount of images available
    let random = (Math.floor(Math.random() * (data.images.backdrops.length)));

    let img = document.createElement("img");
    img.id = "infopic";
    img.src = `https://www.themoviedb.org/t/p/original/${data.images.backdrops[random].file_path}`;
    detailModalContent.appendChild(img);

    let rating = document.createElement('span');
    rating.innerHTML = `&#9733 ${data.vote_average}`;

    let detailheader = document.getElementById('detailheader')
    detailheader.after(rating);

    //Rating color
    switch (true) {
        case (data.vote_average > 7.4):
            rating.classList.add("great");
            break;
        case (data.vote_average > 5.5):
            rating.classList.add("mid");
            break;
        default:
            rating.classList.add("bad");
            break;
    }

    detailModal.classList.add('open');
}

let removeFavorite = (target) => {
    let card = document.querySelector(`.card[data-id='${target.dataset.id}']`)
    card.classList.remove("fave");

    let index = favorites.indexOf(target.dataset.id);
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

let addFavorite = (target) => {
    let card = document.querySelector(`.card[data-id='${target.dataset.id}']`)
    card.classList.add("fave");

    favorites.push(target.dataset.id);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

let filterMovies = (e) => {
    let movies = document.querySelectorAll(".card");
    //console.log(movies);

    movies.forEach(movie => {
        switch (e.target.value) {
            case "all":
                movie.style.display = "block";
                break;
            case "favorites":
                if (movie.classList.contains("fave")) {
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
    console.log(data);
    let error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = "Error, check console!";
    grid.before(error);
}
