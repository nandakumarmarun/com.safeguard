function getReports() {
  $("#dashboard-container").html("");
  var reportsHTML = `
        <h1 class="mt-2">TEST REPORTS</h1>
        <hr>
        <table class="table table-striped table-custom mt-2">
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
          <tbody id="tbody-test">
          </tbody>
        </table>
      `;

  $("#dashboard-container").append(reportsHTML);
}


function loadTestTable() {
  var image = '<img src="../assets/loading/loading--unscreen.gif"" style="width: 200px; height: 200px;" alt="">';
  var loading = '<tr><td colspan="6" align="center">' + image + '</td></tr>';
  $("#tbody-test").html(loading);
  $.ajax({
    method: "GET",
    url: ContextPath + ":8081" + "/api/security-tests/ALL",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token") // Add the Bearer token here
    },
    success: function (data) {
      console.log(data);
      loadTestTableData(data)
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
      + '</td><tr>'

    tBody += table
  });
  $("#tbody-test").append(tBody);
}




