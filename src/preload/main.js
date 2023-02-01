function keyLog() {
   console.log("Key: " + localStorage.getItem("credentials"));
}

function readFromJSON(file) {
   return JSON.parse(fs.readFileSync(file));
}

function writeToJSON(file, data) {
   fs.writeFileSync(file, JSON.stringify(data, null, 2), {
      encoding: 'utf-8',
      flag: 'w'
   });
   console.log(`Wrote ${data} to ${file}`);
}

module.exports = [
   keyLog, readFromJSON, writeToJSON
];