# Sample code to read and process a file with tasks
import json
import re
from datetime import datetime


sundays = ["2024-01-14", "2024-01-21", "2024-01-28", "2024-02-04", "2024-02-11", "2024-02-18", "2024-02-25", "2024-03-03", "2024-03-10", "2024-03-17"]
saturdays = ["2024-01-13", "2024-01-20", "2024-01-27", "2024-02-03", "2024-02-10", "2024-02-17", "2024-02-24", "2024-03-02", "2024-03-09", "2024-03-16", "2024-03-23"]
tuesdays = ["2024-01-09", "2024-01-16", "2024-01-23", "2024-01-30", "2024-02-06", "2024-02-13", "2024-02-20", "2024-02-27", "2024-03-05", "2024-03-12", "2024-03-19"]
thursdays = ["2024-01-11", "2024-01-18", "2024-01-25", "2024-02-01", "2024-02-08", "2024-02-15", "2024-02-22", "2024-02-29", "2024-03-07", "2024-03-14", "2024-03-21"]

def parse_line(line):
    parts = line.strip().split(" - ")
    if len(parts) != 4:
        raise ValueError(f"Invalid line format: {line}")
    return {
        "task": parts[0],
        "frequency": parts[1],
        "person": parts[2],
        "class": parts[3]
    }

def expand_dates(frequency, weekday_dates):
    if frequency.startswith("Every"):
        day_of_week = frequency.split()[1]
        return weekday_dates[day_of_week]
    else:
        # Process for specific dates if needed
        return []

# Define the weekday dates
weekday_dates = {
    "Sunday": sundays,
    "Saturday": saturdays,
    "Tuesday": tuesdays,
    "Thursday": thursdays
}

# Read the file and process each line
tasks = []
with open("STAT_Duties_brainstorm.md", "r") as file:
    for line in file:
        task_data = parse_line(line)
        
        dates = expand_dates(task_data["frequency"], weekday_dates)
        if dates:  # Check if dates is not empty
            for date in dates:
                tasks.append({
                    "task": task_data["task"],
                    "date": date,
                    "person": task_data["person"],
                    "class": task_data["class"]
                })
        else:  # If dates is empty
            # Extract date from task description
            match = re.search(r'\[(.*?)\]', task_data["frequency"])
            if match:
                date_str = match.group(1)
                # Convert date to "YYYY-MM-DD" format
                date = datetime.strptime(date_str, "%m/%d/%Y").strftime("%Y-%m-%d")
                tasks.append({
                "task": task_data["task"],
                "date": date,  # Set date to extracted date
                "person": task_data["person"],
                "class": task_data["class"]
                })
            else:
                raise ValueError(f"Invalid line format: {line}")

# Convert to JSON
json_data = json.dumps(tasks, indent=4)


num_entries = len(tasks)
print(f'Number of entries: {num_entries}')


## Write to file
with open("tasks-winter-2024.json", "w") as file:
    file.write(json_data)