<?php
    include_once 'dbConnect.php';
    include_once 'Models/User.php';

    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $user = new User($db);


    if(isset($_REQUEST['signup'])){
        $data = $_POST;

        $user->name = $data['name'];
        $user->email = $data['email'];
        $password = $data['password'];
        $user->password = password_hash($password, PASSWORD_DEFAULT);
        
        if($user->create()['status']) {
            
        }
    }