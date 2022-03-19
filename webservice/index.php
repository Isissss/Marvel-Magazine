<?php
//Require functions for actions
require_once "includes/actions.php";

//Based on the existence of the GET parameter, 1 of the 2 functions will be called
if (!isset($_GET['id'])) {
    $data = getDishes();

} else {
    $data = getDishDetails($_GET['id']);
}
echo $data[1]["name"];

//Set the header & output JSON so the client will know what to expect.
//header("Content-Type: application/json");
//echo json_encode($data);
//exit;


?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link type="text/css" rel="stylesheet" href="/css/style.css"/>
    <script type="text/javascript" src="/js/main.js" defer></script>
    <script src="https://kit.fontawesome.com/c7b1d33b1c.js" crossorigin="anonymous"></script>
    <title>Document</title>
</head>
<body>
<button
        id="switch"> Dark Mode Toggle
</button>
<Div>
    <h1>Marvel Movie Collection</h1>
</Div>
<div class="grid">
    <?php foreach ($data as $movie) { ?>
        <div class="card" id="<?=$movie['id']?>">
            <div class="movie-name"><h3><?= $movie['name'] ?> </h3>
                <button class="fav-btn" >
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <img src="<?= $movie['cover'] ?>">

        </div>
    <?php } ?>

    <div class="card" id="description">
        <div class="movie-name"><h3>Details</h3></div>
        <div class="movie-info"> </div>
    </div>
</div>
</body>
</html>