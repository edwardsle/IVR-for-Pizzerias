<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="public/img/favicon.png" />
    <link href="public/css/bootstrap.min.css" rel="stylesheet">
    <link href="public/css/sso.css" rel="stylesheet">
    <link href="public/css/animated-bg.css" rel="stylesheet">

    <title>Single Sign-Up | SSO</title>
</head>

<body>
    <main class="area">
        <!---- animated background ---->
        <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>

        <!---- main ---->
        <div class="container" style=" height: 100vh">
            <div class="row dflex align-items-center justify-content-center" style=" height: 100%">
                <div class="col-12 col-sm-8 col-md-6 col-lg-4">
                    <div class="card glassmorphism">
                        <div class="card-body">
                            <h5 class="card-title">Single Sign-Up</h5>
                            <p class="small">Sign up once and access all services.</p>
                        </div>
                        <div class="card-body">
                            <?php if($error) { ?>
                            <div class="alert alert-danger" role="alert" style="opacity:0.9;">
                                Invalid Credentials!
                            </div>
                            <?php } ?>
                            <form action="" method="post">
                                <div class="row mb-2">
                                    <div class="col-12 col-md-4">Email</div>
                                    <div class="col-12 col-md-8">
                                        <input type="email" class="form-control form-control-sm" id="email" name="email" placeholder="name@example.com">
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-12 col-md-4">Full Name</div>
                                    <div class="col-12 col-md-8">
                                        <input type="name" class="form-control form-control-sm" id="name" name="name" placeholder="John Doe">
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col-12 col-md-4">Password</div>
                                    <div class="col-12 col-md-8">
                                        <input type="password" class="form-control form-control-sm" id="password" name="password" placeholder="Password">
                                    </div>
                                </div>
                                <div class="row dflex my-4">
                                    <div class="col-12 col-md-6 d-grid">
                                        <button type="submit" class="btn btn-white btn-sm">Login</button>
                                    </div>
                                    <div class="col-12 col-md-6 d-grid">
                                        <button type="submit" name="signup" class="btn btn-white btn-sm">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <div>

    <script src="public/js/bootstrap.bundle.min.js"></script>
    <script src="public/js/script.js"></script>
</body>

</html>