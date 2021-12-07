<?php 
$conn = mysqli_connect("localhost", "root", "", "cs597");
if($conn -> connect_error){
  die("connection failed: ". $con->connect_error);
}
?>