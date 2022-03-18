window.addEventListener('load', init);

//Global vars
let element = document.body
/**
 * Execute after document is fully loaded
 */
function init() {
   let button = document.getElementById('switch');
    button.addEventListener('click', darkModeToggle);

    if (localStorage.getItem('isDarkMode') === 'true') {
        element.classList.add('active-dark');
    }

}

const darkModeToggle = () => {
    element.classList.toggle("dark-mode");
}

const favebtn = document.querySelector(".fav-btn");
const hello = document.querySelector('.movie-name');

favebtn.addEventListener("click", e => {
    if (favebtn.classList.contains("active")) {
        favebtn.classList.remove("active");
        hello.classList.remove("active");

    } else {
        favebtn.classList.add("active");
        hello.classList.add("active");

    }
})