let formattedDate;
function printDate(){
    let today = new Date();
    let day = String(today.getDate()).padStart(2, '0');
    let month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = String(today.getFullYear()).slice(-2); // Get last two digits of year
    
    formattedDate = `${day}/${month}/${year}`;

    document.getElementsByClassName("date")[0].textContent = "Date: " + formattedDate;
}
window.onload = printDate;
function printTable(event) {
    event.preventDefault(); // Prevent page refresh

    let x = document.getElementById("studentCount").value;
    x = parseInt(x); // Ensure it's a number
    if (isNaN(x) || x <= 0) {
        alert("Please enter a valid number of students.");
        return;
    }

    let tableContainer = document.getElementById("tableContainer");
    tableContainer.innerHTML = ""; // Clear previous table if any

    let table = document.createElement("table");
    table.border = "1";
    table.style.marginTop = "20px";
    table.style.borderCollapse = "collapse";

            // Create table header
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");

    let th1 = document.createElement("th");
    th1.textContent = "Roll No.";
    let th2 = document.createElement("th");
    th2.textContent = "Mark Attendance"; // Updated column heading

    headerRow.appendChild(th1);
    headerRow.appendChild(th2);
    thead.appendChild(headerRow);
    table.appendChild(thead);

            // Create table body
    let tbody = document.createElement("tbody");
    for (let i = 1; i <= x; i++) {
        let row = document.createElement("tr");

        let cell1 = document.createElement("td");
        cell1.textContent = i;

        let cell2 = document.createElement("td");
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "attendance";
        checkbox.value = i;
        cell2.appendChild(checkbox);

        row.appendChild(cell1);
        row.appendChild(cell2);
        tbody.appendChild(row);

    }
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    document.getElementById("AttendanceSelect").style.marginTop = "10px";
    document.getElementById("AttendanceSelect").style.display = "flex";
    document.getElementById("AttendanceSelect").style.gap = "20px";
}
function recordAttendance() {
    let checkboxes = document.querySelectorAll('input[name="attendance"]');
    let presentStudents = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value); // Get checked values
    
    let allStudents = Array.from(checkboxes).map(checkbox => checkbox.value); // Get all student names
    let absentStudents = allStudents.filter(student => !presentStudents.includes(student)); // Determine absent students
    
    let attendanceList = document.getElementById("attendanceList");

    if (document.getElementById("attendanceType").value == "Present") {
        if (presentStudents.length > 0) {
            attendanceList.innerHTML = `<strong>Attendance - ${formattedDate}</strong><br>
                                        <strong>Section: IoT</strong><br>
                                        <strong>Presents:</strong> ${presentStudents.join(", ")}`;
        } else {
            attendanceList.textContent = "No students are marked present.";
        }
    } else if (document.getElementById("attendanceType").value == "Absent") {
        if (absentStudents.length > 0) {
            attendanceList.innerHTML = `<strong>Attendance - ${formattedDate}</strong><br>
                                        <strong>Section: IoT</strong><br>
                                        <strong>Absents:</strong> ${absentStudents.join(", ")}`;
        } else {
            attendanceList.textContent = "No students are marked absent.";
        }
    }
}

