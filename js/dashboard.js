var ContextPath = location.protocol + "//" + location.host;
var chartdata  = []
let successCount ;
let failedCount ;
let moderateCount;


$(document).ready(function () {
  // var options = {
  //   title: {
  //     text: ""
  //   },
  //   data: [
  //     {
  //       type: "pie",
  //       startAngle: 45,
  //       showInLegend: "true",
  //       legendText: "{label}",
  //       indexLabel: "{label} ({y})",
  //       zoomEnabled: true,
  //       animationEnabled: true,
  //       animationDuration: 2000,
  //       dataPoints: [
  //         { label: "SUCESS", y: 10 },
  //         { label: "MODERATE", y: 10 },
  //         { label: "FAILD", y: 10 },
  //       ]
  //     }
  //   ]
  // };
  

  dashboardBody();
  loadCards();
  BtnInitialise();
 

  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    let content = $(this).data("content");
    loadContent(content);
  });

 

  // $("#chartContainer").CanvasJSChart(options);
});

const redirect = async () => {
  $("#LoadingModel").modal("show");
  location.href = ContextPath + "/HTML/securitytest.html";
  $("#LoadingModel").modal("hide");
};

function BtnInitialise() {
  $(".btnTest").click(function () {
    $("#LoadingModel").modal("show");
    redirect();
  });
}

function loadchart(data) {
  const ctx = document.getElementById("chartContainer");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["SUCESS", "FAILED", "MODERATE"],
      datasets: [
        {
          data: data,
          borderWidth: 1,
        },
      ],
    },
    options: {
      animations: {
        tension: {
          duration: 1000,
          easing: "linear",
          from: 1,
          to: 0,
          loop: true,
        },
      },
      scales: {
        y: {
          min: 0,
          max: 20,
        },
      },
    },
  });
}

function loadContent(data) {
  if (data == "home") {
    dashboardBody();
    loadchart();
    BtnInitialise();
  } else if (data == "profile") {
    GetProfile();
  } else if (data == "Companies") {
    getCompanies();
  } else if (data == "Report") {
    getReports();
  } else if (data == "logout") {
  }
}

