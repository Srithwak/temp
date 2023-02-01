const path = require('path');
const fs = require('fs');
// const main = require('./main.js');
var currentKey = localStorage.getItem("credentials");
var user;
var users;

function keyLog() {
    users = readFromJSON('users.json')
    user = findObjWithKey(currentKey, 'users.json')
   console.log("Key: " + localStorage.getItem("credentials"));
}

function readFromJSON(file) {
   return JSON.parse(fs.readFileSync(path.join(__dirname, ('../database/' + file))));
}

function writeToJSON(file, data) {
   fs.writeFileSync(path.join(__dirname, ('../database/' + file)), JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
      flag: 'w'
   });
   console.log(`Wrote ${data} to ${file}`);
}

function findObjWithKey(key, file) {
   let objs = readFromJSON(file);
   for (i of objs)
      if (i.key == key)
         return i;
   return -1;
}

function findIndexWithKey(key, file) {
   let x = readFromJSON(file);
   for (let i = 0; i < x.length; i++) {
      if (x[i].key == key)
         return i;
   }
   return -1;
}

function checkForNewAccount() {
   user = findObjWithKey(currentKey, 'users.json');
   users = readFromJSON('users.json');
   console.log(users);
   //all tmp passwords have to start with 'tmp:'
   if (user.password.includes('tmp:'))
      console.log("temp password, click to change");
}

function pwdChange() {
   let pwd = document.querySelector('.pwdChange').value;
   user.password = pwd;
   users.splice(findIndexWithKey(currentKey, 'users.json'), 1);
   writeToJSON('users.json', users);
}

keyLog();
checkForNewAccount();

document.querySelector(".myHeading").innerHTML = user.name;
