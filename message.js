var help = require('./util/help')
var calendar = require('./calendar/calendar');

module.exports = {
	load : LoadMessage
}

function LoadMessage(message){
	message.text = message.text.replace("<@U09PY7KGA>: ","")
	message.text = message.text.replace("<@U09PY7KGA>:","")
	message.text = message.text.replace("<@U09PY7KGA> ","")
	message.text = message.text.replace("<@U09PY7KGA>","")
	console.log("data:::"+message.text)
	return new Message(message)
}

function Message (message) {

    this.mText = ""

    if (message.text.indexOf("官網") > -1) this.mText = "http://erickson-makotoki.github.io/Image_Page/"

    if (message.text.indexOf("粉專") > -1 || message.text.indexOf("粉絲專頁") > -1) this.mText = "https://www.facebook.com/yzuitac?fref=ts"

    if (message.text.indexOf("email") > -1) this.mText = "itac.yzu.org@gmail.com"

    if (message.text.indexOf("ㄅㄌ") > -1) this.mText = "https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xfp1/v/t1.0-9/1904107_487099854762109_6487489188052627634_n.jpg?oh=98376335c9ea6f6de7cce4402d6a27b6&oe=5670731D&__gda__=1446340486_4e89cdf3de94634e65113c69b88404de"

    var command = message.text.split(' ');

    switch (command[0].toLowerCase()){

    	case "help": 
    		this.mText = help
    	        break;

	case "calendar":
            var mEvent = ""
            for (var i = 0; i < calendar.events.length; i++) {
                var event = calendar.events[i];
                var start = event.start.dateTime || event.start.date;
                mEvent = mEvent + '時間：'+start+' \n地點：'+event.location+' \n事件：'+ event.summary + '\n\n';
            }
            this.mText = mEvent
            break;

	case "echo":
            var say = message.text.split('echo ');
            this.mText = say[1]
            break;
    }


    this.SendMessage = function(callback){
	callback(this.mText)
    }
}
