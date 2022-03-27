<?php
/**
 * @return array
 */
function getMovies()
{
    return [
        [
            "id" => 1,
            "name" => "Avengers: End Game",
            "cover" => "https://lumiere-a.akamaihd.net/v1/images/p_avengersendgame_19751_e14a0104.jpeg?region=0,0,540,810&width=480",
        ],
        [
            "id" => 2,
            "name" => "Captain Marvel",
            "cover" => "https://terrigen-cdn-dev.marvel.com/content/prod/1x/captainmarvel_lob_crd_06.jpg",
        ],
        [
            "id" => 3,
            "name" => "Black Widow",
            "cover" => "https://m.media-amazon.com/images/M/MV5BNjRmNDI5MjMtMmFhZi00YzcwLWI4ZGItMGI2MjI0N2Q3YmIwXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
        ],
        [
            "id" => 4,
            "name" => "Thor: The Dark World",
            "cover" => "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/wp6OxE4poJ4G7c0U2ZIXasTSMR7.jpg",
        ],
        [
            "id" => 5,
            "name" => "Guardians of the Galaxy",
            "cover" => "https://collider.com/wp-content/uploads/2017/03/guardians-of-the-galaxy-2-imax-poster.jpg"
        ],
        [
            "id" => 6,
            "name" => "Black Panther",
            "cover" => "https://i.pinimg.com/originals/01/7a/8f/017a8f1b5d6cd56f8a66459a2715ba3e.png",
        ],
        [
            "id" => 7,
            "name" => "Avengers: Infinity War",
            "cover" => "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg",
        ],
        [
            "id" => 8,
            "name" => "Spider-Man: No Way Home",
            "cover" => "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        ],
        [
            "id" => 9,
            "name" => "Spider-Man: Homecoming",
            "cover" => "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/kY2c7wKgOfQjvbqe7yVzLTYkxJO.jpg",
        ],
        [
            "id" => 10,
            "name" => "Doctor Strange",
            "cover" => "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/uGBVj3bEbCoZbDjjl9wTxcygko1.jpg",
        ]
    ];
}


/**
 * @param $id
 * @return mixed
 */
function getMovieDetails($id)
{
    $tags = [
        1 => [
            "desc" => "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            "tags" => ['Superhero', 'Female power', 'Alien Technology', "Hero's journey"],
            "mdbID" => 299534
        ],
        2 => [
            "desc" => "Het jaar 1990. Er is een galactische oorlog gaande tussen twee buitenaardse rassen. Carol Danvers, beter bekend als Captain Marvel, is een vrouw met superkrachten die na lange tijd terugkeert naar de aarde.",
            "tags" => ['Superhero', 'Female power', 'Alien Technology', "Hero's journey"],
            "mdbID" => 299537
        ],
        3 => [
            "desc" => "Vanaf haar geboorte is Natasha Romanoff toevertrouwd aan de KGB, die haar heeft opgeleid tot het ultieme wapen en hun beste agente. Wanneer de Sovjet-Unie uiteenvalt, staat ze ten dode opgeschreven en werd ze gedwongen naar New York te verhuizen. Daar leeft ze inmiddels als freelancer en is het jaren geleden dat de Sovjet-Unie ten val kwam.",
            "tags" => ['Spy', 'Female Spy', 'Assassin', 'Hero', 'Based on comic'],
            "mdbID" => 497698
        ],
        4 => [
            "desc" => "Na de gebeurtenissen in The Avengers strijdt Thor om de orde te herstellen in de kosmos. Maar een oud ras van Duistere Elven onder leiding van de wraaklustige Malekith wil het universum in duisternis onderdompelen. Wanneer zelfs Odin en Asgard niet opgewassen zijn tegen deze vijand, zal Thor zijn meest gevaarlijke en persoonlijke strijd moeten aangaan.",
            "tags" => ['Superhero', 'Hostile takeover', 'Norse', 'Mythology'],
            "mdbID" => 76338
        ],
        5 => [
            "desc" => "'Guardians of the Galaxy Vol. 2' zet de avonturen van het team voort terwijl ze reizen door de buitenste regionen van de kosmos. De Guardians moeten vechten om hun familie bij elkaar te houden, terwijl ze de mysteries over Peter Quills vader ontrafelen.",
            "tags" => ['fish'],
            "mdbID" => 283995
        ],
        6 => [
            "desc" => "Specialty when on holiday in Spain",
            "tags" => ['fish'],
            "mdbID" => 284054
        ],
        7 => [
            "desc" => "Specialty when on holiday in Spain",
            "tags" => ['fish'],
            "mdbID" => 299536
        ],
        8 => [
            "desc" => 'Peter Parker is ontmaskerd en kan zijn normale leven niet langer scheiden van de hoge inzet van een superheld zijn. Wanneer hij om hulp vraagt van Doctor Strange, wordt de inzet nog gevaarlijker, waardoor hij moet ontdekken wat het werkelijk betekent om Spider-Man te zijn.',
            "tags" => ['Villain', 'Comic Book', 'New York City', 'Hero'],
            "mdbID" => 634649
        ],
        9 => [
            "desc" => 'Peter Parker keert na zijn eerste superheldengevecht als Spider-Man terug naar zijn normale leven in Queens. Hij hoopt snel bij The Avengers gevraagd te worden door Tony Stark, maar het telefoontje blijft uit.',
            "tags" => ['New York City', 'NYC', 'High School', 'Comic Book', 'Based on Comic', 'Hero'],
            "mdbID" => 315635
        ],
        10 => [
            "desc" => ' Wanneer zijn carrière als chirurg voorbij is, gaat Stephen Strange op onderzoek uit naar het mystieke. Tijdens zijn zoektocht ontmoet hij een tovenaar, the Ancient One, die hem niet alleen beter maakt, maar hem ook magische krachten geeft en leert te beheersen. Al snel moet hij deze magie gebruiken om de aarde te beschermen tegen kwaad uit andere dimensies.',
            "tags" => ['Wizard', 'Magic', 'Hero', 'Sorcerer'],
            "mdbID" => 284052
        ],
    ];

    return $tags[$id];
}
