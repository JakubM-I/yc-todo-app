{
    const tasksList = [];

    const render = () => {
        let listHTML = "";

        for (const task of tasksList) {
            listHTML += `<li class="tasks__listItem ${task.taskDone ? "tasks__listItem--done" : ""}">
        <button class="js-tasks__doneButton tasks__doneButton ${task.taskDone ? "tasks__doneButton--done" : ""}"></button>
        <span class="tasks__taskContent">${task.taskName}</span>
        <div class="tasks__itemButtons"><span class="tasks__taskPriority ${task.taskPriority === 0 ? "tasks__taskPriority--nopriority" : task.taskPriority === 1 ? "tasks__taskPriority--averange" : "tasks__taskPriority--important"}"></span>
        <button class="js-tasks__removeButton tasks__removeButton"></button></div></li>`;
        };

        document.querySelector(".js-tasksList").innerHTML = listHTML;

        taskListUpdate();
    };

    const taskListUpdate = () => {
        const doneButton = document.querySelectorAll(".js-tasks__doneButton");

        doneButton.forEach((button, index) => {
            button.addEventListener("click", () => {
                button.classList.toggle("tasks__doneButton--done");
                doneTask(index);
                listSort();
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
        tasksList.sort(itemSorting)
        render();
    }

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
            }
        }

        tasksList.push(
            {
                taskName: newTask,
                taskPriority: newTaskPriority(),
                taskDone: false,
            }
        );
        render();
    };

    const formFieldErase = (newTaskField, prioritySelect) => {
        newTaskField.value = "";
        prioritySelect.value = "";
    };

    const doneTask = (index) => {
        tasksList[index].taskDone = !tasksList[index].taskDone;
        render();
    };

    const removeTask = (index) => {
        tasksList.splice(index, 1);
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
    }

    const init = () => {
        render();

        const addForm = document.querySelector(".js-taskListForm");
        addForm.addEventListener("submit", formSubmit);

    };

    init();
}