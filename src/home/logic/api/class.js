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
    limitAction() {

        if (!this.isGet()) {

            return this.fail(233, '只允许GET请求');

        }

        let page = this.get('page');
        let size = this.get('size');

        if (!think.isNumberString(page) || !think.isNumberString(size)) {
            return this.fail(233, '数据格式不正确');
        }

        //校验数据
        if (page <= 0)
            page = 1;
        if (size <= 0)
            size = 10;

        console.log('通过logic\\class')

    }
}