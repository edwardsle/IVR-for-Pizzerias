<!DOCTYPE html>
<html lang="en">

<head>
	<title>Order Online | Pizza</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Josefin+Sans" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css?family=Nothing+You+Could+Do" rel="stylesheet">

	<link rel="stylesheet" href="css/bootstrap.min.css">
	<link rel="stylesheet" href="css/animate.css">
	<link rel="stylesheet" href="css/style.css">
</head>

<body>
	<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
		<div class="container">
			<a class="navbar-brand" href="index.php"><span
					class="flaticon-pizza-1 mr-1"></span>Pizzas<br><small>Delicious</small></a>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav"
				aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="oi oi-menu"></span> Menu
			</button>
			<div class="collapse navbar-collapse" id="ftco-nav">
				<ul class="navbar-nav ml-auto">
					<li class="nav-item"><a href="index.php" class="nav-link">Home</a></li>
					<li class="nav-item"><a href="order.php" class="nav-link">Order</a></li>
				</ul>
			</div>
		</div>
	</nav>
	<!-- END nav -->
	<section>
		<div class="container mt-5">
			<h1>Order Online</h1>
		</div>		
	</section>

	<section class="ftco-section contact-section">
		<div class="container">
			<form action="" method="post">
				<div class="row order-phone border rounded mb-5 text-white">
					<div class="col-6 form-group py-3">
						<h4>Phone</h4>
						<input type="phone" class="form-control" id="phone" name="phone" value="" placeholder="Enter Phone Here To Process Order" required>
						<small id="phoneHelp" class="form-text text-muted">We'll never share your phone with anyone else.</small>
					</div>
				</div>
				<div id="pizza-builder" class="row justify-content-center block-9">
					
				</div>
				<div class="row justify-content-center mt-5">
					<div class="form-group">
						<a href="#" onclick="addPizza()" class="btn btn-white btn-outline-white p-3 px-xl-4 py-xl-3">Add More Pizza</a>
						<input type="submit" value="Place Order" class="btn btn-primary py-3 px-5">
					</div>
				</div>
			</form>
		</div>
	</section>

	<div id="map"></div>


	<footer class="ftco-footer ftco-section img">
		<div class="overlay"></div>
		<div class="container">
			<div class="row justify-content-between mb-5">
				<div class="col-lg-3 col-md-6 mb-5 mb-md-5">
					<div class="ftco-footer-widget mb-4">
						<h2 class="ftco-heading-2">About Us</h2>						
						<p>Edward LE</p>
						<p>IVR for Pizzerias</p>
						<p>CPSC 597 Porject</p>
					</div>
				</div>
				<div class="col-lg-3 col-md-6 mb-5 mb-md-5">
					<div class="ftco-footer-widget mb-4">
						<h2 class="ftco-heading-2">Have a Questions?</h2>
						<div class="block-23 mb-3">
							<ul>
								<li><span class="icon icon-map-marker"></span><span class="text">800 N State College Blvd, Fullerton, CA 92831</span></li>
								<li><a href="#"><span class="icon icon-phone"></span><span class="text">
									+1 (714) 660 6060</span></a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12 text-center">

					<p>
						Copyright &copy;
						<script>document.write(new Date().getFullYear());</script> All rights reserved
					</p>
				</div>
			</div>
		</div>
	</footer>

	<script src="js/jquery.min.js"></script>
	<script src="js/bootstrap.bundle.min.js"></script>
	<script src="js/order.js"></script>

</body>

</html>