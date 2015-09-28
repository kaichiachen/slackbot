var token = require('./util/token');
var slackMessage = require('./message')
var slackAPI = require('slackbotapi');

// Starting
var slack = new slackAPI({
    'token': token.botuser,
    'logging': true
});

// Slack on EVENT message, send data.
slack.on('message', function(data) {
    var channel = data.channel
    console.log(data)
    if(data.text.indexOf("<@U09PY7KGA>") > -1){
        var message = slackMessage.load({
            text: data.text,
            user: slack.getUser(data.user).name
        })
        message.SendMessage(function(data){
            slack.sendMsg(channel, data)
        })
    } else {
        var message = data.text.split(' echo ')
        if(message[0] != undefined && message[1] != undefined){
            message[0] = message[0].trim()
            console.log(message[0].substr(2,message[0].length-3))
            slack.sendMsg(message[0].substr(2,message[0].length-3), message[1].trim())
        }
    }
});
