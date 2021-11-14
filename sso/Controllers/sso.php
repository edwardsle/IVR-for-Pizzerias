<?php
  include_once 'dbConnect.php';
  include_once 'Models/User.php';
  session_start();
  if(isset($_SESSION['is_login'])){
    header('Location: http://localhost/cs597/sso/dashboard?userStillLogin');
  } else {
    // Instantiate DB & connect
    $database = new Database();
    $db = $database->connect();

    // Instantiate object
    $user = new User($db);

    if(isset($_REQUEST['login'])){
      $data = $_POST;
      $user->email = $data['email'];
      $user->password = $data['password'];
      
      if($user->find()['status'] == 1) {  
        $error = $user->find()['message'];
        $jwt = $user->find()['jwt'];
        $_SESSION['is_login'] = true;
        $_SESSION['jwt'] = $jwt; 
        header('Location: http://localhost/cs597/sso/dashboard?userLoginSucessfully');
      } else {
        $error = $user->find()['message'];
      }
    }
    if(isset($_REQUEST['redirectSignUp'])){
      header('Location: http://localhost/cs597/sso/signUp');
    }
  }
  

