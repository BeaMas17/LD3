function changeColor() {
    document.body.style.backgroundColor = "lightgrey";
}

function addTask() {
    let input = document.getElementById("taskInput").value;
    let list = document.getElementById("taskList");

    let li = document.createElement("li");
    li.textContent = input;

    list.appendChild(li);
}

function loginUser() {
    alert("Prisijungimas sėkmingas (fake login)");
}

function registerUser() {
    alert("Registracija sėkminga (fake register)");
}

function toggleTasks() {
    let el = document.getElementById("tasks");
    el.style.display = (el.style.display === "none") ? "block" : "none";
}

function changeColor() {
    document.body.style.backgroundColor = "#e8f0fe";
}

function addTask() {
    let input = document.getElementById("taskInput").value;
    let list = document.getElementById("taskList");

    if (input === "") return;

    let li = document.createElement("li");
    li.textContent = input;

    list.appendChild(li);
}

function filterModule(type) {
    let text = document.getElementById("moduleInfo");

    if (type === "all") {
        text.textContent = "Rodomi visi moduliai.";
    } else if (type === "programavimas") {
        text.textContent = "Filtruota: Programavimas.";
    } else if (type === "matematika") {
        text.textContent = "Filtruota: Matematika.";
    }
}

function logout() {
    window.location.href = "index.html";
}

function loginUser() {
    let username = document.querySelector('input[type="username"]').value;
    let password = document.querySelector('input[type="password"]').value;

    if (username === "" || password === "") {
        alert("Būtina užpildyti visus laukus");
        return;
    }

    window.location.href = "dashboard.html";
}

function registerUser() {
    let inputs = document.querySelectorAll("input");

    let name = inputs[0].value;
    let surname = inputs[1].value;
    let email = inputs[2].value;
    let password = inputs[3].value;

    if (name === "" || surname === "" || email === "" || password === "") {
        alert("Būtina užpildyti visus laukus");
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        alert("Neteisingas el. pašto formatas!");
        return;
    }

    if (password.length < 8) {
        alert("Slaptažodis turi būti sudarytas iš ne mažiau kaip 8 simbolių");
        return;
    }

    window.location.href = "dashboard.html";
}

function showSection(section, btn) {

    let sections = document.querySelectorAll(".user-section, .user-row, #main, #tasks, #lectures");
    sections.forEach(el => el.classList.add("hidden"));

    let activeSection = document.getElementById(section);
    if (activeSection) {
        activeSection.classList.remove("hidden");
    }

    let buttons = document.querySelectorAll(".user-sidebar button, .dashboard-sidebar button");
    buttons.forEach(b => b.classList.remove("active-btn"));

    if (btn) {
        btn.classList.add("active-btn");
    }
}

function changePassword() {
    let oldPass = document.getElementById("oldPassword").value;
    let newPass = document.getElementById("newPassword").value;

    if (oldPass === "" || newPass === "") {
        alert("Būtina užpildyti visus laukus");
        return;
    }

    if (newPass.length < 8) {
        alert("Slaptažodis turi būti sudarytas iš ne mažiau kaip 8 simbolių");
        return;
    }

    if (oldPass === newPass) {
        alert("Naujas slaptažodis negali būti toks pats kaip senas");
        return;
    }

    alert("Slaptažodis sėkmingai pakeistas");
}

function openLectureForm() {
    document.getElementById("lectureForm").classList.remove("hidden");
}

function closeLectureForm() {
    document.getElementById("lectureForm").classList.add("hidden");
}

