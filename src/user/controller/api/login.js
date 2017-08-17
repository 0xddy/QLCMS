'use strict';

import Base from '../base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */
    async indexAction() {

        let email = this.post('email');
        let password = this.post('password');
        let user = this.model('user');
        let data = await user.userLogin(email, think.md5(password));

        if (Object.getOwnPropertyNames(data).length > 0) {
            delete data.pwd;
            this.success(data, '用户登录成功');
        } else {
            this.fail(232, '账号或密码错误');
        }

    }


    testAction() {
        //auto render template file login_index.html


        return this.end('用户登录222');
    }
}