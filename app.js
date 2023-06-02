const taskText = document.getElementById('task');
const addTaskBtn = document.getElementById('button-addon2');
const btnText = addTaskBtn.innerText
const displayRecords = document.getElementById('records')
var taskArray = [];
let objstr = localStorage.getItem("users");
if (objstr != null) {
    taskArray = JSON.parse(objstr);
}
edit_id = null;
displayTask(taskArray)

addTaskBtn.onclick = function () {
    const name = taskText.value;

    if (edit_id != null) {
        taskArray.splice(edit_id, 1, { "task": name })
        edit_id = null;
        document.location.reload();
    }
    else {
        if (name == '') {
            alert("Enter task to be done!");
        } else {
            taskArray.push({ "task": name });
        }
    }


    saveTask(taskArray);
    taskText.value = '';
    addTaskBtn.innerText = btnText;
}


function saveTask(taskArray) {
    let str = JSON.stringify(taskArray);
    localStorage.setItem("users", str);
    displayTask(taskArray);
}

function displayTask(taskArray) {
    let statement = ''
    taskArray.forEach((user, i) => {
        statement = statement + `<tr>
        <th scope="row">${i + 1}</th>
        <td>${user.task}</td>
        <td>
            <button onclick='editTask(${i})'><i class="fa-solid fa-pen"></i></button>
            <button onclick='deleteTask(${i})'><i class="fa-solid fa-trash"></i></button>
        </td>
    </tr>`
        displayRecords.innerHTML = statement;
    })

}

function editTask(id) {
    edit_id = id;
    taskText.value = taskArray[id].task;
    addTaskBtn.innerText = "Save changes";

}

function deleteTask(id) {
    taskArray.splice(id, 1);
    saveTask(taskArray);
    document.location.reload();
}


const allTr = document.querySelectorAll("#records tr");
const searchInputField = document.getElementById("search");
searchInputField.addEventListener("input", function (e) {
    const elementToBeSearched = e.target.value.toLowerCase();
    displayRecords.innerHTML = ''
    allTr.forEach(tr => {
        const allTd = tr.querySelectorAll("td")
        if (allTd[0].innerText.toLowerCase().indexOf(elementToBeSearched) > -1) {
            displayRecords.appendChild(tr);
        }
    })
})