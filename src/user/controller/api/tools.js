/**
 * Created by admin on 2017/5/10.
 */


'use strict';

import Base from '../base.js';


export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async emailAction() {

        if (!this._checkTime()) {

            return this.fail(233, '邮件发送太快了');
        }
        let email = this.post('email');
        if (!isEmail(email)) {
            return this.fail(233, "邮箱格式不正确");
        }

        let vfCode = randomNumber(6);
        console.log('发送验证码：' + vfCode);
        var options = {
            subject: '找回密码-' + getWebTitle(),
            senderName: getWebTitle(),
            receiver: '1121744186@qq.com',
            html: '<h1>你好你的验证码是： <span style="color:red;">' + vfCode + '</span></h1>'
        };


        let ret = await mailer(options);

        if (ret == 1) {
            await this.session('sendTime', new Date().getTime());
            await this.session('vfCode', email + '##' + vfCode);
            this.success('发送成功');
        } else {
            console.log(ret)
            this.fail(234, '发送失败');
        }
    }

    async passwordAction() {
        if (!this.isPost()) {
            return this.fail(234, 'This url does not allow get');
        }
        let email = this.post('email');
        let newPassword = this.post('password');
        let vfCode = this.post('code');
        if (think.isEmpty(email) || think.isEmpty(newPassword) || think.isEmpty(vfCode)) {
            return this.fail(233, '数据格式不正确');
        }

        let sessionData = await this.session('vfCode');
        if(sessionData==undefined){
            return this.fail(233, 'session为空');
        }

        let _dataArr = sessionData.split('##');
        if (think.isEmpty(_dataArr) || _dataArr.length != 2) {
            return this.fail(233, 'session中验证码格式不正确，此错误理论上不应该出现。');
        }
        let email_s = _dataArr[0];
        let vfCode_s = _dataArr[1];
        if (email_s == email && vfCode == vfCode_s) {
            // 数据全部验证完毕
            let user = this.model('user');
            let affectedRows = await user.updateUser({email: email}, {
                pwd: think.md5(newPassword),
                token: randomStr(22)//随机新的token
            });
            if (affectedRows == 1) {
                await this.session('vfCode','0##0');
                return this.success('更新密码成功');
            } else {
                return this.fail(235, '更新失败，可能是没有符合条件的数据');
            }

        } else {
            return this.fail(233, '验证失败,验证码不正确。');
        }
    }


    async _checkTime() {
        let difference = 1000 * 60;//条件间隔一分钟
        let lastSendTime = await this.session('sendTime');


        if (think.isEmpty(lastSendTime)) {

            return true;
        }
        let nowTime = new Date().getTime();

        if (nowTime - lastSendTime < difference) {
            return false;
        }
        return true;

    }

}