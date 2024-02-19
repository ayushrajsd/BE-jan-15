const bcrypt = require('bcrypt');

const password = 'Ayush@123';

async function hashPassword(password){
    console.time("time taken")
   const salt = await bcrypt.genSalt(14); 
   console.log("Salt: ", salt);
   const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed Password: ", hashedPassword);
    console.timeEnd("time taken");
    const isMatching = await bcrypt.compare(password, hashedPassword);
    console.log("Is Matching: ", isMatching);
    return hashedPassword;
}

hashPassword(password);