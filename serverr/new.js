const fs = require("fs")
const reads= fs.readFileSync("file.json","utf-8")
reads = JSON.parse(reads)
console.log(reads)