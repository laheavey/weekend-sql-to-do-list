$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#submitButton').on('click', createTasks);
    $('body').on('click', '#completeButton', completeTasks);
    $('body').on('click', '#deleteButton', deleteTasks);
    $('body').on('click', '#procrastinateButton', procrastinateTasks);
}

function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/task_list'
    })
    .then((response) => {
        $('#taskList').empty();
        for (let task of response) {
            $('#taskList').append(`
                <div data-id=${task.id} class="col">
                    <div ${checkCompletion(task)}>
                        <div class="card-body">
                            <h5 class="card-title position-relative">${task.task}</h5>
                                <span ${checkOverdue(task)}></span>
                            <h6 class="card-subtitle mb-2 text-muted fw-lighter">Due on: ${task.due_date}</h6>
                            <hr>
                            <p class="card-text fw-light">${task.notes}</p>
                        </div>
                        <div class="card-footer">
                            <div class="btn-group btn-group-sm">
                                <button id="deleteButton" class="btn text-danger" title="Delete">
                                    <i class="bi bi-x"></i>
                                </button>
                                <button id="completeButton" class="btn text-success" title="Complete">
                                    <i class="bi bi-check"></i>
                                </button>
                                <button id="delegateButton" class="btn" title="Delegate">
                                    <i class="bi bi-at"></i>
                                </button>
                                <button id="procrastinateButton" class="btn text-primary" title="Procrastinate">
                                    <i class="bi bi-fast-forward"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`)

        }
    })
    .catch((error) => {
        console.log('Error in GET /task_list: ', error);
    })
}

function createTasks () {
    let newTask = {
        status: 'INCOMPLETE',
        task: $('#taskName').val(),
        dueDate: $('#taskDueDate').val(),
        notes: $('#taskNotes').val(),
    }    

    $.ajax({
        method: 'POST',
        url: '/task_list',
        data: newTask
    })
    .then((response) => {
        console.log('Response in POST /task_list: ', response);
        getTasks();
    })
    .catch((error) => {
        console.log('Error in POST /task_list: ', error)
    })

    $('#taskName').val('');
    $('#taskDueDate').val('');
    $('#taskNotes').val('');
}

function completeTasks () {
    let idToComplete = $(this).parent().parent().parent().parent().data().id;

    $.ajax({
        method: 'PUT',
        url: `/task_list/${idToComplete}`,
        data: {
            status: 'COMPLETE'
        }
    })
    .then((response) => {
        console.log('Response in PUT /task_list: ', response)
        let taskToComplete = $(this).parent().parent().parent();
        taskToComplete.addClass('card bg-secondary bg-opacity-25 text-muted text-decoration-line-through')
        getTasks();
    })
    .catch((error) => {
        console.log('Error in PUT /task_list: ', error);
    })
}

function deleteTasks () {
    let idToDelete = $(this).parent().parent().parent().parent().data().id;

    swal({
        title: "Are you sure?",
        text: "Once deleted, this task will be gone forever!",
        icon: "warning",
        dangerMode: true,
        buttons: ["Cancel", "Confirm"],
    })
    .then((value) => {
        if (value){
            $.ajax({
                method: 'DELETE',
                url: `/task_list/${idToDelete}`,
            })
            .then((response) => {
                console.log('Response in DELETE /task_list: ', response)
                getTasks();
            })
            .catch((error) => {
                console.log('Error in DELETE /task_list: ', error);
            })
        }
    })


}

function procrastinateTasks () {
    let taskToProcrasinate = $(this).parent().parent().parent();

    taskToProcrasinate.hide();
}

function checkCompletion(task) {
    if (task.status === 'COMPLETE') {
      return 'class="card bg-secondary bg-opacity-25 text-muted text-decoration-line-through"';
    }
    else {
      return 'class="card"';
    }
  }

function checkOverdue(task){
    let today = new Date();
    let taskDate = new Date(task.due_date);

    // console.log(today.toDateString());
    // console.log('Task date: ',taskDate.toDateString());

    if (today > taskDate){
        return 'class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle"';
    } else {
        return '';
    }

}