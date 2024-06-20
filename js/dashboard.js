var ContextPath = location.protocol + "//" + location.host;

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
  

  getDashBaord();

  BtnInitialise();

  $(".nav-link").click(function () {
    $(".nav-link").removeClass("active");
    $(this).addClass("active");
    let content = $(this).data("content");
    loadContent(content);
  });

  loadchart();

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

function loadchart() {
  const ctx = document.getElementById("chartContainer");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["SUCESS", "MODERATE", "FAILED"],
      datasets: [
        {
          data: [12, 19, 3],
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
          // defining min and max so hiding the dataset does not change scale range
          min: 0,
          max: 50,
        },
      },
    },
  });
}

function loadContent(data) {
  if (data == "home") {
    getDashBaord();
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
  var dashboardHTML = `
        <div class="row dashboard-cards d-flex justify-content-around">
          <div class="dash-board-item-1 col-sm-12 col-md-4 col-lg-4 col-xl-3 col-xxl-2">
            <span class="fs-3 fw-1 text-white">SUCCESS</span>
            <h1 class="fs-1 text-white">10</h1>
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
        </div>
      `;

  $("#dashboard-container").append(dashboardHTML);
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
