'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
    /**
     * index action logic
     * @return {} []
     */
    indexAction() {

        if (!this.isPost()) {
            //不允许GET请求
            return this.fail(234, '只接受POST请求')
        }

        let email = this.post('email');
        let password = this.post('password');

        if (!isEmail(email)) {
            return this.fail(2003, '邮箱格式不正确');
        }
        //由前端控制吧
        //else if (password.length < 6) {
        //    return this.fail(2003, '密码长度不正确');
        //}

        console.log('Email : ' + email + "  Password : " + password);
    }


}