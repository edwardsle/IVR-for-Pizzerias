<?php require "connection.php" ?>
<?php 
  $query_new_order = "SELECT * FROM `orders` JOIN `pizzas` ON orders.id = pizzas.orderid WHERE orders.status = 'prepare'";
  $new_order = mysqli_query($conn,$query_new_order);

  $query_ready_order = "SELECT * FROM `orders` JOIN `pizzas` ON orders.id = pizzas.orderid WHERE orders.status = 'ready'";
  $ready_order = mysqli_query($conn,$query_ready_order);

  $query_all_order = "SELECT * FROM `orders` JOIN `pizzas` ON orders.id = pizzas.orderid";
  $orders = mysqli_query($conn,$query_all_order);

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="img/favicon.png">
    <link href="css/all.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">  
    <title>Orders | Admin</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-2 d-none d-md-block bg-light border-start border-end" style="height:100vh">
          <h4 class="d-flex align-items-center py-2 logo mt-2"><img src="img/logo.png" class="me-2" alt="" style="width:30px;"> Admin<strong>IVR</strong></h4>
          <div class="navbar">
            <ul class="navbar-nav w-100 sidebar">
              <li class="nav-item my-1"><a href="http://localhost/cs597/admin/index" class="nav-link px-3 active">Orders</a></li>
              <li class="nav-item my-1"><a href="http://localhost/cs597/admin/hours" class="nav-link px-3">Working hours</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="border rounded bg-light py-3 px-2 mt-3"><h1>Orders</h1></div>
          <hr>
          <div class="row">
            <!--New Order Begin-->
            <div class="col-12">
              <div class="card mt-1">
                <div class="card-header">New Order</div>
                <div class="card-body">
                  <div class="row border-bottom">
                    <dt class="col-2">ID</dt>
                    <dt class="col-2">Phone</dt>
                    <dt class="col-2">Created</dt>
                    <dt class="col-6">Details</dt>
                  </div>
                  <?php if(mysqli_num_rows($new_order) != 0){ ?>
                    <?php while($rows = mysqli_fetch_assoc($new_order)){ ?>
                      <div class="row">
                        <p class="col-2"><?php echo $rows['orderid'] ?></p>
                        <p class="col-2"><?php echo $rows['phone'] ?></p>
                        <p class="col-2"><?php echo $rows['created'] ?></p>
                        <p class="col-6"><?php echo "{$rows['size']} {$rows['crust']} {$rows['sauce']} with {$rows['toppings']}"?></p>
                      </div>
                    <?php } ?>
                  <?php } else { ?>
                    <div class="row">
                      <div class="col-12">No order</div>
                    </div>                 
                  <?php }?>  
                </div>
              </div>              
            </div>
            <!--New Orders End-->
            <!--Orders Reader Begin-->
            <div class="col-12">
              <div class="card mt-5">
                <div class="card-header">Orders Ready</div>
                <div class="card-body">
                  <div class="row border-bottom">
                    <dt class="col-2">ID</dt>
                    <dt class="col-2">Phone</dt>
                    <dt class="col-2">Created</dt>
                    <dt class="col-6">Details</dt>
                  </div>
                  <?php if(mysqli_num_rows($ready_order) != 0){ ?>
                    <?php while($rows = mysqli_fetch_assoc($ready_order)){ ?>
                      <div class="row">
                        <p class="col-2"><?php echo $rows['orderid'] ?></p>
                        <p class="col-2"><?php echo $rows['phone'] ?></p>
                        <p class="col-2"><?php echo $rows['created'] ?></p>
                        <p class="col-6"><?php echo "{$rows['size']} {$rows['crust']} {$rows['sauce']} with {$rows['toppings']}"?></p>
                      </div>
                    <?php } ?>
                  <?php } else { ?>
                    <div class="row">
                      <div class="col-12">No order</div>
                    </div>                 
                  <?php }?>        
                </div>
              </div>  
            </div>
            <!--Orders Reader End-->   
            <!--All Orders Begin-->
            <div class="col-12">
              <div class="card mt-5">
                <div class="card-header">All Orders</div>
                <div class="card-body">
                  <div class="row border-bottom">
                    <dt class="col-2">ID</dt>
                    <dt class="col-2">Phone</dt>
                    <dt class="col-2">Created</dt>
                    <dt class="col-6">Details</dt>
                  </div>
                  <?php if(mysqli_num_rows($orders) != 0){ ?>
                    <?php while($rows = mysqli_fetch_assoc($orders)){ ?>
                      <div class="row">
                        <p class="col-2"><?php echo $rows['orderid'] ?></p>
                        <p class="col-2"><?php echo $rows['phone'] ?></p>
                        <p class="col-2"><?php echo $rows['created'] ?></p>
                        <p class="col-6"><?php echo "{$rows['size']} {$rows['crust']} {$rows['sauce']} with {$rows['toppings']}"?></p>
                      </div>
                    <?php } ?>
                  <?php } else { ?>
                    <div class="row">
                      <div class="col-12">No order</div>
                    </div>                 
                  <?php }?>             
                </div>
              </div>  
            </div>
            <!--All Orders End-->       
          </div>          
        </div>
      </div>
    </div>
    <script src="js/bootstrap.bundle.min.js"></script>
  </body>
</html>