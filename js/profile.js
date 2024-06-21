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


