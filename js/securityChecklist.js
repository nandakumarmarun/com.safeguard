// Create a Form object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
if (!this.Registraion) {
  this.Registraion = {};
}

(function () {
  "use strict";

  var formContextPath =
    location.protocol + "//" + location.host + location.pathname;

  var createEditForm = $("#regForm");
  var deleteForm = $("#deleteForm");

  var checkListItemDTO = {
    id: null,
    checklistItemName: null,
    value: null,
    priorityLevel: null,
  };

  var checklist = {
    id: null,
    checklistName: null,
    checkListItemDTO: [],
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

    loadQuetions();

    var currentStep = 0;
    var totalSteps = $(".step").length;

    $(".next-step").click(function () {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });

    $(".prev-step").click(function () {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });

    function showStep(step) {
      $(".step").removeClass("active");
      $(".step-" + step).addClass("active");
      $(".sidebar-item").removeClass("active");
      $(".sidebar-item.step-" + step).addClass("active");
    }






    $("#multiStepForm").submit(function (event) {
      event.preventDefault();
      alert("Form submitted!");
      // You can add your form submission logic here.
    });



    // createEditForm.validate({
    //   rules: validationRules,
    //   messages: validationMessages,
    //   submitHandler: function (form) {
    //     createUpdateForm();
    //   },
    // });

    // deleteForm.submit(function (e) {
    //   // prevent Default functionality
    //   e.preventDefault();
    //   // pass the action-url of the form
    //   deleteForm1(e.currentTarget.action);
    // });
  });


  function loadQuetions() {
    let checklist2 = [];
    checklist2 = JSON.parse(localStorage.getItem("ChecklistDataList"));
    var tabody = ""
    var sideBarItems = ""


    tabody += `<div class="step step-0 active">
        <div class="div">
            <form action="">
                <label class="m-2">Company</label>
                <select id="priority" class="form-select mt-2" id="inputGroupSelect01">
                    <option value="HIGH" selected>HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                </select>
                <label class="m-2">SystemNo</label>
                <input id="systemNo" type="text" class="form-control mt-2" placeholder="Enter System Number"
                    aria-label="SystemNo" />
                <label class="m-2">Project Name</label>
                <input id="projectName" type="text" class="form-control mt-2" placeholder="Enter Project Name"
                    aria-label="Project Name" />
            </form>
            <button type="button" class="btn btn-primary btn-1 m-3 next-step">Next</button>
        </div>
    </div>`;

    sideBarItems += '<div class="sidebar-item m-3 text-center step-0 active'
        + '">'
        + '<h3>New Test</h3></div>'

    $.each(checklist2, function (index, value) {
      var activeClass = (index === 0) ? ' active' : '';
      tabody += '<div class="step step-'
        + (index + 1)
        + '"><h2 class="m-4 fs-1 fw-bold">'
        + value.checklistName
        + '</h2>'

      var loadQu = "";

      var activeClass = (index === 0) ? ' active' : '';

      sideBarItems += '<div class="sidebar-item m-3 text-center step-'
        + (index + 1)
        + '">'
        + '<h3>'
        + value.checklistName
        + '</h3></div>'

      $.each(value.checkListItemDTO, function (itemIndex, item) {
        loadQu += '<div class="form-check fs-3 m-3">'
          + '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked-'
          + index
          + '">'
          + '<label class="form-check-label" for="flexCheckChecked">'
          + item.checklistItemName
          + '</label></div>'
      });
      tabody += loadQu;

      var buttondiv = '<div class="row mt-5"><div class="col text-end p-3">'
      tabody += buttondiv;

      
      tabody += '<button type="button" class="btn btn-secondary btn-1 m-3 prev-step">Previous</button>'
      if (index < checklist2.length - 1) {
        tabody += '<button type = "button" class="btn btn-primary btn-1 m-3 next-step" >Next</button>'
      } else {
        tabody += '<button type="submit" class="btn btn-success m-3 btn-1">Submit</button>'
      }

      tabody += `</div></div></div>`;
    });
    console.log(tabody)
    $("#multiStepForm").append(tabody);
    $("#sidebar-inner").append(sideBarItems);
  }





  function getToken(data) {
    loginModel.login = data.login
    loginModel.password = data.password
    $.ajax({
      method: 'POST',
      url: "http://localhost:8081/api/v1/auth/authenticate",
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(loginModel),
      success: function (data) {
        localStorage.setItem('token', data.token);
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
          }
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully"
        });
        sample();
      },
      error: function (xhr, error) {
      }
    });
  }

  const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  const sample = async () => {
    let delayres = await delay(3000);
    location.href = "http://localhost:80/HTML/new"
  };

  // function onSaveSuccess(result) {
  //   // reloading page to see the updated data
  //   window.location = formContextPath;
  // }

  // function onDeleteSuccess(result) {
  //   // reloading page to see the updated data
  //   window.location = formContextPath;
  // }





  function resetForm() {
    $(".alert").hide();
    createEditForm.trigger("reset"); // clear form fields
    createEditForm.validate().resetForm(); // clear validation messages
    createEditForm.attr("method", "POST"); // set default method
    formModel.pid = null; // reset form model;
  }

  function addErrorAlert(message, key, data) {
    $(".alert > p").html(message);
    $(".alert").show();
  }

  function onError(httpResponse, exception) {
    var i;
    switch (httpResponse.status) {
      // connection refused, server not reachable
      case 0:
        addErrorAlert("Server not reachable", "error.server.not.reachable");
        break;
      case 400:
        var errorHeader = httpResponse.getResponseHeader(
          "X-orderfleetwebApp-error"
        );
        var entityKey = httpResponse.getResponseHeader(
          "X-orderfleetwebApp-params"
        );
        if (errorHeader) {
          var entityName = entityKey;
          addErrorAlert(errorHeader, errorHeader, {
            entityName: entityName,
          });
        } else if (httpResponse.responseText) {
          var data = JSON.parse(httpResponse.responseText);
          if (data && data.fieldErrors) {
            for (i = 0; i < data.fieldErrors.length; i++) {
              var fieldError = data.fieldErrors[i];
              var convertedField = fieldError.field.replace(/\[\d*\]/g, "[]");
              var fieldName =
                convertedField.charAt(0).toUpperCase() +
                convertedField.slice(1);
              addErrorAlert(
                "Field " + fieldName + " cannot be empty",
                "error." + fieldError.message,
                {
                  fieldName: fieldName,
                }
              );
            }
          } else if (data && data.message) {
            addErrorAlert(data.message, data.message, data);
          } else {
            addErrorAlert(data);
          }
        } else {
          addErrorAlert(exception);
        }
        break;
      default:
        if (httpResponse.responseText) {
          var data = JSON.parse(httpResponse.responseText);
          if (data && data.description) {
            addErrorAlert(data.description);
          } else if (data && data.message) {
            addErrorAlert(data.message);
          } else {
            addErrorAlert(data);
          }
        } else {
          addErrorAlert(exception);
        }
    }
  }
})();
