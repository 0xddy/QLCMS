/**
 * this file will be loaded before server started
 * you can define global functions used in controllers, models, templates
 */
var mailer = require('nodemailer-promise');
var conf = think.config('web');
var sendEmail = mailer.config(conf.nodemailer);
/**
 * use global.xxx to define global functions
 *
 * global.fn1 = function(){
 *     
 * }
 */

global.getWebTitle = function () {

    return think.config('web').title;
};

global.isEmail = function (val) {
    let filter = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    return filter.test(val);
};


global.mailer = function (options) {

    return sendEmail(options).then(function (info) {
        return 1
    }).catch(function (e) {

        return 0;
    });

};

global.randomStr = function (length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var rand = "";
    for (var i = 0; i < length; i++) {
        var id = Math.ceil(Math.random() * 35);
        rand += chars[id];
    }
    return rand;
};

global.randomNumber = function (length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    var rand = "";
    for (var i = 0; i < length; i++) {
        var id = Math.ceil(Math.random() * 35);
        rand += chars[id];
    }
    return rand;
};

global.formatDuring = function (mss) {

    let days = mss / (60 * 60 * 24);
    let hours = (mss % ( 60 * 60 * 24)) / (60 * 60);
    let minutes = (mss % (60 * 60)) / (60);
    let seconds = (mss % (60));

    return parseInt(days) + '天 ' + parseInt(hours) + '小时 ' + parseInt(minutes) + '分 ' + seconds + '秒';
};

global.getPrintSize = function (size) {
//如果字节数少于1024，则直接以B为单位，否则先除于1024，后3位因太少无意义
    if (size < 1024) {
        return size + "B";
    } else {
        size = size / 1024;
    }
    //如果原字节数除于1024之后，少于1024，则可以直接以KB作为单位
    //因为还没有到达要使用另一个单位的时候
    //接下去以此类推
    if (size < 1024) {
        return size + "KB";
    } else {
        size = size / 1024;
    }
    if (size < 1024) {
        //因为如果以MB为单位的话，要保留最后1位小数，
        //因此，把此数乘以100之后再取余
        size = size * 100;
        return parseInt(size / 100) + "."
            + parseInt(size % 100) + "MB";
    } else {
        //否则如果要以GB为单位的，先除于1024再作同样的处理
        size = size * 100 / 1024;
        return parseInt(size / 100) + "."
            + parseInt(size % 100) + "GB";
    }
};
