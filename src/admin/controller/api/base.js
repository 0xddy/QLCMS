'use strict';

export default class extends think.controller.base {
    /**
     * some base method in here
     */

    /**
     * 前置魔术方法
     * @return {Promise} []
     */
    async __before() {

        let auth = true;
        let token = this.cookie('token');
        if (think.isEmpty(token)) {
            auth = false;
        } else {
            let model = this.model('user.remote');
            let user = await model.checkAuth(token);
            if (think.isEmpty(user)) {
                auth = false;
            }
        }
        if (!auth)
            return this.fail(233, 'Token 验证失败', "");

    }

}