<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="public/img/favicon.png" />
    <link href="public/css/bootstrap.min.css" rel="stylesheet">
    <link href="public/css/animated-bg.css" rel="stylesheet">
    <link href="public/css/dashboard.css" rel="stylesheet">

    <title>Endpoints</title>

    <style>
        .card {
            cursor: pointer;
        }
    </style>
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
            <div class="row row-cols-12 row-cols-md-3 dflex align-items-center justify-content-center" style=" height: 100%">
                <div class="col">
                    <div id="web" class="card glassmorphism mx-5">
                        <div class="card-body text-center">
                            <img src="public/img/web.svg" alt="Go to order online" height="100" />
                        </div>
                        <div class="card-body text-center">
                            <h1 class="display-6">Order Online</h1>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div id="kitchen" class="card glassmorphism mx-5">
                        <div class="card-body text-center">
                            <img src="public/img/kitchen.svg" alt="Go to order online" height="100" />
                        </div>
                        <div class="card-body text-center">
                            <h1 class="display-6">Kitchen</h1>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div id="dashboard" class="card glassmorphism mx-5">
                        <div class="card-body text-center">
                            <img src="public/img/dashboard.svg" alt="Go to order online" height="100" />
                        </div>
                        <div class="card-body text-center">
                            <h1 class="display-6">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    <script src="public/js/bootstrap.bundle.min.js"></script>
    <script>
        let web = document.getElementById('web');
        let kitchen = document.getElementById('kitchen');
        let dashboard = document.getElementById('dashboard');

        web.addEventListener('click', ()=> {
            window.location.replace("https://shop.edwardsle.com");
        });

        kitchen.addEventListener('click', ()=> {
            window.location.replace("https://ws.edwardsle.com");
        });

        dashboard.addEventListener('click', ()=> {
            window.location.replace("https://admin.edwardsle.com");
        });
    </script>
</body>

</html>