function saveLecture() {
    let title = document.getElementById("lecTitle").value;
    let module = document.getElementById("lecModule").value;
    let type = document.getElementById("lecType").value;
    let required = document.getElementById("lecRequired").checked ? "Taip" : "Ne";

    let rows = document.querySelectorAll(".weekday-row");
    let schedule = [];

    rows.forEach(row => {
        let checkbox = row.querySelector(".weekday");
        let start = row.querySelector(".start-time");
        let end = row.querySelector(".end-time");
        let day = row.querySelector(".day-name").textContent;

        if (checkbox.checked && start.value && end.value) {
            schedule.push(`${day} ${start.value} - ${end.value}`);
        }
    });

    let table = document.getElementById("lectureTable");

    let newRow = table.insertRow();
    newRow.innerHTML = `
        <td>${title}</td>
        <td>${module}</td>
        <td>${type}</td>
        <td>${required}</td>
        <td>${schedule.join("<br>")}</td>
        <td>
        <button class="delete-btn" onclick="deleteLecture(this)">
            <img src="C:/Users/Vartotojas/Documents/VDU/6 semestras/Interneto technologijos/3 laboratorinis/Images/trash.png" alt="Delete" />
        </button>
    </td>
    `;

    // reset
    document.getElementById("lecTitle").value = "";
    document.getElementById("lecModule").selectedIndex = 0;
    document.getElementById("lecType").selectedIndex = 0;
    document.getElementById("lecRequired").checked = false;

    rows.forEach(row => {
        let checkbox = row.querySelector(".weekday");
        let start = row.querySelector(".start-time");
        let end = row.querySelector(".end-time");

        checkbox.checked = false;

        start.value = "";
        end.value = "";

        start.classList.add("hidden");
        end.classList.add("hidden");
    });

    closeLectureForm();
    updateLecturePreview();
    renderCalendar();
}

function toggleDayTime(checkbox) {
    let row = checkbox.parentElement;

    let start = row.querySelector(".start-time");
    let end = row.querySelector(".end-time");

    if (checkbox.checked) {
        start.classList.remove("hidden");
        end.classList.remove("hidden");
    } else {
        start.classList.add("hidden");
        end.classList.add("hidden");

        start.value = "";
        end.value = "";
    }
}

function deleteLecture(btn) {
    let row = btn.closest("tr");
    row.remove();
}

function openTaskForm() {
    document.getElementById("taskForm").classList.remove("hidden");
}

function closeTaskForm() {
    document.getElementById("taskForm").classList.add("hidden");
}

function saveTask() {
    let title = document.getElementById("taskTitle").value;
    let module = document.getElementById("taskModule").value;
    let date = document.getElementById("taskDate").value;
    let time = document.getElementById("taskTime").value;

    if (title === "" || date === "" || time === "") {
        alert("Užpildyk visus laukus");
        return;
    }

    let types = [];
    document.querySelectorAll(".task-type:checked").forEach(el => {
        types.push(el.value);
    });

    let deadline = `${date} ${time}`;
    let table = document.getElementById("taskTable");

    let newRow = table.insertRow();

    newRow.dataset.module = module;

    newRow.innerHTML = `
        <td>${title}</td>
        <td>${module}</td>
        <td>${types.join(", ")}</td>
        <td>${deadline}</td>

        <td class="status-cell">
            <label><input type="checkbox" onchange="setStatus(this, 'red')"> Nepradėta</label><br>
            <label><input type="checkbox" onchange="setStatus(this, 'yellow')"> Vykdoma</label><br>
            <label><input type="checkbox" onchange="setStatus(this, 'green')"> Padaryta</label>
        </td>
        <td>
            <button class="delete-btn" onclick="deleteTask(this)">
                <img src="Images/trash.png" alt="Delete">
            </button>
        </td>
        
    `;

    document.getElementById("taskTitle").value = "";
    document.getElementById("taskModule").selectedIndex = 0;
    document.getElementById("taskDate").value = "";
    document.getElementById("taskTime").value = "";

    document.querySelectorAll(".task-type").forEach(el => {
        el.checked = false;
    });

    closeTaskForm();
    updateTaskPreview();
    renderCalendar();
}

function deleteTask(btn) {
    let row = btn.closest("tr");
    row.remove();
    updateTaskPreview();
    renderCalendar();
}

function setStatus(checkbox, color) {
    let cell = checkbox.closest(".status-cell");

    cell.querySelectorAll("input[type='checkbox']").forEach(cb => {
        if (cb !== checkbox) cb.checked = false;
    });

    if (!checkbox.checked) {
        cell.style.backgroundColor = "";
        cell.dataset.status = "";
        return;
    }

    if (color === "red") {
        cell.style.backgroundColor = "#ec796d";
        cell.dataset.status = "Nepradėta";
    }
    else if (color === "yellow") {
        cell.style.backgroundColor = "#ebd16a";
        cell.dataset.status = "Vykdoma";
    }
    else if (color === "green") {
        cell.style.backgroundColor = "#59d570";
        cell.dataset.status = "Padaryta";
    }

    updateTaskPreview();
    renderCalendar();
}

