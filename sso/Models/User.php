<?php
  class User {
    // DB Stuff
    private $pdo;
    private $table = 'credentials';

    // Properties
    public $email;
    public $password;
    public $ip;

    // Constructor with DB
    public function __construct($db) {
      $this->pdo = $db;
    }

    // Find user
    public function find(){
        // Create query
        $stmt = $this->pdo->prepare("SELECT * FROM credentials WHERE email = :email");
        $stmt->bindValue(':email', $this->email);
        $stmt->execute();
        $row = $stmt->fetchObject();
        if(isset($row->email))
        {
            if ($this->password == $row->password){
                return true;
            }
        }
        return false;
    }
  }
?>