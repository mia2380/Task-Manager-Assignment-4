var iconImportant = "fas fa-star";
var iconNonImportant = "far fa-star";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
  if (isImportant) {
    //should not be important
    $("#iImportant").removeClass(iconImportant);
    $("#iImportant").addClass(iconNonImportant);
    isImportant = false;
  } else {
    //should be important
    $("#iImportant").removeClass(iconNonImportant);
    $("#iImportant").addClass(iconImportant);
    isImportant = true;
  }
}

function toggleForm() {
  if (isVisible) {
    $(".form").hide();
    isVisible = false;
  } else {
    $(".form").show();
    isVisible = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let desc = $("#txtDescription").val();
  let priority = $("#selPriority").val();
  let dueDate = $("#selDueDate").val();
  let color = $("#selColor").val();
  let contact = $("#txtContact").val();
  let participants = $("#txtParticipants").val();

  let task = new Task(isImportant, title, desc, priority, dueDate, color, contact, participants);
  
  //save the task on the server
  //CREATE A POST REQUEST TO url:"http://fsdiapi.azurewebsites.net/"
    $.ajax({
        type: "POST",
        url:"http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(task),
        contentType: "application/json",
        
        success: function(res) {
            display(task); //<- it should console log the title
            clearForm(); // should clear all the input fields
        },
        error: function(error) {
            console.log(error);
        },
    });
}

function clearForm() {
    $("#txtTitle").val("");
    $("#txtDescription").val("");
    $("#selPriority").val("");
    $("#selDueDate").val("");
    $("#selColor").val("");
    $("#txtContact").val("");
    $("#txtParticipants").val("");
}

function display(task) {
  console.log(task.title);

  let syntax = `<div class="task" style="border-color:${task.color}">
    <div class="head">  
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>

    <div class="middle">
        <label>${task.priority}</label>
        <label>${task.dueDate}</label>
    </div>

    <div class="tail">
        <label>${task.contact}</label>
        <label>${task.participants}</label>
    </div> 
  </div>`;

  $("#task-list").append(syntax);
}

function testGet() {
    $.ajax({
        type: "GET",
        url:"http://fsdiapi.azurewebsites.net/",
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}

function fetchTasks() {
    //load the task from the server and display them
    $.ajax({
        type: "GET",
        url:"http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(res) {
            let list = JSON.parse(res);
            for (let i = 0; i < list.length; i++) {  
                let task = list[i];
                if (task.developer == "Brenda")
                display(task);
            }
        },
        error: function(details) {
            console.log(details);
        }
    });
}

function init() {
  console.log("Task manager");
  // load data
  fetchTasks();

  //hook event
  $("#btnSave").click(saveTask);
  $("#iImportant").click(toggleImportant);
  $("#btnHideForm").click(toggleForm);
}

window.onload = init;
