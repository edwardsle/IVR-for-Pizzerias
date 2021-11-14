<?php
  require "../vendor/autoload.php";
  use \Firebase\JWT\JWT;

  class User {
    // DB Stuff
    private $pdo;
    private $table = 'credentials';

    // Properties
    public $email;
    public $password;
    public $name;
    public $ip;
    public $token;

    // Constructor with DB
    public function __construct($db) {
      $this->pdo = $db;
    }

    // Find user
    public function find(){
      $stmt = $this->pdo->prepare("SELECT * FROM credentials WHERE email = :email");
      $stmt->bindValue(':email', $this->email);
      $stmt->execute();
      $row = $stmt->fetchObject();
      // echo("Before email check");
      if(isset($row->email)){
        // echo("Email match");
        if (password_verify($this->password,$row->password)){
          $issueAt= time();
          $expirationTime = $issueAt + 60 * 60 * 24;
          $key = "myKey";
          $payload = array(
            'user_id' => $row->id,
            'name' => $row->name,
            'exp'=> $expirationTime, 
          );
          $jwt = JWT::encode($payload,$key);
          // echo("JWT Encoded");
          return array(
            "message" => "Successful login",
            "jwt" => $jwt,
            'status'=> true,
          );
        } else {
          return array('message' => 'Email or password is invalid', 'status'=> false);
        }
      }
      return array('message' => 'Email or password is invalid', 'status'=> false);
    }

    public function create() {
      $stmt = $this->pdo->prepare("SELECT * FROM credentials WHERE email = :email");
      $stmt->bindValue(':email', $this->email);
      $stmt->execute();
      $row = $stmt->fetchObject();
      // echo("Before email check");
      if(!isset($row->email)){
        $stmt = $this->pdo->prepare("INSERT INTO credentials (email,password,name) VALUES (:email,:password,:name)");
        $stmt->bindValue(':email', $this->email);
        $stmt->bindValue(':password',$this->password);
        $stmt->bindValue(':name', $this->name);
        if($stmt->execute()){
          return array("message"=> "User was successfully registered", 'status'=> true);
        } else {
          return array("message"=> "Unable to register the user", 'status'=> false);
        }
      } else {
        return array("message"=> "Email already been register", 'status'=> false);
      }
    }
  }
?>