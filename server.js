var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
const transporter = require('./utils/transporter');

app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/fonts", express.static(__dirname + "/fonts"));
app.use("/images", express.static(__dirname + "/images"));

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
app.use(bodyParser.json());

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/contact',function(req,res){
    const { email, fullName, message } = req.body;
    transporter.sendMail(
        {
            from : email,
            to : 'info@entergrate.org',
            subject : `Message from ${fullName}`,
            html: `<div>
                <p><h3>From : ${fullName}</h3></p>
                ${message}
            </div>`
        },
        (err, info) => {
            if (err) {
                console.log(err);
                return err
            } else {
                console.log({
                    success: `Message sent: ${info.response}`
                });
                return {success: `Message sent: ${info.response}`, res : res}
            }
        }
    );
});

app.listen(8080);