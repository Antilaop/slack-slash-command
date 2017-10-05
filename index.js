var express = require('express');

var http = require('http');

var server = express();
var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

server.post('/', upload.array(), function (req, res) {
    var regex = /T20\d{6}\.\d{4}/g;
    var regexArray = regex.exec(req.body.text);
    timeStamp = Math.round(new Date().getTime()/1000);
    if(regexArray){
        for(var i=0; j=regexArray.length,i<j; i++){
            var resData = {};
            var resAttachments = regexArray[i];
            resData[resAttachments] = [];

            var ticketLink = "https://ww4.autotask.net/Autotask/AutotaskExtend/ExecuteCommand.aspx?Code=OpenTicketDetail&TicketNumber=" + regexArray[i];
            
            var resAttachmentsData = {
                "fallback": "Required plain-text summary of the attachment.",
                "color": "#36a64f",
                "title": regexArray[i],
                "title_link": ticketLink,
                "footer": "Slack API",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
                "ts": timeStamp
            }

            resData[resAttachments].push(resAttachmentsData);
        }
        JSON.stringify(resData);
        res.status(200).json(resData);
    } else {
        res.status(200).json(
            {
                "response_type": "ephemeral",
                "text": "Sorry, that didn't work. Please try again."
            }
        );
    }    
});

var port = process.env.PORT || 1337;
server.listen(port);

