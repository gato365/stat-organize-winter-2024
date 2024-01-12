async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Could not get JSON:', error);
        return null;
    }
}

async function loadTasks() {
    let scheduleData = await loadJSON('school_schedule.json'); // URL to your JSON file

    if (!scheduleData) {
        console.error('Failed to load schedule data.');
        return;
    }

    console.log('Schedule Data:', scheduleData); // Log the loaded data

    let week = document.getElementById('weekSelect').value;
    let selectedClass = document.getElementById('classSelect').value;

    console.log(`Loading tasks for ${selectedClass} on week ${week}`); // Log the class and week

    let tasksContainer = document.getElementById('tasksContainer');

    tasksContainer.innerHTML = '';  // Clear previous tasks

    let classSchedule = scheduleData[selectedClass];
    if (!classSchedule) {
        console.error(`No schedule data found for class ${selectedClass}`);
        return;
    }

    let tasks = classSchedule[week];
    if (tasks) {
        tasks.forEach(task => {
            let taskElement = document.createElement('div');
            taskElement.innerText = `${task.task} - ${task.person} (${task.date})`;
            tasksContainer.appendChild(taskElement);
        });
    } else {
        console.error(`No tasks found for class ${selectedClass} on week ${week}`);
    }
}

window.onload = async function() {
    await loadTasks();
};