let currentDate = new Date();

function renderCalendar() {
    let calendar = document.getElementById("calendar");
    let title = document.getElementById("calendarTitle");

    calendar.innerHTML = "";

    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();

    let monthNames = [
        "Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis",
        "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"
    ];

    title.textContent = `${monthNames[month]} ${year}`;

    let days = ["Pr", "An", "Tr", "Ke", "Pe", "Še", "Se"];
    days.forEach(d => {
        let div = document.createElement("div");
        div.textContent = d;
        div.classList.add("calendar-day", "header");
        calendar.appendChild(div);
    });

    let firstDay = new Date(year, month, 1).getDay();
    if (firstDay === 0) firstDay = 7;

    let daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i < firstDay; i++) {
        calendar.appendChild(document.createElement("div"));
    }

    let today = new Date();

    let eventsMap = getCalendarEventsMap(year, month);

    for (let d = 1; d <= daysInMonth; d++) {

        let div = document.createElement("div");
        div.classList.add("calendar-day");

        div.innerHTML = `<div>${d}</div>`;

        let key = `${year}-${month}-${d}`;
        let data = eventsMap[key];

        if (data) {
            let icons = "";

            for (let i = 0; i < data.task; i++) {
                icons += `<img src="Images/pen.png" class="cal-icon">`;
            }

            for (let i = 0; i < data.lecture; i++) {
                icons += `<img src="Images/hat.png" class="cal-icon">`;
            }

            div.innerHTML += `<div class="cal-icons">${icons}</div>`;
        }

        if (
            d === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            div.classList.add("today");
        }

        div.onclick = () => showDayInfo(year, month, d);

        calendar.appendChild(div);
    }
}

function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

document.addEventListener("DOMContentLoaded", renderCalendar);

function showDayInfo(year, month, day) {
    let infoBox = document.getElementById("dayInfo");
    let title = document.getElementById("selectedDate");
    let content = document.getElementById("dayContent");

    let date = new Date(year, month, day);

    let formatted =
        day + " " +
        ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis",
            "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"][month] +
        " " + year;

    title.textContent = formatted;

    let items = [];

    // uzduotys
    document.querySelectorAll("#taskTable tr:not(:first-child)").forEach(row => {
        let cols = row.querySelectorAll("td");

        let title = cols[0].innerText;
        let deadline = cols[3].innerText; // YYYY-MM-DD HH:mm

        if (!deadline) return;

        let [d, t] = deadline.split(" ");
        if (!d || !t) return;

        let taskDate = new Date(d);

        if (
            taskDate.getFullYear() === year &&
            taskDate.getMonth() === month &&
            taskDate.getDate() === day
        ) {
            items.push({
                type: "task",
                icon: "pen",
                title,
                time: t
            });
        }
    });

    //paskaitos
    document.querySelectorAll("#lectureTable tr:not(:first-child)").forEach(row => {
        let cols = row.querySelectorAll("td");

        let title = cols[0].innerText;
        let schedule = cols[4].innerHTML;
        schedule.split("<br>")

        if (!schedule) return;

        schedule.split("<br>").forEach(line => {
            let parts = line.split(" ");
            let dayName = parts[0];
            let timeRange = parts.slice(1).join(" ");
            let startTime = timeRange.split("-")[0].trim();

            let jsDay = date.getDay();
            let dayMap = {
                1: "Pirmadienis",
                2: "Antradienis",
                3: "Trečiadienis",
                4: "Ketvirtadienis",
                5: "Penktadienis",
                6: "Šeštadienis",
                0: "Sekmadienis"
            };

            if (dayMap[jsDay] === dayName) {
                items.push({
                    type: "lecture",
                    icon: "hat",
                    title,
                    time: startTime
                });
            }
        });
    });

    items.sort((a, b) => a.time.localeCompare(b.time));

    if (items.length === 0) {
        content.innerHTML = "Šią dieną įrašų nėra";
    } else {
        const iconMap = {
            task: "Images/pen.png",
            lecture: "Images/hat.png"
        };

        content.innerHTML = items
            .map(i => `
        <div>
            ${i.time} —
            <img src="${iconMap[i.type]}" class="mini-icon">
            ${i.title}
        </div>
    `)
            .join("");
    }

    infoBox.classList.remove("hidden");
}

