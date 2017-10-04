var express = require('express');

var http = require('http');

var server = express();

server.post('/', function (req, res) {
    res.status(200).json({ok: "true"});
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


