let scheduleData = {};  // Your JSON data goes here

window.onload = function() {
    loadWeeks();
    loadTasks();
};

function loadWeeks() {
    let weekSelect = document.getElementById('weekSelect');
    for (let week in scheduleData['STAT 252']) {
        let option = document.createElement('option');
        option.value = week;
        option.text = week;
        weekSelect.appendChild(option);
    }
}

function loadTasks() {
    let week = document.getElementById('weekSelect').value;
    let selectedClass = document.getElementById('classSelect').value;
    let tasksContainer = document.getElementById('tasksContainer');

    tasksContainer.innerHTML = '';  // Clear previous tasks

    let tasks = scheduleData[selectedClass][week];
    tasks.forEach(task => {
        let taskElement = document.createElement('div');
        taskElement.innerText = task.task + ' - ' + task.person;
        tasksContainer.appendChild(taskElement);
    });
}
