{
    let tasksList = [];

    const tasksListRender = () => {
        let listHTML = "";

        for (const task of tasksList) {
            listHTML += `
            <li class="tasks__listItem ${task.taskDone ? "tasks__listItem--done" : ""} ${task.taskVisibility ? "" : "tasks__listItem---hide"}">
                <button class="js-tasks__doneButton tasks__doneButton ${task.taskDone ? "tasks__doneButton--done" : ""}"></button>
                <span class="tasks__taskContent">${task.taskName}</span>
                <div class="tasks__itemButtons">
                <span class="tasks__taskPriority ${toggleTaskPriority(task)}"></span>
                <button class="js-tasks__removeButton tasks__removeButton"></button>
                </div>
            </li>`;
        };

        document.querySelector(".js-tasksList").innerHTML = listHTML;
    };

    const taskButtonRender = () => {
        let tasksMenu = document.querySelector(".js-tasksMenu");

        if (tasksList.length === 0) {
            tasksMenu.innerHTML = "";
            return
        };

        tasksMenu.innerHTML = `
        <div class="tasks__menu">
        <div class="tasks__taskCounter">
            <p class="tasks__taskCounterItem">Zadań: 
                <span class="tasks__taskCounterNumber">${tasksList.length}</span></p>
            <p class="tasks__taskCounterItem">Do zrobienia: 
                <span class="tasks__taskCounterNumber">${tasksList.filter(task => task.taskDone === false).length}</span></p>
        </div>
        <div class="tasks__buttons">
            <button class="tasks__buttonItem js-hideTasksButton">
                ${tasksList.some(({ taskVisibility }) => taskVisibility === false) ? "Pokaż" : "Ukryj" } zakończone
            </button>
            <button class="tasks__buttonItem js-doneAllTasksButton" 
                ${tasksList.every(({ taskDone }) => taskDone === true) ? "disabled" : "" }>Zakończ wszystkie
            </button>
        </div>
        </div>`
    };

    const render = () => {
        tasksListRender();
        taskAddEvents();

        taskButtonRender();
        buttonsAddEvents();
    };

    const doneAllTasks = () => {
        tasksList = [
            ...tasksList.map((task) => task.taskDone === true ? task : { ...task, taskDone: true })
        ];

        render();
    };

    const toggleTaskVisibility = () => {
        tasksList = [
            ...tasksList.map((task) =>
                task.taskDone === true ? { ...task, taskVisibility: !task.taskVisibility } : task),
        ];

        render();
    };

    const buttonsAddEvents = () => {
        const allTaskDoneButton = document.querySelector(".js-doneAllTasksButton");

        if (!allTaskDoneButton) {
            return
        };

        allTaskDoneButton.addEventListener("click", doneAllTasks);

        const hideAllTasksButton = document.querySelector(".js-hideTasksButton");

        hideAllTasksButton.addEventListener("click", toggleTaskVisibility);
    };

    const toggleTaskPriority = (task) => {
        if (task.taskPriority === 0) {
            return "tasks__taskPriority--nopriority";
        };

        if (task.taskPriority === 1) {
            return "tasks__taskPriority--averange";
        };

        return "tasks__taskPriority--important";
    };

    const toggleTaskStatus = (button, index) => {
        button.classList.toggle("tasks__doneButton--done");
        toggleTaskDone(index);
        listSort();
    };

    const taskAddEvents = () => {
        const doneButton = document.querySelectorAll(".js-tasks__doneButton");

        doneButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                toggleTaskStatus(button, index);
            });
        });

        const removeButton = document.querySelectorAll(".js-tasks__removeButton");

        removeButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const itemSorting = (a, b) => {
        return a.taskDone - b.taskDone || b.taskPriority - a.taskPriority;
    };

    const listSort = () => {
        tasksList.sort(itemSorting);
        render();
    };

    const taskAdd = (newTask, prioritySelect) => {
        const priorityLevel = prioritySelect.value;

        const newTaskPriority = () => {
            switch (priorityLevel) {
                case "":
                    return 0;
                case "brak":
                    return 0;
                case "sredni":
                    return 1;
                case "wysoki":
                    return 2;
            };
        };

        tasksList = [
            ...tasksList,
            {
                taskName: newTask,
                taskPriority: newTaskPriority(),
                taskDone: false,
                taskVisibility: true,
            },
        ];

        render();
    };

    const formFieldErase = (newTaskField, prioritySelect) => {
        newTaskField.value = "";
        prioritySelect.value = "";
    };

    const toggleTaskDone = (index) => {
        const doneItemIndex = index;

        tasksList = [
            ...tasksList.map((task, index) => doneItemIndex === index ? { ...task, taskDone: !task.taskDone } : task),
        ];

        render();
    };

    const removeTask = (index) => {
        tasksList = [
            ...tasksList.slice(0, index),
            ...tasksList.slice(index + 1),
        ];

        render();
    };

    const formSubmit = (e) => {
        e.preventDefault();

        const newTaskField = document.querySelector(".js-addNewTask");
        const prioritySelect = document.querySelector(".js-newTaskPriority");
        const newTask = newTaskField.value.trim();

        if (newTask === "") {
            return
        };

        taskAdd(newTask, prioritySelect);
        listSort();
        formFieldErase(newTaskField, prioritySelect);
        newTaskField.focus();
    };

    const init = () => {
        render();

        const addForm = document.querySelector(".js-taskListForm");
        addForm.addEventListener("submit", formSubmit);

    };

    init();
};