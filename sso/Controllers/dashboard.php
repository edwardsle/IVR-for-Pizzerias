<?php
  include_once 'vendor/autoload.php';

  use \Firebase\JWT\JWT;

  session_start();
  //    echo($_SESSION['jwt']);
  if(isset($_SESSION['is_login'])){
    if(isset($_REQUEST['logout'])){
        session_destroy();
        header("Location: /sso");
    }
  } else {
    header('Location: /sso');
  }
  