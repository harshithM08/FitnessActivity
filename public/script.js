let activities = JSON.parse(localStorage.getItem("activities")) || [];

const form = document.getElementById("activityForm");
const activityList = document.getElementById("activityList");

function saveActivities() {
    localStorage.setItem("activities", JSON.stringify(activities));
}

function displayActivities() {
    activityList.innerHTML = "";

    let minutes = 0;
    let calories = 0;

    activities.forEach(function(item, index) {
        minutes += item.duration;
        calories += item.calories;

        const row = document.createElement("tr");

        [item.activity, item.type, item.duration, item.calories]
            .forEach(function(value) {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            activities.splice(index, 1);
            saveActivities();
            displayActivities();
        });

        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);
        activityList.appendChild(row);
    });

    document.getElementById("totalActivities").textContent =
        activities.length;

    document.getElementById("totalMinutes").textContent = minutes;

    document.getElementById("totalCalories").textContent = calories;

    document.getElementById("emptyMessage").style.display =
        activities.length === 0 ? "block" : "none";
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const activity = document.getElementById("activity").value.trim();
    const type = document.getElementById("type").value;
    const duration = Number(document.getElementById("duration").value);
    const calories = Number(document.getElementById("calories").value);

    if (!activity || duration <= 0 || calories < 0 ||
        !Number.isFinite(duration) || !Number.isFinite(calories)) {
        alert("Please enter valid activity details.");
        return;
    }

    activities.push({
        activity: activity,
        type: type,
        duration: duration,
        calories: calories
    });

    saveActivities();
    displayActivities();
    form.reset();
});

displayActivities();
