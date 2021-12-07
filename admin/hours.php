<?php require "connection.php" ?>
<?php 
  if(isset($_REQUEST['submit'])){
    echo "submit clicked";
  }
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
    <title>Hours | Admin</title>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-md-2 d-none d-md-block">
          <h4 class="d-flex align-items-center py-2 logo mt-2"><img src="img/logo.png" class="me-2" alt="" style="width:30px;"> Admin<strong>IVR</strong></h4>
          <div class="navbar">
            <ul class="navbar-nav w-100 sidebar">
              <li class="nav-item my-1"><a href="http://localhost/cs597/admin/index" class="nav-link px-3 active">Orders</a></li>
              <li class="nav-item my-1"><a href="http://localhost/cs597/admin/hours" class="nav-link px-3">Working hours</a></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-md-10">
          <div class="border rounded bg-light py-3 px-2 mt-3"><h1>Working Hours</h1></div>
          <hr>
          <form action="" method="post">
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Open</th>
                  <th>Close</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td>
                    <input type="time" name="mon-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="mon-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>
                    <input type="time" name="tue-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="tue-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>
                    <input type="time" name="wed-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="wed-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>
                    <input type="time" name="thu-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="thu-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>
                    <input type="time" name="fri-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="fri-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>
                    <input type="time" name="sat-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="sat-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>
                    <input type="time" name="sun-open" min="00:00" max="24:00" value="08:00" required>
                  </td>
                  <td>
                    <input type="time" name="sun-close" min="00:00" max="24:00" value="21:00" required>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <button class="btn btn-primary" name="submit" type="submit">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <script src="js/bootstrap.bundle.min.js"></script>
  </body>
</html>