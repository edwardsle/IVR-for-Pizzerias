<?php require "connection.php" ?>
<?php

if(isset($_POST['data']))
{
	$data = $_POST['data'];
	
	$status = 'unprepared';
	$source = 'online';
	$phone = $_POST['phone'];
	$ispaid = 'null';
	$order_id = strtotime(date('Y-m-d H:s:i'));
	$add_order = "INSERT INTO orders (id, status, source, phone, ispaid) VALUES ('$order_id','active','$source','$phone','$ispaid')";
	
	if(mysqli_query($conn,$add_order)){
		foreach($data as $pizza){
			$size = $pizza['size'];
			$crust = $pizza['crust'];
			$sauce = $pizza['sauce'];
			$toppings = '';
			foreach($pizza['toppings'] as $topping){
				$toppings .= $topping;
				$toppings .= ", ";
			}
			$add_pizza = "INSERT INTO pizzas (orderid,status,crust,size,sauce,toppings) VALUES ('$order_id','$status','$crust','$size','$sauce','$toppings')";
			if(!mysqli_query($conn,$add_pizza)){
				echo "Pizza did not get added to db";
			}
		}
	} else {
		echo "Create order failed";
	}
}

// Views
include('pages/order.php');
?>
