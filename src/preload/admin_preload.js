const path = require('path');
const fs = require('fs');

// form.addEventListener('submit', (event) => {
//    event.preventDefault();
// });

function readFromJSON(file) {
    return JSON.parse(fs.readFileSync(file));
}

function writeToJSON(file, data) {
    fs.writeFileSync(path.join(__dirname, ('../database/' + file)), JSON.stringify(data, null, 2), {
        encoding: 'utf-8',
        flag: 'w'
    });
    console.log(`Wrote ${data} to ${file}`);
}

function displayJSON() {
    fetch(path.join(__dirname, '../database/events.json'))
        .then(function (response) {
            return response.json();
        })
        .then(function (events) {
            let placeholder = document.querySelector('.data__output');
            let output = '';
            for (event of events) {
                output += `
            <tr>
               <td>${event.event_name}</td>
               <td>${event.prize}</td>
               <td>${event.start_date}</td>
               <td>${event.end_date}</td>
               <td>
                  <div class="button__bar">
                     <input type="button" onclick="editEvent()" value="Edit">
                     <input type="button" onclick="deleteEvent()" value="Delete">
                  </div>
               </td>
            </tr>
         `
            }
            placeholder.innerHTML = output;

            placeholder = document.querySelector('.studentData__output');
            let users = readFromJSON(path.join(__dirname, '../database/users.json'));
            output = '';
            for (user of users) {
                output += `
            <tr>
               <td>${user.name}</td>
               <td>${user.username}</td>
               <td>${user.grade}</td>
               <td>${user.points}</td>
               <td>
                  <div class="button__bar">
                     <input type="button" onclick="editStudent()" value="Edit">
                     <input type="button" onclick="deleteStudent()" value="Delete">
                  </div>
               </td>
            </tr>
         `
            }
            placeholder.innerHTML = output;
        });
}

function editEvent() {

}

function deleteEvent() {

}

function createNewEvent() {
    let currentEvents = readFromJSON(path.join(__dirname, '../database/events.json'));
    let startDate = document.querySelector('.start__date').value;
    let endDate = document.querySelector('.end__date').value;
    if (endDate < startDate) {
        alert("End date is lower than start date");
        return;
    }
    startDate = startDate.split('-');
    endDate = endDate.split('-');
    startDate = `${startDate[1]}/${startDate[2]}/${startDate[0]}`;
    endDate = `${endDate[1]}/${endDate[2]}/${endDate[0]}`;
    console.log(startDate + " " + endDate);
    let eventTemplate = {
        "event_name": document.querySelector('.event__name').value,
        "prize": document.querySelector('.prize').value,
        "start_date": startDate,
        "end_date": endDate,
        "participants": []
    }
    currentEvents.push(eventTemplate);
    writeToJSON('events.json', currentEvents);
    displayJSON();
}

function addStudent() {
    let users = readFromJSON(path.join(__dirname, '../database/users.json'));
    let arr = [];
    for (i of users)
        arr.push(i.key);
    let keyToPush = [...Array(Math.max(...arr) + 1).keys()].filter(x => !arr.includes(x)).concat([Math.max(...arr) + 1])[0];
    users.push({
        "key": keyToPush,
        "name": document.querySelector('.student_name').value,
        "grade": document.querySelector('.student_grade').value,
        "points": 0,
        "prizes": [],
        "username": document.querySelector('.student_username').value,
        "password": "tmp:" + Math.random().toString(36).slice(2, 7),
        "admin": false
    });
    console.log(users);
    writeToJSON('users.json', users);
    displayJSON();
}

displayJSON();