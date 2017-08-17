'use strict';

import Base from '../base.js';

export default class extends Base {
    /**
     * index action
     * @return {Promise} []
     */

    //更新密码 或 登出
    async indexAction() {
        let action = this.post('action');
        let token = this.cookie('token');
        let newToken = randomStr(22);
        let user = this.model('user');
        if (action == 'upwd') {
            //更新密码
            let oldPwd = this.post('oldPwd');
            let newPwd = this.post('newPwd');

            //新的token
            let row = await user.updateUser({token: token, pwd: think.md5(oldPwd)}, {
                token: newToken,
                pwd: think.md5(newPwd)
            });
            if (row == 1) {
                this.success(row, '更新成功');
            } else {
                this.fail(233, '原密码错误，修改失败。');
            }

        } else {
            //退出登录 logout
            let row = await user.updateUser({token: token}, {
                token: newToken
            });

            if (row == 1) {
                this.success(row, '退出成功');
            } else {
                this.fail(233, '退出失败，没有符合条件或数据异常。');
            }


        }
    }


}