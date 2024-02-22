// console.log(global)
// console.log("dir name", __dirname, "file name", __filename)
// console.log(process.moduleLoadList)
console.log("this", this);
const fs = require("fs");
const path = require("path");

/**
 * copy a large file
 */

// const content = Math.random().toString(36).repeat(10000000)
// fs.writeFileSync("bigFile.txt", content)

const http = require("http");
const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  // fs.readFile("./bigFile.txt",(err,data)=>{
  //     if(err){
  //         console.log(err)
  //     }
  //     res.end(data)
  const src = fs.createReadStream("./bigFile.txt");
  src.pipe(res);
  })
//   const filePath = path.join(__dirname, "bigFile.txt");
//   console.log(filePath);
//   const readableStream = fs.createReadStream(filePath);
//   const writeableStream = fs.createWriteStream("copyOfBigFile.txt");
// //   readableStream.on("data", (chunk) => {
// //     console.log(`Received ${chunk.length} bytes of data.`);
// //     writeableStream.write(chunk);
// //   });
// readableStream.pipe(writeableStream);

//   readableStream.on("end", () => {
//     writeableStream.end();
//     console.log("file reading completed");
//   });
// });

server.listen(3000, () => {
  console.log("server started now");
});
