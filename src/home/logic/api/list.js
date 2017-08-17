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

            return this.fail('该接口只允许POST请求');
        }

        let page = this.post('page');
        let size = this.post('size');

        let class_id = this.post('class_id');//分类id
        let is_group = this.post('is_group');//分组or内容
        let order = this.post('order');//排序
        let is_top = this.post('is_top');//是否只查询置顶
        let is_banner = this.post('is_banner');

        if (!think.isEmpty(class_id) && !think.isNumberString(class_id)) {
            return this.fail(233, 'class_id数据格式不正确');
        }
        if (!think.isEmpty(is_group) && !think.isNumberString(is_group)) {
            return this.fail(233, 'is_group数据格式不正确');
        }
        if (!think.isEmpty(order) && !think.isNumberString(order)) {
            return this.fail(233, 'order数据格式不正确');
        }
        if (!think.isEmpty(is_top) && !think.isNumberString(is_top)) {
            return this.fail(233, 'is_top数据格式不正确');
        }
        if (!think.isEmpty(is_banner) && !think.isNumberString(is_banner)) {
            return this.fail(233, 'is_banner数据格式不正确');
        }



        if (!think.isNumberString(page) || !think.isNumberString(size)) {
            return this.fail(233, '数据格式不正确');
        }
        //校验数据
        if (page <= 0)
            page = 1;
        if (size <= 0)
            size = 10;

    }
}