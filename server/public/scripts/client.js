$(document).ready(onReady);

function onReady(){
    getTasks();
}

function getTasks () {
    $.ajax({
        method: 'GET',
        url: '/task_list'
    })
    .then((response) => {
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