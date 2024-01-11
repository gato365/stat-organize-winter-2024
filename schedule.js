// Load in school_schedule.json
const fs = require('fs');

let scheduleData; // Declare the variable

fs.readFile('school_schedule.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        scheduleData = JSON.parse(data); // Save the parsed JSON into the variable
        console.log(scheduleData);
    } catch (err) {
        console.error('Error parsing JSON:', err);
    }
});


window.onload = function() {
    loadWeeks();
    loadTasks();
};


function loadWeeks() {
    let weekSelect = document.getElementById('weekSelect');
    Object.keys(scheduleData['STAT 252']).forEach(week => {
        let option = document.createElement('option');
        option.value = week;
        option.text = week;
        weekSelect.appendChild(option);
    });
}

function loadTasks() {
    let week = document.getElementById('weekSelect').value;
    let selectedClass = document.getElementById('classSelect').value;
    let tasksContainer = document.getElementById('tasksContainer');

    tasksContainer.innerHTML = '';  // Clear previous tasks

    let tasks = scheduleData[selectedClass][week];
    tasks.forEach(task => {
        let taskElement = document.createElement('div');
        taskElement.innerText = `${task.task} - ${task.person} (${task.date})`;
        tasksContainer.appendChild(taskElement);
    });
}
