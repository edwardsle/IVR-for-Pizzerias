<?php
  include_once 'dbConnect.php';
  include_once 'Models/User.php';

  // Instantiate DB & connect
  $database = new Database();
  $db = $database->connect();

  // Instantiate object
  $user = new User($db);

  $err_message;
  
  // Get raw data
  if (isset($_POST['email'])){
    $ip = isset($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (isset($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : $_SERVER['REMOTE_ADDR']);
    $data = $_POST;

    $user->email = $data['email'];
    $user->password = $data['password'];
    $user->ip = $ip;

    // Create
    if($user->find()) 
    {  
        header('Location: dashboard');
        die();
    }
    else 
    {
      $error = "Invalid Credentials!";
    }
  }
