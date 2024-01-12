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

function getWeekRange(selectedDate) {
    const startDate = new Date(selectedDate);
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6); // Add 6 days to get the end date of the week

    return { startDate, endDate };
}

async function loadTasks() {
    let scheduleData = await loadJSON('tasks-winter-2024.json');

    if (!scheduleData) {
        console.error('Failed to load schedule data.');
        return;
    }

    let week = document.getElementById('weekSelect').value;
    let selectedClass = document.getElementById('classSelect').value;
    let tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];

    tasksTable.innerHTML = ''; // Clear previous tasks

    let { startDate, endDate } = getWeekRange(week);

    scheduleData.forEach(task => {
        let taskDate = new Date(task.date);
        if (taskDate >= startDate && taskDate <= endDate && task.class === selectedClass) {
            let row = tasksTable.insertRow();

            let toggleCell = row.insertCell(0);
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'task-toggle';
            checkbox.id = 'task-' + task.task.replace(/\s+/g, '-').toLowerCase() + '-' + task.date;
            toggleCell.appendChild(checkbox);

            let taskCell = row.insertCell(1);
            taskCell.textContent = task.task;

            let dateCell = row.insertCell(2);
            dateCell.textContent = task.date;

            let personCell = row.insertCell(3);
            personCell.textContent = task.person;
        }
    });
}

// ... rest of your JavaScript code ...


window.onload = async function () {
    await loadTasks();
};