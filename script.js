const tasksList = [
    {
        taskName: "Zadanie1",
        taskDone: true,
    },
];

const render = () =>{
    let listHTML = "";

    for (const task of tasksList) {
        listHTML +=`<li>${task.taskName}</li>`;   
    }

    document.querySelector(".js-tasksList").innerHTML = listHTML;
};


const taskAdd = (newTask) => {
    tasksList.push(
        {
            taskName: newTask,
        }
    );
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
    });

};

init();