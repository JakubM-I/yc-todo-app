const tasksList = [
    {
        taskName: "Zadanie1",
        taskDone: true,
    },
];

const render = () =>{
    let listHTML = "";

    for (const task of tasksList) {
        listHTML +=`<li class="tasks__listItem ${task.taskDone ? "tasks__listItem--done" : ""}"><button class="js-tasks__doneButton">Zrobione</button><span class="tasks__taskContent">${task.taskName}</span><button class="js-tasks__removeButton">Usuń</button></li>`;   
    }

    document.querySelector(".js-tasksList").innerHTML = listHTML;

    taskListUpdate();
};

const taskListUpdate = () => {
    const doneButton = document.querySelectorAll(".js-tasks__doneButton");

    doneButton.forEach((button, index) => {
        button.addEventListener("click", () =>{
            doneTask(index);
        });
    });

    const removeButton = document.querySelectorAll(".js-tasks__removeButton");

    removeButton.forEach((button, index) => {
        button.addEventListener("click", () => {
            removeTask(index);
        });
    });

};


const taskAdd = (newTask) => {
    tasksList.push(
        {
            taskName: newTask,
        }
    );
    render();
};

const formFieldErase = (newTaskField) => {
    newTaskField.value = "";
};

const doneTask = (index) => {
    tasksList[index].taskDone = true;
    render();
};

const removeTask = (index) => {
    tasksList.splice(index, 1);
    render();
};


const init = () => {
    render();

    const addForm = document.querySelector(".js-taskListForm");
    const newTaskField = document.querySelector(".js-addNewTask");

    addForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const newTask = newTaskField.value.trim();
        if(newTask === ""){
            return
        };

        taskAdd(newTask);
        formFieldErase(newTaskField);
    });

};

init();