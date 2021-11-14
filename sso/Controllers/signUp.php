<?php
    include_once 'dbConnect.php';
    include_once 'Models/User.php';
    session_start();

    if(!isset($_SESSION['is_login'])){
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
            
            if($user->create()['status'] == 1) {
                $error = $user->create()['message'];
                header('Location: http://localhost/cs597/sso?SignUpSucessfully');
            }
            else{
                $error = $user->create()['message'];
            }
        }
        if(isset($_REQUEST['redirectLogin'])){
            header('Location: http://localhost/cs597/sso/');
        }
    }
    else{
        header('Location: http://localhost/cs597/sso/dashboard?userStillLogin');
    }
    