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
    }
});
