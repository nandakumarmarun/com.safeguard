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
    // add the rule here
    // $.validator.addMethod(
    //   "valueNotEquals",
    //   function (value, element, arg) {
    //     return arg != value;
    //   },
    //   ""
    // );


    var currentStep = 1;
    var totalSteps = $(".step").length;

    $(".next-step").click(function () {
      if (currentStep < totalSteps) {
        currentStep++;
        showStep(currentStep);
      }
    });

    $(".prev-step").click(function () {
      if (currentStep > 1) {
        currentStep--;
        showStep(currentStep);
      }
    });

    function showStep(step) {
      $(".step").removeClass("active");
      $(".step-" + step).addClass("active");
    }

    $("#multiStepForm").submit(function (event) {
      event.preventDefault();
      alert("Form submitted!");
      // You can add your form submission logic here.
    });

    loadQuetions();

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
    $.each(checklist2, function (index, value) {
      var activeClass = (index === 0) ? ' active' : '';
      tabody += '<div class="step step-'
        + (index + 1)
        + activeClass
        + '<h2>'
        + value.checklistName
        + '</h2>'

      var loadQu = "";

      $.each(value.checkListItemDTO, function (itemIndex, item) {
        loadQu = '<div class="form-check">'
          + '<input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">'
          + '<label class="form-check-label" for="flexCheckChecked">'
          + item.checklistItemName
          + '</label></div>'
      });
      tabody += loadQu;

      if (index < 0) {
        tabody += '<button type="button" class="btn btn-secondary prev-step">Previous</button>'
      }
      if (index < checklist2.length - 1) {
        tabody += '<button type = "button" class="btn btn-primary next-step" >Next</button>'
      } else {
        tabody += '<button type="button" class="btn btn-secondary prev-step">Previous</button>'
        tabody += '<button type="submit" class="btn btn-success">Submit</button>'
      }
      tabody += `</div>`;
    });
    $("#multiStepForm").append(tabody);
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