function closeDayInfo() {
    document.getElementById("dayInfo").classList.add("hidden");
}

function updateTaskPreview() {
    let mainTable = document.getElementById("taskTablePreview");

    mainTable.innerHTML = `
        <tr>
            <th>Pavadinimas</th>
            <th>Modulis</th>
            <th>Tipas</th>
            <th>Atlikti iki</th>
            <th>Būsena</th>
        </tr>
    `;

    let rows = document.querySelectorAll("#taskTable tr:not(:first-child)");

    rows.forEach(row => {
        let cols = row.querySelectorAll("td");

        let title = cols[0].innerHTML;
        let module = cols[1].innerHTML;
        let type = cols[2].innerHTML;
        let deadline = cols[3].innerHTML;

        let statusCell = cols[4];
        let statusText = statusCell.dataset.status || "—";

        if (statusText === "—") {
            if (statusCell.style.backgroundColor.includes("ec796d")) statusText = "Nepradėta";
            else if (statusCell.style.backgroundColor.includes("ebd16a")) statusText = "Vykdoma";
            else if (statusCell.style.backgroundColor.includes("59d570")) statusText = "Padaryta";
        }

        let statusClass = "";
        if (statusText === "Nepradėta") statusClass = "status-red";
        else if (statusText === "Vykdoma") statusClass = "status-yellow";
        else if (statusText === "Padaryta") statusClass = "status-green";

        let newRow = mainTable.insertRow();

        newRow.innerHTML = `
            <td>${title}</td>
            <td>${module}</td>
            <td>${type}</td>
            <td>${deadline}</td>
            <td class="${statusClass}">${statusText}</td>
        `;
    });
}

function updateLecturePreview() {
    let mainTable = document.getElementById("lectureTablePreview");

    mainTable.innerHTML = `
        <tr>
            <th>Pavadinimas</th>
            <th>Modulis</th>
            <th>Tipas</th>
            <th>Privaloma</th>
            <th>Laikas</th>
        </tr>
    `;

    let rows = document.querySelectorAll("#lectureTable tr:not(:first-child)");

    rows.forEach(row => {
        let cols = row.querySelectorAll("td");

        let newRow = mainTable.insertRow();
        newRow.innerHTML = `
            <td>${cols[0].innerHTML}</td>
            <td>${cols[1].innerHTML}</td>
            <td>${cols[2].innerHTML}</td>
            <td>${cols[3].innerHTML}</td>
            <td>${cols[4].innerHTML}</td>
        `;
    });
}

document.addEventListener("DOMContentLoaded", () => {
    renderCalendar();
    updateTaskPreview();
    updateLecturePreview();
});

function getCalendarEventsMap(year, month) {
    let map = {};

    function add(key, type) {
        if (!map[key]) {
            map[key] = { task: 0, lecture: 0 };
        }
        map[key][type]++;
    }

    //uzduotys
    document.querySelectorAll("#taskTable tr:not(:first-child)").forEach(row => {
        let cols = row.querySelectorAll("td");

        let deadline = cols[3]?.innerText;
        if (!deadline) return;

        let [datePart] = deadline.split(" ");
        let d = new Date(datePart);

        if (
            d.getFullYear() === year &&
            d.getMonth() === month
        ) {
            let key = `${year}-${month}-${d.getDate()}`;
            add(key, "task");
        }
    });

    //paskaitos
    document.querySelectorAll("#lectureTable tr:not(:first-child)").forEach(row => {
        let cols = row.querySelectorAll("td");
        let schedule = cols[4]?.innerHTML;
        schedule.split("<br>")

        if (!schedule) return;

        schedule.split("<br>").forEach(line => {
            let parts = line.split(" ");
            let dayName = parts[0];

            let jsDay = new Date(year, month, 1).getDay();
            let dayMap = {
                1: "Pirmadienis",
                2: "Antradienis",
                3: "Trečiadienis",
                4: "Ketvirtadienis",
                5: "Penktadienis",
                6: "Šeštadienis",
                0: "Sekmadienis"
            };

            for (let d = 1; d <= 31; d++) {
                let testDate = new Date(year, month, d);
                if (testDate.getMonth() !== month) continue;

                if (dayMap[testDate.getDay()] === dayName) {
                    let key = `${year}-${month}-${d}`;
                    add(key, "lecture");
                }
            }
        });
    });

    return map;
}
