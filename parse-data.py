# Sample code to read and process a file with tasks
import json

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
with open("tasks.txt", "r") as file:
    for line in file:
        task_data = parse_line(line)
        dates = expand_dates(task_data["frequency"], weekday_dates)
        for date in dates:
            tasks.append({
                "task": task_data["task"],
                "date": date,
                "person": task_data["person"],
                "class": task_data["class"]
            })

# Convert to JSON
json_data = json.dumps(tasks, indent=4)
print(json_data)
