// Create a Form object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
if (!this.Registraion) {
  this.Registraion = {};
}



(function () {
  "use strict";

  var Path = location.protocol + "//" + location.host;

  var ContextPath = "";
  var API_PATH = "";

  function loadConfig() {
    return new Promise((resolve, reject) => {
      $.getJSON("../config.json", function (config) {
        if (config.HOST && config.PORT) {
          ContextPath = config.HOST;
          var PORT = config.PORT;
          if (config.PROFILE == "dev") {
            API_PATH = ContextPath + ":" + PORT;
          } else if (config.PROFILE == "Prod") {
            API_PATH = ContextPath;
          }
          console.log("properties " + API_PATH);
          console.log("HOST:", config.HOST);
          resolve();
        } else {
          console.error("Error: HOST or PORT not found in config.json");
          reject("Invalid config");
        }
      }).fail(function (jqxhr, textStatus, error) {
        var err = textStatus + ", " + error;
        console.error("Request Failed: " + err);
        reject(err);
      });
    });
  }

  var createEditForm = $("#regForm");
  var deleteForm = $("#deleteForm");

  var registrationModel = {
    firstName: null,
    lastName: null,
    email: null,
    login: null,
    password: null,
  };

  var loginModel = {
    login: null,
    password: null,
  };

  // Specify the validation rules
  var validationRules = {
    firstname: {
      required: true,
    },
    email: {
      required: true,
    },
    email: {
      required: true,
    },
    login: {
      required: true,
    },
    password: {
      required: true,
      maxlength: 8,
    },
  };

  // Specify the validation error messages
  var validationMessages = {
    login: {
      required: "This field is required.",
      maxlength: "This field cannot be longer than 255 characters.",
    },
    password: {
      required: "This field is required.",
      maxlength: "This field cannot be longer than 255 characters.",
    },
  };

  $(document).ready(function () {
    loadConfig()
      .then(() => {
        console.log(API_PATH);
        $("#loginAlt").click(function (e) {
          // e.preventDefault();
          // console.log(path)
          location.href = path + "/HTML/login.html";
        });

        $("#loginBTn").click(function () {
          localStorage.removeItem("token");
          login();
        });
    

        // add the rule here
        $.validator.addMethod(
          "valueNotEquals",
          function (value, element, arg) {
            return arg != value;
          },
          ""
        );

        createEditForm.validate({
          rules: validationRules,
          messages: validationMessages,
          submitHandler: function (form) {
            createUpdateForm();
          },
        });

        deleteForm.submit(function (e) {
          // prevent Default functionality
          e.preventDefault();
          // pass the action-url of the form
          deleteForm1(e.currentTarget.action);
        });
      })
      .catch((error) => {
        console.error("Initialization failed: ", error);
      });
  });

  function createUpdateForm() {
    console.log("hello");
    registrationModel.firstName = $("#inputfirstname").val();
    registrationModel.login = $("#inputusername").val();
    registrationModel.lastName = $("#inputLastname").val();
    registrationModel.email = $("#inputEmail").val();
    registrationModel.password = $("#inputPassword").val();
    $.ajax({
      method: "POST",
      url: API_PATH + "/api/v1/user/register",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(registrationModel),
      success: function (data) {
        localStorage.setItem("userDTO", data);
        createEditForm.trigger("reset");
        getToken(registrationModel);
      },
      error: function (xhr, error) {
        // onError(xhr, error);
        Swal.fire({
          title: xhr.responseText,
        });
      },
    });
  }

  function getToken(data) {
    loginModel.login = data.login;
    loginModel.password = data.password;
    $.ajax({
      method: "POST",
      url: API_PATH + "/api/v1/auth/authenticate",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(loginModel),
      success: function (data) {
        localStorage.setItem("token", data.token);
        // onSaveSuccess(data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });
        sample();
      },
      error: function (xhr, error) {},
    });
  }

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  const sample = async () => {
    let delayres = await delay(3000);
    location.href = Path + "/HTML/dashboard.html";
  };

  const login = async () => {
    location.href = Path + "/HTML/login.html";
  };

  Registraion.showModalPopup = function (el, id, action, obj) {
    resetForm();
    if (id) {
      switch (action) {
        case 0:
          showForm(id, obj);
          break;
        case 1:
          editForm(id);
          createEditForm.attr("method", "PUT");
          break;
        case 2:
          deleteForm.attr("action", formContextPath + "/" + id);
          break;
        case 3:
          loadQuestions(id);
          break;
      }
    }
    el.modal("show");
  };

  Registraion.closeModalPopup = function (el) {
    el.modal("hide");
  };

  function resetForm() {
    $(".alert").hide();
    createEditForm.trigger("reset"); // clear form fields
    createEditForm.validate().resetForm(); // clear validation messages
    createEditForm.attr("method", "POST"); // set default method
    formModel.pid = null; // reset form model;
  }
})();
