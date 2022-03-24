<?php
/**
 * @return array
 */
function getDishes()
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
            "cover" => "https://static1.srcdn.com/wordpress/wp-content/uploads/2019/06/Thor-The-Dark-World.jpg?q=50&fit=crop&w=963&h=1427&dpr=1.5",
        ],
        [
            "id" => 5,
            "name" => "Guardians of the Galaxy",
            "cover" => "https://m.media-amazon.com/images/M/MV5BMTAwMjU5OTgxNjZeQTJeQWpwZ15BbWU4MDUxNDYxODEx._V1_.jpg"
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
        ]
    ];
}



/**
 * @param $id
 * @return mixed
 */
function getDishDetails($id)
{
    $tags = [
        1 => [
            "desc" => "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            "tags" => ['cheese', 'oven']
        ],
        2 => [
            "desc" => "You can make this delicious Dutch meal by ...",
            "tags" => ['unox', 'healthy', 'stamppot', 'boerenkool']
        ],
        3 => [
            "desc" => "Very nice when your grandma prepares this meal",
            "tags" => ['omnomnom']
        ],
        4 => [
            "desc" => "Everytime in the city after midnight",
            "tags" => ['kapsalon', 'tasty', 'meat']
        ],
        5 => [
            "desc" => "Specialty when on holiday in Spain",
            "tags" => ['fish']
        ],
        6 => [
            "desc" => "Specialty when on holiday in Spain",
            "tags" => ['fish']
        ],
        7 => [
            "desc" => "Specialty when on holiday in Spain",
            "tags" => ['fish']
        ],
    ];

    return $tags[$id];
}
