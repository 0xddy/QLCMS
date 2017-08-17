'use strict';
/**
 * model
 */
export default class extends think.model.base {

    checkAuth(token) {
        //跨模块获取 user 模型实例
        let instance = this.model('user',{},'user');
        return instance.checkAuth(token);

    }


}