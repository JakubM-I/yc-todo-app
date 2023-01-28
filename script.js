const tasksList = [
    {
        taskName: "Zadanie1",
        taskDone: true,
    },
];

const render = () =>{
    let listHTML = "";

    for (const task of tasksList) {
        listHTML +=`<li>${task.taskName}</li>`
        
        document.querySelector(".js-tasksList").innerHTML = listHTML
    }

}

render();
const init = () => {

}

init()