const path = require("path");
const fs = require("fs");

const filePath = path.join(__dirname, "bigFile.txt")
console.log(filePath)
const readableStream = fs.createReadStream(filePath);
readableStream.on("data", (chunk) => {
    console.log(`Received ${chunk.length} bytes of data.`);
})

readableStream.on("end", () => {
    console.log("file reading completed")
})