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
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.textContent = task.task;
            cell2.textContent = task.date;
            cell3.textContent = task.person;
        }
    });
}

window.onload = async function () {
    await loadTasks();
};