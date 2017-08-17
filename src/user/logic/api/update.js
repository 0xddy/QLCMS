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

            return this.fail(234, '只接受POST请求');
        }
        let token = this.cookie('token');
        if (think.isEmpty(token)) {
            return this.fail(234, '您还没有登录');
        }

        let action = this.post('action');
        if (think.isEmpty(action)) {
            return this.fail(234, '缺少必要参数action');
        }
        if (action != 'upwd' && action != 'logout') {
            return this.fail(234, '参数数据不合法。');
        }
        if (action == 'upwd') {
            let oldPwd = this.post('oldPwd');
            let newPwd = this.post('newPwd');
            if (think.isEmpty(oldPwd) || think.isEmpty(newPwd)) {
                return this.fail(234, '缺少必要参数password');
            }
        }

    }
}