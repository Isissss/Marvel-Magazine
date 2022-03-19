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
let grid = document.querySelector('.grid');
let details = document.querySelector('.movie-info');

/**
 * Execute after document is fully loaded
 */
function init() {
    let button = document.getElementById('switch');
    button.addEventListener('click', darkModeToggle);

    grid.addEventListener("click", gridClickHandler)
}

const darkModeToggle = () => {
    element.classList.toggle("dark-mode");
}

function gridClickHandler(e) {
    let target = e.target;
    let movieName = target.parentNode.querySelector(".movie-name > h3");

    if (target.nodeName === "BUTTON") {
        if (target.classList.contains("active")) {
            removeFavorite(target);
        } else {
            addFavorite(target)
        }
    } else if (target.nodeName === "IMG") {
    details.innerHTML = movieName.innerHTML
    }
}

function removeFavorite(target) {
    target.classList.remove("active");
    target.parentNode.classList.remove("active");

}

function addFavorite(target) {
    target.classList.add("active");
    target.parentNode.classList.add("active");
}



