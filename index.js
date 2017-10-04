var express = require('express');

var http = require('http');

var server = express();
var bodyParser = require('body-parser');
//var multer = require('multer'); // v1.0.5
//var upload = multer(); // for parsing multipart/form-data

server.use(bodyParser.json()); // for parsing application/json
server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

/*
server.post('/', function (req, res) {
    res.status(200).json({ok: "true", "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]});
});*/

server.post('/', function (req, res) {
    res.contentType('application/json');
    console.log(req.body);
    res.status(200).json({ok: "true", text: "testki"});
});

server.post('/jee', function (req, res) {
    res.status(200).json({
        "attachments": [
            {
                "fallback": "Required plain-text summary of the attachment.",
                "color": "#36a64f",
                "title": "Slack API Documentation",
                "title_link": "https://api.slack.com/",
                "footer": "Slack API",
                "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
                "ts": 123456789
            }
        ]
    });
});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);


