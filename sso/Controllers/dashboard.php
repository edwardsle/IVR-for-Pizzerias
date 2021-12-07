<?php
  include_once '../vendor/autoload.php';

  use \Firebase\JWT\JWT;

  session_start();
  //    echo($_SESSION['jwt']);
  if(isset($_SESSION['is_login'])){
    if(isset($_REQUEST['logout'])){
        session_destroy();
        header("Location: http://localhost/cs597/sso/");
    }
  } else {
    header('Location: http://localhost/cs597/sso/');
  }
  