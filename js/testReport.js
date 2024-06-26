function getReports() {
  $("#dashboard-container").html("");
  var reportsHTML = `
        <h1 class="mt-2">TEST REPORTS</h1>
        <hr>
        <table class="table table-striped table-custom  mt-2">
          <thead class="th-1">
            <tr>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Company Name</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Project Name</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">System NO</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Security Level</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Score</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Status</th>
              <th scope="col-1" class="bg-success text-center align-middle text-white" style="height: 54px">Actions</th>
            </tr>
          </thead>
          <tbody id="tbody-test">
          </tbody>
        </table>
      `;

  $("#dashboard-container").append(reportsHTML);
}


function loadTestTable() {
  var image = '<img src="../assets/loading/loading--unscreen.gif"" style="width: 200px; height: 200px;" alt="">';
  var loading = '<tr><td colspan="7" align="center">' + image + '</td></tr>';
  $("#tbody-test").html(loading);
  $.ajax({
    method: "GET",
    url: API_PATH + "/api/test",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      console.log(data);
      loadTestTableData(data)
      $("#LoadingModel2").modal("hide");
      BtnInitialise();
    },
    error: function (xhr, error) {
    },
  });
}



function loadTestTableData(data) {
  $("#tbody-test").html(" ");
  var tBody = "";
  $(data).each(function (index, element) {
    var table = '<tr>'
      + '<td Class="text-center align-middle">'
      + element.companyName
      + '</td><td Class="text-center align-middle">'
      + element.applicationName
      + '</td><td Class="text-center align-middle">'
      + element.systemNo
      + '</td><td Class="text-center align-middle">'
      + element.securityLevel
      + '</td><td Class="text-center align-middle">'
      + element.testScore
      + '</td><td Class="text-center align-middle">'
      + element.testStatus
      + '</td><td class="text-center align-middle"><button id="btnView" type="button" class="btn btn-primary view-details-btn" data-id="'
      + element.id // Assuming element.id is the unique identifier for each row
      + '">'
      + 'View Details</button>'
      + '</td><tr>'

    tBody += table
  });
  $("#tbody-test").append(tBody);
}


function getSavedTestData(testId) {
  $.ajax({
    method: "GET",
    url: API_PATH + "/api/test/" + testId,
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    success: function (data) {

    },
    error: function (xhr, error) {
      console.error("Failed to fetch saved test data:", error);
    },
  });
}






