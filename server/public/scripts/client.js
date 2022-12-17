$(document).ready(onReady);

function onReady(){
    getTasks();
    $('#submitButton').on('click', createTasks);
}

function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/task_list'
    })
    .then((response) => {
        $('tbody').empty();
        for (let tasks of response) {

            $('tbody').append(
                ` <tr>
                    <td>${tasks.status}</td>
                    <td>${tasks.task}</td>
                    <td>${tasks.due_date}</td>
                    <td><button class="completeButton">Complete</button></td>
                    <td><button class="deleteButton">Delete</button></td>
                </tr> `
            )
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
        dueDate: $('#taskDueDate').val()
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
}