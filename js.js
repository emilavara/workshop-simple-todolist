var list = [
    
]

const listElement = document.querySelector('.list');
const inputElement = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-btn');
const containerElement = document.querySelector('.container');

const modal = document.querySelector('dialog')
const modalConfirmButton = document.querySelector('#confirm-btn');
const modalCancelButton = document.querySelector('#cancel-btn');
const modalEditInput = document.querySelector('#edit-task-input');

addBtn.addEventListener('click', () => {
    addTask();
});

inputElement.addEventListener('click', () => {
    inputElement.placeholder = 'Add a task...'
    inputElement.classList.remove('invalid')
})

function addTask() {
    //create a new object and inject into list array
    //call render function

    var input = inputElement.value;

    if (input != '') {
        var objToAdd = {
            id: list.length + 1,
            task: input,
            completed: false
        }
    
        list.push(objToAdd)
        
        //reset input fields
        inputElement.value = '';

        //rerender list
        renderList();
        
        //recalculate new height for animation

        var currentHeight = containerElement.getBoundingClientRect().height;
        containerElement.style.height = currentHeight + 50 + 8 + "px";
    } else {
        inputElement.classList.add('invalid')
        inputElement.placeholder = 'Your task have a name...'
    }
}

function deleteTask(id) {
    //find selected task by id and delete it
    list = list.filter((task) => {
        return task.id !== id;
    })

    //rerender list
    renderList();

    //recalculate new height for animation
    var currentHeight = containerElement.getBoundingClientRect().height;
    containerElement.style.height = currentHeight - 58 + "px";
}

function editTask(id) {

    //find selected task by id
    var taskToEdit = list.find((task) => {
        return task.id === id
    })

    //if found, prompt for new text
    if (taskToEdit) {

        //open modal
        modal.showModal();
        
        //put current text value in edit input field
        modalEditInput.value = taskToEdit.task

        //add a listener for the cancel button, just closes modal
        modalCancelButton.addEventListener('click', () => {
            modal.close();
        })
        
        //add a listener for the confirm button
        modalConfirmButton.addEventListener('click', () => {
            taskToEdit.task = modalEditInput.value
            modal.close();
            
            //rerender list
            renderList();
        })
    }
}

function completeTask(id) {
    //find task by id
    var taskToComplete = list.find((task) => {
        return task.id === id;
    })

    //if found mark it complete
    if (taskToComplete) {
        taskToComplete.completed = true;

        //rerender list
        renderList();
    }
}

//render callback, should be referred at the end of each update function and onload
function renderList() {
    listElement.innerHTML = "";

    for (let task of list) {
        
        const li = document.createElement('li');
        li.dataset.taskid = task.id;

        //check if task completed and assign class accordingly
        if (task.completed) {
            li.classList.add('completed')
        }
        
        //create p element
        const p = document.createElement('p');
        p.classList.add('task');
        p.textContent = task.task
        p.addEventListener('click', () => {
            completeTask(task.id)
        })

        //append task to li element
        li.appendChild(p)


        //create btn container
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('btn-container')

        //create edit btn
        const editBtn = document.createElement('button');
        editBtn.textContent = 'edit'
        editBtn.classList.add('edit-btn')
        editBtn.addEventListener('click', () => {
            editTask(task.id)
        })
        
        //create delete btn
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'delete'
        deleteBtn.classList.add('delete-btn')
        deleteBtn.addEventListener('click', () => {
            deleteTask(task.id)
        })

        //append buttons to btnContainer        
        btnContainer.appendChild(editBtn)
        btnContainer.appendChild(deleteBtn)
        
        //append button container to li
        li.appendChild(btnContainer)

        //PREPEND li to ul
        listElement.prepend(li)
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('dom rendered')

    renderList();
});