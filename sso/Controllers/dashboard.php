<?php
  include_once '../vendor/autoload.php';

  use \Firebase\JWT\JWT;

  session_start();
  //    echo($_SESSION['jwt']);
  if(isset($_SESSION['is_login'])){
    echo("User is login");
    
    if(isset($_REQUEST['logout'])){
        echo("Logout request displayed" );
        session_destroy();
        header("Location: http://localhost/cs597/sso/");
    }
  } else {
    header('Location: http://localhost/cs597/sso/');
  }
  