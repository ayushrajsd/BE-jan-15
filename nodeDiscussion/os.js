const os = require('os');

console.log(os.arch());
console.log("freemem",os.freemem());
console.log("release",os.release());

console.log(os.networkInterfaces());