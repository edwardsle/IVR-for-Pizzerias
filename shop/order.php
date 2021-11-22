<?php require "connection.php" ?>
<?php

if(isset($_POST['data']))
{
	$data = $_POST['data'];
	
	$status = 'prepare';
	$source = 'online';
	$phone = $_POST['phone'];
	$ispaid = 'null';

	$add_order = "INSERT INTO orders (status, source, phone, ispaid) VALUES ('$status','$source','$phone','$ispaid')";
	
	if(mysqli_query($conn,$add_order)){
		$order_id = mysqli_insert_id($conn);
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
			print_r($add_pizza);
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