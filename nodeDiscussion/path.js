const path = require("path");
const fs = require("fs");

// console.log(__dirname);
// const base = path.basename(__dirname);
// const newPath = path.join(__dirname,"public","abc","file.txt")
// console.log(newPath)  
// console.log(base)

// create a file

// fs.writeFile('file.txt','hello world',(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("file created")
// })

// // add content to the file
// fs.appendFile('file.txt',"some more text",(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("content added")
// })


// fs.mkdir("newDir",(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("folder created")
// })

// create another directory
// fs.mkdir(path.join(__dirname,"newDir2"),(err)=>{
//     if(err){
//         console.log(err)
//     }
//     console.log("folder created")
// })

// copy file from models folder in the current directory
const copyFrom = path.join(__dirname,"../","models","bookingModel.js")
const destpath = path.join(__dirname, 'bookingModelCopy.js')
fs.copyFile(copyFrom,destpath,(err)=>{
    if(err){
        console.log(err)
    }
    console.log("file copied")
})