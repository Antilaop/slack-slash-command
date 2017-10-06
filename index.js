var express = require('express');

var https = require('https');

var server = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.post('/', upload.array(), function (req, res) {
    if (req.body.token == process.env.SLACK_TOKEN) {
        var regex = /T20\d{6}\.\d{4}/g;
        var regexArray = regex.exec(req.body.text);
        timeStamp = Math.round(new Date().getTime()/1000);
        if(regexArray){
            var ticketLink = "https://ww4.autotask.net/Autotask/AutotaskExtend/ExecuteCommand.aspx?Code=OpenTicketDetail&TicketNumber=" + regexArray[0];
            var resTitle = req.body.text.replace('-','');
            res.status(200).json({
                "response_type": "in_channel",
                "attachments": [
                    {
                        "fallback": resTitle,
                        "color": "#36a65f",
                        "title": resTitle,
                        "title_link": ticketLink,
                        "footer": "Kikkare",
                        "footer_icon": "http://icons.iconarchive.com/icons/iconsmind/outline/512/Geek-2-icon.png",
                        "ts": timeStamp
                    }
                ]
            });
        } else {
            res.status(200).json(
                {
                    "response_type": "ephemeral",
                    "text": "Sorry, that didn't work. \n Try: /ticket [TICKET_NUMBER] [TICKET DESCRIPTION]"
                }
            );
        }
    } else {
        res.status(401).json(
            {
                "response_type": "ephemeral",
                "text": "Authentication is required. Entero somewhere elso."
            }
        )
    }    
});

var port = process.env.PORT || 1337;
server.listen(port);