function getDashBaord() {
  $("#dashboard-container").html("");

  var dashboardHTML = `<div class="row dashboard-cards d-flex justify-content-around">
          <div class="dash-board-item-1 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
            <span class="fs-3 fw-1 text-white">SUCCESS</span>
            <h1 class="fs-1 text-white">'10</h1>
          </div>
          <div class="dash-board-item-2 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
            <span class="fs-3 fw-1 text-white">FAILED</span>
            <h1 class="fs-1 text-white">10</h1>
          </div>
          <div class="dash-board-item-3 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
            <span class="fs-3 fw-1 text-white">MODERATE</span>
            <h1 class="fs-1 fw-1 text-white">10</h1>
          </div>
          <div id="chart-Container" class="dash-board-item-4 col-sm-12 col-md-4 col-lg-4 col-xl-11 col-xxl-3">
            <canvas id="chartContainer"></canvas>
          </div>
          <div class="col-12 d-flex justify-content-around mt-3">
            <button class="btn btn-outline-success col-12 btnTest">NEW TEST</button>
          </div>
          <div class="col-12">
            <table class="table table-striped mt-3 align-middle">
              <thead class="th-1">
                <tr>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Company Name</th>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Project Name</th>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">System NO</th>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Security Level</th>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Score</th>
                  <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="text-center align-middle">TCS</td>
                  <td class="text-center align-middle">FACEBOOK</td>
                  <td class="text-center align-middle">235</td>
                  <td class="text-center align-middle">EXCELLENT</td>
                  <td class="text-center align-middle">86</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">IBS</td>
                  <td class="text-center align-middle">WHATSAPP</td>
                  <td class="text-center align-middle">2365</td>
                  <td class="text-center align-middle">MODERATE</td>
                  <td class="text-center align-middle">49</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">TCS</td>
                  <td class="text-center align-middle">INSTAGRAM</td>
                  <td class="text-center align-middle">25</td>
                  <td class="text-center align-middle">FAILED</td>
                  <td class="text-center align-middle">56</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">TCS</td>
                  <td class="text-center align-middle">FACEBOOK</td>
                  <td class="text-center align-middle">235</td>
                  <td class="text-center align-middle">EXCELLENT</td>
                  <td class="text-center align-middle">86</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">IBS</td>
                  <td class="text-center align-middle">WHATSAPP</td>
                  <td class="text-center align-middle">2365</td>
                  <td class="text-center align-middle">MODERATE</td>
                  <td class="text-center align-middle">49</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">TCS</td>
                  <td class="text-center align-middle">INSTAGRAM</td>
                  <td class="text-center align-middle">25</td>
                  <td class="text-center align-middle">FAILED</td>
                  <td class="text-center align-middle">56</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">IBS</td>
                  <td class="text-center align-middle">WHATSAPP</td>
                  <td class="text-center align-middle">2365</td>
                  <td class="text-center align-middle">MODERATE</td>
                  <td class="text-center align-middle">49</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
                <tr>
                  <td class="text-center align-middle">TCS</td>
                  <td class="text-center align-middle">INSTAGRAM</td>
                  <td class="text-center align-middle">25</td>
                  <td class="text-center align-middle">FAILED</td>
                  <td class="text-center align-middle">56</td>
                  <td class="text-center align-middle">COMPLETED</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;

  $("#dashboard-container").append(dashboardHTML);
}




;


function getSuccessCount() {
  console.log("sucesss")
  $.ajax({
    method: "GET",
    url: ContextPath + ":8081" + "/api/security-tests/count/EXCELLENT",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      console.log(data)
      chartdata.push(data)
      console.log(chartdata)
      $('#success-count h1').text(data);
      return data
    },
    error: function (xhr, error) {
    },
  });
}

function getFailedCount() {
  console.log("Failed")
  $.ajax({
    method: "GET",
    url: ContextPath + ":8081" + "/api/security-tests/count/CRITICAL",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      console.log(data)
      failedCount = data
      chartdata.push(data)
      console.log(chartdata)
      $('#failed-count h1').text(data);
      return data
    },
    error: function (xhr, error) {
    },
  });
}

function getModerateCount() {
  console.log("Moderate")
  $.ajax({
    method: "GET",
    url: ContextPath + ":8081" + "/api/security-tests/count/MODERATE",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      console.log("data")
      chartdata.push(data)
      moderateCount = data
      console.log(chartdata)
      $('#moderate-count h1').text(data)
      return data
    },
    error: function (xhr, error) {
    },
  });
}

function loadChartDATa() {
  console.log("loadChart")
  $.ajax({
    method: "GET",
    url: ContextPath + ":8081" + "/api/security-tests/chart",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      var chartData = [data.sucessCount,data.failedcount,data.moderateCount] 
      loadchart(chartData)
    },
    error: function (xhr, error) {
    },
  });
}



function dashboardBody(){
  $("#dashboard-container").html("");
  var dashboardHTML = `
<div class="row dashboard-cards d-flex justify-content-around">
  <div id="success-count" class="dash-board-item-1 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
    <span class="fs-3 fw-1 text-white">SUCCESS</span>
    <h1 class="fs-1 text-white">0</h1>
  </div>
  <div id="failed-count" class="dash-board-item-2 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
    <span class="fs-3 fw-1 text-white">FAILED</span>
    <h1 class="fs-1 text-white">0</h1>
  </div>
  <div id="moderate-count" class="dash-board-item-3 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
    <span class="fs-3 fw-1 text-white">MODERATE</span>
    <h1 class="fs-1 fw-1 text-white">0</h1>
  </div>
  <div id="chart-Container" class="dash-board-item-4 col-sm-12 col-md-4 col-lg-4 col-xl-11 col-xxl-3">
    <canvas id="chartContainer"></canvas>
  </div>
</div>

<div class="col-12 d-flex justify-content-around mt-3">
  <button id="new-test-btn" class="btn btn-outline-success col-12 btnTest">NEW TEST</button>
</div>

<div class="col-12">
  <table class="table table-striped mt-3 align-middle">
    <thead class="th-1">
      <tr>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Company Name</th>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Project Name</th>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">System NO</th>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Security Level</th>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Score</th>
        <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Status</th>
      </tr>
    </thead>
    <tbody id="table-body">
      <!-- Rows will be appended here by jQuery -->
    </tbody>
  </table>
</div>
`;

$("#dashboard-container").append(dashboardHTML);
}


function loadCards(){
  successCount = getSuccessCount();
  failedCount = getFailedCount();
  moderateCount = getModerateCount();
  loadChartDATa()
  
}





function GetProfile() {
  $("#dashboard-container").html("");
  var formHTML = `
  <div class="c-1 p-5">
    <label class="d-block ">
      <h3>PROFILE</h3>
    </label>
    <hr class="mb-3">
    <form id="regForm">
      <div class="form-row">
        <div class="form-group mt-2">
          <label for="inputfirstname">First Name</label>
          <input
            type="text"
            class="form-control"
            id="inputfirstname"
            name="firstname"
            placeholder="Enter First Name"
          />
        </div>
        <div class="form-group mt-2">
          <label for="inputLastname">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="inputLastname"
            name="lastname"
            placeholder="Enter Last Name"
          />
        </div>
        <div class="form-group mt-2">
          <label for="inputEmail">Email</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            name="email"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-group mt-2">
          <label for="inputusername">Username</label>
          <input
            type="text"
            class="form-control"
            id="inputusername"
            name="username"
            placeholder="Enter User Name"
          />
        </div>
        <div class="form-group mt-2">
          <label for="inputPassword">Password</label>
          <input
            type="password"
            class="form-control"
            id="inputPassword"
            name="password"
            placeholder="Enter Password"
          />
        </div>
      </div>
      <div class="form-group mt-3">
        <button
          type="submit"
          class="btn btn-success btn-lg btn-block col-12 mt-5">
          UPDATE
        </button>
      </div>
    </form>
  </div>
`;
  $("#dashboard-container").append(formHTML);
}

function getReports() {
  $("#dashboard-container").html("");
  var reportsHTML = `
        <h1 class="mt-2">TEST REPORTS</h1>
        <hr>
        <table class="table mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      `;

  $("#dashboard-container").append(reportsHTML);
}

function getCompanies() {
  $("#dashboard-container").html("");
  var companiesReport = `
        <h1 class="mt-2">Companies</h1>
        <hr>
        <table class="table mt-2">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      `;

  $("#dashboard-container").append(companiesReport);
}
