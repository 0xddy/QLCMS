'use strict';
/**
 * model
 */
export default class extends think.model.base {

    init(...args) {
        super.init(...args);
        this.pk = 'uid'; //将主键字段设置为 user_id

    }

    /* 检查admin验证 */
    checkAuth(token) {
        return this.where({admin: '1', token: token}).find();
    }


    _userLogin(email, pwd, type) {
        return this.where({admin: type, email: email, pwd: pwd}).find();
    }

    /* 用户登录 */
    userLogin(email, pwd) {
        return this._userLogin(email, pwd, '1');
    }

    updateUser(where, update) {

        return this.where(where).update(update);

    }


}