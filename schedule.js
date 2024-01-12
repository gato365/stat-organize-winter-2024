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
    let scheduleData = await loadJSON('tasks-winter-2024.json');



    if (!scheduleData) {
        console.error('Failed to load schedule data.');
        return;
    }

    let week = document.getElementById('weekSelect').value;
    let selectedClass = document.getElementById('classSelect').value;
    let tasksTable = document.getElementById('tasksTable').getElementsByTagName('tbody')[0];



    tasksTable.innerHTML = '';  // Clear previous tasks

    //  Prints the first date in the scheduleData array
    console.log(week)
    console.log(scheduleData[0].date.startsWith(week))
    console.log(scheduleData[0].date)


    scheduleData.forEach(task => {
        if ( task.class === selectedClass) {
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