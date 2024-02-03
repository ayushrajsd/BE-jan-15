const sgmail = require('@sendgrid/mail');
require('dotenv').config();
sgmail.setApiKey(process.env.SENDGRID_API);
const msg = {
    to:'deepakv3108@gmail.com',
    from:'jasbir.singh@scaler.com',
    subject:'Sending email with SendGrid is Fun',
    text:'and easy to do anywhere, even with Node.js',
    html:'<strong>and easy to do anywhere, even with Node.js</strong>'
}
sgmail.send(msg).then(()=>{
    console.log('Email sent');
})
.catch((error)=>{
    console.error(error);
})