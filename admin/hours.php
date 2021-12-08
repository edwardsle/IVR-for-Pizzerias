<?php require "connection.php" ?>
<?php 
  $query = "SELECT * FROM `hours`";
  $result = mysqli_query($conn,$query);
  if(mysqli_num_rows($result) != 0) {
    while($rows = mysqli_fetch_assoc($result)){
      if($rows['day'] === 'mon'){
        $mon_open = $rows['timein'];
        $mon_close = $rows['timeout'];
      } else if($rows['day'] === 'tue'){
        $tue_open = $rows['timein'];
        $tue_close = $rows['timeout'];
      } else if($rows['day'] === 'wed'){
        $wed_open = $rows['timein'];
        $wed_close = $rows['timeout'];
      } else if($rows['day'] === 'thu'){
        $thu_open = $rows['timein'];
        $thu_close = $rows['timeout'];
      } else if($rows['day'] === 'fri'){
        $fri_open = $rows['timein'];
        $fri_close = $rows['timeout'];
      } else if($rows['day'] === 'sat'){
        $sat_open = $rows['timein'];
        $sat_close = $rows['timeout'];
      } else if($rows['day'] === 'sun'){
        $sun_open = $rows['timein'];
        $sun_close = $rows['timeout'];
      }
    }
  }
  if(isset($_REQUEST['submit'])){
    $time = $_POST;
    $mon_open = $time['mon-open'];
    $mon_close = $time['mon-close'];
    $tue_open = $time['tue-open'];
    $tue_close = $time['tue-close'];
    $wed_open = $time['wed-open'];
    $wed_close = $time['wed-close'];
    $thu_open = $time['thu-open'];
    $thu_close = $time['thu-close'];
    $fri_open = $time['fri-open'];
    $fri_close = $time['fri-close'];
    $sat_open = $time['sat-open'];
    $sat_close = $time['sat-close'];
    $sun_open = $time['sun-open'];
    $sun_close = $time['sun-close'];
    $monday = "UPDATE `hours` SET hours.timein='$mon_open', hours.timeout='$mon_close' WHERE hours.id=1";
    $monday_input = mysqli_query($conn,$monday);
    $tuesday = "UPDATE `hours` SET hours.timein='$tue_open', hours.timeout='$tue_close' WHERE hours.id=2";
    $tuesday_input = mysqli_query($conn,$tuesday);
    $wednesday = "UPDATE `hours` SET hours.timein='$wed_open', hours.timeout='$wed_close' WHERE hours.id=3";
    $wednesday_input = mysqli_query($conn,$wednesday);
    $thursday = "UPDATE `hours` SET hours.timein='$thu_open', hours.timeout='$thu_close' WHERE hours.id=4";
    $thursday_input = mysqli_query($conn,$thursday);
    $friday = "UPDATE `hours` SET hours.timein='$fri_open', hours.timeout='$fri_close' WHERE hours.id=5";
    $friday_input = mysqli_query($conn,$friday);
    $saturday = "UPDATE `hours` SET hours.timein='$sat_open', hours.timeout='$sat_close' WHERE hours.id=6";
    $saturday_input = mysqli_query($conn,$saturday);
    $sunday = "UPDATE `hours` SET hours.timein='$sun_open', hours.timeout='$sun_close' WHERE hours.id=7";
    $sunday_input = mysqli_query($conn,$sunday);
    // if ($conn->query($monday) === TRUE) {
    //   echo "Record updated successfully";
    // } else {
    //   echo "Error updating record: " . $conn->error;
    // }
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
                    <input type="time" name="mon-open" min="00:00" max="24:00" value="<?php if($mon_open !== "") {echo $mon_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="mon-close" min="00:00" max="24:00" value="<?php if($mon_close !== "") {echo $mon_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>
                    <input type="time" name="tue-open" min="00:00" max="24:00" value="<?php if($tue_open !== "") {echo $tue_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="tue-close" min="00:00" max="24:00" value="<?php if($tue_close !== "") {echo $tue_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Wednesday</td>
                  <td>
                    <input type="time" name="wed-open" min="00:00" max="24:00" value="<?php if($wed_open !== "") {echo $wed_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="wed-close" min="00:00" max="24:00" value="<?php if($wed_close !== "") {echo $wed_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>
                    <input type="time" name="thu-open" min="00:00" max="24:00" value="<?php if($thu_open !== "") {echo $thu_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="thu-close" min="00:00" max="24:00" value="<?php if($thu_close !== "") {echo $thu_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Friday</td>
                  <td>
                    <input type="time" name="fri-open" min="00:00" max="24:00" value="<?php if($fri_open !== "") {echo $fri_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="fri-close" min="00:00" max="24:00" value="<?php if($fri_close !== "") {echo $fri_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>
                    <input type="time" name="sat-open" min="00:00" max="24:00" value="<?php if($sat_open !== "") {echo $sat_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="sat-close" min="00:00" max="24:00" value="<?php if($sat_close !== "") {echo $sat_close;} else {"21:00";}?>" required>
                  </td>
                </tr>
                <tr>
                  <td>Sunday</td>
                  <td>
                    <input type="time" name="sun-open" min="00:00" max="24:00" value="<?php if($sun_open !== "") {echo $sun_open;} else {"08:00";}?>" required>
                  </td>
                  <td>
                    <input type="time" name="sun-close" min="00:00" max="24:00" value="<?php if($sun_close !== "") {echo $sun_close;} else {"21:00";}?>" required>
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