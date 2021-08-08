const nodemailer = require('nodemailer');// i use node mailer to send the emails
var express = require('express');// import express
var app = express();
var port = process.env.PORT || 3000;// set the port
//set the oauth values ehich is obtained from the auoth screen in the google developer platform
var auth = {
    type: 'oauth2',
    user: '',// my gmail
    clientId: '',// client id (these all detials obtained from the oauth screen)
    clientSecret: '', // client secret
    refreshToken: '',// refresh token
};
app.use(express.json());// to use json ehich comming from post man

// make a post req  to use the postman jason data
  app.post('/send', function(req, res){
    response = {
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    }
    
    // mail details  and message detials 
    var mailOptions = {
        from: req.body.name,
        to: 'sender mail',
        subject: 'My site contact from: ' + req.body.name,
        text: req.body.message,
        html: 'Message from: ' + req.body.name + '<br></br> Email: ' +  req.body.email + '<br></br> Message: ' + req.body.message,
    };
  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: auth,
    });
  transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            return console.log(err);
        } else {
            console.log(JSON.stringify(res));
        }
    });
  })
  // start the server

app.listen(port,()=>{
    console.log(`connection is live on the port ${port}`);
})