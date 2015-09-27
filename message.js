var help = require('./util/help')
var user = require('./util/user')
var calendar = require('./calendar/calendar');
var week = ['(日)','(一)','(二)','(三)','(四)','(五)','(六)']
module.exports = {
	load : LoadMessage
}

function LoadMessage(message){
	message.text = message.text.replace("<@U09PY7KGA>: ","")
	message.text = message.text.replace("<@U09PY7KGA>:","")
	message.text = message.text.replace("<@U09PY7KGA> ","")
	message.text = message.text.replace("<@U09PY7KGA>","")
	return new Message(message)
}

function Message (message) {

    this.mText = ""

    if (message.text.indexOf("官網") > -1) this.mText = "http://erickson-makotoki.github.io/Image_Page/"

    if (message.text.indexOf("粉專") > -1 || message.text.indexOf("粉絲專頁") > -1) this.mText = "https://www.facebook.com/yzuitac?fref=ts"

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
                var startDate = new Date(event.start.dateTime || event.start.date)
                var month = startDate.getMonth() + 1
                var day = startDate.getDate()
                var hour = startDate.getHours()
                var minutes = startDate.getMinutes()
                var iDays  =  parseInt(Math.abs(startDate  -  new Date())  /  1000  /  60  /  60  /24)
				var location = event.location
				if(location == undefined){
					location = "尚未決定"
				}
                mEvent = mEvent + '時間：' + month + '月' + day + '日' + week[startDate.getDay()] + '  ' + hour + '點' + minutes + '分  ' +'*剩下'+ iDays + '天*'
                    +' \n地點：'+location+' \n事件：'+ event.summary + '\n\n';
            }
            this.mText = mEvent
            break;

	    case "echo":
            var say = message.text.split('echo ');
            this.mText = say[1]
            break;
        case "whoami":
            var username = message.text.split('whoami ')
            if(username[1] == "steven5538"){
                this.mText = "不要問，你會怕"
            } else if(username == undefined || user[username[1]] == undefined){
                this.mText = "查無此人"
            } else {
                this.mText = username[1] + "是" + user[username[1]]
            }
            break;
    }


    this.SendMessage = function(callback){
	callback(this.mText)
    }
}
