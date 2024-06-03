// Create a Form object only if one does not already exist. We create the
// methods in a closure to avoid creating global variables.
if (!this.Registraion) {
  this.Registraion = {};
}

(function () {
  "use strict";

  var formContextPath =
    location.protocol + "//" + location.host + location.pathname;

  // var createEditForm = $("#regForm");
  // var deleteForm = $("#deleteForm");

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

  var rawId;

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
    // Define an array of contents to append

    $("#checklistTable").on("click", ".edit1", function () {
      const $row = $(this).closest("tr");
      const $icon = $(this).find("i");
      if ($icon.hasClass("fa-pen-to-square")) {
        switchToEditMode2($row);
        // Optionally change the icon to a save icon here
        $icon.removeClass("fa-pen-to-square").addClass("fa-save");
      } else {
        saveRow2($row);
        // Optionally change the icon back to edit icon here
        $icon.removeClass("fa-save").addClass("fa-pen-to-square");
      }
    });

    $("#checklistTable").on("click", ".edit", function () {
      const $row = $(this).closest("tr");
      if ($(this).text() === "Edit") {
        switchToEditMode($row);
      } else {
        saveRow($row);
      }
    });

    $("#checklistcollapse").on("click", ".edit", function () {
      const $row = $(this).closest("tr");
      if ($(this).text() === "Edit") {
        switchToEditMode($row);
      } else {
        saveRow($row);
      }
    });

    $("#checklistTable").on("click", ".add", function (event) {
      // Access the clicked button's parent table row
      var clickedRow = $(this).closest("tr");
      // Extract the data-id from the table row
      var dataId = clickedRow.data("id");
      rawId = dataId;
    });

    $("#checklistTable").on("click", ".delete1", function (event) {
      // Access the clicked button's parent table row
      var clickedRow = $(this).closest("tr");
      // Extract the data-id from the table row
      var dataId = clickedRow.data("id");
      deleteRow2(dataId);
      loadTable();
    });

    // $('#tbodyCheckListitemCodel').on('click', '.edit', function () {
    //   const $row = $(this).closest('tr');
    //   if ($(this).text() === 'Edit') {
    //     switchToEditMode($row);
    //   } else {
    //     saveRow($row);
    //   }
    // });

    // offcanvas add
    $("#addclit").on("click", function () {
      console.log("Button clicked");
      loadToLocalStorge();
      innerTableLload();
    });

    // offcanvas add
    $("#modelAddbtn").on("click", function () {
      console.log("Button clicked");
      loadModelToLocalStorge();
      innerTablemodelload();
    });

    $("#btnsvecheck").on("click", function () {
      console.log("Button clicked");
      savechecklist();
      loadTable();
    });

    $("#addBtnNewitem").on("click", function () {
      console.log("Button clicked");
      addNewItem();
      loadTable();
    });
    loadTable();
  });

  function loadTable() {
    $("#checklistTable").html(" ");
    let checklist2 = [];
    checklist2 = JSON.parse(localStorage.getItem("ChecklistDataList"));
    var div = "";
    // Use the .each() method to iterate over the array and append content
    $.each(checklist2, function (index, value) {
      var checklistContent2 = "";

      var tableRow =
        '<tr data-id="' +
        value.id +
        '"><td class="col-9" data-column="checklisName"><a class="btn  m-2" data-bs-toggle="collapse" role="button" href="#' +
        value.id +
        '"aria-expanded="false" aria-controls="' +
        value.id +
        '"><i class="fa-regular fa-square-plus"></i></a>' +
        value.checklistName +
        "</td>" +
        '<td class="col-3 actions"><div class="cd-center actions">' +
        '<button class="btn m-1 edit1"><i class="fa-regular fa-pen-to-square"></i></button>' +
        '<button class="btn m-1 delete1 actions"><i class="fa-solid fa-trash"></i></button>' +
        '<button class="btn m-1 add actions" data-bs-toggle="modal" data-bs-target="#exampleModal" ><i class="fa-solid fa-circle-plus"></i></button>' +
        "</td></tr>";

      div += tableRow;

      var innerrows =
        '<tr class="collapse"' +
        'id="' +
        value.id +
        '">' +
        '<td colspan="2">' +
        '<table class="table table-collapse table-striped col-12">' +
        "<thead><tr>" +
        '<th class="col-3">Question</th>' +
        '<th class="col-3">Value</th>' +
        '<th class="col-3">Priority</th>' +
        '<th class="col-3 cd-center">Actions</th></tr></thead><tbody>';

      div += innerrows;

      $.each(value.checkListItemDTO, function (itemIndex, item) {
        checklistContent2 +=
          '<tr data-id="' +
          item.id +
          '"><td class="col-3" data-column="checklistItemName">' +
          item.checklistItemName +
          '</td><td class="col-3" data-column="score">' +
          item.value +
          '</td><td class="col-3 dropdown-column" data-column="priorityLevel">' +
          item.priorityLevel +
          "</td>" +
          '<td class="col-3 actions"><div class="cd-center actions"><button class="btn btn-primary m-2 edit">Edit</button>' +
          '<button class="btn btn-danger m-2 delete actions">Delete</button></div>' +
          "</td></tr>";
      });

      div += checklistContent2;
      div += "</tbody></table></td>";
    });

    $("#checklistTable").append(div);
  }

  function loadToLocalStorge() {
    let newdata = [];

    let checklistData1 =
      JSON.parse(localStorage.getItem("checklistData")) || [];

    if (checklistData1.length !== 0) {
      checklist = checklistData1[0];
      // Fill registrationModel with values from the form
      checkListItemDTO.id = uuidv4(); // Auto-increment ID based on the existing items count
      checkListItemDTO.checklistItemName = $("#checklistitemName").val();
      checkListItemDTO.value = parseFloat($("#value").val());
      checkListItemDTO.priorityLevel = $("#priority").val();

      checklist.checkListItemDTO.push(checkListItemDTO);
      newdata.push(checklist);
      localStorage.setItem("checklistData", JSON.stringify(newdata));
      // Optional: Save registrationModel to localStorage or handle it accordingly
      console.log("Registration Model Data: ", checklistData1);
    } else {
      checklist = null;
      // Fill registrationModel with values from the form
      checkListItemDTO.id = uuidv4(); // Auto-increment ID based on the existing items count
      checkListItemDTO.checklistItemName = $("#checklistitemName").val();
      checkListItemDTO.value = parseFloat($("#value").val());
      checkListItemDTO.priorityLevel = $("#priority").val();

      checklist = {
        id: uuidv4(),
        checklistName: $("#checklistN").val(),
        checkListItemDTO: [],
      };

      checklist.checkListItemDTO.push(checkListItemDTO);
      newdata.push(checklist);
      localStorage.setItem("checklistData", JSON.stringify(newdata));
      // Optional: Save registrationModel to localStorage or handle it accordingly
      console.log("Registration Model Data: ", checklistData1);
    }
  }

  function loadModelToLocalStorge() {
    let newdata = [];

    let checklistData1 =
      JSON.parse(localStorage.getItem("checklistData")) || [];

    if (checklistData1.length !== 0) {
      checklist = checklistData1[0];
      // Fill registrationModel with values from the form
      checkListItemDTO.id = uuidv4(); // Auto-increment ID based on the existing items count
      checkListItemDTO.checklistItemName = $("#checklistitemNameModel").val();
      checkListItemDTO.value = parseFloat($("#valueModel").val());
      checkListItemDTO.priorityLevel = $("#priorityModel").val();

      checklist.checkListItemDTO.push(checkListItemDTO);
      newdata.push(checklist);
      localStorage.setItem("checklistData", JSON.stringify(newdata));
      // Optional: Save registrationModel to localStorage or handle it accordingly
      console.log("Registration Model Data: ", checklistData1);
    } else {
      checklist = null;
      // Fill registrationModel with values from the form
      checkListItemDTO.id = uuidv4(); // Auto-increment ID based on the existing items count
      checkListItemDTO.checklistItemName = $("#checklistitemNameModel").val();
      checkListItemDTO.value = parseFloat($("#valueModel").val());
      checkListItemDTO.priorityLevel = $("#priorityModel").val();

      checklist = {
        id: uuidv4(),
        checklistName: $("#checklistN").val(),
        checkListItemDTO: [],
      };

      checklist.checkListItemDTO.push(checkListItemDTO);
      newdata.push(checklist);
      localStorage.setItem("checklistData", JSON.stringify(newdata));
      // Optional: Save registrationModel to localStorage or handle it accordingly
      console.log("Registration Model Data: ", checklistData1);
    }
  }

  // Print the UUID
  function uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  function savechecklist() {
    let newdata = [];
    let ChecklistDataList = [];
    ChecklistDataList =
      JSON.parse(localStorage.getItem("ChecklistDataList")) || [];

    let checklistData1 =
      JSON.parse(localStorage.getItem("checklistData")) || [];

    if (checklistData1.length !== 0) {
      ChecklistDataList.push(checklistData1[0]);
      localStorage.setItem(
        "ChecklistDataList",
        JSON.stringify(ChecklistDataList)
      );
    } else {
      newdata.push(checklistData1[0]);
      localStorage.setItem("ChecklistDataList", JSON.stringify(newdata));
    }
    localStorage.removeItem("checklistData");
    var offcanvasElement = document.getElementById("offcanvasExample");
    var offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (offcanvas) {
      offcanvas.hide();
    }
    $("#checklistcollapse").html("");
    $("#checklistitemName").val("");
    $("#value").val("");
    $("#priority").val($("#priority option:first").val());
    $("#checklistN").val("");
  }

  function innerTableLload() {
    let checklistData1 =
      JSON.parse(localStorage.getItem("checklistData")) || [];
    var length = checklistData1.length - 1;
    var value = checklistData1[length];

    $("#checklistcollapse").html(" ");
    var tbody = "";

    var checklistContent2 = "";

    $.each(value.checkListItemDTO, function (itemIndex, item) {
      checklistContent2 +=
        '<tr><td class="col-3">' +
        item.checklistItemName +
        '</td><td class="col-3">' +
        item.value +
        '</td><td class="col-3 dropdown-column">' +
        item.priorityLevel +
        "</td>" +
        '<td class="col-3 actions"><div class="cd-center actions">' +
        '<button class="btn btn-danger m-2 actions">Delete</button></div>' +
        "</td></tr>";
    });

    {
      /* <button class="btn btn-warning m-2 edit">Edit</button> */
    }

    tbody += checklistContent2;
    $("#checklistcollapse").append(tbody);
    $("#checklistitemName").val("");
    $("#value").val("");
    $("#priority").val($("#priority option:first").val());
  }

  function innerTablemodelload() {
    let checklistData1 =
      JSON.parse(localStorage.getItem("checklistData")) || [];
    var length = checklistData1.length - 1;
    var value = checklistData1[length];

    $("#tbodyCheckListitemCodel").html(" ");
    var tbody = "";

    var checklistContent2 = "";

    $.each(value.checkListItemDTO, function (itemIndex, item) {
      checklistContent2 +=
        '<tr><td class="col-3">' +
        item.checklistItemName +
        '</td><td class="col-3">' +
        item.value +
        '</td><td class="col-3 dropdown-column">' +
        item.priorityLevel +
        "</td>" +
        '<td class="col-3 actions"><div class="cd-center actions">' +
        '<button class="btn btn-danger m-2 actions">Delete</button></div>' +
        "</td></tr>";
    });

    // <button class="btn btn-warning m-2 edit">Edit</button>

    tbody += checklistContent2;
    $("#tbodyCheckListitemCodel").append(tbody);
    $("#checklistitemNameModel").val("");
    $("#valueModel").val("");
    $("#priorityModel").val($("#priority option:first").val());
  }

  // function switchToEditMode(row) {
  //   row.find('td').each(function () {
  //     const $cell = $(this);
  //     if ($cell.hasClass('actions')) return;

  //     const currentText = $cell.text();
  //     const $input = $('<input>', {
  //       type: 'text',
  //       value: currentText
  //     });
  //     $cell.html($input);
  //   });
  //   row.find('.edit').text('Save');
  // }

  function switchToEditMode(row) {
    row.find("td").each(function () {
      const $cell = $(this);
      if ($cell.hasClass("actions")) return;
      const currentText = $cell.text().trim();

      if ($cell.hasClass("dropdown-column")) {
        // Define options for the dropdown
        const options = [
          { value: "HIGH", text: "HIGH" },
          { value: "MEADIUM", text: "MEADIUM" },
          { value: "LOW", text: "LOW" },
        ];

        const $select = $("<select>", {
          class: "form-control",
        });

        // Populate dropdown with options
        options.forEach((option) => {
          const $option = $("<option>", {
            value: option.value,
            text: option.text,
          });
          $select.append($option);
        });
        $select.val(currentText);
        $cell.empty().append($select);
      } else {
        const $input = $("<input>", {
          type: "text",
          value: currentText,
          class: "form-control",
        });
        $cell.empty().append($input);
      }
    });
    row.find(".edit").text("Save");
  }

  function switchToEditMode2(row) {
    row.find("td").each(function () {
      const $cell = $(this);
      if ($cell.hasClass("actions")) return;

      const collapseButton = $cell.find('[data-bs-toggle="collapse"]').detach();
      const currentText = $cell.text();
      const $input = $("<input>", {
        type: "text",
        value: currentText,
      });
      $cell.empty().append(collapseButton).append($input);
    });
    row.find(".edit").text('<i class="fa-solid fa-check"></i>');
  }

  function saveRow($row) {
    var hrefId = $row.closest(".collapse").attr("id");
    $row.find("td").each(function () {
      const $cell = $(this);
      if ($cell.hasClass("actions")) return;

      const columnName = $cell.data("column"); // Get the column name
      checkListItemDTO.id = $row.data("id");

      const $select = $cell.find("select");
      if ($select.length) {
        if (columnName === "priorityLevel") {
          checkListItemDTO.priorityLevel = $select.val();
        }
        $cell.text($select.val());
      } else {
        // Otherwise, check for a text input
        const $input = $cell.find("input");
        if ($input.length) {
          if (columnName === "checklistItemName") {
            checkListItemDTO.checklistItemName = $input.val();
          } else if (columnName === "score") {
            checkListItemDTO.value = $input.val();
          }
          $cell.text($input.val());
        }
      }
    });
    $row.find(".edit").text("Edit");
    console.log("Row updated successfully", checkListItemDTO);
    let checklistData1 = [];
    checklistData1 =
      JSON.parse(localStorage.getItem("ChecklistDataList")) || [];

    let itemIndex1 = checklistData1.findIndex((item) => item.id === hrefId);
    var itemdata = checklistData1.find((item) => item.id === hrefId);

    let itemIndex2 = itemdata.checkListItemDTO.findIndex(
      (item) => item.id === checkListItemDTO.id
    );

    itemdata.checkListItemDTO[itemIndex2] = checkListItemDTO;
    checklistData1[itemIndex1] = itemdata;

    localStorage.setItem("ChecklistDataList", JSON.stringify(checklistData1));
  }

  function addNewItem() {
    console.log("fetch newly add data", checkListItemDTO);
    let checklistitems = [];
    checklistitems = JSON.parse(localStorage.getItem("checklistData")) || [];

    console.log("find need raw id need  to add new item ");
    var hrefId = rawId;

    console.log("fetch all checklist");
    let checklistData1 = [];
    checklistData1 =
      JSON.parse(localStorage.getItem("ChecklistDataList")) || [];

    console.log("find  of index check list from all list  to update ");
    let itemIndex1 = checklistData1.findIndex((item) => item.id === hrefId);
    console.log("find checklsit  using id");
    var itemdata = checklistData1.find((item) => item.id === hrefId);

    console.log("push new data to checklist");
    $.each(checklistitems[0].checkListItemDTO, function (index, value) {
      itemdata.checkListItemDTO.push(value);
    });

    console.log("save index position");
    checklistData1[itemIndex1] = itemdata;

    console.log("save alldata");
    localStorage.setItem("ChecklistDataList", JSON.stringify(checklistData1));
    localStorage.removeItem("checklistData");
    $("#exampleModal").modal("hide");
    $("#tbodyCheckListitemCodel").html("");
  }

  function saveRow2($row) {
    var hrefId;
    var checklistNamenew;
    $row.find("td").each(function () {
      const $cell = $(this);
      if ($cell.hasClass("actions")) return;

      const columnName = $cell.data("column"); // Get the column name
      hrefId = $row.data("id");

      const collapseButton = $cell.find('[data-bs-toggle="collapse"]').detach();
      const $input = $cell.find("input");
      const newText = $input.val();
      checklistNamenew = newText;
      $cell
        .empty()
        .append(collapseButton)
        .append(document.createTextNode(newText));
    });
    $row.find(".edit").text("Edit");

    let checklistData1 = [];
    checklistData1 =
      JSON.parse(localStorage.getItem("ChecklistDataList")) || [];

    let itemIndex1 = checklistData1.findIndex((item) => item.id === hrefId);
    var itemdata = checklistData1.find((item) => item.id === hrefId);
    itemdata.checklistName = checklistNamenew;
    checklistData1[itemIndex1] = itemdata;
    localStorage.setItem("ChecklistDataList", JSON.stringify(checklistData1));
  }

  function deleteRow2(id) {
    var hrefId = id;
    let checklistData1 = [];
    checklistData1 =
      JSON.parse(localStorage.getItem("ChecklistDataList")) || [];

    let itemIndex1 = checklistData1.findIndex((item) => item.id === hrefId);
    if (itemIndex1 !== -1) {
      checklistData1.splice(itemIndex1, 1);

      // Update the local storage with the modified array
      localStorage.setItem("ChecklistDataList", JSON.stringify(checklistData1));
    }
  }

  function getToken(data) {
    loginModel.login = data.login;
    loginModel.password = data.password;
    $.ajax({
      method: "POST",
      url: "http://localhost:8081/api/v1/auth/authenticate",
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
    location.href = "http://localhost:80/HTML/new";
  };

  // function onSaveSuccess(result) {
  //   // reloading page to see the updated data
  //   window.location = formContextPath;
  // }

  function onDeleteSuccess(result) {
    // reloading page to see the updated data
    window.location = formContextPath;
  }

  // Registraion.showModalPopup = function (el, id, action, obj) {
  //   resetForm();
  //   if (id) {
  //     switch (action) {
  //       case 0:
  //         showForm(id, obj);
  //         break;
  //       case 1:
  //         editForm(id);
  //         createEditForm.attr("method", "PUT");
  //         break;
  //       case 2:
  //         deleteForm.attr("action", formContextPath + "/" + id);
  //         break;
  //       case 3:
  //         loadQuestions(id);
  //         break;
  //     }
  //   }
  //   el.modal("show");
  // };

  // Registraion.closeModalPopup = function (el) {
  //   el.modal("hide");
  // };

  // function resetForm() {
  //   $(".alert").hide();
  //   createEditForm.trigger("reset"); // clear form fields
  //   createEditForm.validate().resetForm(); // clear validation messages
  //   createEditForm.attr("method", "POST"); // set default method
  //   formModel.pid = null; // reset form model;
  // }

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
